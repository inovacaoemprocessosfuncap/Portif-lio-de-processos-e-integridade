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

// Seleciona os botões de cada seção
const btnProcesso = document.querySelector('.bntProcessos');
const btnIntegridade = document.querySelector('.bntIntegridade');

// Seleciona as seções
const secaoProcesso = document.querySelector('.processo');
const secaoIntegridade = document.querySelector('.Integridade');

// Função para mostrar uma seção
function mostrarSecao(secao) {
    secao.classList.add('show');  // Adiciona a classe 'show' para mostrar a seção
}

// Função para esconder uma seção
function esconderSecao(secao) {
    secao.classList.remove('show');  // Remove a classe 'show' para esconder a seção
}


// Evento de clique no botão "Processos"
btnProcesso.addEventListener('click', function () {
    esconderSecao(secaoIntegridade);  // Esconde a seção "Integridade"
    esconderSecao(secaoProcesso);  // Esconde a seção "Processos"

    // Ajusta a aparência dos botões
    btnProcesso.style.background = '#004823';
    btnProcesso.style.color = '#FDFDFD';
    btnIntegridade.style.background = '#E6E6E6';
    btnIntegridade.style.color = '#7F7F7F';

    // Atualiza o texto dos botões
    btnProcesso.textContent = 'Processos Mapeados';
    btnIntegridade.textContent = 'Integridade';
});

// Evento de clique no botão "Integridade"
btnIntegridade.addEventListener('click', function () {
    mostrarSecao(secaoIntegridade);  // Mostra a seção "Integridade"
    mostrarSecao(secaoProcesso);  // Mostra a seção "Processos"

    // Ajusta a aparência dos botões
    btnIntegridade.style.background = '#004823';
    btnIntegridade.style.color = '#FDFDFD';
    btnProcesso.style.background = '#E6E6E6';
    btnProcesso.style.color = '#7F7F7F';

    // Atualiza o texto dos botões
    btnIntegridade.textContent = 'Integridade';
    btnProcesso.textContent = 'Processos';
});



