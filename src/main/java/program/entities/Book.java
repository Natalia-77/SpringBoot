package program.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;

import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "tbl_books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name="name",length = 250, nullable = false)
    private String name;

    @Column(name="description",length = 250, nullable = false)
    private String description;

    @OneToMany(mappedBy = "books", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<Images> images=new ArrayList<>();


}
