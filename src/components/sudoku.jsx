
import React, {useState, useEffect} from "react";
import {GrNext, GrPrevious} from "react-icons/gr";

const Sudoku = () => {
  const initialBoard = [
    [5, 3, "", "", 7, "", "", "", ""],
    [6, "", "", 1, 9, 5, "", "", ""],
    ["", 9, 8, "", "", "", "", 6, ""],
    [8, "", "", "", 6, "", "", "", 3],
    [4, "", "", 8, "", 3, "", "", 1],
    [7, "", "", "", 2, "", "", "", 6],
    ["", 6, "", "", "", "", 2, 8, ""],
    ["", "", "", 4, 1, 9, "", "", 5],
    ["", "", "", "", 8, "", "", 7, 9],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [history, setHistory] = useState([initialBoard]);   //  state for managing current board status 
  const [currentMove, setCurrentMove] = useState(0);   // state for manageinig next and previous button
  const [errorMessage, setErrorMessage] = useState("");
  const [isSolved, setIsSolved] = useState(false);
  const [highlightedCells, setHighlightedCells] = useState([]);
//   const [solution, setSolution] = useState(null);

  //   .....handling input ....
  //  function which takes 3 values .i.e. row no , col no ,current value of cell .
  const handleInputChange = (row, col, value) => {
    if (value >= 1 && value <= 9) {
      // iterating over each row (i =index of row)
      const newBoard = board.map((r, i) =>
        //  iterating over each cell of individual row.. (cell) , (j =index of column)
        // comparing row and col number with their index  .i.e.  i ,j
        r.map((cell, j) => (i === row && j === col ? parseInt(value) : cell))
      );

      setBoard(newBoard);
      setHistory([...history.slice(0, currentMove + 1), newBoard]);
    //   console.log(history);
      setCurrentMove(currentMove + 1);
      setErrorMessage("");
    } else {
      setErrorMessage("Please enter a number between 1 and 9.");
    }
  };

  //   .....  validating  Sudoku   ......
  //    checking whether  Sudoku board is valid i.e it is having unique numbers
  //  to  highlight cells if there are  duplicate numbers in a row, column .
  const isValidSudoku = (board) => {

    //  creates new array and fill it with set() to each element [new Set(),  new Set(),.... ]
    const rows = Array(9).fill(null).map(() => new Set());
    const cols = Array(9).fill(null).map(() => new Set());
    //   grid 3*3 
    const grids = Array(9).fill(null).map(() => new Set());

    const newHighlightedCells = [];

    // interating over rows
    for (let i = 0; i < 9; i++) {
      // iterating over columns
      for (let j = 0; j < 9; j++) {
        const num = board[i][j];
        if (num !== "") {
          // Math.floor(i / 3)  divides row into 3 parts ( rows 0,1,2 (block 0),rows 3,4,5 (block 1),rows 7,8,9 (block 2))
          // Math.floor(j / 3)  divides col into 3 parts ( cols 0,1,2 ,cols 3,4,5 ,cols 7,8,9 )
          const gridIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);
          // checking for duplicates in row , column , grid .if thier coordinate is pushed into newHighlightedCells array
          if (
            rows[i].has(num) ||
            cols[j].has(num) ||
            grids[gridIndex].has(num)
          ) {
            newHighlightedCells.push([i, j]);
          }
        //   if  not present then it will push the element into array
          rows[i].add(num);
          cols[j].add(num);
          grids[gridIndex].add(num);
        }
      }
    }
    setHighlightedCells(newHighlightedCells);

    //  returns true if there is no duplicate number else returns false
    return newHighlightedCells.length === 0;
  };

  const handleValidateSudoku = () => {
    if (isValidSudoku(board)) {
      setErrorMessage("Current entries are valid!");
    } else {
      setErrorMessage("There are mistakes in the current entries.");
    }
  };

  //  finding solution for the sudoku
  const solveSudoku = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        //  if the cell is empty fill it with a number
        if (board[row][col] === "") {
          for (let num = 1; num <= 9; num++) {
            board[row][col] = num;
            //  after filling the number it checks wheter the current board is valid
            //  if valid it calls solveSudoku() function recursively
            //  when all the values are filled then it reurns true
            // else it wil set number empty string and returns false
            if (isValidSudoku(board) && solveSudoku(board)) {
              return true;
            }
            board[row][col] = "";
          }
          return false;
        }
      }
    }
    return true;
  };

  const handleSolveSudoku = () => {
    //   deep copy of the board
    const newBoard = JSON.parse(JSON.stringify(board));
    if (solveSudoku(newBoard)) {
    //   setSolution(newBoard);
      setIsSolved(!isSolved);
      setBoard(newBoard);
    } else {
    //   setErrorMessage("OO");
    alert("Oops! This puzzle is stubborn and won't solve with the current values. Please reset and give it another try!");
    }
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setHistory([initialBoard]);
    setCurrentMove(0);
    setErrorMessage("");
    setIsSolved(false);
    setHighlightedCells([]);
  };

  const handlePreviousBtn = () => {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
      setBoard(history[currentMove - 1]); 
      setIsSolved(false);
    }
  };

  const handleNextBtn = () => {
    if (currentMove < history.length - 1) {
      setCurrentMove(currentMove + 1);
      setBoard(history[currentMove + 1]);
      setIsSolved(false);
    }
  };

  useEffect(() => {
    isValidSudoku(board);
  }, [board]);

return (
    <main className="sudoku-container">
      <h2>Sudoku Game</h2>
      <div className="error">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <table className="sudoku-board">
        <tbody>
        {/*  iterating over row to display */}
          {board.map((row, rowIndex) => (
           
            <tr key={rowIndex}>
             {/* iterating over each col (cell) of the row */}
              {row.map((cell, colIndex) => (
                <td key={colIndex} className={`sudoku-cell ${ highlightedCells.some( ([r, c]) => r === rowIndex && c === colIndex  ) ? "highlight" : "" }`}>
                  <input type="text" value={cell} maxLength="1" onChange={(e) =>  handleInputChange(rowIndex, colIndex, e.target.value) }
                    className={`sudoku-input ${initialBoard[rowIndex][colIndex] !== "" ? "initial" : ""  }`}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="controls">
        <div className="prev-next-btn">
          <button className="prev control-button" onClick={handlePreviousBtn}   disabled={currentMove === 0} >
            <GrPrevious />
          </button>
          <button onClick={handleNextBtn} className="control-button" disabled={currentMove >= history.length - 1}>
            <GrNext />
          </button>
        </div>
        <button onClick={handleReset} className="control-button"> Reset</button>
        <button onClick={handleSolveSudoku} className="control-button">Solve</button>
        <button onClick={handleValidateSudoku} className="control-button"> validate </button>
      </div>
    </main>
  );
};

export default Sudoku;
