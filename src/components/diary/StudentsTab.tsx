import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Student } from './types';

interface StudentsTabProps {
  students: Student[];
  canManageContent: boolean;
  onAddStudent: (name: string, classNum: string, email: string, phone: string) => void;
  onDeleteStudent: (id: number) => void;
}

export const StudentsTab = ({ students, canManageContent, onAddStudent, onDeleteStudent }: StudentsTabProps) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [classNum, setClassNum] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddStudent = () => {
    if (name && classNum && email && phone) {
      onAddStudent(name, classNum, email, phone);
      setName('');
      setClassNum('');
      setEmail('');
      setPhone('');
      setOpen(false);
    }
  };

  return (
    <div>
      {canManageContent && (
        <div className="mb-6 flex justify-end">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить ученика
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Добавить ученика</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="student-name">ФИО</Label>
                  <Input 
                    id="student-name" 
                    placeholder="Петров Иван Сергеевич"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-class">Класс</Label>
                  <Input 
                    id="student-class" 
                    placeholder="9А"
                    value={classNum}
                    onChange={(e) => setClassNum(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-email">Email</Label>
                  <Input 
                    id="student-email" 
                    type="email"
                    placeholder="petrov@student.school.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-phone">Телефон</Label>
                  <Input 
                    id="student-phone" 
                    placeholder="+7 (999) 123-45-67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <Button 
                  className="w-full"
                  onClick={handleAddStudent}
                >
                  Добавить
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-2">
        {students.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-muted-foreground">
            <Icon name="GraduationCap" size={48} className="mx-auto mb-4 opacity-50" />
            <p>Пока нет учеников</p>
          </div>
        ) : (
          students.map((student) => (
            <Card key={student.id} className="hover:shadow-lg transition-shadow group relative">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg bg-secondary text-secondary-foreground">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <Badge variant="secondary" className="mt-2">Класс {student.class}</Badge>
                  </div>
                  {canManageContent && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => onDeleteStudent(student.id)}
                    >
                      <Icon name="Trash2" size={16} className="text-destructive" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Icon name="Mail" size={16} className="text-muted-foreground" />
                  <a href={`mailto:${student.email}`} className="text-primary hover:underline">
                    {student.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Icon name="Phone" size={16} className="text-muted-foreground" />
                  <a href={`tel:${student.phone}`} className="hover:text-primary">
                    {student.phone}
                  </a>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
