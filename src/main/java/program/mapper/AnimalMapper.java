package program.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import program.dto.AnimalItemDto;
import program.entities.Animals;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnimalMapper {

    //для виводу списку тварин у контролері.
    @Mapping(source = "name", target = "name")
    @Mapping(source = "owner", target = "owner")
    List<AnimalItemDto> AnimalListItems(List<Animals> animal);
}
