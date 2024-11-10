import { Suspense } from "react";
import ChildrenWrapper from "./children-wrapper";

export default function Layout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <h3 className="mb-3 border-b-2 border-b-foreground pb-1 font-header text-2xl font-bold">
        Recetas
      </h3>
      <Suspense>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </Suspense>
    </div>
  );
}
