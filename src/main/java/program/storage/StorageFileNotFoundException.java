package program.storage;

public class StorageFileNotFoundException extends StorageException {

    //відображення помилок,пов"язаних з відсутністю фото за запитом.
    public StorageFileNotFoundException(String message) {
        super(message);
    }

    public StorageFileNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
