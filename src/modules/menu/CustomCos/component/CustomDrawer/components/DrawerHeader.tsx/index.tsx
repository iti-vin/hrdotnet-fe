import { ActionIcon, Box, Group, Text } from "@mantine/core";
import { X } from "lucide-react";
import { ReactNode } from "react";
import { useDrawerStore } from "../../store/useDrawerStore";

export const DrawerHeader = ({ children }: { children: ReactNode }) => {
  const closeDrawer = useDrawerStore((state) => state.closeDrawer);
  const handleCloseDrawer = () => {
    closeDrawer();
  };
  return (
    <Box className=" border-b-2 border-[#A8A8A8] pb-2 ">
      <Group justify="space-between">
        <Text className="text-[#559CDA] font-semibold text-[22px]">{children}</Text>
        <ActionIcon variant="transparent" onClick={handleCloseDrawer}>
          <X color="#A8A8A8" />
        </ActionIcon>
      </Group>
    </Box>
  );
};
