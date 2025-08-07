import { useForm } from "react-hook-form";
import Button from "../Button";
import { FiX } from "react-icons/fi";
import {
  projectNameValidation,
  descriptionValidation,
  githubLinkValidation,
  websiteLinkValidation,
  endDateAfterStartDate,
  notInFuture,
} from "@/utils/projectValidation";

type ProjectFormInputs = {
  projectName: string;
  description: string;
  githubLink: string | null;
  websiteLink: string | null;
  startDate: string;
  endDate: string | null;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormInputs) => void;
};

const AddProjectModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormInputs>({
    defaultValues: {
      projectName: "",
      description: "",
      githubLink: null,
      websiteLink: null,
      startDate: "",
      endDate: null,
    },
  });

  if (!isOpen) return null;

  const handleFormSubmit = (data: ProjectFormInputs) => {
    onSubmit({
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
    });
    reset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 sm:px-6">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-dark-text text-xl font-bold md:text-2xl">
            Add project
          </h2>
          <button
            onClick={onClose}
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
          onSubmit={handleSubmit(handleFormSubmit)}
          className="mt-4 flex flex-col gap-y-3"
        >
          <div className="group flex w-full flex-col items-start">
            <label className="text-dark-text group-focus-within:text-mainBlue mb-1 text-sm transition-colors duration-300">
              Project name
            </label>
            <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
              <input
                type="text"
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
                {...register("startDate", {
                  required: "Start date is required",
                  validate: notInFuture,
                })}
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
                {...register("endDate", {
                  validate: (value, formValues) => {
                    const afterStart = endDateAfterStartDate(value, formValues);
                    if (afterStart !== true) return afterStart;
                    return notInFuture(value);
                  },
                })}
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

          <div className="my-2 flex flex-row justify-end gap-x-2">
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              size="md"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Add
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
