interface PostEvaluation {
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
