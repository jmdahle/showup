# team3project: showUP: Lollapalooza

## Overview
Music festivals are known for the general atmosphere of chaos, tunes, and shenanigans. But some festival-goers actually want to hear and enjoy the music of their favorite performers.

With a line-up of more than 100 acts, Lollapalooza is a festival that requires planning: to see the performers you’re there to see, and to open your ears to new music being presented. showUP helps the festival-goer do exactly that. Explore, listen, discover in advance. Make the most of your adventure!


## Usage
1. User is prompted to log in (or create a new account) for Spotify.
2. User selects a Lollapalooza performer and is presented with related social media source(s) and Spotiy artist, playlist, and top track infomation.
3. User moves between artist, playlist, and top track information through selecting "tab-like" navigation buttons.
4. Clicking on social media links or Spotify artist, playlist, or track opens selected information in a reusable tab (one tab for social media feeds, the other for playing music via Spotify).


## Technical Notes
1. Basic functionality provided through standard HTML, CSS, and JavaScript.  Additional JavaScript libraries used: Bootstrap, JQuery, and List.js.
2. Connectivity to Spotify is through API calls and links to spotify player pages.  User authentication is required through OAuth support via the Spotify API.
3. Event performers are populated using an API call to Ticketmaster for the Lollapalooza event.
4. Performer information is contained in tags within the table, popualted by List.js.
5. Dynamic search capability is provided through List.js JavaScript library.
6. Page times session and prompts prior to the authentication key expiration.


## Requirements
1. For full functionality, user should have (or create when prompted) a Spotify account.
2. Login functionality requires whitelisting of referring/redirect page on Spotify developer account.



## Release 2
  •  Integrate features to make a more well-rounded festival experience: Google Maps, RTA information, SpotHero, Chicago Eater, other local entertainment and hospitality venues.
  
  • Create an app version
  
  • Create a user profile to refine data delivered and to make suggestions to user based on preferences: music, accomodations, budget, location, etc.
  
## APIs used
TicketMaster API

Spotify API

## Breakdown of project tasks
Jenine Ellis: Project Manager, API Research, JS Developer, Code Reviewer

John Dahle: R & D--API usage; JS Developer; Code Reviewer

Madeleine Kemeny: R & D--UI/UX; Code Reviewer; Presentation Developer

Daniel Fripp: JS Developer, Bootstrap Wrangler, Code Reviewer

Ian Lukidis: JS Developer, Code Reviewer

Charles Monuma: Presentation Developer, Code Reviewer



