import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { Homework, UserRole } from './types';

interface HomeworkTabProps {
  homeworks: Homework[];
  userRole: UserRole;
  canManageContent: boolean;
  onToggleHomework: (id: number) => void;
  onAddHomework: (subject: string, task: string, deadline: string) => void;
}

export const HomeworkTab = ({ 
  homeworks, 
  userRole, 
  canManageContent, 
  onToggleHomework, 
  onAddHomework 
}: HomeworkTabProps) => {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [task, setTask] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleAddHomework = () => {
    if (subject && task && deadline) {
      const formattedDeadline = new Date(deadline).toLocaleDateString('ru-RU');
      onAddHomework(subject, task, formattedDeadline);
      setSubject('');
      setTask('');
      setDeadline('');
      setOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Домашние задания</span>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {homeworks.filter(hw => !hw.completed).length} активных
            </Badge>
            {canManageContent && (
              <Dialog open={open} onOpenChange={setOpen}>
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
                      <Input 
                        id="hw-subject" 
                        placeholder="Математика"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hw-task">Задание</Label>
                      <Textarea 
                        id="hw-task" 
                        placeholder="Описание задания" 
                        rows={3}
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hw-deadline">Срок выполнения</Label>
                      <Input 
                        id="hw-deadline" 
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                      />
                    </div>
                    <Button 
                      className="w-full"
                      onClick={handleAddHomework}
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
                    onCheckedChange={() => onToggleHomework(hw.id)}
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
  );
};
