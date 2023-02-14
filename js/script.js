let titlesfx = new Audio('./assets/sfx/pokemonopening.mp3');
let battlesfx = new Audio('./assets/sfx/pokemonbattle.mp3');
let victorysfx = new Audio('./assets/sfx/pokemonvictory.mp3');
let buttonsfx = new Audio('./assets/sfx/pokemonbutton.mp3');
let attack1sfx = new Audio('/assets/sfx/pokemonattackeffect1.mp3');
let attack2sfx = new Audio('./assets/sfx/pokemonattackeffect2.mp3');

let playerPokemon;
let enemyPokemon;

var i = 0;
var txt = 'You can\'t SCAPE!';
var speed = 50;

addListeners();

function startButton() {
	document.getElementById('startbutton').style.zIndex = '-1';
	document.getElementById('battle').style.visibility = 'visible';
	document.getElementById('opening').style.zIndex = '1';
	titlesfx.play();
	setTimeout(function () {
		titlesfx.pause();
		transition();
		//}, 9000);
	}, 9000);
}

function transition() {
	document.getElementById('black').src = './assets/img/black.png';
	document.getElementById('black').style.zIndex = '1';
	document.getElementById('opening').style.zIndex = '-1';
	setTimeout(function () {
		battlesfx.play();
		battlesfx.volume = 0.2;
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
	console.log(playerPokemon);
	enemyPokemon = enemyParty[0];

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

function switchPokemon() {
	console.log('switched pokemon');
}

function pkmnButton() {

}

function itemButton() {

}

function runButton() {
	buttonsfx.play();
	console.log('run');
	document.getElementById('menu').src = './assets/img/pkmnrun.png';
	document.getElementById('menu').style.zIndex = '1';
	document.getElementById('text').style.zIndex = '1';

	setTimeout(function () {
		console.log('no run');
		document.getElementById('menu').style.zIndex = '-1';
		document.getElementById('text').style.zIndex = '-1';
		document.getElementById('text').textContent = '';
		i = 0;
	}, 2500);
}

function writeScape() {
	if (i < txt.length) {
		document.getElementById('text').innerHTML += txt.charAt(i);
		i++;
		setTimeout(writeScape, speed);
	}
}

function cancelButton() {
	buttonsfx.play();
	document.getElementById('b2').src = '';
	document.getElementById('attackcancel').style.zIndex = '-1';
	document.getElementById('attack1').style.zIndex = '-1';
	document.getElementById('attack2').style.zIndex = '-1';
}

function attack1() {
	buttonsfx.play();
	playerPokemon.attack(enemyPokemon, playerPokemon.moves[0]);
	document.getElementById('attackcancel').style.zIndex = '-1';
	document.getElementById('attack1').style.zIndex = '-1';
	document.getElementById('attack2').style.zIndex = '-1';
	document.getElementById('b2').src = "";

	document.getElementById('menu').src = './assets/img/pkmnbattle.png';
	document.getElementById('menu').style.zIndex = '1';
	document.getElementById('battletext').style.zIndex = '1';

	document.getElementById('battletext').innerHTML = (playerPokemon.pokename + ' used ' + playerPokemon.moves[0].name + '!');
	setTimeout(function () {
		//enemyPokemon.attack(playerPokemon, enemyPokemon.moves[attackMove]);
		if (playerPokemon.moves[0].target != 'self') {
			attack1sfx.play();
			document.getElementById('pkmn').style.animation = 'blink 0.15s 5';
			//se ejecuta al pasar 1
			setTimeout(function () {
				document.getElementById('pkmn').style.animation = '';
				enemyPokemon.faint(enemyPokemon, enemyParty);
			}, 1000);
			//console.log('health:'+enemyPokemon.health);
			//enemyPokemon.faint(enemyPokemon, enemyParty);
		}

		setTimeout(function () {
			removeListeners();
			showPokemon();
			enemyAttack();
			addListeners();
		}, 1000);
		//document.getElementById('battletext').innerHTML = '';
	}, 2800);
}

function attack2() {
	buttonsfx.play();
	playerPokemon.attack(enemyPokemon, playerPokemon.moves[1]);
	document.getElementById('attackcancel').style.zIndex = '-1';
	document.getElementById('attack1').style.zIndex = '-1';
	document.getElementById('attack2').style.zIndex = '-1';
	document.getElementById('b2').src = "";

	document.getElementById('menu').src = './assets/img/pkmnbattle.png';
	document.getElementById('menu').style.zIndex = '1';
	document.getElementById('battletext').style.zIndex = '1';

	document.getElementById('battletext').innerHTML = (playerPokemon.pokename + ' used ' + playerPokemon.moves[1].name + '!');
	setTimeout(function () {
		if (playerPokemon.moves[1].target != 'self') {
			attack1sfx.play();
			document.getElementById('pkmn').style.animation = 'blink 0.15s 5';
			//Reset sprite
			setTimeout(function () {
				document.getElementById('pkmn').style.animation = '';
				enemyPokemon.faint(enemyPokemon, enemyParty);
			}, 1000);
		}

		setTimeout(function () {
			removeListeners();
			showPokemon();
			enemyAttack();
			addListeners();
		}, 1000);
		/*
		removeListeners();
		showPokemon();
		enemyAttack();
		addListeners();*/
		//document.getElementById('battletext').style.zIndex = '-1';
		document.getElementById('battletext').innerHTML = ('');
	}, 3000);
}

function enemyAttack() {
	var attackMove = Math.floor(Math.random() * enemyPokemon.moves.length);

	document.getElementById('menu').src = './assets/img/pkmnbattle.png';
	document.getElementById('menu').style.zIndex = '1';
	document.getElementById('battletext').style.zIndex = '1';
	setTimeout(function () {
		document.getElementById('battletext').innerHTML = ('Enemy ' + enemyPokemon.pokename + ' used ' + enemyPokemon.moves[attackMove].name + '!');
	}, 1200);
	//document.getElementById('battletext').innerHTML = ('Enemy ' + enemyPokemon.pokename + ' used ' + enemyPokemon.moves[attackMove].name + '!');
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
			document.getElementById('menu').style.zIndex = '-1';
			document.getElementById('battletext').style.zIndex = '-1';
		}, 1200);
	}, 3000);
}

function addListeners() {
	document.getElementById('startbutton').addEventListener('click', startButton);
	document.getElementById('fight').addEventListener('click', fightButton);
	document.getElementById('attackcancel').addEventListener('click', cancelButton);
	document.getElementById('attack1').addEventListener('click', attack1);
	document.getElementById('attack2').addEventListener('click', attack2);
	//document.getElementById('items').addEventListener('click', potion);
	document.getElementById('run').addEventListener('click', runButton);
}

function removeListeners() {
	document.getElementById('fight').removeEventListener('click', fightButton);
	document.getElementById('attackcancel').removeEventListener('click', cancelButton);
	document.getElementById('attack1').removeEventListener('click', attack1);
	document.getElementById('attack2').removeEventListener('click', attack2);
	// document.getElementById('items').removeEventListener('click', potion);
	document.getElementById('run').addEventListener('click', runButton);
}

function endGame() {
	document.getElementById('ending').src = './assets/img/pkmnvictory.png';
	document.getElementById('ending').style.zIndex = '1';
	document.getElementById('endingtext').style.zIndex = '1';
	battlesfx.pause();
	victorysfx.play();
}