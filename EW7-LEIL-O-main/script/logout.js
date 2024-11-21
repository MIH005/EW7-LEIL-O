const url = 'https://go-wash-api.onrender.com/api/auth/logout';

async function logout() {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer' 
            },
            body: JSON.stringify({}), // Corpo da requisição (geralmente vazio)
        });

        if (response.ok) {
            alert('Logout bem-sucedido!');
            window.location.href = "index.html"
        } else {
            alert(response.data.error)
        }
    } catch (error) {
        alert("Tente novamente.");
        console.log(error);
    }
};
logout();
