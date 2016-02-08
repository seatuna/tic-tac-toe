# Documentation

## The Game

[Tic Tac Toe](http://seatuna.github.io/tic-tac-toe/index.html)

## How Game Works
This game of tic tac toe was created using HTML, CSS / SASS, javascript, jQuery,
Bootstrap, and AJAX. HTML and SASS were used for styling and formatting
of the page.  The game logic uses javascript and jQuery, allowing to people at
a shared screen to play.

## User Stories

* When user clicks on an empty box, the box will populate with X or O.
* If the square is already populated, user will be alerted to choose another box.
* When a win occurs, players will be alerted who the winner is. "Winner is X"
 or "Winner is O".
* When user clicks "Account" button, user can register, log in, change
password, or logout.
* User can view scores for each player, how many ties, and total game count

## Wireframe

[Click here](http://img.photobucket.com/albums/v53/chibi_ynm/wireframe_zpsvhjikgob.jpg) to view the wireframe.

## Creation Process

To create this game, I started creating user stories and drawing a basic
wireframe to guide my styling.  I proceeded to code the HTML and CSS for a
basic layout.  A majority of the time was spent on game logic using javascript,
and jQuery.  Once that was completed, AJAX was used to create authentication
with register, sign in, change password forms, and a sign out button.

## Unsolved Problems
* Game logic breaks when not signed in, does not switch player.
* Temporary fix: Disable game play while logged out
* The scoreboard moves the first time scores are entered for each category
