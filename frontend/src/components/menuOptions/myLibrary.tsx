import { useState, useEffect } from "react";
import { Link } from "react-router-dom";  // Importera useLocation
import { GroupedBooks } from "../../interfaces";

const myLibrary = () => {
    const [libraryData, setLibraryData] = useState<GroupedBooks[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchLibraryData = async () => {
            try {
                const userName = localStorage.getItem("loggedInUser");
                const token = localStorage.getItem("token");

                if(!userName || !token) {
                    setErrorMessage("You need to be logged in to view your library.");
                    setLoading(false);
                    return;
                }

                const result = await fetch(`http://localhost:5175/api/UserLibrary/getMyLibrary/${userName}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "X-User-Name": userName,
                    }
                });

                if(!result.ok) 
                {
                    const error = await result.json();
                    setErrorMessage(error.message || "something went wrong. Try again!");
                }

                const data = await result.json();
                console.log("Fetched book detail:", data); // <--- lägg till denna
                setLibraryData(data);

            } catch (err: any) {
                setErrorMessage("You need to add books to your library first, to see them here.");
            } finally {
                setLoading(false);
            }
        };

        fetchLibraryData();
    }, [])

    return(
        <>
            <div className="myLibraryHeader">
                 <h1>My library:</h1>
                 <p className={errorMessage ? "errorMessageMyLibrary" : "welcomeMessage"}>
                    {errorMessage || "Here you can see the books you saved to different lists!"}
                 </p>
                
            </div>
           
            {loading && <p className="loadingMessage">Loading...</p>}
            {libraryData.map((group) => (
                <div key={group.listType} className="categorySection">
                    <h2 className="categoryName">{group.listType}:</h2>
                    <div className="displayBooks">
                        {group.books.map((book) => (
                            <div key={book.id}>
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
                                </li>
                                

                            </div>
                        ))}
                    </div>
                </div>
            ))}
            
        </>
    )
}

export default myLibrary;