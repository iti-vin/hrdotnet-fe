/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Node Modules
import { useForm } from "@mantine/form";
import { Fragment, useState } from "react";
import { IconTransfer } from "@tabler/icons-react";
import { Container, Flex, Group, Tabs, Text } from "@mantine/core";
//--- Shared Modules

import { useGlobalStore } from "@shared/store";

//--- Missed Log
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { useChangeOfScheduleStore } from "../../store";
import { useChangeOfScheduleContext } from "../../context";
import CustomDivider from "../Divider";
import Drawer from "@shared/components/drawer";
import { Button, Select, DateRangePickerInput, MultiSelect, TextInput } from "@shared/components";

interface DrawerFilterProps {
  isNotUser?: boolean;
}

interface FilterFormInterface {
  DocumentNo: string | null;
  DateField: string | null;
  DateFrom: string | null;
  DateTo: string | null;
  DocStatusIds: null;
  //--- Added
  BranchCode: null;
  EmployeeCode: null;
  EmployeeName: null;
}

export default function DrawerFilter({ isNotUser = false }: DrawerFilterProps) {
  const { twoDate, setTwoDate } = useGlobalStore();
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);
  const { openDrawer, setOpenDrawer } = useChangeOfScheduleStore();
  const { onHandleSubmitFilter, onHandleClearFilter } = useChangeOfScheduleContext();

  const [activeTab, setActiveTab] = useState<"missedlog" | "transaction">("missedlog");
  const toggleTab = () => {
    setActiveTab((prev) => (prev === "missedlog" ? "transaction" : "missedlog"));
    setTwoDate([null, null]);
  };

  const [formStatus, setFormStatus] = useState<number[]>([]);

  const handleChange = (values: string[]) => {
    setFormStatus(values.map(Number));
  };

  const filterForm = useForm<FilterFormInterface>({
    mode: "uncontrolled",
    initialValues: {
      DocumentNo: null,
      DateField: null,
      DateFrom: null,
      DateTo: null,
      DocStatusIds: null,

      //--- Added
      BranchCode: null,
      EmployeeCode: null,
      EmployeeName: null,
    },
  });

  const submitFilter = (values: typeof filterForm.values) => {
    const formattedValues = {
      ...values,
      DateFrom: twoDate[0] === null ? null : DateTimeUtils.getIsoDateFull(String(twoDate[0])),
      DateTo: twoDate[1] === null ? null : DateTimeUtils.getIsoDateFull(String(twoDate[1])),
      DocStatusIds: formStatus.length > 0 ? formStatus : null,
    };
    const cleanedValues = Object.fromEntries(Object.entries(formattedValues).filter(([_, value]) => value !== null));
    onHandleSubmitFilter(cleanedValues);
    setOpenDrawer(false);
  };

  const clearFilter = () => {
    setFormStatus([]);
    setTwoDate([null, null]);
    onHandleClearFilter();
  };

  return (
    <Drawer
      title="Filter By"
      opened={openDrawer}
      onClose={() => setOpenDrawer(false)}
      position="right"
      withCloseButton={false}
      size="xs"
      overlayProps={{ backgroundOpacity: 0, blur: 0 }}
      styles={{ body: { height: "100%" } }}>
      <form onSubmit={filterForm.onSubmit(submitFilter)} className="w-full h-full">
        <Flex className="w-full h-full flex flex-col gap justify-between">
          <Container className="flex flex-col gap-2 2xl:gap-4 p-0">
            <Flex className="flex flex-col gap-2">
              <TextInput label="Document No." placeholder="Type Document No." key={filterForm.key("DocumentNo")} {...filterForm.getInputProps("DocumentNo")} />

              <CustomDivider />

              {/* For Reviewal/Approval/Filings */}
              {isNotUser && (
                <Fragment>
                  <TextInput label="Branch Code" placeholder="Type Branch Code." key={filterForm.key("BranchCode")} {...filterForm.getInputProps("BranchCode")} />
                  <CustomDivider />

                  <TextInput label="Employee Code." placeholder="Type Employee Code." key={filterForm.key("EmployeeCode")} {...filterForm.getInputProps("EmployeeCode")} />
                  <CustomDivider />
                  <TextInput label="Employee Name." placeholder="Type Employee Name." key={filterForm.key("EmployeeName")} {...filterForm.getInputProps("EmployeeName")} />
                  <CustomDivider />
                </Fragment>
              )}

              <MultiSelect
                label="Schedule"
                data={[
                  { value: String(1), label: "Filed" },
                  { value: String(2), label: "Approve" },
                  { value: String(3), label: "Cancelled" },
                  { value: String(4), label: "Reviewed" },
                ]}
              />
              <CustomDivider />

              {/* Date Range */}
              <Tabs value={activeTab} onChange={(val) => setActiveTab(val as "transaction" | "missedlog")}>
                <Tabs.Panel value="missedlog">
                  <Group>
                    <Flex className="w-full flex flex-row justify-between">
                      <Text c="#6d6d6d" fz={15}>
                        Overtime Date
                      </Text>
                      <IconTransfer onClick={toggleTab} className="cursor-pointer" />
                    </Flex>
                    <DateRangePickerInput
                      direction="column"
                      dateValue={dateRange}
                      setDateValue={(date) => {
                        setDateRange(date);
                      }}
                      fl="Date From"
                      sl="From"
                      fp="Date To"
                      sp="To"
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

                    {/* {RndrDateRange({
                      fl: "Date From",
                      fp: "From",
                      sl: "Date To",
                      sp: "To",
                      dateProps: twoDate,
                      setDateProps: (newValue: [Date | null, Date | null]) => {
                        setTwoDate(newValue);
                        filterForm.setValues({
                          DateField: "dateTransaction",
                        });
                      },
                    })} */}
                    <DateRangePickerInput
                      direction="column"
                      dateValue={dateRange}
                      setDateValue={(date) => {
                        setDateRange(date);
                      }}
                      fl="Date From"
                      sl="From"
                      fp="Date To"
                      sp="To"
                    />
                  </Group>
                </Tabs.Panel>
              </Tabs>
              <CustomDivider mt={5} />

              <Select
                label="Requested Schedule"
                radius="md"
                // defaultValue={requested}
                // data={schedList.map((item) => ({ value: item.id.toString(), label: item.name }))}
                // onChange={(value) => {
                //   const selectedItem = schedList.find((item) => item.id.toString() === value);
                //   if (selectedItem) {
                //     setRequested(selectedItem.name);
                //   }
                // }}
                clearable
              />

              {!isNotUser && (
                <Fragment>
                  {/* Processed By */}
                  <CustomDivider />
                  <MultiSelect label="Processed By" placeholder="Select Name" data={[]} />
                  <CustomDivider />
                  {/* Status */}
                  <MultiSelect
                    label="Status"
                    placeholder="Select Status"
                    data={[
                      { value: String(1), label: "Filed" },
                      { value: String(2), label: "Approve" },
                      { value: String(3), label: "Cancelled" },
                      { value: String(4), label: "Reviewed" },
                    ]}
                    value={formStatus.map(String)}
                    onChange={handleChange}
                  />
                </Fragment>
              )}
              <CustomDivider />
            </Flex>
          </Container>
          <Flex className="w-full flex flex-row justify-end gap-3">
            <Button variant="outlineBlue" onClick={clearFilter}>
              CLEAR
            </Button>
            <Button variant="gradient" size="md" type="submit">
              FILTER
            </Button>
          </Flex>
        </Flex>
      </form>
    </Drawer>
  );
}
