import { Button, Group, Stack } from "@mantine/core";
import { AlertModal } from "@shared/ui/modals/alert-modal";
import { useModalStore } from "@shared/ui/modals/alert-modal/store/useModalStore";

export function TestAlertModal() {
  const openModal = useModalStore((state) => state.openModal);
  const handlePrimary = () => {
    openModal({
      title: "Basic Modal",
      body: "Any unsaved changes will be lost. Would you like to leave the page?",
      width: "xl",
      warning: false,
      duration: 1000,
    });
  };
  const handleWarning = () => {
    openModal({
      title: "Basic Modal",
      body: "Any unsaved changes will be lost. Would you like to leave the page?",
      width: "xl",
      warning: true,
      duration: 1000,
    });
  };
  return (
    <Stack>
      <h1> Alert Modal</h1>
      <Group>
        <Button onClick={handlePrimary} className="bg-blue-400 text-white rounded-lg">
          primary
        </Button>
        <Button onClick={handleWarning} className="bg-red-400 text-white rounded-lg">
          warning
        </Button>
      </Group>
      <AlertModal />
    </Stack>
  );
}
