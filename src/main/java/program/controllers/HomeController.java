package program.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import program.dto.AnimalAddItemDto;
import program.dto.AnimalItemDto;
import program.entities.Animals;
import program.mapper.AnimalMapper;
import program.repositories.AnimalRepository;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/animals")
public class HomeController {
    private final AnimalRepository repository;
    private final AnimalMapper animalMapper;

    @GetMapping("")
    public List<AnimalItemDto> index() {

        return animalMapper.AnimalListItems(repository.findAll());
    }

//    @PostMapping("")
//    public int create(AnimalAddItemDto addDto){
//        Animals animals = animalMapper.AnimalByAddDto(addDto);
//        repository.save(animals);
//        return animals.getId();
//    }
}
