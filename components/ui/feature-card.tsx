import { cn } from '@/lib/utils';

interface CardProps {
  className?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export const CardBody = (
  { className, title, description, icon }: CardProps
) => (
  <div className={cn('text-start p-4 md:p-6', className)}>
    {icon && (
      <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4 w-fit">
        {icon}
      </div>
    )}
    <h3 className="text-lg font-bold mb-1 text-foreground">
      {title}
    </h3>
    <p className="text-wrap text-muted-foreground text-sm">{description}</p>
  </div>
);
//======================================
export const CardWithPlus = ({ children }: { children: React.ReactNode }) => {
  return (<div className="border w-full rounded-md overflow-hidden border-border bg-card">
    <div className="size-full bg-[url(/svg/plus.svg)] bg-repeat bg-[length:65px_65px]">
      <div className="size-full bg-gradient-to-tr from-card via-card/[0.93] to-card">
        {children}
      </div>
    </div>
  </div>);
};
