
const url = 'https://go-wash-api.onrender.com/api/auth/address/';

// Função para listar os endereços e exibir na tabela
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
                'Authorization': 'Bearer ' + token
            }
        });

        if (resposta.ok) {
            let enderecos = await resposta.json();
            let tabela = document.getElementById('addressList');
            tabela.innerHTML = ""; // Limpa a tabela antes de adicionar os novos dados

            // Adiciona cada endereço na tabela
            enderecos.data.forEach(endereco => {
                adicionarLinhaTabela(endereco);
            });
        } else {
            alert("Erro ao listar endereços.");
        }
    } catch (erro) {
        alert("Erro de conexão.");
        console.log(erro);
    }
}

// Função para adicionar uma linha na tabela
function adicionarLinhaTabela(dadosEndereco) {
    let tabela = document.getElementById('addressList');
    
    // Cria uma nova linha (tr)
    let row = document.createElement('tr');

    // Cria células (td) para cada dado e preenche com as informações
    let cellTitle = document.createElement('td');
    cellTitle.textContent = dadosEndereco.title || '';
    
    let cellAddress = document.createElement('td');
    cellAddress.textContent = dadosEndereco.address || '';

    let cellNumber = document.createElement('td');
    cellNumber.textContent = dadosEndereco.number || '';

    let cellCep = document.createElement('td');
    cellCep.textContent = dadosEndereco.cep || '';

    let cellComplement = document.createElement('td');
    cellComplement.textContent = dadosEndereco.complement || '';

    // Cria uma célula para o botão de ação (editar)
    let cellActions = document.createElement('td');
    let btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.onclick = function() {
        editarEndereco(dadosEndereco); // Passa o objeto completo do endereço para edição
    };
    cellActions.appendChild(btnEditar);

    // Adiciona as células à linha
    row.appendChild(cellTitle);
    row.appendChild(cellAddress);
    row.appendChild(cellNumber);
    row.appendChild(cellCep);
    row.appendChild(cellComplement);
    row.appendChild(cellActions);

    // Adiciona a linha à tabela
    tabela.appendChild(row);
}

async function editarEndereco(dadosEndereco) {
    let user = localStorage.getItem("user");

    if (!user) {
        alert("Faça login para editar o endereço.");
        return;
    }

    let parsedUser = JSON.parse(user);
    let token = parsedUser.access_token;

    //coleta os dados que o usuário deseja atualizar.
    let novoEndereco = {
        title: prompt("Novo título:", dadosEndereco.title),
        address: prompt("Novo endereço:", dadosEndereco.address),
        number: prompt("Novo número:", dadosEndereco.number),
        cep: prompt("Novo CEP:", dadosEndereco.cep),
        complement: prompt("Novo complemento:", dadosEndereco.complement)
    };

    try {
        let resposta = await fetch(url + dadosEndereco.id, {
            method: "POST", // Método Post para atualizar
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoEndereco) // Envia os novos dados 
        });

        if (resposta.ok) {
            alert("Endereço atualizado com sucesso!");
            listarEnderecos(); // Recarrega a lista de endereços após a atualização
        } else {
            alert("Erro ao atualizar o endereço.");
        }
    } catch (erro) {
        alert("Erro de conexão.");
        console.log(erro);
    }
}

// Carrega os endereços ao inicializar a página
listarEnderecos();





// //const url = 'https://go-wash-api.onrender.com/api/auth/address/';

// async function listarEnderecos() {
//     let user = localStorage.getItem("user");

//     if (!user) {
//         alert("Faça login para ver os endereços.");
//         return;
//     }

//     let parsedUser = JSON.parse(user);
//     let token = parsedUser.access_token;

//     try {
//         let resposta = await fetch(url, {
//             method: "GET",
//             headers: {
//                 'Authorization': 'Bearer ' + token // Correção aqui
//             }
//         });

//         if (resposta.ok) {
//             let enderecos = await resposta.json();
//             let listaEnderecos = document.getElementById('addressList');
//             listaEnderecos.innerHTML = ""; // Limpa a lista

//             for (let endereco of enderecos.data) { // Correção aqui
//                 let item = document.createElement('li');
//                 item.textContent = endereco.title + ", " + endereco.address + ", " + endereco.number + ", " + endereco.cep + ", " + (endereco.complement || "");
//                 listaEnderecos.appendChild(item);
//             }
//         } else {
//             alert("Erro ao listar endereços.");
//         }
//     } catch (erro) {
//         alert("Erro de conexão.");
//         console.log(erro);
//     }
// }

// listarEnderecos();