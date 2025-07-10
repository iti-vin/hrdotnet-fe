/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { Checkbox, Flex } from "@mantine/core";
//-- Shared Modules
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";

//--- COS Modules
//--- Store
//--- Models
import { ModalProps } from "@shared/assets/types/Modal";
import { useChangeOfScheduleStore } from "../../../store";
import { useMutation } from "@tanstack/react-query";
import { CosServices } from "../../../services/api";
import { queryClient } from "@/services/client";
import { ValidationErrorResponse } from "@shared/assets/types/Error";
import { SingleData } from "../../../models/request";
import { useEffect } from "react";
//--- Services
import { DatePickerInput, FileAttachment, TextInput, Select, TextArea, Modal, Button } from "@shared/components";

export default function EditRequest({ opened, onClose, buttonClose }: ModalProps) {
  // Media Screen for Smaller Size Width
  const small = useMediaQuery("(max-width: 40em)");
  const { viewItems, setLoading, setOpenDialog, setOpenAlert, setError, scheduleItems, setSchedList, schedList } = useChangeOfScheduleStore();

  useEffect(() => {
    setSchedList(scheduleItems.items.map((item) => ({ id: item.id, name: item.name, isRestDay: item.isRestDay })));
  }, [scheduleItems]);

  // Edit Form for Request
  const editForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      UploadedFile: "",
      DateFiled: { DateFrom: viewItems.filing.dateFiled.dateFrom, DateTo: viewItems.filing.dateFiled.dateTo },
      Requested: {
        Id: viewItems.filing.requested?.id,
        Name: viewItems.filing.requested.name,
        IsRestDay: viewItems.filing.requested.isRestDay,
      },
      ReferenceNo: "asdasds",
      FileAttachment: viewItems.filing.fileAttachment,
      Reason: viewItems.filing.reason,
    },
  });

  const { mutate: updateOfficialBusiness } = useMutation({
    mutationFn: async (values: typeof editForm.values) => {
      const editedForm = {
        ...values,
        ...SingleData(viewItems),
        DateFiled: {
          ...values.DateFiled,
          DateFrom: values.DateFiled.DateFrom ? DateTimeUtils.dateTZToWithTZAddDay(new Date(values.DateFiled.DateFrom).toISOString()) : viewItems.filing.dateFiled.dateFrom,
          DateTo: values.DateFiled.DateTo ? DateTimeUtils.dateTZToWithTZAddDay(new Date(values.DateFiled.DateTo).toISOString()) : viewItems.filing.dateFiled.dateTo,
        },
        FileAttachment: values.FileAttachment ? values.FileAttachment : values.FileAttachment,
        Requested: {
          Id: values.Requested.Id ? values.Requested.Id : viewItems.filing.requested.id,
          Name: values.Requested.Name ? values.Requested.Name : viewItems.filing.requested.name,
          IsRestDay: values.Requested.IsRestDay ? values.Requested.IsRestDay : viewItems.filing.requested.isRestDay,
        },
      };
      setLoading(true);
      return CosServices.updateCOSRequest(viewItems.filing.id, editedForm);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["request_cos"] });
      setOpenDialog("");
      setLoading(false);
      setOpenAlert("SuccessUpdate");
    },
    onError: (error: { response: { data: ValidationErrorResponse } }) => {
      setLoading(false);
      const errorData = error.response.data;
      const errorMessages = Object.values(errorData.errors).flat().join(", ");
      setError(errorMessages || "Internal Server Error");
    },
  });

  const handleUpdate = (values: typeof editForm.values) => {
    updateOfficialBusiness(values);
  };

  return (
    <Modal
      title="Edit Request"
      size="xl"
      opened={opened}
      onClose={onClose}
      buttonClose={buttonClose}
      footer={
        <Button type="submit" size="lg" variant="gradient">
          UPDATE
        </Button>
      }>
      <form onSubmit={editForm.onSubmit(handleUpdate)}>
        <Flex className="flex flex-col gap-3">
          <Flex className="flex flex-col md:flex-row gap-3 md:gap-5">
            <DatePickerInput
              size={small ? "xs" : "md"}
              value={viewItems.filing.dateTransaction}
              label="From Date"
              placeholder={DateTimeUtils.getIsoDateWithBackSlash(viewItems.filing.dateFiled.dateFrom)}
              setValue={(date) => {
                if (!(date instanceof Date) || isNaN(date.getTime())) {
                  console.error("Invalid Date Selected:", date);
                  return;
                }
                editForm.setFieldValue("DateFiled.DateFrom", date.toString);
              }}
            />
            <DatePickerInput
              size={small ? "xs" : "md"}
              value={viewItems.filing.dateTransaction}
              label="To Date"
              placeholder={DateTimeUtils.getIsoDateWithBackSlash(viewItems.filing.dateFiled.dateTo)}
              setValue={(date) => {
                if (!(date instanceof Date) || isNaN(date.getTime())) {
                  console.error("Invalid Date Selected:", date);
                  return;
                }
                editForm.setFieldValue("DateFiled.DateTo", date.toString());
              }}
            />
          </Flex>
          <Flex className="flex flex-col md:flex-row gap-3 md:gap-5">
            <Select
              size={small ? "xs" : "md"}
              label="Request Schedule"
              classNames={{ input: "text-black" }}
              className="w-full"
              placeholder={viewItems.filing.requested.name}
              data={schedList.map((item) => ({ value: item.id.toString(), label: item.name }))}
              onChange={(selectedValue) => {
                const selectedItem = schedList.find((item) => item.id.toString() === selectedValue);
                if (selectedItem) {
                  editForm.setValues((prevValues) => ({
                    ...prevValues,
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
            <TextInput
              size={small ? "xs" : "md"}
              label="Reference No."
              placeholder="0000-0000-0000"
              className="w-full"
              key={editForm.key("ReferenceNo")}
              {...editForm.getInputProps("ReferenceNo")}
            />
          </Flex>
          <Checkbox label="Rest Day" radius="xs" {...editForm.getInputProps("Requested.IsRestDay", { type: "checkbox" })} className="select-none cursor-pointer" />
          <TextArea
            size={small ? "xs" : "lg"}
            label="Reason"
            placeholder={viewItems.filing.reason}
            className="w-full"
            maxLength={250}
            key={editForm.key("Reason")}
            {...editForm.getInputProps("Reason")}
          />
          <FileAttachment />
        </Flex>
      </form>
    </Modal>
  );
}
