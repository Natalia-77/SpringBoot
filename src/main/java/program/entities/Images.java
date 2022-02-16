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
@Table(name = "tbl_images")
public class Images {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="name",columnDefinition="TEXT")
    private String urlImage;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name="book_id")
    private Book bookss=new Book();

    public Images(String urlImage){
        this.urlImage = urlImage;
    }

}
