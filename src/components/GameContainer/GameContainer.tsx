import MainMenu from "../MainMenu";
import ActiveGame from "../ActiveGame";
import { useAppSelector } from "../../redux/hooks";
import {
  selectGameStatus,
  GameStatusType,
} from "../../redux/slices/gameStatusSlice";
import styles from "./GameContainer.module.css";

export default function GameContainer() {
  const gameStatus = useAppSelector(selectGameStatus);

  return (
    <div className={styles.gameContainer}>
      {gameStatus === GameStatusType.mainMenuState ? (
        <MainMenu />
      ) : gameStatus === GameStatusType.playingState ? (
        <ActiveGame />
      ) : null}
    </div>
  );
}

//  <h1 className={styles.currentScoreOverlay}>{score}</h1>
// <GameGrid />;
