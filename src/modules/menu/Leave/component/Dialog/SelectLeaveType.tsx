import "mantine-datatable/styles.layer.css";
import { LeaveStore } from "../../LeaveStore";
import { Divider, Modal } from "@mantine/core";
import { Text } from "@mantine/core";
import "@mantine/dates/styles.css";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import { useMatches } from "@mantine/core";
import { Select } from "@mantine/core";
import LeaveType from "@/modules/menu/Leave/component/Table/LeaveType";
import { IconCaretDownFilled } from "@tabler/icons-react";
import { useState } from "react";
export default function SelectLeaveType() {
  const { SET_SELECTED_LEAVE_TYPE, SET_ALERT, SELECTED_LEAVE_TYPE } = LeaveStore();
  const modalSize = useMatches({
    base: "100%",
    lg: "70%",
  });
  const [value, setValue] = useState<Date | null>(null);
  return (
    <>
      <Modal
        opened={Object.keys(SELECTED_LEAVE_TYPE).length !== 0}
        onClose={() => SET_SELECTED_LEAVE_TYPE({})}
        styles={{ title: { color: "#559CDA", fontSize: 22, fontWeight: 600 } }}
        radius="md"
        title={"Leave Type"}
        centered
        size={modalSize}
        padding={30}>
        <Divider size="xs" color="#6D6D6D" />
        <div className="h-full flex flex-col mt-5 gap-5">
          <div className="flex flex-col md:flex-row gap-4 md:justify-between items-center">
            <Select
              styles={{ input: { borderRadius: 10, background: "#559CDA", color: "white" } }}
              defaultValue={"2024"}
              data={["2024", "2023", "2022", "2021"]}
              rightSection={<IconCaretDownFilled size={18} color="white" />}
            />
            <div className="flex gap-2" style={{ color: "#559CDA" }}>
              <Text>Available Leave Credit </Text>
              <Text>1.5 </Text>
            </div>
          </div>
          <LeaveType />
        </div>
      </Modal>
    </>
  );
}
