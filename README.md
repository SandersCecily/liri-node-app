# liri-node-app


## Description
This application is a command line interface also known as a CLI app. Its simple to use and is able to handle four different use cases. It handles the user input to decide which of the four use cases the person interacting with it is trying to get a feel for. This is all done with node.js. All of the successful output is saved to a text file that can be reviewed at any time.

## How It Works / Demo
Since this is a CLI app the user has four different inputs they could use to control the application. The application runs as a single function made of a switch case statement.

``js
node liri.js concert-this --mandatory user input--  
``

The "concert this" input is used to find where an artists next show is playing. It gives back three pieces of data being the venue, the location, and, the date. This is done with the Bands in Town API called by axios.

``js
node liri.js spotify-this-song --optional user input--
``

"Spotify this song" doesn't necesarrily need input. Should none be entered it searches the Spotify API for the song "The Sign" and gives back all the data that usually comes with addding your own input. Information you will get as an output is the  album name, artist, and, a preview of the song.

``js
node liri.js movie-this --optional user input--
``

Using the command "movie this" is similar to the "spotify this song" but it uses the axios package to call to the OMBD API and make a request. The information it returns is the title, year released, its ratings, the country produced, laguage its in, the plot, and the actors in the movie.

``js
node liri.js do-what-it-says
``

Lastly this command reads the random.txt file in the same directory to get user input as to know which command to follow. Its like a roulette if you didn't look into it or edit it. This file only has one line so it only grabs from that one piece of data as the first and in this case only thing entered.

## Required packages
* .env
* axios
* Spotify API
* Moment
* fs
* Keys.js

## Improvements that could be implemented
In the future I could add the Inquire package to save the user from having the ability to add user error in inputing the name of the commands wrong as well as speeding up the process for them and adding some error catching capabilities. An example of an error I found that is that not all movies in OMBD have a rating on Rotten Tomatoes so there could be an if loop to tell the user it wasnt rated by Rotten Tomatoes. From that point there would be two options, one being find in their array of ratings if it had been rated at all and give them the names of the first item and what that data is or just omit all data generally and skip that information. Another thing that I could add is the use of accented letters. I tried to search for the artist Aminé and to get his information in the concert-this I found I had to type "amine" instead.