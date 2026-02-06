import { Button } from "@heroui/react";

export const CardAccess = ({
  title,
  description,
  action,
  actionLabel,
  children,
}) => {
  return (
    <div
      className="
        w-full
        rounded-2xl
        border
        border-default-200
        dark:border-zinc-800
        bg-base
        dark:bg-zinc-900
        p-6
        flex
        flex-col
        gap-6
        shadow-2xs
        transition-all
        hover:shadow-md
      "
    >
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold text-primary">{title}</h3>
        <p className="text-sm text-default-600 dark:text-default-400">
          {description}
        </p>
      </div>

      {/* Ação customizada (prioritária) */}
      {action && (
        <Button
          onPress={action}
          className="
            bg-primary
            text-white
            rounded-xl
            font-medium
            hover:opacity-90
            transition
          "
        >
          {actionLabel}
        </Button>
      )}

      {/* Fallback com children */}
      {!action && children && (
        <Button
          className="
            bg-primary
            text-white
            rounded-xl
            font-medium
            hover:opacity-90
            transition
          "
        >
          {children}
        </Button>
      )}
    </div>
  );
};
