/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
//--- Mantine Modules
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { Checkbox, Flex, Group, Stack } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
//--- Shared Modules
import { useEffect, useState } from "react";
import { ModalProps } from "@shared/assets/types/Modal";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { ValidationErrorResponse } from "@shared/assets/types/Error";
import { queryClient } from "@/services/client";
import { CosServices } from "../../../services/api";
import { useChangeOfScheduleStore } from "../../../store";
import { handleMutationResponse } from "@shared/utils/onError";
import { Button, FileAttachment, TextArea, Modal, Select, ReferenceNoInput, DateRangePickerInput } from "@shared/components";

export default function NewRequest({ opened, onClose, buttonClose }: ModalProps) {
  const small = useMediaQuery("(max-width: 40em)");
  const [dateDuration, setDateDuration] = useState<[string | null, string | null]>([null, null]);
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);

  const { setLoading, setOpenDialog, setOpenAlert, setError, scheduleItems, schedList, setSchedList, setOpenConfirmation } = useChangeOfScheduleStore();

  useEffect(() => {
    setSchedList(scheduleItems.items.map((item) => ({ id: item.id, name: item.name, isRestDay: item.isRestDay })));
  }, [scheduleItems]);

  const newForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      DateFiled: {
        DateFrom: new Date() || null,
        DateTo: new Date() || null,
      },
      Requested: {
        Id: 0,
        Name: "",
        IsRestDay: false,
      },
      Reason: "",
      FileAttachment: "",
      ReferenceNo: "",
    },
    validate: (values) => {
      const errors: any = {};
      // Validate Reason
      if (!values.Reason || values.Reason.length < 8 || values.Reason.length > 250) {
        errors.Reason = "Reason must be minimum of 8 and maximum of 250 characters";
      }

      // Validate DateFrom
      if (!values.DateFiled.DateFrom) {
        errors["DateFiled.DateFrom"] = "Date From is required";
      }

      // Validate DateTo
      if (!values.DateFiled.DateTo) {
        errors["DateFiled.DateTo"] = "Date To is required";
      }

      // Validate DateFrom < DateTo
      if (values.DateFiled.DateFrom && values.DateFiled.DateTo && new Date(values.DateFiled.DateFrom) > new Date(values.DateFiled.DateTo)) {
        errors["DateFiled.DateFrom"] = "From Date must be before To Date";
        errors["DateFiled.DateTo"] = "To Date must be after From Date";
      }

      return errors;
    },
  });

  const { mutate: createCosRequest } = useMutation({
    mutationFn: async (values: typeof newForm.values) => {
      const formData = {
        ...values,
        DateFiled: {
          ...values.DateFiled,
          DateFrom: values.DateFiled.DateFrom ? DateTimeUtils.dateTZToWithTZAddDay(new Date(values.DateFiled.DateFrom).toISOString()) : "",
          DateTo: values.DateFiled.DateTo ? DateTimeUtils.dateTZToWithTZAddDay(new Date(values.DateFiled.DateTo).toISOString()) : "",
        },
      };
      console.log(formData);
      setLoading(true);
      return CosServices.createCOSRequest(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request_cos"] });
      setOpenDialog("");
      setLoading(false);
      setOpenAlert("SuccessSubmit");
    },
    onError: (error: { response: { data: ValidationErrorResponse } }) => {
      handleMutationResponse({
        error,
        errorCallback: (msg) => {
          setLoading(false);
          setError(msg);
        },
      });
    },
  });

  const handleCreate = (values: typeof newForm.values) => {
    createCosRequest(values);
    setOpenDialog("");
    setOpenConfirmation("SummaryDetails");
  };

  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then((clipboardText) => {
        try {
          const json = JSON.parse(clipboardText);

          const dateFrom = json.dateFrom ? new Date(DateTimeUtils.dateTZToWithTZAddDay(new Date(json.dateFrom).toISOString())) : null;
          const dateTo = json.dateTo ? new Date(json.dateTo) : null;

          newForm.setValues({
            DateFiled: {
              DateFrom: json.dateFrom!,
              DateTo: dateTo!,
            },
            Reason: json.reason,
            ReferenceNo: json.referenceNo || "",
          });
          console.log(dateFrom);
          alert("Text paste!");
        } catch (err) {
          console.error("Invalid JSON in clipboard:", err);
        }
      })
      .catch((err) => {
        console.error("Failed to read clipboard: ", err);
      });
  };

  return (
    <Modal
      title="New Request"
      size="xl"
      opened={opened}
      onClose={onClose}
      buttonClose={buttonClose}
      footer={
        <Button variant="gradient" size="lg" type="submit">
          Submit
        </Button>
      }
      formProps={{
        onSubmit: newForm.onSubmit(handleCreate),
      }}>
      <form className="relative">
        <Stack className="w-full h-full">
          <Group className="flex flex-col gap-3 pt-2">
            <Flex className="flex flex-col w-full md:flex-row gap-3 md:gap-5">
              <DateRangePickerInput
                fl="From Date"
                sl="To Date"
                fp="From"
                sp="To"
                direction="row"
                dateValue={dateRange}
                setDateValue={(date) => {
                  setDateRange(date);
                }}
              />
            </Flex>
            <Flex className="flex flex-col w-full md:flex-row gap-3 md:gap-5">
              <Select
                size={small ? "xs" : "md"}
                radius={8}
                label="Request Schedule"
                className="w-full"
                placeholder="Same Day"
                data={schedList.map((item) => ({ value: item.id.toString(), label: item.name }))}
                onChange={(selectedValue) => {
                  const selectedItem = schedList.find((item) => item.id.toString() === selectedValue);
                  if (selectedItem) {
                    newForm.setValues((prevValues) => ({
                      Requested: {
                        Id: selectedItem.id,
                        Name: selectedItem.name,
                        IsRestDay: prevValues.Requested?.IsRestDay ?? false,
                      },
                    }));
                  }
                }}
                required
              />
              <ReferenceNoInput
                code="cto"
                size="md"
                radius={8}
                label="Reference No."
                placeholder="Input Reference Number(if necessary)"
                className="w-full"
                max={14}
                classNames={{ input: "poppins" }}
                styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              />
            </Flex>
            <Checkbox
              label="Rest Day"
              radius="xs"
              w-full
              items-start
              key={newForm.key("Requested.IsRestDay")}
              {...newForm.getInputProps("Requested.IsRestDay", { type: "checkbox" })}
              className="select-none  w-full items-start cursor-pointer"
            />
            <TextArea
              placeholder="enter brief reaso"
              label="Reason"
              labelVariant="header"
              className="w-full"
              key={newForm.key("Reason")}
              {...newForm.getInputProps("Reason")}
              required
            />
            <FileAttachment label="Attachment" lz="md" required />
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}
