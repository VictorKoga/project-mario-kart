const playerOne = {
  name: "Mario",
  speed: 4,
  maneuverability: 3,
  power:3,
  points: 0,
}

const playerTwo = {
  name: "Luigi",
  speed: 3,
  maneuverability: 4,
  power: 4,
  points: 0,
}

async function rollDice() {
  // arredondar um numero de 0 a 6
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;  
  
  switch (true) {
    case random < 0.33:
      result = "Reta";
      break;
    case random < 0.66:
      result = "Curva";
      break;
    default:
      result = "Confronto";
      break;
  }
  return result
}

async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}` 
  )
}

async function playerRaceEngine(characterOne, characterTwo) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);
    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);
    // rolar dados
    let diceResultOne = await rollDice();
    let diceResultTwo = await rollDice();
    // teste de habilidade
    let totalTestSkillOne = 0;
    let totalTestSkillTwo = 0;
  
    if (block === "Reta"){
      totalTestSkillOne = diceResultOne + characterOne.speed;
      totalTestSkillTwo = diceResultTwo + characterTwo.speed;
      await logRollResult(
        characterOne.name, 
        "velocidade", 
        diceResultOne,
        characterOne.speed
      );
      await logRollResult(
        characterTwo.name, 
        "velocidade", 
        diceResultTwo,
        characterOne.speed
      );
    }

    if (block === "Curva"){  
      totalTestSkillOne = diceResultOne + characterOne.maneuverability;
      totalTestSkillTwo = diceResultTwo + characterTwo.maneuverability;
      await logRollResult(
        characterOne.name, 
        "manobrabilidade", 
        diceResultOne,
        characterOne.maneuverability
      );
      await logRollResult(
        characterTwo.name, 
        "manobrabilidade", 
        diceResultTwo,
        characterOne.maneuverability
      );
    }

    if (block === "Confronto"){  
        let powerResultOne = diceResultOne + characterOne.power;
        let powerResultTwo = diceResultTwo + characterTwo.power; 
        console.log(`${characterOne.name} confrontou com ${characterTwo.name}! 🥊}`)
        await logRollResult(
          characterOne.name, 
          "poder", 
          diceResultOne,
          characterOne.power
        );
        await logRollResult(
          characterTwo.name, 
          "poder", 
          diceResultTwo,
          characterOne.power
        );

        if (powerResultOne > powerResultTwo && characterTwo.points > 0) {
          console.log(`${characterOne.name} ganhou o confronto! ${characterTwo.name} perdeu um ponto 🐢`)
          characterTwo.points--
        }
        
        if (powerResultTwo > powerResultOne && powerResultOne.points > 0) {
          console.log(`${characterTwo.name} ganhou o confronto! ${characterOne.name} perdeu um ponto 🐢`)
          characterOne.points--
        }

        // if ternarios
        // characterTwo.points -= powerResultOne > powerResultTwo && characterTwo.points > 0 ? 1 : 0                 
        // characterOne.points -= powerResultTwo > powerResultOne && powerResultOne.points > 0 ? 1 : 0         
        console.log(powerResultTwo === powerResultOne ? "Empate! Nenhum ponto foi perdido" : "" )
    }
    
    // verificando o vencedor
    if (totalTestSkillOne > totalTestSkillTwo) {
      console.log(`${characterOne.name} marcou um ponto!`);
      characterOne.points++;  
    } else if (totalTestSkillTwo > totalTestSkillOne) {
      console.log(`${characterTwo.name} marcou um ponto!`);
      characterTwo.points++;      
    } 

    console.log("------------------------------------------")
  }
}

async function declareWinner(characterOne, characterTwo) {
  console.log("Resultado final:")
  console.log(`${characterOne.name}: ${characterOne.points} Ponto(s)`)
  console.log(`${characterTwo.name}: ${characterTwo.points} Ponto(s)`)

  if (characterOne.points > characterTwo.points) {
    console.log(`\n${characterOne.name} venceu a corrida! Parabéns 🏆!`)
  } else if (characterOne.points < characterTwo.points) {
    console.log(`\n${characterTwo.name} venceu a corrida! Parabéns 🏆!`)
  } else {
    console.log("Empate! Não houve vencedor.")
  } 
}

(async function main() {
  console.log(`🏁🚨 Corrida entre ${playerOne.name} e ${playerTwo.name} começando...\n`);
  await playerRaceEngine(playerOne, playerTwo);
  await declareWinner(playerOne, playerTwo);
})()//parenteses entre o async é uma funcao auto invocavel
