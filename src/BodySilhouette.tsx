import bodyDefault from "./assets/body-model.png";
import bodyArms from "./assets/body-arms.png";
import bodyBack from "./assets/body-back.png";
import bodyLegs from "./assets/body-legs.png";

const bodyImages: Record<string, string> = {
  Руки: bodyArms,
  Спина: bodyBack,
  Ноги: bodyLegs,
};

export function BodySilhouette({ size = 96, type }: { size?: number; type?: string }) {
  const src = (type && bodyImages[type]) || bodyDefault;
  return (
    <img
      src={src}
      alt="Body muscle map"
      width={size}
      height={size * 2.3}
      style={{ width: size, height: size * 2.3, objectFit: "contain" }}
    />
  );
}
