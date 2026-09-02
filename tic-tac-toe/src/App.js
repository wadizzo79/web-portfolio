import { useState } from 'react'

function Square({value, onSquareClick}){ // This component represents a single square on the game board. It receives the value to display (either "X", "O", or null) and a function to handle when the square is clicked.
    return <button className="square" onClick={onSquareClick}>{value}</button>;
} 

function Board({ xIsNext, squares, onPlay }) { // This component represents the game board. It receives the current state of the squares, a boolean indicating whose turn it is, and a function to handle when a square is clicked.
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext){
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares); 
  } // This function is called when a square is clicked. It checks if the square is already filled or if there is a winner. If not, it creates a copy of the squares array, updates the clicked square with "X" or "O" depending on whose turn it is, and then calls the onPlay function to update the game state.

  const winner = calculateWinner(squares); // This line calculates if there is a winner based on the current state of the squares.
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  } // This block determines the status message to display. If there is a winner, it shows the winner. Otherwise, it indicates which player's turn is next.

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  ); // This JSX code renders the game board. It displays the status message and creates a 3x3 grid of Square components, passing the appropriate value and click handler to each square.
}

function calculateWinner(squares) { // This function checks if there is a winner by examining all possible winning combinations of squares. It returns the value of the winner ("X" or "O") if there is one, or null if there is no winner.
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]; // This array defines all the winning combinations of square indices.
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  } // This loop iterates through each winning combination and checks if the squares at those indices are the same (and not null). If a winning combination is found, it returns the value of the winner.
  return null;
}

export default function Game() { // This is the main component that manages the overall state of the game. It keeps track of the history of moves and the current move index.
  const [history, setHistory] = useState([Array(9).fill(null)]); // This state variable holds an array of game states (the history of moves). Each game state is an array of 9 squares, initialized to null.
  const [currentMove, setCurrentMove] = useState(0); // This state variable keeps track of the index of the current move in the history. It starts at 0, which represents the initial game state.
  const xIsNext = currentMove % 2 === 0; // This variable determines which player's turn it is based on the current move index. If the index is even, it's "X"'s turn; if it's odd, it's "O"'s turn.
  const currentSquares = history[currentMove]; // This variable holds the current state of the squares based on the current move index in the history.

  function handlePlay(nextSquares)  { // This function is called when a move is made. It updates the history of moves and the current move index.
      const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; // This line creates a new history array that includes all the moves up to the current move (using slice) and then adds the new game state (nextSquares) to the end of the history. This allows for "time travel" by discarding any future moves if the user goes back in time and makes a new move.
      setHistory(nextHistory);
      setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) { // This function is called when the user wants to jump to a specific move in the history. It updates the current move index to the selected move.
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => { // This line uses the map function to create an array of JSX elements representing the list of moves in the history. Each element is a button that allows the user to jump to that specific move.
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key ={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  }); // This block creates a list of buttons for each move in the history. Each button allows the user to jump to that specific move when clicked. The description of each button indicates whether it's the start of the game or a specific move number.

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
      </div>
  ); // This JSX code renders the overall game layout. It includes the Board component, passing the necessary props for the current game state, and a list of moves that allows the user to navigate through the game's history.
}