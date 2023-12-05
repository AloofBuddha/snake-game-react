import { useEffect } from "react";
import GameGrid from "../GameGrid";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { selectScore, tick } from "../../redux/slices/gameStateSlice";
import styles from "./ActiveGame.module.css";

export default function ActiveGame() {
  const score = useAppSelector(selectScore);
  const dispatch = useAppDispatch();

  // kick off the game timer
  useEffect(() => {
    const delayTimeMS = 500;
    const intervalHandler = setInterval(
      () => dispatch(tick(delayTimeMS)),
      delayTimeMS
    );

    // cleanup
    return () => clearInterval(intervalHandler);
  }, []);

  // capture keyboard input
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.code) {
        case "keyW":
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <h1 className={styles.currentScoreOverlay}>{score}</h1>
      <GameGrid />
    </>
  );
}
