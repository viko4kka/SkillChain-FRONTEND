"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { AddLanguageInput, EditLanguage } from "@/types";
import Button from "../Button";
import { FiX } from "react-icons/fi";
import { useLanguageUpdateDataById } from "@/hooks/useLanguageUpdateDataById";
import { useLanguageDelete } from "@/hooks/useLanguageDelete";
import { descriptionValidation } from "@/utils/languageValidation";

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
  const { deleteLanguage, isLoading: isDeleting } = useLanguageDelete();

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

  async function handleDeleteLanguage() {
    if (!initialData?.id) {
      console.error("Initial data ID is missing");
      return;
    }
    const success = await deleteLanguage(initialData.id);
    if (success) {
      onCloseModal?.();
    }
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
        <div className="group flex w-full flex-col items-start">
          <label className="text-dark-text group-focus-within:text-mainBlue mb-1 text-sm transition-colors duration-300">
            Description
          </label>
          <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
            <textarea
              {...register("description", descriptionValidation)}
              className="text-dark-text h-[50px] max-h-[120px] w-full resize-y bg-transparent p-2 text-sm focus:outline-none"
              placeholder="Description"
            />
          </div>
          {errors.description && (
            <span className="mt-1 text-xs text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>
        <div className="my-2 flex flex-row items-center justify-between gap-x-2">
          <button
            type="button"
            className="text-mainBlue text-sm font-semibold hover:underline"
            disabled={isLoading || isDeleting}
            onClick={handleDeleteLanguage}
          >
            Delete language
          </button>
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
        </div>
      </form>
    </div>
  );
}

export default EditLanguageForm;
