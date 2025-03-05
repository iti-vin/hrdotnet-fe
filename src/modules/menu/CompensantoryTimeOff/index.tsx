import { Button, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Alert } from "@shared/template/";

export const CTO = () => {
  const [successReq, { open: successReqOpen, close: successReqClose }] =
    useDisclosure(false);
  const [successEnd, { open: successEndOpen, close: successEndClose }] =
    useDisclosure(false);
  const [successApp, { open: successAppOpen, close: successAppClose }] =
    useDisclosure(false);
  const [cancel, { open: cancelOpen, close: cancelClose }] =
    useDisclosure(false);
  return (
    <div>
      <Flex direction="row" justify="center" gap={10}>
        <Button onClick={successReqOpen}>Success Request</Button>
        <Button onClick={cancelOpen}>Cancelled</Button>
        <Button onClick={successEndOpen}>Success Endorse</Button>
        <Button onClick={successAppOpen}>Success Approve</Button>
      </Flex>
      <Alert
        opened={successReq}
        onClose={successReqClose}
        buttonClose={successReqClose}
        title="Request Submitted"
        isChecked
        content="
          The request has been successfully submitted."
      />

      <Alert
        opened={successEnd}
        onClose={successEndClose}
        buttonClose={successEndClose}
        title="Endorsement Success"
        isChecked
        content="
          The request has been successfully endorsed to the approver."
      />

      <Alert
        opened={successApp}
        onClose={successAppClose}
        buttonClose={successAppClose}
        title="Request Approved"
        isChecked
        content="
          The request has been successfully approved."
      />

      <Alert
        opened={cancel}
        onClose={cancelClose}
        buttonClose={cancelClose}
        title="Request Cancelled"
        content="
          The request has been cancelled."
      />
    </div>
  );
};
