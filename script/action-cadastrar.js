let token = localStorage.getItem('token');
let urltoken = token;

async function buscarDados() {
    try {
        const response = await fetch(`http://localhost:8080/v1/andino/login/${urltoken}`, {
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

        if(data.role == "USER"){
            const link = document.getElementById("cadastrar");
            link.style.display='none';
        }
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}
buscarDados();