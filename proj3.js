$(document).ready(function () {

    var spotifyToken = "";

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
        console.log("loging in");
        if (spotifyToken.length = 0) {
            loginSpotify();
        };
    });

    function getArtistInfo() {
        if (spotifyToken.length > 0) {
            $.ajax({
                url: "https://api.spotify.com/v1/search?q=Ariana+Grande&type=artist",
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
                    $("#spot-artist").append(artistImgTag);
                    var artistNameTag = ("<h3>");
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

    // var triggerGetArtist = getArtistInfo();

    $("#displayArtist").on("click", function () {
        getArtistInfo();

    });

});





