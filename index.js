const fs = require("fs");
const os = require("os");
const pathToJson = os.homedir() + "/scoreboard.json";
const express = require("express");
const { json } = require("express");
const app = express();
var jsonContent ;


function getFileContent() {
    try {jsonContent = JSON.parse(fs.readFileSync(pathToJson, 'utf-8'));}
    catch {
        console.log("Can't find file " + pathToJson + "\r\nError code (13-GetFileContent)");
        return ;
    }
}

function writeScore(username, score, dataJson) {
var positionToSet ;
if(jsonContent.score.length == 0) {
jsonContent.score[0] = dataJson ;
return fs.writeFileSync(pathToJson, JSON.stringify(jsonContent));
}
if(jsonContent.score.length == 1) {
    const scoreOfPosition = jsonContent.score[0].score;
if(scoreOfPosition < score) {
    jsonContent.score.splice(0, 0, dataJson)
} else {
    jsonContent.score.splice(1, 0, dataJson)
}
return fs.writeFileSync(pathToJson, JSON.stringify(jsonContent));
}
if(jsonContent.score.length > 1) {
    var lengthOfArray = jsonContent.score.length;
    //removing old scores if the username is taken...
    for (let z = 0; z < jsonContent.score.length; z++) {
        const element = jsonContent.score[z];
        console.log(element.score == score);
        if(element.username == username) {
            if(element.score < score) {
            jsonContent.score.splice(z, 1);
            console.log(jsonContent.score);
            } else {
                return console.log("Skipping writing (CODE : 45-RecordScore)");
            }
        }
        
    }
    var lengthOfArray = jsonContent.score.length;
    //then we check if the score is in last place
    if(dataJson.score <= jsonContent.score[lengthOfArray-1].score) {
        jsonContent.score.push(dataJson) ;
        return fs.writeFileSync(pathToJson, JSON.stringify(jsonContent));
    }
    if(dataJson.score >= jsonContent.score[0].score) {
        jsonContent.score.unshift(dataJson);
        return fs.writeFileSync(pathToJson, JSON.stringify(jsonContent));
    }


    //else we test each place possible for the score
    for (let i = jsonContent.score.length-1; i != 0; i-=1) {       
        const scoreOfPosition = jsonContent.score[i].score;

        if(scoreOfPosition >= score) {
            positionToSet = i ;
            jsonContent.score.splice(i+1, 0, dataJson);
            return fs.writeFileSync(pathToJson, JSON.stringify(jsonContent));
        }
        
    }
}
getFileContent();

}

app.get("/setScore", (req, res) => {
getFileContent();
//get arguments
var argStart = req.url.indexOf("?")+1;
var arguments ;
try {
    arguments = JSON.parse(decodeURI(req.url.slice(argStart, req.url.length)));
} catch (error) {
    return res.sendStatus(400);
}

res.sendStatus(200);
console.log("recieved arguments : " + JSON.stringify(arguments));
writeScore(arguments.username, arguments.score, arguments);
});
app.get("/getScoreboard", (req,res) => {
    fs.readFile(pathToJson, 'utf-8', function(err,data){
        res.send(data);
    });
    
});
app.listen(3500, () => {
    console.log("Listening on http://localhost:3500");
});