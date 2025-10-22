import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface LoginFormProps {
  username: string;
  password: string;
  loginError: string;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onLogin: () => void;
}

export const LoginForm = ({
  username,
  password,
  loginError,
  onUsernameChange,
  onPasswordChange,
  onLogin
}: LoginFormProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <Icon name="GraduationCap" size={48} className="text-primary" />
          </div>
          <CardTitle className="text-center text-2xl">Электронный дневник</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Имя пользователя</Label>
            <Input
              id="username"
              placeholder="Введите имя"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onLogin()}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => onPasswordChange(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onLogin()}
            />
          </div>
          {loginError && (
            <p className="text-sm text-destructive">{loginError}</p>
          )}
          <Button onClick={onLogin} className="w-full">
            <Icon name="LogIn" size={16} className="mr-2" />
            Войти
          </Button>
          <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
            <p className="font-medium mb-2">Тестовые аккаунты:</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>ученик / 1234</li>
              <li>учитель / 1234</li>
              <li>завуч / 1234</li>
              <li>директор / 1234</li>
              <li>Директор / 89223109976</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};