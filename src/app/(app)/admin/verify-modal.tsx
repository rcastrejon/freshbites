"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Check, Plus, X } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { verifyRecipe } from "./actions";

type Props = {
  children: React.ReactNode;
  recipeId: string;
};

type Fact = {
  key: string;
  value: string;
  unit: string;
};

export function VerifyModal({ children, recipeId }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [facts, setFacts] = useState<Fact[]>([
    { key: "", value: "", unit: "" },
  ]);

  const handleFactChange = (
    index: number,
    field: keyof Fact,
    value: string,
  ) => {
    setFacts((prev) =>
      prev.map((f, idx) => (idx === index ? { ...f, [field]: value } : f)),
    );
  };

  const handleAddFact = () => {
    setFacts((prev) => [...prev, { key: "", value: "", unit: "" }]);
  };

  const handleDeleteFact = (index: number) => {
    if (facts.length <= 1) return;
    setFacts((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      const validFacts = facts.filter((f) => f.key && f.value && f.unit);
      await verifyRecipe(recipeId, validFacts);
      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Verificar receta</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Información nutricional</h4>
            {facts.map((fact, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  placeholder="Nombre"
                  value={fact.key}
                  onChange={(e) => handleFactChange(i, "key", e.target.value)}
                />
                <Input
                  placeholder="Valor"
                  value={fact.value}
                  onChange={(e) => handleFactChange(i, "value", e.target.value)}
                />
                <Input
                  placeholder="Unidad"
                  value={fact.unit}
                  onChange={(e) => handleFactChange(i, "unit", e.target.value)}
                />
                {facts.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteFact(i)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" onClick={handleAddFact}>
            <Plus className="mr-2 h-4 w-4" />
            Agregar dato
          </Button>

          <div className="flex justify-end">
            <Button onClick={handleVerify} disabled={loading}>
              <Check className="mr-2 h-4 w-4" />
              {loading ? "Verificando..." : "Verificar receta"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
