import { Button, Group, Stack, TextInput } from "@mantine/core";
import { BasicModal } from "@shared/ui/modals/basic-modal";
import { PrimaryBtn } from "@shared/ui/modals/basic-modal/components/PrimaryBtn";
import { SecondaryBtn } from "@shared/ui/modals/basic-modal/components/SecondaryBtn";
import { useModalStore } from "@shared/ui/modals/basic-modal/store/useModalStore";

export function TestBasicModal() {
  const openModal = useModalStore((state) => state.openModal);
  const handleModal = () => {
    openModal({
      title: "Basic Modal",
      content: (
        <div className="flex flex-col gap-4">
          <h1>hello</h1>
          <Stack>
            <TextInput label="Text Input" placeholder="Enter text ...." />
            <TextInput label="Text Input" placeholder="Enter text ...." />
            <TextInput label="Text Input" placeholder="Enter text ...." />
            <TextInput label="Text Input" placeholder="Enter text ...." />
            <TextInput label="Text Input" placeholder="Enter text ...." />
            <TextInput label="Text Input" placeholder="Enter text ...." />
            <TextInput label="Text Input" placeholder="Enter text ...." />
            <TextInput label="Text Input" placeholder="Enter text ...." />
            <TextInput label="Text Input" placeholder="Enter text ...." />
            <TextInput label="Text Input" placeholder="Enter text ...." />

            <TextInput label="Text Input" placeholder="Enter text ...." />
            <TextInput label="Text Input" placeholder="Enter text ...." />
            <TextInput label="Text Input" placeholder="Enter text ...." />
            <TextInput label="Text Input" placeholder="Enter text ...." />
          </Stack>
        </div>
      ),
      footer: (
        <>
          <SecondaryBtn>Cancel Request</SecondaryBtn>
          <PrimaryBtn>Submit</PrimaryBtn>
        </>
      ),
      width: "xl",
    });
  };
  return (
    <Stack>
      <h1> Basic Modal</h1>
      <Group>
        <Button onClick={handleModal} className="bg-blue-400 text-white rounded-lg">
          Basic Modal
        </Button>
      </Group>
      <BasicModal />
    </Stack>
  );
}
