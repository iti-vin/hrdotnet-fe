import { AppShell, Flex } from "@mantine/core";
import { ReactNode } from "react";

export const DrawerFooter = ({ children }: { children: ReactNode }) => {
  return (
    <AppShell.Footer className="p-8">
      <Flex justify="end">{children}</Flex>
    </AppShell.Footer>
  );
};
