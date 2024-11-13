"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock,
  Utensils,
  Plus,
  X,
  Coins,
  Image as ImageIcon,
  UploadIcon,
} from "lucide-react";
import Form from "next/form";
import { createRecipe } from "./actions";
import { useState, useRef, useActionState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

function DynamicField({ mode }: { mode: "ingredients" | "instructions" }) {
  const [fields, setFields] = useState<string[]>([""]);
  const label = mode === "ingredients" ? "Ingredientes" : "Instrucciones";

  const handleAdd = () => {
    setFields([...fields, ""]);
  };

  const handleRemove = (index: number) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index] = value;
    setFields(newFields);
  };

  return (
    <div className="space-y-2">
      <Label className="font-semibold">{label}</Label>
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={index} className="flex gap-2">
            {mode === "ingredients" ? (
              <Input
                name={mode}
                value={field}
                onChange={(e) => handleChange(index, e.target.value)}
                required
                className="border-input bg-background"
              />
            ) : (
              <Textarea
                name={mode}
                value={field}
                onChange={(e) => handleChange(index, e.target.value)}
                required
                className="border-input bg-background"
                onKeyDown={(e) => {
                  if (e.key === "Enter") e.preventDefault();
                }}
              />
            )}
            {fields.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => handleRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleAdd}
      >
        <Plus className="mr-2 h-4 w-4" />
        Agregar {mode === "ingredients" ? "ingrediente" : "instrucción"}
      </Button>
    </div>
  );
}

export function CreateRecipeForm() {
  const [state, formAction] = useActionState<{ error?: string }, FormData>(
    async (_prevState, formData) => {
      const result = await createRecipe(formData);
      return result;
    },
    {},
  );

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedImage(file);
  };

  return (
    <Form className="space-y-4" action={formAction}>
      {state.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="title" className="font-semibold">
          Título
        </Label>
        <Input
          id="title"
          name="title"
          required
          className="border-input bg-background"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="font-semibold">
          Descripción
        </Label>
        <Textarea
          id="description"
          name="description"
          required
          className="border-input bg-background"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="timeInMinutes"
          className="flex items-center font-semibold"
        >
          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
          Tiempo de preparación (minutos)
        </Label>
        <Input
          id="timeInMinutes"
          name="timeInMinutes"
          type="number"
          required
          min="1"
          className="border-input bg-background"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="servings" className="flex items-center font-semibold">
            <Utensils className="mr-2 h-4 w-4 text-muted-foreground" />
            Porciones
          </Label>
          <Input
            id="servings"
            name="servings"
            type="number"
            required
            min="1"
            className="border-input bg-background"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cost" className="flex items-center font-semibold">
            <Coins className="mr-2 h-4 w-4 text-muted-foreground" />
            Costo estimado (MXN)
          </Label>
          <Input
            id="cost"
            name="cost"
            type="number"
            required
            min="1"
            step="0.01"
            className="border-input bg-background"
          />
        </div>
      </div>

      <DynamicField mode="ingredients" />
      <DynamicField mode="instructions" />

      <div className="space-y-2">
        <Label htmlFor="image" className="flex items-center font-semibold">
          Imagen del platillo
        </Label>
        <input
          ref={fileInputRef}
          id="image"
          name="image"
          type="file"
          required
          accept="image/jpeg"
          className="hidden"
          onChange={handleFileSelect}
        />
        <div
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer rounded-lg border-2 border-dashed border-input p-4 transition-colors hover:bg-accent/50"
        >
          {selectedImage ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {selectedImage.name}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-4 text-sm text-muted-foreground">
              <UploadIcon className="mb-2 h-8 w-8" />
              <p>Haz clic para seleccionar una imagen</p>
              <p className="text-xs">o arrastra y suelta aquí</p>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4">
        <Button className="w-full" variant="default">
          Crear receta
        </Button>
      </div>
    </Form>
  );
}
