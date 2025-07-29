"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProjectUpdateDataById } from "@/hooks/useProjectUpdateDataById";
import { AddProject } from "@/types";
import Button from "./Button";
import { FiX } from "react-icons/fi";
import { useProjectDelete } from "@/hooks/useProjectDelete";

interface UpdateProjectInput {
  onCloseModal?: () => void;
  initialData?: {
    id: number;
    projectName: string;
    description: string;
    githubLink: string;
    websiteLink: string;
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
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        projectName: initialData.projectName,
        description: initialData.description,
        githubLink: initialData.githubLink,
        websiteLink: initialData.websiteLink,
      });
    }
  }, [initialData, reset]);

  function onSubmit(data: AddProject) {
    if (!initialData?.id) {
      console.error("Initial data ID is missing");
      return;
    }

    // Zamiana pustych stringów na undefined
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
            Project name
          </label>
          <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
            <input
              type="text"
              disabled={isLoading}
              {...register("projectName", {
                required: "This field is required",
                minLength: {
                  value: 3,
                  message: "Project name must be at least 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Project name must be at most 50 characters",
                },
              })}
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
            Description
          </label>
          <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
            <textarea
              disabled={isLoading}
              {...register("description", {
                required: "This field is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
                maxLength: {
                  value: 500,
                  message: "Description must be at most 500 characters",
                },
              })}
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
              {...register("githubLink", {
                validate: (value) =>
                  !value ||
                  value.startsWith("https://github.com/") ||
                  "Github link must start with https://github.com/",
                maxLength: {
                  value: 100,
                  message: "Github link must be at most 100 characters",
                },
              })}
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
              {...register("websiteLink", {
                pattern: {
                  value:
                    /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/,
                  message: "Website link must be a valid URL",
                },
                maxLength: {
                  value: 100,
                  message: "Website link must be at most 100 characters",
                },
              })}
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
