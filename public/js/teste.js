const varkStyles = {
    V: {
        name: 'Visual',
        title: 'Visual',
        icon: 'V',
        color: '#3b00b0',
        description: 'Você aprende melhor através de elementos visuais como gráficos, diagramas, mapas, imagens e vídeos. Prefere ver as informações organizadas espacialmente e tem facilidade para lembrar de rostos, lugares e detalhes visuais.',
        tips: [
            {
                title: 'Use mapas mentais e diagramas',
                content: 'Organize informações em esquemas visuais, fluxogramas e mapas conceituais para melhor compreensão.'
            },
            {
                title: 'Destaque com cores',
                content: 'Use marcadores coloridos, canetas de diferentes cores e post-its para categorizar e organizar informações.'
            },
            {
                title: 'Assista vídeos educativos',
                content: 'Procure por tutoriais em vídeo, documentários e apresentações visuais sobre os temas que está estudando.'
            }
        ]
    },
    A: {
        name: 'Auditivo',
        title: 'Auditivo',
        icon: 'A',
        color: '#7b4ffe',
        description: 'Você aprende melhor através de sons, conversas, explicações verbais e discussões. Tem facilidade para lembrar de vozes, músicas e prefere ouvir informações em vez de lê-las.',
        tips: [
            {
                title: 'Participe de discussões',
                content: 'Engaje-se em grupos de estudo, debates e conversas sobre os temas para fixar melhor o conteúdo.'
            },
            {
                title: 'Grave e ouça áudios',
                content: 'Grave resumos falados, ouça podcasts educativos e use aplicativos de áudio para estudar.'
            },
            {
                title: 'Leia em voz alta',
                content: 'Pratique a leitura em voz alta e explique conceitos para outras pessoas ou para si mesmo.'
            }
        ]
    },
    R: {
        name: 'Leitura/Escrita',
        title: 'Leitura/Escrita',
        icon: 'R',
        color: 'rgb(167, 119, 240)',
        description: 'Você aprende melhor através de textos escritos, listas, anotações e atividades de escrita. Prefere ler informações, fazer resumos e tem facilidade com palavras e linguagem escrita.',
        tips: [
            {
                title: 'Faça anotações detalhadas',
                content: 'Escreva resumos, listas e anotações organizadas durante o estudo para melhor fixação.'
            },
            {
                title: 'Leia materiais variados',
                content: 'Utilize livros, artigos, apostilas e textos online como principais fontes de aprendizado.'
            },
            {
                title: 'Pratique a escrita',
                content: 'Escreva redações, relatórios e resumos sobre os temas estudados para consolidar o aprendizado.'
            }
        ]
    },
    K: {
        name: 'Cinestésico',
        title: 'Cinestésico',
        icon: 'K',
        color: '#ae93ff',
        description: 'Você aprende melhor através de experiências práticas, movimentos e atividades com as mãos. Prefere aprender fazendo, experimentando e tem facilidade para lembrar de experiências vividas.',
        tips: [
            {
                title: 'Pratique atividades hands-on',
                content: 'Busque experimentos, simulações e atividades práticas relacionadas ao que está aprendendo.'
            },
            {
                title: 'Use movimento durante o estudo',
                content: 'Caminhe enquanto estuda, use gestos para explicar conceitos e mude de ambiente regularmente.'
            },
            {
                title: 'Aplique na vida real',
                content: 'Procure exemplos práticos e situações reais onde possa aplicar o conhecimento adquirido.'
            }
        ]
    }
};

// Função para atualizar a barra de progresso
function updateProgress() {
    const form = document.getElementById('varkForm');
    if (!form) return;
    
    const totalQuestions = 10;
    const answeredQuestions = form.querySelectorAll('input[type="radio"]:checked').length;
    const progress = (answeredQuestions / totalQuestions) * 100;
    
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
}

// Função para adicionar eventos aos radio buttons
function setupRadioEvents() {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            // Remove seleção visual das outras opções da mesma questão
            const questionName = this.name;
            const allOptionsForQuestion = document.querySelectorAll(`input[name="${questionName}"]`);
            allOptionsForQuestion.forEach(option => {
                option.closest('.option').classList.remove('selected');
            });
            
            // Adiciona seleção visual à opção escolhida
            this.closest('.option').classList.add('selected');
            
            // Atualiza barra de progresso
            updateProgress();
        });
    });
}

// Função para validar se todas as questões foram respondidas
function validateForm() {
    const form = document.getElementById('varkForm');
    if (!form) return false;
    
    for (let i = 1; i <= 10; i++) {
        const questionAnswered = form.querySelector(`input[name="q${i}"]:checked`);
        if (!questionAnswered) {
            return false;
        }
    }
    return true;
}

// Função para calcular os resultados do VARK
function calculateResults(formData) {
    const scores = { V: 0, A: 0, R: 0, K: 0 };
    
    // Conta as respostas para cada estilo
    for (let i = 1; i <= 10; i++) {
        const answer = formData.get(`q${i}`);
        if (answer && scores.hasOwnProperty(answer)) {
            scores[answer]++;
        }
    }
    
    // Encontra o estilo predominante
    let dominantStyle = 'V';
    let maxScore = scores.V;
    
    for (const style in scores) {
        if (scores[style] > maxScore) {
            maxScore = scores[style];
            dominantStyle = style;
        }
    }
    
    // Calcula percentuais
    const percentages = {};
    for (const style in scores) {
        percentages[style] = (scores[style] / 10) * 100;
    }
    
    return {
        scores,
        percentages,
        dominantStyle,
        dominantData: varkStyles[dominantStyle]
    };
}

// Função para armazenar resultados (simulando sessão)
function storeResults(results) {
    // Simula o conceito de sessão usando sessionStorage (que funciona apenas temporariamente)
    // Em uma aplicação real com backend, isso seria armazenado no servidor
    const sessionData = {
        timestamp: new Date().toISOString(),
        results: results,
        userAgent: navigator.userAgent
    };
    
    // Armazena os resultados usando uma variável global como alternativa
    window.varkResults = results;
    
    // Também tenta usar sessionStorage se disponível (para demonstração do conceito de sessão)
    try {
        sessionStorage.setItem('varkResults', JSON.stringify(sessionData));
    } catch (e) {
        console.log('SessionStorage não disponível, usando variável global');
    }
}

// Função para recuperar resultados da sessão
function getStoredResults() {
    // Primeiro tenta pegar da variável global
    if (window.varkResults) {
        return window.varkResults;
    }
    
    // Depois tenta pegar do sessionStorage
    try {
        const stored = sessionStorage.getItem('varkResults');
        if (stored) {
            const sessionData = JSON.parse(stored);
            return sessionData.results;
        }
    } catch (e) {
        console.log('Erro ao recuperar dados da sessão');
    }
    
    return null;
}

// Função para processar o envio do formulário
function handleFormSubmit(event) {
    event.preventDefault();
    
    const errorMessage = document.getElementById('errorMessage');
    
    // Valida se todas as questões foram respondidas
    if (!validateForm()) {
        errorMessage.style.display = 'block';
        errorMessage.scrollIntoView({ behavior: 'smooth' });
        return;
    }
    
    errorMessage.style.display = 'none';
    
    // Coleta as respostas
    const formData = new FormData(event.target);
    
    // Calcula os resultados
    const results = calculateResults(formData);
    
    // Armazena os resultados na "sessão"
    storeResults(results);
    
    // Redireciona para a página de resultados
    window.location.href = 'resultado.html';
}

// Função para exibir os resultados na página de resultado
function displayResults() {
    const resultContent = document.getElementById('resultContent');
    if (!resultContent) return;
    
    const results = getStoredResults();
    
    if (!results) {
        resultContent.innerHTML = `
            <div class="error-state">
                <div class="error-icon">⚠️</div>
                <h2 class="error-title">Nenhum resultado encontrado</h2>
                <p class="error-message">Não foram encontrados resultados do questionário. Por favor, refaça o teste.</p>
                <a href="questionario.html" class="btn">Fazer Questionário</a>
            </div>
        `;
        return;
    }
    
    const { dominantData, scores, percentages } = results;
    
    resultContent.innerHTML = `
        <div class="result-card">
            <h2 class="result-title">${dominantData.title}</h2>
            <div class="result-description">
                ${dominantData.description}
            </div>
        </div>
        
        <div class="scores-section">
            <h3>Suas pontuações por estilo:</h3>
            ${Object.keys(varkStyles).map(style => `
                <div class="score-item">
                    <div class="score-icon">${varkStyles[style].icon}</div>
                    <div class="score-details">
                        <div class="score-name">${varkStyles[style].name}</div>
                        <div class="score-description">${varkStyles[style].title}</div>
                    </div>
                    <div class="score-bar">
                        <div class="score-fill" style="width: ${percentages[style]}%; background-color: ${varkStyles[style].color};"></div>
                    </div>
                    <div class="score-percentage">${percentages[style]}%</div>
                </div>
            `).join('')}
        </div>
        
        
        <div class="tips-section">
            <h3>Dicas para potencializar seu aprendizado:</h3>
            ${dominantData.tips.map(tip => `
                <div class="tip-card">
                    <div class="tip-title">${tip.title}</div>
                    <div class="tip-content">${tip.content}</div>
                </div>
            `).join('')}
        </div>
        
        <div class="actions">
            <button onclick=" " class="btn">Ir para a tela inicial</button>
        </div>
    `;
    
    // ali em cima ver se fica a parte das tips, Anima as barras de progresso
    setTimeout(() => {
        const scoreFills = document.querySelectorAll('.score-fill');
        scoreFills.forEach((fill, index) => {
            const style = Object.keys(varkStyles)[index];
            fill.style.width = percentages[style] + '%';
        });
    }, 500);
}

// Inicialização quando o DOM está carregado
document.addEventListener('DOMContentLoaded', function() {
    // Se estivermos na página do questionário
    const form = document.getElementById('varkForm');
    if (form) {
        setupRadioEvents();
        form.addEventListener('submit', handleFormSubmit);
        updateProgress(); // Atualiza barra inicial
    }
    
    // Se estivermos na página de resultados
    const resultContent = document.getElementById('resultContent');
    if (resultContent) {
        displayResults();
    }
});

// Função adicional para limpar dados da sessão (útil para testes)
function clearSession() {
    window.varkResults = null;
    try {
        sessionStorage.removeItem('varkResults');
    } catch (e) {
        console.log('Erro ao limpar sessão');
    }
}