let titlesfx = new Audio('./assets/sfx/pokemonopening.mp3');
let battlesfx = new Audio('./assets/sfx/pokemonbattle.mp3');
let victorysfx = new Audio('./assets/sfx/pokemonvictory.mp3');
let buttonsfx = new Audio('./assets/sfx/pokemonbutton.mp3');
let attack1sfx = new Audio('/assets/sfx/pokemonattackeffect1.mp3');
let attack2sfx = new Audio('./assets/sfx/pokemonattackeffect2.mp3');

let playerPokemon;
let enemyPokemon;
var i = 0;
var x = 0;
var battleText1 = '';
var battleText2 = '';
var battleEnemyText = '';
var criticalText = 'Critical hit!';
var battleFinalVerse = 'I can\'t believe I lost to YOU!';
var noRun = 'You can\'t SCAPE!';
var speed = 45;
var crit = 1;
var enemyAlive = true;
var foundPokemon = true;
var endBattle = false;

const currentVolume = document.querySelector("#volume");
currentVolume.addEventListener("change", changeVolume);

addListeners();

// Change Volume
function changeVolume() {
	titlesfx.volume = currentVolume.value / 100;
	battlesfx.volume = currentVolume.value / 100;
	victorysfx.volume = currentVolume.value / 100;
	buttonsfx.volume = currentVolume.value / 100 * 2;
	attack1sfx.volume = currentVolume.value / 100 * 2;
	attack2sfx.volume = currentVolume.value / 100 * 2;
}

// Start our game
function startButton() {
	titlesfx.volume = 0.5;
	battlesfx.volume = 0.5;
	victorysfx.volume = 0.5;
	buttonsfx.volume = 0.8;
	attack1sfx.volume = 1;
	attack2sfx.volume = 1;
	document.getElementById('startbutton').style.zIndex = '-1';
	document.getElementById('battle').style.visibility = 'visible';
	document.getElementById('opening').style.zIndex = '2';
	document.getElementById('black').style.zIndex = '1';
	document.getElementById('black').src = './assets/img/black.png';
	titlesfx.play();
	setTimeout(function () {
		titlesfx.pause();
		transition();
		//}, 9000);
	}, 9000);
}

// Black image transition to battle
function transition() {
	document.getElementById('opening').style.zIndex = '-1';
	setTimeout(function () {
		battlesfx.play();
		battlesfx.loop = true;
		//}, 1000);
	}, 1000);

	setTimeout(function () {
		document.getElementById('black').style.zIndex = '-1';
		initGame();
		//}, 3800)	
	}, 3800)
}

//Starts the game and sets the beginning pokemon at random
//Pokemon max of six for enemy and player
function initGame() {
	for (var i = 0; i < 6; i++) {
		var tempPokemon = pokemon.splice(Math.floor(Math.random() * pokemon.length), 1)[0];
		tempPokemon.owner = 'player';
		playerParty.push(tempPokemon);
		tempPokemon = pokemon.splice(Math.floor(Math.random() * pokemon.length), 1)[0];
		tempPokemon.owner = 'enemy';
		enemyParty.push(tempPokemon);
	}

	playerPokemon = playerParty[0];
	enemyPokemon = enemyParty[0];

	for (var x = 1; x < 7; x++) {
		document.getElementById("pkmn" + x).innerHTML = playerParty[x - 1].pokename;
	}

	showPokemon();
}

function showPokemon() {
	//console.log(enemyPokemon);
	document.getElementById('pkmnback').setAttribute('class', 'slide-in');
	document.getElementById('pkmn').setAttribute('class', 'slide-out');
	document.getElementById('pkmnback').src = playerPokemon.imgback;
	document.getElementById('pkmn').src = enemyPokemon.imgfront;
	document.getElementById('pkmnback-name').textContent = playerPokemon.pokename;
	document.getElementById('pkmn-name').textContent = enemyPokemon.pokename;
	document.getElementById('pkmnback-maxhp').textContent = playerPokemon.maxhealth;
	document.getElementById('pkmnback-hp').textContent = playerPokemon.health;
	document.getElementById('attack1').textContent = playerPokemon.moves[0].name;
	document.getElementById('attack2').textContent = playerPokemon.moves[1].name;

	// This animates the health bar when attacked
	var percentage = playerPokemon.health / playerPokemon.maxhealth;
	document.getElementById('player-hp-bar').style.width = ((161 * percentage) + "px");
	percentage = enemyPokemon.health / enemyPokemon.maxhealth;
	document.getElementById('enemy-hp-bar').style.width = ((161 * percentage) + "px");
}

function fightButton() {
	buttonsfx.play();
	document.getElementById('b2').src = "./assets/img/pkmnbattle2.png";
	document.getElementById('attackcancel').style.zIndex = '1';
	document.getElementById('attack1').style.zIndex = '1';
	document.getElementById('attack2').style.zIndex = '1';
}

function cancelButton() {
	buttonsfx.play();
	document.getElementById('b2').src = '';
	document.getElementById('attackcancel').style.zIndex = '-1';
	document.getElementById('attack1').style.zIndex = '-1';
	document.getElementById('attack2').style.zIndex = '-1';
}

function pkmnButton() {
	//habría que colocar en el html los elementos adecuados y cargalos con los pkmn del arraylist
	buttonsfx.play();
	document.getElementById('menu').src = './assets/img/pkmnbattle5.png';
	document.getElementById('menu').style.zIndex = '1';
	document.getElementById('pkmncancel').style.zIndex = '1';
	for (var x = 1; x < 7; x++) {
		document.getElementById("pkmn" + x).style.zIndex = '1';
	}
}

function pkmnCancelButton() {
	buttonsfx.play();
	document.getElementById('menu').src = '';
	document.getElementById('pkmncancel').style.zIndex = '-1';
	for (var x = 1; x < 7; x++) {
		document.getElementById("pkmn" + x).style.zIndex = '-1';
	}
}

function itemButton() {

}

function runButton() {
	buttonsfx.play();
	document.getElementById('menu').src = './assets/img/pkmnrun.png';
	document.getElementById('menu').style.zIndex = '1';
	document.getElementById('text').style.zIndex = '1';

	setTimeout(function () {
		document.getElementById('menu').style.zIndex = '-1';
		document.getElementById('text').style.zIndex = '-1';
		document.getElementById('text').textContent = '';
		i = 0;
	}, 2500);
}

function writeScape() {
	if (i < noRun.length) {
		document.getElementById('text').innerHTML += noRun.charAt(i);
		i++;
		setTimeout(writeScape, speed);
	}
}

function attack1() {
	clearText();
	buttonsfx.play();
	playerPokemon.attack(enemyPokemon, playerPokemon.moves[0]);
	//aquí vemos si hace crítico o no
	document.getElementById('attackcancel').style.zIndex = '-1';
	document.getElementById('attack1').style.zIndex = '-1';
	document.getElementById('attack2').style.zIndex = '-1';
	document.getElementById('b2').src = "";

	document.getElementById('menu').src = './assets/img/pkmnbattle.png';
	document.getElementById('menu').style.zIndex = '1';
	document.getElementById('battletext').style.zIndex = '1';

	battleText1 = playerPokemon.pokename + ' used ' + playerPokemon.moves[0].name + '!';
	writeAttack1();

	setTimeout(function () {
		if (playerPokemon.moves[0].target != 'self') {
			//me gustaría añadir varios tipos de sonidos, para los golpes fuertes, fuertes con crit
			//débiles, y débiles con crit
			//if (playerPokemon.moves[0].damage >= 40) {
			if (crit != 1) {
				attack1sfx.play();
			} else {
				attack2sfx.play();
			}
			document.getElementById('pkmn').style.animation = 'blink 0.15s 5';
			//se ejecuta al pasar 1seg
			setTimeout(function () {
				document.getElementById('pkmn').style.animation = '';
				if (foundPokemon == true) {
					//si encontró pokemon
					enemyPokemon.faint(enemyPokemon, enemyParty);
				}
			}, 1000);
		}

		setTimeout(function () {
			removeListeners();
			showPokemon();
			enemyAttack();
			addListeners();
			clearText();
		}, 1000);
	}, 2800);
}

function writeAttack1() {
	if (x < battleText1.length) {
		document.getElementById('battletext').innerHTML += battleText1.charAt(x);
		x++;
		setTimeout(writeAttack1, speed);
	}
	setTimeout(function () {
		if (x == battleText1.length && crit == 1.5) {
			if (battleText1 == criticalText) {
				return;
			}
			clearText();
			battleText1 = criticalText;
			writeAttack1();
		}
	}, 1490);
}

function attack2() {
	clearText();
	buttonsfx.play();
	playerPokemon.attack(enemyPokemon, playerPokemon.moves[1]);
	document.getElementById('attackcancel').style.zIndex = '-1';
	document.getElementById('attack1').style.zIndex = '-1';
	document.getElementById('attack2').style.zIndex = '-1';
	document.getElementById('b2').src = "";

	document.getElementById('menu').src = './assets/img/pkmnbattle.png';
	document.getElementById('menu').style.zIndex = '1';
	document.getElementById('battletext').style.zIndex = '1';

	battleText2 = playerPokemon.pokename + ' used ' + playerPokemon.moves[1].name + '!';
	writeAttack2();

	setTimeout(function () {
		if (playerPokemon.moves[1].target != 'self') {
			if (crit != 1) {
				attack1sfx.play();
			} else {
				attack2sfx.play();
			}
			document.getElementById('pkmn').style.animation = 'blink 0.15s 5';
			//Reset sprite
			setTimeout(function () {
				document.getElementById('pkmn').style.animation = '';
				if (foundPokemon == true) {
					//si encontró pokemon
					enemyPokemon.faint(enemyPokemon, enemyParty);
				}
			}, 1000);
		}

		setTimeout(function () {
			removeListeners();
			showPokemon();
			enemyAttack();
			addListeners();
			clearText();
		}, 1000);
	}, 3000);
}

function writeAttack2() {
	if (x < battleText2.length) {
		document.getElementById('battletext').innerHTML += battleText2.charAt(x);
		x++;
		setTimeout(writeAttack2, speed);
	}
	setTimeout(function () {
		if (x == battleText2.length && crit == 1.5) {
			if (battleText2 == criticalText) {
				return;
			}
			clearText();
			battleText2 = criticalText;
			writeAttack1();
		}
	}, 1490);
}

function enemyAttack() {
	var attackMove = Math.floor(Math.random() * enemyPokemon.moves.length);

	document.getElementById('menu').src = './assets/img/pkmnbattle.png';
	document.getElementById('menu').style.zIndex = '1';
	document.getElementById('battletext').style.zIndex = '1';

	//enemigo muerto, para que no ataque
	if (!enemyAlive) {
		clearText();
		enemyAlive = true;
		battleEnemyText = 'Enemy fainted!';
		writeEnemyAttack();
		setTimeout(function () {
			if (endBattle == false) {
				document.getElementById('menu').style.zIndex = '-1';
				document.getElementById('battletext').style.zIndex = '-1';
			}
		}, 2400);
		return;
	}

	setTimeout(function () {
		battleEnemyText = 'Enemy ' + enemyPokemon.pokename + ' used ' + enemyPokemon.moves[attackMove].name + '!';
		writeEnemyAttack();
	}, 1200);

	setTimeout(function () {
		enemyPokemon.attack(playerPokemon, enemyPokemon.moves[attackMove]);
		if (enemyPokemon.moves[attackMove].target != 'self') {
			attack2sfx.play();
			document.getElementById('pkmnback').style.animation = 'blink 0.15s 5';
			setTimeout(function () {
				document.getElementById('pkmnback').style.animation = '';
			}, 1000);

			playerPokemon.faint(playerPokemon, playerParty);
		}

		setTimeout(function () {
			showPokemon();
		}, 1000);

		setTimeout(function () {
			document.getElementById('menu').style.zIndex = '-1';
			document.getElementById('battletext').style.zIndex = '-1';
		}, 2000);

	}, 3000);
}

function writeEnemyAttack() {
	if (x < battleEnemyText.length) {
		document.getElementById('battletext').innerHTML += battleEnemyText.charAt(x);
		x++;
		setTimeout(writeEnemyAttack, speed);
	}
}

function endGame() {
	document.getElementById('enemy-hp-bar').style.width = 0;

	setTimeout(function () {
		clearText();
		battlesfx.pause();
		victorysfx.play();
		document.getElementById('menu').style.zIndex = '-1';
		document.getElementById('black').style.zIndex = '1';
		document.getElementById('ending').src = './assets/img/pkmnvictorywithred.png';
		document.getElementById('ending').style.zIndex = '1';
		document.getElementById('battletext').style.zIndex = '1';
		writeVictoryText();
	}, 6800);
	setTimeout(function () {
		document.getElementById('ending').style.opacity = '0';
		document.getElementById('battletext').style.opacity = '0';
	}, 18000);
	setTimeout(function () {
		document.getElementById('poweroff').style.zIndex = '1';
	}, 25000);
}

function writeVictoryText() {
	if (x < battleFinalVerse.length) {
		document.getElementById('battletext').innerHTML += battleFinalVerse.charAt(x);
		x++;
		setTimeout(writeVictoryText, speed);
	}
}

function clearText() {
	x = 0;
	document.getElementById('battletext').innerHTML = '';
}

function addListeners() {
	document.getElementById('startbutton').addEventListener('click', startButton);
	document.getElementById('fight').addEventListener('click', fightButton);
	document.getElementById('attackcancel').addEventListener('click', cancelButton);
	document.getElementById('pkmncancel').addEventListener('click', pkmnCancelButton);
	document.getElementById('pkmnbtn').addEventListener('click', pkmnButton);
	document.getElementById('attack1').addEventListener('click', attack1);
	document.getElementById('attack2').addEventListener('click', attack2);
	//document.getElementById('items').addEventListener('click', potion);
	document.getElementById('run').addEventListener('click', runButton);
}

function removeListeners() {
	document.getElementById('fight').removeEventListener('click', fightButton);
	document.getElementById('attackcancel').removeEventListener('click', cancelButton);
	document.getElementById('pkmncancel').removeEventListener('click', pkmnCancelButton);
	document.getElementById('pkmnbtn').removeEventListener('click', pkmnButton);
	document.getElementById('attack1').removeEventListener('click', attack1);
	document.getElementById('attack2').removeEventListener('click', attack2);
	// document.getElementById('items').removeEventListener('click', potion);
	document.getElementById('run').addEventListener('click', runButton);
}

