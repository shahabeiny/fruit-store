import PanelLayout from "@/components/layouts/PanelLayout/PanelLayout";
import React from "react";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: {
      absolute: "پنل",
      default: "پنل",
      template: "پنل | %s",
    },
  };
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return <PanelLayout>{children}</PanelLayout>;
};

export default layout;
