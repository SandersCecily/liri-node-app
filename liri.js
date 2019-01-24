require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require("moment");

//key to search anything
var command = process.argv[2];
var ansarry= process.argv;
ansarry.splice(0,3);

switch (command){
    case "concert-this":
        //code to look through bands in town
        var query = ansarry.join(" ");
        axios.request("https://rest.bandsintown.com/artists/" + query + "/events?app_id=codingbootcamp").then(
            function(response){
                let date = moment(response.data[0].datetime).format("MM-DD-YYYY");
                console.log("-------------------------------------------------------------- \n"
                    + "Name of Venue: " + response.data[0].venue.name + "\n"
                    + "Venue Location: " + response.data[0].venue.city + "\n"
                    + "Date of Event: " + date + "\n"
                    + "--------------------------------------------------------------"
                );
            }
        )
        break;

    case "spotify-this-song":
        //code to search spotify
        var spotify = new Spotify(keys.spotify);
        var query = ansarry.join(" ");
        spotify.search({ type: 'track', query: query }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
          console.log(data); 
          });
        break;

    case "movie-this":
        //code to search OMDB
        var query = ansarry.join("+");
        //if nothing was entered.
        if (query === ""){
            axios.request("http://www.omdbapi.com/?t=mr.nobody&y=&plot=short&apikey=trilogy")
            .then(
                function(response) {
                    console.log( "-------------------------------------------------------------- \n"
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
                }
            )
        }else{ //if there was any entry
            axios.request("http://www.omdbapi.com/?t=" + query + "&y=&plot=short&apikey=trilogy")
            .then(
                function(response) {
                    console.log("-------------------------------------------------------------- \n"
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
                }
                );
            }
        break;

    case "do-what-it-says":
        //code to read random.txt
        break;
}