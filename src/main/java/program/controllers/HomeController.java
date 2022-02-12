package program.controllers;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import program.dto.AnimalAddItemDto;
import program.dto.AnimalItemDto;
import program.entities.Animals;
import program.mapper.AnimalMapper;
import program.repositories.AnimalRepository;
import program.service.AnimalService;
import javax.xml.bind.DatatypeConverter;
import java.io.*;
import java.util.Base64;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/animals")
public class HomeController {

    private final AnimalRepository repository;
    private final AnimalMapper animalMapper;
    private final AnimalService animalService;


//    @GetMapping("/list")
//    public List<AnimalItemDto> index() {
//
//        return animalMapper.AnimalListItems(repository.findAll());
//    }

    @GetMapping("/list")
    public List<AnimalItemDto> index() {
    List<AnimalItemDto> animal=animalMapper.AnimalListItems(repository.findAll());
        for (AnimalItemDto animal1:animal) {

            if(animal1.getUrlImage().contains(".")){
                //записані в базі фотки як назва файлу перетворюю в бейс64.
                String base64= animal1.getUrlImage();
                try{
                    InputStream iSteamReader = new FileInputStream("./upload/"+base64);
                    byte[] imageBytes = IOUtils.toByteArray(iSteamReader);
                    base64 = Base64.getEncoder().encodeToString(imageBytes);
                    animal1.setUrlImage("data:image/jpeg;base64,"+base64);
                }catch(Exception e){
                    e.printStackTrace();
                }
            }
        }
        return animal;
    }

    @PostMapping(value="/add/noimage")
    public ResponseEntity createNoImage(@RequestBody AnimalAddItemDto addDto) {
        Animals animals = animalMapper.AnimalByAddDto(addDto);
        repository.save(animals);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PostMapping( "/add")
    public ResponseEntity create(@RequestBody AnimalAddItemDto addDto) throws IOException {

        Animals animals = animalMapper.AnimalByAddDto(addDto);
        String bases64=animals.getUrlImage();
        if(!bases64.isEmpty()){
            String name = animalService.base64ToImageFile(bases64);
            //String base64ImageString = bases64.replace("data:image/png;base64,", "");//обрізала початок строчки.
            String base64ImageString = bases64.substring(bases64.indexOf(",")+1, bases64.length());
            byte[] decodedBytes = DatatypeConverter.parseBase64Binary(base64ImageString);
            animals.setUrlImage(name);
            FileOutputStream fos = new FileOutputStream("./upload/"+name);
            try {
                fos.write(decodedBytes);
            }
            finally {
                fos.close();
            }
        }

        repository.save(animals);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping(value = "/item/{id}")
    public AnimalItemDto getItemAnimal(@PathVariable int id) {
        Animals animals = animalMapper.GetItemAnimal(repository.findById(id).get());
        return animalMapper.AnimalToAnimalItemDto(animals);
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity delete(@PathVariable int id) {
        Animals animals = animalMapper.GetItemAnimal(repository.findById(id).get());
        repository.delete(animals);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
