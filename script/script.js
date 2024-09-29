const postUrl = "http://localhost:8080/v1/star_chile/create";

document.getElementById("submit-register").addEventListener("click", function (event) {
    event.preventDefault();
    const datas = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        addressClient: document.getElementById("home_address").value,
        hotelName: document.getElementById("hotel_name").value,
        hotelAddress: document.getElementById("hotel_address").value,
        tourDate: document.getElementById("tour_date").value,
        personQuantity: parseInt(document.getElementById("person_quantity").value, 10),
        tourId: document.getElementById("tour_name").value,
        numberRegistry: parseInt(document.getElementById("register").value, 10)
    };

    // Validação para garantir que nenhum campo seja nulo ou vazio
    for (const [key, value] of Object.entries(datas)) {
        if (!value) {  // Se o valor for nulo, indefinido ou vazio
            alert(`${key} não pode ser nulo ou vazio`);
            return;  // Interrompe o envio se encontrar um campo inválido
        }
    }
    sendData(datas);
});



async function sendData(datas) {
    const response = await fetch(postUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datas)
    })
    if (!response.ok) {
        const errorData = await response.json();
        alert("Esse empregado não existe!")
        throw new Error(errorData.message || "Employee not found")
    }

    const data = await response.json();
    alert("sucesso!");
    console.log('Funcionário salvo:', data);


}

