let door1 = document.getElementById("door1");
let door2 = document.getElementById("door2");
let door3 = document.getElementById("door3");
let startButton=document.getElementById("start");
let currentlyPlaying=true
let numCloseDoors=3;
let currentStreak=document.getElementById("score-number");
let Beststreak=document.getElementById("high-score");
let score=0;
let highscore=0;
currentStreak.innerHTML=score;
Beststreak.innerHTML=highscore;
let botDoorPath = "./images/robot.svg";
let beachDoorPath = "./images/beach.svg";
let spaceDoorPath = "./images/space.svg";
let closedDoorPath = "./images/closed_door.svg";
let openDoor1;
let openDoor2;
let openDoor3;

let showButton = document.getElementById("show-unopened");

showButton.onclick = () => {
    let unopened = [];
    
    if (!isClicked(door1)) unopened.push("Door 1");
    if (!isClicked(door2)) unopened.push("Door 2");
    if (!isClicked(door3)) unopened.push("Door 3");
    
    if(unopened.length === 0){
        alert("All doors have been opened!");
    } else {
        alert("Unopened doors: " + unopened.join(", "));
    }
};


const doorOpenSound = new Audio("./audio/open.mp3");

const playDoor=(door)=>{
    numCloseDoors--;
    if(numCloseDoors===0){
      gameOver("Win");//win  
    }else if(isBot(door)){
    gameOver("Lose");//fail
    }
};

const gameOver=(str)=>{
    if(str==="Win"){
        startButton.innerHTML="You win!!!";
        getYourScore();
    }else{
        startButton.innerHTML="Game over!!!";
        score=0;
        currentStreak.innerHTML=score;
        
    }
    currentlyPlaying=false
};
startButton.onclick = () => {
    if (!currentlyPlaying) {
        startRound();
        currentlyPlaying = true;
        numCloseDoors = 3;
        startButton.innerHTML = "Good Luck!";
        randomChoreDoorGenerator();
    }
};


const getYourScore=()=>{
    score=score+1;
    currentStreak.innerHTML=score;
    if(score>highscore){
        highscore=score;
        Beststreak.innerHTML=highscore;
    }
}

//door1.src = beachDoorPath;

const startRound = () => {
    door1.src = closedDoorPath;
    door2.src = closedDoorPath;
    door3.src = closedDoorPath;
    //door2.src=botDoorPath;
    //console.log(door2.src);

};

const isClicked = (door) => {
    randomChoreDoorGenerator();
    if (door.getAttribute('src') == closedDoorPath) {
        return false;
    } else {
        return true;
    }
};
const isBot = (door) => {
    if (door.getAttribute('src') == botDoorPath) {
        return true;
    } else {
        return false;
    }
};
door1.onclick = () => {
    console.log("Hello im door one");
    console.log(door1.getAttribute('src'))
    console.log(currentlyPlaying);
    if (currentlyPlaying && !isClicked(door1)) {
        doorOpenSound.play();
        door1.src = openDoor1;
        playDoor(door1);
    }
};/* else {
        door1.src = closedDoorPath;
    }
    if (isBot(door1)) {
        console.log("you failed")
    } else {
        console.log("Congratulation!")
    }*/
door2.onclick = () => {
    console.log("Hello im door two");
    console.log(door2.getAttribute('src'))
    if (currentlyPlaying && !isClicked(door2)) {
        doorOpenSound.play();
        door2.src = openDoor2;
        playDoor(door2);
    }
};
    door3.onclick = () => {
    console.log("Hello im door three");
    console.log(door3.getAttribute('src'))
    if (currentlyPlaying && !isClicked(door3)) {
        doorOpenSound.play();
        door3.src = openDoor3;
        playDoor(door3);
    }
};


const randomChoreDoorGenerator = () => {
    choreDoor = Math.floor(Math.random() * 6)
    switch (choreDoor) {
        case 0:
            openDoor1 = botDoorPath;
            openDoor2 = beachDoorPath;
            openDoor3 = spaceDoorPath;
            break;
        case 1:
            openDoor1 = botDoorPath;
            openDoor2 = spaceDoorPath;
            openDoor3 = beachDoorPath;
            break;
        case 2:
            openDoor2 = botDoorPath;
            openDoor1 = beachDoorPath;
            openDoor3 = spaceDoorPath;
            break;
        case 3:
            openDoor2 = botDoorPath;
            openDoor1 = spaceDoorPath;
            openDoor3 = beachDoorPath;
            break;
        case 4:
            openDoor3 = botDoorPath;
            openDoor1 = beachDoorPath;
            openDoor2 = spaceDoorPath;
            break;
        case 5:
            openDoor3 = botDoorPath;
            openDoor1 = spaceDoorPath;
            openDoor2 = beachDoorPath;
            break;

    }

    //console.log(openDoor1);
};

startRound();

