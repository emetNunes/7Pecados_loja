import { Button } from "@heroui/button";

const UploadImageInput = ({ icon = "", title, description }) => {
  return (
    <div className="flex flex-col border-dashed border-1 border-default-200 p-4 items-center rounded-lg gap-4">
      <div className="grid grid-rows-3 items-center">
        <div className="flex justify-center font-bold mb-2">{icon}</div>
        <div className="font-bold">{title}</div>
        <div className="flex text-sm text-default-600">{description}</div>
      </div>
      <Button className="flex w-fit border-2 border-primary bg-base text-primary">
        <input type="file" placeholder="Enviar arquivo" />
      </Button>
    </div>
  );
};

export default UploadImageInput;
