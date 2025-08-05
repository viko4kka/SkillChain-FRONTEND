"use client";
import useLanguagePost from "@/hooks/useLanguagePost";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import AddLanguageModal from "./AddLanguageModal";

export default function AddLanguage({
  onLanguageAdded,
}: {
  onLanguageAdded?: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addLanguageInput } = useLanguagePost();

  const handleAddLanguage = (data: any) => {
    addLanguageInput(data, {
      onSuccess: () => {
        setIsModalOpen(false);
        if (onLanguageAdded) onLanguageAdded();
      },
    });
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer border-none bg-transparent p-0"
        aria-label="Dodaj projekt"
      >
        <FiPlus className="text-mainBlue text-lg sm:text-xl lg:text-2xl" />
      </button>

      <AddLanguageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddLanguage}
      />
    </div>
  );
}