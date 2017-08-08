import { PostFavorite } from './post-favorite';
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
import { Base } from 'app/shared/models/base';
import { NgxGalleryImage } from 'ngx-gallery/lib';

export class Post extends Base {
  postId: number;
  customerId: number;
  customer: Customer;
  date: string;
  memo: string;
  isMemo: boolean;
  salonId: number | null;
  salon: Salon | null;
  hairTypeMemo: string;
  isHairTypeMemo: boolean;
  accessType: AccessType;
  postHairMenus: PostHairMenu[] | null;
  postHairTypes: PostHairType[] | null;
  postEvaluations: PostEvaluation[] | null;
  postComments: PostComment[] | null;
  postUploads: PostUpload[] | null;
  postFavorites: PostFavorite[] | null;

  totalPostComments: number;
  totalPostEvaluations: number;
  currentUploadIndex: number;
  comment: string;
  isEvaluation: boolean;
  isFavorite: boolean;
  postMenuColor: PostHairMenu;
  postMenuPerm: PostHairMenu;

  galleryImages: NgxGalleryImage[];
}








