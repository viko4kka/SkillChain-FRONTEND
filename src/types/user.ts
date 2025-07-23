export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  title?: string;
  location?: string;
  skills: string[];
  experience?: string;
  verified?: boolean;
}

export interface UsersResponse {
  users: User[];
  hasMore: boolean;
  nextCursor?: string;
}
