window.addEventListener("load",function(){
    var GAME_WIDTH=640;
    var GAME_HEIGHT=340;
    var gameLive=true;
    var level=1;
    var life=5;
    var color="white";
    // var element = document.getElementById("myDiv");

    //     // Apply the border radius
    //     element.style.borderRadius = "15px";

    var enemies=[
        {
            x:100,
            y:100,
            speedY:2,
            w:40,
            h:40
        },
        {
            x:200,
            y:10,
            speedY:2,
            w:40,
            h:40
        },
        {
            x:330,
            y:0,
            speedY:3,
            w:40,
            h:40
        },
        {
            x:150,
            y:0,
            speedY:-2 ,
            w:20,
            h:20
        },
        {
            x:450,
            y:100,
            speedY:-3 ,
            w:40,
            h:40
        },
        {
            x:250,
            y:100,
            speedY:3 ,
            w:20,
            h:20
        },
        {
            x:550,
            y:100,
            speedY:-3 ,
            w:20,
            h:20
        },
        {
            x:650,
            y:100,
            speedY:0 ,
            w:20,
            h:20
        }
    ];

    var player={
        x:10,
        y:160,
        speedX:2,
        isMoving:false,
        w:40,
        h:40
    };
    var goal={
        x:580,
        y:150,
        w:50,
        h:36
    };

    var  sprites={};

    var movePlayer =function(){
        player.isMoving=true;
    }
    var stopPlayer=function(){
        player.isMoving=false;
    }
    var canvas =this.document.getElementById("mycanvas");
    var ctx=canvas.getContext("2d");

    canvas.addEventListener('mousedown', movePlayer);
    canvas.addEventListener('mouseup', stopPlayer);
    canvas.addEventListener('touchstart', movePlayer);
    canvas.addEventListener('touchend', stopPlayer);


    var update=function(){
        if(checkCollision(player, goal)){
            alert("You Have Won The Game!!!");
            level += 1;
            life += 1;
            player.speedX += 1;
            player.x = 10
            player.y =160;
            player.isMoving = false;

            for(var ab=0; ab<enemies.length;ab++){
                if(enemies[ab].speedY > 1){
                    enemies[ab].speedY +=1;
                }else{
                    enemies[ab].speedY -=1;
                }
            }
        }
        if(player.isMoving){
            player.x = player.x + player.speedX;
        }
        var i=0;
        var n=enemies.length

        enemies.forEach(function(element, index){
            if(checkCollision(player, element)){
                if(life == 0 ){
                    alert(" Oops! Game Over")


                for (var ab=0;ab<enemies.length;ab++){
                    if(enemies[ab].speedY > 1){
                        enemies[ab].speedY -= (level - 1);
                    }else{
                        enemies[ab].speedY += (level -1);
                    }
                }
                level = 1;
                life = 5;
                player.speedX = 2;
                }
                if(life > 0){
                    life -= 1;
                }
                player.x=10;
                player.y=160;
                player.isMoving = false;
            }
            element.y += element.speedY;

            if(element.y <= 10){
                element.y = 10;
                element.speedY *= -1;
            }else if(element.y >= GAME_HEIGHT -50){
                  element.y = GAME_HEIGHT - 50;
                  element.speedY += -1;
            }
        });
    };
    var draw = function(){
        ctx.clearRect(0, 0, GAME_WIDTH,GAME_HEIGHT);

        ctx.font = " lighter 12px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Level :" + level, 10, 15);
        ctx.fillText("Life : " + life, 10 , 35);
        ctx.fillText("Speed :" + player.speedX, 10, 55);

        ctx.fillStyle = color;
        ctx.fillRect(player.x, player.y, player.w, player.h);

        ctx.fillStyle = "red";
        enemies.forEach(function(element, index){
        ctx.fillRect(element.x, element.y, element.w, element.h);
        })

        ctx.fillStyle="green";
        ctx.fillRect(goal.x,goal.y,goal.w,goal.h);
    }
    var step=function(){
        update();
        draw();

        if(gameLive){
            window.requestAnimationFrame(step);

        }
    };
    var checkCollision =function(rect1, rect2){
        var closeOnWidth = Math.abs(rect1.x - rect2.x) <= Math.max(rect1.w, rect2.w);
        var closeOnHeight = Math.abs(rect1.y - rect2.y) <= Math.max(rect1.h,rect2.h);
        return closeOnWidth && closeOnHeight;
    }
    step();
})