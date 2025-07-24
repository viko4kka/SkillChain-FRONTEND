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
