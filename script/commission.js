const url = "http://localhost:8080/v1/andino/employee/get-Employee/";
const urlClient = "http://localhost:8080/v1/andino/employee/"
//const token = localStorage.getItem('token')


document.getElementById("submit-pesquisar").addEventListener('click', function (event) {
    event.preventDefault();

    const data = {
        numberRegistry: parseInt(document.getElementById("numero-registro").value, 10)
    };

    if (!isNaN(data.numberRegistry)) {
        sendData(data.numberRegistry);
        displayDataClient(data.numberRegistry);
    } else {
        console.error('Número de registro inválido.');
    }
})


async function sendData(numberRegistry) {
    try {
        const response = await fetch(`${url}${numberRegistry}`,{
            method:'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            alert("Empregado não encontrado ou não existe")
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        const datas = await response.json();

        displayData(datas);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }

}

function displayData(datas) {

    const nome = document.querySelector("#campo-nome");
    const registro = document.querySelector("#campo-registro");
    const comissao = document.querySelector("#campo-comissao")

    nome.innerHTML = datas.name;
    registro.innerHTML = datas.numberRegistry;

    const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
    comissao.innerHTML = formatter.format(datas.commission);

}


async function displayDataClient(numberRegistry) {
    var response = await fetch(`${urlClient}${numberRegistry}`,{
        method:'GET',
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
    }
    const datas = await response.json();


    const tableBody = document.querySelector("#data-table tbody");

    tableBody.innerHTML = '';
    const formatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

    datas.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
             <td>${item.id}</td>
             <td>${item.name}</td>
             <td>${item.phone}</td>
             <td>${item.addressClient}</td>
             <td>${item.personQuantity}</td>
             <td>${item.tourDate}</td>
             <td>${item.tourName}</td>
             <td>${formatter.format(item.price)}</td>
             <td>${formatter.format(item.finalPrice)}</td>
             <td><button class="delete-btn" data-id="${item.id}">deletar</button></td>
         `;

        tableBody.appendChild(row);
    });

      //add o a ação de deletar o dado
      document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            const id = event.target.getAttribute('data-id');
            const confirmDelete = confirm(`Deseja realmente deletar o item com ID ${id}?`);

            if (confirmDelete) {
                await deletar(id); // Chama a função de deletar
            }
        });
    });
}

//deletar o cliente
const urlDelete = "http://localhost:8080/v1/andino/delete/"
async function deletar(id) {
    try {
        const response = await fetch(urlDelete +id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao deletar o item com ID ${id}. Status: ${response.status}`);
        }

        alert(`Item com ID ${id} foi deletado com sucesso.`);
         
        const numberRegistry = document.getElementById("numero-registro").value;
        if (numberRegistry) {
            await displayDataClient(numberRegistry);
        }
    } catch (error) {
        console.error('Erro ao deletar:', error);
        alert('Erro ao deletar o item. Tente novamente.');
    }
}