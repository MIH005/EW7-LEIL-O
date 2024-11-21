const url = `https://go-wash-api.onrender.com/api/auth/address/`;

function validarCampos() {
    let titulo = document.getElementById('title').value;
    let cep = document.getElementById('cep').value;
    let endereco = document.getElementById('address').value;
    let numero = document.getElementById('number').value;
    let complemento = document.getElementById('complement').value;

    if (!titulo && !cep && !endereco && !numero) {
        alert('É necessário preencher todos os campos obrigatórios!');
        return false;
    }

    if (!titulo) {
        alert("É necessario preencher o campo título");
        return false;
    }

    if (!endereco) {
        alert("É necessário preencher o campo Endereço");
        return false;
    }

    if (!numero) {
        alert("É necessário preencher o campo Número");
        return false;
    }

    if (cep.length !== 8) {
        alert("O CEP deve conter exatamente 8 dígitos!");
        return false;
    }
    
    return true;
}

async function cadastroEndereco() {
    if (!validarCampos()) {
        return;
    }

    // Verifica se o token existe no localStorage
    let user = localStorage.getItem("user");
    
    if (!user) {
        alert("Usuário não autenticado. Por favor, faça login.");
        return;
    }

    let parsedUser = JSON.parse(user);
    
    if (!parsedUser.access_token) {
        alert("Token de acesso não encontrado. Por favor, faça login novamente.");
        return;
    }

    let token = parsedUser.access_token;
    let titulo = document.getElementById('title').value;
    let cep = document.getElementById('cep').value;
    let endereco = document.getElementById('address').value;
    let numero = document.getElementById('number').value;
    let complemento = document.getElementById('complement').value;

    try {
        let api = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                "title": titulo,
                "cep": cep,
                "address": endereco,
                "number": numero,
                "complement": complemento // Incluindo o complemento
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token // Corrigido para adicionar o espaço
            }
        });

        if (api.ok) {
            let responseData = await api.json();
            alert("Cadastro de endereço realizado com sucesso!");
            window.location.href = "../view/home.html";
        } else {
            alert("Ocorreu um erro no cadastro do endereço");
        }
    } catch (error) {
        alert("Ocorreu um erro de conexão com a API");
        console.error(error);
    }
}
