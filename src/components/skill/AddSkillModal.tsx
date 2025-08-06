import { useForm } from "react-hook-form";
import Button from "../Button";
import { FiX } from "react-icons/fi";
import { useState } from "react";
import { descriptionValidation } from "@/utils/skillValidation";
import SelectSkill from "./SelectSkill";

type SkillFormInputs = {
  id: number;
  description: string | null;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SkillFormInputs) => void;
};

const AddSkillModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillFormInputs>({
    defaultValues: {
      id: 0,
      description: null,
    },
  });
  const [selectedSkillId, setSelectedSkillId] = useState<number | null>(
    null,
  );

  if (!isOpen) return null;

  const handleFormSubmit = (data: SkillFormInputs) => {
    if (!selectedSkillId) return;
    onSubmit({
      id: selectedSkillId,
      description: data.description,
    });
    reset();
    setSelectedSkillId(null);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 sm:px-6">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-dark-text text-xl font-bold md:text-2xl">
            Add Skill
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
            <SelectSkill
              onSelect={(id) => setSelectedSkillId(Number(id))}
            />
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
export default AddSkillModal;
