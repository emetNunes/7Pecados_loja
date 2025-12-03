import { createPortal } from "react-dom";
import Input from "../Input";
import { Button } from "@heroui/react";
import ModelDefaultDialog from "../ModelDefaultDialog";
import UploadImageInput from "../UploadImageInput";
import { Upload } from "lucide-react";
import { useState } from "react";
import { mutate } from "swr";

const AddIngredientDialog = ({ isOpen, handleClose }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [measurement, setMasurement] = useState("unit");
  const [unitCost, setUnitCost] = useState(0);
  const [currentStock, setCurrentStock] = useState(0);
  const [creating, setCreating] = useState(false);

  async function addIngredientInBD() {
    setCreating(true);

    const newIngredient = {
      name: name,
      category: category,
      measurement: measurement,
      currentStock: currentStock,
      unitCost: unitCost,
    };

    try {
      await mutate(
        `https://api-7pecados.onrender.com/admin/stock/ingredients/historic`,
        async (currentData) => {
          const response = await fetch(
            `https://api-7pecados.onrender.com/admin/stock/ingredient`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newIngredient),
            }
          );

          if (!response.ok) throw new Error("Erro ao criar ingrediente");

          const text = await response.text();

          let createdAccount;
          try {
            createdAccount = JSON.parse(text);
          } catch {
            createdAccount = {
              account: {
                _id: Math.random(),
                name: name,
                category: category,
                measurement: measurement,
                currentStock: currentStock,
                unitCost: unitCost,
              },
            };
          }

          return {
            ...currentData,
            account: [...(currentData?.account || []), createdAccount.account],
          };
        },
        { revalidate: true }
      );
      handleClose();
      setClientName("");
    } catch (err) {
      console.error("Erro ao criar ingrediente:", err);
    } finally {
      setCreating(false);
    }
  }

  if (!isOpen) return null;

  return createPortal(
    <ModelDefaultDialog
      title_dialog="Adicionar ingrediente"
      info_dialog="Insira as informações abaixo"
    >
      <Input
        id="ingredient"
        value={name}
        label="Título do ingrediente"
        onChange={(e) => setName(e.target.value)}
        placeholder="Insira o nome do ingrediente"
      />
      <div className="flex gap-2 w-full">
        <Input
          id="value"
          label="Valor"
          value={unitCost}
          onChange={(e) => setUnitCost(e.target.value)}
          placeholder="Escolha seu valor"
        />
        <Input
          id="unit_of_measurement"
          value={measurement}
          onChange={(e) => setMasurement(e.target.value)}
          label="Unidade"
          placeholder="Unit."
        />
      </div>
      <Input
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        label="Categoria"
        placeholder="Escolha a sua categoria"
      />
      <UploadImageInput
        icon={<Upload />}
        title={"Upload de imagem"}
        description={
          "Essa imagem ficará salva e poderá ser usada em outros ingredientes"
        }
      />
      <div className="flex gap-3">
        <Button
          className="bg-base text-base rounded-xl border-1 border-default-200 w-full"
          onPress={handleClose}
        >
          <span className="default">Cancelar</span>
        </Button>
        <Button
          onClick={() => {
            if (
              name.trim() == "" ||
              category.trim() == "" ||
              measurement.trim() == "" ||
              currentStock < 0 ||
              unitCost < 0
            ) {
              return console.log("erro ao adicionar o ingrediente!");
            }

            addIngredientInBD();
          }}
          className="bg-primary text-base rounded-xl w-full"
        >
          <span className="default invert">Salvar</span>
        </Button>
      </div>
    </ModelDefaultDialog>,
    document.body
  );
};

export default AddIngredientDialog;
