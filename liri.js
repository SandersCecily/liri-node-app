require("dotenv").config();
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

switch (process.argv[2]){
    case "concert-this":
        //code to look through bands in town
        break;
    case "spotify-this-song":
        //code to search spotify
        break;
    case "movie-this":
        //code to search OMDB
        break;
    case "do-what-it-says":
        //code to read random.txt
        break;
    default:
        //code if input is incorrect
        console.log("The input you entered did not match any of our commands. Try again.");
        break;
}