import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

import Input from "../Input";
import ModelDefaultDialog from "../ModelDefaultDialog";

import {
  Button,
  Textarea,
  Select,
  SelectItem,
  NumberInput,
} from "@heroui/react";

const fetcher = (url) => fetch(url).then((res) => res.json());

const PRODUCT_SIZES = ["P", "M", "G"];
const PRODUCT_CATEGORIES = ["taças", "doces", "tortas", "bebidas", "outros"];

export default function AddProductDialog({ isOpen, handleClose }) {
  /* ================================
     STATE
  ================================ */
  const [step, setStep] = useState(0);
  const [creating, setCreating] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");

  const [sizes, setSizes] = useState([]);
  const [prices, setPrices] = useState({});
  const [ingredients, setIngredients] = useState([]);

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  /* ================================
     DATA
  ================================ */
  const { data } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/ingredients/historic",
    fetcher
  );

  const ingredientList = data?.ingredient ?? [];

  /* ================================
     RESET AO FECHAR
  ================================ */
  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      setCreating(false);
      setName("");
      setCategory(null);
      setDescription("");
      setSizes([]);
      setPrices({});
      setIngredients([]);
      setErrors({});
      setFormError("");
    }
  }, [isOpen]);

  /* ================================
     DERIVADOS
  ================================ */
  const formattedPrices = useMemo(
    () =>
      sizes.map((s) => ({
        size: s,
        value: Number(prices[s] || 0),
      })),
    [sizes, prices]
  );

  /* ================================
     VALIDATION
  ================================ */
  function validateStep1() {
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Informe o nome do produto.";
    if (!description.trim())
      newErrors.description = "Informe a descrição do produto.";
    if (!category) newErrors.category = "Selecione uma categoria.";
    if (sizes.length === 0) newErrors.sizes = "Selecione ao menos um tamanho.";

    sizes.forEach((s) => {
      if (!prices[s] || Number(prices[s]) <= 0) {
        newErrors[`price_${s}`] =
          `Informe um preço válido para o tamanho ${s}.`;
      }
    });

    setErrors(newErrors);
    setFormError(
      Object.keys(newErrors).length
        ? "Preencha corretamente os campos antes de continuar."
        : ""
    );

    return Object.keys(newErrors).length === 0;
  }

  function validateStep2() {
    if (!ingredients.length) {
      setFormError("Selecione ao menos um ingrediente.");
      return false;
    }

    setFormError("");
    return true;
  }

  /* ================================
     SAVE
  ================================ */
  async function handleSave() {
    if (!validateStep2()) return;

    setCreating(true);

    const payload = {
      name: name.trim(),
      category,
      description,
      prices: formattedPrices,
      ingredient: ingredients,
      priceCost: 0,
    };

    try {
      await mutate(
        "https://api-7pecados.onrender.com/admin/stock/products/historic",
        async () => {
          const res = await fetch(
            "https://api-7pecados.onrender.com/admin/stock/product",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          );

          if (!res.ok) throw new Error("Erro ao criar produto");

          return res.json();
        },
        { revalidate: true }
      );

      handleClose();
    } catch (err) {
      console.error("Erro ao criar produto:", err);
      setFormError("Erro ao salvar produto. Tente novamente.");
    } finally {
      setCreating(false);
    }
  }

  if (!isOpen) return null;

  return createPortal(
    <ModelDefaultDialog
      title_dialog="Novo produto"
      info_dialog={
        step === 0
          ? "Informações básicas e preços"
          : "Ingredientes utilizados no produto"
      }
    >
      <div className="flex flex-col gap-8">
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

        {/* STEPPER */}
        <div className="flex items-center gap-2 text-sm text-default-500">
          <span className={`font-semibold ${step === 0 ? "text-primary" : ""}`}>
            1. Produto
          </span>
          <span>→</span>
          <span className={`font-semibold ${step === 1 ? "text-primary" : ""}`}>
            2. Ingredientes
          </span>
        </div>

        {/* =========================
            STEP 1
        ========================= */}
        {step === 0 && (
          <div className="flex flex-col gap-6">
            <Input
              autoFocus
              label="Nome do produto"
              placeholder="Ex: Taça Inveja"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((p) => ({ ...p, name: null }));
              }}
              error={!!errors.name}
              helperText={errors.name}
            />

            <Textarea
              label="Descrição"
              placeholder="Descreva o produto para o cliente"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setErrors((p) => ({ ...p, description: null }));
              }}
              error={!!errors.description}
              helperText={errors.description}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                selectionMode="multiple"
                label="Tamanhos disponíveis"
                selectedKeys={sizes}
                onSelectionChange={(keys) => {
                  setSizes(Array.from(keys));
                  setErrors((p) => ({ ...p, sizes: null }));
                }}
                isInvalid={!!errors.sizes}
                errorMessage={errors.sizes}
              >
                {PRODUCT_SIZES.map((s) => (
                  <SelectItem key={s}>{s}</SelectItem>
                ))}
              </Select>

              <Select
                label="Categoria"
                selectedKeys={category ? [category] : []}
                onSelectionChange={(keys) => {
                  setCategory(Array.from(keys)[0]);
                  setErrors((p) => ({ ...p, category: null }));
                }}
                isInvalid={!!errors.category}
                errorMessage={errors.category}
              >
                {PRODUCT_CATEGORIES.map((c) => (
                  <SelectItem key={c}>{c}</SelectItem>
                ))}
              </Select>
            </div>

            {sizes.length > 0 && (
              <div className="rounded-xl border border-dashed border-default-300 dark:border-zinc-700 p-4">
                <p className="text-sm font-semibold text-primary mb-3">
                  Preços por tamanho
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {sizes.map((s) => (
                    <NumberInput
                      key={s}
                      label={`Preço (${s})`}
                      minValue={0}
                      step={0.5}
                      value={prices[s] ?? ""}
                      startContent={
                        <span className="text-default-500">R$</span>
                      }
                      onValueChange={(value) => {
                        setPrices((prev) => ({ ...prev, [s]: value }));
                        setErrors((p) => ({ ...p, [`price_${s}`]: null }));
                      }}
                      isInvalid={!!errors[`price_${s}`]}
                      errorMessage={errors[`price_${s}`]}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================
            STEP 2
        ========================= */}
        {step === 1 && (
          <Select
            selectionMode="multiple"
            label="Ingredientes"
            placeholder="Selecione os ingredientes utilizados"
            selectedKeys={ingredients.map((i) => i.id_ingredient)}
            onSelectionChange={(keys) => {
              setIngredients(
                Array.from(keys).map((id) => ({
                  id_ingredient: id,
                  quantityUsed: 1,
                }))
              );
              setFormError("");
            }}
          >
            {ingredientList.map((i) => (
              <SelectItem key={i._id}>{i.name}</SelectItem>
            ))}
          </Select>
        )}

        {/* ACTIONS */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="bordered"
            onPress={() => (step === 0 ? handleClose() : setStep(0))}
            className="
              w-full rounded-xl
              border-default-300 dark:border-zinc-700
              hover:bg-default-100 dark:hover:bg-zinc-800
            "
          >
            {step === 0 ? "Cancelar" : "Voltar"}
          </Button>

          <Button
            onPress={() =>
              step === 0 ? validateStep1() && setStep(1) : handleSave()
            }
            isLoading={creating}
            className="
              w-full rounded-xl
              bg-primary text-primary-foreground
              font-semibold
              hover:bg-primary/90
            "
          >
            {step === 0 ? "Continuar" : "Salvar produto"}
          </Button>
        </div>
      </div>
    </ModelDefaultDialog>,
    document.body
  );
}
