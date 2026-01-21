
export interface Course {
  id: string;
  title: string;
  instructor: string;
  price: number;
  discountPrice?: number;
  rating: number;
  students: number;
  image: string;
  category: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Published' | 'Draft';
  updatedAt: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  enrolledCourses: string[];
  joinDate: string;
  status: 'Active' | 'Suspended';
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  amount: number;
  status: 'Success' | 'Pending' | 'Failed';
  method: 'Card' | 'UPI' | 'Wallet';
  date: string;
  transactionId: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  img: string;
  category: string;
}

export interface SiteSettings {
  siteName: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage: string;
  paymentsEnabled: boolean;
  maintenanceMode: boolean;
  metaTitle: string;
  metaDescription: string;
}

export type ViewType = 'user' | 'admin';

export interface DashboardStats {
  totalRevenue: number;
  totalStudents: number;
  activeCourses: number;
  totalInstructors: number;
}
