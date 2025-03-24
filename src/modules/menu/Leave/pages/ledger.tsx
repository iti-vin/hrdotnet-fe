import React, { useEffect, useState } from "react";
import { ScrollArea, Select, Stack, Text } from "@mantine/core";
import {
  IconCake,
  IconCalendarClock,
  IconCaretDownFilled,
  IconCreditCardOff,
  IconGrave2,
  IconUrgent,
  IconVenus,
  IconWoman,
  IconPlaneTilt,
  IconCashBanknote,
  IconBabyCarriage,
} from "@tabler/icons-react";
import LeaveType from "../components/Table/ledger";
import useLeaveStore from "../store/LeaveStore";
const iconsStyle = { color: "#559cda" };

const leaveTypes = [
  { count: 6, label: "VACATION LEAVE", icon: <IconPlaneTilt style={iconsStyle} /> },
  { count: 3, label: "SICK LEAVE", icon: <IconCashBanknote style={iconsStyle} /> },
  { count: 2, label: "EMERGENCY LEAVE", icon: <IconUrgent style={iconsStyle} /> },
  { count: 1, label: "BIRTHDAY LEAVE", icon: <IconCake style={iconsStyle} /> },
  { count: 16, label: "BEREAVEMENT LEAVE", icon: <IconGrave2 style={iconsStyle} /> },
  { count: 7, label: "MATERNITY LEAVE", icon: <IconBabyCarriage style={iconsStyle} /> },
  { count: 7, label: "COMPENSATORY TIME OFF", icon: <IconCalendarClock style={iconsStyle} /> },
  { count: 1, label: "SSS Allocation LEAVE", icon: <p style={{ fontSize: "2.6rem", color: "#559cda", fontWeight: "600", width: "4rem", textAlign: "center" }}>SSS</p> },
  { count: 6, label: "MAGNA CARTA", icon: <IconVenus style={iconsStyle} /> },
  { count: 7, label: "SINGLE PARENT LEAVE", icon: <IconWoman style={iconsStyle} /> },
  { count: 7, label: "LEAVE WITHOUT PAY", icon: <IconCreditCardOff style={iconsStyle} /> },
];

export default function Ledger() {
  const [selectedLeaveType, setSelectedLeaveType] = useState("Vacation Leave");
  const { leaveType } = useLeaveStore();

  const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      const mediaQuery = window.matchMedia("(max-width: 768px)");
      const handleResize = () => setIsMobile(mediaQuery.matches);
      handleResize();
      mediaQuery.addEventListener("change", handleResize);
      return () => mediaQuery.removeEventListener("change", handleResize);
    }, []);

    return isMobile;
  };

  const isMobile = useIsMobile();

  useEffect(() => {
    console.log(isMobile);
  }, [isMobile]);

  return (
    <div className="h-full w-full flex flex-col sm:flex-row gap-6">
      <div className="hidden h-full sm:flex flex-col w-full sm:w-3/4">
        <div className="hidden sm:flex flex-col md:flex-row gap-4 md:justify-between items-center bg-[#EFF6FF] p-4 border-2 border-blue-200 border-b-0 rounded-t-lg">
          <Select
            styles={{ input: { borderRadius: 10, background: "#559CDA", color: "white", textAlign: "center", padding: "1.3rem" } }}
            defaultValue={"2024"}
            data={["2024", "2023", "2022", "2021"]}
            rightSection={<IconCaretDownFilled size={18} color="white" />}
          />
          <div className="flex gap-2 " style={{ color: "#559CDA" }}>
            <Text>Available Leave Credit </Text>
            <Text className="font-bold">1.5 </Text>
          </div>
        </div>
        <div className="hidden sm:block h-full border-2 border-t-0 border-blue-200 rounded-b-lg overflow-hidden">
          <div className="h-[100%] p-2">
            <LeaveType />
          </div>
        </div>
      </div>

      <Stack className="grow grid grid-cols-1 gap-2 overflow-y-auto h-full">
        <ScrollArea>
          {isMobile && <Text className="text-xl font-semibold text-[#559CDA]">Leave Ledger</Text>}
          {leaveTypes.map((leave) => {
            const selectedItem = leaveType.find((item) => item.name === leave.label);

            if (selectedItem) {
              return (
                <div
                  key={leave.label}
                  className={`${
                    leave.label === selectedLeaveType ? "custom-gradient" : ""
                  }  cursor-pointer border h-[4.8rem]  flex flex-col items-end  justify-center  shadow-md shadow-blue-300 rounded-lg `}
                  onClick={() => {
                    setSelectedLeaveType(leave.label);
                  }}>
                  <div className="flex justify-between items-center sm:gap-6 w-full p-5">
                    <Text
                      style={{
                        color: `${leave.label === selectedLeaveType ? "white" : "#559cda"}`,
                      }}>
                      {leave.count}
                    </Text>
                    <Text
                      style={{
                        color: `${leave.label === selectedLeaveType ? "white" : "#767F8C"}`,
                      }}>
                      {leave.label}
                    </Text>
                    <div className="rounded-full ">
                      {React.cloneElement(leave.icon, {
                        style: {
                          ...leave.icon.props.style,
                          color: leave.label === selectedLeaveType ? "white" : "#559cda",
                        },
                        size: 40,
                        color: leave.label === selectedLeaveType ? "white" : "#559cda",
                      })}
                    </div>
                  </div>
                </div>
              );
            } else return null;
          })}
        </ScrollArea>
      </Stack>
    </div>
  );
}
