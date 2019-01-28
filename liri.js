require("dotenv").config();
//requirements to run the program
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require("moment");
var fs = require("fs");

//key to search anything
var command = process.argv[2];
var ansarry= process.argv;
ansarry.splice(0,3);

//running the function
processData(command, ansarry);

//create the function 
function processData (command, input){
    var ansarry = input;
    switch (command){
        case "concert-this":
            //code to look through bands in town
            var query = ansarry.join(" ");
            axios.request("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp").then(
                function(response){
                    let date = moment(response.data[0].datetime).format("MM-DD-YYYY");
                    let output = ("-------------------------------------------------------------- \n"
                        + "Name of Venue: " + response.data[0].venue.name + "\n"
                        + "Venue Location: " + response.data[0].venue.city + "\n"
                        + "Date of Event: " + date + "\n"
                        + "--------------------------------------------------------------"
                    );
                    console.log(output);
                    logOutput(output);
                }
            )
            break;
    
        case "spotify-this-song":
            //code to search spotify
            var spotify = new Spotify(keys.spotify);
            if(Array.isArray(ansarry)){
                var query = ansarry.join(" ");
            }else{
                var query = ansarry;
            }
            //if no entry
            if (query===""){
                spotify.search({type:"track", query: "The Sign"}, function(err, data) {
                    if (err) {
                      return console.log('Error occurred: ' + err);
                    }
                  
                let output = ("-------------------------------------------------------------- \n"
                        + "Artist Name: " + data.tracks.items[0].album.artists[0].name + "\n"
                        + "From Album: " + data.tracks.items[0].album.name + "\n"
                        + "Preview Link: " + data.tracks.items[0].href + "\n"
                        + "--------------------------------------------------------------"
                    );
                    console.log(output);
                    logOutput(output);
                });
            }else{ //if song is entered...
                spotify.search({type:"track", query: query}, function(err, data) {
                    if (err) {
                      return console.log('Error occurred: ' + err);
                    }
                  
                let output = ("-------------------------------------------------------------- \n"
                        + "Artist Name: " + data.tracks.items[0].album.artists[0].name + "\n"
                        + "From Album: " + data.tracks.items[0].album.name + "\n"
                        + "Preview Link: " + data.tracks.items[0].href + "\n"
                        + "--------------------------------------------------------------"
                    );
                    console.log(output);
                    logOutput(output);
                });
            }
            break;
    
        case "movie-this":
            //code to search OMDB
            var query = ansarry.join("+");
            //if nothing was entered.
            if (query === ""){
                axios.request("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy")
                .then(
                    function(response) {
                        let output = ( "-------------------------------------------------------------- \n"
                        + "Movie Title: "+ response.data.Title +"\n" 
                        + "Year Relaeased: " + response.data.Year + "\n"
                        + "IMBD Rating: " + response.data.imdbRating + "\n"
                        + "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n"
                        + "Country Produced: " + response.data.Country + "\n"
                        + "Language: " + response.data.Language + "\n"
                        + "Plot of the Movie: " + response.data.Plot + "\n"
                        + "Actors in the Movie: " + response.data.Actors + "\n"
                        + "--------------------------------------------------------------"
                        );
                        console.log(output);
                        logOutput(output); 
                    }
                )
            }else{ //if there was any entry
                axios.request("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy")
                .then(
                    function(response) {
                        let output = ("-------------------------------------------------------------- \n"
                        + "Movie Title: "+ response.data.Title +"\n" 
                        + "Year Relaeased: " + response.data.Year + "\n"
                        + "IMBD Rating: " + response.data.imdbRating + "\n"
                        + "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\n"
                        + "Country Produced: " + response.data.Country + "\n"
                        + "Language: " + response.data.Language + "\n"
                        + "Plot of the Movie: " + response.data.Plot + "\n"
                        + "Actors in the Movie: " + response.data.Actors + "\n"
                        + "--------------------------------------------------------------"
                        ); 
                        console.log(output);
                        logOutput(output);
                    }
                    );
                }
            break;
    
        case "do-what-it-says":
            //code to read random.txt
            fs.readFile("random.txt", "utf-8", function(error, data) {
                if (error) {
                  return console.log(error);
                }
              
                console.log(data);
                var dataArr = data.split(",");
                processData(dataArr[0], dataArr[1]);
              
              });
            break;
    }
}

function logOutput (output){
    fs.appendFile("log.txt", output, function(error) {

        // If an error was experienced we will log it.
        if (error) {
          console.log(error);
        }
      
        else {
          console.log("Your output was logged.");
        }
    });
}