/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */
//--- React Modules
import { useState } from "react";
//--- Mantine Modules
import { Divider, Flex, Group, Tabs, Text } from "@mantine/core";
//--- Icons
import { IconTransfer } from "@tabler/icons-react";

import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import useLeaveStore from "../../store/LeaveStore";
import { useLeave } from "../../context";
import { useForm } from "@mantine/form";
import { Button, DateRangePickerInput, Drawer, MultiSelect, Select, TextInput } from "@shared/components";

interface DrawerFilterProps {
  isNotUser?: boolean;
}

export default function DrawerFilter({ isNotUser = false }: DrawerFilterProps) {
  const { status, setStatus, twoDate, setTwoDate, openDialog, setOpenDialog, leaveType, setLoading, setDataFilter } = useLeaveStore();
  const { onHandleSubmitFilter, onHandleClearFilter } = useLeave();

  const [activeTab, setActiveTab] = useState<"leave" | "transaction">("leave");

  const toggleTab = () => {
    setActiveTab((prev) => (prev === "leave" ? "transaction" : "leave"));
    setTwoDate([null, null]);
  };

  type FilterFormValues = {
    DocumentNo: string | null;
    LeaveType: string | null;
    DateField: string | null;
    DateFrom: Date | null;
    DateTo: Date | null;
    LeaveParameter: string | null;
  };

  const filterForm = useForm<FilterFormValues>({
    mode: "uncontrolled",
    initialValues: {
      DocumentNo: null,
      LeaveType: null,
      DateField: null,
      DateFrom: null,
      DateTo: null,
      LeaveParameter: null,
    },
  });

  const submitFilter = (values: typeof filterForm.values) => {
    setLoading(true);
    const formattedValues = {
      ...values,
      DateFiled: activeTab === "transaction" ? "dateTransaction" : null,
      DateFrom: twoDate[0] === null ? null : DateTimeUtils.getIsoDateFull(String(twoDate[0])),
      DateTo: twoDate[1] === null ? null : DateTimeUtils.getIsoDateFull(String(twoDate[1])),
    };
    const cleanedValues = Object.fromEntries(Object.entries(formattedValues).filter(([_, value]) => value !== null));

    setDataFilter(formattedValues);
    onHandleSubmitFilter(cleanedValues);
  };

  const clearFilter = () => {
    setLoading(true);
    setTwoDate([null, null]);
    filterForm.setValues({
      DocumentNo: null,
      LeaveType: null,
      DateFrom: null,
      DateTo: null,
      DateField: null,
      LeaveParameter: null,
    });
    onHandleClearFilter();
  };
  return (
    <Drawer
      title="Filter By"
      opened={openDialog === "DrawerFilter"}
      onClose={() => setOpenDialog("")}
      position="right"
      withCloseButton={false}
      size="xs"
      overlayProps={{ backgroundOpacity: 0, blur: 0 }}
      styles={{ body: { height: "100%" } }}
      formProps={{
        onSubmit: filterForm.onSubmit(submitFilter),
      }}
      footer={
        <Flex className="w-full flex flex-row justify-end items-end gap-3">
          <Button variant="outline" className="border-[#559cda] text-[#559cda]" radius="md" h={35} w={100} onClick={clearFilter}>
            CLEAR
          </Button>
          <Button variant="gradient" radius="md" type="submit" h={35} w={100}>
            FILTER
          </Button>
        </Flex>
      }>
      <div className="w-full h-full flex flex-col gap justify-between">
        <div className="flex flex-col gap-2 2xl:gap-4">
          <Flex className="flex flex-col gap-2">
            <TextInput
              label="Document No."
              placeholder="Type Document No."
              radius="md"
              classNames={{ input: "poppins" }}
              key={filterForm.key("DocumentNo")}
              {...filterForm.getInputProps("DocumentNo")}
              styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
            />
            <Divider size={2} h={10} color="#edeeed" className="w-full" />
            <Select
              label="Leave Type"
              radius="md"
              classNames={{ input: "poppins" }}
              data={leaveType.map((item) => ({ value: item.id.toString(), label: item.name }))}
              onChange={(selectedValue) => {
                const selectedItem = leaveType.find((item) => item.id.toString() === selectedValue);
                if (selectedItem) {
                  filterForm.setValues(() => ({
                    LeaveParameter: selectedItem.name,
                  }));
                }
              }}
              styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
              clearable
            />
            <Divider size={2} h={10} color="#edeeed" className="w-full" />

            {isNotUser && (
              <>
                <TextInput
                  label="Branch Code"
                  placeholder="Type Branch Code."
                  radius="md"
                  classNames={{ input: "poppins" }}
                  readOnly
                  // value={documentNo}
                  // onChange={(e) => {
                  //   setDocumentNo(e.target.value);
                  // }}
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                />
                <Divider size={2} h={10} color="#edeeed" className="w-full" />

                <TextInput
                  label="Employee Code."
                  placeholder="Type Employee Code."
                  radius="md"
                  classNames={{ input: "poppins" }}
                  readOnly
                  // value={documentNo}
                  // onChange={(e) => {
                  //   setDocumentNo(e.target.value);
                  // }}
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                />
                <Divider size={2} h={10} color="#edeeed" className="w-full" />

                <TextInput
                  label="Employee Name."
                  placeholder="Type Employee Name."
                  radius="md"
                  classNames={{ input: "poppins" }}
                  readOnly
                  // value={documentNo}
                  // onChange={(e) => {
                  //   setDocumentNo(e.target.value);
                  // }}
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                />
                <Divider size={2} h={10} color="#edeeed" className="w-full" />
              </>
            )}
            <Tabs value={activeTab} onChange={(val) => setActiveTab(val as "transaction" | "leave")}>
              <Tabs.Panel value="leave">
                <Group>
                  <Flex className="w-full flex flex-row justify-between">
                    <Text c="#6d6d6d" fz={15}>
                      Leave Range
                    </Text>
                    <IconTransfer onClick={toggleTab} className="cursor-pointer" />
                  </Flex>
                  <DateRangePickerInput
                    fl="Date From"
                    fp="From"
                    sl="Date To"
                    sp="To"
                    direction="column"
                    required
                    dateValue={[null, null]}
                    setDateValue={(value) => {
                      console.log(value);
                    }}
                  />
                </Group>
              </Tabs.Panel>

              <Tabs.Panel value="transaction">
                <Group>
                  <Flex className="w-full flex flex-row justify-between">
                    <Text c="#6d6d6d" fz={15}>
                      Transaction Date
                    </Text>
                    <IconTransfer onClick={toggleTab} className="cursor-pointer" />
                  </Flex>

                  <DateRangePickerInput
                    fl="Date From"
                    fp="From"
                    sl="Date To"
                    sp="To"
                    direction="column"
                    required
                    dateValue={[null, null]}
                    setDateValue={(value) => {
                      console.log(value);
                    }}
                  />
                </Group>
              </Tabs.Panel>
            </Tabs>
            <Divider size={2} h={10} color="#edeeed" className="w-full" />
            <TextInput
              label="Name"
              placeholder="Type Name."
              radius="md"
              classNames={{ input: "poppins" }}
              readOnly
              // value={documentNo}
              // onChange={(e) => {
              //   setDocumentNo(e.target.value);
              // }}
              styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
            />

            {!isNotUser && (
              <>
                <Divider size={2} h={10} color="#edeeed" className="w-full" />
                <MultiSelect
                  label="Status"
                  radius="md"
                  classNames={{ input: "poppins" }}
                  data={[
                    { value: String(1), label: "Filed" },
                    { value: String(2), label: "Approve" },
                    { value: String(3), label: "Cancelled" },
                    { value: String(4), label: "Reviewed" },
                  ]}
                  value={status.map(String)}
                  onChange={(values) => {
                    setStatus(values.map(Number));
                  }}
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                />
              </>
            )}
          </Flex>
        </div>
      </div>
    </Drawer>
  );
}
