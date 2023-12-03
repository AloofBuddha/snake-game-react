// modifiable
export const GRID_SIZE = 15;

// need some way to add the variable grid size
export const gridTemplateStyle = {
  gridTemplateRows: `repeat(${GRID_SIZE}, auto)`,
  gridTemplateColumns: `repeat(${GRID_SIZE}, auto)`,
};

export enum TileType {
  Empty,
  SnakeBody,
  SnakeHead,
  Apple,
}

export type Coordinates = [number, number];

export function resetGameState() {
  const middleRow = Math.floor(GRID_SIZE / 2);
  const bodyCoordinates: Coordinates[] = [
    [middleRow, 0],
    [middleRow, 1],
  ];
  const headCoordinates: Coordinates = [middleRow, 2];

  const grid = createGrid(GRID_SIZE, bodyCoordinates, headCoordinates);

  return {
    grid,
    score: 0,
    headCoordinates,
    bodyCoordinates,
    //apple: getRandomEmptyTile(grid),
  };
}

// creates a N x N grid representing the Snake board
export function createGrid(
  n: number,
  bodyCoordinates: Coordinates[],
  headCoordinates: Coordinates
): TileType[][] {
  const grid = Array.from({ length: n }).map(() =>
    Array.from({ length: n }).fill(TileType.Empty)
  ) as TileType[][];

  for (let coordinates of bodyCoordinates) {
    grid[coordinates[0]][coordinates[1]] = TileType.SnakeBody;
  }

  grid[headCoordinates[0]][headCoordinates[1]] = TileType.SnakeHead;

  return grid;
}
