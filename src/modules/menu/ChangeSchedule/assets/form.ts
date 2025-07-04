import { useForm } from "@mantine/form";

type ChangeScheduleType = {
  dateFiled: {
    dateFrom: Date | null;
    dateTo: Date | null;
  };
  requested: {
    id: number;
    name: string;
    isRestDay: boolean;
  };
  reason: string;
  fileAttachment: string;
  referenceNo: string;
};

export const ChangeScheduleForm = useForm<ChangeScheduleType>({
  mode: "uncontrolled",
  initialValues: {
    dateFiled: {
      dateFrom: new Date() || null,
      dateTo: new Date() || null,
    },
    requested: {
      id: 0,
      name: "",
      isRestDay: false,
    },
    reason: "",

    fileAttachment: "",
    referenceNo: "",
  },
  validate: (values) => {
    const errors: any = {};
    // Validate Reason
    if (!values.reason || values.reason.length < 8 || values.reason.length > 250) {
      errors.reason = "Reason must be minimum of 8 and maximum of 250 characters";
    }

    // Validate DateFrom
    if (!values.dateFiled.dateFrom) {
      errors["DateFiled.DateFrom"] = "Date From is required";
    }

    // Validate DateTo
    if (!values.dateFiled.dateTo) {
      errors["DateFiled.DateTo"] = "Date To is required";
    }

    // Validate DateFrom < DateTo
    if (
      values.dateFiled.dateFrom &&
      values.dateFiled.dateTo &&
      new Date(values.dateFiled.dateFrom) > new Date(values.dateFiled.dateTo)
    ) {
      errors["DateFiled.DateFrom"] = "From Date must be before To Date";
      errors["DateFiled.DateTo"] = "To Date must be after From Date";
    }

    return errors;
  },
});
