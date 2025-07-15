/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Node Modules
import { useForm } from "@mantine/form";
import { TimeInput } from "@mantine/dates";
import { Fragment, useState } from "react";
import { IconTransfer, IconX } from "@tabler/icons-react";
import { Drawer, Flex, Group, Tabs, Text } from "@mantine/core";
//--- Shared Modules
import { useGlobalStore } from "@shared/store";

//--- Missed Log
import { useMissedLogStore } from "../../store/main";
import { useMissedLogContext } from "../../context";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import CustomDivider from "../Divider";
import { Select, Button, TextInput, MultiSelect, DateRangePickerInput } from "@shared/components";
// import { useMissedLogContext } from "../../context";

interface DrawerFilterProps {
  isNotUser?: boolean;
}

interface FilterFormInterface {
  DocumentNo: string | null;
  DateField: string | null;
  DateFrom: string | null;
  DateTo: string | null;
  LogTypeId: any;
  DocStatusIds: null;
  //--- Added
  BranchCode: null;
  EmployeeCode: null;
  EmployeeName: null;
}

export default function DrawerFilter({ isNotUser = false }: DrawerFilterProps) {
  const { twoDate, setTwoDate } = useGlobalStore();
  const { showDrawer, setShowDrawer } = useMissedLogStore();
  const { onHandleSubmitFilter, onHandleClearFilter } = useMissedLogContext();
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);

  const [activeTab, setActiveTab] = useState<"missedlog" | "transaction">("missedlog");
  const toggleTab = () => {
    setActiveTab((prev) => (prev === "missedlog" ? "transaction" : "missedlog"));
    setTwoDate([null, null]);
  };

  const filterForm = useForm<FilterFormInterface>({
    mode: "uncontrolled",
    initialValues: {
      DocumentNo: null,
      DateField: null,
      DateFrom: null,
      DateTo: null,
      LogTypeId: null,
      DocStatusIds: null,

      //--- Added
      BranchCode: null,
      EmployeeCode: null,
      EmployeeName: null,
    },
  });

  const clearFilter = () => {
    onHandleClearFilter();
  };

  const [formStatus, setFormStatus] = useState<number[]>([]);

  const handleChange = (values: string[]) => {
    setFormStatus(values.map(Number));
  };

  const submitFilter = (values: typeof filterForm.values) => {
    const formattedValues = {
      ...values,
      DateFiled: activeTab === "transaction" ? "dateTransaction" : null,
      DateFrom: twoDate[0] === null ? null : DateTimeUtils.getIsoDateFull(String(twoDate[0])),
      DateTo: twoDate[1] === null ? null : DateTimeUtils.getIsoDateFull(String(twoDate[1])),
      DocStatusIds: formStatus.length > 0 ? formStatus : null,
    };
    const cleanedValues = Object.fromEntries(Object.entries(formattedValues).filter(([_, value]) => value !== null));
    onHandleSubmitFilter(cleanedValues);
    setShowDrawer(false);
  };

  return (
    <Drawer
      opened={showDrawer}
      onClose={() => setShowDrawer(false)}
      position="right"
      withCloseButton={false}
      size="xs"
      overlayProps={{ backgroundOpacity: 0, blur: 0 }}
      styles={{ body: { height: "100%" } }}>
      <form onSubmit={filterForm.onSubmit(submitFilter)} className="w-full h-full">
        <div className="w-full h-full flex flex-col gap justify-between">
          <div className="flex flex-col gap-2 2xl:gap-4">
            <Flex className="w-full" direction="column" gap={10} mt={5}>
              <Flex direction="row" justify="space-between">
                <Text fw={700} fz={22} c="#559CDA">
                  Filter By
                </Text>
                <IconX className="cursor-pointer" onClick={() => setShowDrawer(false)} size={30} color="gray" />
              </Flex>
            </Flex>
            <CustomDivider />

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
              <CustomDivider />

              {/* For Reviewal/Approval/Filings */}
              {isNotUser && (
                <Fragment>
                  <TextInput
                    label="Branch Code"
                    placeholder="Type Branch Code."
                    radius="md"
                    classNames={{ input: "poppins" }}
                    key={filterForm.key("BranchCode")}
                    {...filterForm.getInputProps("BranchCode")}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <CustomDivider />

                  <TextInput
                    label="Employee Code."
                    placeholder="Type Employee Code."
                    radius="md"
                    classNames={{ input: "poppins" }}
                    key={filterForm.key("EmployeeCode")}
                    {...filterForm.getInputProps("EmployeeCode")}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <CustomDivider />

                  <TextInput
                    label="Employee Name."
                    placeholder="Type Employee Name."
                    radius="md"
                    classNames={{ input: "poppins" }}
                    key={filterForm.key("EmployeeName")}
                    {...filterForm.getInputProps("EmployeeName")}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <CustomDivider />
                </Fragment>
              )}
              {/* Date Range */}
              <Tabs value={activeTab} onChange={(val) => setActiveTab(val as "transaction" | "missedlog")}>
                <Tabs.Panel value="missedlog">
                  <Group>
                    <Flex className="w-full flex flex-row justify-between">
                      <Text c="#6d6d6d" fz={15}>
                        Missed Log Date
                      </Text>
                      <IconTransfer onClick={toggleTab} className="cursor-pointer" />
                    </Flex>

                    <DateRangePickerInput
                      fl="From Date"
                      sl="To Date"
                      fp="From"
                      sp="To"
                      direction="column"
                      dateValue={dateRange}
                      setDateValue={(date) => {
                        setDateRange(date);
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
                      fl="From Date"
                      sl="To Date"
                      fp="From"
                      sp="To"
                      direction="column"
                      dateValue={dateRange}
                      setDateValue={(date) => {
                        setDateRange(date);
                      }}
                    />
                  </Group>
                </Tabs.Panel>
              </Tabs>
              <CustomDivider />
              {/* Log Type */}
              <Select
                label="Log Type"
                placeholder="Time In"
                data={[
                  { value: "1", label: "Time In" },
                  { value: "2", label: "Time Out" },
                ]}
                onChange={(selectedValue) => {
                  const selectedOption = [
                    { value: "1", label: "Time In" },
                    { value: "2", label: "Time Out" },
                  ].find((option) => option.value === selectedValue);
                  filterForm.setValues({
                    LogTypeId: selectedOption?.value === null ? null : selectedOption?.value!,
                  });
                }}
              />
              <CustomDivider />

              {/* Log Time */}
              <TimeInput label="Log Time" placeholder="Select Log Time" styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }} />
              <CustomDivider />

              {!isNotUser && (
                <Fragment>
                  {/* Processed By */}
                  <MultiSelect
                    label="Processed By"
                    placeholder="Select Name"
                    radius="md"
                    classNames={{ input: "poppins" }}
                    data={[]}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                  <CustomDivider />
                  {/* Status */}
                  <MultiSelect
                    label="Status"
                    radius="md"
                    placeholder="Select Status"
                    classNames={{ input: "poppins" }}
                    data={[
                      { value: String(1), label: "Filed" },
                      { value: String(2), label: "Approve" },
                      { value: String(3), label: "Cancelled" },
                      { value: String(4), label: "Reviewed" },
                    ]}
                    value={formStatus.map(String)}
                    onChange={handleChange}
                    styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                  />
                </Fragment>
              )}
              <CustomDivider />
            </Flex>
          </div>
          <Flex className="w-full flex flex-row justify-end gap-3">
            <Button variant="outlineBlue" onClick={() => setShowDrawer(false)}>
              CLEAR
            </Button>
            <Button variant="gradient" type="submit" onClick={clearFilter}>
              FILTER
            </Button>
          </Flex>
        </div>
      </form>
    </Drawer>
  );
}
