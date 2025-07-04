import { Button, Checkbox, Flex, Group, NumberInput, Select, Textarea } from "@mantine/core";
import { FilePlus } from "lucide-react";
import { useModalStore } from "../../CustomModal/store/useModalStore";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import { ModalFactory } from "../../CustomModal/components/ModalFactory";
import { IconCalendarFilled } from "@tabler/icons-react";
import FileUploadButton from "../FileUploadBtn";

export const NewRequestBtn = () => {
  const CalendarIcon = <IconCalendarFilled size={18} stroke={1.5} />;
  const openModal = useModalStore((state) => state.openModal);
  const handleNewRequest = () => {
    openModal({
      title: "New Request",
      content: (
        <>
          <Flex justify="center" direction="column" gap="lg">
            <Group grow>
              <DateInput
                rightSection={CalendarIcon}
                clearable
                defaultValue={dayjs().format("YYYY-MM-DD")}
                label="From Date"
                placeholder="mm/dd/yyyy"
              />
              <DateInput
                rightSection={CalendarIcon}
                clearable
                defaultValue={dayjs().format("YYYY-MM-DD")}
                label="To Date"
                placeholder="mm/dd/yyyy"
              />
            </Group>
            <Group grow>
              <Select label="Request Schedule" placeholder="Same Day" data={["Same Day", "Rest Day", "Regular"]} />
              <NumberInput label="Reference Number" placeholder="xxxxx-xxxxx-xxxxx" hideControls />
            </Group>
            <Checkbox label="Rest Day" />
            <Textarea label="Reason" placeholder="Briefly state the reason for filling leave." />
            <FileUploadButton />
          </Flex>
        </>
      ),
      footer: (
        <Button
          variant="default"
          className="w-[198px] h-[42px] font-medium text-[]"
          style={{
            background: "linear-gradient(90deg, #559CDA 0%, #7BADFF 24%, #FFB58D 73%, #ED8028 100%)",
            borderRadius: "10px",
            color: "white",
          }}>
          Submit
        </Button>
      ),
      type: "info",
      width: "xl",
    });
  };
  return (
    <>
      <Button
        className="bg-[#559cda] text-white hover:bg-[#559cda] hover:text-white rounded-lg"
        leftSection={<FilePlus />}
        onClick={handleNewRequest}>
        New Request
      </Button>
      <ModalFactory />
    </>
  );
};
