package program.controllers;

import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import program.dto.*;
import program.entities.Book;
import program.entities.Images;
import program.mapper.BookMapper;
import program.repositories.BookRepository;
import program.repositories.ImageRepository;
import program.storage.FileInfo;
import program.storage.StorageService;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.AbstractList;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

//@RequiredArgsConstructor
@RestController
@RequestMapping("/books")
public class BookController {

    private final StorageService storageService;
    private final BookRepository repository;
    private final BookMapper bookMapper;
    private final ImageRepository imageRepository;
    @Autowired
    public BookController(StorageService storageService, BookRepository repository, BookMapper bookMapper, ImageRepository imageRepository) {
        this.storageService = storageService;
        this.repository = repository;
        this.bookMapper = bookMapper;
        this.imageRepository = imageRepository;
    }

    @GetMapping("/listbooks")
    public List<BookItemDto> list(){
        List<BookItemDto> bookItemDtos=bookMapper.BookListItems(repository.findAll());

        for (BookItemDto bookDto:bookItemDtos) {

               List<ImageItemDto> filenames= bookDto.getUrlImage();
                for (ImageItemDto image:filenames) {
                    try{
                        String filename = image.getUrlImage();
                        String base64 = storageService.loadfile(filename);
//                        InputStream iSteamReader = new FileInputStream("./upload-images/"+filename);
//                        byte[] imageBytes = IOUtils.toByteArray(iSteamReader);
//                        filename = Base64.getEncoder().encodeToString(imageBytes);
                        image.setUrlImage("data:image/jpeg;base64,"+ base64);

                    }catch(Exception e){
                        e.printStackTrace();
                    }
                }
        }

        return bookItemDtos;
    }

    @PostMapping("/upload")
    public String upload(@RequestBody UploadImageDto dto) {
        String imageName = storageService.store(dto.getBase64());
        try {
            Images image = new Images(imageName);
            //image.setUrlImage(imageName);
            imageRepository.save(image);
        } catch(Exception ex)
        {
            System.out.println("Error "+ ex.getMessage());
        }

        return imageName;
    }

    //отримати всі зображення.
    @GetMapping("/files")
    public ResponseEntity<List<FileInfo>> getListFiles() {
        List<FileInfo> fileInfos = storageService.loadAll().map(path -> {
            String filename = path.getFileName().toString();
            String url = MvcUriComponentsBuilder
                    .fromMethodName(BookController.class, "getFile", path.getFileName().toString()).build().toString();

            return new FileInfo(filename, url);
        }).collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(fileInfos);
    }

    //отримати зображення по імені файлу
    @GetMapping("/image/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> getFile(@PathVariable String filename) throws Exception {

        Resource file = storageService.loadAsResource(filename);
        return ResponseEntity.ok()
                .contentType(MediaType.IMAGE_JPEG)
                .header(HttpHeaders.CONTENT_DISPOSITION,"filename=\""+file.getFilename()+"\"")
                .body(file);
    }

    //додати нову книжку в базу з множиною фото.
    @PostMapping( "/addbook")
    public ResponseEntity create(@RequestBody BookAddDto bookItemDto) throws IOException {

        Book book =new Book();
        book.setName(bookItemDto.getName());
        book.setDescription(bookItemDto.getDescription());
        repository.save(book);

        for (String name:bookItemDto.getImages()) {
            List<Images> images = imageRepository.findByUrlImage(name);
            Images image = images.get(0);
            image.setBookss(book);
            imageRepository.save(image);
        }

        return ResponseEntity.ok(HttpStatus.OK);
    }

}
