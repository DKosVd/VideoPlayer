import { useAppBoxContext } from "../context";
import { Box } from "./Box";

export const Boxes = () => {
  const { boxes } = useAppBoxContext();
  return (
    <div>{boxes && boxes.map((box, idx) => <Box key={idx} {...box} />)}</div>
  );
};
