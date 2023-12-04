import { useState } from "react";
import { gridTemplateStyle, resetGameState } from "../../GameUtils";
import styles from "./GameGrid.module.css";
import GridTile from "../GridTile/GridTile";

export default function GameGrid() {
  const [gameState, setGameState] = useState(resetGameState);

  const { grid } = gameState;

  console.log(gameState);

  return (
    <>
      <div className={styles.grid}>
        {grid.map((row, i) =>
          row.map((tileType, j) => <GridTile key={i + j} tileType={tileType} />)
        )}
      </div>
    </>
  );
}
