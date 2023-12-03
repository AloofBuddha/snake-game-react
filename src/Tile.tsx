import { TileType } from "./GameUtils";

type propTypes = {
  value: TileType;
};

export default function Tile({ value }: propTypes) {
  return <div className="grid__item grid__item--empty">{value}</div>;
}
