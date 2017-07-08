import { Post } from 'app/shared/models/post';
import { User } from 'app/shared/models/user';
import { UploadFileType } from 'app/shared/models/enums/upload-file-type';
import { UploadCategoryType } from 'app/shared/models/enums/upload-category-type';
import { Base } from 'app/shared/models/base';

export class PostUpload extends Base {
  postUploadId: number;
  path: string;
  memo: string;
  postId: number;
  post: Post;
  uploadFileType: UploadFileType;
  uploadCategoryType: UploadCategoryType;
}
