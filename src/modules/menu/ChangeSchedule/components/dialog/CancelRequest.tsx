/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Layout
import Alert from "@/layout/main/alert";
//--- Models
import { SingleData } from "../../models/request";
//--- Services
import CosServices from "../../services/main";
//--- Store
import useCOS from "../../store";
import useRequestCosStore from "../../store/request";

export default function CancelRequest() {
  const { viewItems, setLoading } = useCOS();
  const { setOnCancelRequest, onCancelRequest, setCancelAlert } = useRequestCosStore();

  // Single Cancellation
  const onHandleCancel = async () => {
    // complete form data from view items
    const formData = SingleData(viewItems);
    try {
      const data = await CosServices.cancelCosRequest(formData, viewItems.filing.id);
      console.log("data", data);
      setLoading(true);
      if (data.filing.filingStatus.name === "Cancelled") {
        setLoading(true);
        setOnCancelRequest(false);
        setCancelAlert(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      console.log("Done");
    }
  };

  return (
    <Alert
      opened={onCancelRequest}
      onClose={() => setOnCancelRequest(false)}
      headerTitle="Cancel Request"
      size="lg"
      icon="Warning"
      title="Are you sure you want to cancel this COS request?"
      description="Filing deadline for this cutoff period will end in 1 day."
      yes={{
        onClick: () => onHandleCancel(),
      }}
      no={{
        onClick: () => setOnCancelRequest(false),
      }}
    />
  );
}
