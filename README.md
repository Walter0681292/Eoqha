<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Interativo ÉOQHÁ - Salmo 22</title>
    <style>
        :root {
            --primary-color: #1a365d;
            --accent-color: #d69e2e;
            --bg-color: #f7fafc;
            --card-bg: #ffffff;
            --text-color: #2d3748;
            --correct-color: #38a169;
            --wrong-color: #e53e3e;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
        }

        .container {
            width: 100%;
            max-width: 650px;
            background-color: var(--card-bg);
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            padding: 25px;
            box-sizing: border-box;
        }

        .header {
            text-align: center;
            border-bottom: 2px solid var(--accent-color);
            padding-bottom: 15px;
            margin-bottom: 20px;
        }

        .header h1 {
            color: var(--primary-color);
            margin: 0;
            font-size: 1.8rem;
            letter-spacing: 1px;
        }

        .header p {
            margin: 5px 0 0 0;
            color: #718096;
            font-weight: 600;
        }

        .screen {
            display: none;
        }

        .active {
            display: block;
        }

        .form-group {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
        }

        input[type="text"] {
            width: 100%;
            padding: 12px;
            border: 2px solid #cbd5e0;
            border-radius: 6px;
            box-sizing: border-box;
            font-size: 1rem;
        }

        .btn {
            background-color: var(--primary-color);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 6px;
            cursor: pointer;
            width: 100%;
            font-size: 1rem;
            font-weight: bold;
            transition: background 0.2s;
        }

        .btn:hover {
            background-color: #2b6cb0;
        }

        .btn-gold {
            background-color: var(--accent-color);
            color: #fff;
            margin-bottom: 15px;
        }

        .btn-gold:hover {
            background-color: #b7791f;
        }

        .quiz-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            background: #edf2f7;
            padding: 10px 15px;
            border-radius: 6px;
            font-weight: bold;
        }

        .timer {
            color: var(--wrong-color);
            font-size: 1.2rem;
        }

        .question-text {
            font-size: 1.1rem;
            margin-bottom: 20px;
            font-weight: 600;
            line-height: 1.4;
        }

        .options-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-bottom: 20px;
        }

        .option-btn {
            background-color: #f7fafc;
            border: 2px solid #e2e8f0;
            padding: 12px 15px;
            border-radius: 6px;
            text-align: left;
            cursor: pointer;
            font-size: 0.95rem;
            transition: all 0.2s;
        }

        .option-btn:hover {
            border-color: var(--primary-color);
            background-color: #ebf8ff;
        }

        .option-btn.selected {
            border-color: var(--primary-color);
            background-color: #bee3f8;
        }

        .option-btn.correct {
            background-color: #c6f6d5;
            border-color: var(--correct-color);
        }

        .option-btn.wrong {
            background-color: #fed7d7;
            border-color: var(--wrong-color);
        }

        .gold-box {
            background-color: #fefcbf;
            border: 1px solid #faf089;
            padding: 12px;
            border-radius: 6px;
            margin-bottom: 15px;
            font-size: 0.9rem;
            color: #744210;
            display: none;
        }

        .feedback-box {
            margin-top: 15px;
            padding: 15px;
            border-radius: 6px;
            display: none;
        }

        .feedback-box.show {
            display: block;
        }

        .feedback-box.correct-bg {
            background-color: #f0fff4;
            border: 1px solid #9ae6b4;
        }

        .feedback-box.wrong-bg {
            background-color: #fff5f5;
            border: 1px solid #feb2b2;
        }

        .ref-text {
            font-size: 0.85rem;
            color: #4a5568;
            margin-top: 5px;
            font-style: italic;
        }

        .ranking-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
        }

        .ranking-table th, .ranking-table td {
            border: 1px solid #e2e8f0;
            padding: 10px;
            text-align: left;
        }

        .ranking-table th {
            background-color: #edf2f7;
        }

        .mode-badge {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8rem;
            font-weight: bold;
            color: white;
            margin-bottom: 10px;
        }

        .badge-official { background-color: #3182ce; }
        .badge-training { background-color: #805ad5; }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>ÉOQHÁ</h1>
        <p>Jornada do Salmo 22 (ARA)</p>
    </div>

    <!-- Tela de Registro -->
    <div id="screen-register" class="screen active">
        <div class="form-group">
            <label for="participant-name">Nome do Participante:</label>
            <input type="text" id="participant-name" placeholder="Digite seu nome completo..." />
        </div>
        <button class="btn" onclick="startQuiz()">Iniciar Jornada</button>
        
        <div style="margin-top: 30px;">
            <h3>Top 3 - Ranking Geral (Web)</h3>
            <table class="ranking-table">
                <thead>
                    <tr>
                        <th>Posição</th>
                        <th>Nome</th>
                        <th>Pontos</th>
                    </tr>
                </thead>
                <tbody id="top3-body">
                    <tr><td colspan="3">Carregando classificação...</td></tr>
                </tbody>
            </table>
        </div>
    </div>

    <!-- Tela do Quiz -->
    <div id="screen-quiz" class="screen">
        <div id="mode-indicator" class="mode-badge"></div>
        <div class="quiz-header">
            <span id="question-number">Questão 1/10</span>
            <span id="score-display">Pontos: 0</span>
            <span class="timer" id="timer-display">60s</span>
        </div>

        <div class="question-text" id="question-text"></div>

        <button class="btn btn-gold" id="gold-btn" onclick="useGoldTip()">💡 Dica de Ouro</button>
        <div class="gold-box" id="gold-box"></div>

        <div class="options-container" id="options-container"></div>

        <button class="btn" id="confirm-btn" onclick="confirmAnswer()" disabled>CONFIRMAR</button>
        <button class="btn" id="next-btn" onclick="nextQuestion()" style="display:none;">PRÓXIMA PERGUNTA</button>

        <div class="feedback-box" id="feedback-box">
            <strong id="feedback-title"></strong>
            <div id="feedback-quote" style="margin-top: 5px;"></div>
            <div class="ref-text" id="feedback-ref"></div>
        </div>
    </div>

    <!-- Tela de Resultado -->
    <div id="screen-result" class="screen">
        <h2>Jornada Concluída!</h2>
        <p id="result-status"></p>
        <p style="font-size: 1.4rem; font-weight: bold;">Sua Pontuação: <span id="final-score">0</span> / 200</p>
        
        <h3>Top 3 da Classificação</h3>
        <table class="ranking-table">
            <thead>
                <tr>
                    <th>Posição</th>
                    <th>Nome</th>
                    <th>Pontos</th>
                </tr>
            </thead>
            <tbody id="result-top3-body">
                <tr><td colspan="3">Atualizando...</td></tr>
            </tbody>
        </table>
        
        <br>
        <button class="btn" onclick="restartAsTraining()">Refazer em Modo Treino</button>
    </div>
</div>

<script>
    // Configuração para sincronização do Ranking Web em tempo real
    const BIN_ID = '65d1d897dc74654018a6e8b2'; // Endpoint público de armazenamento
    const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

    const quizData = [
        {
            type: "standard",
            question: "Segundo o verso 1, qual é o clamor inicial expresso no Salmo 22?",
            options: [
                "SENHOR, até quando te esquecerás de mim?",
                "Deus meu, Deus meu, por que me desamparaste?",
                "Tende compaixão de mim, ó Deus, segundo a tua graça",
                "O SENHOR é o meu pastor; nada me faltará"
            ],
            answer: 1,
            goldTip: "Procura pelo verso inicial que expressa a sensação de abandono e bramido.",
            quote: "Deus meu, Deus meu, por que me desamparaste? Por que se acham longe de minha salvação as palavras de meu bramido?",
            ref: "Salmos 22:1 (ARA)"
        },
        {
            type: "tf",
            question: "VERDADEIRO OU FALSO: O verso 3 declara: 'Contudo, tu és santo, entronizado entre os louvores de Israel.'",
            options: ["Verdadeiro", "Falso"],
            answer: 0,
            goldTip: "Verifique se a santidade e o trono de louvores correspondem exatamente ao texto do verso 3.",
            quote: "Contudo, tu és santo, entronizado entre os louvores de Israel.",
            ref: "Salmos 22:3 (ARA)"
        },
        {
            type: "complete",
            question: "COMPLETE A FRASE (v. 6): 'Mas eu sou ________ e não homem; opróbrio dos homens e desprezado do povo.'",
            options: ["pó", "verme", "servo", "nada"],
            answer: 1,
            goldTip: "O salmista usa a figura de uma criatura extremamente insignificante e pisada.",
            quote: "Mas eu sou verme e não homem; opróbrio dos homens e desprezado do povo.",
            ref: "Salmos 22:6 (ARA)"
        },
        {
            type: "standard",
            question: "O que os zombadores dizem ao verem a aflição do salmista no verso 8?",
            options: [
                "Ele chamou por Elias; vejamos se vem livrá-lo",
                "Confiou no SENHOR! Livre-o ele; salve-o, pois nele tem prazer",
                "Onde está o teu Deus em quem confiaste?",
                "Médico, cura-te a ti mesmo"
            ],
            answer: 1,
            goldTip: "Eles usam a própria confiança da vítima no SENHOR para ironizá-la.",
            quote: "Confiou no SENHOR! Livre-o ele; salve-o, pois nele tem prazer.",
            ref: "Salmos 22:8 (ARA)"
        },
        {
            type: "standard",
            question: "No verso 12, quais animais são usados como metáfora para representar os inimigos poderosos que cercam o salmista?",
            options: [
                "Leões de Judá",
                "Lobos do deserto",
                "Fortes touros de Basã",
                "Serpentes do caminho"
            ],
            answer: 2,
            goldTip: "Identifique a região famosa no texto bíblico por seu gado forte e robusto.",
            quote: "Muitos touros me cercam, fortes touros de Basã me rodeiam.",
            ref: "Salmos 22:12 (ARA)"
        },
        {
            type: "tf",
            question: "VERDADEIRO OU FALSO: No verso 16, o texto afirma: 'Cães me cercam; uma súcia de malfeitores me rodeia; traspassaram-me as mãos e os pés.'",
            options: ["Verdadeiro", "Falso"],
            answer: 0,
            goldTip: "Esta é uma célebre passagem profética messiânica sobre as mãos e os pés.",
            quote: "Cães me cercam; uma súcia de malfeitores me rodeia; traspassaram-me as mãos e os pés.",
            ref: "Salmos 22:16 (ARA)"
        },
        {
            type: "standard",
            question: "O que os inimigos fazem com as vestes do salmista no verso 18?",
            options: [
                "Rasgam-nas em sinal de desprezo",
                "Queimam-nas fora do acampamento",
                "Repartem entre si e sobre a túnica deitam sortes",
                "Lavam-nas no rio para guardá-las"
            ],
            answer: 2,
            goldTip: "Remete à prática de lançar sortes para decidir quem fica com a peça única.",
            quote: "Repartem entre si as minhas vestes e sobre a túnica deitam sortes.",
            ref: "Salmos 22:18 (ARA)"
        },
        {
            type: "complete",
            question: "COMPLETE A FRASE (v. 22): 'A meus irmãos declararei o teu nome; cantar-te-ei louvores no meio da ________.'",
            options: ["cidade", "família", "congregação", "terra"],
            answer: 2,
            goldTip: "Palavra referente à assembleia ou ajuntamento do povo que adora.",
            quote: "A meus irmãos declararei o teu nome; cantar-te-ei louvores no meio da congregação;",
            ref: "Salmos 22:22 (ARA)"
        },
        {
            type: "standard",
            question: "De acordo com o verso 27, o que acontecerá quando os confins da terra se lembrarem do SENHOR?",
            options: [
                "Prostrar-se-ão perante ele todas as famílias das nações e a ele se converterão",
                "Terão medo e fugirão para as cavernas",
                "Construirão altares de pedra em todos os montes",
                "Oferecerão sacrifícios de holocaustos diários"
            ],
            answer: 0,
            goldTip: "Note o alcance universal da conversão e adoração perante o Senhor.",
            quote: "Lembrar-se-ão do SENHOR e a ele se converterão os confins da terra; perante ele se prostrarão todas as famílias das nações.",
            ref: "Salmos 22:27 (ARA)"
        },
        {
            type: "tf",
            question: "VERDADEIRO OU FALSO: O verso 28 assegura: 'Pois do SENHOR é o reino, é ele quem governa as nações.'",
            options: ["Verdadeiro", "Falso"],
            answer: 0,
            goldTip: "Confirme quem detém a soberania e o governo sobre todos os povos no verso 28.",
            quote: "Pois do SENHOR é o reino, é ele quem governa as nações.",
            ref: "Salmos 22:28 (ARA)"
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let timer = 60;
    let timerInterval = null;
    let selectedOption = null;
    let currentParticipant = "";
    let isOfficial = false;
    let globalRanking = [];

    window.onload = function() {
        fetchRanking();
    };

    async function fetchRanking() {
        try {
            const res = await fetch(`${API_URL}/latest`);
            const data = await res.json();
            globalRanking = data.record.ranking || [];
            renderRanking();
        } catch (e) {
            // Fallback para armazenamento local caso falhe a conexão
            globalRanking = JSON.parse(localStorage.getItem('eoqha_salmo22_ranking') || "[]");
            renderRanking();
        }
    }

    async function startQuiz() {
        const nameInput = document.getElementById('participant-name').value.trim();
        if (!nameInput) {
            alert("Por favor, digite seu nome para continuar.");
            return;
        }

        const lowerName = nameInput.toLowerCase();
        await fetchRanking(); // Atualização antes de verificar permissão

        const alreadyRegistered = globalRanking.some(entry => entry.name.toLowerCase() === lowerName);

        if (alreadyRegistered) {
            isOfficial = false;
        } else {
            isOfficial = true;
        }

        currentParticipant = nameInput;
        currentQuestion = 0;
        score = 0;

        document.getElementById('screen-register').classList.remove('active');
        document.getElementById('screen-quiz').classList.add('active');

        const badge = document.getElementById('mode-indicator');
        if (isOfficial) {
            badge.className = "mode-badge badge-official";
            badge.innerText = "JORNADA OFICIAL (Valendo Ranking)";
        } else {
            badge.className = "mode-badge badge-training";
            badge.innerText = "MODO TREINO (Assimilação)";
        }

        loadQuestion();
    }

    function loadQuestion() {
        resetState();
        const data = quizData[currentQuestion];

        document.getElementById('question-number').innerText = `Questão ${currentQuestion + 1}/10`;
        document.getElementById('score-display').innerText = `Pontos: ${score}`;
        document.getElementById('question-text').innerText = data.question;

        const container = document.getElementById('options-container');
        container.innerHTML = '';

        data.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = option;
            btn.onclick = () => selectOption(index);
            container.appendChild(btn);
        });

        startTimer();
    }

    function resetState() {
        clearInterval(timerInterval);
        timer = 60;
        selectedOption = null;
        document.getElementById('timer-display').innerText = '60s';
        document.getElementById('confirm-btn').style.display = 'block';
        document.getElementById('confirm-btn').disabled = true;
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('gold-btn').style.display = 'block';
        document.getElementById('gold-box').style.display = 'none';
        document.getElementById('feedback-box').className = 'feedback-box';
    }

    function startTimer() {
        timerInterval = setInterval(() => {
            timer--;
            document.getElementById('timer-display').innerText = `${timer}s`;
            if (timer <= 0) {
                clearInterval(timerInterval);
                autoSubmitTimeout();
            }
        }, 1000);
    }

    function selectOption(index) {
        selectedOption = index;
        const buttons = document.querySelectorAll('.option-btn');
        buttons.forEach((btn, idx) => {
            if (idx === index) {
                btn.classList.add('selected');
            } else {
                btn.classList.remove('selected');
            }
        });
        document.getElementById('confirm-btn').disabled = false;
    }

    function useGoldTip() {
        const box = document.getElementById('gold-box');
        box.innerText = quizData[currentQuestion].goldTip;
        box.style.display = 'block';
        document.getElementById('gold-btn').style.display = 'none';
    }

    function confirmAnswer() {
        clearInterval(timerInterval);
        processAnswer(selectedOption);
    }

    function autoSubmitTimeout() {
        processAnswer(-1);
    }

    function processAnswer(selectedIndex) {
        const data = quizData[currentQuestion];
        const buttons = document.querySelectorAll('.option-btn');
        
        buttons.forEach(btn => btn.disabled = true);
        document.getElementById('confirm-btn').style.display = 'none';
        document.getElementById('gold-btn').style.display = 'none';
        document.getElementById('gold-box').style.display = 'none';

        const isCorrect = (selectedIndex === data.answer);
        const feedbackBox = document.getElementById('feedback-box');

        if (isCorrect) {
            score += 20;
            if (selectedIndex >= 0) buttons[selectedIndex].classList.add('correct');
            feedbackBox.className = 'feedback-box show correct-bg';
            document.getElementById('feedback-title').innerText = '✓ Resposta Correta! (+20 pontos)';
        } else {
            if (selectedIndex >= 0) buttons[selectedIndex].classList.add('wrong');
            buttons[data.answer].classList.add('correct');
            feedbackBox.className = 'feedback-box show wrong-bg';
            document.getElementById('feedback-title').innerText = selectedIndex === -1 ? '⏱ Tempo Esgotado!' : '✗ Resposta Incorreta';
        }

        document.getElementById('score-display').innerText = `Pontos: ${score}`;
        document.getElementById('feedback-quote').innerText = `"${data.quote}"`;
        document.getElementById('feedback-ref').innerText = `— ${data.ref}`;

        document.getElementById('next-btn').style.display = 'block';
    }

    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            loadQuestion();
        } else {
            finishQuiz();
        }
    }

    async function finishQuiz() {
        document.getElementById('screen-quiz').classList.remove('active');
        document.getElementById('screen-result').classList.add('active');
        document.getElementById('final-score').innerText = score;

        if (isOfficial) {
            document.getElementById('result-status').innerText = "Sua pontuação oficial foi registrada na web!";
            await updateWebRanking(currentParticipant, score);
        } else {
            document.getElementById('result-status').innerText = "Jornada em Modo Treino. O ranking manteve seu primeiro registro oficial.";
            await fetchRanking();
        }
    }

    async function updateWebRanking(name, newScore) {
        globalRanking.push({ name: name, score: newScore });
        globalRanking.sort((a, b) => b.score - a.score);

        // Registro local de garantia
        localStorage.setItem('eoqha_salmo22_ranking', JSON.stringify(globalRanking));

        try {
            await fetch(API_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ranking: globalRanking })
            });
        } catch (e) {
            console.error("Erro ao sincronizar ranking web.", e);
        }

        renderRanking();
    }

    function renderRanking() {
        const fillTable = (elementId) => {
            const tbody = document.getElementById(elementId);
            if (!tbody) return;
            tbody.innerHTML = '';
            
            for (let i = 0; i < 3; i++) {
                const tr = document.createElement('tr');
                if (globalRanking[i]) {
                    tr.innerHTML = `<td>${i + 1}º Lugar</td><td>${globalRanking[i].name}</td><td>${globalRanking[i].score} pts</td>`;
                } else {
                    tr.innerHTML = `<td>${i + 1}º Lugar</td><td>---</td><td>---</td>`;
                }
                tbody.appendChild(tr);
            }
        };

        fillTable('top3-body');
        fillTable('result-top3-body');
    }

    function restartAsTraining() {
        isOfficial = false;
        currentQuestion = 0;
        score = 0;

        document.getElementById('screen-result').classList.remove('active');
        document.getElementById('screen-quiz').classList.add('active');

        const badge = document.getElementById('mode-indicator');
        badge.className = "mode-badge badge-training";
        badge.innerText = "MODO TREINO (Assimilação)";

        loadQuestion();
    }
</script>

</body>
</html>
 EM TODA WEB.
