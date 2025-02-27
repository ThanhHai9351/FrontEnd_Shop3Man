const apiRequest = async (endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE',token?: string, body?: object ) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token || ''}`,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
};

export default apiRequest;