package program.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_animals")
public class Animals {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "name", length = 100, nullable = false)
    private String name;
    @Column(name="owner",length = 200,nullable = false)
    private String owner;
    @Column(name="image",nullable = true,columnDefinition="TEXT")
    private String urlImage;
    public Animals(String name,String owner, String urlImage){
        this.name = name;
        this.owner = owner;
        this.urlImage = urlImage;
    }

}
