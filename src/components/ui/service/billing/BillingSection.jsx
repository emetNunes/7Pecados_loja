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
    <div>
      {client.length > 0 ? (
        <AccountClientByID clientID={client[0]} />
      ) : (
        <AccountClient onSelectClient={onSelectClient} />
      )}
    </div>
  );
}
