export async function registerUser(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
) : Promise<any> {
    const result = await fetch("http://localhost:5175/api/Auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 1234BookCompassToken"
                },
                body: JSON.stringify({
                    userName: username,
                    email,
                    password,
                    confirmPassword,
                }),
            });

            if (!result.ok) {
                const error = await result.json();
                throw new Error(error.message || "Could not create account");
            }
            return await result.json();
}

export async function loginUser(
    userName: string,
    password: string
) : Promise<any> {
    const result = await fetch("http://localhost:5175/api/Auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer 1234BookCompassToken",
                },
                body: JSON.stringify({
                    userName,
                    password,
                }),
            });

            if (!result.ok) {
                const error = await result.json();
                throw new Error(error.message || "Wrong username or password! Try again");
            }

            return await result.json();
}