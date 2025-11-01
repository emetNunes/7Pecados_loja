// DrawerComponent.tsx

import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

interface DrawerComponentProps {
  trigger: React.ReactElement;
  title: string;
  children: React.ReactNode;
}

export const DrawerComponent: React.FC<DrawerComponentProps> = ({
  trigger,
  title,
  children,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {React.cloneElement(trigger, { onPress: onOpen })}
      <Drawer
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="transparent"
        className="relative h-screen left-[50%] translate-x-[-54%] bg-base"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                {title}
              </DrawerHeader>

              <DrawerBody>{children}</DrawerBody>

              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
