import { EvaluationType } from 'app/shared/enums/evaluation-type';
import { Post } from 'app/users/shared/models/post';
import { User } from 'app/users/shared/models/user';

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
