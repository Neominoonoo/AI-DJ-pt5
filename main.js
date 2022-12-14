sound = "";
scoreLeftWrist = "";
scoreRightWrist = "";
leftWristX = "";
leftWristY = "";
rightWristX = "";
rightWristY = "";
function preload(){
    sound = loadSound("music.mp3");
    
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();



    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function draw(){
    image(video, 0, 0, 600, 500);

    fill("#00ff00");
    stroke("#00FF00");

    if(scoreRightWrist>0.2){
        circle(rightWristX, rightWristY, 20);
        if(rightWristY>0 && rightWristY<=100){
            document.getElementById("speed").innerHTML="Speed = 0.5x";
            sound.rate(0.5);
        }
        else if(rightWristY>100 && rightWristY<=200){
            document.getElementById("speed").innerHTML="Speed = 1x";
            sound.rate(1);
        }
        else if(rightWristY>200 && rightWristY<=300){
            document.getElementById("speed").innerHTML="Speed = 1.5x";
            sound.rate(1.5);
        }
        else if(rightWristY>300 && rightWristY<=400){
            document.getElementById("speed").innerHTML="Speed = 2x";
            sound.rate(2);
        }
        else if(rightWristY>400 && rightWristY<=500){
            document.getElementById("speed").innerHTML="Speed = 2.5x";
            sound.rate(2.5);
        }

    }

    if(scoreLeftWrist> 0.2){
    circle(leftWristX, leftWristY, 20);
    InnumberleftwristY = Number(leftWristY);
    remove_Decimals = floor(InnumberleftwristY);
    volume = remove_Decimals/500;
    document.getElementById("volume").innerHTML= "Volume = "+volume;
    sound.setVolume(volume);
    }

}
function playButton(){
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}
function modelLoaded(){
    console.log("Posenet has loaded.");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("left wrist score = "+scoreLeftWrist+ "right wirst score = "+scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWrist x coordinate = "+leftWristX+"Left Wrist y coordinate ="+  leftWristY);

        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist x coordinate = "+rightWristX+"Right Wrist y coordinate ="+  rightWristY);

    }
}