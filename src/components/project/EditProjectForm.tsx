"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProjectUpdateDataById } from "@/hooks/useProjectUpdateDataById";
import { AddProject } from "@/types";
import Button from "../Button";
import { FiX } from "react-icons/fi";
import { useProjectDelete } from "@/hooks/useProjectDelete";
import {
  projectNameValidation,
  descriptionValidation,
  githubLinkValidation,
  websiteLinkValidation,
} from "@/utils/projectValidation";

interface UpdateProjectInput {
  onCloseModal?: () => void;
  initialData?: {
    id: number;
    projectName: string;
    description: string;
    githubLink: string;
    websiteLink: string;
    startDate: string;
    endDate: string | null;
  };
}

function EditProjectForm({ onCloseModal, initialData }: UpdateProjectInput) {
  const { editProjectDataById, isLoading } = useProjectUpdateDataById();
  const { deleteProject, isLoading: isDeleting } = useProjectDelete();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddProject>({
    defaultValues: {
      projectName: initialData?.projectName || "",
      description: initialData?.description || "",
      githubLink: initialData?.githubLink || "",
      websiteLink: initialData?.websiteLink || "",
      startDate: initialData?.startDate
        ? initialData.startDate.slice(0, 10)
        : "",
      endDate: initialData?.endDate ? initialData.endDate.slice(0, 10) : "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        projectName: initialData.projectName,
        description: initialData.description,
        githubLink: initialData.githubLink,
        websiteLink: initialData.websiteLink,
        startDate: initialData.startDate
          ? initialData.startDate.slice(0, 10)
          : "",
        endDate: initialData.endDate ? initialData.endDate.slice(0, 10) : "",
      });
    }
  }, [initialData, reset]);

  function onSubmit(data: AddProject) {
    if (!initialData?.id) {
      console.error("Initial data ID is missing");
      return;
    }

    const updatedData = {
      projectName: data.projectName,
      description: data.description,
      githubLink:
        !data.githubLink || data.githubLink.trim() === ""
          ? undefined
          : data.githubLink,
      websiteLink:
        !data.websiteLink || data.websiteLink.trim() === ""
          ? undefined
          : data.websiteLink,
      startDate: new Date(data.startDate).toISOString(),
      endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
    };

    editProjectDataById(
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

  async function handleDeleteProject() {
    if (!initialData?.id) {
      console.error("Initial data ID is missing");
      return;
    }
    const success = await deleteProject(initialData.id);
    if (success) {
      onCloseModal?.();
    }
  }

  return (
    <div className="flex h-full w-full flex-col px-4">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-dark-text text-xl font-bold md:text-2xl">
          Edit project
        </h2>
        <button
          onClick={onCloseModal}
          className="text-lg text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
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
            Project name
          </label>
          <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
            <input
              type="text"
              disabled={isLoading}
              {...register("projectName", projectNameValidation)}
              placeholder="Enter project name"
              className="text-dark-text w-full bg-transparent p-2 text-sm focus:outline-none"
            />
          </div>
          {errors.projectName && (
            <span className="mt-1 text-xs text-red-500">
              {errors.projectName.message}
            </span>
          )}
        </div>

        <div className="group flex w-full flex-col items-start">
          <label className="text-dark-text group-focus-within:text-mainBlue mb-1 text-sm transition-colors duration-300">
            Start date <span className="text-red-500">*</span>
          </label>
          <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
            <input
              type="date"
              disabled={isLoading}
              {...register("startDate", { required: "Start date is required" })}
              className="text-dark-text w-full bg-transparent p-2 text-sm focus:outline-none"
            />
          </div>
          {errors.startDate && (
            <span className="mt-1 text-xs text-red-500">
              {errors.startDate.message}
            </span>
          )}
        </div>
        <div className="group flex w-full flex-col items-start">
          <label className="text-dark-text group-focus-within:text-mainBlue mb-1 text-sm transition-colors duration-300">
            End date
          </label>
          <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
            <input
              type="date"
              disabled={isLoading}
              {...register("endDate")}
              className="text-dark-text w-full bg-transparent p-2 text-sm focus:outline-none"
            />
          </div>
          {errors.endDate && (
            <span className="mt-1 text-xs text-red-500">
              {errors.endDate.message}
            </span>
          )}
        </div>

        <div className="group flex w-full flex-col items-start">
          <label className="text-dark-text group-focus-within:text-mainBlue mb-1 text-sm transition-colors duration-300">
            Description
          </label>
          <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
            <textarea
              disabled={isLoading}
              {...register("description", descriptionValidation)}
              placeholder="Enter description"
              rows={4}
              className="text-dark-text h-[50px] max-h-[120px] w-full resize-y bg-transparent p-2 text-sm focus:outline-none"
            />
          </div>
          {errors.description && (
            <span className="mt-1 text-xs text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="group flex w-full flex-col items-start">
          <label className="text-dark-text group-focus-within:text-mainBlue mb-1 text-sm transition-colors duration-300">
            Github URL
          </label>
          <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
            <input
              type="url"
              disabled={isLoading}
              {...register("githubLink", githubLinkValidation)}
              placeholder="Enter github link"
              className="text-dark-text w-full bg-transparent p-2 text-sm focus:outline-none"
            />
          </div>
          {errors.githubLink && (
            <span className="mt-1 text-xs text-red-500">
              {errors.githubLink.message}
            </span>
          )}
        </div>

        <div className="group flex w-full flex-col items-start">
          <label className="text-dark-text group-focus-within:text-mainBlue mb-1 text-sm transition-colors duration-300">
            Website URL
          </label>
          <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
            <input
              type="url"
              disabled={isLoading}
              {...register("websiteLink", websiteLinkValidation)}
              placeholder="Enter website link"
              className="text-dark-text w-full bg-transparent p-2 text-sm focus:outline-none"
            />
          </div>
          {errors.websiteLink && (
            <span className="mt-1 text-xs text-red-500">
              {errors.websiteLink.message}
            </span>
          )}
        </div>

        <div className="my-2 flex flex-row items-center justify-between gap-x-2">
          <button
            type="button"
            className="text-mainBlue text-sm font-semibold hover:underline"
            disabled={isLoading || isDeleting}
            onClick={handleDeleteProject}
          >
            Delete project
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

export default EditProjectForm;
