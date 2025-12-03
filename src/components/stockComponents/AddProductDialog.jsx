import { createPortal } from "react-dom";
import Input from "../Input";
import { Button } from "@heroui/react";
import ModelDefaultDialog from "../ModelDefaultDialog";
import UploadImageInput from "../UploadImageInput";
import { Upload } from "lucide-react";
import { useState } from "react";
import { mutate } from "swr";
import { Select, SelectItem } from "@heroui/react";

const AddProductDialog = ({ isOpen, handleClose }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState([]);
  const [price, setPrice] = useState(0);
  const [creating, setCreating] = useState(false);

  async function addIngredientInBD() {
    setCreating(true);

    const newProduct = {
      name,
      category,
      description,
      size,
      price,
      priceCost,
    };

    try {
      await mutate(
        `https://api-7pecados.onrender.com/admin/stock/products/historic`,
        async (currentData) => {
          const response = await fetch(
            `https://api-7pecados.onrender.com/admin/stock/product`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newProduct),
            }
          );

          if (!response.ok) throw new Error("Erro ao criar produto");

          const text = await response.text();

          let createdAccount;
          try {
            createdAccount = JSON.parse(text);
          } catch {
            createdAccount = {
              account: {
                _id: Math.random(),
                name,
                category,
                description,
                size,
                price,
                priceCost,
              },
            };
          }

          return {
            ...currentData,
            data: [...(currentData?.product || []), createdAccount.product],
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
      title_dialog="Adicionar Produto"
      info_dialog="Insira as informações abaixo"
    >
      <div className="flex gap-2 w-full">
        <Input
          id="ingredient"
          value={name}
          label="Título do produto"
          onChange={(e) => setName(e.target.value)}
          placeholder="Insira o nome do produto"
        />
        <Input
          id="value"
          label="Preço"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Escolha seu valor"
        />
      </div>

      <Input
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        label="Descrição"
        placeholder="Descrição do produto"
      />

      <div className="flex gap-2 w-full">
        <Select
          name="categoria"
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="max-w-lg"
          label="Categoria"
        >
          {[1, 2, 3, 4, 5].map((f) => (
            <SelectItem key={f} value={f} className=" min-w-300">
              {f}
            </SelectItem>
          ))}
        </Select>

        <Select
          selectionMode="multiple"
          label="Tamanho"
          name="tamanho"
          className="max-w-xs"
          selectedKeys={size}
          onSelectionChange={(keys) => setSize(Array.from(keys))}
        >
          {["P", "M", "G"].map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </Select>
      </div>

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
          // onClick={() => {
          //   if (
          //     name.trim() == "" ||
          //     category.trim() == "" ||
          //     measurement.trim() == "" ||
          //     currentStock < 0 ||
          //     unitCost < 0
          //   ) {
          //     return console.log("erro ao adicionar o ingrediente!");
          //   }

          //   addIngredientInBD();
          // }}
          className="bg-primary text-base rounded-xl w-full"
        >
          <span className="default invert">Salvar</span>
        </Button>
      </div>
    </ModelDefaultDialog>,
    document.body
  );
};

export default AddProductDialog;
