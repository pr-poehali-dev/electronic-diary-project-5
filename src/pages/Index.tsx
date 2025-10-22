import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface Grade {
  subject: string;
  grade: number;
  date: string;
  isNew?: boolean;
}

interface Homework {
  id: number;
  subject: string;
  task: string;
  deadline: string;
  completed: boolean;
}

interface Teacher {
  name: string;
  subject: string;
  email: string;
  phone: string;
}

interface ScheduleLesson {
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [userRole, setUserRole] = useState<'student' | 'teacher' | 'principal' | 'deputy'>('student');
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
      <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <Icon name="GraduationCap" size={48} className="text-primary" />
            </div>
            <CardTitle className="text-center text-2xl">Электронный дневник</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Имя пользователя</Label>
              <Input
                id="username"
                placeholder="Введите имя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            {loginError && (
              <p className="text-sm text-destructive">{loginError}</p>
            )}
            <Button onClick={handleLogin} className="w-full">
              <Icon name="LogIn" size={16} className="mr-2" />
              Войти
            </Button>
            <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
              <p className="font-medium mb-2">Тестовые аккаунты:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>ученик / 1234</li>
                <li>учитель / 1234</li>
                <li>завуч / 1234</li>
                <li>директор / 1234</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <header className="bg-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Icon name="GraduationCap" size={32} />
              <h1 className="text-2xl font-bold">Электронный дневник</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative text-primary-foreground hover:bg-primary/80"
                onClick={() => {
                  setNotifications(0);
                  setActiveTab('grades');
                }}
              >
                <Icon name="Bell" size={20} />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-destructive text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>
              <Badge variant="outline" className="bg-primary-foreground text-primary">
                <Icon name="User" size={14} className="mr-1" />
                {userRole === 'student' ? 'Ученик' : userRole === 'teacher' ? 'Учитель' : userRole === 'deputy' ? 'Завуч' : 'Директор'}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary-foreground hover:bg-primary/80"
                onClick={handleLogout}
              >
                <Icon name="LogOut" size={20} />
              </Button>
              <Avatar>
                <AvatarFallback className="bg-primary-foreground text-primary">
                  {userRole === 'student' ? 'УЧ' : userRole === 'teacher' ? 'УТ' : userRole === 'deputy' ? 'ЗВ' : 'ДР'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

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

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Средний балл</span>
                    <Icon name="TrendingUp" size={24} />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{averageGrade}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Домашние задания</span>
                    <Icon name="ClipboardCheck" size={24} className="text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{homeworks.filter(hw => !hw.completed).length}</p>
                  <p className="text-sm text-muted-foreground mt-2">активных заданий</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Новые оценки</span>
                    <Icon name="Bell" size={24} className="text-primary" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold">{grades.filter(g => g.isNew).length}</p>
                  <p className="text-sm text-muted-foreground mt-2">за сегодня</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Последние оценки</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {grades.slice(0, 5).map((grade, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div>
                            <p className="font-medium">{grade.subject}</p>
                            <p className="text-sm text-muted-foreground">{grade.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {grade.isNew && (
                              <Badge variant="destructive" className="text-xs">Новая</Badge>
                            )}
                            <Badge 
                              className={`text-lg font-bold ${
                                grade.grade === 5 ? 'bg-green-500' : 
                                grade.grade === 4 ? 'bg-blue-500' : 
                                grade.grade === 3 ? 'bg-orange-500' : 'bg-red-500'
                              }`}
                            >
                              {grade.grade}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Расписание на сегодня</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-3">
                      {schedule.slice(0, 5).map((lesson, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                          <div className="text-sm text-muted-foreground w-24 shrink-0">{lesson.time}</div>
                          <div className="flex-1">
                            <p className="font-medium">{lesson.subject}</p>
                            <p className="text-sm text-muted-foreground">{lesson.teacher}</p>
                          </div>
                          <Badge variant="outline">Каб. {lesson.room}</Badge>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="grades">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Все оценки</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">Средний балл: {averageGrade}</Badge>
                    {canManageContent && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Icon name="Plus" size={16} className="mr-2" />
                            Добавить оценку
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Добавить новую оценку</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor="grade-subject">Предмет</Label>
                              <Input id="grade-subject" placeholder="Математика" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="grade-value">Оценка</Label>
                              <Select>
                                <SelectTrigger id="grade-value">
                                  <SelectValue placeholder="Выберите оценку" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="5">5 (Отлично)</SelectItem>
                                  <SelectItem value="4">4 (Хорошо)</SelectItem>
                                  <SelectItem value="3">3 (Удовлетворительно)</SelectItem>
                                  <SelectItem value="2">2 (Неудовлетворительно)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <Button 
                              className="w-full"
                              onClick={() => {
                                const subject = (document.getElementById('grade-subject') as HTMLInputElement)?.value;
                                const gradeValue = (document.querySelector('[id="grade-value"]') as HTMLButtonElement)?.textContent?.charAt(0);
                                if (subject && gradeValue) {
                                  addGrade(subject, parseInt(gradeValue));
                                  (document.getElementById('grade-subject') as HTMLInputElement).value = '';
                                }
                              }}
                            >
                              Добавить
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    {grades.length === 0 ? (
                      <div className="text-center py-12 text-muted-foreground">
                        <Icon name="BookOpen" size={48} className="mx-auto mb-4 opacity-50" />
                        <p>Пока нет оценок</p>
                      </div>
                    ) : (
                      grades.map((grade, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                          <div className="flex-1">
                            <p className="font-medium text-lg">{grade.subject}</p>
                            <p className="text-sm text-muted-foreground">{grade.date}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            {grade.isNew && (
                              <Badge variant="destructive" className="text-xs animate-pulse">Новая</Badge>
                            )}
                            <Badge 
                              className={`text-2xl font-bold px-4 py-2 ${
                                grade.grade === 5 ? 'bg-green-500 hover:bg-green-600' : 
                                grade.grade === 4 ? 'bg-blue-500 hover:bg-blue-600' : 
                                grade.grade === 3 ? 'bg-orange-500 hover:bg-orange-600' : 'bg-red-500 hover:bg-red-600'
                              }`}
                            >
                              {grade.grade}
                            </Badge>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="homework">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Домашние задания</span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">
                      {homeworks.filter(hw => !hw.completed).length} активных
                    </Badge>
                    {canManageContent && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm">
                            <Icon name="Plus" size={16} className="mr-2" />
                            Добавить задание
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Добавить домашнее задание</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            <div className="space-y-2">
                              <Label htmlFor="hw-subject">Предмет</Label>
                              <Input id="hw-subject" placeholder="Математика" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="hw-task">Задание</Label>
                              <Textarea id="hw-task" placeholder="Описание задания" rows={3} />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="hw-deadline">Срок выполнения</Label>
                              <Input id="hw-deadline" type="date" />
                            </div>
                            <Button 
                              className="w-full"
                              onClick={() => {
                                const subject = (document.getElementById('hw-subject') as HTMLInputElement)?.value;
                                const task = (document.getElementById('hw-task') as HTMLTextAreaElement)?.value;
                                const deadlineInput = (document.getElementById('hw-deadline') as HTMLInputElement)?.value;
                                if (subject && task && deadlineInput) {
                                  const deadline = new Date(deadlineInput).toLocaleDateString('ru-RU');
                                  addHomework(subject, task, deadline);
                                  (document.getElementById('hw-subject') as HTMLInputElement).value = '';
                                  (document.getElementById('hw-task') as HTMLTextAreaElement).value = '';
                                  (document.getElementById('hw-deadline') as HTMLInputElement).value = '';
                                }
                              }}
                            >
                              Добавить
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {homeworks.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="ClipboardList" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Пока нет домашних заданий</p>
                    </div>
                  ) : (
                    homeworks.map((hw) => (
                    <div 
                      key={hw.id} 
                      className={`p-4 rounded-lg border bg-card transition-all ${
                        hw.completed ? 'opacity-60' : ''
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <Checkbox 
                          checked={hw.completed}
                          onCheckedChange={() => toggleHomework(hw.id)}
                          className="mt-1"
                          disabled={userRole !== 'student'}
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className={`font-medium text-lg ${hw.completed ? 'line-through' : ''}`}>
                                {hw.subject}
                              </p>
                              <p className={`text-muted-foreground mt-1 ${hw.completed ? 'line-through' : ''}`}>
                                {hw.task}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <Badge variant="outline" className="mb-2">
                                <Icon name="Calendar" size={12} className="mr-1" />
                                {hw.deadline}
                              </Badge>
                              {hw.completed && (
                                <Badge className="bg-green-500 block">
                                  Выполнено
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Расписание уроков</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {schedule.map((lesson, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                    >
                      <div className="text-center shrink-0 w-32">
                        <Badge variant="outline" className="text-sm">
                          {lesson.time}
                        </Badge>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-lg">{lesson.subject}</p>
                        <p className="text-sm text-muted-foreground">{lesson.teacher}</p>
                      </div>
                      <Badge className="bg-primary">
                        <Icon name="MapPin" size={12} className="mr-1" />
                        Кабинет {lesson.room}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teachers">
            <div className="grid gap-6 md:grid-cols-2">
              {teachers.map((teacher, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                          {teacher.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{teacher.name}</CardTitle>
                        <Badge variant="secondary" className="mt-2">{teacher.subject}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Icon name="Mail" size={16} className="text-muted-foreground" />
                      <a href={`mailto:${teacher.email}`} className="text-primary hover:underline">
                        {teacher.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Icon name="Phone" size={16} className="text-muted-foreground" />
                      <a href={`tel:${teacher.phone}`} className="hover:text-primary">
                        {teacher.phone}
                      </a>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      <Icon name="MessageSquare" size={16} className="mr-2" />
                      Написать сообщение
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;