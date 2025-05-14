import { CategoryWithBooksDto } from "../../interfaces";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";  // Importera useLocation


const HomePage = () => {
    const [categories, setCategories] = useState<CategoryWithBooksDto[]>([]);
    const [selectedList, setSelectedList] = useState<{ [bookId: number]: string }>({});
    const [messageByBookId, setMessageByBookId] = useState<{ [bookId: number]: string }>({});

    useEffect(() => {
        const fetchCategories = async () => {
            const result = await fetch("http://localhost:5175/api/Books/categories");
            const data = await result.json();
            setCategories(data);
        };
        fetchCategories();
    }, []);

    const handleAddToLibrary = async (bookId: number) => {
        const listType = selectedList[bookId];
        const userName = localStorage.getItem("loggedInUser");
        const token = localStorage.getItem("token");

        if(!userName || !token || !listType) {
            alert("You need to be logged in to add books to your library and select a list.");
            return;
        }

        const result = await fetch("http://localhost:5175/api/UserLibrary/addBookToMyLibrary", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
                "X-User-Name": userName,
            },
            body: JSON.stringify({
                bookId,
                userName,
                listType
            }),
        });

        const resultData = await result.json();
        if(result.ok) 
        {
            setMessageByBookId(prev => ({
                ...prev,
                [bookId]: resultData.message || "Failed to add book to library. Please try again."
            }));  
        } else {
            setMessageByBookId((prev) => ({
                ...prev,
                [bookId]: resultData.message || "Failed to add book to library. Please try again."
            }))
        }
        
    };

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
                    {/*Dropdown och knappar för att välja lista */}
                    {messageByBookId[book.id] && <p>{messageByBookId[book.id]}</p>}

                    <div>
                        <select
                            value={selectedList[book.id]}
                            onChange={(e) => setSelectedList({...selectedList, [book.id]: e.target.value})}
                        >
                            <option value="">select a list to add the book to:</option>
                            <option value="WantToRead">Want to read</option>
                            <option value="Reading">Reading</option>
                            <option value="Read">Read</option>
                        </select>
                        <button onClick={() => handleAddToLibrary(book.id)}>Add to</button>
                    </div>
                    
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