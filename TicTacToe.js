/*
* This program uses recursion to find all the magic squares of 15 in java.
*
* @author  Douglass Jeffrey
* @version 1.0
* @since   2021-01-08
*/

// Defining prompt for getting user input
const prompt = require('prompt-sync')({sigint: true});



/**
 * Main function to recieve user input and call tictatoe bot function.
 */

// main stub, get user input here
let boardFull = false;
let checkWinnerX = false;
let checkWinnerO = false;


let board = [ "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
console.log("Welcome to tic tac toe!\n");

printBoard(board);
do {
  const uInput = prompt("\nWhich space would you like to put the X? ");
  if (!isNaN(uInput)) {
    let space = uInput;

    if (space >= 1 && space <= 9 && !isNaN(board[space - 1])) {
      board[space - 1] = "X";

      // place a function call here to get the best move for O
      // set the variable that is used to stop recursion to 0
      let countPlace = 0;
      //call the O move calculator
      compNextMove(board, countPlace);

      //After O moves print board
      printBoard(board);

    } else if (board[space - 1] == "X"
               || board[space - 1] == "O") {
      console.log("That spot's taken!");
      printBoard(board);
    } else {
      console.log("Error");
      break;
    }
  } else {
    console.log("Error");
    break;
  }
  
  // check to see if anyone wins
  checkWinnerX = winOrLost(board, "X");
  checkWinnerO = winOrLost(board, "O");
  if (checkWinnerX == true) {
    console.log("\nX has won.");
    break;
  } else if (checkWinnerO == true) {
    console.log("\nO has won.");
    break;
  }

  boardFull = checkFull(board);
} while (boardFull == false);
    
console.log("\nGame Over.");


/**
 * function to check wins or losses for bot and player.
 */
 function winOrLost(board, takenSpace) {
  // returns true or false for whether or not inputted array is a magic square
  if ((board[0] == takenSpace && board[1] == takenSpace && board[2] == takenSpace)
       || (board[3] == takenSpace && board[4] == takenSpace && board[5] == takenSpace)
       || (board[6] == takenSpace && board[7] == takenSpace && board[8] == takenSpace)
       || (board[0] == takenSpace && board[3] == takenSpace && board[6] == takenSpace)
       || (board[1] == takenSpace && board[4] == takenSpace && board[7] == takenSpace)
       || (board[2] == takenSpace && board[5] == takenSpace && board[8] == takenSpace)
       || (board[0] == takenSpace && board[4] == takenSpace && board[8] == takenSpace)
       || (board[2] == takenSpace && board[4] == takenSpace && board[6] == takenSpace)) {
    return true;
  } else {
    return false;
  }
}

/**
 * calculates the best next move for computer based on current board.
 */
function compNextMove(currentBoard, countPlace) {
  // try to catch an out of bounds error
  try {
    // if countplace > 9 keep recursing.
    if (countPlace < 9) {
              
      // find where is numeric on the board
      if (!isNaN(currentBoard[countPlace])) {
        
        // hold the value of a location in the array
        let valHolder = currentBoard[countPlace];
        // set the value of said location to "O"
        currentBoard[countPlace] = "O";
        
        //check if victory would be achieved in said scenario
        if (winOrLost(currentBoard, "O")) {
          //set the value that causes victory to "O"
          currentBoard[countPlace] = "O";
          //increase countplace to induce a outofbounds error
          countPlace += 30;
          if (currentBoard[countPlace] == null) {
            throw null;
          }
        // if victory cannot be achieved reset the value of array
        } else {
          // reset the value of a location in the array
          currentBoard[countPlace] = valHolder;
        }
                  
        // set the value of said location to "X"
        currentBoard[countPlace] = "X";
                  
        //check if x victory possible
        if (winOrLost(currentBoard, "X")) {
          //if it is block it
          currentBoard[countPlace] = "O";
          //increase loop variable to prevent further looping
          countPlace += 30;

        } else {
          // reset the value of a location in the array
          currentBoard[countPlace] = valHolder;
        }
      }
      // recursive call.
      compNextMove(currentBoard, countPlace + 1);
  
    } else if (countPlace > 8 && countPlace < 20) {
      let randomNum = Math.floor((Math.random() * 3) + 0);
              
      if (!isNaN(currentBoard[4])) {
        currentBoard[4] = "O";
              
      // eliminating extreme cases where player victory may be possible
      } else if ((currentBoard[4]) == "O"
                  && (currentBoard[0]) == "X"
                  && (currentBoard[8]) == "X"
                  && !isNaN(currentBoard[1])
                  && !isNaN(currentBoard[3])
                  && !isNaN(currentBoard[5])
                  && !isNaN(currentBoard[7])) {
                             
        if (randomNum == 0 && !isNaN(currentBoard[1])) {
          currentBoard[1] = "O";

        } else if (randomNum == 1 && !isNaN(currentBoard[3])) {
          currentBoard[3] = "O";

        } else if (randomNum == 2 && !isNaN(currentBoard[5])) {
          currentBoard[5] = "O";

        } else if (randomNum == 3 && !isNaN(currentBoard[7])) {
          currentBoard[7] = "O";

        } else if (randomNum == 0 && !isNaN(currentBoard[0])) {
          currentBoard[0] = "O";
        }

      // eliminating MORE extreme cases where player victory may be possible
      } else if ((currentBoard[4]) == "O" 
                  && (currentBoard[2]) == "X"
                  && (currentBoard[6]) == "X"
                  && !isNaN(currentBoard[1])
                  && !isNaN(currentBoard[3])
                  && !isNaN(currentBoard[5])
                  && !isNaN(currentBoard[7])) {
                             
        if (randomNum == 0 && !isNaN(currentBoard[1])) {
          currentBoard[1] = "O";

        } else if (randomNum == 1 && !isNaN(currentBoard[3])) {
          currentBoard[3] = "O";

        } else if (randomNum == 2 && !isNaN(currentBoard[5])) {
          currentBoard[5] = "O";
                  
        } else if (randomNum == 3 && !isNaN(currentBoard[7])) {
          currentBoard[7] = "O";

        } else if (randomNum == 0 && !isNaN(currentBoard[0])) {
          currentBoard[0] = "O";
        }

      } else if ((currentBoard[4]) == "O"
                  && (currentBoard[1]) == "X"
                  && (currentBoard[3]) == "X"
                  && !isNaN(currentBoard[0])
                  && !isNaN(currentBoard[2])
                  && !isNaN(currentBoard[5])
                  && !isNaN(currentBoard[6])
                  && !isNaN(currentBoard[7])
                  && !isNaN(currentBoard[8])) {
        currentBoard[0] = "O";
                  
      } else if ((currentBoard[4]) == "O"
                  && (currentBoard[1]) == "X"
                  && (currentBoard[5]) == "X"
                  && !isNaN(currentBoard[0])
                  && !isNaN(currentBoard[2])
                  && !isNaN(currentBoard[3])
                  && !isNaN(currentBoard[6])
                  && !isNaN(currentBoard[7])
                  && !isNaN(currentBoard[8])) {
        currentBoard[2] = "O";
                  
      } else if ((currentBoard[4]) == "O"
                  && (currentBoard[3]) == "X"
                  && (currentBoard[7]) == "X"
                  && !isNaN(currentBoard[0])
                  && !isNaN(currentBoard[1])
                  && !isNaN(currentBoard[2])
                  && !isNaN(currentBoard[5])
                  && !isNaN(currentBoard[6])
                  && !isNaN(currentBoard[8])) {
        currentBoard[6] = "O";
                  
      } else if ((currentBoard[4]) == "O"
                  && (currentBoard[5]) == "X"
                  && (currentBoard[7]) == "X"
                  && !isNaN(currentBoard[0])
                  && !isNaN(currentBoard[1])
                  && !isNaN(currentBoard[2])
                  && !isNaN(currentBoard[3])
                  && !isNaN(currentBoard[6])
                  && !isNaN(currentBoard[8])) {
        currentBoard[8] = "O";
                  
      } else if (randomNum == 1 && !isNaN(currentBoard[2])) {
        currentBoard[2] = "O";

      } else if (randomNum == 2 && !isNaN(currentBoard[6])) {
        currentBoard[6] = "O";

      } else if (randomNum == 3 && !isNaN(currentBoard[8])) {
        currentBoard[8] = "O";
                  
      } else if (randomNum == 0 && !isNaN(currentBoard[1])) {
        currentBoard[1] = "O";
                  
      } else if (randomNum == 1 && !isNaN(currentBoard[3])) {
        currentBoard[3] = "O";

      } else if (randomNum == 2 && !isNaN(currentBoard[5])) {
        currentBoard[5] = "O";
                  
      } else if (randomNum == 3 && !isNaN(currentBoard[7])) {
        currentBoard[7] = "O";
      }
    }
    return currentBoard;
  /*
   * when an outofbounds error is caught it will only ever be because 
   * a win condition was found
   */
  } catch (NullPointerException) {
    return currentBoard;
  }
}

/**
 * returns whether board is full or not.
 */
function checkFull(presentBoard) {
  let full = true;
  for (let counter = 0; counter < presentBoard.length; counter++) {
    if (!isNaN(presentBoard[counter])) {
      full = false;
      break;
    } 
  }
  return full;
}

/**
 * Prints out board.
 */
function printBoard(theBoard) {
  // prints current game state
  console.log("----+----+----");
  console.log(" | " + theBoard[0] + " | " + theBoard[1] + " | " + theBoard[2] + " | ");
  console.log("----+----+----");
  console.log(" | " + theBoard[3] + " | " + theBoard[4] + " | " + theBoard[5] + " | ");
  console.log("----+----+----");
  console.log(" | " + theBoard[6] + " | " + theBoard[7] + " | " + theBoard[8] + " | ");
  console.log("----+----+----");

}

