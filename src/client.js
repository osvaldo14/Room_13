
/*--------------------------------------------------------------*/
/*---------------------------VARIABLES--------------------------*/
/*--------------------------------------------------------------*/
let win = false;
let container = $("#container");
let btn_left = $("#btn_left");
let btn_right = $("#btn_right");
let chest = $("#chest");
let waiting_page = $("#wait_page");

let code = "42710";
let photo = $("#last_clue");
let socket = io.connect('http://localhost:8080');

/*--------------------------------------------------------------*/
/*---------------------------FONCTIONS--------------------------*/
/*--------------------------------------------------------------*/

//Hide the main room and display the chest room
function display_chest(){
    $("#container").toggleClass('bgmain bgchest');
    chest_code();
}

//Display the main room and hide the chest room
function display_main(){
    $("#container").toggleClass('bgchest bgmain');
}

//Check if the code is correct
function chest_code(){
    var code_tried = prompt("There is a chest over there, let's try to open it...", "Enter the code");
    if(code_tried == code){
        socket.emit("end");
        display_photo();
    }else{ //display a feedback is the client enter the wrong code
        display_main();
     //err_msg = "It might be the wrong code... nothing happens";
    }
}

//The winner see the clue to continue the investigation
function display_photo(){
    $("#container").toggleClass('bgchest photo_clue');
    /*setTimeout(function(){
        photo.hide();
    }, 5000);*/
}

//Client i'll be waiting for second player in the waiting page
function wait_2client(){
    $("#container").toggleClass('bgmain waiting_page');
}

function hide_button(){
    $(".hideME").css("visibility","hidden");}

function show_button(){
    $(".hideME").css("visibility","visible");}

/*--------------------------------------------------------------*/
/*---------------------------MESSAGES---------------------------*/
/*--------------------------------------------------------------*/


socket.on("play_begin", function(){
    $("#container").toggleClass('waiting_page bgmain');
    show_button();
    console.log("la partie commence !")
});

socket.on("end_game", function(){
    if (win){
       display_photo();
    }else {
     //you lose  exit game.
    }
    hide_button();
});

socket.on("connection accepted", function(){
    wait_2client();
    hide_button();
})

function begin(){
    socket.emit("new_player");

}
