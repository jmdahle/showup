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

$("#btnPlaylists").on("click", function() {
    getPlaylist();
});

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

$("#btnTopTracks").on("click", function() {
    getTopTracks();
});

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

$("#artist-name").on("change", function(){
    artistName = $("#artist-name").val();
    console.log("artist name", artistName);
    getArtistId();
    console.log(artistName,artistId);
});

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

function populatePlaylists(r) {
    $("#artist-toptracks").hide();
    $("#artist-playlists").show();
    $("#artist-playlists").empty();
    for (var i = 0; i < r.playlists.items.length; i++) {
        var plName = r.playlists.items[i].name;
        var plUrl = r.playlists.items[i].external_urls.spotify;
        var spotdiv = $("<div>");
        var spotlink = $("<a>");
        spotlink.attr("href", plUrl);
        spotlink.text(plName);
        spotlink.attr("target","_blank");
        spotdiv.append(spotlink);
        $("#artist-playlists").append(spotdiv);
    }
}

function populateTopTracks(r) {
    $("#artist-playlists").hide();
    $("#artist-toptracks").show();
    $("#artist-toptracks").empty();
    for (var i = 0; i < r.tracks.length; i++) {
        var trName = r.tracks[i].name;
        var trUrl = r.tracks[i].external_urls.spotify;
        var spotdiv = $("<div>");
        var spotlink = $("<a>");
        spotlink.attr("href", trUrl);
        spotlink.text(trName);
        spotlink.attr("target","_blank");
        spotdiv.append(spotlink);
        $("#artist-toptracks").append(spotdiv);
    }
}