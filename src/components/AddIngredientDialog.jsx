import { createPortal } from "react-dom";
import Input from "./Input";
import { Button } from "@heroui/react";
import ModelDefaultDialog from "./ModelDefaultDialog";
import UploadImageInput from "./UploadImageInput";
import { Upload } from "lucide-react";

const AddIngredientDialog = ({ isOpen, handleClose }) => {
  if (!isOpen) return null;
  return createPortal(
    <ModelDefaultDialog
      title_dialog="Adicionar ingrediente"
      info_dialog="Insira as informações abaixo"
    >
      <Input
        id="ingredient"
        label="Título do ingrediente"
        placeholder="Insira o nome do ingrediente"
      />
      <div className="flex gap-2 w-full">
        <Input id="value" label="Valor" placeholder="Escolha seu valor" />
        <Input id="unit_of_measurement" label="Unidade" placeholder="Unit." />
      </div>
      <Input
        id="category"
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
        <Button className="bg-primary text-base rounded-xl w-full">
          <span className="default invert">Salvar</span>
        </Button>
      </div>
    </ModelDefaultDialog>,
    document.body
  );
};

export default AddIngredientDialog;
