// Espera todo o conteúdo da página carregar ANTES de executar qualquer script
document.addEventListener('DOMContentLoaded', function() {

    // --- 1. LÓGICA DO MENU SANFONA (PROCESSOS: DIRETORIAS) ---
    const diretoriaButtons = document.querySelectorAll('.diretoria');
    diretoriaButtons.forEach(button => {
        const submenu = button.nextElementSibling;
        button.addEventListener('click', function () {
            submenu.classList.toggle('show');
            button.classList.toggle('borda-branca');
            button.classList.toggle('show');
        });
    });

    // --- 2. LÓGICA DAS ABAS PRINCIPAIS (PROCESSOS vs INTEGRIDADE) ---
    // (Esta é a seção corrigida)
    const btnProcesso = document.querySelector('.bntProcessos');
    const btnIntegridade = document.querySelector('.bntIntegridade');

    // Seleciona os containers de TEXTO
    const secaoProcessoTexto = document.querySelector('.processo');
    const secaoIntegridadeTexto = document.querySelector('.Integridade-texto');

    // Seleciona os containers de CONTEÚDO (Menu + Parte Branca)
    const containerProcessos = document.querySelector('.Menu-dropdown');
    const containerMenuIntegridade = document.querySelector('.Menu-dropdown-integridade');
    const containerConteudoIntegridade = document.querySelector('.secao_Integridade');

    // **NOVO**: Seleciona o container PAI de tudo
    const menuContainer = document.querySelector('.menu');

    // Funções de fade (sua lógica original)
    function mostrarSecao(secao) {
        if (!secao) return; // Proteção contra elemento não encontrado
        secao.style.display = 'flex';
        setTimeout(() => {
            secao.style.opacity = '1';
        }, 10);
    }

    function esconderSecao(secao) {
        if (!secao) return; // Proteção
        secao.style.opacity = '0';
        setTimeout(() => {
            secao.style.display = 'none';
        }, 300);
    }

    // Inicialização (mostra Processos por padrão)
    mostrarSecao(secaoProcessoTexto);
    mostrarSecao(containerProcessos);
    esconderSecao(secaoIntegridadeTexto);
    esconderSecao(containerMenuIntegridade);
    esconderSecao(containerConteudoIntegridade);

    // Evento "Processos"
    btnProcesso.addEventListener('click', function () {
        esconderSecao(secaoIntegridadeTexto);
        esconderSecao(containerMenuIntegridade);
        esconderSecao(containerConteudoIntegridade);
        
        mostrarSecao(secaoProcessoTexto);
        mostrarSecao(containerProcessos);

        // **NOVO**: Remove a classe de layout especial
        if (menuContainer) {
            menuContainer.classList.remove('integridade-layout-ativo');
        }

        // Estilos dos botões
        btnProcesso.style.background = '#2EAB52';
        btnProcesso.style.color = '#FDFDFD';
        btnIntegridade.style.background = '#E6E6E6';
        btnIntegridade.style.color = '#7F7F7F';
    });

    // Evento "Integridade" (COM A CORREÇÃO)
    btnIntegridade.addEventListener('click', function () {
        esconderSecao(secaoProcessoTexto);
        esconderSecao(containerProcessos);
        
        mostrarSecao(secaoIntegridadeTexto); // Mostra o texto
        mostrarSecao(containerMenuIntegridade); // Mostra o menu verde
        mostrarSecao(containerConteudoIntegridade); // Mostra a parte branca

        // **NOVO**: Adiciona a classe especial para o CSS consertar o layout
        if (menuContainer) {
            menuContainer.classList.add('integridade-layout-ativo');
        }

        // Estilos dos botões
        btnIntegridade.style.background = '#2EAB52';
        btnIntegridade.style.color = '#FDFDFD';
        btnProcesso.style.background = '#E6E6E6';
        btnProcesso.style.color = '#7F7F7F';

        // --- INÍCIO DA FUNÇÃO: MOSTRAR "ÉTICA" AUTOMATICAMENTE ---
        // (Baseado no seu código original)
        
        // 1. Esconde todos os conteúdos de integridade (parte branca)
        if (containerConteudoIntegridade) {
            containerConteudoIntegridade.querySelectorAll('.conteudo').forEach(content => {
                content.style.display = 'none';
            });
            
            // 2. Mostra o conteúdo "Ética"
            const conteudoEtica = containerConteudoIntegridade.querySelector('.Ética');
            if (conteudoEtica) {
                conteudoEtica.style.display = 'block';
            }
        }

        // 3. Reseta e seleciona o *botão* "Ética"
        const integridadeTabButtons = document.querySelectorAll('.integridade-tab');
        integridadeTabButtons.forEach(btn => {
            if (btn.textContent.trim() === 'Ética') {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });
        // --- FIM DA FUNÇÃO ---
    });


    // --- 3. LÓGICA DE PAGINAÇÃO ---
    // (Seu código original)
    function getActiveSection() {
        return document.querySelector('.conteudo[style*="display: block"]');
    }
    function showPage(pageNumber, activeSection) {
        if (!activeSection) return;
        const sectionName = activeSection.classList[0];
        const pages = activeSection.querySelectorAll(`[class^="${sectionName}-pag-"]`);
        pages.forEach(page => page.classList.remove('active'));
        const activePage = activeSection.querySelector(`.${sectionName}-pag-${pageNumber}`);
        if (activePage) {
            activePage.classList.add('active');
        }
    }
    document.querySelectorAll('.conteudo').forEach(section => {
        showPage(1, section);
    });
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
                    currentPage = page;
                }
            } else if (button.classList.contains('next')) {
                if (currentPage < totalPages) currentPage++;
            } else if (button.classList.contains('prev')) {
                if (currentPage > 1) currentPage--;
            }
            activeSection.setAttribute("data-current-page", currentPage);
            showPage(currentPage, activeSection);
        });
    });

    // --- 4. LÓGICA DO SUB-MENU (PROCESSOS: GEAD, RH, etc.) ---
    // (Seu código original)
    const subMenuButtons = document.querySelectorAll(".sub-menu button");
    subMenuButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const sectionName = this.textContent.trim().replace(/\s+/g, '');
            // CORREÇÃO: Procura a seção *apenas dentro* do menu de Processos
            const targetSection = document.querySelector(`.Menu-dropdown .${sectionName}`);

            subMenuButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');

            // CORREÇÃO: Esconde *apenas* os conteúdos de Processos
            document.querySelectorAll(".Menu-dropdown .conteudo").forEach((section) => {
                section.style.display = "none";
            });

            if (targetSection) {
                targetSection.style.display = "block";
            }
        });
    });

    // --- 5. LÓGICA DE PESQUISA LOCAL ---
    // (Seu código original)
    const todosOsCamposDePesquisa = document.querySelectorAll('.pesquisa input[type="search"]');
    function executarPesquisaLocal(termo) {
        const termoPesquisado = termo.toLowerCase().trim();
        const secaoAtiva = document.querySelector('.conteudo[style*="display: block"]');
        if (!secaoAtiva) return;
        const paginacaoDaSecao = secaoAtiva.querySelector('.paginacao');
        const paginasDaSecao = secaoAtiva.querySelectorAll('[class*="-pag-"]');
        const paginaAtivaOriginal = secaoAtiva.querySelector('[class*="-pag-"].active');
        if (termoPesquisado.length === 0) {
            if (paginacaoDaSecao) paginacaoDaSecao.style.display = 'block';
            paginasDaSecao.forEach(pag => pag.style.display = 'none');
            if (paginaAtivaOriginal) {
                paginaAtivaOriginal.style.display = 'block';
            } else if (paginasDaSecao.length > 0) {
                paginasDaSecao[0].style.display = 'block';
            }
            secaoAtiva.querySelectorAll('.documentos').forEach(proc => proc.style.display = '');
            return;
        }
        if (paginacaoDaSecao) paginacaoDaSecao.style.display = 'none';
        paginasDaSecao.forEach(pagina => {
            let paginaTemResultados = false;
            const processosDaPagina = pagina.querySelectorAll('.documentos');
            processosDaPagina.forEach(processo => {
                const tituloElemento = processo.querySelector('.título-processo p');
                if (tituloElemento) {
                    const titulo = tituloElemento.textContent.toLowerCase();
                    if (titulo.includes(termoPesquisado)) {
                        processo.style.display = 'flex';
                        paginaTemResultados = true;
                    } else {
                        processo.style.display = 'none';
                    }
                }
            });
            if (paginaTemResultados) {
                pagina.style.display = 'block';
            } else {
                pagina.style.display = 'none';
            }
        });
    }
    todosOsCamposDePesquisa.forEach(input => {
        input.addEventListener('input', function() {
            const termoAtual = this.value;
            todosOsCamposDePesquisa.forEach(outroInput => {
                if (outroInput !== this) {
                    outroInput.value = termoAtual;
                }
            });
            executarPesquisaLocal(termoAtual);
        });
    });

    // --- 6. LÓGICA DAS ABAS (INTEGRIDADE: ÉTICA, GOVERNANÇA, etc.) ---
    // (Seu código original, que usa o texto do botão)
    const integridadeTabButtons = document.querySelectorAll('.portifolio_integridade .dropdown .integridade-tab');
    const integridadeContentContainer = document.querySelector('.secao_Integridade');
    integridadeTabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionName = this.textContent.trim().replace(/\s+/g, '');
            const targetSection = integridadeContentContainer.querySelector(`.${sectionName}`);
            integridadeTabButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            const allContentBlocks = integridadeContentContainer.querySelectorAll('.conteudo');
            allContentBlocks.forEach(block => {
                block.style.display = 'none';
            });
            if (targetSection) {
                targetSection.style.display = 'block';
                containerConteudoIntegridade.style.display = 'block';
            } else {
                console.warn(`Conteúdo para "${sectionName}" não encontrado.`);
            }
        });
    });

}); // --- FIM DO 'DOMContentLoaded' ---