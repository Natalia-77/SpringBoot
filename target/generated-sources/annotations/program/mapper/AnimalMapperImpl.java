package program.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;
import program.dto.AnimalAddItemDto;
import program.dto.AnimalItemDto;
import program.entities.Animals;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-02-05T15:42:33+0200",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 1.8.0_291 (Oracle Corporation)"
)
@Component
public class AnimalMapperImpl implements AnimalMapper {

    @Override
    public List<AnimalItemDto> AnimalListItems(List<Animals> animal) {
        if ( animal == null ) {
            return null;
        }

        List<AnimalItemDto> list = new ArrayList<AnimalItemDto>( animal.size() );
        for ( Animals animals : animal ) {
            list.add( AnimalToAnimalItemDto( animals ) );
        }

        return list;
    }

    @Override
    public Animals AnimalByAddDto(AnimalAddItemDto addItemDto) {
        if ( addItemDto == null ) {
            return null;
        }

        Animals animals = new Animals();

        animals.setName( addItemDto.getName() );
        animals.setOwner( addItemDto.getOwner() );

        return animals;
    }

    @Override
    public AnimalItemDto AnimalToAnimalItemDto(Animals animals) {
        if ( animals == null ) {
            return null;
        }

        AnimalItemDto animalItemDto = new AnimalItemDto();

        animalItemDto.setId( animals.getId() );
        animalItemDto.setName( animals.getName() );
        animalItemDto.setOwner( animals.getOwner() );

        return animalItemDto;
    }

    @Override
    public Animals GetItemAnimal(Animals id) {
        if ( id == null ) {
            return null;
        }

        Animals animals = new Animals();

        animals.setId( id.getId() );
        animals.setName( id.getName() );
        animals.setOwner( id.getOwner() );

        return animals;
    }
}
