interface PostUpload {
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
