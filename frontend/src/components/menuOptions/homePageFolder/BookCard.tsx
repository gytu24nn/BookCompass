import { Link } from "react-router-dom";
import { BookSummaryDto } from "../../../interfaces";

interface BookCardProps {
  book: BookSummaryDto;
  selectedList?: string;
  setSelectedList?: (value: string) => void;
  handleAddToLibrary?: () => void;
  message?: string;
}

const BookCard = ({
  book,
  selectedList,
  setSelectedList,
  handleAddToLibrary,
  message
}: BookCardProps) => {
  return (
    <li className="bookCard">
      <Link to={`/books/${book.id}`}>
        <img
          src={`http://localhost:5175${book.imageUrl}`}
          alt={book.bookName}
          className="bookImage"
        />
        <div className="bookInfo">
          <h4 className="bookTitle">{book.bookName}</h4>
          <p className="bookAuthor">{book.author}</p>
        </div>
      </Link>

      {message && (
        <p>
          <strong>{message}</strong>
        </p>
      )}
      <div className="dropdownContainer">
        <select
          className="dropdownSelect"
          value={selectedList}
          onChange={(e) => setSelectedList?.(e.target.value)}
        >
          <option value="">select a list:</option>
          <option value="WantToRead">Want to read</option>
          <option value="Reading">Reading</option>
          <option value="Read">Read</option>
        </select>
        <button className="dropdownButton" onClick={handleAddToLibrary}>
          Add to
        </button>
      </div>
    </li>
  );
};

export default BookCard;
