import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { ScheduleLesson } from './types';

interface ScheduleTabProps {
  schedule: ScheduleLesson[];
  canManageContent: boolean;
  onAddLesson: (time: string, subject: string, teacher: string, room: string) => void;
  onDeleteLesson: (index: number) => void;
}

export const ScheduleTab = ({ schedule, canManageContent, onAddLesson, onDeleteLesson }: ScheduleTabProps) => {
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState('');
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [room, setRoom] = useState('');

  const handleAddLesson = () => {
    if (time && subject && teacher && room) {
      onAddLesson(time, subject, teacher, room);
      setTime('');
      setSubject('');
      setTeacher('');
      setRoom('');
      setOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Расписание уроков</span>
          {canManageContent && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Добавить урок
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить урок в расписание</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="lesson-time">Время</Label>
                    <Input 
                      id="lesson-time" 
                      placeholder="08:30 - 09:15"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lesson-subject">Предмет</Label>
                    <Input 
                      id="lesson-subject" 
                      placeholder="Математика"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lesson-teacher">Учитель</Label>
                    <Input 
                      id="lesson-teacher" 
                      placeholder="Иванова М.А."
                      value={teacher}
                      onChange={(e) => setTeacher(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lesson-room">Кабинет</Label>
                    <Input 
                      id="lesson-room" 
                      placeholder="204"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                    />
                  </div>
                  <Button 
                    className="w-full"
                    onClick={handleAddLesson}
                  >
                    Добавить
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {schedule.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="Calendar" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Расписание пока не составлено</p>
            </div>
          ) : (
            schedule.map((lesson, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors group"
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
                {canManageContent && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => onDeleteLesson(idx)}
                  >
                    <Icon name="Trash2" size={16} className="text-destructive" />
                  </Button>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};
