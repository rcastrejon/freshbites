"use client";

import { usePinnedStore } from "@/hooks/use-pinned";
import { Recipe } from "@/lib/db/types";

export function PinButton({
  recipe,
  children,
  ...props
}: React.PropsWithChildren<{ recipe: Recipe }>) {
  const togglePinned = usePinnedStore((state) => state.togglePinned);
  const isPinned = usePinnedStore((state) => state.isPinned(recipe.id));

  function handleClick() {
    const recipeToPin = {
      id: recipe.id,
      title: recipe.title,
      pinnedAt: Date.now(),
    };
    togglePinned(recipeToPin);
  }

  return (
    <button onClick={handleClick} data-pinned={isPinned} {...props}>
      {children}
    </button>
  );
}
