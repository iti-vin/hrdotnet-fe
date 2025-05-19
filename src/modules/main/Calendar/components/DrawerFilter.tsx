import { Button, Divider, Drawer, Flex, MultiSelect, Text, TextInput } from "@mantine/core";
import { useCalendarStore } from "../store";
import { IconX } from "@tabler/icons-react";

export default function DrawerFilter() {
  const { drawer, setDrawer } = useCalendarStore();
  return (
    <Drawer
      opened={drawer}
      onClose={() => setDrawer(false)}
      position="right"
      withCloseButton={false}
      size="xs"
      overlayProps={{ backgroundOpacity: 0, blur: 0 }}
      styles={{ body: { height: "100%" } }}>
      <form onSubmit={undefined} className="w-full h-full">
        <div className="w-full h-full flex flex-col gap justify-between">
          <div className="flex flex-col gap-2 2xl:gap-4">
            <Flex className="w-full" direction="column" gap={10} mt={5}>
              <Flex direction="row" justify="space-between">
                <Text fw={700} fz={22} c="#559CDA">
                  Filter By
                </Text>
                <IconX className="cursor-pointer" onClick={() => setDrawer(false)} size={30} color="gray" />
              </Flex>
            </Flex>
            <Divider size={2} color="#edeeed" className="w-full" />
            <Flex className="flex flex-col gap-2">
              <TextInput
                label="Employee Name"
                placeholder="Type Employee Name"
                radius="md"
                classNames={{ input: "poppins" }}
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
              <Divider size={2} h={10} color="#edeeed" className="w-full" />
              <TextInput
                label="Position"
                placeholder="Type Position"
                radius="md"
                classNames={{ input: "poppins" }}
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
              <Divider size={2} h={10} color="#edeeed" className="w-full" />
              <MultiSelect
                label="Status"
                radius="md"
                classNames={{ input: "poppins" }}
                data={["In Office", "Out of the Office"]}
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
              <Divider size={2} h={10} color="#edeeed" className="w-full" />
            </Flex>
          </div>
          <Flex className="w-full flex flex-row justify-end gap-3">
            <Button variant="outline" radius="md" w={100} onClick={undefined}>
              CLEAR
            </Button>
            <Button className="border-none br-gradient" radius="md" type="submit" w={100}>
              FILTER
            </Button>
          </Flex>
        </div>
      </form>
    </Drawer>
  );
}
