import { CategoryWithBooksDto } from "../../interfaces";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";  // Importera useLocation


const HomePage = () => {
    const [categories, setCategories] = useState<CategoryWithBooksDto[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await fetch("http://localhost:5175/api/Books/categories");
            const data = await result.json();
            setCategories(data);
        };
        fetchCategories();
    }, [])
    return (
      <>
        <h2 className="homePageHeader">Welcome to BookCompass</h2>
        {categories.map((category) => (
          <div key={category.categoryId} className="categorySection">
            <h2 className="categoryName">{category.categoryName}:</h2>
            <ul className="displayBooks">
              {category.books.map((book) => (
                <div key={book.id}>
                  <li  className="bookCard">
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
                  </li>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </>
    );
}

export default HomePage;