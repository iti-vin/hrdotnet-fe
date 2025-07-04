/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
//--- Mantine Modules
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import { Button, Checkbox, Flex, Group, ScrollArea, Select, Stack, Textarea, TextInput } from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
//--- Shared Modules
import { useEffect } from "react";
import { Dropzone } from "@shared/template";
import { ModalProps } from "@shared/assets/types/Modal";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { ValidationErrorResponse } from "@shared/assets/types/Error";
import Modal from "@/layout/main/dialog/Modal";
import { queryClient } from "@/services/client";
import { CosServices } from "../../../services/api";
import { useChangeOfScheduleStore } from "../../../store";
import { handleMutationResponse } from "@shared/utils/onError";

export default function NewRequest({ opened, onClose, buttonClose }: ModalProps) {
  const small = useMediaQuery("(max-width: 40em)");

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
    <Modal title="New Request" size="70%" opened={opened} onClose={onClose} buttonClose={buttonClose} pasteBtn={handlePaste}>
      <form onSubmit={newForm.onSubmit(handleCreate)} className="relative">
        <Stack className="w-full h-full">
          <ScrollArea px={small ? 20 : 30} className="flex flex-col mt-3 w-full text-[#6d6d6d] relative" h={650} styles={{ scrollbar: { display: "none" } }}>
            <Group className="flex flex-col gap-3 pt-2">
              <Flex className="flex flex-col w-full md:flex-row gap-3 md:gap-5">
                <DatePickerInput
                  size={small ? "xs" : "md"}
                  valueFormat="MM/DD/YYYY"
                  label="From Date"
                  className="w-full"
                  placeholder="mm/dd/yyyy"
                  key={newForm.key("DateFiled.DateFrom")}
                  {...newForm.getInputProps("DateFiled.DateFrom")}
                  radius={8}
                  required
                />
                <DatePickerInput
                  size={small ? "xs" : "md"}
                  valueFormat="MM/DD/YYYY"
                  label="To Date"
                  className="w-full"
                  placeholder="mm/dd/yyyy"
                  key={newForm.key("DateFiled.DateTo")}
                  {...newForm.getInputProps("DateFiled.DateTo")}
                  radius={8}
                  required
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
                <TextInput size={small ? "xs" : "md"} radius={8} label="Reference No." placeholder="0000-0000-0000" className="w-full" />
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
              <Textarea size={small ? "xs" : "lg"} radius={8} label="Reason" className="w-full" key={newForm.key("Reason")} {...newForm.getInputProps("Reason")} />
              <Dropzone />
            </Group>
          </ScrollArea>
        </Stack>
        <Stack className="pt-5 flex flex-row justify-end" px={small ? 20 : 30}>
          <Button type="submit" size="md" className="w-44 border-none custom-gradient rounded-md">
            SUBMIT
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
