package program.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BookAddItemDto {
    private String name;
    private String description;
    private List<ImageItemDto> urlImage;
}
