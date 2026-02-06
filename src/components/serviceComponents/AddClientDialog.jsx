import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import { mutate } from "swr";
import { Loader2 } from "lucide-react";

import Input from "../Input";
import ModelDefaultDialog from "../ModelDefaultDialog";
import { useToast } from "@/contexts/ToastContext";

const API_LIST =
  "https://api-7pecados.onrender.com/sale/account_client/historic/?isOpen=true";

const API_CREATE = "https://api-7pecados.onrender.com/sale/account_client";

const AddClientDialog = ({ isOpen, handleClose }) => {
  const [clientName, setClientName] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  /* ================================
     RESET AO ABRIR / FECHAR
  ================================ */
  useEffect(() => {
    if (!isOpen) {
      setClientName("");
      setCreating(false);
      setError("");
    }
  }, [isOpen]);

  /* ================================
     CRIAR CLIENTE (ROBUSTO)
  ================================ */
  async function createAccountClient() {
    if (!clientName.trim() || creating) return;

    setCreating(true);
    setError("");

    try {
      await mutate(
        API_LIST,
        async (currentData) => {
          const response = await fetch(API_CREATE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: clientName.trim() }),
          });

          if (!response.ok) {
            throw new Error("Erro ao criar conta");
          }

          // 🔒 DEFENSIVO: pode não ser JSON
          const text = await response.text();
          let createdAccount = null;

          try {
            const parsed = JSON.parse(text);
            createdAccount = parsed.account ?? parsed;
          } catch {
            // Backend respondeu string → cria fallback
            createdAccount = {
              _id: Math.random().toString(36).slice(2),
              name: clientName.trim(),
              isOpen: true,
            };
          }

          return {
            ...currentData,
            account: [...(currentData?.account || []), createdAccount],
          };
        },
        { revalidate: true }
      );

      // ✅ FECHA SEMPRE NO SUCESSO
      toast.success(
        `Conta criada para ${clientName.trim()}`,
        "Cliente cadastrado com sucesso!"
      );
      handleClose();
    } catch (err) {
      console.error("Erro ao criar cliente:", err);
      const errorMessage = "Não foi possível criar a conta. Tente novamente.";
      setError(errorMessage);
      toast.error(errorMessage, "Erro ao cadastrar cliente");
    } finally {
      setCreating(false);
    }
  }

  if (!isOpen) return null;

  return createPortal(
    <ModelDefaultDialog
      title_dialog="Cadastrar cliente"
      info_dialog="Informe o nome do cliente para abrir uma nova conta."
    >
      <div className="flex flex-col gap-5">
        {/* INPUT */}
        <Input
          id="client_name"
          autoFocus
          value={clientName}
          label="Nome do cliente"
          placeholder="Ex: João da Silva"
          onChange={(e) => setClientName(e.target.value)}
          disabled={creating}
        />

        {/* ERROR */}
        {error && (
          <p className="text-sm text-destructive font-medium">{error}</p>
        )}

        {/* ACTIONS */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="bordered"
            onPress={handleClose}
            disabled={creating}
            className="w-full rounded-xl"
          >
            Cancelar
          </Button>

          <Button
            onClick={createAccountClient}
            disabled={creating || !clientName.trim()}
            className="
              w-full rounded-xl
              bg-primary text-primary-foreground
              font-semibold
              hover:bg-primary/90
              disabled:opacity-70 disabled:cursor-not-allowed
              transition
            "
          >
            {creating ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Criando...
              </span>
            ) : (
              "Criar conta"
            )}
          </Button>
        </div>
      </div>
    </ModelDefaultDialog>,
    document.body
  );
};

export default AddClientDialog;
