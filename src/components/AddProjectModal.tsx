import React from "react";
import { useForm } from "react-hook-form";
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
  const { register, handleSubmit } = useForm<ProjectFormInputs>();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 sm:px-6">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* X close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-lg text-gray-500 hover:text-gray-700"
          aria-label="Zamknij modal"
        >
          <FiX
            size={24}
            className="text-dark-text hover:text-mainBlue transition-all duration-300"
          />
        </button>

        {/* Header */}
        <h2 className="mb-6 text-xl font-semibold text-gray-800">
          Add your project
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block font-medium text-gray-700">Name</label>
            <input
              {...register("projectName")}
              required
              placeholder="Enter name of project"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Description
            </label>
            <input
              {...register("description")}
              required
              placeholder="Enter description of project"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Github Link
            </label>
            <input
              {...register("githubLink")}
              type="url"
              placeholder="Enter link for github repository of project"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block font-medium text-gray-700">
              Website URL
            </label>
            <input
              {...register("websiteLink")}
              type="url"
              placeholder="Enter website url of project"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;
