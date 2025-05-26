import { BookDetailDto } from "../../interfaces";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookDetailPage = () => {
    const {id} = useParams();
    const navigate = useNavigate(); //för att kunna programmera navigering
    const [bookDetails, setBookDetails] = useState<BookDetailDto | null>(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            const result = await fetch(`http://localhost:5175/api/Books/${id}`)
            if (!result.ok) {
                console.error("Failed to fetch book details:", result.statusText);
                return;
            }
            const data = await result.json();
            console.log("Fetched book detail:", data); // <--- lägg till denna
            setBookDetails(data);
        };
        fetchBookDetails();
    }, [id]);

    if(!bookDetails) return <p>Loading...</p>;

    const handleMoveToHomePage = () => {
        navigate("/");
    }

    return (
        <>
            
            <div className="bookDetailContainer">
                <div className="bookDetailImage">
                    <img  
                        src={`http://localhost:5175${bookDetails.imageUrl}`} 
                    alt={bookDetails.bookName} 
                    />
                </div>
                <div className="bookDetailInfo">
                    <h2>{bookDetails.bookName}</h2>
                    <p><strong>Author:</strong> {bookDetails.author}</p>
                    <p><strong>Description:</strong> {bookDetails.bookDescription}</p>

                    <p><strong>Category:</strong> {bookDetails.category}</p>
                    <p><strong>Languages:</strong> {bookDetails.languages.join(", ")}</p>

                    <button className="backButton" onClick={handleMoveToHomePage}>
                        ← Back to Home
                    </button>

                </div>
           

            </div>
            
        </>
    )
}

export default BookDetailPage;