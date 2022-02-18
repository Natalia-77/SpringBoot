package program.storage;


import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.util.stream.Stream;

public interface StorageService {

    void init();
    void store(MultipartFile file);
    Stream<Path> loadAll();
    Path load(String filename);
    String store(String base64);
    String loadfile(String filename) throws IOException;
    Resource loadAsResource(String filename);
    void deleteAll();
}
