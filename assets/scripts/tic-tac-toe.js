'use strict';

let winner;
let player = 'x';
let xWins = 0;
let oWins = 0;
let ties = 0;
// let score = { x: 0, y: 0, ties: 0}

/* let board = [ [$(".box.one"), $(".box.two"), $(".box.three")],
              [$(".box.four"), $(".box.five"), $(".box.six")],
              [$(".box.seven"), $(".box.eight"), $(".box.nine")] ]; */

// starts game, click boxes to set x or o. Turn count will increase after one click
// and change the player.  This should keep going until someone wins.

// let rowWin = function () {
//   if($('#1').text() + $('#2').text() + $('#3').text() === 'xxx' || 'ooo') {
//     return true;
//   } else if ($('#4').text() + $('#5').text() + $('#6').text() === 'xxx' || 'ooo') {
//     return true;
//   } else if ($('#7').text() + $('#8').text() + $('#9').text() === 'xxx' || 'ooo') {
//     return true;
//   } else {
//     return false;
//   }
// };
//
// let colWin = function () {
//   if($('#1').text() + $('#4').text() + $('#7').text() === 'xxx' || 'ooo') {
//     return true;
//   } else if ($('#2').text() + $('#5').text() + $('#8').text() === 'xxx' || 'ooo') {
//     return true;
//   } else if ($('#3').text() + $('#6').text() + $('#9').text() === 'xxx' || 'ooo') {
//     return true;
//   } else {
//     return false;
//   }
// };
//
// let diagWin = function () {
//   if($('#1').text() + $('#5').text() + $('#9').text() === 'xxx' || 'ooo') {
//     return true;
//   } else if ($('#3').text() + $('#5').text() + $('#7').text() === 'xxx' || 'ooo') {
//     return true;
//   } else {
//     return false;
//   }
// };
//
// let checkWin = function () { // something here does not work
//   if(rowWin() || colWin() || diagWin()) {
//     winner = player;
//     $('.messages').text('Winner is ' + winner + ' !');
//   } else if (turnCount === 9) {
//     ties++;
//   }
// };

let score = function() {
  if (winner === 'x') {
    xWins++;
  } else if (winner === 'o') {
    oWins++;
  } else {
    ties++;
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
  if(checkWinCombo(1, 2, 3) ||
    checkWinCombo(4, 5, 6) ||
    checkWinCombo(7, 8, 9) ||
    checkWinCombo(1, 4, 7) ||
    checkWinCombo(2, 5, 8) ||
    checkWinCombo(3, 6, 9) ||
    checkWinCombo(1, 5, 9) ||
    checkWinCombo(3, 5, 7)) {
      winner = player;
      $('.box').unbind("click");
      $('.messages').text('Congrats! ' + player + ' wins!');
      score();
    } else {
      return false;
    }
};

let switchPlayer = function() {
  if (player === 'x') {
    player = 'o';
  } else {
    player = 'x';
  }
};

let move = function() {
  $('.box').on('click', function() {
      if ($(this).text() !== '') {
        $('.messages').text('Select another box!');
      } else if (player === 'x') {
        $(this).text('x');
        $(this).last().addClass('disable');
      } else {
        $(this).text('o');
        $(this).last().addClass('disable');
      }
      checkWin();
      switchPlayer();
  });
};

// const wins = [[1, 2, 3], [4, 5, 6], [7, 8, 9],
//               [1, 4, 7], [2, 5, 8], [3, 6, 9],
//               [1, 5, 9], [3, 5, 7]];
//
// let checkWin = function (a, b, c) {
//
// }

// win conditions.  If row or column or diagonal === x or o, then winner = player.
// let victory = function () {
//   if ($('#one').text() + $('#two').text() + $('#three').text() ||
//       $('#four').text() + $('#five').text() + $('#six').text() ||
//       $('#seven').text() + $('#eight').text() + $('#nine').text() ||
//       $('#one').text() + $('#four').text() + $('#seven').text() ||
//       $('#two').text() + $('#five').text() + $('#eight').text() ||
//       $('#three').text() + $('#six').text() + $('#nine').text() ||
//       $('#one').text() + $('#five').text() + $('#nine').text() ||
//       $('#three').text() + $('#five').text() + $('#seven').text() === 'xxx') {
//         winner = 'x';
//       } else if ($('#one').text() + $('#two').text() + $('#three').text() ||
//           $('#four').text() + $('#five').text() + $('#six').text() ||
//           $('#seven').text() + $('#eight').text() + $('#nine').text() ||
//           $('#one').text() + $('#four').text() + $('#seven').text() ||
//           $('#two').text() + $('#five').text() + $('#eight').text() ||
//           $('#three').text() + $('#six').text() + $('#nine').text() ||
//           $('#one').text() + $('#five').text() + $('#nine').text() ||
//           $('#three').text() + $('#five').text() + $('#seven').text() === 'ooo') {
//         winner = 'o';
//       } else if (turnCount === 8) {
//         winner = 'ties';
//       }
// };

/* let board = [ [null, null, null],
              [null, null, null],
              [null, null, null] ];

const winConditions = { "topRow": board[0][0], board[0][1], board[0,2];
                      "midRow": board[1][0], board[1][1], board[1][2];
                      "botRow": board[2][0], board[2][1], board[2][2];
                      "leftCol": board[3][0], board[3][1], board[3][2];
                      "midCol": board[4][0], board[4][1], board[4][2];
                      "rightCol": board[5][0], board[5][1], board[5][2];
                      "diagLeft": board[6][0], board[6][1], board[6][2];
                      "diagRight": board[7][0], board[7][1], board[7][2] };

let Win = [   board[0][0], board[0][1], board[0,2],
              board[1][0], board[1][1], board[1][2],
              board[2][0], board[2][1], board[2][2],
              board[3][0], board[3][1], board[3][2],
              board[4][0], board[4][1], board[4][2],
              board[5][0], board[5][1], board[5][2],
              board[6][0], board[6][1], board[6][2],
              board[7][0], board[7][1], board[7][2] ]

let turnCount = 0; // even = x, odd = o
let xWins = 0;
let oWins = 0;
let ties = 0;
let player;
let winner;

let clearBoard = function() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board.length; j++) {
      board[i][j] = null;
    }
  }
};

let move = function(player) {
  while (turnCount <= 8) {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] === null) {
        board[i][j] = player;
        }
      }
    } turnCount++;
  }
};

let checkWin = function() {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === winConditions.topRow || winConditions.midRow) {
      winner = player;
    }
  }

  if (player === 'x') {
    alert('X wins!');
    xWins++;
  } else if (player === 'o'){
    alert('O wins!');
    oWins++;
  } else {
    ties++;
  }
};

$('#newgame').on('click', clearBoard()); */

$(document).ready(() => {
  console.log('It works.');
  move();
});
