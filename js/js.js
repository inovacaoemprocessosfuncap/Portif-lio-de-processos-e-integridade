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

// Função para mostrar uma seção com transição suave
function mostrarSecao(secao) {
    secao.classList.add('show');  // Adiciona a classe 'show' para mostrar a seção
}

// Função para esconder uma seção com transição suave
function esconderSecao(secao) {
    secao.classList.remove('show');  // Remove a classe 'show' para esconder a seção
}

// Inicialmente, mostra a seção "Processos" e esconde a de "Integridade"
mostrarSecao(secaoProcesso);
esconderSecao(secaoIntegridade);

// Evento de clique no botão "Processos"
btnProcesso.addEventListener('click', function () {
    esconderSecao(secaoIntegridade);  // Esconde a seção "Integridade"
    mostrarSecao(secaoProcesso);  // Mostra a seção "Processos"

    // Ajusta a aparência dos botões
    btnProcesso.style.background = '#2EAB52';
    btnProcesso.style.color = '#FDFDFD';
    btnIntegridade.style.background = '#E6E6E6';
    btnIntegridade.style.color = '#7F7F7F';

    // Atualiza o texto dos botões
    btnProcesso.textContent = 'Processos Mapeados';
    btnIntegridade.textContent = 'Integridade';
});

// Evento de clique no botão "Integridade"
btnIntegridade.addEventListener('click', function () {
    esconderSecao(secaoProcesso);  // Esconde a seção "Processos"
    mostrarSecao(secaoIntegridade);  // Mostra a seção "Integridade"

    // Ajusta a aparência dos botões
    btnIntegridade.style.background = '#2EAB52';
    btnIntegridade.style.color = '#FDFDFD';
    btnProcesso.style.background = '#E6E6E6';
    btnProcesso.style.color = '#7F7F7F';

    // Atualiza o texto dos botões
    btnIntegridade.textContent = 'Integridade';
    btnProcesso.textContent = 'Processos Mapeados';
});

//paginação
// Inicializa a página ativa
let currentPage = 1;
const totalPages = 3;

// Função para mostrar a página atual e esconder as outras
function showPage(pageNumber) {
    // Esconde todas as páginas
    const pages = document.querySelectorAll('.GEAD-pag-1, .GEAD-pag-2, .GEAD-pag-3');
    pages.forEach(page => page.classList.remove('active'));

    // Mostra a página correspondente
    const activePage = document.querySelector(`.GEAD-pag-${pageNumber}`);
    if (activePage) {
        activePage.classList.add('active');
    }

    // Atualiza os botões de página numerada
    const pageButtons = document.querySelectorAll('.page-number');
    pageButtons.forEach(button => {
        // Remove a classe active de todos os botões
        button.classList.remove('active');
        
        // Se o botão corresponder à página atual, adiciona a classe active
        if (parseInt(button.getAttribute('data-page')) === pageNumber) {
            button.classList.add('active');
        }
    });
}

// Inicializa a página ao carregar
document.addEventListener("DOMContentLoaded", function () {
    showPage(currentPage);

    // Ação de clicar nas páginas numeradas
    const pageButtons = document.querySelectorAll('.page-number');
    pageButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const page = parseInt(event.target.getAttribute('data-page'));
            if (page >= 1 && page <= totalPages) {
                currentPage = page;
                showPage(currentPage);
            }
        });
    });

    // Ação de navegar para a próxima página
    const nextButton = document.querySelectorAll('.next');
    nextButton.forEach(button => {
        button.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                showPage(currentPage);
            }
        });
    });

    // Ação de navegar para a página anterior
    const prevButton = document.querySelectorAll('.prev');
    prevButton.forEach(button => {
        button.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                showPage(currentPage);
            }
        });
    });
});





