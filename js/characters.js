class Pokemon {
	constructor(pokename, level, maxhealth, moves, imgfront, imgback) {
		this.pokename = pokename;
		this.level = level;
		this.health = maxhealth;
		this.maxhealth = maxhealth;
		this.moves = moves;
		this.imgfront = imgfront;
		this.imgback = imgback;
		this.alive = true;
	}

	attack(target, move) {
		crit = 1;
		if (move.target == 'self') {
			this.decrementHealth(Math.round(this.maxhealth * move.damage));
		} else {
			// solo hace crítico nuestro pokemon
			if(target == enemyPokemon){
				var criticalHit = Math.floor((Math.random() * 101) + 1);	
				//7%	
				if(criticalHit > 93){
					crit = 1.5;
				}
			}
			target.decrementHealth(move.damage * crit);
		}
	}
	decrementHealth(damage) {
		this.health -= damage;
		if (this.health <= 0) {
			if (this.owner == 'player') {
				playerPokemon = this.faint(playerPokemon, playerParty);
			}
			if (this.owner == 'enemy') {
				enemyPokemon = this.faint(enemyPokemon, enemyParty);
			}
		}
		if (this.health > this.maxhealth) {
			this.health = this.maxhealth;
		}
	}
	// Faint function will pull the next pokemon in the array into the battle
	faint(currentPokemon, party) {
		foundPokemon = false;
		if (this.health <= 0) {
			//console.log('fainted!');
			this.alive = false;
			if(currentPokemon == enemyPokemon){
				enemyAlive = false;
			}
			for (var i = 0; i < party.length; i++) {
				if (party[i].alive == true) {
					foundPokemon = true;
					currentPokemon = party[i];
					//console.log(currentPokemon.pokename)
					break;
				}
			}

			if (foundPokemon == false) {
				endBattle = true;
				endGame();
			}
			return currentPokemon;
		}
	}		
	useItem(target, item) {
		if (item.target == 'self') {
			this.decrementHealth(this.maxhealth * item.damage);
		}
	}
};

pokemon = [];
pokemon.push(new Pokemon('PIKACHU', 50, 117, [moves['tackle'], moves['thundershock']], './assets/img/pikachu.png', './assets/img/pikachuback.png'));
pokemon.push(new Pokemon('CHARIZARD', 50, 163, [moves['fire blast'], moves['mega punch']], './assets/img/charizard.png', './assets/img/charizardback.png'));
pokemon.push(new Pokemon('BLASTOISE', 50, 180, [moves['hydro pump'], moves['skull bash']], './assets/img/blastoise.png', './assets/img/blastoiseback.png'));
pokemon.push(new Pokemon('KADABRA', 50, 128, [moves['psychic'], moves['rest']], './assets/img/kadabra.png', './assets/img/kadabraback.png'));
pokemon.push(new Pokemon('VENUSAUR', 50, 171, [moves['solar beam'], moves['body slam']], './assets/img/venusaur.png', './assets/img/venusaurback.png'));
pokemon.push(new Pokemon('JOLTEON', 50, 152, [moves['quick attack'], moves['thunder']], './assets/img/jolteon.png', './assets/img/jolteonback.png'));
pokemon.push(new Pokemon('ARBOK', 50, 133, [moves['acid'], moves['belch']], './assets/img/arbok.png', './assets/img/arbokback.png'));
pokemon.push(new Pokemon('SCYTHER', 50, 155, [moves['slash'], moves['hyper beam']], './assets/img/scyther.png', './assets/img/scytherback.png'));
pokemon.push(new Pokemon('STARMIE', 50, 146, [moves['hydro pump'], moves['rest']], './assets/img/starmie.png', './assets/img/starmieback.png'));
pokemon.push(new Pokemon('HITMONLEE', 50, 138, [moves['hi jump kick'], moves['mega kick']], './assets/img/hitmonlee.png', './assets/img/hitmonleeback.png'));
pokemon.push(new Pokemon('HAUNTER', 50, 120, [moves['lick'], moves['psychic']], './assets/img/haunter.png', './assets/img/haunterback.png'));
pokemon.push(new Pokemon('MACHAMP', 50, 190, [moves['low sweep'], moves['dynamic punch']], './assets/img/machamp.png', './assets/img/machampback.png'));


let playerParty = [];
let enemyParty = [];