/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { useState, useEffect } from "react";
//--- Mantine Modules
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import { Button, Checkbox, Flex, Select, Stack, Textarea, TextInput } from "@mantine/core";
//-- Shared Modules
import { Dropzone, Modal } from "@shared/template";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";

//--- COS Modules
//--- Store
import useCOS from "../../store";
import useRequestCosStore from "../../store/request";
//--- Models
import { UpdateData, UpdateInitialData } from "../../models/request";
//--- Services
import CosServices from "../../services/main";

export default function EditRequest() {
  // Media Screen for Smaller Size Width
  const small = useMediaQuery("(max-width: 770px)");

  // States
  const { viewItems, setScheduleItems, setSchedList, schedList, scheduleItems, setLoading } = useCOS();
  const { onEditRequest, setOnEditRequest, setUpdateAlert } = useRequestCosStore();

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

  const handleUpdate = async (values: typeof editForm.values) => {
    const formattedValues = {
      // spreading the values of form
      ...values,
      // values of initial data from view items
      ...UpdateInitialData(viewItems),
      // formatting the date filed and getting updated values
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
      Reason: values.Reason ? values.Reason : viewItems.filing.reason,
    };
    // complete form data with initial and updated
    const formData = UpdateData(formattedValues);
    try {
      const data = await CosServices.updateCosRequest(formData, viewItems.filing.id);
      console.log(data);
      setOnEditRequest(false);
      setLoading(true);
      setUpdateAlert(true);
    } catch (err) {
      console.error(err);
    } finally {
      console.log("Done");
    }
    console.log(formData);
  };

  const [onLoad, setOnLoad] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await CosServices.getSchedules();
        setOnLoad(false);
        setScheduleItems(data);
      } catch (error) {
        console.error(error);
      }
    })();
    setSchedList(scheduleItems.items.map((item) => ({ id: item.id, name: item.name, isRestDay: item.isRestDay })));
  }, [onLoad]);

  return (
    <Modal title="Edit Request" size="80%" opened={onEditRequest} onClose={() => setOnEditRequest(false)} buttonClose={() => setOnEditRequest(false)}>
      <form onSubmit={editForm.onSubmit(handleUpdate)}>
        <Flex className="flex flex-col gap-3">
          <Flex className="flex flex-col md:flex-row gap-3 md:gap-5">
            <DatePickerInput
              size={small ? "xs" : "md"}
              valueFormat="MM/DD/YYYY"
              label="From Date"
              className="w-full"
              placeholder={DateTimeUtils.getIsoDateWithBackSlash(viewItems.filing.dateFiled.dateFrom)}
              onChange={(date) => {
                if (!(date instanceof Date) || isNaN(date.getTime())) {
                  console.error("Invalid Date Selected:", date);
                  return;
                }
                editForm.setFieldValue("DateFiled.DateFrom", date.toString);
              }}
              radius={8}
            />
            <DatePickerInput
              size={small ? "xs" : "md"}
              valueFormat="MM/DD/YYYY"
              label="To Date"
              className="w-full"
              placeholder={DateTimeUtils.getIsoDateWithBackSlash(viewItems.filing.dateFiled.dateTo)}
              onChange={(date) => {
                if (!(date instanceof Date) || isNaN(date.getTime())) {
                  console.error("Invalid Date Selected:", date);
                  return;
                }
                editForm.setFieldValue("DateFiled.DateTo", date.toString());
              }}
              radius={8}
            />
          </Flex>
          <Flex className="flex flex-col md:flex-row gap-3 md:gap-5">
            <Select
              size={small ? "xs" : "md"}
              radius={8}
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
              radius={8}
              label="Reference No."
              placeholder="0000-0000-0000"
              className="w-full"
              key={editForm.key("ReferenceNo")}
              {...editForm.getInputProps("ReferenceNo")}
            />
          </Flex>
          <Checkbox label="Rest Day" radius="xs" {...editForm.getInputProps("Requested.IsRestDay", { type: "checkbox" })} className="select-none cursor-pointer" />
          <Textarea
            size={small ? "xs" : "lg"}
            radius={8}
            label="Reason"
            placeholder={viewItems.filing.reason}
            className="w-full"
            maxLength={250}
            key={editForm.key("Reason")}
            {...editForm.getInputProps("Reason")}
          />
          <Dropzone />
        </Flex>
        <Stack className="pt-5 flex flex-row justify-end">
          <Button type="submit" size="md" className="w-44 border-none custom-gradient rounded-md" onClick={() => console.log(viewItems.filing.id)}>
            UPDATE
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
