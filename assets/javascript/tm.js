// Ticketmaster API
// use to retrieve event information
var tmApiKey = "8F1kGz3ndgSx2auYBTZt2UCp5S3v8b5G";
var tmEventId = "vv178Z4JGkS6JSZS"
var tmApiUrl = "https://app.ticketmaster.com/discovery/v2/events/" + tmEventId + ".json?apikey=" + tmApiKey;
var tmResponse = [];

// this is the API call to get all "attractions" at Lollapalooza, Chicago
$.ajax({
    type: "GET",
    url: tmApiUrl,
    method: "GET"
}).then(function (response) {
    // Parse the response.
    tmResponse = response._embedded.attractions;
    
    // create an artist array for use in listjs
    var artistArray = [];
    for (j = 0; j < tmResponse.length; j++) {
        // capture attraction/artists' name
        var artist_name = tmResponse[j].name;
       // capture attractopm/artists' social media links
        var artistSocial = tmResponse[j].externalLinks;
        if (artistSocial == undefined) {
            artistSocial = "{social: 'none'}";
        }
        // put the artists into an array
        // this array will be used by listjs
        if (artist_name !== "Lollapalooza") {
            artistArray.push({
                name: artist_name,
                id: artist_name,
               // we think this needed to be added via stringify because of how the data was being processed from the tm API
                art: JSON.stringify(artistSocial)
            });
        };
    }
    // console.log("Show" + artistArray);
    // listjs javascript library
    var options = {
        valueNames: [
            'name',
            { data: ['id'] },
            { data: ['art'] }
        ],
        item: '<tr data-id data-art class="artistSelector"><td class="name"></td></tr>'
    };
    var artistList = new List('artist-name-list', options, artistArray);
    // initiate search box
    $('#searchbox').on('keyup', function () {
        var searchString = $(this).val();
        artistList.search(searchString,['name']);
    });
    //handler for clear search box button
    $("#clearBtn").on("click", function() {
        event.preventDefault();
        $("#searchbox").val("");
        artistList.search("");
    });
    // handler for buttons
    $(".artistSelector").on("click", function () {
        var clickedName = $(this).attr("data-id");
        // adding a second arg for data art to pass to the function update spot.js to handle data-art
        var artistSocial = $(this).attr("data-art");
        getArtistInfo(clickedName, artistSocial);
    });
}, function (e) {
}
);

