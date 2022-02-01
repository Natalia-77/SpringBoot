package program.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;
import program.dto.AnimalItemDto;
import program.entities.Animals;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-02-01T14:33:45+0200",
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
            list.add( animalsToAnimalItemDto( animals ) );
        }

        return list;
    }

    protected AnimalItemDto animalsToAnimalItemDto(Animals animals) {
        if ( animals == null ) {
            return null;
        }

        AnimalItemDto animalItemDto = new AnimalItemDto();

        animalItemDto.setName( animals.getName() );
        animalItemDto.setOwner( animals.getOwner() );

        return animalItemDto;
    }
}
