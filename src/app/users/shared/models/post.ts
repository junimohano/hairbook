interface Post {
  postId: number;
  customerId: number;
  customer: Customer;
  date: string;
  memo: string;
  salonId: number | null;
  salon: Salon | null;
  hairTypeId: number;
  hairType: HairType;
  hairMemo: string;
  accessType: AccessType;
  postHairMenus: PostHairMenu[] | null;
  postHairTypes: PostHairType[] | null;
  postEvaluations: PostEvaluation[] | null;
  postComments: PostComment[] | null;
  postUploads: PostUpload[] | null;

  createdUserId: number | null;
  updatedUserId: number | null;
  createdUser: User | null;
  updatedUser: User | null;
  createdDate: Date | null;
  updatedDate: Date | null;

  currentUploadIndex: number;
}








