import type { Metadata } from "next";
import WLLTool from "@/components/wll/WLLTool";

export const metadata: Metadata = {
  title: "WLL & Sling Calculator — United Mekong JSC",
  description:
    "Size a lifting sling by load weight and look up multi-leg sling WLL by angle. Grade 1960 · EN 13414 · DNVGL-ST-E271.",
};

export default function WllToolPage() {
  return <WLLTool />;
}
