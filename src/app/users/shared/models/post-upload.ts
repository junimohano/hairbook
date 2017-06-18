import { UploadFileType } from 'app/shared/enums/upload-file-type';
import { UploadCategoryType } from 'app/shared/enums/upload-category-type';
import { Post } from 'app/users/shared/models/post';
import { User } from 'app/users/shared/models/user';

export interface PostUpload {
  postUploadId: number;
  path: string;
  memo: string;
  postId: number;
  post: Post;
  uploadFileType: UploadFileType;
  uploadCategoryType: UploadCategoryType;

  createdUserId: number | null;
  updatedUserId: number | null;
  createdUser: User | null;
  updatedUser: User | null;
  createdDate: Date | null;
  updatedDate: Date | null;
}
