import { Button } from "@heroui/react";

export const CardAccess = ({
  title,
  description,
  clickbutton = false,
  children = false,
}) => {
  return (
    <div className="flex flex-col bg-base px-6 py-8 gap-8 shadow-2xs rounded-xl w-full">
      <div className="text-primary font-bold text-xl">{title}</div>
      <div className="defaut text-sm">{description}</div>
      {clickbutton}
      {!children ? (
        ""
      ) : (
        <Button className="bg-primary text-base rounded-xl">
          <a href="/service" className="default invert">
            {children}
          </a>
        </Button>
      )}
    </div>
  );
};
