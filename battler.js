
//Game variables 
var currentScreen; 
var playerCharacter;
var computerCharacter;
var attacker; 
var defender; 
var map; 

//audio
var menuMusic = new Audio('assets/audio/menu-music.mp3');
var battleMusic = new Audio('assets/audio/battle-music.mp3');
var soundBeamMiss = new Audio('assets/audio/beam-miss.mp3'); 
var soundBeamFire = new Audio('assets/audio/beam-fire.mp3'); 
var soundDeathBall = new Audio('assets/audio/deathball-fire.mp3');
var soundFinalFlash = new Audio('assets/audio/final-flash-fire.mp3');
var soundGokuTransformation = new Audio('assets/audio/goku-transformation.mp3'); 
var soundKamehameha = new Audio('assets/audio/kamehameha-fire.mp3'); 
var soundSpiritBomb = new Audio('assets/audio/spirit-bomb.mp3'); 
var soundMiss = new Audio('assets/audio/miss.mp3'); 
var soundPowerUp = new Audio('assets/audio/powerup.mp3'); 
var soundStrike = new Audio('assets/audio/strike.mp3');
var soundStrike2 = new Audio('assets/audio/strike2.mp3');
var soundStrike3 = new Audio('assets/audio/strike3.mp3');

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
var piccoloIcon = 'assets/img/piccolo-icon.png'; 
var piccoloPrev = 'assets/img/piccolo-prev.png'
var piccoloBattle= 'assets/img/piccolo-battle.png'
var piccoloTransformation= 'assets/img/piccolo-transformation.png'


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

var Attack = function(name,sound,damage,energy, chance,type){
    this.name = name;
    this.sound=sound; 
    this.damage = damage;
    this.energy = energy; 
    this.chance = chance; 
    this.type = type; 
}

var Transformation = function(name,img,sound, multiplier){
    this.name = name; 
    this.img = img; 
    this.sound=sound; 
    this.multiplier = multiplier; 
  
}

var Map = function(name,img){
    this.name = name; 
    this.img = img; 
}


//atacks
var Kamehameha = new Attack('Kamehameha',soundKamehameha, 20,20, 45,'energy'); 
var Strike = new Attack('Strike',soundStrike, 5,0, 75,'physical'); 
var Strike2 = new Attack('Strike',soundStrike2, 5,0, 75,'physical'); 
var Strike3= new Attack('Strike',soundStrike3, 5,0, 75,'physical'); 
var SpiritBomb= new Attack('SpiritBomb',soundSpiritBomb, 50,50,10,'energy');
var DeathBeam = new Attack('DeathBeam',soundBeamFire, 20,20,45,'energy'); 
var DeathBall = new Attack('DeathBall',soundDeathBall, 50,50,10,'energy');
var GalickGun = new Attack('GalickGun',soundBeamFire, 20,20, 45,'energy'); 
var FinalFlash = new Attack('FinalFlash',soundFinalFlash, 50,50, 10,'energy'); 
var SpecialBeamCannon = new Attack('SpecialBeamCannon',soundBeamFire, 20,20, 45,'energy');
var HellzoneGrenade = new Attack('HellzoneGrenade',soundBeamFire, 50,50, 10,'energy'); 


//transformations
var SuperSaiyanGodGoku = new Transformation('Super Saiyan God Goku',gokuTransformation,soundGokuTransformation, 2);
var SuperSaiyanGodVegeta = new Transformation('Super Saiyan God Vegeta', vegetaTransformation,soundPowerUp, 2); 
var GoldenFreeza = new Transformation('Golden Freeza',freezaTransformation,soundPowerUp,  2); 
var FuseWithNail = new Transformation('Fusion With Nail',piccoloTransformation,soundPowerUp, 2); 

//moves lists
var gokuMoves = [Kamehameha, SpiritBomb, Strike];
var freezaMoves = [DeathBeam, DeathBall, Strike3]; 
var vegetaMoves = [GalickGun, FinalFlash, Strike2];
var piccoloMoves =[SpecialBeamCannon, HellzoneGrenade, Strike]; 

//maps 
var Namek = new Map('Namek', 'assets/img/namek.png'); 
var WorldTournament = new Map('WorldTournament', 'assets/img/worldtournament.png'); 
var Country = new Map('Country' ,'assets/img/country.png'); 

//characters
var Goku = new Character('Goku',gokuIcon,gokuPrev,gokuBattle, 100, 20, gokuMoves, SuperSaiyanGodGoku ); 
var Freeza = new Character('Freeza', freezaIcon,freezaPrev,freezaBattle, 100,20, freezaMoves, GoldenFreeza); 
var Vegeta = new Character('Vegeta', vegetaIcon,vegetaPrev,vegetaBattle, 100,20, vegetaMoves, SuperSaiyanGodVegeta);
var Piccolo = new Character('Piccolo', piccoloIcon, piccoloPrev, piccoloBattle, 100,20,piccoloMoves,FuseWithNail); 

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
function isPlaying(music){
     
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
        $('#'+playerCharacter.name).off('click'); 
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
    //player health and ki elements to load 
    $('#player-battler').append('<progress id=\'player-health-bar\' value=100 max=100 class =\'health-bar\'></progress>'); 
    $('#player-battler').append('<div id =\'player-battler-hp\'>'+playerCharacter.hp+ '</div>');
     $('#player-battler').append('<progress id=\'player-ki-bar\' value=20 max=100 class =\'ki-bar\'></progress>'); 
    $('#player-battler').append('<div id =\'player-battler-ki\'>' +playerCharacter.ki + '</div>');

    //loads attack buttons 
    $('#player-battler').append('<img id=\'player-battler-img\' src='+ playerCharacter.battleImg + '>');
    for(var i = 0 ; i < playerCharacter.attacks.length; i++){
        $('#player-battler').append('<div id='+playerCharacter.attacks[i].name+' class =\'btn attack-btn\'><span>'+playerCharacter.attacks[i].name+'</span></div>'); 
    }
    //loads power and guard buttons
    $('#player-battler').append('<div id=\'guard\' class =\'btn\'><i>Guard</i></div>'); 
    $('#player-battler').append('<div id=\'power-up\' class =\'btn power-btn\'><i>Power</i><span> Up</span></div>'); 
    $('#player-battler').append('<div id=\'transform\' class =\'btn power-btn\'>Transform</div>');
    
    //computer health and ki elements to load 
    $('#computer-battler').append('<progress id=\'computer-health-bar\' value=100 max=100 class =\'health-bar\'></progress>'); 
    $('#computer-battler').append('<div id =\'computer-battler-hp\'>'+computerCharacter.hp+ '</div>');
    $('#computer-battler').append('<progress id=\'computer-ki-bar\' value=20 max=100 class =\'ki-bar\'></progress>'); 
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
	else if(choice >= 35 && choice <= 50){
		guard(); 
	}
	else if(choice > 50){
		if(attacker.ki < 20){
            attackCalc(attacker.attacks[2]); 
        } else{
            attackCalc(undefined); 
        }
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
    if(defender.hp - damage <= 0){
        defender.hp = 0; 
    }
    else{
        defender.hp -= damage;
    }
	
     updateHp(); 
}

//reduces the amount of ki a character has 
function kiReduction(energy){
    if(attacker.ki - energy <= 0){
        attacker.ki = 0 ; 
    }
	else{
        attacker.ki -= energy;
    }
    updateKi();
}

//gives attacking character a ki increase 
function powerUp(){
	var x = Math.floor(Math.random() * 25) + 0; 
	attacker.ki += x; 
    if(attacker.ki > 100){
        attacker.ki = 100; 
        $('.readout').html('<p><i>'+ attacker.name + ' is at <i>full</i> <span>power!</span></p>');
        setTimeout(nextTurn, 3000);
        console.log('attacker ki: '+attacker.ki);
        
    }
    else{
	   $('.readout').html('<p><i>'+ attacker.name + '</i> recovered<span> ' + x.toString() + '</span> ki </p>');
	   setTimeout(nextTurn, 3000);
       console.log('attacker ki: '+attacker.ki);
    }
    playSound(soundPowerUp); 
     updateKi(); 
}

//transforms attacking character
function transform(){
	if(attacker.ki === 100 && attacker.isTransformed === false){
        if(attacker.name === playerCharacter.name){
            $('#player-battler-img').attr('src', playerCharacter.transformation.img);
            playSound(playerCharacter.transformation.sound); 
            multiplier(playerCharacter, 2, 10);
            attacker.isTransformed = true; 
        }
        else{
            $('#computer-battler-img').attr('src', computerCharacter.transformation.img);
            playSound(computerCharacter.transformation.sound);
            multiplier(computerCharacter, 2, 10);
            attacker.isTransformed = true; 
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

//fades the character to simulate damage
function strikeFlicker(){
    if(defender.name === playerCharacter.name){
         $('#player-battler-img').fadeTo('slow', 0);
         $('#player-battler-img').fadeTo('fast',100);   

    }
    else{
        
         $('#computer-battler-img').fadeTo('slow', 0);
         $('#computer-battler-img').fadeTo('fast',100); 
    }
}

function death(character){
    if(character === 'computer'){
        $('#computer-battler-img').fadeTo('slow', 0); 
    }
    else if(character === 'player'){
        $('#player-batter-img').fadeTo('slow', 0); 
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
    $('#player-battler-hp').html('<div>'+playerCharacter.hp+ '</div>');
    $('#player-health-bar').attr('value', playerCharacter.hp); 
    $('#computer-battler-hp').html('<div>'+computerCharacter.hp+ '</div>');
    $('#computer-health-bar').attr('value',computerCharacter.hp); 
}

//updates the current ki on the screen
function updateKi(){
     $('#player-battler-ki').html('<div>' +playerCharacter.ki + '</div>');
     $('#player-ki-bar').attr('value',playerCharacter.ki);
     $('#computer-battler-ki').html('<div>'+computerCharacter.ki + '</div>');
     $('#computer-ki-bar').attr('value', computerCharacter.ki); 
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
    playSound(attack.sound); 
	kiReduction(attack.energy); 
	hpReduction(attack.damage);
	$('.readout').html('<p><i>'+ attacker.name + '</i><span> damaged</span> ' + defender.name + ' with a <i>' + attack.name + '</i></p>');
    if(winChecker()){
        $('.readout').html('<p> You <span>Win!</span></p>');
        death('computer');  
        setTimeout(Game.reset, 5000);
    }
    else if(lossChecker()){
        $('.readout').html('<p> You <span>Lose!</span></p>');
        death('player');  
        setTimeout(Game.reset, 5000);
        
    }
    else{
        if(attack.type === 'energy'){
            setTimeout(strikeFlicker, 1500); 
        }
        else{
            strikeFlicker(); 
        }
       setTimeout(nextTurn, 3000); 
    }
}
// when a character misses attack 
function miss(attack){
    if(attack.type === 'energy'){
        playSound(soundBeamMiss); 
    }
    else{
        playSound(soundMiss); 
    }
	kiReduction(attack.energy); 
	$('.readout').html('<p><i>' + attacker.name + '</i><span> missed!</span> </p>');
	setTimeout(nextTurn, 3000);
   
}
//Game 
var Game = {
    
   characters:[Goku, Freeza, Vegeta, Piccolo],
    
   maps:[Namek, WorldTournament, Country],
    
    //starts the game 
    start:function(){
        changeScreen('.main-menu');
        isPlaying(battleMusic);
        menuMusic.currentTime = 0; 
        togglePlay(menuMusic, true);
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
        isPlaying(menuMusic);
        battleMusic.currentTime= 0; 
        togglePlay(battleMusic ,true); 
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
