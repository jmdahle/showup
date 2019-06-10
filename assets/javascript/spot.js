// Spotify API
// use to retrieve song information

//global variables
var spotifyToken = ""; // access_token received after authentication
var artistName = ""; // populated by API call 
var artistId = ""; // populated by initial API search, used to get top tracks
var artistImg = ""; // populated by initial API search, url used in artist IMG tag
var artistUrl = ""; // populated by initial API search, url used to open a spotify page with the artist



$("#spotifyLogin").on("click", function () {
    // opens the spotify login and returns with a token
    var url = "https://accounts.spotify.com/authorize?";
    var clientId = "4e35c64cd250438684608aa0aea8fd7a";
    var returnUrl = "https://jmdahle.github.io/testSpotify.html";
    returnUrl = location.href;
    var scopes = "user-read-private%20user-read-email%20playlist-modify-public";
    var combinedUrl = url + "client_id=" + clientId + "&redirect_uri=" + returnUrl + "&scope=" + scopes + "&response_type=token";
    window.open(combinedUrl, "_self");
})

var responseSpotify = location.hash; // gets the access token from Spotify
if (responseSpotify.length > 0) { // there is only a "hash" if spotify login returned with an access token
    // parse the returned "hash" to extract the access token only
    var s = responseSpotify.indexOf("#access_token=") + "#access_token".length + 1;
    var e = responseSpotify.indexOf("&");
    spotifyToken = responseSpotify.substring(s, e);
    console.log("token", spotifyToken);
    // use the token to get playlists for an artist
    $.ajax({
        url: "https://api.spotify.com/v1/search?q=Ariana+Grande&type=artist",
        headers: {
            "Authorization": "Bearer " + spotifyToken
        },
        success: function (r1) {
            // dynamically add the playlists to the page
            console.log(r1);
            artistName = r1.artists.items[0].name;
            artistId = r1.artists.items[0].id;
            console.log(artistId);
            artistImg = r1.artists.items[0].images[0].url;
            artistUrl = r1.artists.items[0].external_urls.spotify;
            var newDiv = $("<div>");
            var newImg = $("<img>");
            var newP = $("<p>");
            var newBtnPlaylist = $("<button>");
            newBtnPlaylist.text("Get Playlist");
            newBtnPlaylist.attr("id","btnGetPlaylist");
            newBtnPlaylist.attr("onclick","getPlaylist()");
            var newBtnTopTracks = $("<button>");
            newBtnTopTracks.text("Get Top Tracks");
            newBtnTopTracks.attr("id","btnGetTopTracks");
            newBtnTopTracks.attr("onclick","getTopTracks()")
            newImg.attr("src", artistImg);
            newImg.attr("alt", "ArtistImage");
            newImg.attr("class", "artist");
            newImg.attr("style","width: 200px");
            newImg.attr("data-external-link", artistUrl);
            newP.text(artistName);
            newDiv.append(newImg);
            newDiv.append(newP);
            newDiv.append(newBtnPlaylist);
            newDiv.append(newBtnTopTracks);
            $("#artistInfo").append(newDiv);
            // if any artist is clicked, open it in a new page
            $(".artist").on("click", function () {
                var url = $(this).attr("data-external-link");
                window.open(url, "_blank");
            });
        }
    });

}
function getPlaylist() {
    alert ("clicked playlist - check out the console");
    // ajax call for playlists featuring this artist
    $.ajax({
        url: "https://api.spotify.com/v1/search?q=Ariana+Grande&type=playlist",
        headers: {
            "Authorization": "Bearer " + spotifyToken
        },
        success: function (r2) {
            console.log(r2);
        }
    });
}

function getTopTracks() {
    alert ("clicked top tracks - check out the console")
    // ajax call for top tracks using artist ID and access token
    $.ajax({
        url: "https://api.spotify.com/v1/artists/" + artistId + "/top-tracks?country=US",
        headers: {
            "Authorization": "Bearer " + spotifyToken
        },
        success: function (r3) {
            console.log(r3);

        }
    });
}

