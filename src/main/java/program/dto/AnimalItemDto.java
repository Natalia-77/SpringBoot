package program.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

//class responsibility for instance item animal.
@Data
public class AnimalItemDto {
    private int id;
    private String name;
    private String owner;
    private String urlImage;

}
