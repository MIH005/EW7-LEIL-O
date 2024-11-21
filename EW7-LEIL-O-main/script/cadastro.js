const url = 'https://go-wash-api.onrender.com/api/user';

// Função para validar os campos do formulário
function validarCampos() {
    let nome = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let cpf_cnpj = document.getElementById('cpf_cnpj').value;
    let birthday = document.getElementById('birthday').value;
    let terms = document.getElementById('terms').checked;

    // Verifica se todos os campos estão preenchidos
    if (nome === "" && email === "" && password === "" && cpf_cnpj === "" && birthday === "") {
        alert("Por favor, preencha todos os campos.");
        return false; // Retorna falso se todos os campos estiverem vazios
    }

    
    if (nome === "") {
        alert("Por favor, preencha o campo Nome.");
        return false;
    }
    if (email === "") {
        alert("Por favor, preencha o campo Email.");
        return false;
    }
    if (!email.includes('@')) {
        alert("Por favor, insira um email válido.");
        return false;
    }
    if (password === "") {
        alert("Por favor, preencha o campo Senha.");
        return false;
    }
    if (password.length < 6) {
        alert("A senha precisa ter no mínimo 6 caracteres.");
        return false;
    }
    if (cpf_cnpj === "") {
        alert("Por favor, preencha o campo CPF/CNPJ.");
        return false;
    }
    if (cpf_cnpj.length < 11) {
        alert("Por favor, insira um CPF/CNPJ válido.");
        return false;
    }
    if (birthday === "") {
        alert("Por favor, preencha o campo Data de Nascimento.");
        return false;
    }
    if (!terms) {
        alert("Você precisa aceitar os termos.");
        return false;
    }
    
    return true; 
}


async function cadastro() {

    if (!validarCampos()) {
        return; 
    }

 
    let nome = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let cpf_cnpj = document.getElementById('cpf_cnpj').value;
    let birthday = document.getElementById('birthday').value;
    let terms = document.getElementById('terms').checked; 



    //let token = JSON.parse(localStorage.getItem('user')).access_token

    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({   //stringify deixa em json pra colocar na api
            "name": nome,
            "email": email,
            "user_type_id": 1,
            "password": password,
            "cpf_cnpj": cpf_cnpj,
            "terms": terms ? 1 : 0,
            "birthday": birthday
        }),
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': "Bearer " + token
        }
    });


    if (response.ok) {
        let resposta = await response.json();
        alert("Cadastro realizado com sucesso!");
    } else {
        let respostaErros = await response.json();
        if (respostaErros.data && respostaErros.data.errors) {
            if (respostaErros.data.errors.email) {
                alert("Erro no email: " + respostaErros.data.errors.email[0]);
            }
            if (respostaErros.data.errors.cpf_cnpj) {
                alert("Erro no CPF/CNPJ: " + respostaErros.data.errors.cpf_cnpj[0]);
            }
            if (respostaErros.data.errors.password) {
                alert("Erro na senha: " + respostaErros.data.errors.password[0]);
            }
            if (respostaErros.data.errors.name) {
                alert("Erro no nome: " + respostaErros.data.errors.name[0]);
            }
            if (respostaErros.data.errors.birthday) {
                alert("Erro na data de nascimento: " + respostaErros.data.errors.birthday[0]);
            }
        } else {
            alert("Ocorreu um erro. Tente novamente.");
        }
    }
}
 
