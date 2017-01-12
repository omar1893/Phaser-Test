var juego = new Phaser.Game(370, 550, Phaser.CANVAS, 'bloque_juego');
var fondoJuego;
var boton;
var bird;

var estadoPrincipal = {
    
     preload: function(){
       juego.load.image('fondo', 'img/bg.jpeg'); 
       juego.load.image('pajaro', 'img/pajaro1.png');
       //juego.load.image('btn', 'img/btn.png');
       bird.anchor.setTo(0.5);
       bird.scale.setTo( )
    },

    create: function(){
        fondoJuego = juego.add.tileSprite(0,0,370,550, 'fondo');
        bird = juego.add.sprite(10, 5, 'pajaro');
        //boton = juego.add.sprite(juego.width/2, juego.height/2, 'btn');
        //boton.anchor.setTo(0.5, 0.5);
    }, 

    update: function(){
        //fondoJuego.tilePosition.x -= 1;
    }

};

juego.state.add('principal', estadoPrincipal);

juego.state.start('principal');
