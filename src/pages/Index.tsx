import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';

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
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState(2);

  const [grades] = useState<Grade[]>([
    { subject: 'Математика', grade: 5, date: '20.10.2025', isNew: true },
    { subject: 'Русский язык', grade: 4, date: '20.10.2025' },
    { subject: 'История', grade: 5, date: '19.10.2025' },
    { subject: 'Физика', grade: 4, date: '18.10.2025' },
    { subject: 'Английский язык', grade: 5, date: '18.10.2025' },
    { subject: 'Химия', grade: 3, date: '17.10.2025', isNew: true },
  ]);

  const [homeworks, setHomeworks] = useState<Homework[]>([
    { id: 1, subject: 'Математика', task: 'Решить задачи №154-160', deadline: '23.10.2025', completed: false },
    { id: 2, subject: 'Литература', task: 'Прочитать главы 5-7', deadline: '24.10.2025', completed: false },
    { id: 3, subject: 'Физика', task: 'Лабораторная работа №3', deadline: '25.10.2025', completed: false },
    { id: 4, subject: 'История', task: 'Подготовить доклад', deadline: '26.10.2025', completed: true },
  ]);

  const [teachers] = useState<Teacher[]>([
    { name: 'Иванова Мария Петровна', subject: 'Математика', email: 'ivanova@school.ru', phone: '+7 (999) 123-45-67' },
    { name: 'Петров Сергей Иванович', subject: 'Русский язык', email: 'petrov@school.ru', phone: '+7 (999) 234-56-78' },
    { name: 'Сидорова Анна Викторовна', subject: 'История', email: 'sidorova@school.ru', phone: '+7 (999) 345-67-89' },
    { name: 'Козлов Дмитрий Александрович', subject: 'Физика', email: 'kozlov@school.ru', phone: '+7 (999) 456-78-90' },
  ]);

  const [schedule] = useState<ScheduleLesson[]>([
    { time: '08:30 - 09:15', subject: 'Математика', teacher: 'Иванова М.П.', room: '205' },
    { time: '09:25 - 10:10', subject: 'Русский язык', teacher: 'Петров С.И.', room: '312' },
    { time: '10:25 - 11:10', subject: 'История', teacher: 'Сидорова А.В.', room: '408' },
    { time: '11:30 - 12:15', subject: 'Физика', teacher: 'Козлов Д.А.', room: '215' },
    { time: '12:25 - 13:10', subject: 'Английский язык', teacher: 'Смирнова О.Н.', room: '301' },
  ]);

  const averageGrade = (grades.reduce((acc, g) => acc + g.grade, 0) / grades.length).toFixed(1);

  const toggleHomework = (id: number) => {
    setHomeworks(homeworks.map(hw => hw.id === id ? { ...hw, completed: !hw.completed } : hw));
  };

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
              <Avatar>
                <AvatarFallback className="bg-primary-foreground text-primary">УЧ</AvatarFallback>
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
                  <Badge variant="secondary">Средний балл: {averageGrade}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-3">
                    {grades.map((grade, idx) => (
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
                    ))}
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
                  <Badge variant="secondary">
                    {homeworks.filter(hw => !hw.completed).length} активных
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {homeworks.map((hw) => (
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
                  ))}
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