'use strict';

// AJAX
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

let saveGame = function (player, index) {
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

let gameCount = function () {
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
// END AJAX

// Start Game Logic

let winner;
let x = '<img src="../images/red.png">';
let o = '<img src="../images/green.png">';
let player = x;
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
    $('.box').text('');
    gameStatus = 'active';
    turnCount = 0;
};

$('.btn-new-game').on('click', function () {
  clearBoard();
  createGame();
  gameCount();
  $('.messages').text('');
});

let score = function() {
  if (winner === x) {
    xWins++;
    $('#p1').text(xWins);
  } else if (winner === o) {
    oWins++;
    $('#p2').text(oWins);
  } else if (winner === 'tie'){
    ties++;
    $('#ties').text(ties);
  }
};

let $BoxId = function(num) {
  return $('#' + num);
};

let checkWinCombo = function(a, b, c) {
  if ($BoxId(a).html() === player && $BoxId(b).html() === player && $BoxId(c).html() === player) {
    return true;
  } else {
    return false;
  }
};

let checkWin = function() {
  if(checkWinCombo(0, 1, 2) ||
    checkWinCombo(3, 4, 5) ||
    checkWinCombo(6, 7, 8) ||
    checkWinCombo(0, 3, 6) ||
    checkWinCombo(1, 4, 7) ||
    checkWinCombo(2, 5, 8) ||
    checkWinCombo(0, 4, 8) ||
    checkWinCombo(2, 4, 6)) {
      winner = player;
      gameStatus = 'inactive';
      if (player === x) {
        $('.messages').text('Congrats! Red wins!');
      } else if (player === o) {
        $('.messages').text('Congrats! Green wins!');
      }
      score();
    } else if (turnCount === 8) {
      winner = 'tie';
      $('.messages').text('It\'s a tie!'); // fix ties
      score();
    } else {
      return false;
    }
};

let move = function() {
  $('.box').on('click', function() {
    if(gameStatus === 'active') {
        if ($(this).html() !== '') {
          $('.messages').text('Select another box!');
        } else if (player === x) {
          // $(this).text('x');
          $(this).empty().append('<img src="../images/red.png">');
          saveGame('red', event.target.id);
        } else {
          // $(this).text('o');
          $(this).empty().append('<img src="../images/green.png">');
          saveGame('green', event.target.id);
        }
        checkWin();
        turnCount++;
        switchPlayer();
    }
  });
};

// $('.board').children().on('click', function () { event.target.id; })

$(document).ready(() => {
  console.log('It works.');
  move();
  $('.board').hide();
  $('.messages').text('Please sign in!');
});
