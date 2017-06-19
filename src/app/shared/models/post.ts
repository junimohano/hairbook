import { Customer } from 'app/shared/models/customer';
import { Salon } from 'app/shared/models/salon';
import { HairType } from 'app/shared/models/hair-type';
import { PostHairMenu } from 'app/shared/models/post-hair-menu';
import { PostHairType } from 'app/shared/models/post-hair-type';
import { PostEvaluation } from 'app/shared/models/post-evaluation';
import { PostComment } from 'app/shared/models/post-comment';
import { PostUpload } from 'app/shared/models/post-upload';
import { User } from 'app/shared/models/user';
import { AccessType } from 'app/shared/models/enums/access-type';

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








