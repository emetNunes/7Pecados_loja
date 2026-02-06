import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { Button, Select, SelectItem } from "@heroui/react";
import { mutate } from "swr";

import Input from "../Input";
import ModelDefaultDialog from "../ModelDefaultDialog";
import { useToast } from "@/contexts/ToastContext";

/* ================================
   ENUMS — BACKEND SAFE
================================ */
const CATEGORY_OPTIONS = ["Fruta", "Borda", "acompanhamento", "Sabor", "outro"];
const MEASUREMENT_OPTIONS = ["unit", "kg", "g", "l", "ml"];

export default function AddIngredientDialog({ isOpen, handleClose }) {
  /* ================================
     STATE
  ================================ */
  const [name, setName] = useState("");
  const [category, setCategory] = useState("outro");
  const [measurement, setMeasurement] = useState("unit");
  const [unitCost, setUnitCost] = useState("");
  const [currentStock, setCurrentStock] = useState("");
  const [creating, setCreating] = useState(false);

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const toast = useToast();

  /* ================================
     RESET AO FECHAR
  ================================ */
  useEffect(() => {
    if (!isOpen) {
      setName("");
      setCategory("outro");
      setMeasurement("unit");
      setUnitCost("");
      setCurrentStock("");
      setErrors({});
      setFormError("");
      setCreating(false);
    }
  }, [isOpen]);

  /* ================================
     VALIDATION
  ================================ */
  function validateForm() {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Informe o nome do ingrediente.";
    }

    if (!CATEGORY_OPTIONS.includes(category)) {
      newErrors.category = "Categoria inválida.";
    }

    if (!MEASUREMENT_OPTIONS.includes(measurement)) {
      newErrors.measurement = "Unidade de medida inválida.";
    }

    if (unitCost !== "" && Number(unitCost) < 0) {
      newErrors.unitCost = "O custo não pode ser negativo.";
    }

    if (currentStock !== "" && Number(currentStock) < 0) {
      newErrors.currentStock = "O estoque não pode ser negativo.";
    }

    setErrors(newErrors);
    setFormError(
      Object.keys(newErrors).length
        ? "Corrija os campos destacados antes de continuar."
        : ""
    );

    return Object.keys(newErrors).length === 0;
  }

  /* ================================
     SAVE
  ================================ */
  async function handleSave() {
    if (!validateForm()) return;

    setCreating(true);

    const payload = {
      name: name.trim(),
      category,
      measurement,
      unitCost: Number(unitCost) || 0,
      currentStock: Number(currentStock) || 0,
    };

    try {
      await mutate(
        "https://api-7pecados.onrender.com/admin/stock/ingredients/historic",
        async (currentData) => {
          const res = await fetch(
            "https://api-7pecados.onrender.com/admin/stock/ingredient",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          );

          if (!res.ok) throw new Error("Erro ao criar ingrediente");

          const created = await res.json();

          return {
            ...currentData,
            ingredient: [
              ...(currentData?.ingredient || []),
              created.ingredient ?? created,
            ],
          };
        },
        { revalidate: true }
      );

      toast.success(
        `${name.trim()} cadastrado com sucesso`,
        "Ingrediente adicionado ao estoque"
      );
      handleClose();
    } catch (err) {
      console.error("Erro ao criar ingrediente:", err);
      const errorMessage = "Ocorreu um erro ao salvar. Tente novamente.";
      setFormError(errorMessage);
      toast.error(errorMessage, "Erro ao cadastrar ingrediente");
    } finally {
      setCreating(false);
    }
  }

  if (!isOpen) return null;

  return createPortal(
    <ModelDefaultDialog
      title_dialog="Adicionar ingrediente"
      info_dialog="Cadastre um novo ingrediente para controle de estoque"
    >
      <div className="flex flex-col gap-6">
        {/* ALERTA GLOBAL */}
        {formError && (
          <div
            className="
              rounded-lg px-4 py-3 text-sm font-medium
              bg-red-50 text-red-700
              dark:bg-red-900/30 dark:text-red-300
            "
          >
            {formError}
          </div>
        )}

        {/* NOME */}
        <Input
          autoFocus
          label="Nome do ingrediente"
          placeholder="Ex: Morango"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: null }));
          }}
          disabled={creating}
          error={!!errors.name}
          helperText={errors.name}
        />

        {/* CATEGORIA + MEDIDA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Categoria"
            selectedKeys={[category]}
            onSelectionChange={(keys) => {
              setCategory(Array.from(keys)[0]);
              setErrors((prev) => ({ ...prev, category: null }));
            }}
            disabled={creating}
          >
            {CATEGORY_OPTIONS.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </Select>

          <Select
            label="Unidade de medida"
            selectedKeys={[measurement]}
            onSelectionChange={(keys) => {
              setMeasurement(Array.from(keys)[0]);
              setErrors((prev) => ({ ...prev, measurement: null }));
            }}
            disabled={creating}
          >
            {MEASUREMENT_OPTIONS.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* VALORES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Custo unitário"
            placeholder="0,00"
            inputMode="decimal"
            value={unitCost}
            onChange={(e) => {
              setUnitCost(e.target.value.replace(",", "."));
              setErrors((prev) => ({ ...prev, unitCost: null }));
            }}
            disabled={creating}
            error={!!errors.unitCost}
            helperText={errors.unitCost}
          />

          <Input
            label="Estoque inicial"
            placeholder="0"
            inputMode="numeric"
            value={currentStock}
            onChange={(e) => {
              setCurrentStock(e.target.value.replace(/\D/g, ""));
              setErrors((prev) => ({ ...prev, currentStock: null }));
            }}
            disabled={creating}
            error={!!errors.currentStock}
            helperText={errors.currentStock}
          />
        </div>

        {/* ACTIONS */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="bordered"
            onPress={handleClose}
            disabled={creating}
            className="
              w-full rounded-xl
              border-default-300 dark:border-zinc-700
              hover:bg-default-100 dark:hover:bg-zinc-800
            "
          >
            Cancelar
          </Button>

          <Button
            onClick={handleSave}
            isLoading={creating}
            disabled={creating}
            className="
              w-full rounded-xl
              bg-primary text-primary-foreground
              font-semibold
              hover:bg-primary/90
            "
          >
            Salvar ingrediente
          </Button>
        </div>
      </div>
    </ModelDefaultDialog>,
    document.body
  );
}
