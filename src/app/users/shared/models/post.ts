import { AccessType } from 'app/shared/enums/access-type';
import { Customer } from 'app/users/shared/models/customer';
import { Salon } from 'app/users/shared/models/salon';
import { HairType } from 'app/users/shared/models/hair-type';
import { PostHairMenu } from 'app/users/shared/models/post-hair-menu';
import { PostHairType } from 'app/users/shared/models/post-hair-type';
import { PostEvaluation } from 'app/users/shared/models/post-evaluation';
import { PostComment } from 'app/users/shared/models/post-comment';
import { PostUpload } from 'app/users/shared/models/post-upload';
import { User } from 'app/users/shared/models/user';

export interface Post {
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








