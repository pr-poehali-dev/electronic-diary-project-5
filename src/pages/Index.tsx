import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { LoginForm } from '@/components/diary/LoginForm';
import { Header } from '@/components/diary/Header';
import { DashboardTab } from '@/components/diary/DashboardTab';
import { GradesTab } from '@/components/diary/GradesTab';
import { HomeworkTab } from '@/components/diary/HomeworkTab';
import { ScheduleTab } from '@/components/diary/ScheduleTab';
import { TeachersTab } from '@/components/diary/TeachersTab';
import { Grade, Homework, Teacher, ScheduleLesson, UserRole } from '@/components/diary/types';

const STORAGE_KEY = 'diary_data';

const initialTeachers: Teacher[] = [
  { name: 'Иванова М.А.', subject: 'Математика', email: 'ivanova@school.ru', phone: '+7 (999) 123-45-67' },
  { name: 'Петров С.И.', subject: 'Русский язык', email: 'petrov@school.ru', phone: '+7 (999) 234-56-78' },
  { name: 'Сидорова Е.В.', subject: 'Английский язык', email: 'sidorova@school.ru', phone: '+7 (999) 345-67-89' },
  { name: 'Козлов А.П.', subject: 'История', email: 'kozlov@school.ru', phone: '+7 (999) 456-78-90' },
  { name: 'Морозова Н.Д.', subject: 'Физика', email: 'morozova@school.ru', phone: '+7 (999) 567-89-01' }
];

const initialSchedule: ScheduleLesson[] = [
  { time: '08:30 - 09:15', subject: 'Математика', teacher: 'Иванова М.А.', room: '204' },
  { time: '09:25 - 10:10', subject: 'Русский язык', teacher: 'Петров С.И.', room: '301' },
  { time: '10:20 - 11:05', subject: 'Английский язык', teacher: 'Сидорова Е.В.', room: '205' },
  { time: '11:25 - 12:10', subject: 'История', teacher: 'Козлов А.П.', room: '302' },
  { time: '12:20 - 13:05', subject: 'Физика', teacher: 'Морозова Н.Д.', room: '401' }
];

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(0);

  const [grades, setGrades] = useState<Grade[]>([]);
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [teachers] = useState<Teacher[]>(initialTeachers);
  const [schedule, setSchedule] = useState<ScheduleLesson[]>(initialSchedule);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setGrades(data.grades || []);
        setHomeworks(data.homeworks || []);
        setSchedule(data.schedule || initialSchedule);
        setNotifications(data.notifications || 0);
      } catch (e) {
        console.error('Ошибка загрузки данных:', e);
      }
    }
  }, []);

  useEffect(() => {
    const data = {
      grades,
      homeworks,
      schedule,
      notifications
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [grades, homeworks, schedule, notifications]);

  const averageGrade = grades.length > 0 ? (grades.reduce((acc, g) => acc + g.grade, 0) / grades.length).toFixed(1) : '0.0';

  const toggleHomework = (id: number) => {
    setHomeworks(homeworks.map(hw => hw.id === id ? { ...hw, completed: !hw.completed } : hw));
  };

  const handleLogin = () => {
    const users = {
      'ученик': { password: '1234', role: 'student' as const },
      'учитель': { password: '1234', role: 'teacher' as const },
      'завуч': { password: '1234', role: 'deputy' as const },
      'директор': { password: '1234', role: 'principal' as const },
      'Директор': { password: '89223109976', role: 'principal' as const },
    };

    const user = users[username.toLowerCase() as keyof typeof users];
    if (user && user.password === password) {
      setUserRole(user.role);
      setIsLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('Неверное имя пользователя или пароль');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
    setUserRole('student');
  };

  const addGrade = (subject: string, grade: number) => {
    const newGrade: Grade = {
      subject,
      grade,
      date: new Date().toLocaleDateString('ru-RU'),
      isNew: true
    };
    setGrades([newGrade, ...grades]);
    setNotifications(notifications + 1);
  };

  const addHomework = (subject: string, task: string, deadline: string) => {
    const newHomework: Homework = {
      id: homeworks.length + 1,
      subject,
      task,
      deadline,
      completed: false
    };
    setHomeworks([...homeworks, newHomework]);
  };

  const addLesson = (time: string, subject: string, teacher: string, room: string) => {
    const newLesson: ScheduleLesson = {
      time,
      subject,
      teacher,
      room
    };
    setSchedule([...schedule, newLesson]);
  };

  const deleteLesson = (index: number) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  const canManageContent = userRole === 'teacher' || userRole === 'deputy' || userRole === 'principal';

  if (!isLoggedIn) {
    return (
      <LoginForm
        username={username}
        password={password}
        loginError={loginError}
        onUsernameChange={setUsername}
        onPasswordChange={setPassword}
        onLogin={handleLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Header
        userRole={userRole}
        notifications={notifications}
        onNotificationClick={() => {
          setNotifications(0);
          setActiveTab('grades');
        }}
        onLogout={handleLogout}
      />

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid bg-card">
            <TabsTrigger value="dashboard" className="gap-2">
              <Icon name="Home" size={16} />
              <span className="hidden sm:inline">Главная</span>
            </TabsTrigger>
            <TabsTrigger value="grades" className="gap-2">
              <Icon name="BookOpen" size={16} />
              <span className="hidden sm:inline">Оценки</span>
            </TabsTrigger>
            <TabsTrigger value="homework" className="gap-2">
              <Icon name="ClipboardList" size={16} />
              <span className="hidden sm:inline">Домашние задания</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="gap-2">
              <Icon name="Calendar" size={16} />
              <span className="hidden sm:inline">Расписание</span>
            </TabsTrigger>
            <TabsTrigger value="teachers" className="gap-2">
              <Icon name="Users" size={16} />
              <span className="hidden sm:inline">Учителя</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardTab
              grades={grades}
              homeworks={homeworks}
              schedule={schedule}
              averageGrade={averageGrade}
            />
          </TabsContent>

          <TabsContent value="grades">
            <GradesTab
              grades={grades}
              averageGrade={averageGrade}
              canManageContent={canManageContent}
              onAddGrade={addGrade}
            />
          </TabsContent>

          <TabsContent value="homework">
            <HomeworkTab
              homeworks={homeworks}
              userRole={userRole}
              canManageContent={canManageContent}
              onToggleHomework={toggleHomework}
              onAddHomework={addHomework}
            />
          </TabsContent>

          <TabsContent value="schedule">
            <ScheduleTab 
              schedule={schedule}
              canManageContent={userRole === 'principal'}
              onAddLesson={addLesson}
              onDeleteLesson={deleteLesson}
            />
          </TabsContent>

          <TabsContent value="teachers">
            <TeachersTab teachers={teachers} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;