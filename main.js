song1 = "";
song2 = "";

var status_song1 = "";
var status_song2 = "";

var scoreLeftWrist = 0;
var scorerightWrist = 0;

var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    var poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);

}

function modelLoaded(){
    console.log("poseNet is intialized!")
}

function draw(){
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    status_song1 = song1.isPlaying();
    status_song2 = song2.isPlaying();


     if(scorerightWrist >0.2){
         circle(rightWristX,rightWristY,20);
         song2.stop();

         if(status_song1 == false){
             song1.play();
             document.getElementById("song").innerHTML = "Playing - Hedwigs Harry Potter Theme"
         }
     }

     if(scoreLeftWrist >0.2){
        circle(rightWristX,rightWristY,20);
        song1.stop();

        if(status_song2 == false){
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Fireflies";
        }
    }

 
}

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("Owl_City_Fireflies.mp3");
}
function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
    
        rightWristY = results[0].pose.rightWrist.y;

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
    }

}

