
var spotifyToken = "";
var artistId = "";
var artistName = "";
var artistImg = "";
var artistUrl = "";

var responseSpotify = location.hash; // gets the access token from Spotify
if (responseSpotify.length > 0) { // there is only a "hash" if spotify login returned with an access token
    // parse the returned "hash" to extract the access token only
    var s = responseSpotify.indexOf("#access_token=") + "#access_token".length + 1;
    var e = responseSpotify.indexOf("&");
    spotifyToken = responseSpotify.substring(s, e);
    console.log("token", spotifyToken);
};

function loginSpotify() {
    // opens the spotify login and returns with a token
    var url = "https://accounts.spotify.com/authorize?";
    var clientId = "4e35c64cd250438684608aa0aea8fd7a";
    returnUrl = location.href;
    var scopes = "user-read-private%20user-read-email%20playlist-modify-public";
    var combinedUrl = url + "client_id=" + clientId + "&redirect_uri=" + returnUrl + "&scope=" + scopes + "&response_type=token";
    window.open(combinedUrl, "_self");
};

// console.log(loginSpotify());

$("#spotify-button").on("click", function () {
    console.log("logging in");
    if (spotifyToken.length === 0) {
        loginSpotify();
    };
});

function getArtistInfo(a) {
    if (spotifyToken.length > 0) {
        a = a.replace(" ", "+");
        $.ajax({
            url: "https://api.spotify.com/v1/search?q=" + a + "&type=artist",
            headers: {
                "Authorization": "Bearer " + spotifyToken
            },
            success: function (r1) {
                $("#spot-artist").empty();
                console.log(r1);
                artistName = r1.artists.items[0].name;
                artistId = r1.artists.items[0].id;
                console.log(artistId);
                artistImg = r1.artists.items[0].images[0].url;
                artistUrl = r1.artists.items[0].external_urls.spotify;
                var artistImgTag = $("<img>");
                artistImgTag.attr("src", artistImg);
                artistImgTag.attr("class", "artist-image");
                artistImgTag.attr("id", "img-resize");
                $("#spot-artist").append(artistImgTag);
                var artistNameTag = $("<h3>");
                artistNameTag.text(artistName);
                artistNameTag.attr("class", "artist-image");
                $("#spot-artist").append(artistName);
                $(".artist-image").on("click", function () {
                    window.open(artistUrl, "spotifyWindow");
                });
            }
        })

    }
}

function getPlaylist() {
    // ajax call for playlists featuring this artist
    $.ajax({
        url: "https://api.spotify.com/v1/search?q=" + artistName + "&type=playlist",
        headers: {
            "Authorization": "Bearer " + spotifyToken
        },
        success: function (r2) {
            console.log(r2);
            populatePlaylists(r2);
        }
    });
}

// update the links with artist playlists returned from API call
function populatePlaylists(r) {
    $("#artist-playlist").empty();
    for (var i = 0; i < r.playlists.items.length; i++) {
        var plName = r.playlists.items[i].name;
        var plUrl = r.playlists.items[i].external_urls.spotify;
        var plId = r.playlists.items[i].id;
        var spotOpt = $("<tr>");
        spotOpt.attr("class","playlistOption");
        spotOpt.attr("url",plUrl);
        spotOpt.attr("playlistId",plId);
        var spotTd = $("<td>");
        spotTd.text(plName);
        // <tr data-id class="artistSelector"><td class="name"></td></tr>
        // spotOpt.attr("type","button");
        // spotOpt.attr("class","btn btn-dark playlistOption");
        // spotOpt.attr("url",plUrl);
        // spotOpt.attr("playlistId",plId);
        // spotOpt.text(plName);
        spotOpt.append(spotTd);
        $("#artist-playlist").append(spotOpt);
        $(".playlistOption").on("click",function(){
            trackId = $(this).attr("playlistId");
            trackUrl = $(this).attr("url");
            window.open(trackUrl, "spotifyWindow");
        });
    }
}

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

function populateTopTracks(r) {
    $("#artist-toptracks").empty();
    for (var i = 0; i < r.tracks.length; i++) {
        var trName = r.tracks[i].name;
        var trUrl = r.tracks[i].external_urls.spotify;
        var trId = r.tracks[i].id;
        // var spotOpt = $("<button>");
        var spotOpt = $("<tr>");
        spotOpt.attr("class","trackOption");
        spotOpt.attr("url",trUrl);
        spotOpt.attr("playlistId",trId);
        var spotTd = $("<td>");
        spotTd.text(trName);

        // spotOpt.attr("type","button");
        // spotOpt.attr("class","btn btn-dark trackOption");
        // spotOpt.attr("url",trUrl);
        // spotOpt.attr("trackId",trId)
        // spotOpt.text(trName);
        spotOpt.append(spotTd);
        $("#artist-toptracks").append(spotOpt);
        $(".trackOption").on("click",function(){
            trackId = $(this).attr("trackId");
            trackUrl = $(this).attr("url");
            window.open(trackUrl, "spotifyWindow");
        });
    }
}

// $("#displayArtist").on("click", function () {
//     getArtistInfo();

// });
$("#spotify-toptracks").on("click", function(){
    getTopTracks();
});

$("#spotify-playlist").on("click", function() {
    getPlaylist();
});







