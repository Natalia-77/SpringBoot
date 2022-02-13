package program.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import program.dto.AnimalAddItemDto;
import program.dto.AnimalItemDto;
import program.entities.Animals;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnimalMapper {

    //для виводу списку тварин у контролері.
    @Mapping(source = "name", target = "name")
    @Mapping(source = "owner", target = "owner")
    @Mapping(source = "id", target = "id")
    @Mapping(source = "urlImage", target = "urlImage")
    List<AnimalItemDto> AnimalListItems(List<Animals> animal);

    @Mapping(source = "name", target = "name")
    @Mapping(source = "owner", target = "owner")
    @Mapping(source = "urlImage", target = "urlImage")
    Animals AnimalByAddDto(AnimalAddItemDto addItemDto);

    AnimalItemDto AnimalToAnimalItemDto (Animals animals);

    Animals GetItemAnimal (Animals id);
}
