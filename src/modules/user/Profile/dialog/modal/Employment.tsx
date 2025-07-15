/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Modal from "@/layout/main/dialog/UpdatedModal";
import { Button, Group, ScrollArea, Stack, useMatches } from "@mantine/core";
import { ModalProps } from "@shared/assets/types/Modal";
import { IconCirclePlus } from "@tabler/icons-react";
import { DataTable } from "mantine-datatable";
import { Fragment } from "react";

export default function UpdateEmployment({ opened, onClose, buttonClose }: ModalProps) {
  const size = useMatches({ base: "100%", sm: "70%" });
  return (
    <Fragment>
      <Modal opened={opened} onClose={onClose} buttonClose={buttonClose} size={size} title="Update Employment History">
        <form onSubmit={undefined}>
          <Stack className="w-full h-full">
            <ScrollArea
              className="flex flex-col mt-3 w-full text-[#6d6d6d] relative  px-10"
              h={650}
              styles={{ scrollbar: { display: "block" } }}>
              <Group>
                <DataTable
                  records={[]}
                  fetching={false}
                  classNames={{ header: "bg-white", root: "rounded-md border-2 p-3", table: "bg-white" }}
                  className="w-full"
                  columns={[
                    { accessor: "company", title: "Company" },
                    { accessor: "status", title: "Employee Status" },
                    { accessor: "salary", title: "Salary" },
                    { accessor: "position", title: "Position" },
                    { accessor: "startDate", title: "Start Date" },
                    { accessor: "endDate", title: "End Date" },
                    { accessor: "reason", title: "Reason for Leaving" },
                    { accessor: "", title: "Action" },
                  ]}
                />
                <Button size="xs" bg="#6d6d6d" leftSection={<IconCirclePlus />}>
                  ADD EMPLOYMENT HISTORY
                </Button>
              </Group>
            </ScrollArea>
          </Stack>
          <Stack className="flex flex-col justify-end mt-3 px-10">
            <Button type="submit" className="w-auto  br-gradient self-end border-none" radius="md" size="md">
              SAVE
            </Button>
          </Stack>
        </form>
      </Modal>
    </Fragment>
  );
}
