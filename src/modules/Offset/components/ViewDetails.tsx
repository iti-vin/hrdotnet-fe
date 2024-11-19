import { IconCalendar, IconNotes } from "@tabler/icons-react";
import { Modal } from "@shared/template/";

import {
  Container,
  Flex,
  Group,
  MultiSelect,
  Select,
  Text,
  Textarea,
  TextInput,
  useMatches,
} from "@mantine/core";
import { DatePickerInput, TimeInput } from "@mantine/dates";
import Attachment from "@shared/template/main/Dropzone";
import useOffsetStore from "../store/useOff";
import { Alerts } from "@/modules/Offset/components/AlertOffset";
import { Buttons } from "@/modules/Offset/components/Button";
import { useDisclosure } from "@mantine/hooks";

interface ModalViewProps {
  opened: boolean;
  onClose: () => void;
  buttonClose: () => void;
  tabs?: "List" | "Review" | "Approve";
}

export default function ViewDetails({
  opened,
  onClose,
  buttonClose,
  tabs = "List",
}: ModalViewProps) {
  const size = useMatches({
    base: "100%",
    sm: "70%",
  });

  const { selectedData, setSelectedData } = useOffsetStore();

  let color;
  switch (selectedData.filingStatus) {
    case "Filed":
      color = "#9B51E0";
      break;
    case "Approved":
      color = "#1E8449";
      break;
    case "Cancelled":
      color = "#FF4B34";
      break;
    case "Reviewed":
      color = "#FF7800";
      break;
    default:
      color = "gray";
  }

  const [dialog, { open: dialogOpen, close: dialogClose }] =
    useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => {
          setSelectedData({});
          onClose();
        }}
        centered
        size={size}
        buttonClose={() => {
          setSelectedData({});
          buttonClose();
        }}
        title={selectedData.name}
      >
        <Flex
          direction={{ base: "column", sm: "row" }}
          className="w-full"
          gap={10}
          px={12}
        >
          <Container size="lg" className="container-view h-auto">
            <Text className="text-[#559cda] font-bold">
              General Information
            </Text>

            <Group gap={10}>
              <MultiSelect
                size="md"
                label="Offset Date"
                placeholder="Select Offset Date"
                radius={8}
                data={["React", "Angular", "Vue", "Svelte"]}
                className="border-none w-full"
                disabled
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
              <Flex
                direction={{ base: "column", sm: "row" }}
                justify="space-between"
                className="w-full"
                gap={20}
              >
                <Select
                  size="md"
                  label="Shift"
                  placeholder="Shift"
                  radius={8}
                  data={["React", "Angular", "Vue", "Svelte"]}
                  className="border-none w-full"
                  disabled
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                />
                <TextInput
                  size="md"
                  radius={8}
                  label="Reference No."
                  placeholder="0000-0000-0000"
                  className="w-full"
                  disabled
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                />
              </Flex>
              <Flex
                direction={{ base: "column", sm: "row" }}
                justify="space-between"
                className="w-full"
                gap={20}
              >
                <TimeInput
                  size="md"
                  radius={8}
                  label="Actual Offset In"
                  className="w-full"
                  disabled
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                />
                <TimeInput
                  size="md"
                  radius={8}
                  label="Actual Offset out"
                  className="w-full"
                  disabled
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                />
              </Flex>
              <Flex
                direction={{ base: "column", sm: "row" }}
                justify="space-between"
                className="w-full"
                gap={20}
              >
                <TimeInput
                  size="md"
                  radius={8}
                  label="Offset From"
                  className="w-full"
                  disabled
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                />
                <TimeInput
                  size="md"
                  radius={8}
                  label="Offset To"
                  className="w-full"
                  disabled
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                />
              </Flex>
              <DatePickerInput
                valueFormat="YYYY MMM DD"
                label="Duration"
                placeholder="Pick date"
                className="w-full"
                size="md"
                radius={8}
                rightSection={<IconCalendar />}
                disabled
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
            </Group>
          </Container>

          <Container size="lg" className="container-view">
            <Text className="text-[#559cda] font-bold">
              Detailed Information
            </Text>

            <Group className="w-full">
              <Flex direction="column" className="w-full" gap={2}>
                <Text size="md" fw={500} className=" flex gap-1" c="#6d6d6d">
                  Status
                </Text>
                <Text
                  size="md"
                  className="w-full flex flex-col text-center justify-center h-10 rounded-md"
                  c="white"
                  bg={color}
                  children={selectedData.filingStatus}
                />
              </Flex>

              <Flex
                direction={{ base: "column", sm: "row" }}
                className="w-full"
                gap={20}
              >
                <TextInput
                  disabled
                  size="md"
                  radius={8}
                  label="Document No."
                  placeholder="0000-0000-0000"
                  className="w-full"
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                />
                <DatePickerInput
                  disabled
                  valueFormat="YYYY MMM DD"
                  label="Transaction Date"
                  placeholder="mm/dd/yyyy"
                  className="w-full"
                  size="md"
                  radius={8}
                  rightSection={<IconCalendar />}
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                />
              </Flex>

              <Textarea
                disabled
                size="md"
                radius="md"
                label="Endorsement Information"
                placeholder="Endorsed by Jane Smith on October 25, 2024 at 6:43 PM."
                className="w-full"
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
              <Textarea
                disabled
                size="md"
                radius="md"
                label="Approval Information"
                placeholder="Approved by Jane Smith on October 25, 2024 at 6:43 PM (Batch Approval)"
                className="w-full"
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
              <Textarea
                disabled
                size="md"
                radius="md"
                label="Cancellation Information"
                placeholder="No Information"
                className="w-full"
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
            </Group>
          </Container>
        </Flex>

        <Container size="lg" className="container-view">
          <Textarea
            size="md"
            label="Reason"
            placeholder="Briefly state the reason for filing overtime"
            disabled
            className="w-full"
            styles={{ input: { height: "100px" }, label: { fontSize: "16px" } }}
            radius={8}
            classNames={{ label: "text-[#559cda] font-bold" }}
          />
        </Container>

        <Container size="lg" className="container-view">
          <Attachment
            itHasValue
            isColored
            isBold
            content={
              <Flex
                gap={5}
                direction="row"
                align="center"
                justify="center"
                className="w-full"
                bg="#EEEEEE"
                p={5}
              >
                <Flex direction="row" align="center" gap={5}>
                  <IconNotes color="#6d6d6d" />
                  <Text
                    size="sm"
                    c="#6d6d6d"
                    fw={500}
                    inline
                    className="flex justify-center"
                  >
                    File: Attachment.pdf Size: 20 MB
                  </Text>
                </Flex>
              </Flex>
            }
          />
        </Container>

        <Container size="lg" className="container-view">
          <Textarea
            disabled
            size="md"
            label="Edit Log"
            placeholder="Briefly state the reason for filing overtime"
            className="w-full"
            styles={{ input: { height: "100px" } }}
            radius={8}
            classNames={{ label: "text-[#559cda] font-bold" }}
          />
        </Container>
        <Buttons
          tabs={tabs}
          status={selectedData.filingStatus}
          open={() => {
            setSelectedData({});
            onClose();
            dialogOpen();
          }}
          close={() => {
            setSelectedData({});
            buttonClose();
          }}
        />
      </Modal>
      <Alerts
        opened={dialog}
        onClose={dialogClose}
        buttonClose={dialogClose}
        tabs={tabs}
      />
    </>
  );
}
