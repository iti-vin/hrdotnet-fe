/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Divider, Flex, NumberInput, ScrollArea, Skeleton, Stack, Switch, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import notifications from "../assets/account.module.css";
import { IconEdit } from "@tabler/icons-react";
import { Button } from "@shared/components";
import { useState } from "react";

export default function Notifications() {
  const matches = useMediaQuery("(min-width: 480px)");
  const [email, setEmail] = useState(false);
  const [system, setSystem] = useState(false);

  const styles = { track: { backgroundColor: "#697077", "&[data-checked]": { backgroundColor: "#697077" } }, thumb: { backgroundColor: "#697077", borderColor: "#697077" } };
  return (
    <Stack className="h-full overflow-hidden w-full">
      <Skeleton visible={false} className="w-full h-full">
        <Stack className="w-full h-full gap-4">
          <Stack className="p-4 rounded-md gap-7 h-full w-full" style={{ border: "1px solid #cdcdcd" }}>
            <Flex className={notifications.header}>
              <Flex className="flex flex-col w-full">
                <Text fw={600} fz={matches ? 16 : 14} children="Notifications" />
                <Text fz={matches ? 12 : 14} children="Manage your system and email notifications" />
              </Flex>
            </Flex>
            <ScrollArea className="h-full w-full gap-2" type="hover">
              <Stack className="mb-5">
                <Flex className={notifications.header}>
                  <Flex className="flex flex-col">
                    <Text fw={600} fz={matches ? 14 : 12} children="System Notifications" />
                    <Text fz={matches ? 12 : 14} children="Receive reminders inside the system. Enter the number of days in advance you want to be notified." />
                  </Flex>
                  {!email && (
                    <Button
                      variant="outline"
                      onClick={() => setEmail(!email)}
                      leftSection={<IconEdit size={matches ? 25 : 18} className="cursor-pointer" />}
                      className="w-24 max-h-9 border-[#559cda] text-[#559cda]">
                      Edit
                    </Button>
                  )}
                </Flex>
                <Flex className="flex flex-col md:flex-row gap-3">
                  <Flex className="w-full items-end gap-2">
                    <NumberInput value={0} label="Holiday" className="w-full" hideControls disabled={!email} />
                    <Text>day(s)</Text>
                  </Flex>
                  <Flex className="w-full items-end gap-2">
                    <NumberInput value={0} label="Offset Credits Expiry" className="w-full" hideControls disabled={!email} />
                    <Text>day(s)</Text>
                  </Flex>
                  <Flex className="w-full items-end gap-2">
                    <NumberInput value={0} label="Filing Deadline" className="w-full" hideControls disabled={!email} />
                    <Text>day(s)</Text>
                  </Flex>
                  <Flex className="w-full items-end gap-2">
                    <NumberInput value={0} label="Approval Deadline" className="w-full" hideControls disabled={!email} />
                    <Text>day(s)</Text>
                  </Flex>
                </Flex>
                {email && (
                  <Flex className="flex flex-row w-full justify-end gap-5">
                    <Button variant="outline" onClick={() => setEmail(!email)} className="w-32 max-h-9 border-[#559cda] text-[#559cda]">
                      Cancel
                    </Button>
                    <Button variant="blue" className="w-32 max-h-9 border-[#559cda] text-[#559cda]">
                      Save Changes
                    </Button>
                  </Flex>
                )}
              </Stack>
              <Divider className="w-full" />
              <Stack className="mt-5">
                <Flex className={notifications.header}>
                  <Flex className="flex flex-col">
                    <Text fw={600} fz={matches ? 14 : 12} children="Email Notifications" />
                    <Text fz={matches ? 12 : 14} children="Get notified via email for important updates." />
                  </Flex>
                  {!system && (
                    <Button
                      variant="outline"
                      onClick={() => setSystem(!system)}
                      leftSection={<IconEdit size={matches ? 25 : 18} className="cursor-pointer" />}
                      className="w-24 max-h-9 border-[#559cda] text-[#559cda]">
                      Edit
                    </Button>
                  )}
                </Flex>
                <Flex className="w-full flex flex-col gap-2">
                  <Flex className={`${!system ? "bg-[#cccccc] " : "bg-white"} flex flex-row rounded-md p-4`} style={{ border: "1px solid #cccccc" }}>
                    <Flex className={notifications.header}>
                      <Flex className="flex flex-col">
                        <Text fw={600} fz={matches ? 14 : 12} children="My Requests" />
                        <Text fz={matches ? 12 : 14} children="Notify me when there are changes in my request status." />
                      </Flex>
                      <Switch
                        defaultChecked
                        disabled={!system}
                        styles={(_, params) => {
                          if (!params.disabled) return {};
                          return styles;
                        }}
                      />
                    </Flex>
                  </Flex>
                  <Flex className={`${!system ? "bg-[#cccccc] " : "bg-white"} flex flex-row rounded-md p-4`} style={{ border: "1px solid #cccccc" }}>
                    <Flex className={notifications.header}>
                      <Flex className="flex flex-col">
                        <Text fw={600} fz={matches ? 14 : 12} children="Review" />
                        <Text fz={matches ? 12 : 14} children="Notify me when there are new request for my review." />
                      </Flex>
                      <Switch
                        defaultChecked
                        disabled={!system}
                        styles={(_, params) => {
                          if (!params.disabled) return {};
                          return styles;
                        }}
                      />
                    </Flex>
                  </Flex>
                  <Flex className={`${!system ? "bg-[#cccccc] " : "bg-white"} flex flex-row rounded-md p-4`} style={{ border: "1px solid #cccccc" }}>
                    <Flex className={notifications.header}>
                      <Flex className="flex flex-col">
                        <Text fw={600} fz={matches ? 14 : 12} children="Approve" />
                        <Text fz={matches ? 12 : 14} children="Notify me when there are new request for my approve." />
                      </Flex>
                      <Switch
                        defaultChecked
                        disabled={!system}
                        styles={(_, params) => {
                          if (!params.disabled) return {};
                          return styles;
                        }}
                      />
                    </Flex>
                  </Flex>
                  <Flex className={`${!system ? "bg-[#cccccc] " : "bg-white"} flex flex-row rounded-md p-4`} style={{ border: "1px solid #cccccc" }}>
                    <Flex className={notifications.header}>
                      <Flex className="flex flex-col">
                        <Text fw={600} fz={matches ? 14 : 12} children="Holiday" />
                        <Text fz={matches ? 12 : 14} children="Notify days before a working holiday." />
                      </Flex>
                      <Switch
                        defaultChecked
                        disabled={!system}
                        styles={(_, params) => {
                          if (!params.disabled) return {};
                          return styles;
                        }}
                      />
                    </Flex>
                  </Flex>
                  <Flex className={`${!system ? "bg-[#cccccc] " : "bg-white"} flex flex-row rounded-md p-4`} style={{ border: "1px solid #cccccc" }}>
                    <Flex className={notifications.header}>
                      <Flex className="flex flex-col">
                        <Text fw={600} fz={matches ? 14 : 12} children="Off Credits Expiry" />
                        <Text fz={matches ? 12 : 14} children="Notify days before an off credits expires." />
                      </Flex>
                      <Switch
                        defaultChecked
                        disabled={!system}
                        styles={(_, params) => {
                          if (!params.disabled) return {};
                          return styles;
                        }}
                      />
                    </Flex>
                  </Flex>
                  <Flex className={`${!system ? "bg-[#cccccc] " : "bg-white"} flex flex-row rounded-md p-4`} style={{ border: "1px solid #cccccc" }}>
                    <Flex className={notifications.header}>
                      <Flex className="flex flex-col">
                        <Text fw={600} fz={matches ? 14 : 12} children="Filing Deadling" />
                        <Text fz={matches ? 12 : 14} children="Notify days before the filing deadline ends." />
                      </Flex>
                      <Switch
                        defaultChecked
                        disabled={!system}
                        styles={(_, params) => {
                          if (!params.disabled) return {};
                          return styles;
                        }}
                      />
                    </Flex>
                  </Flex>
                  <Flex className={`${!system ? "bg-[#cccccc] " : "bg-white"} flex flex-row rounded-md p-4`} style={{ border: "1px solid #cccccc" }}>
                    <Flex className={notifications.header}>
                      <Flex className="flex flex-col">
                        <Text fw={600} fz={matches ? 14 : 12} children="Approval Deadling" />
                        <Text fz={matches ? 12 : 14} children="Notify days before the approval deadline ends." />
                      </Flex>
                      <Switch
                        defaultChecked
                        disabled={!system}
                        styles={(_, params) => {
                          if (!params.disabled) return {};
                          return styles;
                        }}
                      />
                    </Flex>
                  </Flex>
                </Flex>
                {system && (
                  <Flex className="flex flex-row w-full justify-end gap-5">
                    <Button variant="outline" onClick={() => setSystem(!system)} className="w-32 max-h-9 border-[#559cda] text-[#559cda]">
                      Cancel
                    </Button>
                    <Button variant="blue" className="w-32 max-h-9 border-[#559cda] text-[#559cda]">
                      Save Changes
                    </Button>
                  </Flex>
                )}
              </Stack>
            </ScrollArea>
          </Stack>
        </Stack>
      </Skeleton>
    </Stack>
  );
}
