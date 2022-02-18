package program.controllers;

import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;
import program.dto.BookAddItemDto;
import program.dto.BookItemDto;
import program.dto.ImageItemDto;
import program.entities.Book;
import program.entities.Images;
import program.mapper.BookMapper;
import program.repositories.BookRepository;
import program.storage.FileInfo;
import program.storage.StorageService;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/books")
public class BookController {

    private final StorageService storageService;
    private final BookRepository repository;
    private final BookMapper bookMapper;

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
    public ResponseEntity create(@RequestBody BookAddItemDto bookItemDto) throws IOException {

        Book books = bookMapper.BookDtoToBook(bookItemDto);

        for (Images image1:books.getUrlImage()
             ) {

            String bases64 = image1.getUrlImage();

            if (!bases64.isEmpty()) {
                String name = storageService.store(bases64);
                image1.setUrlImage(name);
                image1.setBookss(books);

            }
        }

        repository.save(books);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
