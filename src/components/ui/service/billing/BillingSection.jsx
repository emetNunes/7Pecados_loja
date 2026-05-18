import { useState } from "react";
import AccountClient from "./accountClient";
import AccountClientByID from "./accountClientByID";

export default function BillingSection({ handlerClient }) {
  const [client, setClient] = useState([]);

  const onSelectClient = (id, name) => {
    handlerClient(id, name);
    setClient([id, name]);
  };

  return (
    <div className="h-full ">
      {client.length > 0 ? (
        <AccountClientByID
          clientID={client[0]}
          onSelectClient={() => {
            setClient([]);
          }}
        />
      ) : (
        <AccountClient onSelectClient={onSelectClient} />
      )}
    </div>
  );
}
