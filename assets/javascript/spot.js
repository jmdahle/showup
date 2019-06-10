// Spotify API
// use to retrieve song information

$("#spotifyLogin").on("click", function() {
    // redirect to log in
    var url = "https://accounts.spotify.com/authorize?";
    var clientId = "4e35c64cd250438684608aa0aea8fd7a";
    var returnUrl = "https://jmdahle.github.io/testSpotify.html";
    var scopes = "user-read-private&user-read-email&playlist-modify-public";
    var combinedUrl = url + "client_id=" + clientId + "&redirect_uri=" + returnUrl + "&scope=" + scopes + "&response_type=token";
    console.log(combinedUrl);
})
