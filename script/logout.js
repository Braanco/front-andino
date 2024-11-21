
document.getElementById("logout").addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.removeItem("token")
    window.location.href="http://127.0.0.1:5500/index.html";
   
});

document.getElementById("img-logout").addEventListener("click", function () {
    // Aqui você pode realizar o logout, por exemplo, removendo um token do localStorage
    localStorage.removeItem("token");

    // Redireciona para a página de login ou outra página
    window.location.href = "http://127.0.0.1:5500/index.html";
});
