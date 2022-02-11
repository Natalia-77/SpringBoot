package program.service;


import org.springframework.stereotype.Service;

import java.util.Random;

@Service
//returns random name for file, which will record
public class AnimalService {

    public String base64ToImageFile(String bases64){
        Random random=new Random();
        String ext = ".jpg";
        String name = String.format("%s%s",System.currentTimeMillis(),random.nextInt(100)+ext);
        return name;
    }
}
