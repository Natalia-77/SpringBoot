package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import program.entities.Images;

import java.util.List;


@Repository
public interface ImageRepository extends JpaRepository<Images,Integer> {
    List<Images> findByUrlImage(String urlImage);
}
