import { UploadCategoryType } from '../../shared/models/enums/upload-category-type';
import { UploadFileType } from '../../shared/models/enums/upload-file-type';
import { PostUploadInfoType } from './post-upload-info-type';

export class PostUploadInfo {
  postUploadId: number;
  uploadCategoryType: UploadCategoryType;
  uploadFileType: UploadFileType;
  postUploadBlob: any;
  postUploadFile: any;
  memo: string;

  postUploadInfoType: PostUploadInfoType;

  public constructor(init?: Partial<PostUploadInfo>) {
    Object.assign(this, init);
  }
}








