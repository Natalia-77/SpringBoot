package program.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    @GetMapping("/list")
    public List<AnimalItemDto> index() {

        return animalMapper.AnimalListItems(repository.findAll());
    }


}
