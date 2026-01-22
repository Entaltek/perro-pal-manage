import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'accent';
}

const variantStyles = {
  default: 'bg-card',
  primary: 'gradient-warm',
  success: 'bg-success',
  warning: 'bg-warning',
  accent: 'bg-accent',
};

const textStyles = {
  default: 'text-foreground',
  primary: 'text-primary-foreground',
  success: 'text-success-foreground',
  warning: 'text-warning-foreground',
  accent: 'text-accent-foreground',
};

const subtitleStyles = {
  default: 'text-muted-foreground',
  primary: 'text-primary-foreground/80',
  success: 'text-success-foreground/80',
  warning: 'text-warning-foreground/80',
  accent: 'text-accent-foreground/80',
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  variant = 'default',
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-2xl border border-border/50 shadow-card hover-lift animate-fade-in",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className={cn("text-sm font-medium", subtitleStyles[variant])}>
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className={cn("text-3xl font-bold font-display", textStyles[variant])}>
              {value}
            </h3>
            {trend && (
              <span
                className={cn(
                  "text-sm font-medium px-2 py-0.5 rounded-full",
                  trend.positive
                    ? "bg-success/20 text-success"
                    : "bg-destructive/20 text-destructive"
                )}
              >
                {trend.positive ? '+' : ''}{trend.value}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className={cn("text-sm", subtitleStyles[variant])}>{subtitle}</p>
          )}
        </div>
        <div
          className={cn(
            "p-3 rounded-xl",
            variant === 'default' ? 'bg-primary/10' : 'bg-white/20'
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
