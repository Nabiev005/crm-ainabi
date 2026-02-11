import { 
  Course, 
  Lead, 
  PaymentStatus, 
  Schedule, 
  Student, 
  StudentStatus 
} from '../types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: '1',
    firstName: 'Azamat',
    lastName: 'Kadyrov',
    email: 'azamat@example.com',
    phone: '+996 555 123 456',
    courses: ['Frontend React', 'UI/UX Design'],
    status: StudentStatus.ACTIVE,
    paymentStatus: PaymentStatus.PAID,
    enrollmentDate: '2023-09-01'
  },
  {
    id: '2',
    firstName: 'Aigul',
    lastName: 'Mamatova',
    email: 'aigul@example.com',
    phone: '+996 777 987 654',
    courses: ['Python Backend'],
    status: StudentStatus.ACTIVE,
    paymentStatus: PaymentStatus.PARTIAL,
    enrollmentDate: '2023-10-15'
  },
  {
    id: '3',
    firstName: 'Bermet',
    lastName: 'Isakova',
    email: 'bermet@example.com',
    phone: '+996 500 111 222',
    courses: ['JavaScript Fundamentals'],
    status: StudentStatus.GRADUATED,
    paymentStatus: PaymentStatus.PAID,
    enrollmentDate: '2023-05-10'
  }
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Frontend React',
    instructor: 'Eldar Alymkulov',
    duration: '4 months',
    price: 35000,
    studentsCount: 24,
    level: 'Intermediate'
  },
  {
    id: 'c2',
    title: 'Python Backend',
    instructor: 'Tilek Borbiev',
    duration: '5 months',
    price: 45000,
    studentsCount: 18,
    level: 'Advanced'
  },
  {
    id: 'c3',
    title: 'UI/UX Design',
    instructor: 'Cholpon Bekova',
    duration: '3 months',
    price: 30000,
    studentsCount: 30,
    level: 'Beginner'
  }
];

export const INITIAL_LEADS: Lead[] = [
  { 
    id: 'l1', 
    name: 'Almaz Joroev', 
    source: 'Instagram', 
    status: 'New', 
    email: 'almaz@gmail.com' 
  },
  { 
    id: 'l2', 
    name: 'Dinara Sultanova', 
    source: 'Facebook', 
    status: 'Contacted', 
    email: 'dinara@gmail.com' 
  },
  { 
    id: 'l3', 
    name: 'Nursultan Abdyrakhmanov', 
    source: 'Telegram', 
    status: 'Meeting', 
    email: 'nurs@gmail.com' 
  }
];

export const INITIAL_SCHEDULE: Schedule[] = [
  { 
    id: 's1', 
    courseId: 'c1', 
    courseTitle: 'Frontend React', 
    instructor: 'Eldar Alymkulov', 
    day: 'Monday', 
    time: '18:00 - 20:00', 
    room: 'Room 302' 
  },
  { 
    id: 's2', 
    courseId: 'c2', 
    courseTitle: 'Python Backend', 
    instructor: 'Tilek Borbiev', 
    day: 'Tuesday', 
    time: '14:00 - 16:00', 
    room: 'Room 101' 
  },
  { 
    id: 's3', 
    courseId: 'c3', 
    courseTitle: 'UI/UX Design', 
    instructor: 'Cholpon Bekova', 
    day: 'Monday', 
    time: '10:00 - 12:00', 
    room: 'Lab 1' 
  },
  { 
    id: 's4', 
    courseId: 'c1', 
    courseTitle: 'Frontend React', 
    instructor: 'Eldar Alymkulov', 
    day: 'Wednesday', 
    time: '18:00 - 20:00', 
    room: 'Room 302' 
  },
  { 
    id: 's5', 
    courseId: 'c2', 
    courseTitle: 'Python Backend', 
    instructor: 'Tilek Borbiev', 
    day: 'Thursday', 
    time: '14:00 - 16:00', 
    room: 'Room 101' 
  }
];