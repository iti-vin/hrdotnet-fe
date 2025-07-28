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
      variant="warning"
      title="Submit Request?"
      yes={{ onClick: () => {}, title: "Submit" }}
      no={{ onClick: buttonClose!, title: "Back" }}>
      <Stack className="w-full h-full gap-2">
        <Details direction="row" label="Date From & Date To:" value="January 01-03, 2002" />
        <Details direction="row" label="Requested Schedule:" value={<IconCircleCheckFilled size={17} color="green" />} />
        <Details direction="row" label="Reference No:" value="RFN1932782264" />
        <Details direction="row" label="Rest Day:" value="January 01-03, 2002" />
        <Details direction="row" label="Reason:" value="I don't wanna live forever cause I know I'll be living in vain" />
      </Stack>
    </Confirmation>
  );
}
