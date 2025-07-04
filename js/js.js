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
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Evento de mostra seção 

// Seleciona os botões de cada seção
const btnProcesso = document.querySelector('.bntProcessos');
const btnIntegridade = document.querySelector('.bntIntegridade');

// Seleciona as seções
const secaoProcesso = document.querySelector('.processo');
const secaoIntegridade = document.querySelector('.Integridade');

// Seleciona o Menu-dropdown e a nova seção
const menuDropdown = document.querySelector('.Menu-dropdown');
const secao_Integridade = document.querySelector('.secao_Integridade');

// Função para mostrar uma seção
function mostrarSecao(secao) {
    secao.style.display = 'flex'; // Mostra a seção
    setTimeout(() => {
        secao.style.opacity = '1'; // Torna a seção visível com transição
        secao.style.display = 'flex';
    }, 10);
}

// Função para esconder uma seção
function esconderSecao(secao) {
    secao.style.opacity = '0'; // Torna a seção transparente
    setTimeout(() => {
        secao.style.display = 'none'; // Oculta a seção após a transição
    }, 300); // Tempo correspondente à duração da transição
}

// Inicialmente, mostra a seção "Processos" e o Menu-dropdown
mostrarSecao(secaoProcesso); // Mostra a seção "Processos"
mostrarSecao(menuDropdown); // Mostra o Menu-dropdown
esconderSecao(secaoIntegridade); // Esconde a seção "Integridade"
esconderSecao(secao_Integridade); // Esconde a nova seção

// Evento de clique no botão "Processos"
btnProcesso.addEventListener('click', function () {
    esconderSecao(secaoIntegridade);  // Esconde a seção "Integridade"
    esconderSecao(secao_Integridade); // Esconde a nova seção
    mostrarSecao(secaoProcesso);  // Mostra a seção "Processos"
    mostrarSecao(menuDropdown); // Mostra o Menu-dropdown

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
    esconderSecao(menuDropdown); // Esconde o Menu-dropdown
    mostrarSecao(secaoIntegridade);  // Mostra a seção "Integridade"
    mostrarSecao(secao_Integridade); // Mostra a nova seção

    // Ajusta a aparência dos botões
    btnIntegridade.style.background = '#2EAB52';
    btnIntegridade.style.color = '#FDFDFD';
    btnProcesso.style.background = '#E6E6E6';
    btnProcesso.style.color = '#7F7F7F';

    // Atualiza o texto dos botões
    btnIntegridade.textContent = 'Integridade';
    btnProcesso.textContent = 'Processos Mapeados';
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Evento da pag

document.addEventListener("DOMContentLoaded", function () {
    // Função para detectar a seção ativa
    function getActiveSection() {
        return document.querySelector('.conteudo[style*="display: block"]');
    }

    // Função para exibir a página correta dentro da seção ativa
    function showPage(pageNumber, activeSection) {
        if (!activeSection) return;

        const sectionName = activeSection.classList[0]; // Nome da classe da seção ativa
        const pages = activeSection.querySelectorAll(`[class^="${sectionName}-pag-"]`);

        // Esconde todas as páginas dentro da seção ativa
        pages.forEach(page => page.classList.remove('active'));

        // Mostra a página correspondente
        const activePage = activeSection.querySelector(`.${sectionName}-pag-${pageNumber}`);
        if (activePage) {
            activePage.classList.add('active');
        }
    }

    // Inicializa a página ao carregar
    document.querySelectorAll('.conteudo').forEach(section => {
        showPage(1, section); // Sempre inicia na página 1
    });

    // Evento para os botões de paginação
    document.querySelectorAll('.paginacao').forEach(pagination => {
        pagination.addEventListener('click', function (event) {
            const button = event.target;
            const activeSection = getActiveSection();
            if (!activeSection) return;

            let currentPage = parseInt(activeSection.getAttribute("data-current-page")) || 1;
            let totalPages = activeSection.querySelectorAll(`[class^="${activeSection.classList[0]}-pag-"]`).length;

            if (button.classList.contains('page-number')) {
                const page = parseInt(button.getAttribute('data-page'));
                if (page >= 1 && page <= totalPages) {
                    currentPage = page; // Atualiza a página ativa
                }
            } else if (button.classList.contains('next')) {
                if (currentPage < totalPages) currentPage++;
            } else if (button.classList.contains('prev')) {
                if (currentPage > 1) currentPage--;  // Corrigido para garantir que não vá abaixo de 1
            }

            activeSection.setAttribute("data-current-page", currentPage);
            showPage(currentPage, activeSection);
        });
    });
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Evento do sub-menu

//Evento do sub-menu

document.addEventListener("DOMContentLoaded", function () {
    // Seleciona todos os botões de diretoria
    const diretorias = document.querySelectorAll(".diretoria");

    diretorias.forEach((diretoria) => {
        diretoria.addEventListener("click", function () {
            const subMenu = this.nextElementSibling;
            
            if (subMenu.style.maxHeight && subMenu.style.maxHeight !== "0px") {
                subMenu.style.maxHeight = "0";
                subMenu.style.opacity = "0";
                setTimeout(() => (subMenu.style.display = "none"), 500);
            } else {
                subMenu.style.display = "block";
                setTimeout(() => {
                    subMenu.style.maxHeight = subMenu.scrollHeight + "px";
                    subMenu.style.opacity = "1";
                }, 10);
            }
        });
    });

    // ⛳️ SUBSTITUA este trecho inteiro abaixo ⬇️ pelo novo com .selected
    const subMenuButtons = document.querySelectorAll(".sub-menu button");

    subMenuButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const sectionName = this.textContent.trim().replace(/\s+/g, '');
            const targetSection = document.querySelector(`.${sectionName}`);

            // ✅ ADICIONA AQUI A CLASSE selected
            subMenuButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');

            // Esconde todas as seções
            document.querySelectorAll(".conteudo").forEach((section) => {
                section.style.display = "none";
            });

            // Exibe apenas a seção correspondente
            if (targetSection) {
                targetSection.style.display = "block";
            }
        });
    });
});

  ////////////////////////////////////////////////////////////////////////////////////////////
  