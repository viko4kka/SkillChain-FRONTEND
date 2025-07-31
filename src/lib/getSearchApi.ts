

export async function getSearchApi(searchQuery: string){
    const response = await fetch(`http://localhost:3001/users?search=${searchQuery}`)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}