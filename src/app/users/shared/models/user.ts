interface User {
  userId: number;
  userKey: string;
  salonId: number | null;
  salon: Salon | null;

  createdUserId: number | null;
  updatedUserId: number | null;
  createdUser: User | null;
  updatedUser: User | null;
  createdDate: Date | null;
  updatedDate: Date | null;
}
