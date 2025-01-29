// Seleciona todos os botões com a classe 'diretoria'
const diretoriaButtons = document.querySelectorAll('.diretoria');

// Loop para adicionar o evento de clique em cada botão
diretoriaButtons.forEach(button => {
    const submenu = button.nextElementSibling; // Seleciona o próximo elemento (submenu) relacionado ao botão

    button.addEventListener('click', function () {
        // Alterna a classe "show" no submenu para o efeito de deslizamento
        submenu.classList.toggle('show');

        // Alterna a classe "borda-branca" ao clicar no botão
        button.classList.toggle('borda-branca');

        // Alterna a visibilidade dos SVGs
        button.classList.toggle('show'); // Isso vai alternar entre os SVGs
    });
});


