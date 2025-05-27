import { GroupedBooks } from "../interfaces";

export async function fetchUserLibrary(userName: string, token: string): Promise<GroupedBooks[]> {
    const result = await fetch(`http://localhost:5175/api/UserLibrary/getMyLibrary/${userName}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "X-User-Name": userName,
        }
    });

    if (!result.ok) {
        const error = await result.json();
        throw new Error(error.message || "Something went wrong. Try again!");
    }

    return await result.json();
}