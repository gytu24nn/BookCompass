import { BookDetailDto } from "../../interfaces";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchBookDetail } from "../../apiFetch/fetchBookDetail";

const BookDetailPage = () => {
    const {id} = useParams();
    const navigate = useNavigate(); //för att kunna programmera navigering
    const [bookDetails, setBookDetails] = useState<BookDetailDto | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        const getBookDetails = async () => {
            try {
                setLoading(true);
                if(id) {
                    const data = await fetchBookDetail(id);
                    setBookDetails(data);
                }
            } catch (error: any) {
                setErrorMessage("Could not fetch book details. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        getBookDetails();
    }, [id]);

    if(!bookDetails) return <p className="loadingMessage">Loading...</p>;


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