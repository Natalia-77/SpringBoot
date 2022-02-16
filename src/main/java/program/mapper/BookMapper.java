package program.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import program.dto.BookItemDto;
import program.dto.ImageItemDto;
import program.entities.Book;
import program.entities.Images;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BookMapper {
    @Mapping(source = "urlImage", target = "urlImage")
    ImageItemDto ImageToImageItemDto (Images images);
    @Mapping(source = "urlImage", target = "urlImage")
    BookItemDto BookToBookItemDto( Book book);
    @Mapping(source = "urlImage", target = "urlImage")
    Book BookDtoToBook (BookItemDto bookItemDto);
    @Mapping(source = "urlImage", target = "urlImage")
    Images ImageDtoToImage(ImageItemDto imageItemDto);
    List<BookItemDto> BookListItems(List<Book> bookList);
}
