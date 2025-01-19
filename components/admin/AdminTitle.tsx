import clsx from 'clsx';

interface TitleProps {
  className?: string;
  title: string;
}

export default function AdminTitle({ title, className }: TitleProps) {
  return (
    <h2
      className={clsx(
        'text-accentColor font-semibold sm:text-lg md:text-xl lg:text-2xl',
        className,
      )}
    >
      {title}
    </h2>
  );
}
