interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: string;
}

export default function Card({ children, className = '', title, icon }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 ${className}`}>
      {title && (
        <h3 className="text-base font-bold text-primary-600 mb-3 flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
