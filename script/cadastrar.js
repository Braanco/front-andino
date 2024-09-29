const url = "http://localhost:8080/v1/star_chile/employee/create"

document.getElementById("submit-cadastrar").addEventListener("click", function (event) {
    event.preventDefault();

    const datas = {
        name: document.getElementById("cadastro-nome").value,
        numberRegistry: parseInt(document.getElementById("cadastro-registro").value, 10),
        salary: parseFloat(document.getElementById("cadastro-salario").value)
    };

    for (const [key, value] of Object.entries(datas)) {
        if (!value) {  // Se o valor for nulo, indefinido ou vazio
            alert(`${key} não pode ser nulo ou vazio`);
            return;  // Interrompe o envio se encontrar um campo inválido
        }
    }
    createEmployee(datas);

})

async function createEmployee(datas) {

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datas)
    });

    if (!response.ok) {
        const errorData = await response.json();
        alert("numero de registro já existe");
        throw new Error(errorData.message || "Ocorreu um erro no servidor")
    }

    const data = await response.json();
    alert("Empregado cadastrado com sucesso!");
    console.log('Funcionário salvo:', data);

}







let numberRegistry;

document.getElementById("submit-delete").addEventListener("click",async function (event) {
    event.preventDefault();
    await deleteEmployee()
})


document.getElementById("pesquisar").addEventListener("click", async function (event) {
    event.preventDefault();

    numberRegistry = parseInt(document.getElementById("registro").value, 10);
    
    await getEmployee(numberRegistry)
})


async function getEmployee(numberRegistry) {
    try {


        const response = await fetch(`http://localhost:8080/v1/star_chile/employee/get-Employee/${numberRegistry}`)

        if (!response.ok) {
            alert("empregado nao encontrado ou numero de registro errado");
            throw new Error("empregado nao encontrado")
            
        }

        const data = await response.json();
        console.log(data)
        displayData(data)
    } catch (error) {
        console.log(error.message)
    }

}

function displayData(data){

    const nome = document.querySelector("#campo-nome")
    const registro = document.querySelector("#campo-registro")
    const salario = document.querySelector("#campo-salario")

    nome.innerHTML = data.name;
    registro.innerHTML = data.numberRegistry;
    const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    salario.innerHTML = formatter.format(data.salary);
}



async function deleteEmployee() {
    try {
        
        if (!numberRegistry) {
            alert("Por favor, busque um registro primeiro."); // Verifica se o registro foi buscado
            return;
        }

        const response = await fetch(`http://localhost:8080/v1/star_chile/employee/delete/${numberRegistry}`, {
            method: 'DELETE', headers: {
                'Content-Type': 'application/json'
            },

        })

        if(response.ok){
            alert("empregado deletado com sucesso")
        }

        document.getElementById("campo-nome").innerText = ""
        document.getElementById("campo-registro").innerText = ""
        document.getElementById("campo-salario").innerText = ""


        if (!response.ok) {
            throw new Error("Erro ")
        }  
        
    } catch (error) {
        console.error(`Erro: ${error.message}`); // Captura a mensagem de erro
        alert("Erro ao deletar o registro");
    }



}

