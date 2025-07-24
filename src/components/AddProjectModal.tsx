import { useForm } from "react-hook-form";
import Button from "./Button";
import { FiX } from "react-icons/fi";

type ProjectFormInputs = {
  projectName: string;
  description: string;
  githubLink: string;
  websiteLink: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormInputs) => void;
};

const AddProjectModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit, reset } = useForm<ProjectFormInputs>();

  if (!isOpen) return null;

  const handleFormSubmit = (data: ProjectFormInputs) => {
    onSubmit(data);
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
            aria-label="Zamknij modal"
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
              Github URL
            </label>
            <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
              <input
                type="url"
                {...register("githubLink")}
                placeholder="Enter github link"
                className="text-dark-text w-full bg-transparent p-2 text-sm focus:outline-none"
              />
            </div>
          </div>

          <div className="group flex w-full flex-col items-start">
            <label className="text-dark-text group-focus-within:text-mainBlue mb-1 text-sm transition-colors duration-300">
              Website URL
            </label>
            <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
              <input
                type="url"
                {...register("websiteLink")}
                placeholder="Enter website link"
                className="text-dark-text w-full bg-transparent p-2 text-sm focus:outline-none"
              />
            </div>
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
