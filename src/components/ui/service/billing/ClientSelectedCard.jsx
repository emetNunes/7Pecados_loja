import { UserIcon, UserRoundX } from "lucide-react";

export default function ClientSelected({ clientSelected }) {
  console.log(clientSelected);
  return (
    <>
      {clientSelected.length > 0 ? (
        <div className="flex gap-3  px-2 items-center w-full">
          <div className="bg-primary text-base p-3 rounded-2xl">
            <UserIcon size={30} />
          </div>
          <div className="bg-base rounded-2xl p-2 px-4 h-full w-[200px]">
            <p className="font-bold">{clientSelected[1]}</p>
            <p className="text-primary">#{clientSelected[0].substr(0, 7)}</p>
          </div>
        </div>
      ) : (
        <div className="flex gap-3  px-2 items-center w-full">
          <div className="bg-primary text-base p-3 rounded-2xl">
            <UserRoundX size={30} />
          </div>
          <div className="bg-base rounded-2xl p-2 h-full flex items-center">
            <p className="px-2 font-bold text-secondary">
              Nenhum cliente selecionado
            </p>
          </div>
        </div>
      )}
    </>
  );
}
