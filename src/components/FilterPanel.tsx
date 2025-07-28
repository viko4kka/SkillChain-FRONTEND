
import React from "react";
import Select from "./Select";

export default function FilterPanel() {
  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-y-2 md:flex-row md:items-center md:gap-x-4">
      <Select />
    </div>
  );
}
