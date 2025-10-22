import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { Teacher } from './types';

interface TeachersTabProps {
  teachers: Teacher[];
}

export const TeachersTab = ({ teachers }: TeachersTabProps) => {
  return (
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
  );
};
