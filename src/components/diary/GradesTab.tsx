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
  return (
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
                          onAddGrade(subject, parseInt(gradeValue));
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
  );
};
