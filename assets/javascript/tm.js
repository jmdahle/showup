// Ticketmaster API
// use to retrieve event information
var tmApiKey = "8F1kGz3ndgSx2auYBTZt2UCp5S3v8b5G";
var tmEventId = "vv178Z4JGkS6JSZS"
var tmApiUrl = "https://app.ticketmaster.com/discovery/v2/events/" + tmEventId + ".json?apikey=" + tmApiKey;

$.ajax({
    type:"GET",
    url: tmApiUrl,
    method: "GET"
}).then ( function(r) {
        console.log(r);
        // Parse the response.

        // Do other things.
        for (j = 0; j < r._embedded.attractions.length; j++) {
            var artist_name = r._embedded.attractions[j].name;
            var artistDiv = $("<div>");
            artistDiv.text(j + ". " + artist_name);
            $("#event-search").append(artistDiv);
            }
    }, function(e) {
        // This time, we do not end up here!
        console.log("Error encountered",e);
    }
);
