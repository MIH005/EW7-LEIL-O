const url = `https://go-wash-api.onrender.com/api/auth/address/`;

function validarCampos() {
    let titulo = document.getElementById('title').value.trim();
    let cep = document.getElementById('cep').value.trim();
    let endereco = document.getElementById('address').value.trim();
    let numero = document.getElementById('number').value.trim();
    let complemento = document.getElementById('complement').value.trim();

if (!titulo && !cep && !endereco && !numero) {
        alert('É necessário preencher todos os campos obrigatórios!');
        return false;
}

if(cep.length !== 8){
    alert("Tamanho de CEP inválido.")
    return false;
}else{
    getAddress(cep);

}
if(!titulo){
    alert("É necessario preencher o campo titulo")
return false;
}
if(!endereco === true){
    alert("É necessario preencher o campo Endereço")
    return false;
}
if(numero.length < 1){
    alert("É necessario preencher o campo Numero")
    return false;
}

    return true;
}

//inpede o user de ficar enviando aquisições antes de carregar compl
const getAddres = async(cep) =>{
    cepInput.blur();
}

async function cadastroEndereco() {
    if (!validarCampos()) {
        return; 
    }

    let titulo = document.getElementById('title').value.trim();
    let cep = document.getElementById('cep').value.trim();
    let endereco = document.getElementById('address').value.trim();
    let numero = document.getElementById('number').value.trim();
    let complemento = document.getElementById('complement').value.trim();

    let token = JSON.parse(localStorege.getItem('user')).access_token


    try {
        let response = await fetch(url, {
            method: "POST", 
            body: JSON.stringify({
                "title": titulo,
                "cep": cep,
                "address": endereco,
                "number": numero,
                "complement": complemento
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });


            let resposta = await response.json();
            if (response.ok) {
                alert("Cadastro de endereço realizado com sucesso!");
            } else {
                alert("Ocorreu um erro. Tente novamente: ");
            }
    } catch (error) {
        alert("Ocorreu um erro ao realizar a requisição: " + error.message);
    }
}