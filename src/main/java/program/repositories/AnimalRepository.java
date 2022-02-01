package program.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import program.entities.Animals;

@Repository
public interface AnimalRepository extends JpaRepository<Animals,Integer> {
}
