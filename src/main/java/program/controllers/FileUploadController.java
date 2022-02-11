package program.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import program.storage.FileInfoService;

//@Controller
//@CrossOrigin()
@RestController
@RequestMapping("/upload")

public class FileUploadController {
    private final FileInfoService fileService;

    public FileUploadController(FileInfoService fileService) {
        this.fileService = fileService;
    }

    @PostMapping(value="/",consumes="multipart/form-data")
    @ResponseBody
    public ResponseEntity<String> upload(@RequestPart("file") MultipartFile file) {
        try {
            fileService.save(file);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(String.format("File uploaded successfully: %s", file.getOriginalFilename()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(String.format("Could not upload the file: %s!", file.getOriginalFilename()));
        }
    }

//    @PostMapping("/")
//    public String fileUpload(@RequestParam("file") MultipartFile file) {
//        return fileService.store(file);
//    }

}
