import { useState } from 'react';
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
  const [teachers] = useState<Teacher[]>([]);
  const [schedule] = useState<ScheduleLesson[]>([]);

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
            <ScheduleTab schedule={schedule} />
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
