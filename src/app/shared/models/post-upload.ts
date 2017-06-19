import { Post } from 'app/shared/models/post';
import { User } from 'app/shared/models/user';
import { UploadFileType } from 'app/shared/models/enums/upload-file-type';
import { UploadCategoryType } from 'app/shared/models/enums/upload-category-type';

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
