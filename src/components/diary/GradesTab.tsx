import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Grade } from './types';

interface GradesTabProps {
  grades: Grade[];
  averageGrade: string;
  canManageContent: boolean;
  onAddGrade: (subject: string, grade: number) => void;
}

export const GradesTab = ({ grades, averageGrade, canManageContent, onAddGrade }: GradesTabProps) => {
  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState('');
  const [gradeValue, setGradeValue] = useState('');
  
  const subjects = Array.from(new Set(grades.map(g => g.subject)));
  
  const gradesBySubject = subjects.reduce((acc, subject) => {
    acc[subject] = grades.filter(g => g.subject === subject);
    return acc;
  }, {} as Record<string, Grade[]>);

  const handleAddGrade = () => {
    if (subject && gradeValue) {
      onAddGrade(subject, parseInt(gradeValue));
      setSubject('');
      setGradeValue('');
      setOpen(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Все оценки</span>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Средний балл: {averageGrade}</Badge>
            {canManageContent && (
              <Dialog open={open} onOpenChange={setOpen}>
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
                      <Input 
                        id="grade-subject" 
                        placeholder="Математика" 
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade-value">Оценка</Label>
                      <Select value={gradeValue} onValueChange={setGradeValue}>
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
                      onClick={handleAddGrade}
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
          {grades.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="BookOpen" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Пока нет оценок</p>
            </div>
          ) : (
            <div className="space-y-6">
              {subjects.map((subject) => (
                <div key={subject} className="border rounded-lg p-4 bg-card">
                  <h3 className="font-semibold text-lg mb-4">{subject}</h3>
                  <div className="flex flex-wrap gap-2">
                    {gradesBySubject[subject].map((grade, idx) => (
                      <div
                        key={idx}
                        className="relative group"
                      >
                        <div
                          className={`w-12 h-12 flex items-center justify-center border-2 rounded font-bold text-xl transition-all hover:scale-110 ${
                            grade.grade === 5
                              ? 'bg-green-50 border-green-500 text-green-700'
                              : grade.grade === 4
                              ? 'bg-blue-50 border-blue-500 text-blue-700'
                              : grade.grade === 3
                              ? 'bg-orange-50 border-orange-500 text-orange-700'
                              : 'bg-red-50 border-red-500 text-red-700'
                          } ${grade.isNew ? 'ring-2 ring-destructive ring-offset-2 animate-pulse' : ''}`}
                        >
                          {grade.grade}
                        </div>
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border z-10">
                          {grade.date}
                          {grade.isNew && <span className="ml-2 text-destructive font-medium">Новая</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
