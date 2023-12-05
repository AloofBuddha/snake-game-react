import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { startGame } from "../../redux/slices/gameStateSlice";
import {
  selectScore,
  selectHighScore,
} from "../../redux/slices/gameStateSlice";
import styles from "./MainMenu.module.css";

export default function GameContainer() {
  const mostRecentScore = useAppSelector(selectScore);
  const highScore = useAppSelector(selectHighScore);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.mainMenuContainer}>
      <div>
        {mostRecentScore > -1 && (
          <div>
            <h2 className={styles.scoreDescription}>Most recent score</h2>
            <h3 className={styles.score}>{mostRecentScore}</h3>
          </div>
        )}
        <div>
          <h2 className={styles.scoreDescription}>All-time high score</h2>
          <h3 className={styles.score}>{highScore}</h3>
        </div>
      </div>
      <button
        className={styles.startButton}
        onClick={() => dispatch(startGame())}
      >
        Start
      </button>
    </div>
  );
}

//  <h1 className={styles.currentScoreOverlay}>{score}</h1>
// <GameGrid />;
