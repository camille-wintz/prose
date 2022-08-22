import PlantsImageSource from "@/assets/plants.svg";
import { useCurrentFile } from "@/hooks/current-file";
import { useProject } from "@/hooks/project";

export const PlantsImage = () => {
  const { root } = useProject();
  const { current } = useCurrentFile();

  return (
    <div
      className={`plants-illustration ${!root || !current ? "focus" : ""}`}
      id="plants"
    >
      <img src={PlantsImageSource} alt="Plants" />
    </div>
  );
};
