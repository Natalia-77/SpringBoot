package program.mapper;

import javax.annotation.Generated;
import org.springframework.stereotype.Component;
import program.dto.AnimalAddDto;
import program.entities.Animals;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2022-01-31T19:28:15+0200",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 1.8.0_291 (Oracle Corporation)"
)
@Component
public class AnimalMapperImpl implements AnimalMapper {

    @Override
    public Animals AnimalByAddDto(AnimalAddDto addDto) {
        if ( addDto == null ) {
            return null;
        }

        Animals animals = new Animals();

        animals.setName( addDto.getName() );
        animals.setOwner( addDto.getOwner() );

        return animals;
    }
}
