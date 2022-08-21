import PlantsImageSource from "@/assets/plants.svg";

export const PlantsImage = () => {
  return (
    <div className="absolute bottom-0 left-8">
      <img src={PlantsImageSource} alt="Plants" className="w-[320px]" />
    </div>
  );
};
