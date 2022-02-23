package program.storage;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.util.FileSystemUtils;
import org.springframework.web.multipart.MultipartFile;
import program.entities.Images;
import program.service.AnimalService;

import javax.xml.bind.DatatypeConverter;
import java.io.*;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;
import java.util.stream.Stream;

@Service
public class FileSystemStorageService implements StorageService {

    private final Path rootLocation;
    private final AnimalService animalService;

    @Autowired
    public FileSystemStorageService(StorageProperties properties,AnimalService animalService) {
        this.rootLocation = Paths.get(properties.getLocation());
        this.animalService = animalService;
    }

    @Override
    public void store(MultipartFile file) {
        try {
            if (file.isEmpty()) {
                throw new StorageException("Failed to store empty file " + file.getOriginalFilename());
            }
            Files.copy(file.getInputStream(), this.rootLocation.resolve(file.getOriginalFilename()));
        } catch (IOException e) {
            throw new StorageException("Failed to store file " + file.getOriginalFilename(), e);
        }
    }

    @Override
    public Stream<Path> loadAll() {
        try {
            return Files.walk(this.rootLocation, 1)
                    .filter(path -> !path.equals(this.rootLocation))
                    .map(path -> this.rootLocation.relativize(path));
        } catch (IOException e) {
            throw new StorageException("Failed to read stored files", e);
        }

    }

    @Override
    public Path load(String filename) {
        return rootLocation.resolve(filename);
    }

    @Override
    public String store(String bases64) {
        try {
            //в цей метод я написала те,що в мене було раніше по перетворенню файла в контролері...
            if (bases64.isEmpty()) {
                throw new StorageException("Failed to store empty base64 ");
            }
            //обрізаю по першу кому атрибути бейс 64...
            String base64ImageString = bases64.substring(bases64.indexOf(",") + 1, bases64.length());
            //записую в масив байтів...
            byte[] decodedBytes = DatatypeConverter.parseBase64Binary(base64ImageString);
            //формую рандомне ім"я файлу з окремого методу...
            String name = animalService.base64ToImageFile(bases64);
            //записую в папку під рандомним ім"ям сформований файл...
            FileOutputStream fos = new FileOutputStream("./upload-images/" + name);
            try {
                fos.write(decodedBytes);
            } finally {
                fos.close();
            }
            //повертаю ім"я сформованого вже записаного файлу...
            return name;
        } catch (IOException e) {
            throw new StorageException("Failed to store file ", e);
        }

    }
    @Override
    public String loadfile(String filename) throws IOException {
        try{
            if(filename.isEmpty()){
                throw  new StorageException("Empty file name ");
            }
            //якщо ім"я файлу вказане ,то зчитуємо його за вказаним розташуванням папки з фото.
            InputStream iSteamReader = new FileInputStream("./upload-images/"+filename);
            //отримали масив байтів.
            byte[] imageBytes = IOUtils.toByteArray(iSteamReader);
            //отримали бейс 64...
            filename = Base64.getEncoder().encodeToString(imageBytes);
            return filename;
        }
        catch(IOException e){
            //якщо помилка завантаження файла....
            throw new StorageException("Failed to load file ", e);
        }

    }

    @Override
    public Resource loadAsResource(String filename) {
        try {
            Path file = load(filename);
            Resource resource = new UrlResource(file.toUri());
            if(resource.exists() || resource.isReadable()) {
                return resource;
            }
            else {
                throw new StorageFileNotFoundException("Could not read file: " + filename);

            }
        } catch (MalformedURLException e) {
            throw new StorageFileNotFoundException("Could not read file: " + filename, e);
        }
    }

    @Override
    public void deleteAll() {
        FileSystemUtils.deleteRecursively(rootLocation.toFile());
    }

    @Override
    public void init() {
        try {
            //якщо немає такої створеної папки...
            if(!Files.exists(rootLocation))
            {
                //створили...
                Files.createDirectory(rootLocation);
            }
        } catch (IOException e) {
            throw new StorageException("Could not initialize storage", e);
        }
    }
}
