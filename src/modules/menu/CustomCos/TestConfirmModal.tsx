import { Button, Group, Stack } from "@mantine/core";
import { PrimaryBtn } from "@shared/ui/modals/basic-modal/components/PrimaryBtn";
import { SecondaryBtn } from "@shared/ui/modals/basic-modal/components/SecondaryBtn";
import { ConfirmationModal } from "@shared/ui/modals/confirmation-modal";
import { useModalStore } from "@shared/ui/modals/confirmation-modal/store/useModalStore";

export function TestConfirmModal() {
  const openModal = useModalStore((state) => state.openModal);
  const handleModal = () => {
    openModal({
      title: "Confirm Modal",
      body: "Any unsaved changes will be lost. Would you like to leave the page?",
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
      <h1> Confirmation Modal</h1>
      <Group>
        <Button onClick={handleModal} className="bg-blue-400 text-white rounded-lg">
          confirm
        </Button>
      </Group>
      <ConfirmationModal />
    </Stack>
  );
}
