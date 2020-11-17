song1="";
song2="";
leftWristY=0;
rightWristY=0;
leftWristX=0;
rightWristX=0;
currentsong="";

function preload(){
    song1=loadSound("Dance_monkey.mp3");
    song2=loadSound("Senorita.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on("pose",getPoses);
}

function draw(){
    image(video,0,0,600,500);
}

function modelLoaded(){
    console.log("Model has been identified!!!!!!!!!!!!!");
}

function getPoses(results){
    if (results.length>0){
        console.log(results);
        if(results[0].pose.leftWrist.confidence > 0.5) {
            leftWristX=results[0].pose.leftWrist.x;
            leftWristY=results[0].pose.leftWrist.y;
        } else {
            leftWristY=0;
            leftWristX=0;
        }
        if(results[0].pose.rightWrist.confidence > 0.5) {
            rightWristY=results[0].pose.rightWrist.y;
            rightWristX=results[0].pose.rightWrist.x;
        } else {
            rightWristX = 0;
            rightWristY = 0;
        }
        console.log("Left Wrist Y = "+leftWristY+" Right Wrist Y = "+rightWristY);
        console.log("Left Wrist X = "+leftWristX+" Right Wrist X = "+rightWristX);
        play();
    }
}

function play(){
    if(leftWristY>rightWristY && currentsong!=song1){
        song2.pause();
        song1.play();
        song1.setVolume(1);
        song1.rate(1);
        currentsong=song1;
    }
    if(rightWristY>leftWristY && currentsong!=song2){
        song1.pause();
        song2.play();
        song2.setVolume(1);
        song2.rate(1);
        currentsong=song2;
    }
}