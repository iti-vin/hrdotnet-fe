import { Stack } from "@mantine/core";
import { ModalProps } from "@shared/assets/types/Modal";
import Details from "@shared/ui/display/Details";
import Confirmation from "@shared/ui/modals/confirmation";
import { IconCircleCheckFilled } from "@tabler/icons-react";

export default function SummaryDetails({ opened, onClose, buttonClose }: ModalProps) {
  return (
    <Confirmation
      opened={opened}
      onClose={onClose}
      variant="danger"
      title="Summary Details"
      description="Are you sure you want to update this request? this will override your existing filing details"
      yes={{ onClick: () => {}, title: "Confirm" }}
      no={{ onClick: buttonClose!, title: "Keep Editing" }}>
      <Stack className="w-full h-full p-4">
        <Details direction="row" label="Date From & Date To:" value="January 01-03, 2002" />
        <Details direction="row" label="Requested Schedule:" value={<IconCircleCheckFilled size={17} color="green" />} />
        <Details direction="row" label="Reference No:" value="RFN1932782264" />
        <Details direction="row" label="Rest Day:" value="January 01-03, 2002" />
        <Details direction="row" label="Reason:" value="I don't wanna live forever cause I know I'll be living in vain" />
      </Stack>
    </Confirmation>
  );
}
