package program.storage;

public class StorageException  extends RuntimeException{

    //відображення помилок пов"язаних з неможливістю прочитати файл або пустим іменем файла.
    public StorageException(String message) {
        super(message);
    }

    public StorageException(String message, Throwable cause) {
        super(message, cause);
    }
}
