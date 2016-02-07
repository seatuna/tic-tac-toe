'use strict';

// AJAX ---------------------------------------------------------------------
const myApp = {
  baseUrl: 'http://tic-tac-toe.wdibos.com'
};

// Create game state
let createGame = function() {

  $.ajax({
    url: myApp.baseUrl + '/games',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    method: 'POST',
    contentType: false,
    processData: false,
    data: {}
  }).done(function(data) {
    myApp.game = data.game;
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

// Save game state

let saveGame = function(player, index) {
  $.ajax({
    url: myApp.baseUrl + '/games/' + myApp.game.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    data: {
      "game": {
        "cell": {
          "index": index,
          "value": player,
        },
        "over": false
      }
    }
  }).done(function(data) {
    myApp.game = data.game;
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
};

// Update total game counter

let gameCount = function() {
  $.ajax({
      url: myApp.baseUrl + '/games',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
      type: 'GET',
    })
    .done(function(data) {
      $('.gameCount').text(data.games.length);
      console.log(data.games.length);
    })
    .fail(function(jqxhr) {
      console.error(jqxhr);
    });
};

// Sign up
$('#sign-up').on('submit', function(e) {
  e.preventDefault();
  var formData = new FormData(e.target);
  $.ajax({
    url: myApp.baseUrl + '/sign-up',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
});

// Sign in
$('#sign-in').on('submit', function(e) {
  e.preventDefault();
  var formData = new FormData(e.target);
  $.ajax({
    url: myApp.baseUrl + '/sign-in',
    method: 'POST',
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    myApp.user = data.user; // adds data to myApp object
    createGame();
    $('.board').show();
    $('.messages').text('');
    $('.gameCount').text(gameCount());
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
});

// Change password
$('#change-password').on('submit', function(e) {
  e.preventDefault();

  if (!myApp.user) {
    console.error('Wrong!');
    return;
  }

  var formData = new FormData(e.target);

  $.ajax({
    url: myApp.baseUrl + '/change-password/' + myApp.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
    contentType: false,
    processData: false,
    data: formData,
  }).done(function(data) {
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
});

// Sign out
$('#sign-out').on('click', function(e) {
  e.preventDefault();

  $.ajax({
    url: myApp.baseUrl + '/sign-out/' + myApp.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + myApp.user.token,
    },
  }).done(function(data) {
    $('.board').hide();
    $('#p1').text('0');
    $('#p2').text('0');
    $('#ties').text('0');
    $('.gameCount').text('0');
    console.log(data);
  }).fail(function(jqxhr) {
    console.error(jqxhr);
  });
});
// END AJAX ----------------------------------------------------------------

// Start Game Logic

let winner;
let x = '<img src="http://img.photobucket.com/albums/v53/chibi_ynm/red_zpsmqrv6gkb.png">'; // Red mushroom
let o = '<img src="http://img.photobucket.com/albums/v53/chibi_ynm/green_zps8csozywv.png">'; // Green 1up mushroom
let player = x; // Game starts with red mushroom going first
let xWins = 0;
let oWins = 0;
let ties = 0;
let gameStatus = 'active'; // clicks are disabled when game is inactive
let turnCount = 0; // used to determine if there is a tie

let switchPlayer = function() {
  if (player === x) {
    player = o;
  } else {
    player = x;
  }
};

let clearBoard = function() {
  $('.box').text(''); // clears mushrooms from board
  gameStatus = 'active';
  turnCount = 0; // resets turn count
};

$('.btn-new-game').on('click', function() {
  clearBoard();
  createGame(); // creates new game in the back end
  gameCount(); // increases player's total game count
  $('.messages').text(''); // clears messages
});

let score = function() { // increments score
  if (winner === x) {
    xWins++;
    $('#p1').text(xWins);
  } else if (winner === o) {
    oWins++;
    $('#p2').text(oWins);
  } else if (winner === 'tie') {
    ties++;
    $('#ties').text(ties);
  }
};

let $BoxId = function(num) { // converts ID of box to jQuery, instead of typing $('#1') etc individually
  return $('#' + num);
};

let checkWinCombo = function(a, b, c) { // checks if html contents of 3 boxes are the same as current player
  if ($BoxId(a).html() === player && $BoxId(b).html() === player && $BoxId(c).html() === player) {
    return true;
  } else {
    return false;
  }
};

let checkWin = function() {
  if (checkWinCombo(0, 1, 2) ||
    checkWinCombo(3, 4, 5) ||
    checkWinCombo(6, 7, 8) ||
    checkWinCombo(0, 3, 6) ||
    checkWinCombo(1, 4, 7) ||
    checkWinCombo(2, 5, 8) ||
    checkWinCombo(0, 4, 8) ||
    checkWinCombo(2, 4, 6)) {
    winner = player;
    gameStatus = 'inactive'; // disables click after winner is determined
    if (player === x) {
      $('.messages').text('Congrats! Red wins!');
    } else if (player === o) {
      $('.messages').text('Congrats! Green wins!');
    }
    score();
  } else if (turnCount === 8) { // assigns a tie if 8 turns have passed and there is no winner
    winner = 'tie';
    $('.messages').text('It\'s a tie!');
    score();
  } else {
    return false; // allows game to continue if no winner is determined
  }
};

let move = function() {
  $('.box').on('click', function() {
    if (gameStatus === 'active') {
      if ($(this).html() !== '') { // if clicked box is occupied, display message
        $('.messages').text('Select another box!');
        return false; // skips switchPlayer() so the next click won't be the same colored mushroom
      } else if (player === x) {
        $(this).empty().append('<img src="../images/red.png">'); // adds image to click box
        // saveGame('red', event.target.id); // event.target.id somehow is disrupting play when not logged in
      } else {
        $(this).empty().append('<img src="../images/green.png">');
        // saveGame('green', event.target.id);
      }
      checkWin();
      turnCount++;
      saveGame(player, event.target.id); // interfering with switchPlayer() when not logged in, should fix in future
      switchPlayer();
    }
  });
};

$(document).ready(() => {
  console.log('It works.');
  move();
  $('.board').hide();
  $('.messages').text('Please sign in!');
});
