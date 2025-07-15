/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Node Modules
import { useForm } from "@mantine/form";
import { Fragment, useState } from "react";
import { IconTransfer, IconX } from "@tabler/icons-react";
import { Drawer, Flex, Group, Tabs, Text } from "@mantine/core";
//--- Shared Modules
import { useGlobalStore } from "@shared/store";

//--- Missed Log
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { useOfficialBusinessStore } from "../../store";
import { useOfficialBusinessContext } from "../../context";
import CustomDivider from "../Divider";
import { Button, DateRangePickerInput, MultiSelect, Select, TextInput } from "@shared/components";
// import { useMissedLogContext } from "../../context";

interface DrawerFilterProps {
  isNotUser?: boolean;
}

interface FilterFormInterface {
  DocumentNo: string | null;
  DateField: string | null;
  DateFrom: string | null;
  DateTo: string | null;
  Location: number | null;
  DocStatusIds: null;
  //--- Added
  BranchCode: null;
  EmployeeCode: null;
  EmployeeName: null;
}

export default function DrawerFilter({ isNotUser = false }: DrawerFilterProps) {
  const { openDrawer, setOpenDrawer, locations } = useOfficialBusinessStore();
  const { twoDate, setTwoDate } = useGlobalStore();
  const { onHandleSubmitFilter, onHandleClearFilter } = useOfficialBusinessContext();
  const [dateRange, setDateRange] = useState<[string | null, string | null]>([null, null]);

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
      Location: null,
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
      opened={openDrawer}
      onClose={() => setOpenDrawer(false)}
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
                <IconX className="cursor-pointer" onClick={() => setOpenDrawer(false)} size={30} color="gray" />
              </Flex>
            </Flex>
            <CustomDivider />

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
              {/* Date Range */}
              <Tabs value={activeTab} onChange={(val) => setActiveTab(val as "transaction" | "missedlog")}>
                <Tabs.Panel value="missedlog">
                  <Group>
                    <Flex className="w-full flex flex-row justify-between">
                      <Text c="#6d6d6d" fz={15}>
                        OB Range
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
                label="Location"
                className="w-full"
                data={locations.map((item) => ({ value: item.id.toString(), label: item.name }))}
                required
                onChange={(selectedValue) => {
                  const selectedItem = locations.find((item) => item.id.toString() === selectedValue);
                  if (selectedItem) {
                    // filterForm.setValues({
                    //   Location: selectedItem.id,
                    // });
                  }
                }}
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
                    classNames={{ input: "poppins" }}
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
          </div>
          <Flex className="w-full flex flex-row justify-end gap-3">
            <Button variant="outlineBlue" onClick={clearFilter}>
              CLEAR
            </Button>
            <Button variant="gradient" type="submit" onClick={undefined}>
              FILTER
            </Button>
          </Flex>
        </div>
      </form>
    </Drawer>
  );
}
