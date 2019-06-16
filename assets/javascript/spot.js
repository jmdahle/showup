// global variables
var spotifyToken = "";
var artistId = "";
var artistName = "";
var artistImg = "";
var artistUrl = "";
var spotifyActive = false;
var userName = "";

// retrieve token returned from Spotify
var responseSpotify = location.hash; // gets the access token from Spotify
if (responseSpotify.length > 0) { 
    // there is only a "hash" if spotify login returned with an access token
    // parse the returned "hash" to extract the access token only
    var s = responseSpotify.indexOf("#access_token=") + "#access_token".length + 1;
    var e = responseSpotify.indexOf("&");
    spotifyToken = responseSpotify.substring(s, e);
    spotifyActive = true;
    console.log("token", spotifyToken);
    // get the user name
    getUserName();
    // set a time for 1 hour (less 10 sec) - token will expire at that time
    setTimeout(logBackIn,3590000); // using 10 seconds as a test
} else {
    spotifyActive = false;
    $("#username").text("You are not logged in to Spotify");
};

// open the login modal if not logged in
if (!spotifyActive) {
    $("#login-message").text("Log in to Spotify to enjoy the full tasty goodness of ShowUp!");
    $("#spotifyLoginModal").modal("show");
}

// respond to Spotify button click
$("#spotify-button").on("click", function () {
    // console.log("logging in");
    if (!spotifyActive) {
        loginSpotify();
    };
});

$("#btn-login-spotify").on("click", function() {
    if (!spotifyActive) {
        loginSpotify();
    }
});

function logBackIn() {
    $("#login-message").text("Your session is about to expire.  Log back in to Spotify to enjoy the full tasty goodness of ShowUp!");
    $("#spotifyLoginModal").modal("show");
    spotifyToken = ""
    spotifyActive = false;
}

/**
 * function to log in to Spotify
 */
function loginSpotify() {
    // opens the spotify login and returns with a token
    var url = "https://accounts.spotify.com/authorize?";
    var clientId = "4e35c64cd250438684608aa0aea8fd7a";
    if (location.href.indexOf("#") > 0) {
        var returnUrl = location.href.substring(0,location.href.indexOf("#"));
    } else {
        var returnUrl = location.href;
    }
    var scopes = "user-read-private%20user-read-email%20playlist-modify-public";
    var combinedUrl = url + "client_id=" + clientId + "&redirect_uri=" + returnUrl + "&scope=" + scopes + "&response_type=token";
   window.open(combinedUrl, "_self");
};

/**
 * function gets artist info from spotify and populates the artist tab
 * 
 * @param {string} a // artist name used in search
 */
function getArtistInfo(a) {
    if (spotifyActive) {
        // change to artist tab (replicate Bootstrap functionality)
        $("#artist-button").attr("class","nav-link active show");
        $("#spotify-playlist").attr("class","nav-link");
        $("#spotify-toptracks").attr("class","nav-link");
        $("#home").attr("class","tab-pane active show");
        $("#menu1").attr("class","container tab-pane fade");
        $("#menu2").attr("class","container tab-pane fade");
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
                // add artist image and name to page
                var artRow = $("<div>");
                artRow.attr("class","row");
                var artCol0 = $("<div>");
                artCol0.attr("class","col-md-4");
                var artCol1 = $("<div>");
                artCol1.attr("class", "col-md-8");
                var artistImgTag = $("<img>");
                artistImgTag.attr("src", artistImg);
                artistImgTag.attr("class", "artist-image");
                artistImgTag.attr("id", "img-resize");
                $("#spot-artist").append(artistImgTag);
                var artistNameTag = $("<h3>");
                artistNameTag.text(artistName);
                artistNameTag.attr("class", "artist-image");
                artCol0.append(artistImgTag);
                artCol1.append(artistNameTag);
                artRow.append(artCol0);
                artRow.append(artCol1);
                $("#spot-artist").append(artRow);
                $(".artist-image").on("click", function () {
                    window.open(artistUrl, "spotifyWindow");
                });
            }
        })

    }
}

function getUserName() {
    if (spotifyActive) {
    // ajax call for user profile
    $.ajax({
        url: "https://api.spotify.com/v1/me",
        headers: {
            "Authorization": "Bearer " + spotifyToken
        },
        success: function (userprofile) {
            console.log(userprofile);
            userName = userprofile.display_name;
            $("#username").text("You are logged in as " + userName);
        }
    });
    }

}
/**
 * function retrieves playlists for the atrist from Spotify
 */
function getPlaylist() {
    if (spotifyActive) {
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
}

/**
 * function populates the playlist panel
 * 
 * @param {object} r // response object from playlist search
 */
function populatePlaylists(r) {
    $("#artist-playlist").empty();
    $("#plhead").html("<h3>Playlists<br>" + artistName + "</h3>"); 
    for (var i = 0; i < r.playlists.items.length; i++) {
        var plName = r.playlists.items[i].name;
        var plUrl = r.playlists.items[i].external_urls.spotify;
        var plId = r.playlists.items[i].id;
        var spotOpt = $("<tr>");
        spotOpt.attr("class", "playlistOption");
        spotOpt.attr("url", plUrl);
        spotOpt.attr("playlistId", plId);
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
        $(".playlistOption").on("click", function () {
            trackId = $(this).attr("playlistId");
            trackUrl = $(this).attr("url");
            window.open(trackUrl, "spotifyWindow");
        });
    }
}
/**
 * function retrieves top tracks from spotify
 */
function getTopTracks() {
    if (spotifyActive) {
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
}

/**
 * function populates top tracks panel with tracks
 * 
 * @param {object} r // object with top tracks retrieved from Spotify
 */
function populateTopTracks(r) {
    $("#artist-toptracks").empty();
    $("#tthead").html("<h3>Top Tracks<br>" + artistName + "</h3>"); 
    for (var i = 0; i < r.tracks.length; i++) {
        var trName = r.tracks[i].name;
        var trUrl = r.tracks[i].external_urls.spotify;
        var trId = r.tracks[i].id;
        // var spotOpt = $("<button>");
        var spotOpt = $("<tr>");
        spotOpt.attr("class", "trackOption");
        spotOpt.attr("url", trUrl);
        spotOpt.attr("playlistId", trId);
        var spotTd = $("<td>");
        spotTd.text(trName);

        // spotOpt.attr("type","button");
        // spotOpt.attr("class","btn btn-dark trackOption");
        // spotOpt.attr("url",trUrl);
        // spotOpt.attr("trackId",trId)
        // spotOpt.text(trName);
        spotOpt.append(spotTd);
        $("#artist-toptracks").append(spotOpt);
        $(".trackOption").on("click", function () {
            trackId = $(this).attr("trackId");
            trackUrl = $(this).attr("url");
            window.open(trackUrl, "spotifyWindow");
        });
    }
}

// respond to click on top tracks navitem
$("#spotify-toptracks").on("click", function () {
    getTopTracks();
});

//respond to click on playlist navitem
$("#spotify-playlist").on("click", function () {
    getPlaylist();
});







