import { Center, Stack, Text } from "@mantine/core";

import { TestBasicModal } from "./TestBasicModal";
import { TestAlertModal } from "./TestAlertModal";
import { TestConfirmModal } from "./TestConfirmModal";
import { TestPopUp } from "./TestPopUp";
import CompileInputs from "./CompileInputs";

const SampleUsage = () => {
  return (
    <div className="w-full h-full flex justify-center  p-6 bg-yellow-50 ">
      <div className="flex flex-col  gap-8 w-full m-8 overflow-auto">
        <>
          <Center>
            <Text>Inputs Testing </Text>
          </Center>
          <Stack>
            <CompileInputs />
          </Stack>
        </>
        <>
          <Center>
            <Text>Modals Testing </Text>
          </Center>
          <Stack>
            <TestAlertModal />
            <TestBasicModal />
            <TestConfirmModal />
          </Stack>
        </>
        <>
          <Center>
            <Text>Popover Testing </Text>
          </Center>
          <Stack>
            <TestPopUp />
          </Stack>
        </>
      </div>
    </div>
  );
};

export default SampleUsage;
