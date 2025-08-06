export interface Project {
  id: number;
  projectName: string;
  description: string;
  githubLink: string;
  websiteLink: string;
}

export interface AddProject {
  projectName: string;
  description: string;
  githubLink?: string;
  websiteLink?: string;
}

// Languages
export interface Language {
  id: number;
  name: string;
  description: string | null;
}

export interface AddLanguageInput {
  id: number;
  description: string | null;
}

export interface LanguageList {
  id: number;
  name: string;
}

export interface EditLanguage {
  description: string | null;
}

// Skills
export interface Skill {
  id: number;
  name: string;
  description: string | null;
}

export interface AddSkillInput {
  id: number;
  description: string | null;
}

export interface SkillList {
  id: number;
  name: string;
}

export interface EditSkill {
  description: string | null;
}

export interface SkillConfirmation {
  id: number;
  firstName: string;
  lastName: string;
}

export interface UserSkillWithConfirmations {
  id: number;
  name: string;
  description: string;
  confirmations: SkillConfirmation[];
}