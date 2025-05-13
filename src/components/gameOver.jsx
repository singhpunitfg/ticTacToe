export default function GameOver({resetGame , won , draw}){
    return (
        <div id="game-over">
            <h1>Game Over</h1>
            {won ? <p>{won} won</p> : draw && <p>It's a draw</p>}
            <button onClick={resetGame}>Rematch!</button>

        </div>

        
    )
}