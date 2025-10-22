import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { Grade, Homework, ScheduleLesson } from './types';

interface DashboardTabProps {
  grades: Grade[];
  homeworks: Homework[];
  schedule: ScheduleLesson[];
  averageGrade: string;
}

export const DashboardTab = ({ grades, homeworks, schedule, averageGrade }: DashboardTabProps) => {
  return (
    <div className="space-y-6">
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
    </div>
  );
};
