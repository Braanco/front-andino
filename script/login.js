const url = "http://localhost:8080/v1/andino/login"

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Obtém os valores do formulário
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    login(username, password)
});


async function login(username, password) {

    const body = {
        username: username,
        password: password
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            // Se a resposta não for ok, lança um erro com a mensagem retornada
            const errorData = await response.json();
            throw new Error(errorData.message || 'Falha na autenticação');
        }

        const data = await response.json(); // Captura a resposta em JSON
        const token = data.token; // Supondo que o token está no campo "token" da resposta

        // Armazena o token no localStorage (ou sessionStorage)
        localStorage.setItem('token', token);
        alert('Login bem-sucedido!');
        console.log(token)
        window.location.href = "http://127.0.0.1:5500/view/home.html"

        // Você pode redirecionar o usuário ou fazer outra ação após o login
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert(error.message); // Exibe a mensagem de erro
    }
}
