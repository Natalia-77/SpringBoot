package program.storage;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StorageException extends RuntimeException {

    private String message;

    public StorageException(String message){
        this.message = message;
    }
}
