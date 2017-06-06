interface Post {
  postId: number;
  customerName: string;
  date: string;
  description: string;
  salonId: number;
  salon: Salon;
  accessType: number;
  evaluations: Evaluation[];
  tags: Evaluation[];
  uploads: Evaluation[];
  createdUserId?: any;
  updatedUserId?: any;
  createdUser?: any;
  updatedUser?: any;
  createdDate: string;
  updatedDate?: any;
}

interface Evaluation {
  a: string;
}

interface Salon {
  salonId: number;
  name: string;
  address: string;
  url: string;
  phone: string;
  createdUserId?: any;
  updatedUserId?: any;
  createdUser?: any;
  updatedUser?: any;
  createdDate: string;
  updatedDate?: any;
}
