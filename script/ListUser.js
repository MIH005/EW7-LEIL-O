const url = 'https://go-wash-api.onrender.com/api/auth/address/';

async function listarEnderecos() {
    let user = localStorage.getItem("user");

    if (!user) {
        alert("Faça login para ver os endereços.");
        return;
    }

    let parsedUser = JSON.parse(user);
    let token = parsedUser.access_token;

    try {
        let resposta = await fetch(url, {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + token // Correção aqui
            }
        });

        if (resposta.ok) {
            let enderecos = await resposta.json();
            let listaEnderecos = document.getElementById('addressList');
            listaEnderecos.innerHTML = ""; // Limpa a lista

            for (let endereco of enderecos.data) { // Correção aqui
                let item = document.createElement('li');
                item.textContent = endereco.title + ", " + endereco.address + ", " + endereco.number + ", " + endereco.cep + ", " + (endereco.complement || "");
                listaEnderecos.appendChild(item);
            }
        } else {
            alert("Erro ao listar endereços.");
        }
    } catch (erro) {
        alert("Erro de conexão.");
        console.log(erro);
    }
}

listarEnderecos();