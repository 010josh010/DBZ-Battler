
//Game variables 
var currentScreen; 
var playerCharacter;
var computerCharacter;
var attacker; 
var defender; 
var map; 

//audio
var menuMusic = new Audio('assets/audio/menu-music.mp3');
togglePlay(menuMusic, true);

//images 
var gokuIcon = 'assets/img/goku-icon.png'; 
var gokuPrev= 'assets/img/goku-prev.png'; 
var gokuBattle = 'assets/img/goku-battle.png'; 
var gokuTransformation ='assets/img/goku-transformation.png'; 
var freezaIcon ='assets/img/freeza-icon.png';  
var freezaPrev ='assets/img/freeza-prev.png'; 
var freezaBattle = 'assets/img/freeza-battle.png'; 
var freezaTransformation = 'assets/img/freeza-transformation.png'; 
var vegetaIcon = 'assets/img/vegeta-icon.png'; 
var vegetaPrev = 'assets/img/vegeta-prev.png'; 
var vegetaBattle= 'assets/img/vegeta-battle.png'; 
var vegetaTransformation = 'assets/img/vegeta-transformation.png'; 

//constructors 
var Character = function(name,iconImg,prevImg,battleImg, hp, ki, attacks, transformation){
    this.name = name; 
    this.iconImg = iconImg; 
    this.prevImg = prevImg;
    this.battleImg = battleImg; 
    this.hp = hp; 
    this.ki = ki; 
    this.attacks = attacks; 
    this.transformation = transformation;
    this.isTransformed = false; 
    this.status = 'ready'; 
   
}

var Attack = function(name,damage,energy, chance){
    this.name = name;
    this.damage = damage;
    this.energy = energy; 
    this.chance = chance; 
}



var Transformation = function(name,img, multiplier){
    this.name = name; 
    this.img = img; 
    this.multiplier = multiplier; 
  
}

var Map = function(name,img){
    this.name = name; 
    this.img = img; 
}


//atacks
var Kamehameha = new Attack('Kamehameha', 20,20, 45); 
var Strike = new Attack('Strike', 5,0, 75); 
var SpiritBomb= new Attack('Spirit Bomb', 50,50, 10);
var DeathBeam = new Attack('Death Beam', 20,20,50, 45); 
var DeathBall = new Attack('Death Ball', 50, 10);
var GalickGun = new Attack('Galick Gun', 20,20, 45); 
var FinalFlash = new Attack('Final Flash', 50,50, 10); 


//transformations
var SuperSaiyanGodGoku = new Transformation('Super Saiyan God Goku',gokuTransformation, 2);
var SuperSaiyanGodVegeta = new Transformation('Super Saiyan God Vegeta', vegetaTransformation ,2); 
var GoldenFreeza = new Transformation('Golden Freeza',freezaTransformation,  2); 

//moves lists
var gokuMoves = [Kamehameha, SpiritBomb, Strike];
var freezaMoves = [DeathBeam, DeathBall, Strike]; 
var vegetaMoves = [GalickGun, FinalFlash, Strike]; 

//maps 

var Namek = new Map('Namek', 'assets/img/namek.png'); 
var WorldTournament = new Map('WorldTournament', 'assets/img/worldtournament.png'); 

//characters
var Goku = new Character('Goku',gokuIcon,gokuPrev,gokuBattle, 100, 20, gokuMoves, SuperSaiyanGodGoku ); 
var Freeza = new Character('Freeza', freezaIcon,freezaPrev,freezaBattle, 100,20, freezaMoves, GoldenFreeza); 
var Vegeta = new Character('Vegeta', vegetaIcon,vegetaPrev,vegetaBattle, 100,20, vegetaMoves, SuperSaiyanGodVegeta); 



//game functions 

//plays a sound effect
function playSound(sound){
	sound.play(); 
}

//toggles game music
function togglePlay(song, loopControl) {
  song.loop = loopControl; 
  return song.paused ? song.play() : song.pause();
}

//checks to see if the music is paused and turns it off if its playing
function isPlaying(){
     
    if(music.paused === false){
        togglePlay(music, false);
    }
}

//sets characters at the character select menu 
function setCharacter(character){
    if(!playerCharacter){
        playerCharacter = character;
        $('#player-preview').html('<img src ='+playerCharacter.prevImg+ '>');
        $('#player-character-name').html(playerCharacter.name); 
    }
    else{
        computerCharacter = character;
        $('#computer-preview').html('<img src =' +computerCharacter.prevImg +'>'); 
        $('#computer-character-name').html(computerCharacter.name); 
         $('.character-choice-grid-icons').off('click'); 
        setTimeout(Game.mapSelect, 2000); 
    }
}

//sets the map at the map select menu 
function setMap(mapChoice){
    map = mapChoice;
     $('.map-choice-grid-icons').off('click'); 
    setTimeout(Game.battle, 2000); 
}

//sets the css background of the battler to the chosen map 
function displayMap(){
    $('.battler').css('background-image', 'url('+map.img+')'); 
}

//loads the character pictures in the grid
function loadCharacterGrid(){
    for(i = 0; i < Game.characters.length; i++){
      $('.character-choice-grid').append('<div id='+Game.characters[i].name+' class=\'character-choice-grid-icons\'><img src='+ Game.characters[i].iconImg +'>'+ Game.characters[i].name + '</div>'); 
        
    }
}

//hides the previous menu and show the next game screen
function changeScreen(screen){
    if(!currentScreen){
        currentScreen= screen; 
        $(currentScreen).attr('style','display:block');
    }
    else{
        $(currentScreen).attr('style', 'display:none');
        currentScreen = screen; 
        $(currentScreen).attr('style','display:block');
    }
}

//loads the maps in the map select menu 
function loadMaps(){
   for(i = 0 ; i < Game.maps.length; i++){
        $('.map-choice-grid').append('<div id='+ Game.maps[i].name + ' class=\'map-choice-grid-icons\'><img src ='+ Game.maps[i].img + '><i>'+ Game.maps[i].name + '</i></div>'); 
   }
}

//loads the elements on the battler screen 
function loadBattler(){
    //player elements to load 
    $('#player-battler').append('<div id =\'player-battler-hp\'>'+playerCharacter.hp+ '</div>'); 
    $('#player-battler').append('<div id =\'player-battler-ki\'>' +playerCharacter.ki + '</div>'); 
    $('#player-battler').append('<img id=\'player-battler-img\' src='+ playerCharacter.battleImg + '>');
    for(var i = 0 ; i < playerCharacter.attacks.length; i++){
        $('#player-battler').append('<div id='+playerCharacter.attacks[i].name+' class =\'btn attack-btn\'><span>'+playerCharacter.attacks[i].name+'</span></div>'); 
    }
    
    $('#player-battler').append('<div id=\'guard\' class =\'btn\'><i>Guard</i></div>'); 
    $('#player-battler').append('<div id=\'power-up\' class =\'btn power-btn\'><i>Power</i><span> Up</span></div>'); 
    $('#player-battler').append('<div id=\'transform\' class =\'btn power-btn\'>Transform</div>');
    
    //computer elements to load 
    $('#computer-battler').append('<div id =\'computer-battler-hp\'>'+computerCharacter.hp+ '</div>');
    $('#computer-battler').append('<div id =\'computer-battler-ki\'>' +computerCharacter.ki + '</div>'); 
    $('#computer-battler').append('<img id =\'computer-battler-img\' src='+ computerCharacter.battleImg + '>'); 
    

}

//starts the players turn 
function playerTurn(){
	attacker = playerCharacter; 
	defender = computerCharacter;
	statusReady(); 
	$('.readout').html('<p><i> Choose</i> an <span> attack</span></p>'); 
	
	//guard button  click handler
	$('#guard').on('click',function(){
		guard(); 
		disableClick(); 
	});
	
	//power buttons click handler
	$('.power-btn').on('click', function(){
		var id = $(this).attr('id'); 
	   if(id === 'power-up'){
           powerUp(); 
       }
        else if(id === 'transform'){
            transform(); 
        }
		disableClick(); 
	});
	
	//attack button click handler 
	$('.attack-btn').on('click',function(){
		var id = $(this).attr('id'); 
		var attacks = attacker.attacks;
		var attack;  
		for(var i in attacks ){
			if(id === attacks[i].name ){
				attack = attacks[i]; 
			}
		}
		
		attackCalc(attack); 
		disableClick(); 
	});
	
}

//sets the attacker as the computer, calculates choice of attack or event 
function computerTurn(){
	disableClick(); 
	attacker = computerCharacter; 
	defender = playerCharacter;
	statusReady();
	
	//computer choice logic 
	var choice = Math.floor(Math.random() * 100) + 1; 
	
	if(attacker.ki === 100 && attacker.isTransformed === false){
		transform(); 
	}
	else if(choice >= 30 && choice <= 50){
		guard(); 
	}
	else if(choice > 50){
		attackCalc(undefined); 
	}
	else{
		powerUp(); 
	}
}

//starts the players or computers turn based on attacker; 
function nextTurn(){
	if(attacker.name === playerCharacter.name){
		computerTurn(); 
	}
	else{
		playerTurn(); 
	}
}

//disables click handlers 
function disableClick(){
	$('.attack-btn').off('click');
	$('.power-btn').off('click');
	$('#guard').off('click'); 
}

//calculates attack hit or miss 
function attackCalc(attack){
	if(attack === undefined){
		var x = Math.floor(Math.random() * attacker.attacks.length) + 0; 
		attack = attacker.attacks[x]; 
	}
	
	if(kiChecker(attack.energy)){
		var chance = attack.chance; 
		if(chance === 100){
				hit(attack); 
		}
		else{
			var y = Math.floor(Math.random() * 100) + 1; 
			if(y < chance){
				hit(attack); 
			}
			else{
				miss(attack); 
			}
		}
	}
}

//reduces hp 
function hpReduction(damage){
	if(isGuarding()){
		if(damage === 5){
            damage = 2; 
        }
        else{
            damage / 2 ; 
        }
	}
	defender.hp -= damage;
     updateHp(); 
}

//reduces the amount of ki a character has 
function kiReduction(energy){
	attacker.ki -= energy;
    updateKi();
}

//gives attacking character a ki increase 
function powerUp(){
	var x = Math.floor(Math.random() * 25) + 0; 
	attacker.ki += x; 
    if(attacker.ki > 100){
        attacker.ki = 100; 
        $('.readout').html('<p><i>'+ attacker.name + ' is at full power!</i></p>');
        setTimeout(nextTurn, 3000);
        console.log('attacker ki: '+attacker.ki);
        
    }
    else{
	   $('.readout').html('<p><i>'+ attacker.name + '</i> recovered<span> ' + x.toString() + '</span> ki </p>');
	   setTimeout(nextTurn, 3000);
       console.log('attacker ki: '+attacker.ki);
    }
     updateKi(); 
}

//transforms attacking character
function transform(){
	if(attacker.ki === 100 && attacker.isTransformed === false){
		attacker.isTransformed = true; 
        if(attacker.name === playerCharacter.name){
            $('#player-battler-img').attr('src', playerCharacter.transformation.img); 
            multiplier(playerCharacter, 2, 10); 
        }
        else{
            $('#computer-battler-img').attr('src', computerCharacter.transformation.img);
            multiplier(computerCharacter, 2, 10); 
        }
		$('.readout').html('<p>'+ attacker.name + ' transformed to <i>' +attacker.transformation.name + '</i></p>'); 
		setTimeout(nextTurn, 3000);
	}
	else if(attacker.isTransformed){
		$('.readout').html('<p><i>' + attacker.name + ' is already transformed</i> </p>');
		setTimeout(nextTurn, 3000);
	}
	else{
		$('.readout').html('<p><i>'+ attacker.name+ ' dosen\'t have enough Ki to transform</i> </p>'); 
		setTimeout(nextTurn, 3000);
	}
}

//multiplys the characters attacks 
function multiplier(character, damageMultiplier, chanceIncrease){
    for(var i = 0 ; i < character.attacks.length; i++){
        character.attacks[i].damage = character.attacks[i].damage * damageMultiplier;
        character.attacks[i].chance += chanceIncrease; 
    }
}

//checks if you have enough ki to attack 
function kiChecker(energy){
	if(attacker.ki < energy){
		$('.readout').html('<p><i>'+attacker.name +' dosen\'t have enough ki to attack</i></p>'); 
		setTimeout(nextTurn, 3000);
		return false; 
	}
	else{
		return true; 
	}
}

//sets status to guarding 
function guard(){
	attacker.status = 'guarding';
	$('.readout').html('<p><i>'+ attacker.name +'</i> is in the <span> defense position</span> </p>'); 
	setTimeout(nextTurn, 3000);
}

//checks if opponent is guarding 
function isGuarding(){
	if(defender.status === 'guarding'){
		return true; 
	}
	else{
		return false; 
	}
}

//resets status to ready 
function statusReady(){
	attacker.status = 'ready'; 
}

//updates the current hp on the screen 
function updateHp(){
     $('#player-battler-hp').html(playerCharacter.hp); 
    $('#computer-battler-hp').html(computerCharacter.hp);
}

//updates the current ki on the screen
function updateKi(){
     $('#player-battler-ki').html(playerCharacter.ki); 
     $('#computer-battler-ki').html(computerCharacter.ki);
}

//checks to see if you defeated the computer
function winChecker(){
    if(computerCharacter.hp <= 0){
        return true; 
    }
    else{
        return false; 
    }
}

//checks to see if you have been defeated 
function lossChecker(){
    if(playerCharacter.hp <= 0){
      
        return true; 
    }
    else{
        return false; 
    }
}


//when a character hits thier attack 
function hit(attack){
	kiReduction(attack.energy); 
	hpReduction(attack.damage); 
	$('.readout').html('<p><i>'+ attacker.name + '</i><span> damaged</span> ' + defender.name + ' with a <i>' + attack.name + '</i></p>');
    if(winChecker()){
        $('.readout').html('<p> You <span>Win!</span></p>'); 
        setTimeout(Game.reset, 5000);
    }
    else if(lossChecker()){
        $('.readout').html('<p> You <span>Lose!</span></p>'); 
        setTimeout(Game.reset, 5000);
        
    }
    else{
       setTimeout(nextTurn, 3000); 
    }
	
   
    
	
}
// when a character misses attack 
function miss(attack){
	kiReduction(attack.energy); 
	$('.readout').html('<p><i>' + attacker.name + '</i><span> missed!</span> </p>');
	setTimeout(nextTurn, 3000);
   
}
//Game 
var Game = {
    
   characters:[Goku, Freeza, Vegeta],
    
   maps:[Namek, WorldTournament],
    
    //starts the game 
    start:function(){
        changeScreen('.main-menu');
    },
    //starts the character select menu
   characterSelect:function(){
        changeScreen('.character-select'); 
        loadCharacterGrid();
       $('.character-choice-grid-icons').on('click', function(){
            var id = $(this).attr('id'); 
            var collection = Game.characters; 
            for(var i in collection){
                if(id === collection[i].name){
                setCharacter(collection[i]); 
                }
            }
           $(this).css('border-color', 'crimson'); 
           console.log(playerCharacter); 
           console.log(computerCharacter); 

       })
    }, 
    //starts the map selection menu 
   mapSelect:function(){
       changeScreen('.map-select');
       loadMaps();
       $('.map-choice-grid-icons').on('click', function(){
            var id = $(this).attr('id'); 
            var collection = Game.maps; 
            for(var i in collection){
                if(id === collection[i].name){
                setMap(collection[i]); 
                }
            }
           $(this).css('border-color', 'crimson');
           console.log(map); 
       })
   },
    //starts the batller
    battle: function(){
        changeScreen('.battler');
        displayMap(); 
        loadBattler();
        playerTurn(); 
    },
    //resets game elements and variables
    cleanup:function(){
        playerCharacter.hp =100; 
        computerCharacter.hp=100;
        playerCharacter.ki =20; 
        computerCharacter.ki=20;
        playerCharacter = undefined; 
        computerCharacter = undefined;
        attacker=undefined; 
        defender=undefined; 
        map = undefined;
        $('.character-choice-grid').empty(); 
        $('#player-preview').empty(); 
        $('#computer-preview').empty(); 
        $('#player-character-name').empty(); 
        $('#computer-character-name').empty(); 
        $('.map-choice-grid').empty();
        $('.battle-block').empty(); 
        $('.readout').empty(); 
        
    },
    //resets the game 
    reset:function(){
        Game.cleanup(); 
        Game.start()
        console.log('game reset'); 
    }
}

//onclick handlers 

$('#start-game').on('click', function(){
    Game.characterSelect(); 
})

//starts the game 
Game.start(); 
