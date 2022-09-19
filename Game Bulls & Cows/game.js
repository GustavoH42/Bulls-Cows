//guardando as variaveis
let rules_mensage = `O jogo funciona da seguinte forma, você tera que adivinhar uma senha entrando uma sequencia de numeros que acretide estar correta, e o computador ira comparar a senha que foi inserida com a senha correta numeros bufalos indicam que o digito esta correto e na possição correta digitos vacas indicam que esse digito esta na senha porém foi inserido numa possição errada EX: senha secreta = 2548, senha inserida = 2857 | neste exemplo existe um bufallo e duas vacas agora vamos começar o jogo`;

let cher_mensage = [
    "Acretido que você consegue resolver esse enigma ^^ ",
    "Sua proxima tentativa certamente vai ser um sucesso ლ(╹◡╹ლ)",
    "Cruze os dedos e simbora desvendar esse engima "
];

let level = "";
let find_the_user = prompt("Qual seu nome ?");
ask_rules();

//Gerando um numero aleatorio sem repetições, a quatidade de nuemros é determinada pelo jogador 
function get_Random_Number_No_Repeat(level) {
    let number_Selected = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    return number_Selected;
    number_Selected.sort(() => Math.random() - 0.5)
        .join("")
        .slice(0, level);
}

//Especifincando o nivel do jogo usando a primeira função de embaralhamento de nuemros
function level_Selector() {
    level = prompt("Selecione o nivel de dificuldade: Facil, Normal, Dificil, Muito Dificil: ");
    if (level.toLowerCase() === "facil") {
        level = 4;
        console.log(`\nNeste nivel você tem que adivinhar :${level} digitos!! boa sorte ${find_the_user}`);
    } else if (level.toLowerCase === "normal") {
        level = 6;
        console.log(`\nNeste nivel você tem que adivinhar :${level} digitos!! boa sorte ${find_the_user}`);
    } else if (level.toLowerCase === "dificil") {
        level = 7;
        console.log(`\nNeste nivel você tem que adivinhar :${level} digitos!! boa sorte ${find_the_user}`);
    } else if (level.toLowerCase === "muito dificil") {
        level = 9;
        console.log(`\nNeste nivel você tem que adivinhar :${level} digitos!! boa sorte ${find_the_user}`);
    } else {
        level = false;
        console.log("\nNivel escolhido não coresponde aos disponiveis você deveria tentar tentar: facil, normal, dificil, muito dificil ");
    }
    return level;
}

//Pergunta se o jogador conhece as regras 
function ask_rules() {
    let pergunta = prompt(`Você conhece as regras ${find_the_user} S/N: `);
    console.clear();
    if (pergunta.toUpperCase() === "N") {
        console.log(`\n \n então vamos la ${find_the_user}\n`);
    } else {
        console.log(`\nVamos la ${find_the_user}`);
    }
}

//Gerando uma mensagem de apoio para o usuario
function mensagem_de_apoio() {
    return cher_mensage[Math.floor(Math.random() * cher_mensage.length)];
}

//Perguntando se o usuario quer jogar mais uma vez 
function playAgain() {
    let jogar_de_novo = "";
    while (
        !(
            jogar_de_novo.toUpperCase() === "S" ||
            jogar_de_novo.toUpperCase() === "N"
        )
    ) {
        jogar_de_novo = prompt("Voce quer jogar de novo ? S/N: ");
        if (jogar_de_novo.toUpperCase === "S") {
            return start();
        } else if (jogar_de_novo.toUpperCase === "N") {
            console.log(`\n Obrigado por jogar ${find_the_user} ^^ `);
            return
        } else {
            console.log(`Input inserido é invalido lembre de digitar S para sim e N para não`);
        }
    }
}

//Checando se o usuario pos numeros repetidos na resposta e pedindo um input valido 
//Checando também se o numero secreto tem a mesma quantidade de nuemros inseridos pelo usuario 
function resposta_valida(palpite, get_Random_Number_No_Repeat) {
    let no_repeat_input_check = palpite.split("").sort((a, b) => a - b);
    let has_duplicate = false;
    for (let k = 0; k < no_repeat_input_check.length - 1; k++) {
        if (no_repeat_input_check[k] === no_repeat_input_check[k + 1]) {
            has_duplicate = true;
        }
    }
    if (has_duplicate === true) {
        console.log("Cheque seu numero!! lembre que cada digito deve ser diverente");
        return false;
    }
    if (get_Random_Number_No_Repeat !== palpite.length) {
        console.log(`Tamnho do numero não é valido neste ${level} digite um novo numero ${find_the_user}`);
        return false;
    } if (!/^\d+$/.test(palpite)) {
        console.log(`Apenas numeros são permitidos!!! coloque um valor valido ${find_the_user}`);
        return false;
    }
    return true;
}

//Passando os parametros do jogo para o jogador sempre que o loop roda contando como uma tentativa
function play_the_game(level) {
    let numero_secreto = get_Random_Number_No_Repeat(level);
    let tentativas = 0;
    console.log("\n");
    while (true) {
        tentativas++;
        palpite = prompt("Numero: ");
        //caso o usuario acerte o numero secreto uma mesagem de vitoria aparecera 
        if (numero_secreto === palpite) {
            console.log(
                tentativas === 1
                    ? `Você conseguiu na primeira tentativa!!! wow parabens ${find_the_user}`
                    : `Você venceu depois de ${tentativas} muito bem ${find_the_user} ^^`
            );
            break;
        }
        //Chamando a função que checa se o valor colocado pelo usario é valido 
        if (!resposta_valida(palpite, numero_secreto)) {
            continue;
        }
        //Checando a contagem dos nuemros se combinam com o palpite do usuario
        //Verificando quantos numeros estão corretos e na possição correta
        //verificando quantos numeros estão corretos mas na possição errada
        let cows = 0;
        let bulls = 0;
        for (let i = 0; i < numero_secreto.length; i++) {
            for (let j = 0; j < palpite.length; j++) {
                if (numero_secreto[i] === palpite[j]) {
                    if (i === j) {
                        bulls++;
                    } else {
                        cows++;
                    }
                } else continue;
            }
        }
        //Caso o usuario não ache nada sera enviada uma mensagem encorajadora aleatoria a ele
        if (bulls === 0 && cows === 0) {
            console.log("\n", mensagem_de_apoio(), "\n");
        }
        console.log(
            cows === 1 ? `Você encontrou ${cows} vacas &&` : `Você encontrou ${cows} vacas &&`,
            bulls === 1 ? `Você encontrou ${bulls}` : `Você encontrou ${bulls} bufalos`
        );
    }
}

//chamando as funçoes 
function start() {
    let level = level_Selector();
    while (level === false) {
        level = level_Selector();
    }
    play_the_game(level);
    jogar_de_novo();
}
start();