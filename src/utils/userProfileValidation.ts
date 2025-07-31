export const jobValidation = {
  minLength: {
    value: 3,
    message: "Job title must be at least 3 characters",
  },
  maxLength: {
    value: 50,
    message: "Job title must be at most 50 characters",
  },
};

export const gitUrlValidation = {
  validate: (value: string | undefined) =>
    !value ||
    value.startsWith("https://github.com/") ||
    "Git URL must start with https://github.com/",
  maxLength: {
    value: 100,
    message: "Git URL must be at most 100 characters",
  },
};

export const descriptionValidation = {
  minLength: {
    value: 10,
    message: "Description must be at least 10 characters",
  },
  maxLength: {
    value: 500,
    message: "Description must be at most 500 characters",
  },
};
