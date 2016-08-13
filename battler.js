//cached elements 

//game variables 

var playerCharacter; 


//constructors 
var Character = function(name,img, hp, ki, moves, transformations){
    this.name = name; 
    this.hp = hp; 
    this.attacks = attacks; 
    this.transformations = transformations; 
}

var Attack = function(name,iconImg,prevImg, damage, chance){
    this.name = name;
    this.iconImg = iconImg; 
    this.prevImg = prevImg; 
    this.damage = damage;
    this.chance = chance; 
}


var Transformation = function(name,img, powerIncrease){
    this.name = name; 
    this.img = img; 
    this.powerIncrease = powerIncrease; 
  
}

//click handlers 




//functions 

function battler(){
    
}

function setCharacter(character){
    playerCharacter = character ; 
}

function loadCharacters(){
    for(i = 0; i < game.characters.length; i++){
        var div = document.createElement('DIV');
        var img = document.createElement('IMG');
        
        div.className+= 'character-icon'; 
        img.setAttribute('src', game.characters[i].img)
        div.appendChild(img); 
    }
}

//atacks
var Kamehameha = new Attack('Kamehameha', 15, 50); 
var Strike = new Attack('Strike', 5, 75); 
var SpiritBomb= new Attack('Spirit Bomb', 50, 5);
var DeathBeam = new Attack('Death Beam', 15, 50); 
var DeathBall = new Attack('Death Ball', 50, 5);

//transformations
var SuperSaiyanGod = new Transformation('Super Saiyan God', 200);
var GoldenFreeza = new Transformation('Golden', 200); 

//moves lists
var gokuMoves = [Kamehameha, SpiritBomb, Strike, guard];
var freezaMoves = [DeathBeam, DeathBall, Strike, guard]; 

//characters
var Goku = new Character('Goku','https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQSrb5G87EelrOd0EfXQwu859xv8q90S4SfT_2G_bUKe3zm165W', 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQSrb5G87EelrOd0EfXQwu859xv8q90S4SfT_2G_bUKe3zm165W', 100, 100, gokuMoves, SuperSaiyanGod ); 

var Freeza = new Character('Freeza', 'http://www.awesysnet.ca/cptdb/uploads/GoldenFreeza-1.png','http://www.awesysnet.ca/cptdb/uploads/GoldenFreeza-1.png', freezaMoves, GoldenFreeza)


//game 
var game = {
    start:function(){
        
    }, 
    
    characters:[Goku, Freeza],
    
    battle: battler, 
    
    reset:function(){
        
    }, 
    
    
    
    
    
    
}