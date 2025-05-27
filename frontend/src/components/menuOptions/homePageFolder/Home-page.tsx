import { CategoryWithBooksDto } from "../../../interfaces";
import { useState, useEffect } from "react";
import CategorySection from "./categorySection";


const HomePage = () => {
    // TEST: Kasta ett fel med flit för att testa error boundary
    //throw new Error("Testfel från HomePage");


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
        
        setMessageByBookId(prev => ({
          ...prev,
          [bookId]: resultData.message || "Failed to add book to library. Please try again."
        })); 

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