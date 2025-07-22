import React from "react";
import { useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";

type ProjectFormInputs = {
  name: string;
  description: string;
  github: string;
  website: string;
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
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 px-4 sm:px-6">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        {/* X close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg"
          aria-label="Zamknij modal"
        >
          <FiX size={24} />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Add your project
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              {...register("name")}
              required
              placeholder="Enter name of project"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Description
            </label>
            <input
              {...register("description")}
              required
              placeholder="Enter description of project"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Github Link
            </label>
            <input
              {...register("github")}
              type="url"
              required
              placeholder="Enter link for github repository of project"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Website URL
            </label>
            <input
              {...register("website")}
              type="url"
              placeholder="Enter website url of project"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700"
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
