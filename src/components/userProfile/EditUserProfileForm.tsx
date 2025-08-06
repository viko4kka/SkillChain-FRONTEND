"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUserUpdateDataById } from "@/hooks/useUserUpdateDataById";
import Button from "../Button";
import { User } from "./UserFrameInProfilePage";

interface UpdateUserProfileInput {
  onCloseModal?: () => void;
  initialData?: {
    id?: number;
    firstName: string;
    lastName: string;
    job: string;
    gitUrl: string;
    linkedinUrl: string;
    description: string;
  };
}

function EditUserProfileForm({
  onCloseModal,
  initialData,
}: UpdateUserProfileInput) {
  const { editUserDataById, isLoading: isUpdatingUserData } =
    useUserUpdateDataById();

  const { register, handleSubmit, reset } = useForm<User>({
    defaultValues: {
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      job: initialData?.job || "",
      gitUrl: initialData?.gitUrl || "",
      linkedinUrl: initialData?.linkedinUrl || "",
      description: initialData?.description || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        job: initialData.job,
        gitUrl: initialData.gitUrl,
        linkedinUrl: initialData.linkedinUrl,
        description: initialData.description,
      });
    }
  }, [initialData, reset]);

  function onSubmit(data: User) {
    if (!initialData) return;

    if (!initialData.id) return;

    try {
      editUserDataById({
        id: initialData.id,
        updatedData: {
          description: data.description,
          job: data.job,
          gitUrl: data.gitUrl,
          linkedinUrl: data.linkedinUrl,
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
            First name
          </label>
          <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
            <input
              type="text"
              disabled={isUpdatingUserData}
              {...register("firstName", { required: "This field is required" })}
              placeholder="Enter first name"
              className="text-dark-text w-full bg-transparent p-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="group flex w-full flex-col items-start">
          <label className="text-dark-text group-focus-within:text-mainBlue mb-1 text-sm transition-colors duration-300">
            Last name
          </label>
          <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
            <input
              type="text"
              disabled={isUpdatingUserData}
              {...register("lastName", { required: "This field is required" })}
              placeholder="Enter last name"
              className="text-dark-text w-full bg-transparent p-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="group flex w-full flex-col items-start">
          <label className="text-dark-text group-focus-within:text-mainBlue mb-1 text-sm transition-colors duration-300">
            Job
          </label>
          <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
            <input
              type="text"
              disabled={isUpdatingUserData}
              {...register("job")}
              placeholder="Enter job"
              className="text-dark-text w-full bg-transparent p-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="group flex w-full flex-col items-start">
          <label className="text-dark-text group-focus-within:text-mainBlue mb-1 text-sm transition-colors duration-300">
            Git URL
          </label>
          <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
            <input
              type="text"
              disabled={isUpdatingUserData}
              {...register("gitUrl")}
              placeholder="Enter git url"
              className="text-dark-text w-full bg-transparent p-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="group flex w-full flex-col items-start">
          <label className="text-dark-text group-focus-within:text-mainBlue mb-1 text-sm transition-colors duration-300">
            LinkedIn URL
          </label>
          <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
            <input
              type="text"
              disabled={isUpdatingUserData}
              {...register("linkedinUrl")}
              placeholder="Enter linkedin url"
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
              disabled={isUpdatingUserData}
              {...register("description")}
              placeholder="Enter description"
              rows={4}
              className="text-dark-text h-[50px] max-h-[120px] w-full resize-y bg-transparent p-2 text-sm focus:outline-none"
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
            disabled={isUpdatingUserData}
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

export default EditUserProfileForm;
