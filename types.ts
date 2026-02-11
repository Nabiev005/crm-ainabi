
export enum StudentStatus {
  ACTIVE = 'Active',
  GRADUATED = 'Graduated',
  DROPPED = 'Dropped',
  PENDING = 'Pending'
}

export enum PaymentStatus {
  PAID = 'Paid',
  PARTIAL = 'Partial',
  UNPAID = 'Unpaid',
  OVERDUE = 'Overdue'
}

export enum UserRole {
  DIRECTOR = 'Director',
  MANAGER = 'Manager'
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  courses: string[];
  status: StudentStatus;
  paymentStatus: PaymentStatus;
  enrollmentDate: string;
}

export interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  price: number;
  studentsCount: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Lead {
  id: string;
  name: string;
  source: string;
  status: 'New' | 'Contacted' | 'Meeting' | 'Converted';
  email: string;
}

export interface Schedule {
  id: string;
  courseId: string;
  courseTitle: string;
  instructor: string;
  day: string;
  time: string;
  room: string;
}

export type View = 'dashboard' | 'students' | 'courses' | 'leads' | 'finances' | 'ai-assistant' | 'settings' | 'users' | 'schedule';
