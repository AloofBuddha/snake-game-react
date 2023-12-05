import { useAppSelector } from "../../redux/hooks";
import { selectGrid } from "../../redux/slices/gameStateSlice";
import GridTile from "../GridTile/GridTile";
import styles from "./GameGrid.module.css";

export default function GameGrid() {
  const grid = useAppSelector(selectGrid);

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
