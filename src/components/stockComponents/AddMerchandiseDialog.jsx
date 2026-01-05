import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";

import Input from "../Input";
import ModelDefaultDialog from "../ModelDefaultDialog";
import { Button, Select, SelectItem } from "@heroui/react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function AddMerchandiseDialog({ isOpen, handleClose }) {
  /* ================================
     STATE
  ================================ */
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);

  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");

  /* ================================
     DATA
  ================================ */
  const { data } = useSWR(
    "https://api-7pecados.onrender.com/admin/stock/ingredients/historic",
    fetcher
  );

  const ingredients = Array.isArray(data?.ingredient) ? data.ingredient : [];

  /* ================================
     RESET
  ================================ */
  useEffect(() => {
    if (!isOpen) {
      setLocation("");
      setDate("");
      setItems([]);
      setSaving(false);
      setErrors({});
      setFormError("");
    }
  }, [isOpen]);

  /* ================================
     TOTAL
  ================================ */
  const totalValue = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity * item.unitCost, 0),
    [items]
  );

  /* ================================
     VALIDATION
  ================================ */
  function validate() {
    const newErrors = {};

    if (!location.trim()) newErrors.location = "Informe o local da compra.";
    if (!date) newErrors.date = "Informe a data da compra.";
    if (!items.length) newErrors.items = "Selecione ao menos um ingrediente.";

    items.forEach((item) => {
      if (item.quantity < 1) {
        newErrors[`qty_${item.id}`] = "Quantidade inválida.";
      }

      if (item.unitCost < 0) {
        newErrors[`cost_${item.id}`] = "Valor unitário inválido.";
      }
    });

    setErrors(newErrors);
    setFormError(
      Object.keys(newErrors).length
        ? "Corrija os campos destacados antes de salvar."
        : ""
    );

    return Object.keys(newErrors).length === 0;
  }

  /* ================================
     SAVE
  ================================ */
  async function handleSave() {
    if (!validate()) return;

    setSaving(true);

    try {
      const payload = {
        type: "entrace",
        location: location.trim(),
        date: new Date(date).toISOString(),
        totalValue,
        ingredients: items.map((i) => ({
          id_ingredient: i.id,
          quantityChange: i.quantity,
          totalEntrace: i.quantity * i.unitCost,
        })),
      };

      const res = await fetch(
        "https://api-7pecados.onrender.com/admin/stock/inventory",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Erro ao salvar mercadoria");

      handleClose();
    } catch (err) {
      console.error(err);
      setFormError("Erro ao salvar mercadoria. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }

  if (!isOpen) return null;

  return createPortal(
    <ModelDefaultDialog
      title_dialog="Entrada de mercadoria"
      info_dialog="Registre a compra e entrada de ingredientes no estoque"
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

        {/* META */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Local da compra"
            placeholder="Ex: Atacadão, Mercado Central"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setErrors((p) => ({ ...p, location: null }));
            }}
            error={!!errors.location}
            helperText={errors.location}
          />

          <Input
            type="date"
            label="Data da compra"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setErrors((p) => ({ ...p, date: null }));
            }}
            error={!!errors.date}
            helperText={errors.date}
          />
        </div>

        {/* SELECT INGREDIENTS */}
        <Select
          label="Ingredientes"
          selectionMode="multiple"
          selectedKeys={items.map((i) => i.id)}
          placeholder="Selecione os ingredientes"
          onSelectionChange={(keys) => {
            const ids = Array.from(keys);

            setItems((prev) =>
              ids.map((id) => {
                const existing = prev.find((i) => i.id === id);
                if (existing) return existing;

                const ing = ingredients.find((x) => x._id === id);

                return {
                  id,
                  name: ing?.name ?? "",
                  quantity: 1,
                  unitCost: ing?.unitCost ?? 0,
                };
              })
            );

            setErrors((p) => ({ ...p, items: null }));
          }}
          isInvalid={!!errors.items}
          errorMessage={errors.items}
        >
          {ingredients.map((i) => (
            <SelectItem key={i._id}>{i.name}</SelectItem>
          ))}
        </Select>

        {/* TABLE */}
        {items.length > 0 && (
          <div className="overflow-x-auto border rounded-xl border-default-300 dark:border-zinc-700">
            <table className="w-full text-sm">
              <thead className="bg-default-100 dark:bg-zinc-800">
                <tr>
                  <th className="px-4 py-2 text-left">Ingrediente</th>
                  <th className="px-4 py-2 text-center">Qtd</th>
                  <th className="px-4 py-2 text-right">Valor unit.</th>
                  <th className="px-4 py-2 text-right">Total</th>
                </tr>
              </thead>

              <tbody>
                {items.map((item, index) => (
                  <tr
                    key={item.id}
                    className="border-t border-default-200 dark:border-zinc-700"
                  >
                    <td className="px-4 py-2">{item.name}</td>

                    <td className="px-4 py-2 text-center">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => {
                          const v = Math.max(1, Number(e.target.value));
                          setItems((prev) =>
                            prev.map((i, idx) =>
                              idx === index ? { ...i, quantity: v } : i
                            )
                          );
                        }}
                        className="
                          w-16 text-center rounded-lg border bg-background
                          border-default-300 dark:border-zinc-700
                        "
                      />
                    </td>

                    <td className="px-4 py-2 text-right">
                      <input
                        type="number"
                        min={0}
                        step="0.01"
                        value={item.unitCost}
                        onChange={(e) => {
                          const v = Math.max(0, Number(e.target.value));
                          setItems((prev) =>
                            prev.map((i, idx) =>
                              idx === index ? { ...i, unitCost: v } : i
                            )
                          );
                        }}
                        className="
                          w-24 text-right rounded-lg border bg-background
                          border-default-300 dark:border-zinc-700
                        "
                      />
                    </td>

                    <td className="px-4 py-2 text-right font-semibold">
                      R${" "}
                      {(item.quantity * item.unitCost)
                        .toFixed(2)
                        .replace(".", ",")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end px-4 py-3 bg-default-50 dark:bg-zinc-900">
              <span className="font-bold">
                Total: R$ {totalValue.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex gap-3 pt-2">
          <Button variant="bordered" onPress={handleClose} className="w-full">
            Cancelar
          </Button>

          <Button
            onClick={handleSave}
            isLoading={saving}
            className="w-full bg-primary text-primary-foreground font-semibold"
          >
            Salvar entrada
          </Button>
        </div>
      </div>
    </ModelDefaultDialog>,
    document.body
  );
}
