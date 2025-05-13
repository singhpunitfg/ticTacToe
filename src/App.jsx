import React , {useState , useEffect} from "react";
import Player from "./components/player.jsx";
import GameBoard from "./components/gameBoard.jsx";
import Log from "./components/log.jsx";
import GameOver from "./components/gameOver.jsx";
import {WINNING_COMBINATIONS} from "./winning-combination.js";

const initialGameBoard = [
  [null , null , null],
  [null , null , null],
  [null , null , null]

];

function derivePlayer(gameTurn){

  let currentPlayer = 'X';

      if(gameTurn.length > 0 && gameTurn[0].player === 'X'){
        currentPlayer = 'O';
      }

      return currentPlayer;

}

export default function App(){
  const [gameTurn , setGameTurns] = useState([]);
  const activePlayer = derivePlayer(gameTurn);

  const [players ,setPlayers] = useState({
    X:'player1',
    O:'player2'
  })

  let gameBoard = initialGameBoard.map(row => [...row]);

  for(const turn of gameTurn){
      const {square , player} = turn;
      const {row , col} = square;

      gameBoard [ row ] [col] = player;
    }

    const [winner , setWinner] = useState(null); 
    const [isWinning , setWinningSq] = useState([]);
    

    useEffect(() => {
      for (const combination of WINNING_COMBINATIONS) {
        const [[r1, c1], [r2, c2], [r3, c3]] = combination;
    
        const firstSqSymbol = gameBoard[r1][c1];
        const secondSqSymbol = gameBoard[r2][c2];
        const thirdSqSymbol = gameBoard[r3][c3];
    
        if (
          firstSqSymbol &&
          firstSqSymbol === secondSqSymbol &&
          firstSqSymbol === thirdSqSymbol
        ) {
          setWinner(firstSqSymbol);
          setWinningSq([[r1, c1], [r2, c2], [r3, c3]]);
          break;
        }
          
        
      }
    }, [gameTurn]); 

    const hasDraw = gameTurn.length === 9 && !winner;
    
    

  function handleSelectSquare(rowIndex , colIndex){
    if(winner){
      return;
    }

    setGameTurns((prevTurns) => {

      let currentPlayer = derivePlayer(prevTurns);

      const updatedTurns = [
        {square : {row : rowIndex , col : colIndex} , player : currentPlayer} , 
        ...prevTurns 

      ];
      return updatedTurns;

      
});
  }

function reset() {
  setGameTurns([]);  // Clear the game history
  setWinner(null);   // Reset the winner state




  
}

function handlePlayerName(symbol , newName){
  setPlayers(prevPlayer => {
    return {
      ...prevPlayer ,
      [symbol]:newName
    }
  })

}


  


  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player" >
          <Player initalName="player1" symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerName}/>
          <Player initalName="player2" symbol="O"  isActive={activePlayer === 'O'} onChangeName={handlePlayerName}/>
          </ol>
          {winner && <GameOver won={players[winner]} resetGame={reset}/>}
          {hasDraw && <GameOver draw={hasDraw} resetGame={reset}/>}
          

          <GameBoard onSelectSquare={handleSelectSquare}
           board={gameBoard}
           wonSq={isWinning}/>
       
        
      </div>
      <Log  turns={gameTurn} />
    </main>
  );
}
