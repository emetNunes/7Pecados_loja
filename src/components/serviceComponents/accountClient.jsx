import { HandPlatter, ListFilter } from "lucide-react";
import { useEffect, useState } from "react";

function AccountClient({ isOpen, onSelectClient }) {
  const [account, setAccount] = useState([]);

  const getAccouts = async () => {
    try {
      const response = await fetch(
        `https://api-7pecados.onrender.com/sale/account_client/historic/?isOpen=true`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Falha ao carregar as tarefas da API!");
      }

      const accountGet = await response.json();

      setAccount(accountGet.account || []);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };
  useEffect(() => {
    getAccouts();
  }, [account]);

  return (
    <ul className="mt-4 p-2">
      <p className="font-bold text-primary">Pedidos em andamento</p>

      {account.length <= 0
        ? "nenhuma conta encontrada!"
        : account.map((acc) => (
            <li
              key={acc._id}
              className="bg-base flex  justify-between border-dashed border-b-1 py-4 items-center  gap-2"
            >
              <div className="flex w-full">
                <HandPlatter className="bg-secondary mr-3 w-15 h-15 rounded-full p-2 text-base" />
                <div>
                  <p className="font-bold  text-xl text-black">{acc.name}</p>
                  <p className="text-sm text-primary">{acc._id}</p>
                </div>
              </div>
              <div>
                <div>
                  <button
                    onClick={() => {
                      onSelectClient(acc._id);
                    }}
                    className=" hover:text-white hover:outline-none hover:bg-primary outline-2 outline-offset-2 outline-solid w-35 text-primary font-bold rounded-md p-4"
                  >
                    Abrir conta
                  </button>
                </div>
              </div>
            </li>
          ))}
    </ul>
  );
}

export default AccountClient;
