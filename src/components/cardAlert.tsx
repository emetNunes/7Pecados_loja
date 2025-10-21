type CardAlertProps = {
  title: string;
  description: string;
};

export const CardAlert = ({ title, description }: CardAlertProps) => {
  return (
    <div className="flex flex-col bg-base rounded-xl shadow-2xs px-6 py-8 gap-4">
      <div className="font-bold">{title}</div>
      <div className="font-md text-primary">{description}</div>
    </div>
  );
};
