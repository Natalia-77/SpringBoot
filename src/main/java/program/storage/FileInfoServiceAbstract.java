package program.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.stream.Stream;

public interface FileInfoServiceAbstract {

    public void init();
    public void save (MultipartFile file);
    public String store(MultipartFile file) ;
    public Resource load(String filename);
    public void deleteAll();
    public Stream<Path> loadAll();
}
