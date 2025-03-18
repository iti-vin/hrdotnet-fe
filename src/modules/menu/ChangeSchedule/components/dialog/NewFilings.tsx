/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { useMediaQuery } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import { Button, Checkbox, Flex, LoadingOverlay, Select, Stack, Textarea, TextInput } from "@mantine/core";
//--- Shared Modules
import { Dropzone, Modal } from "@shared/template";
//--- Icons
import { IconDots } from "@tabler/icons-react";
//--- COS Modules
//--- Store
import useCOS from "../../store";

export default function NewFilings() {
  const small = useMediaQuery("(max-width: 770px)");
  const { onNewFiling, setOnNewFiling } = useCOS();

  return (
    <Modal title="New Filings" size="80%" opened={onNewFiling} onClose={() => setOnNewFiling(false)} buttonClose={() => setOnNewFiling(false)}>
      <form onSubmit={() => {}} className="relative">
        <LoadingOverlay visible={true} />
        <Flex className="flex flex-col gap-3 pt-2">
          <Select size={small ? "xs" : "md"} radius={8} label="Employee Name" className="w-full" placeholder="Select Employee" rightSection={<IconDots />} required />

          <Flex className="flex flex-col md:flex-row gap-3 md:gap-5">
            <DatePickerInput size={small ? "xs" : "md"} valueFormat="MM/DD/YYYY" label="From Date" className="w-full" placeholder="mm/dd/yyyy" radius={8} required />
            <DatePickerInput size={small ? "xs" : "md"} valueFormat="MM/DD/YYYY" label="To Date" className="w-full" placeholder="mm/dd/yyyy" radius={8} required />
          </Flex>
          <Flex className="flex flex-col md:flex-row gap-3 md:gap-5">
            <Select size={small ? "xs" : "md"} radius={8} label="Request Schedule" className="w-full" placeholder="Same Day" rightSection={"▼"} required />
            <TextInput size={small ? "xs" : "md"} radius={8} label="Reference No." placeholder="0000-0000-0000" className="w-full" required />
          </Flex>
          <Checkbox label="Rest Day" radius="xs" className="select-none cursor-pointer" />
          <Textarea size={small ? "xs" : "lg"} radius={8} required label="Reason" className="w-full" maxLength={250} />
          <Dropzone />
        </Flex>
        <Stack className="pt-5 flex flex-row justify-end">
          <Button type="submit" size="md" className="w-44 border-none custom-gradient rounded-md" onClick={() => {}}>
            SUBMIT
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
