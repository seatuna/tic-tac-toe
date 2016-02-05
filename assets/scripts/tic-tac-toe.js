'use strict';

// AJAX
const myApp = {
  baseUrl: 'http://tic-tac-toe.wdibos.com'
};

  // Create game state
let createGame = function() {

    $.ajax({
      url: myApp.baseUrl + '/games',
      // url: 'http://httpbin.org/post',
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
console.log('attempting save game');
  $.ajax({
    url: myApp.baseUrl + '/games/' + myApp.game.id,
    // url: 'http://httpbin.org/post',
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

// view history
// let viewHistory = function () {
//     $.ajax({
//       url: myApp.baseUrl + '/games',
//       // url: 'http://httpbin.org/post',
//       headers: {
//         Authorization: 'Token token=' + myApp.user.token,
//       },
//       method: 'GET',
//       contentType: false,
//       processData: false,
//     }).done(function(data) {
//       myApp.game = data.game;
//       // $('')JSON.stringify(data);
//       $('.viewHistory').text(JSON.stringify(data));
//       console.log(data);
//     }).fail(function(jqxhr) {
//       console.error(jqxhr);
//     });
// };

  // Sign up
  $('#sign-up').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(e.target);
    $.ajax({
      url: myApp.baseUrl + '/sign-up',
      // url: 'http://httpbin.org/post',
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
      // url: 'http://httpbin.org/post',
      method: 'POST',
      contentType: false,
      processData: false,
      data: formData,
    }).done(function(data) {
      myApp.user = data.user; // adds data to myApp object
      createGame();
      $('.board').show();
      $('.messages').text('');
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
      // url: 'http://httpbin.org/post',
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

    if (!myApp.user) {
      console.error('Wrong!');
      return;
    }

    $.ajax({
      url: myApp.baseUrl + '/sign-out/' + myApp.user.id,
      // url: 'http://httpbin.org/post',
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + myApp.user.token,
      },
    }).done(function(data) {
      console.log(data);
    }).fail(function(jqxhr) {
      console.error(jqxhr);
    });
  });
// AJAX

let winner;
let player = 'x';
let xWins = 0;
let oWins = 0;
let ties = 0;
let gameStatus = 'active';

let switchPlayer = function() {
  if (player === 'x') {
    player = 'o';
  } else {
    player = 'x';
  }
};

let clearBoard = function() {
    $('.box').text('');
    gameStatus = 'active';
};

$('.btn-new-game').on('click', function () {
  clearBoard();
  createGame();
});

let score = function() {
  if (winner === 'x') {
    xWins++;
    $('#p1').text(xWins);
  } else if (winner === 'o') {
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
  if ($BoxId(a).text() === player && $BoxId(b).text() === player && $BoxId(c).text() === player) {
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
      $('.messages').text('Congrats! ' + player + ' wins!');
      score();
      // viewHistory();
    } else if ($('.box').text().length === 9){
      winner = 'tie';
      $('.messages').text('It\'s a tie!');
      score();
      // viewHistory();
    } else {
      return false;
    }
};

let move = function() {
  $('.box').on('click', function() {
    if(gameStatus === 'active') {
        if ($(this).text() !== '') {
          $('.messages').text('Select another box!');
        } else if (player === 'x') {
          $(this).text('x');
          saveGame('x', event.target.id);
        } else {
          $(this).text('o');
          saveGame('o', event.target.id);
        }
        checkWin();
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
