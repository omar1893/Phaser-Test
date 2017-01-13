var juego = new Phaser.Game(370, 550, Phaser.CANVAS, 'bloque_juego');
var fondoJuego;
var nave;
var cursores;
var enemigosbalas;
var tiempoBala = 0;
var botonDisparo;
var enemigos;

var estadoPrincipal = {
    
     preload: function(){
       juego.load.image('fondo', 'img/space.jpg');
       juego.load.image('personaje', 'img/blueship.png');
       juego.load.image('laser', 'img/beam.png');
       juego.load.image('enemigo','img/pajaro1.png');
    },

    create: function(){
        fondoJuego = juego.add.tileSprite(0,0,370,550, 'fondo');
        nave = juego.add.sprite(juego.width/2, 500,'personaje');
        nave.anchor.setTo(0.5);
        nave.scale.setTo(0.04,0.04);

        cursores= juego.input.keyboard.createCursorKeys();
        botonDisparo = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        balas = juego.add.group();
        balas.enableBody = true;
        balas.physicsBodyType = Phaser.Physics.ARCADE;
        balas.createMultiple(20, 'laser');
        balas.setAll('anchor.x', 0.5);
        balas.setAll('anchor.y', 1);
        balas.setAll('scale.x', 0.3);
        balas.setAll('scale.y', 0.3);
        balas.setAll('outOfBoundsKill', true);
        balas.setAll('checkWorldBounds', true);

        enemigos = juego.add.group();
        enemigos.enableBody = true;
        enemigos.physicsBodyType = Phaser.Physics.ARCADE;
        

        for(var y = 0; y<6; y++){
            for(var x = 0; x<7; x++){
                var enemigo = enemigos.create(x*40, y*20, 'enemigo');
                enemigo.anchor.setTo(0.5);
                enemigo.scale.setTo(0.4,0.4);
            }
        }
        enemigos.x = 50;
        enemigos.y = 30;

        var animacion = juego.add.tween(enemigos).to({x:100}, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true);
        animacion.onLoop.add(descender, this);
}, 

    update: function(){
        //fondoJuego.tilePosition.y -= 1;
        if(cursores.right.isDown){
            nave.position.x += 3;
        }
        else if(cursores.left.isDown){
            nave.position.x -= 3;
        }
        var bala;
        if(botonDisparo.isDown){
            if(juego.time.now > tiempoBala){
                bala = balas.getFirstExists(false);
            }
            if(bala){
                bala.reset(nave.x, nave.y)
                bala.body.velocity.y = -200;
                tiempoBala = juego.time.now + 500;
            }
        }
        juego.physics.arcade.overlap(balas, enemigos, colision, null, this)
    }

};

function colision(bala, enemigo){
    bala.kill();
    enemigo.kill();
}

function descender(){
    enemigos.y += 100;
}

juego.state.add('principal', estadoPrincipal);

juego.state.start('principal');
