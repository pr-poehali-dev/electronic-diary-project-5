import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { ScheduleLesson } from './types';

interface ScheduleTabProps {
  schedule: ScheduleLesson[];
}

export const ScheduleTab = ({ schedule }: ScheduleTabProps) => {
  return (
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
  );
};
