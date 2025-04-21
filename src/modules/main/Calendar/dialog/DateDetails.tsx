import { ModalProps } from "@shared/assets/types/Modal";
import Modal from "@/layout/main/dialog/Modal";
import { Flex, Stack, Text, useMatches } from "@mantine/core";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import {
  IconBriefcase,
  IconClockPlay,
  IconClockX,
  IconDeviceMobile,
  IconFingerprint,
  IconSquareArrowLeft,
  IconSquareArrowRight,
} from "@tabler/icons-react";
import { useCalendarStore } from "../store";

interface ViewInterface extends ModalProps {
  date: string;
}

export default function View({ opened, onClose, buttonClose, date }: ViewInterface) {
  const size = useMatches({ base: "100%", sm: "40%" });
  const { setDialog } = useCalendarStore();
  return (
    <Modal
      opened={opened}
      buttonClose={buttonClose}
      title={DateTimeUtils.getIsoDateFullWord(date)}
      radius={10}
      centered
      size={size}
      isIconsActionsRequired
      onClose={onClose}>
      {/* SCHEDULE */}
      <Stack className="shadow-md shadow-slate-400 w-full rounded-lg py-2">
        <Text className="text-green-500 font-semibold text-center">SHIFT SCHEDULE 08:00 AM - 06:00 PM</Text>
      </Stack>
      {/* TIME RECORD */}
      <Stack
        className="flex flex-row justify-between shadow-md shadow-slate-400 w-full h-auto rounded-lg py-3 px-4"
        onClick={() => setDialog("RequestDetails")}>
        <Flex className="gap-2">
          <IconSquareArrowRight color="#ED8028" />
          <Flex className="flex flex-col gap-1">
            <Flex className="gap-2">
              <Text>TIME-IN : </Text>
              <Text className="font-semibold">7:59 AM</Text>
            </Flex>
            <Flex className="flex flex-col gap-1">
              <Text size="10px">12 Catanduanes St. Quezon City Philippines</Text>
              <Flex className="gap-1">
                <IconDeviceMobile size={10} color="#ED8028" />
                <Text size="10px" className="text-[#ED8028]">
                  Via Mobile Application
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex className="gap-2">
          <IconSquareArrowLeft color="#559CDA" />
          <Flex className="flex flex-col gap-1">
            <Flex className="gap-2">
              <Text>TIME-OUT : </Text>
              <Text className="font-semibold">06:00 PM</Text>
            </Flex>
            <Flex className="flex flex-col gap-1">
              <Text size="10px">12 Catanduanes St. Quezon City Philippines</Text>
              <Flex className="gap-1">
                <IconFingerprint size={10} color="#ED8028" />
                <Text size="10px" className="text-[#ED8028]">
                  Biometrics
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Stack>
      {/* OFFICIAL BUSINESS */}
      <Stack
        className="flex flex-row justify-between w-full h-auto shadow-md shadow-slate-400 rounded-lg py-3 px-4 hover:bg-slate-200 cursor-pointer hover:scale-105"
        onClick={() => setDialog("RequestDetails")}>
        <Flex className="w-full gap-2">
          <IconBriefcase color="#559cda" />
          <Flex className="flex flex-col">
            <Text className="text-[#559cda] font-bold">OFFICIAL BUSINESS</Text>
            <Text className="text-[10px]">Document No: OB12345678</Text>
          </Flex>
        </Flex>
        <Flex className="w-full justify-center">
          <Flex className="flex flex-col">
            <Text className="text-[10px]">MM-DD-YYYY</Text>
            <Text className="text-[10px]">HH:MM - HH:MM</Text>
          </Flex>
        </Flex>
      </Stack>
      {/* OVERTIME */}
      <Stack
        className="flex flex-row justify-between w-full h-auto shadow-md shadow-slate-400 rounded-lg py-3 px-4 hover:bg-slate-200 cursor-pointer hover:scale-105"
        onClick={() => setDialog("RequestDetails")}>
        <Flex className="w-full gap-2">
          <IconClockX color="#559cda" />
          <Flex className="flex flex-col">
            <Text className="text-[#559cda] font-bold">MISSED LOG</Text>
            <Text className="text-[10px]">Document No: ML12345678</Text>
          </Flex>
        </Flex>
        <Flex className="w-full justify-center">
          <Flex className="flex flex-col">
            <Text className="text-[10px]">MM-DD-YYYY</Text>
            <Text className="text-[10px]">HH:MM - HH:MM</Text>
          </Flex>
        </Flex>
      </Stack>
      {/* OFFSET */}
      <Stack
        className="flex flex-row justify-between w-full h-auto shadow-md shadow-slate-400 rounded-lg py-3 px-4 hover:bg-slate-200 cursor-pointer hover:scale-105"
        onClick={() => setDialog("RequestDetails")}>
        <Flex className="w-full gap-2">
          <IconClockPlay color="#559cda" />
          <Flex className="flex flex-col">
            <Text className="text-[#559cda] font-bold">OVERTIME</Text>
            <Text className="text-[10px]">Document No: OT12345678</Text>
          </Flex>
        </Flex>
        <Flex className="w-full justify-center">
          <Flex className="flex flex-col">
            <Text className="text-[10px]">MM-DD-YYYY</Text>
            <Text className="text-[10px]">HH:MM - HH:MM</Text>
          </Flex>
        </Flex>
      </Stack>
    </Modal>
  );
}
