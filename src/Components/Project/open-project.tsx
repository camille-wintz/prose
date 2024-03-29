import { Button } from "@/components/form/button";
import { useProject } from "@/hooks/project";

export const OpenProject = () => {
  const { pickFolder } = useProject();

  return (
    <Button className="text-pink" onClick={() => pickFolder()}>
      Select project folder
    </Button>
  );
};
