import { Post } from 'app/shared/models/post';
import { User } from 'app/shared/models/user';
import { EvaluationType } from 'app/shared/models/enums/evaluation-type';
import { Base } from 'app/shared/models/base';

export class PostEvaluation extends Base {
  postEvaluationId: number;
  postId: number;
  post: Post;
  evaluationType: EvaluationType;
}
