/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- React Modules
import { useEffect, useState } from "react";
//--- Mantine Modules
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { DatePickerInput } from "@mantine/dates";
import { Button, Checkbox, Flex, LoadingOverlay, Select, Stack, Textarea, TextInput } from "@mantine/core";
//--- Shared Modules
import { Dropzone, Modal } from "@shared/template";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";

//--- COS Modules

//--- Store
import useCOS from "../../store";
import useRequestCosStore from "../../store/request";
//--- Services
import CosServices from "../../services/main";
//--- Models
import { RequestData } from "../../models/request";

export default function NewRequest() {
  const small = useMediaQuery("(max-width: 770px)");

  // States
  const { setSchedList, schedList, setLoading } = useCOS();
  const { onNewRequest, setOnNewRequest, scheduleItems, setScheduleItems, setCreateAlert } = useRequestCosStore();

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
      Reason: (value) => (value.length >= 5 && value.length <= 250 ? null : "Reason must be minimum of 8 and maximum of 250  characters"),
      ReferenceNo: (value) => (/^\d{4}-\d{4}-\d{4}$/.test(value) ? null : "Reference No. must be in 0000-0000-0000 format"),
    },
  });

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

  const handleSubmit = async (values: typeof newForm.values) => {
    const formattedValues = {
      ...values,
      DateFiled: {
        ...values.DateFiled,
        DateFrom: values.DateFiled.DateFrom ? DateTimeUtils.dateTZToWithTZAddDay(new Date(values.DateFiled.DateFrom).toISOString()) : "",
        DateTo: values.DateFiled.DateTo ? DateTimeUtils.dateTZToWithTZAddDay(new Date(values.DateFiled.DateTo).toISOString()) : "",
      },
    };
    const formData = RequestData(formattedValues);
    try {
      const data = await CosServices.createCosRequest(formData);
      setOnNewRequest(false);
      setLoading(true);
      setCreateAlert(true);
      newForm.reset();
      console.log(data);
    } catch (err) {
      console.error(err);
    } finally {
      console.log("Done Submit");
    }
  };

  return (
    <Modal title="New Request" size="80%" opened={onNewRequest} onClose={() => setOnNewRequest(false)} buttonClose={() => setOnNewRequest(false)}>
      <form onSubmit={newForm.onSubmit(handleSubmit)} className="relative">
        <LoadingOverlay visible={onLoad} />
        <Flex className="flex flex-col gap-3 pt-2">
          <Flex className="flex flex-col md:flex-row gap-3 md:gap-5">
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
          <Flex className="flex flex-col md:flex-row gap-3 md:gap-5">
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
                let formattedValue = rawValue.slice(0, 12).replace(/(\d{4})(\d{4})?(\d{4})?/, (_, p1, p2, p3) => [p1, p2, p3].filter(Boolean).join("-"));

                newForm.setFieldValue("ReferenceNo", formattedValue);
              }}
            />
          </Flex>
          <Checkbox
            label="Rest Day"
            radius="xs"
            key={newForm.key("Requested.IsRestDay")}
            {...newForm.getInputProps("Requested.IsRestDay", { type: "checkbox" })}
            className="select-none cursor-pointer"
          />
          <Textarea size={small ? "xs" : "lg"} radius={8} label="Reason" className="w-full" key={newForm.key("Reason")} {...newForm.getInputProps("Reason")} />
          <Dropzone />
        </Flex>
        <Stack className="pt-5 flex flex-row justify-end">
          <Button type="submit" size="md" className="w-44 border-none custom-gradient rounded-md" onClick={() => {}}>
            SUBMIT
          </Button>
        </Stack>
      </form>
    </Modal>
  );
}
