// Ticketmaster API
// use to retrieve event information
var tmApiKey = "8F1kGz3ndgSx2auYBTZt2UCp5S3v8b5G";
var tmEventId = "vv178Z4JGkS6JSZS"
var tmApiUrl = "https://app.ticketmaster.com/discovery/v2/events/" + tmEventId + ".json?apikey=" + tmApiKey;
var tmResponse =
    // this is the API call to get all "attractions" at Lollapalooza, Chicago
    $.ajax({
        type: "GET",
        url: tmApiUrl,
        method: "GET"
    }).then(function (response) {
        console.log("Response: ", response);
        // Parse the response.
        tmResponse = response._embedded.attractions;

        // Do other things.
        // create an artist array for use in listjs
        var artistArray = [];
        for (j = 0; j < tmResponse.length; j++) {
            var artist_name = tmResponse[j].name;
            // comment out jquery population of table
            // var artistTr = $("<tr>");
            // var artistTd = $("<td>");
            // artistTd.text(j + ". " + artist_name);
            // artistTr.append(artistTd);
            // $("#artist-name-list").append(artistTr);

            // put the artists into an array
            // this array will be used by listjs
            artistArray.push({
                name: artist_name,
                id: artist_name
            });
        }
        console.log(artistArray);
        // listjs javascript library
        var options = {
            valueNames: [
                'name',
                { data: ['id'] }
            ],
            item: '<tr data-id class="artistSelector"><td class="name"></td></tr>'
        };
        var artistList = new List('artist-name-list', options, artistArray);
        // initiate search box
        $('#searchbox').on('keyup', function () {
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
    }

    );