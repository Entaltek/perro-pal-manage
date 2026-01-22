import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Building,
  Palette,
  Bell,
  Shield,
  Users,
  Save,
  Sun,
  Moon,
} from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [theme, setTheme] = useState<'perromies' | 'corporate'>('perromies');
  const [notifications, setNotifications] = useState(true);

  const toggleTheme = () => {
    const newTheme = theme === 'perromies' ? 'corporate' : 'perromies';
    setTheme(newTheme);
    
    if (newTheme === 'corporate') {
      document.documentElement.classList.add('theme-corporate');
    } else {
      document.documentElement.classList.remove('theme-corporate');
    }
    
    toast.success(`Tema cambiado a ${newTheme === 'perromies' ? 'Perromies 🐕' : 'Corporativo 💼'}`);
  };

  const handleSave = () => {
    toast.success('Configuración guardada exitosamente');
  };

  return (
    <MainLayout>
      <div className="max-w-2xl space-y-8">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">
            Configuración
          </h2>
          <p className="text-muted-foreground">
            Personaliza tu experiencia en Perromies
          </p>
        </div>

        {/* Business Info */}
        <section className="glass-card p-6 space-y-4 animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl gradient-warm">
              <Building className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-display font-bold text-lg">Información del Negocio</h3>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="businessName">Nombre del Negocio</Label>
              <Input id="businessName" defaultValue="Perromies" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" defaultValue="+52 555 123 4567" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="address">Dirección</Label>
              <Input id="address" defaultValue="Av. Ejemplo 123, Col. Centro, CDMX" />
            </div>
          </div>
        </section>

        {/* Theme */}
        <section className="glass-card p-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl gradient-warm">
              <Palette className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-display font-bold text-lg">Apariencia</h3>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Tema Visual</p>
              <p className="text-sm text-muted-foreground">
                {theme === 'perromies' ? 'Cálido y lúdico 🐕' : 'Corporativo y profesional 💼'}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={toggleTheme}
              className="gap-2"
            >
              {theme === 'perromies' ? (
                <>
                  <Moon className="h-4 w-4" />
                  Cambiar a Corporativo
                </>
              ) : (
                <>
                  <Sun className="h-4 w-4" />
                  Cambiar a Perromies
                </>
              )}
            </Button>
          </div>

          <Separator className="my-4" />

          {/* Theme Preview */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                if (theme !== 'perromies') toggleTheme();
              }}
              className={`p-4 rounded-xl border-2 transition-all ${
                theme === 'perromies'
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-[#F2C078]" />
                <div className="w-6 h-6 rounded-full bg-[#4A3B32]" />
                <div className="w-6 h-6 rounded-full bg-[#FF2E4D]" />
                <div className="w-6 h-6 rounded-full bg-[#76C950]" />
              </div>
              <p className="font-medium text-left">Perromies</p>
              <p className="text-xs text-muted-foreground text-left">Cálido y divertido</p>
            </button>
            <button
              onClick={() => {
                if (theme !== 'corporate') toggleTheme();
              }}
              className={`p-4 rounded-xl border-2 transition-all ${
                theme === 'corporate'
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-[#0179B1]" />
                <div className="w-6 h-6 rounded-full bg-[#013762]" />
                <div className="w-6 h-6 rounded-full bg-[#47DAD6]" />
                <div className="w-6 h-6 rounded-full bg-[#004C7A]" />
              </div>
              <p className="font-medium text-left">Corporativo</p>
              <p className="text-xs text-muted-foreground text-left">Profesional</p>
            </button>
          </div>
        </section>

        {/* Notifications */}
        <section className="glass-card p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl gradient-warm">
              <Bell className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-display font-bold text-lg">Notificaciones</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Alertas de vacunas</p>
                <p className="text-sm text-muted-foreground">
                  Notificar cuando una vacuna esté por vencer
                </p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Recordatorios de check-out</p>
                <p className="text-sm text-muted-foreground">
                  Avisar cuando se acerque la hora de salida
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </section>

        {/* Capacity */}
        <section className="glass-card p-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl gradient-warm">
              <Users className="h-5 w-5 text-primary-foreground" />
            </div>
            <h3 className="font-display font-bold text-lg">Capacidad</h3>
          </div>

          <div className="space-y-2">
            <Label htmlFor="capacity">Capacidad máxima de perros</Label>
            <Input id="capacity" type="number" defaultValue="20" className="max-w-32" />
            <p className="text-sm text-muted-foreground">
              Número máximo de perros que puedes atender al mismo tiempo
            </p>
          </div>
        </section>

        {/* Save Button */}
        <Button variant="gradient" size="lg" className="w-full gap-2" onClick={handleSave}>
          <Save className="h-5 w-5" />
          Guardar Cambios
        </Button>
      </div>
    </MainLayout>
  );
}
