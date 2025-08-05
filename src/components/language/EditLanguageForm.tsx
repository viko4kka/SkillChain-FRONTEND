"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProjectUpdateDataById } from "@/hooks/useProjectUpdateDataById";
import { AddLanguageInput, AddProject, EditLanguage } from "@/types";
import Button from "../Button";
import { FiX } from "react-icons/fi";
import { useLanguageUpdateDataById } from "@/hooks/useLanguageUpdateDataById";

interface UpdateLanguageInput {
  onCloseModal?: () => void;
  initialData?: {
    id: number;
    name: string;
    description: string | null;
  };
}

function EditLanguageForm({ onCloseModal, initialData }: UpdateLanguageInput) {
  const { editLanguageDataById, isLoading } = useLanguageUpdateDataById();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddLanguageInput>({
    defaultValues: {
      description: initialData?.description || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        description: initialData.description,
      });
    }
  }, [initialData, reset]);

  function onSubmit(data: EditLanguage) {
    if (!initialData?.id) {
      console.error("Initial data ID is missing");
      return;
    }

    const updatedData = {
      description: data.description,
    };

    editLanguageDataById(
      {
        id: initialData.id,
        updatedData,
      },
      {
        onSuccess: () => {
          onCloseModal?.();
        },
      },
    );
  }

  return (
    <div className="flex h-full w-full flex-col px-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-dark-text text-xl font-bold md:text-2xl">
          Edit language
        </h2>
        <button
          onClick={onCloseModal}
          className="text-lg text-gray-500 hover:text-gray-700"
          aria-label="Zamknij modal"
        >
          <FiX
            size={24}
            className="text-dark-text hover:text-mainBlue transition-all duration-300"
          />
        </button>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 flex flex-col gap-y-3"
      >
        <textarea
          {...register("description", { required: "Description is required" })}
          className={`textarea ${errors.description ? "textarea-error" : ""}`}
          placeholder="Description"
        />
        <div className="flex flex-row gap-x-2">
          <Button
            type="button"
            onClick={() => onCloseModal?.()}
            variant="secondary"
            size="md"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            variant="primary"
            size="md"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default EditLanguageForm;
