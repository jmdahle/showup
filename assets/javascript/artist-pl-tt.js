// global variable
var spotifyToken = "";
var artistId = "";
var artistName = "";

var responseSpotify = location.hash; // gets the access token from Spotify


if (responseSpotify.length > 0) { // there is only a "hash" if spotify login returned with an access token
    // parse the returned "hash" to extract the access token only
    var s = responseSpotify.indexOf("#access_token=") + "#access_token".length + 1;
    var e = responseSpotify.indexOf("&");
    spotifyToken = responseSpotify.substring(s, e);
    console.log("token", spotifyToken);
}


// spotify login
$("#spotifyLogin").on("click", function () {
    // opens the spotify login and returns with a token
    var url = "https://accounts.spotify.com/authorize?";
    var clientId = "4e35c64cd250438684608aa0aea8fd7a";
    returnUrl = location.href;
    var scopes = "user-read-private%20user-read-email%20playlist-modify-public";
    var combinedUrl = url + "client_id=" + clientId + "&redirect_uri=" + returnUrl + "&scope=" + scopes + "&response_type=token";
    window.open(combinedUrl, "_self");
})

// TEST - input for an artist name
$("#artist-name").on("change", function(){
    artistName = $("#artist-name").val();
    console.log("artist name", artistName);
    getArtistId();
    console.log(artistName,artistId);
});

// TEST - function for retriving the artist ID
function getArtistId() {
    var searchName = artistName.replace(" ","+");
    $.ajax({
        url: "https://api.spotify.com/v1/search?q="+searchName+"&type=artist",
        headers: {
            "Authorization": "Bearer " + spotifyToken
        },
        success: function (r1) {
            // dynamically add the playlists to the page
            console.log(r1);
            artistId = r1.artists.items[0].id;
            console.log(artistId);
        }
    });

}

// trigger for playlists to be shown
$("#btnPlaylists").on("click", function() {
    $("#btnPlaylists").attr("class","btn btn-success");
    $("#btnTopTracks").attr("class","btn btn-secondary");
    getPlaylist();
});

// playlist search API call
function getPlaylist() {
    // ajax call for playlists featuring this artist
    $.ajax({
        url: "https://api.spotify.com/v1/search?q="+ artistName.replace(" ","+") + "&type=playlist",
        headers: {
            "Authorization": "Bearer " + spotifyToken
        },
        success: function (r2) {
            console.log(r2);
            populatePlaylists(r2);
        }
    });
}

// trigger for top tracks to be shown
$("#btnTopTracks").on("click", function() {
    $("#btnTopTracks").attr("class","btn btn-success");
    $("#btnPlaylists").attr("class","btn btn-secondary");
    getTopTracks();
});

// top tracks for artist API call
function getTopTracks() {
    // ajax call for top tracks using artist ID and access token
    $.ajax({
        url: "https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?country=US",
        headers: {
            "Authorization": "Bearer " + spotifyToken
        },
        success: function (r3) {
            console.log(r3);
            populateTopTracks(r3);
        }
    });
}

// update the links with artist playlists returned from API call
function populatePlaylists(r) {
    $("#artist-spotify-links").empty();
    for (var i = 0; i < r.playlists.items.length; i++) {
        var plName = r.playlists.items[i].name;
        var plUrl = r.playlists.items[i].external_urls.spotify;
        var plId = r.playlists.items[i].id;
        var spotOpt = $("<button>");
        spotOpt.attr("type","button");
        spotOpt.attr("class","btn btn-dark playlistOption");
        spotOpt.attr("url",plUrl);
        spotOpt.attr("playlistId",plId);
        spotOpt.text(plName);
        $("#artist-spotify-links").append(spotOpt);
        $(".playlistOption").on("click",function(){
            trackId = $(this).attr("playlistId");
            trackUrl = $(this).attr("url");
            window.open(trackUrl, "spotifyWindow");
        });
    }
}

// update the links with artist top tracks returned from API call
function populateTopTracks(r) {
    $("#artist-spotify-links").empty();
    for (var i = 0; i < r.tracks.length; i++) {
        var trName = r.tracks[i].name;
        var trUrl = r.tracks[i].external_urls.spotify;
        var trId = r.tracks[i].id;
        var spotOpt = $("<button>");
        spotOpt.attr("type","button");
        spotOpt.attr("class","btn btn-dark trackOption");
        spotOpt.attr("url",trUrl);
        spotOpt.attr("trackId",trId)
        spotOpt.text(trName);
        $("#artist-spotify-links").append(spotOpt);
        $(".trackOption").on("click",function(){
            trackId = $(this).attr("trackId");
            trackUrl = $(this).attr("url");
            window.open(trackUrl, "spotifyWindow");
        });
    }
}