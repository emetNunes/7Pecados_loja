import { useState } from "react";
import AccountClient from "./accountClient";
import AccountClientByID from "./accountClientByID";
import CreateAccount from "./CreateAccount";

export default function BillingSection({ handlerClient }) {
  const [client, setClient] = useState([]);
  const [pageCurrent, setPageCurrent] = useState("createAccount");

  const onSelectClient = (id, name) => {
    handlerClient(id, name);
    setClient([id, name]);
  };

  const pages = [
    {
      value: (
        <AccountClient
          onSelectClient={onSelectClient}
          setPageCurrent={setPageCurrent}
        />
      ),
      name: "viewAccounts",
    },
    {
      value: <CreateAccount setPageCurrent={setPageCurrent} />,
      name: "createAccount",
    },
  ];

  return (
    <div className="h-full">
      {client.length > 0 ? (
        <AccountClientByID
          clientID={client[0]}
          onSelectClient={() => {
            setClient([]);
          }}
        />
      ) : (
        <>
          {pages.map((page) => (
            <>{pageCurrent == page.name && page.value}</>
          ))}
        </>
      )}
    </div>
  );
}
