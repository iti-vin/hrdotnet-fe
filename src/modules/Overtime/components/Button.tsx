import { Button, Flex } from "@mantine/core";
import { useOvertimeStore } from "../store/useOT"
interface ButtonProps {
  status: "Filed" | "Reviewed" | "Approved" | "Cancelled";
  close: () => void;
  tabs?: "List" | "Review" | "Approve";
  open: () => void;
}

const EndorseButton = ({ status, close, open }: ButtonProps) => {
  const {  setAlert } = useOvertimeStore();
  return (
    <>
      {status === "Filed" && (
        <>
          <Button
            variant="outline"
            size="md"
            radius={10}
            w={180}
            onClick={()=>{
              setAlert('RequestRejected')
              close();
            }}
          >
            REJECT
          </Button>
          <Button
            size="md"
            radius={10}
            w={180}
            classNames={{ root: "test" }}
            className="border-none custom-gradient"
            onClick={() => {
              setAlert('EndorsementSuccess')
              open();
            }}
          >
            ENDORSE
          </Button>
        </>
      )}
    </>
  );
};
const ApproveButton = ({ status, close, open }: ButtonProps) => {
  const {  setAlert } = useOvertimeStore();
  return (
    <>
      {status === "Reviewed" || status === "Filed" ? (
        <>
          <Button
            variant="outline"
            size="md"
            radius={10}
            w={180}
            onClick={() => {
              setAlert('RequestRejected')
              close()
            }}
          >
            REJECT
          </Button>
          <Button
            size="md"
            radius={10}
            w={180}
            classNames={{ root: "test" }}
            className="border-none custom-gradient"
            onClick={() => {
              setAlert('RequestApproved')
              open();
            }}
          >
            APPROVE
          </Button>
        </>
      ) : status === "Approved" ? (
        <>
          {/* <RejectedButton close={close} /> */}
        </>
      ) : status === "Cancelled" ? null : (
        <>
          {/* <CancelButton close={close} /> */}
        </>
      )}
    </>
  );
};
const UpdateButton = ({ status, close, open }: ButtonProps) => {
  const {  setAlert } = useOvertimeStore();
  return (
    <>
      {status === "Filed" ? (
        <>
          <Button
            variant="outline"
            size="md"
            radius={10}
            w={180}
            onClick={()=>{
              setAlert('RequestCancelled')
              close()
            }}
          >
            CANCEL
          </Button>
          <Button
            size="md"
            radius={10}
            w={180}
            classNames={{ root: "test" }}
            className="border-none custom-gradient"
            onClick={() => {
              setAlert('RequestUpdated')
              open();
            }}
          >
            UPDATE
          </Button>
        </>
      ) : status === "Cancelled" ? null : (
        <CancelButton close={close} />
      )}
    </>
  );
};
const CancelButton = ({ close }: { close: () => void }) => {
  const {  setAlert } = useOvertimeStore();
  return (
    <>
      <Button variant="outline" size="md" radius={10} w={180} onClick={()=>{
        close()
        setAlert('RequestCancelled')
        }}>
        CANCEL
      </Button>
    </>
  );
};


export const Buttons = ({ status, close, tabs, open }: ButtonProps) => {
  return (
    <Flex px={10} align="center" justify="flex-end" gap={10}>
      {tabs === "List" && (
        <UpdateButton status={status} close={close} open={open} />
      )}
      {tabs === "Review" && (
        <EndorseButton status={status} close={close} open={open} />
      )}
      {tabs === "Approve" && (
        <ApproveButton status={status} close={close} open={open} />
      )}
      {status === "Cancelled" && null}
    </Flex>
  );
};
