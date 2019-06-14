// Ticketmaster API
// use to retrieve event information

var tmApiKey = "8F1kGz3ndgSx2auYBTZt2UCp5S3v8b5G";
var tmApiUrl = "https://app.ticketmaster.com/discovery/v2/";
var tmVenueId = "ZFr9jZ7176";
var artistArray = [];


$.ajax({
    type: "GET",
    url: tmApiUrl + "events.json?size=10&apikey=" + tmApiKey + "&keyword=Lollapalooza&venueId=" + tmVenueId,
    method: "GET"
}).then(function (r) {
    console.log(r);
    // Parse the response.
    // console.log(r._embedded.events[1]._embedded.attractions); // this is the array of all attractions
    // Do other things.
    var counter = 1
    var useIndex = 1

    for (j = 0; j < r._embedded.events[useIndex]._embedded.attractions.length; j++) {
        var artist_name = r._embedded.events[useIndex]._embedded.attractions[j].name;
        // console.log(counter, "artist", artist_name);

        // THIS WAS DYNAMIC CRTEATION USING JQUERY
        /*
        var artistDiv = $("<button>");
        artistDiv.attr("class","name btn btn-secondary");
        artistDiv.text(artist_name);
        $("#artist-list").append(artistDiv);
        */

        // put the artists into an array
        // this array will be used by listjs
        artistArray.push({
            name: artist_name,
            id: artist_name
        });
        counter++;
    }

    // listjs javascript library
    var options = {
        valueNames: [
            'name', 
            {data: ['id']}
        ],
        item: '<button data-id type="button" class="btn btn-secondary artistSelector"><span class="name"></button>'
    };
    var artistList = new List('artist-list', options, artistArray);
    // initiate search box
    $('#artist-search').on('keyup', function() {
        var searchString = $(this).val();
        artistList.search(searchString);
      });
    // handler for buttons
    $(".artistSelector").on("click", function () {
        var clickedName = $(this).attr("data-id");
        console.log("name:", clickedName);
    });

}, function (e) {
    // This time, we do not end up here!
    console.log("Error encountered", e);
});
