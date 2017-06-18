import { User } from 'app/users/shared/models/user';

export interface Tag {
  tagId: number;
  tagName: string;

  createdUserId: number | null;
  updatedUserId: number | null;
  createdUser: User | null;
  updatedUser: User | null;
  createdDate: Date | null;
  updatedDate: Date | null;
}
