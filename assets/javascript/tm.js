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
        for (j = 0; j < tmResponse.length; j++) {
            var artist_name = tmResponse[j].name;
            var artistTr = $("<tr>");
            var artistTd = $("<td>");
            artistTd.text(j + ". " + artist_name);
            artistTr.append(artistTd);
            $("#artist-name-list").append(artistTr);
        }
    }, function (e) {
        // This time, we do not end up here!
        console.log("Error encountered", e);
    }

    );

// artistObject(artistName)