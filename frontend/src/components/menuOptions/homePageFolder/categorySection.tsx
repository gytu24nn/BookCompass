import { CategoryWithBooksDto } from "../../../interfaces";
import BookCard from "./BookCard";

interface Props {
    category: CategoryWithBooksDto;
    selectedList: { [bookId: number]: string };
    setSelectedList: React.Dispatch<React.SetStateAction<{ [bookId: number]: string }>>;
    handleAddToLibrary: (bookId: number) => void;
    messageByBookId: { [bookId: number]: string };
}

const CategorySection = ({ category, selectedList, setSelectedList, handleAddToLibrary, messageByBookId}: Props) => {
    return(
        <>
            <div key={category.categoryId} className="categorySection">
                <h2 className="categoryName">{category.categoryName}:</h2>
                <ul className="displayBooks">
                    {category.books.map((book) => (
                        <BookCard 
                            key={book.id}
                            book={book}
                            selectedList={selectedList[book.id] || ""}
                            setSelectedList={(value) => setSelectedList(prev => ({...prev, [book.id]: value }))}
                            handleAddToLibrary={() => handleAddToLibrary(book.id)}
                            message={messageByBookId[book.id]}
                        />
                    ))}
                </ul>
            </div>
        </>
    )
}

export default CategorySection;