package program.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

//class responsibility for add new item animal.
@Data
public class AnimalAddItemDto {
    private String name;
    private String owner;
    private String urlImage;
}
