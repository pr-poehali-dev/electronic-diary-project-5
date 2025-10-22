import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { UserRole } from './types';

interface HeaderProps {
  userRole: UserRole;
  notifications: number;
  onNotificationClick: () => void;
  onLogout: () => void;
}

export const Header = ({ userRole, notifications, onNotificationClick, onLogout }: HeaderProps) => {
  const getRoleName = (role: UserRole) => {
    switch (role) {
      case 'student': return 'Ученик';
      case 'teacher': return 'Учитель';
      case 'deputy': return 'Завуч';
      case 'principal': return 'Директор';
    }
  };

  const getRoleInitials = (role: UserRole) => {
    switch (role) {
      case 'student': return 'УЧ';
      case 'teacher': return 'УТ';
      case 'deputy': return 'ЗВ';
      case 'principal': return 'ДР';
    }
  };

  return (
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
              onClick={onNotificationClick}
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
              {getRoleName(userRole)}
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary-foreground hover:bg-primary/80"
              onClick={onLogout}
            >
              <Icon name="LogOut" size={20} />
            </Button>
            <Avatar>
              <AvatarFallback className="bg-primary-foreground text-primary">
                {getRoleInitials(userRole)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};
