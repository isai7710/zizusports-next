import { cn } from "@/lib/utils";

interface ColorPickerProps {
  colors: string[];
  selectedColor?: string;
  onColorChange: (color: string) => void;
}

export function ColorPicker({
  colors,
  selectedColor,
  onColorChange,
}: ColorPickerProps) {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-900 mb-1">Colors</h2>
      <div className="flex items-center space-x-3">
        {colors.map((color, index) => (
          <span
            key={index}
            onClick={() => onColorChange(colors[index])}
            className={cn(
              color === selectedColor ? "ring ring-offset-1 ring-primary" : "",
              "w-6 h-6 relative m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none hover:cursor-pointer",
              color.toLowerCase() === "white" ? "border border-gray-200" : "",
            )}
            style={{ backgroundColor: color.toLowerCase() }}
            title={color}
          ></span>
        ))}
      </div>
    </div>
  );
}
