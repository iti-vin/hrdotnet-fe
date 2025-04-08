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
//--- Shared Modules
import { Dropzone, Modal } from "@shared/template";
import { ModalProps } from "@shared/assets/types/Modal";
import { useMutation } from "@tanstack/react-query";
import { CosServices } from "../../../services/api";
import { queryClient } from "@/services/client";
import { ValidationErrorResponse } from "@shared/assets/types/Error";
import { useChangeOfScheduleStore } from "../../../store";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { useEffect } from "react";

//--- COS Modules

//--- Store

export default function NewRequest({ opened, onClose, buttonClose }: ModalProps) {
  const small = useMediaQuery("(max-width: 770px)");
  const { setLoading, setOpenDialog, setOpenAlert, setError, scheduleItems, schedList, setSchedList } =
    useChangeOfScheduleStore();

  useEffect(() => {
    setSchedList(scheduleItems.items.map((item) => ({ id: item.id, name: item.name, isRestDay: item.isRestDay })));
  }, [scheduleItems]);

  //--- New Form for Request
  const newForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      DateFiled: {
        DateFrom: new Date(),
        DateTo: new Date(),
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
    validate: {
      Reason: (value) =>
        value.length >= 5 && value.length <= 250 ? null : "Reason must be minimum of 8 and maximum of 250  characters",
      ReferenceNo: (value) =>
        /^\d{4}-\d{4}-\d{4}$/.test(value) ? null : "Reference No. must be in 0000-0000-0000 format",
    },
  });

  const { mutate: createCosRequest } = useMutation({
    mutationFn: async (values: typeof newForm.values) => {
      const formData = {
        ...values,
        DateFiled: {
          ...values.DateFiled,
          DateFrom: values.DateFiled.DateFrom
            ? DateTimeUtils.dateTZToWithTZAddDay(new Date(values.DateFiled.DateFrom).toISOString())
            : "",
          DateTo: values.DateFiled.DateTo
            ? DateTimeUtils.dateTZToWithTZAddDay(new Date(values.DateFiled.DateTo).toISOString())
            : "",
        },
      };
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
      setLoading(false);
      const errorData = error.response.data;
      const errorMessages = Object.values(errorData.errors).flat().join(", ");
      setError(errorMessages || "Internal Server Error");
    },
  });

  const handleCreate = (values: typeof newForm.values) => {
    createCosRequest(values);
  };

  return (
    <Modal title="New Request" size="80%" opened={opened} onClose={onClose} buttonClose={buttonClose}>
      <form onSubmit={newForm.onSubmit(handleCreate)} className="relative">
        <Stack className="w-full h-full">
          <ScrollArea
            px={20}
            className="flex flex-col mt-3 w-full text-[#6d6d6d] relative"
            h={650}
            styles={{ scrollbar: { display: "none" } }}>
            <Group className="flex flex-col gap-3 pt-2">
              <Flex className="flex flex-col w-full md:flex-row gap-3 md:gap-5">
                <DatePickerInput
                  size={small ? "xs" : "md"}
                  valueFormat="MM/DD/YYYY"
                  label="From Date"
                  className="w-full"
                  placeholder="mm/dd/yyyy"
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
                <TextInput
                  size={small ? "xs" : "md"}
                  radius={8}
                  label="Reference No."
                  placeholder="0000-0000-0000"
                  className="w-full"
                  required
                  pattern="\d{4}-\d{4}-\d{4}"
                  title="Format: 0000-0000-0000"
                  {...newForm.getInputProps("ReferenceNo")}
                  onChange={(event) => {
                    const rawValue = event.target.value.replace(/\D/g, "");
                    let formattedValue = rawValue
                      .slice(0, 12)
                      .replace(/(\d{4})(\d{4})?(\d{4})?/, (_, p1, p2, p3) => [p1, p2, p3].filter(Boolean).join("-"));

                    newForm.setFieldValue("ReferenceNo", formattedValue);
                  }}
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
              <Textarea
                size={small ? "xs" : "lg"}
                radius={8}
                label="Reason"
                className="w-full"
                key={newForm.key("Reason")}
                {...newForm.getInputProps("Reason")}
              />
              <Dropzone />
            </Group>
          </ScrollArea>
        </Stack>
        <Stack className="pt-5 flex flex-row justify-end">
          <Button type="submit" size="md" className="w-44 border-none custom-gradient rounded-md" onClick={() => {}}>
            SUBMIT
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
