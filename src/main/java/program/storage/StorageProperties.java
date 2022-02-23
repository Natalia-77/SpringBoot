package program.storage;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;


@ConfigurationProperties("storage")
@Data
public class StorageProperties {

    //папка,в яку зберігатимуться фото в проекті.
    private String location = "upload-images";

}
