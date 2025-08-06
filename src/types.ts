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
