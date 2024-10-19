const url = 'https://go-wash-api.onrender.com/api/login';

function validaçaoCampo() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value; 

    if(!email && !password){
        alert("É necessario todos os campos preenchidos! ")
    }
    if(!email){
        alert("É necessario preencher o campo Email")
        return false;
    }
    if(!password){
        alert("É necessario preencher o campo Senha")
        return false; 
    }
    return true;
}


async function login() { 
    if(!validaçaoCampo()){
        return;
    }

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    
    let api = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "email": email,
            "password": password,
            "user_type_id": 1
        }),
        headers: {
            'Content-Type': 'application/json',
        }
       
    });

    let resposta = await api.json();
    if (api.ok) {
        localStorage.setItem("user", JSON.stringify(resposta))
        alert("Login sucesso")
        window.location.href = "home.html"
    } else {
        alert(resposta.data.errors)
    }
    
}





    // let respostaErro = await response.json();
    // console.log(respostaErro)
    
