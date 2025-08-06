import React from "react";
import { Controller, Control, FieldError } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  required?: boolean;
  error?: FieldError;
  validate?: any;
  placeholder?: string;
};

const DatePickerField: React.FC<Props> = ({
  control,
  name,
  label,
  required,
  error,
  validate,
  placeholder,
}) => (
  <div className="group flex w-full flex-col items-start">
    <label className="text-dark-text group-focus-within:text-mainBlue mb-1 text-sm transition-colors duration-300">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="border-dark-text/10 group-focus-within:border-mainBlue w-full rounded-sm border transition">
      <Controller
        control={control}
        name={name}
        rules={{
          required: required ? `${label} is required` : false,
          validate,
        }}
        render={({ field }) => (
          <DatePicker
            selected={field.value ? new Date(field.value) : null}
            onChange={(date: Date | null) =>
              field.onChange(date ? date.toISOString().slice(0, 10) : "")
            }
            dateFormat="yyyy-MM-dd"
            className="text-dark-text w-full bg-transparent p-2 text-sm focus:outline-none"
            placeholderText={placeholder}
            isClearable={!required}
          />
        )}
      />
    </div>
    {error && (
      <span className="mt-1 text-xs text-red-500">{error.message}</span>
    )}
  </div>
);

export default DatePickerField;
