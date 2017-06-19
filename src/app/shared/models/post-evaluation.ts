import { Post } from 'app/shared/models/post';
import { User } from 'app/shared/models/user';
import { EvaluationType } from 'app/shared/models/enums/evaluation-type';

export interface PostEvaluation {
  postEvaluationId: number;
  postId: number;
  post: Post;
  evaluationType: EvaluationType;

  createdUserId: number | null;
  updatedUserId: number | null;
  createdUser: User | null;
  updatedUser: User | null;
  createdDate: Date | null;
  updatedDate: Date | null;
}
