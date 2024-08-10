
 <h2>features </h2>  
— 9x9 Sudoku Grid:  An interactive grid where users can enter numbers to complete a Sudoku puzzle. <br>
— Validation:  Confirms that all rows, columns, and 3x3 subgrids contain distinct values. <br>
— Solve Puzzle:  Employs a backtracking algorithm to find a solution and presents it if feasible. <br>
— Highlight Duplicates:  Marks cells with duplicate entries found in rows, columns, or subgrids. <br>
— next/previous btn Functionality:  Enables users to previous or reinstate their previous entries effortlessly. <br>
— Reset Board:  Empties the board, giving users a new start. <br>
— Show/Hide Solution:  Reveals the completed puzzle or resets the board when the "Solve" button is clicked. <br>

<br><br>

 <h2>Approach </h2>  
State Variables : <br>
— board: Reflects the current state of the Sudoku board.<br>
— history: Maintains a record of board states to facilitate next and previous functionality.<br>
— currentMove: Monitors the current position within the history stack.<br>
— errorMessage: Provides informations when user inputs are invalid . <br>
— isSolved: A boolean indicator that shows whether the puzzle has been solved.<br>
— highlightedCells: Contains the coordinates of cells that have duplicate values.<br><br>

Managing User Input :<br>
— handleInputChange: This function modifies the board state in response to user input. It verifies whether the input is a valid number between 1 and 9. If the input is valid, it updates the board, records the new state in the history, and removes any error messages. Invalid inputs will generate an error message.<br> <br>

Validation Logic : <br>
—  isValidSudoku: This function verifies the validity of the current board state. It checks that each row, column, and 3x3 subgrid contains unique numbers. If any duplicates are detected, the corresponding cells are highlighted, and the function returns false. If no duplicates are found, it returns true.. <br> <br>

Handling Actions : <br>
— handleSolveSudoku: When the user clicks the "Solve" button, this function generates a deep copy of the current board and attempts to solve it using solveSudoku. If the puzzle can be solved, it updates the board with the solution. If not, an error message is displayed, recommending a reset.<br>
— handleReset: This function resets the board to its initial configuration, clears the history, and resets all relevant statuses.<br>
— handlePreviousBtn and handleNextBtn: These functions enable users to navigate through their previous moves, allowing for undo and redo functionality.<br><br>

<h2>Demo</h2>
https://sudoku-9.netlify.app/
