package program.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
public class BookItemDto {

    private int id;
    private String name;
    private String description;
    private List<ImageItemDto> urlImage;

}
