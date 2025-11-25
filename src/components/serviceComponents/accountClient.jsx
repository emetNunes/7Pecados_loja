import { HandPlatter, ListFilter, XIcon, X, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import AddClientDialog from "@/components/AddClientDialog";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

function AccountClient({ onSelectClient, setPage }) {
  // const [account, setAccount] = useState([]);
  const [addClientDialogIsOpen, setAddClientDialog] = useState(false);

  const API_URL = `https://api-7pecados.onrender.com/sale/account_client/historic/?isOpen=true`;

  const {
    data,
    error,
    isLoading,
    mutate: refetchAccount,
  } = useSWR(API_URL, fetcher);

  const account = data?.account || [];

  if (isLoading)
    return (
      <div className="p-2 ">
        <div className="font-bold text-2xl flex  justify-between">
          <h1>Carregando contas...</h1>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="p-2 ">
        <div className="font-bold text-2xl flex justify-between">
          <h1>Erro ao carregar contas.</h1>
          <div
            className="text-2xl  hover:text-primary"
            onClick={() => {
              setPage("");
            }}
          >
            <XIcon />
          </div>
        </div>
      </div>
    );

  if (account.length === 0)
    return (
      <div className="p-4 sm:p-6 max-w-sm mx-auto">
        <button
          onClick={() => setAddClientDialog(true)}
          className="bg-primary hover:bg-white  hover:outline-2 hover:outline-offset-2 hover:outline-solid hover:text-primary text-white font-semibold w-full text-lg py-3 px-6 rounded-lg shadow-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        >
          Cadastrar conta
        </button>
        <AddClientDialog
          isOpen={addClientDialogIsOpen}
          refetchAccount={() => refetchAccount()}
          handleClose={() => setAddClientDialog(false)}
        />
      </div>
    );

  return (
    <>
      <div className="p-2 ">
        <div className="font-bold text-2xl flex justify-between">
          Registro de clientes - Hoje
        </div>
      </div>

      <p className="font-bold text-primary p-2">Pedidos em andamento</p>

      <ul className="p-2 h-2/4 overflow-y-auto overscroll-contain scroll-smooth [WebkitOverflowScrolling:touch]">
        {account.map((acc) => (
          <li
            key={acc._id}
            className="bg-base flex justify-between border-dashed border-b-1 py-4 items-center  gap-2"
          >
            <div className="flex w-full">
              <HandPlatter className="bg-secondary mr-3 w-15 h-15 rounded-full p-2 text-base" />
              <div>
                <p className="font-bold  text-xl text-black">{acc.name}</p>
                <p className="text-sm text-primary">Client cadastrado</p>
              </div>
            </div>
            <button
              onClick={() => {
                onSelectClient(acc._id, acc.name);
              }}
              className=" hover:text-white hover:outline-none hover:bg-primary outline-2 outline-offset-2 outline-solid w-35 text-primary font-bold rounded-md p-4"
            >
              Abrir conta
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col p-2 border-t-1">
        <button
          onClick={() => setAddClientDialog(true)}
          className="bg-primary hover:bg-white hover:outline-2 hover:outline-offset-2 hover:outline-solid hover:text-primary w-full text-2xl my-4 text-white font-bold rounded-md p-6"
        >
          Adicionar cliente
        </button>

        <AddClientDialog
          isOpen={addClientDialogIsOpen}
          refetchAccount={() => refetchAccount()}
          handleClose={() => setAddClientDialog(false)}
        />
      </div>
    </>
  );
}

export default AccountClient;
