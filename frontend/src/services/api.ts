const backendUrl = "http://localhost:8000/";

export const signUp = async (username: string): Promise<string> => {

    const response = await fetch(backendUrl + 'users/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
    });

    if (!response.ok) {
        throw new Error("Failed to sign up");
    }

    const responseData = await response.json();
    return responseData.id;
};