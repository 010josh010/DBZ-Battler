
//Game variables 
var currentScreen; 
var playerCharacter;
var computerCharacter;
var map; 



//audio
var menuMusic = new Audio('assets/audio/menu-music.mp3');
togglePlay(menuMusic, true);

//constructors 
var Character = function(name,iconImg,prevImg,battleImg, hp, ki, moves, transformations){
    this.name = name; 
    this.iconImg = iconImg; 
    this.prevImg = prevImg;
    this.battleImg = battleImg; 
    this.hp = hp; 
    this.ki = ki; 
    this.moves=moves; 
    this.transformations = transformations;
   
}

var Attack = function(name,damage, chance){
    this.name = name;
    this.damage = damage;
    this.chance = chance; 
}



var Transformation = function(name,img, powerIncrease){
    this.name = name; 
    this.img = img; 
    this.powerIncrease = powerIncrease; 
  
}

var Map = function(name,img){
    this.name = name; 
    this.img = img; 
}

//images 
var gokuIcon = 'http://static.comicvine.com/uploads/original/11125/111257581/4862622-goku_by_spongeboss-d35orzj.png'; 

var gokuPrev= 'http://vignette2.wikia.nocookie.net/mcleodgaming/images/0/09/Goku.png/revision/latest?cb=20151210150735'; 

var gokuBattle = 'http://img02.deviantart.net/f22d/i/2015/156/f/0/goku_battle_damaged_alt_palette__3_by_rayzorblade189-d8w40rz.png'; 

var freezaIcon ='https://lh3.googleusercontent.com/-rYyHdxTDGg0/Vdq8KVu03xI/AAAAAAAAAkI/BrxpsNJXDtQ/w506-h750/golden_frieza__dragonball_heroes__by_rayzorblade189-d8ulie9.png';  

var freezaPrev ='http://www.awesysnet.ca/cptdb/uploads/GoldenFreeza-1.png'; 

var freezaBattle = 'http://vignette3.wikia.nocookie.net/deathbattlefanon/images/a/a6/Golden_Frieza.png/revision/latest?cb=20150810045513'; 

var vegetaIcon = 'https://lh3.googleusercontent.com/-HRbuJxEKNM8/VUTW47d9M-I/AAAAAAAAB34/QmgG2gUUu-4/w337-h337-p/vegeta_fukkatsu_no_f_by_bardocksonic-d8l8yqm.png'; 

var vegetaPrev = 'http://orig07.deviantart.net/4b80/f/2015/257/c/3/vegeta_super_saiyan_god_super_saiyan_by_bardocksonic-d99inex.png'; 

var vegetaBattle= 'http://pre06.deviantart.net/af97/th/pre/i/2015/277/5/2/vegeta_volando_by_saodvd-d9bz4m1.png'; 


//functions 

function togglePlay(song, loopControl) {
  song.loop = loopControl; 
  return song.paused ? song.play() : song.pause();
}
function isPlaying(){
     
    if(music.paused === false){
        togglePlay(music, false);
    }
    
   
}

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
        
        setTimeout(Game.mapSelect, 2000); 
    }
}

function setMap(mapChoice){
    map = mapChoice;
    setTimeout(Game.battle, 2000); 
}

function displayMap(){
    $('.battler').css('background-image', 'url('+map.img+')'); 
}


function loadCharacterGrid(){
    for(i = 0; i < Game.characters.length; i++){
      $('.character-choice-grid').append('<div id='+Game.characters[i].name+' class=\'character-choice-grid-icons\'><img src='+ Game.characters[i].iconImg +'>'+ Game.characters[i].name + '</div>'); 
        
    }
}

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

function loadMaps(){
   for(i = 0 ; i < Game.maps.length; i++){
        $('.map-choice-grid').append('<div id='+ Game.maps[i].name + ' class=\'map-choice-grid-icons\'><img src ='+ Game.maps[i].img + '>'+ Game.maps[i].name + '</div>'); 
   }
}

function loadBattler(){
    $('#player-battler').append('<div id =\'player-battler-hp\'>'+playerCharacter.hp+'</div>')
    $('#player-battler').append('<img src='+ playerCharacter.battleImg + '>'); 
    $('#computer-battler').append('<div id =\'computer-battler-hp\'>'+computerCharacter.hp+'</div>')
    $('#computer-battler').append('<img src='+ computerCharacter.battleImg + '>'); 
    

}

function battleProcessor(){
    console.log('battling'); 
    var rand = Math.floor(Math.random() * 10) + 1;
    console.log(rand); 
    var hit; 
    
    if(rand > 5){
        computerCharacter.hp -= 10;
        hit = computerCharacter.name;
        console.log('computer hit'); 
    }
    else{
        playerCharacter.hp -= 10;
        hit = playerCharacter.name;
        console.log('player hit'); 
    }
    
    $('#player-battler-hp').html(playerCharacter.hp); 
    $('#computer-battler-hp').html(computerCharacter.hp);
    console.log(playerCharacter.hp); 
    console.log(computerCharacter.hp);
    
    $('.results').html('<p>'+hit+' was damaged'+'</p>'); 
    
    if(playerCharacter.hp === 0){
        lose(); 
    }
    else if(computerCharacter.hp === 0){
        win(); 
    }
    
    
    
}

function lose(){
    $('#fight').off('click'); 
    $('.results').html('<p> You Lose!</p>');
    setTimeout(Game.reset, 2000); 
}

function win(){
    $('#fight').off('click'); 
    $('.results').html('<p> You Win!</p>');
    setTimeout(Game.reset, 2000); 
}

//characters
var Goku = new Character('Goku',gokuIcon,gokuPrev,gokuBattle, 100, 100, gokuMoves, SuperSaiyanGod ); 

var Freeza = new Character('Freeza', freezaIcon,freezaPrev,freezaBattle, 100,100, freezaMoves, GoldenFreeza); 

var Vegeta = new Character('Vegeta', vegetaIcon,vegetaPrev,vegetaBattle, 100,100, vegetaMoves, SuperSaiyanGod); 

//maps 

var Namek = new Map('Namek', 'https://images3.alphacoders.com/677/677271.png'); 

var WorldTournament = new Map('WorldTournament', 'http://img14.deviantart.net/7f8f/i/2014/299/a/2/dragon_ball_xenoverse_1023_12_by_somdude424-d8472h1.jpg'); 



//atacks
var Kamehameha = new Attack('Kamehameha', 15, 50); 
var Strike = new Attack('Strike', 5, 75); 
var SpiritBomb= new Attack('Spirit Bomb', 50, 5);
var DeathBeam = new Attack('Death Beam', 15, 50); 
var DeathBall = new Attack('Death Ball', 50, 5);
var GalickGun = new Attack('Galick Gun', 15, 50); 
var FinalFlash = new Attack('Final Flash', 50, 5); 

//defense

var Guard = new Attack('Guard', 0, 100); 

//transformations
var SuperSaiyanGod = new Transformation('Super Saiyan God', 200);
var GoldenFreeza = new Transformation('Golden', 200); 

//moves lists
var gokuMoves = [Kamehameha, SpiritBomb, Strike, Guard];
var freezaMoves = [DeathBeam, DeathBall, Strike, Guard]; 
var vegetaMoves = [GalickGun, FinalFlash, Strike, Guard]; 



//Game 
var Game = {
    
   characters:[Goku, Freeza, Vegeta],
    
   maps:[Namek, WorldTournament],
    
    mainMenu:function(){
        changeScreen('.main-menu');
    },
 
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
           console.log(playerCharacter); 
           console.log(computerCharacter); 

       })
    }, 
    
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
     
           console.log(map); 
       })
   },
    
    battle: function(){
        changeScreen('.battler');
        displayMap(); 
        loadBattler();
        $('#fight').on('click',function(){
            battleProcessor(); 
        })
    },
    
    cleanup:function(){
        playerCharacter.hp =100; 
        computerCharacter.hp=100; 
        playerCharacter = undefined; 
        computerCharacter = undefined; 
        map = undefined;
        $('.character-choice-grid').empty(); 
        $('#player-preview').empty(); 
        $('#computer-preview').empty(); 
        $('#player-character-name').empty(); 
        $('#computer-character-name').empty(); 
        $('.map-choice-grid').empty();
        $('.battle-block').empty(); 
        $('.results').empty(); 
        
    },
    
    reset:function(){
        Game.cleanup(); 
        Game.mainMenu()
        console.log('game reset'); 
    }
}

//onclick handlers 

$('#start-game').on('click', function(){
    Game.characterSelect(); 
})



//calls 

Game.mainMenu(); 






