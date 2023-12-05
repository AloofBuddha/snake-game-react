import { createSlice, createAsyncThunk, Draft } from "@reduxjs/toolkit";
import { RootState } from "../store";

// modifiable
const GRID_SIZE = 15;

export enum GameStatusType {
  mainMenuState,
  playingState,
  endState,
}

export enum TileType {
  Empty,
  SnakeBody,
  SnakeHead,
  Apple,
}

export enum Direction {
  Up,
  Right,
  Down,
  Left,
}

type Coordinates = [number, number];

export interface GameState {
  score: number;
  highScore: number;
  grid: TileType[][];
  snakeHead: Coordinates;
  snakeBody: Coordinates[];
  apple: Coordinates;
  timeDeltaMS: number;
  direction: Direction;
  status: GameStatusType;
}

function initializeGameState() {
  const grid = Array.from({ length: GRID_SIZE }).map(() =>
    Array.from({ length: GRID_SIZE }).fill(TileType.Empty)
  ) as TileType[][];

  const middleRow = Math.floor(GRID_SIZE / 2);

  // for simplicty's sake start out with default
  const snakeHead: Coordinates = [middleRow, 2];

  const snakeBody: Coordinates[] = [
    [middleRow, 0],
    [middleRow, 1],
  ];

  const apple: Coordinates = [middleRow, GRID_SIZE - 4];

  const state = {
    score: 0,
    highScore: 0,
    grid,
    snakeHead,
    snakeBody,
    apple,
    timeDeltaMS: 0,
    direction: Direction.Right,
    status: GameStatusType.mainMenuState,
  };

  return state;
}

function getRandomEmptyCoordinates(state: GameState): Coordinates {
  // just try until an empty space is found
  while (true) {
    // rand in range
    const randX = Math.floor(Math.random() * (GRID_SIZE + 1));
    const randY = Math.floor(Math.random() * (GRID_SIZE + 1));
    const randCoordinates: Coordinates = [randX, randY];

    // ensure it's not part of the snake overlaps with new random cood
    if (
      ![...state.snakeBody, state.snakeHead].some((bodyPart) =>
        coordinatesOverlap(bodyPart, randCoordinates)
      )
    ) {
      return randCoordinates;
    }
  }
}

function paintFrame(state: GameState) {
  const { grid, snakeHead, snakeBody, apple } = state;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      grid[i][j] = TileType.Empty;
    }
  }

  let [x, y] = snakeHead;
  grid[x][y] = TileType.SnakeHead;

  for (let [x, y] of snakeBody) {
    grid[x][y] = TileType.SnakeBody;
  }

  [x, y] = apple;

  grid[x][y] = TileType.Apple;
}

const initialState: GameState = initializeGameState();

// Thunk for working with tick
export const tick = createAsyncThunk(
  "gameState/tick",
  async (timeDelay: number) => {
    // represents the seconds counter for the game to 'tick'
    function tickPromise(timeDelay: number) {
      return new Promise<number>((resolve) =>
        setTimeout(() => resolve(timeDelay), timeDelay)
      );
    }
    const timeElapsed = await tickPromise(timeDelay);

    return timeElapsed;
  }
);

// update grid based on direction currently headed
function tickGrid(state: Draft<GameState>) {
  switch (state.direction) {
    case Direction.Right:
      moveSnakeRight(state);
  }
}

function moveSnakeRight(state: Draft<GameState>) {
  // check if at right edge, return early if so
  if (state.snakeHead[1] === state.grid[0].length - 1) {
    state.status = GameStatusType.endState;
    return;
  }

  // add (copy of) head to body and remove last element
  state.snakeBody.push([...state.snakeHead]);
  state.snakeBody.shift();

  // move actual head in the right direction
  state.snakeHead[1]++;
}

function coordinatesOverlap(a: Coordinates, b: Coordinates): boolean {
  return a[0] === b[0] && a[1] === b[1];
}

function checkforAppleCollision(state: Draft<GameState>) {
  // if don't overlap return early
  if (!coordinatesOverlap(state.apple, state.snakeHead)) return;

  // get 'tail' of body
  const [first, second, ..._rest] = state.snakeBody;

  // tail moving right
  if (first[1] + 1 === second[1]) {
    const newTail: Coordinates = [first[0], first[1] - 1];
    state.snakeBody.unshift(newTail);
  }

  // other cases

  // new apple
  state.apple = getRandomEmptyCoordinates(state);

  state.score += 1;
}

export const gameStateSlice = createSlice({
  name: "gameState",
  initialState,
  reducers: {
    startGame: (state) => {
      state.status = GameStatusType.playingState;
      paintFrame(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(tick.fulfilled, (state, action) => {
      state.timeDeltaMS += action.payload;
      tickGrid(state);
      checkforAppleCollision(state);
      paintFrame(state);
    });
  },
});

export const { startGame } = gameStateSlice.actions;

export const selectGrid = (state: RootState) => state.grid;

export const selectScore = (state: RootState) => state.score;

export const selectHighScore = (state: RootState) => state.highScore;

export const selectGameStatus = (state: RootState) => state.status;

export default gameStateSlice.reducer;
