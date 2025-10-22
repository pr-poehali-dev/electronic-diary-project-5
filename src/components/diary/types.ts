export interface Grade {
  subject: string;
  grade: number;
  date: string;
  isNew?: boolean;
}

export interface Homework {
  id: number;
  subject: string;
  task: string;
  deadline: string;
  completed: boolean;
}

export interface Teacher {
  id: number;
  name: string;
  subject: string;
  email: string;
  phone: string;
}

export interface ScheduleLesson {
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

export interface Student {
  id: number;
  name: string;
  class: string;
  email: string;
  phone: string;
}

export type UserRole = 'student' | 'teacher' | 'principal' | 'deputy';