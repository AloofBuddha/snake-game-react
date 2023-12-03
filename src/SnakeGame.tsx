import { useState } from "react";
import { gridTemplateStyle, resetGameState } from "./GameUtils";
import "./SnakeGame.scss";
import Tile from "./Tile";

export default function SnakeGame() {
  const [gameState, setGameState] = useState(resetGameState);

  const { grid } = gameState;

  console.log(gameState);

  return (
    <>
      <div className="grid" style={gridTemplateStyle}>
        {grid.map((row, i) =>
          row.map((value, j) => <Tile key={i + j} value={value} />)
        )}
      </div>
    </>
  );
}
