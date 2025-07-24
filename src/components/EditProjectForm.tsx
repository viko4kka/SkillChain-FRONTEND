"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useProjectUpdateDataById } from "@/hooks/useProjectUpdateDataById";
import { AddProject, Project } from "@/types";
import Button from "./Button";

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

  const { register, handleSubmit, reset } = useForm<AddProject>({
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

    try {
      editProjectDataById({
        id: initialData.id,
        updatedData: {
          projectName: data.projectName,
          description: data.description,
          githubLink: data.githubLink,
          websiteLink: data.websiteLink,
        },
      });
    } catch (error) {
      console.error(error);
    }

    onCloseModal?.();
  }

  return (
    <div className="flex h-full w-full flex-col px-4">
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
              })}
              placeholder="Enter project name"
              className="text-dark-text w-full bg-transparent p-2 text-sm focus:outline-none"
            />
          </div>
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
              })}
              placeholder="Enter description"
              rows={4}
              className="text-dark-text h-[50px] max-h-[120px] w-full resize-y bg-transparent p-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="group flex w-full flex-col items-start">
          <label className="text-dark-text group-focus-within:text-mainBlue mb-1 text-sm transition-colors duration-300">
            Github Link
          </label>
          <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
            <input
              type="url"
              disabled={isLoading}
              {...register("githubLink")}
              placeholder="Enter github link"
              className="text-dark-text w-full bg-transparent p-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="group flex w-full flex-col items-start">
          <label className="text-dark-text group-focus-within:text-mainBlue mb-1 text-sm transition-colors duration-300">
            Website Link
          </label>
          <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
            <input
              type="url"
              disabled={isLoading}
              {...register("websiteLink")}
              placeholder="Enter website link"
              className="text-dark-text w-full bg-transparent p-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="my-2 flex flex-row justify-end gap-x-2">
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

export default EditProjectForm;
