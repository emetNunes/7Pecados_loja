import { Chip } from "@heroui/react";
import { AppleIcon } from "lucide-react";

export default function ProductDetails({ title, detailsData }) {
  return (
    <div className="my-4">
      <div className="bg-gray-300/80 px-4 py-3 mx-[-20px]">
        <p className="text-medium font-bold tracking-wide mb-2 text-zinc-800">
          {title}
        </p>
        <div className="flex justify-between items-center ">
          <p className="text-sm text-zinc-600">Escolha 1 opção:</p>
          <div className="bg-secondary p-2 text-[12px] text-base rounded-[9px]">
            obrigatorio
          </div>
        </div>
      </div>
      {detailsData.map((data) => (
        <div
          key={data._id}
          className="flex justify-between border-b-1 border-dashed border-zinc-300 py-5" // TTI 234 / LUIS LUZ
        >
          <label for={data._id}>{data.name}</label>
          <input type="radio" id={data._id} name={title} />
        </div>
      ))}
    </div>
  );
}
