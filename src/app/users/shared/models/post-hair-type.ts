interface PostHairType {
  postHairTypeId: number;
  postId: number;
  post: Post;
  hairTypeId: number;
  hairType: HairType;

  createdUserId: number | null;
  updatedUserId: number | null;
  createdUser: User | null;
  updatedUser: User | null;
  createdDate: Date | null;
  updatedDate: Date | null;
}