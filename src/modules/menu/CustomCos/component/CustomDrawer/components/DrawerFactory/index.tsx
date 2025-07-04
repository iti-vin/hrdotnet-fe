import { Drawer } from "@mantine/core";
import { useDrawerStore } from "../../store/useDrawerStore";

import { DrawerBody } from "../DrawerBody";
import { DrawerFooter } from "../DrawerFooter";
import { DrawerHeader } from "../DrawerHeader.tsx";

export const DrawerFactory = () => {
  const { isOpen, title, content, footer, closeDrawer, width } = useDrawerStore();

  return (
    <Drawer
      opened={isOpen}
      onClose={closeDrawer}
      position="right"
      size={width ?? "xs"}
      withCloseButton={false}
      overlayProps={{
        backgroundOpacity: 0.1,
      }}
      classNames={{
        body: "flex flex-col gap-4 px-[30px]",
      }}>
      <DrawerHeader>{title}</DrawerHeader>
      <DrawerBody>{content}</DrawerBody>
      {footer && <DrawerFooter>{footer}</DrawerFooter>}
    </Drawer>
  );
};
