package program.mapper;

import org.mapstruct.Mapper;
import program.dto.AnimalAddDto;
import program.entities.Animals;

@Mapper(componentModel = "spring")
public interface AnimalMapper {
    Animals AnimalByAddDto(AnimalAddDto addDto);
}
