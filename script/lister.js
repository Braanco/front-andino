const getUrl = "http://localhost:8080/v1/andino/getAll";
//const token = localStorage.getItem('token')

async function fetchApiData() {
    try {
        const response = await fetch(getUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        // Verifica se a resposta é bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}`);
        }

        // Converte a resposta em JSON
        const data = await response.json();

        // Função para exibir os dados no HTML
        displayData(data);

    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

// Função para exibir os dados no HTML
function displayData(data) {
    const tableBody = document.querySelector("#data-table tbody");

    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td>${item.phone}</td>
        <td>${item.addressClient}</td>
        <td>${item.hotelName}</td>
        <td>${item.hotelAddress}</td>
        <td>${item.tourDate}</td>
        <td>${item.personQuantity}</td>
        <td>${item.tourName}</td>
        <td>${item.finalPrice}</td>
        <td><button class="delete-btn" data-id = "${item.id}">delete</button></td>
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



// Chama a função para buscar e exibir os dados
fetchApiData();

document.getElementById("pesquisar").addEventListener("click", function (event) {
    event.preventDefault();

    const datas = {
        dateInicial: document.getElementById("pesquisa-inicial").value,
        dateFinal: document.getElementById("pesquisa-final").value
    }
    setData(datas);


})

async function setData(datas) {

    try {


        const response = await fetch(`http://localhost:8080/v1/andino/getAll/${datas.dateInicial}/${datas.dateFinal}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar dados por data.");
        }

        const data = await response.json();
        console.log(data);
        displayData(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
        alert('Erro ao buscar dados. Tente novamente.');
    }
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
        fetchApiData(); // Atualiza os dados após a exclusão
    } catch (error) {
        console.error('Erro ao deletar:', error);
        alert('Erro ao deletar o item. Tente novamente.');
    }
}
