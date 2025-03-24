/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */
//--- React Modules
import { useState } from "react";
//--- Mantine Modules
import { DatePicker } from "@mantine/dates";
import { Button, Divider, Drawer, Flex, Group, MultiSelect, Popover, Select, Tabs, Text, TextInput } from "@mantine/core";
//--- Icons
import { IconCalendarMonth, IconTransfer, IconX } from "@tabler/icons-react";

import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import useLeaveStore from "../../store/LeaveStore";
import { useLeave } from "../../context";
import { useForm } from "@mantine/form";

interface DateRangeProps {
  fp: string;
  sp: string;
  fl: string;
  sl: string;
  dateProps: [Date | null, Date | null];
  setDateProps(value: [Date | null, Date | null]): void;
}

interface DrawerFilterProps {
  isNotUser?: boolean;
}

export default function DrawerFilter({ isNotUser = false }: DrawerFilterProps) {
  const { status, setStatus, twoDate, setTwoDate, openDialog, setOpenDialog, leaveType, setLoading, setDataFilter } = useLeaveStore();
  const { onHandleSubmitFilter, onHandleClearFilter } = useLeave();
  const RndrDateRange = ({ fp, sp, fl, sl, dateProps, setDateProps }: DateRangeProps) => {
    return (
      <Flex direction="column" justify="space-between" className="w-full">
        <Popover position="bottom" shadow="md" trapFocus={true} returnFocus={true}>
          <Popover.Target>
            <TextInput
              value={dateProps[0] === null ? "" : DateTimeUtils.dayWithDate(`${dateProps[0]?.toString()}`)}
              radius="md"
              size="md"
              readOnly
              label={fl}
              placeholder={fp}
              className="w-full cursor-default"
              rightSection={<IconCalendarMonth />}
              styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
            />
          </Popover.Target>
          <Popover.Dropdown className="w-full">
            <DatePicker firstDayOfWeek={0} numberOfColumns={2} type="range" value={dateProps} onChange={setDateProps} />
          </Popover.Dropdown>
        </Popover>
        <Popover position="bottom" shadow="md">
          <Popover.Target>
            <TextInput
              value={dateProps[1] === null ? "" : DateTimeUtils.dayWithDate(`${dateProps[1]?.toString()}`)}
              radius="md"
              size="md"
              readOnly
              label={sl}
              placeholder={sp}
              rightSection={<IconCalendarMonth />}
              className="w-full"
              styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
            />
          </Popover.Target>
          <Popover.Dropdown>
            <DatePicker numberOfColumns={2} type="range" value={dateProps} onChange={setDateProps} />
          </Popover.Dropdown>
        </Popover>
      </Flex>
    );
  };

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
      opened={openDialog === "DrawerFilter"}
      onClose={() => setOpenDialog("")}
      position="right"
      withCloseButton={false}
      size="xs"
      overlayProps={{ backgroundOpacity: 0, blur: 0 }}
      styles={{ body: { height: "100%" } }}>
      <form className="w-full h-full " onSubmit={filterForm.onSubmit(submitFilter)}>
        <div className="w-full h-full flex flex-col gap justify-between">
          <div className="flex flex-col gap-2 2xl:gap-4">
            <Flex className="w-full" direction="column" gap={10} mt={5}>
              <Flex direction="row" justify="space-between">
                <Text fw={700} fz={22} c="#559CDA">
                  Filter By
                </Text>
                <IconX className="cursor-pointer" onClick={() => setOpenDialog("")} size={30} color="gray" />
              </Flex>
            </Flex>
            <Divider size={2} color="#edeeed" className="w-full" />

            <Flex className="flex flex-col gap-2">
              <TextInput
                label="Document No."
                placeholder="Type Document No."
                radius="md"
                classNames={{ input: "poppins" }}
                key={filterForm.key("DocumentNo")}
                {...filterForm.getInputProps("DocumentNo")}
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
                  />
                  <Divider size={2} h={10} color="#edeeed" className="w-full" />
                </>
              )}
              <Tabs value={activeTab} onChange={(val) => setActiveTab(val as "transaction" | "leave")}>
                <Tabs.Panel value="leave">
                  <Group mt="md">
                    <Flex className="w-full flex flex-row justify-between">
                      <Text>Leave Range</Text>
                      <IconTransfer onClick={toggleTab} className="cursor-pointer" />
                    </Flex>
                    {RndrDateRange({
                      fl: "Date From",
                      fp: "From",
                      sl: "Date To",
                      sp: "To",
                      dateProps: twoDate,
                      setDateProps: (newValue: [Date | null, Date | null]) => {
                        setTwoDate(newValue);
                      },
                    })}
                  </Group>
                </Tabs.Panel>

                <Tabs.Panel value="transaction">
                  <Group mt="md">
                    <Flex className="w-full flex flex-row justify-between">
                      <Text>Transaction Date</Text>
                      <IconTransfer onClick={toggleTab} className="cursor-pointer" />
                    </Flex>
                    {RndrDateRange({
                      fl: "Date From",
                      fp: "From",
                      sl: "Date To",
                      sp: "To",
                      dateProps: twoDate,
                      setDateProps: (newValue: [Date | null, Date | null]) => {
                        setTwoDate(newValue);
                      },
                    })}
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
                  />
                </>
              )}
            </Flex>
          </div>
          <Flex className="w-full flex flex-row justify-end gap-3">
            <Button variant="outline" radius="md" w={100} onClick={clearFilter}>
              CLEAR
            </Button>
            <Button className="border-none br-gradient" radius="md" type="submit" w={100}>
              FILTER
            </Button>
          </Flex>
        </div>
      </form>
    </Drawer>
  );
}
