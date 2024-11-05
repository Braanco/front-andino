const getUrl = "http://localhost:8080/v1/andino/getAll";

async function fetchApiData() {
    try {
        const response = await fetch(getUrl);

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

    data.forEach(item =>{
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
    `;

    tableBody.appendChild(row);
    })
}

// Chama a função para buscar e exibir os dados
fetchApiData();

document.getElementById("pesquisar").addEventListener("click",function(event) {
event.preventDefault();

    const datas ={
        dateInicial: document.getElementById("pesquisa-inicial").value,
        dateFinal:document.getElementById("pesquisa-final").value
    }
    setData(datas);
    

})

async function setData(datas) {
    
    try {
        

        const response = await fetch(`http://localhost:8080/v1/andino/getAll/${datas.dateInicial}/${datas.dateFinal}`);

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