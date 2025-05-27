import { CategoryWithBooksDto } from "../../../interfaces";
import { useState, useEffect } from "react";
import CategorySection from "./categorySection";
import { fetchCategories, fetchAddToLibrary } from "../../../apiFetch/fetchBooks";


const HomePage = () => {
    // TEST: Kasta ett fel med flit för att testa error boundary
    throw new Error("Testfel från HomePage");

    const [categories, setCategories] = useState<CategoryWithBooksDto[]>([]);
    const [selectedList, setSelectedList] = useState<{ [bookId: number]: string }>({});
    const [messageByBookId, setMessageByBookId] = useState<{ [bookId: number]: string }>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const getCategories = async () => {
        try {
          setLoading(true);
          const data = await fetchCategories();
          setCategories(data);
        } catch (error: any) {
          setCategories([]);
        } finally {
          setLoading(false);
        }
      };
      getCategories();
    }, []);

    const handleAddToLibrary = async (bookId: number) => {
      const listType = selectedList[bookId];
      const userName = localStorage.getItem("loggedInUser");
      const token = localStorage.getItem("token");

      if (!userName || !token) {
        alert("You need to be logged in and select a list to add a book.");
        return;
      }

      if (!listType) {
        alert("You need to select a list before adding a book.");
        return;
      }

      try {
        const resultData = await fetchAddToLibrary(bookId, userName, token, listType);
        setMessageByBookId(prev => ({
          ...prev,
          [bookId]: resultData.message
        }));
      } catch (error: any) {
        setMessageByBookId(prev => ({
          ...prev,
          [bookId]: error.message || "Failed to add book to library. Please try again."
        }));
      }

        setTimeout(() => {
          setMessageByBookId(prev => {
            const updated = { ...prev };
            delete updated[bookId];
            return updated;
          })
        }, 2000); // Ta bort meddelandet efter 2 sekunder
        
        
    };

    return (
      <>
        {loading && <p className="loadingMessage">Loading...</p>}
        {categories.map(category => (
          <CategorySection 
            key={category.categoryId}
            category={category}
            selectedList={selectedList}
            setSelectedList={setSelectedList}
            handleAddToLibrary={handleAddToLibrary}
            messageByBookId={messageByBookId}
          />
        ))}
      </>
    );
}

export default HomePage;