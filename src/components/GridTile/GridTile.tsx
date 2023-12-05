import styles from "./GridTile.module.css";
import { TileType } from "../../redux/slices/gameStateSlice";

interface propTypes {
  tileType: TileType;
}

export default function Tile({ tileType }: propTypes) {
  let tileClasses = [styles.grid__tile];

  switch (tileType) {
    case TileType.Empty:
      tileClasses.push(styles["grid__tile--empty"]);
      break;

    case TileType.SnakeBody:
      tileClasses.push(styles["grid__tile--snake-body"]);
      break;

    case TileType.SnakeHead:
      tileClasses.push(styles["grid__tile--snake-head"]);
      break;

    case TileType.Apple:
      tileClasses.push(styles["grid__tile--apple"]);
      break;

    default:
      throw new TypeError(`Unknown TileType: ${tileType}`);
  }

  return <div className={tileClasses.join(" ")}></div>;
}
