import { Title } from "../Typography";

export interface Grid {}

export const StoryGrid = ({
  value,
  onChange,
}: {
  value: Grid;
  onChange: (g: Grid) => void;
}) => {
  return (
    <>
      <Title className="text-3xl mt-10">Story Grid</Title>
    </>
  );
};
