import { UserUploadInfoType } from './user-upload-info-type';
import { UploadFileRotation } from '../../shared/models/enums/upload-file-rotation';

export class UserUploadInfo {
  uploadFileRotation: UploadFileRotation;
  userUploadInfoType: UserUploadInfoType;
  userUploadBlob: any;
  userUploadFile: any;

  public constructor(init?: Partial<UserUploadInfo>) {
    Object.assign(this, init);
  }
}
