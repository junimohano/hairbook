import { UploadCategoryType } from '../../shared/models/enums/upload-category-type';

export class PostUploadInfo {
  uploadCategoryType: UploadCategoryType;
  postUpload: any;
  postMemo: string;

  public constructor(init?: Partial<PostUploadInfo>) {
    Object.assign(this, init);
  }
}








