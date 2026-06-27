import { useState } from "react";
import AccountClient from "./accountClient";
import AccountClientByID from "./accountClientByID";
import CreateAccount from "./CreateAccount";
import PaymentClientByID from "./PaymentById";

export default function BillingSection({
  handlerClient,
  clientSelect,
  sendOrder,
  onChangeNewOrder,
  cancelNewOrder,
  ConfirmNewOrderCard,
}) {
  const [pageCurrent, setPageCurrent] = useState("viewAccounts");

  const onSelectClient = (client) => {
    handlerClient(client);
  };

  const pages = [
    {
      value: (
        <AccountClient
          handlerClient={handlerClient}
          setPageCurrent={setPageCurrent}
        />
      ),
      name: "viewAccounts",
    },
    {
      value: <CreateAccount setPageCurrent={setPageCurrent} />,
      name: "createAccount",
    },
    {
      value: (
        <PaymentClientByID
          setPageCurrent={setPageCurrent}
          clientID={clientSelect[0]}
          handlerClient={handlerClient}
        />
      ),
      name: "paymentClient",
    },
  ];

  return (
    <div className="h-full">
      {clientSelect.length > 0 && pageCurrent !== "paymentClient" ? (
        <AccountClientByID
          sendOrder={sendOrder}
          cancelNewOrder={cancelNewOrder}
          onChangeNewOrder={onChangeNewOrder}
          setPageCurrent={setPageCurrent}
          clientID={clientSelect[0]}
          ConfirmNewOrderCard={() => {
            ConfirmNewOrderCard();
          }}
          handlerClient={handlerClient}
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
