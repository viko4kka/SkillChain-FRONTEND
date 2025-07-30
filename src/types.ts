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
export interface User {
  id: number;
  linkedInId?: string;
  firstName: string;
  lastName: string;
  description?: string;
  job?: string;
  gitUrl?: string;
  linkedinUrl?: string;
  email: string;
  imgUrl?: string;
  locationId?: number;
  skills?: string[]; // Add this if you store skills as an array
}
