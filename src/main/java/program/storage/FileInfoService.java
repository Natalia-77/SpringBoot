package program.storage;


import org.apache.commons.io.FilenameUtils;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import program.entities.Animals;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class FileInfoService implements FileInfoServiceAbstract {

    private final Path rootLocation= Paths.get("upload");


    @Override
    public void init() {
        try {
            Files.createDirectory(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!");
        }
    }

    public String store(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file.");
            }

            String extension = FilenameUtils.getExtension(file.getOriginalFilename());
            String uploadedFileName = UUID.randomUUID().toString() + "." + extension;

            Path destinationFile = rootLocation.resolve(
                            Paths.get(uploadedFileName))
                    .normalize().toAbsolutePath();

            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, destinationFile,
                        StandardCopyOption.REPLACE_EXISTING);

                final String baseUrl =
                        ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();

                return baseUrl+"/upload/"+uploadedFileName;
            }
        }
        catch (IOException e) {
            throw new StorageException("Failed to store file.");
        }
    }


    @Override
    public void save(MultipartFile file) {
        try {
            if(file.isEmpty()){
                throw new StorageException("Empty file" + file.getOriginalFilename());
            }
            //String fileName = StringUtils.cleanPath(file.getOriginalFilename());
            Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()));
        } catch (Exception e) {
            throw new RuntimeException("Could not store the file. Error: " + e.getMessage());
        }
    }

    @Override
    public Resource load(String filename) {
        try {
            Path file = this.rootLocation.resolve(filename).normalize();
            Resource resource = new UrlResource(file.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }

    }

    @Override
    public void deleteAll() {
            FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    @Override
    public Stream<Path> loadAll() {
            try {
                return Files.walk(this.rootLocation, 1).filter(path -> !path.equals(this.rootLocation)).map(this.rootLocation::relativize);
            } catch (IOException e) {
                throw new RuntimeException("Could not load the files!");
            }
    }
}
