import { useState, useEffect } from "react";
import { Link } from "react-router-dom";  // Importera useLocation
import { Book } from "../../interfaces"; // Importera Book
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
            <h1>My library</h1>
            {loading && <p>Loading...</p>}
            {errorMessage && <p>{errorMessage}</p>}

            {libraryData.map((group) => (
                <div key={group.listType}>
                    <h2>{group.listType}</h2>
                    <div>
                        {group.books.map((book) => (
                            <div key={book.id}>
                                <li>
                                    <Link to={`/books/${book.id}`}>
                                        <img 
                                            src={`http://localhost:5175${book.imageUrl}`}
                                            alt={book.bookName}
                                        />
                                        <h3>{book.bookName}</h3>
                                        <p>{book.author}</p>
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