const characters = [
  { nome: "Mario", velocidade: 4, manobrabilidade: 3, poder: 3, pontuacao: 0 },
  { nome: "Peach", velocidade: 3, manobrabilidade: 4, poder: 2, pontuacao: 0 },
  { nome: "Yoshi", velocidade: 2, manobrabilidade: 4, poder: 3, pontuacao: 0 },
  { nome: "Bowser", velocidade: 5, manobrabilidade: 2, poder: 5, pontuacao: 0 },
  { nome: "Luigi", velocidade: 3, manobrabilidade: 4, poder: 4, pontuacao: 0 },
  {
    nome: "Donkey Kong",
    velocidade: 2,
    manobrabilidade: 2,
    poder: 5,
    pontuacao: 0,
  },
];

const player1 = characters[Math.floor(Math.random() * characters.length)];
const player2 =  { ...characters[Math.floor(Math.random() * characters.length)] }

if (player1.nome === player2.nome) {
  player1.nome += " (1)";
  player2.nome += " (2)";
}

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }
  return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function playerRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.velocidade;
      totalTestSkill2 = diceResult2 + character2.velocidade;

      await logRollResult(
        character1.nome,
        "velocidade",
        diceResult1,
        character1.velocidade
      );

      await logRollResult(
        character2.nome,
        "velocidade",
        diceResult2,
        character2.velocidade
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.manobrabilidade;
      totalTestSkill2 = diceResult2 + character2.manobrabilidade;

      await logRollResult(
        character1.nome,
        "manobrabilidade",
        diceResult1,
        character1.manobrabilidade
      );

      await logRollResult(
        character2.nome,
        "manobrabilidade",
        diceResult2,
        character2.manobrabilidade
      );
    }

    if (block === "CONFRONTO") {
      powerResult1 = diceResult1 + character1.poder;
      powerResult2 = diceResult2 + character2.poder;

      console.log(`${character1.nome} confrontou ${character2.nome}! 🥊`);

      await logRollResult(
        character1.nome,
        "poder",
        diceResult1,
        character1.poder
      );

      await logRollResult(
        character2.nome,
        "poder",
        diceResult2,
        character2.poder
      );

      if (powerResult1 > powerResult2 && character2.pontuacao > 0) {
        character2.pontuacao--;
        console.log(
          `${character1.nome.toUpperCase()} venceu o confronto ${character2.nome.toUpperCase()} perdeu 1 ponto! 🐢`
        );
      }

      if (powerResult2 > powerResult1 && character1.pontuacao > 0) {
        character1.pontuacao--;
        console.log(
          `${character2.nome.toUpperCase()} venceu o confronto ${character1.nome.toUpperCase()} perdeu 1 ponto! 🐢`
        );
      }

      if (powerResult1 === powerResult2) {
        console.log("Confronto empatado. Ninguém perdeu o ponto");
      }
    }

    if (totalTestSkill1 > totalTestSkill2 && totalTestSkill1 != 0) {
      console.log(`${character1.nome.toUpperCase()} marcou 1 ponto!`);
      character1.pontuacao++;
    }

    if (totalTestSkill2 > totalTestSkill1 && totalTestSkill2 != 0) {
      console.log(`${character2.nome.toUpperCase()} marcou 1 ponto!`);
      character2.pontuacao++;
    }

    if (totalTestSkill1 === totalTestSkill2 && totalTestSkill1 != 0) {
      console.log("Confronto empatado. Ninguém ganhou o ponto");
    }

    console.log("_______________________________________");
  }
}

async function declareWinner(character1, character2) {
  console.log("Resultado Final:");
  console.log(`${character1.nome}: ${character1.pontuacao} ponto(s)`);
  console.log(`${character2.nome}: ${character2.pontuacao} ponto(s)`);

  if (character1.pontuacao > character2.pontuacao)
    console.log(`${character1.nome.toUpperCase()} é o vencedor! 🏆 `);
  else if (character2.pontuacao > character1.pontuacao)
    console.log(`${character2.nome.toUpperCase()} é o vencedor! 🏆 `);
  else console.log(`A corrida terminou empatada 🤝`);
}

(async function main() {
  console.log(
    `🏁 🚨 Corrida entre ${player1.nome} e ${player2.nome} está começando ... \n`
  );

  await playerRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
