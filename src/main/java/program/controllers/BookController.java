package program.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import program.dto.AnimalAddItemDto;
import program.dto.BookItemDto;
import program.dto.ImageItemDto;
import program.entities.Animals;
import program.entities.Book;
import program.entities.Images;
import program.mapper.AnimalMapper;
import program.mapper.BookMapper;
import program.repositories.AnimalRepository;
import program.repositories.BookRepository;
import program.repositories.ImageRepository;
import program.service.AnimalService;

import javax.xml.bind.DatatypeConverter;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@RestController
@RequestMapping("/books")
public class BookController {

    private final BookRepository repository;
    private final BookMapper bookMapper;
    private final AnimalService animalService;
    private final ImageRepository imageRepository;

    @PostMapping( "/addbook")
    public ResponseEntity create(@RequestBody BookItemDto bookItemDto) throws IOException {

        Book books = bookMapper.BookDtoToBook(bookItemDto);
//        books.getUrlImage();

        List<Images> imagesList= new ArrayList<>();

        for (Images image1:books.getUrlImage()
             ) {

            String bases64 = image1.getUrlImage();
            //int ids=books.getId();

            if (!bases64.isEmpty()) {
                String name = animalService.base64ToImageFile(bases64);
                image1.setUrlImage(name);
                image1.setBookss(books);
                //image1.setId(ids);

                String base64ImageString = bases64.substring(bases64.indexOf(",") + 1, bases64.length());
                byte[] decodedBytes = DatatypeConverter.parseBase64Binary(base64ImageString);
                imagesList.add(new Images(name));


                FileOutputStream fos = new FileOutputStream("./upload/" + name);
                try {
                    fos.write(decodedBytes);
                } finally {
                    fos.close();
                }
               // imageRepository.save(image1);
            }

        }

        //books.setUrlImage(imagesList);
        repository.save(books);

        return ResponseEntity.ok(HttpStatus.OK);
    }

}
