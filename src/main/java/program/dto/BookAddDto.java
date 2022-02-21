package program.dto;

import lombok.Data;

import java.util.List;
@Data
public class BookAddDto {
    private String name;
    private String description;
    private List<String> images;
}
