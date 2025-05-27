import { CategoryWithBooksDto } from "../interfaces";

export async function fetchCategories(): Promise<CategoryWithBooksDto[]> {
    const result = await fetch("http://localhost:5175/api/Books/categories");


    if (!result.ok) {
        console.error("Failed to fetch categories:", result.statusText);
        throw new Error("Could not fetch categories");
    }

    return await result.json();
}

export async function fetchAddToLibrary(
    bookId: number,
    userName: string,
    token: string,
    listType: string
) : Promise<any> {
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
        if (!result.ok) {
            throw new Error(resultData.message || "Failed to add book to library. Please try again.");
        }

        return resultData;
}
