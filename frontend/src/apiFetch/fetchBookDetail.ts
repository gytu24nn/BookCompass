import { BookDetailDto } from "../interfaces";

export async function fetchBookDetail(id: string): Promise<BookDetailDto> {
    const result = await fetch(`http://localhost:5175/api/Books/${id}`);

    if (!result.ok) {
        throw new Error("Could not fetch book details");
    }

    return await result.json();
}