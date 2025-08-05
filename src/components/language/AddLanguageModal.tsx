import { useForm } from "react-hook-form";
import Button from "../Button";
import { FiX } from "react-icons/fi";
import { Language } from "@/types";

type LanguageFormInputs = {
  language: Language;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LanguageFormInputs) => void;
};

const AddLanguageModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LanguageFormInputs>({
    defaultValues: {
      language: {
        id: 0,
        description: null,
      },
    },
  });

  if (!isOpen) return null;

  const handleFormSubmit = (data: LanguageFormInputs) => {
    onSubmit({
      ...data,
    });
    reset();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 sm:px-6">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-dark-text text-xl font-bold md:text-2xl">
            Add Language
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
              Language name
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddLanguageModal;