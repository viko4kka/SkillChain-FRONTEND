export const projectNameValidation = {
  required: "This field is required",
  minLength: {
    value: 3,
    message: "Project name must be at least 3 characters",
  },
  maxLength: {
    value: 50,
    message: "Project name must be at most 50 characters",
  },
};

export const descriptionValidation = {
  required: "This field is required",
  minLength: {
    value: 10,
    message: "Description must be at least 10 characters",
  },
  maxLength: {
    value: 500,
    message: "Description must be at most 500 characters",
  },
};
export const githubLinkValidation = {
  validate: (value: string | undefined | null) =>
    !value ||
    value.startsWith("https://github.com/") ||
    "Github link must start with https://github.com/",
  maxLength: {
    value: 100,
    message: "Github link must be at most 100 characters",
  },
};

export const websiteLinkValidation = {
  pattern: {
    value: /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-./?%&=]*)?$/,
    message: "Website link must be a valid URL",
  },
  maxLength: {
    value: 100,
    message: "Website link must be at most 100 characters",
  },
};
