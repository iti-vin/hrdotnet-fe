/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Flex, PasswordInput, ScrollArea, Skeleton, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Button } from "@shared/components";
import { IconEdit } from "@tabler/icons-react";
import changePassword from "../assets/account.module.css";
import { useState } from "react";

export default function ChangePassword() {
  const matches = useMediaQuery("(min-width: 480px)");

  const [editMode, setEditMode] = useState(false);

  return (
    <Stack className="h-full overflow-hidden w-full">
      <ScrollArea className="h-full w-full" type="hover">
        <Skeleton visible={false} className="w-full h-full">
          <Stack className="w-full h-full gap-4">
            <Stack className="p-4 rounded-md gap-7" style={{ border: "1px solid #cdcdcd" }}>
              <Flex className={changePassword.header}>
                <Flex className="flex flex-col">
                  <Text fw={600} fz={matches ? 16 : 14} children="Password" />
                  <Text fz={matches ? 12 : 14} children="Modify your current password" />
                </Flex>
                {!editMode && (
                  <Button
                    variant="outline"
                    onClick={() => setEditMode(!editMode)}
                    leftSection={<IconEdit size={matches ? 25 : 18} className="cursor-pointer" />}
                    className="w-24 max-h-9 border-[#559cda] text-[#559cda]">
                    Edit
                  </Button>
                )}
              </Flex>
              <Flex className="flex flex-col md:flex-row gap-8">
                <PasswordInput value="dasdasdasdasdasd" onChange={() => {}} label="Current Password" placeholder="" className="w-full" disabled={!editMode} />
                <PasswordInput value="dasdasdasdasdasd" onChange={() => {}} label="New Password" placeholder="" className="w-full" disabled={!editMode} />
                <PasswordInput value="dasdasdasdasdasd" onChange={() => {}} label="Confirm Password" placeholder="" className="w-full" disabled={!editMode} />
              </Flex>
              {editMode && (
                <Flex className="flex flex-row w-full justify-end gap-5">
                  <Button variant="outline" onClick={() => setEditMode(!editMode)} className="w-32 max-h-9 border-[#559cda] text-[#559cda]">
                    Cancel
                  </Button>
                  <Button variant="blue" className="w-32 max-h-9 border-[#559cda] text-[#559cda]">
                    Save Changes
                  </Button>
                </Flex>
              )}
            </Stack>
          </Stack>
        </Skeleton>
      </ScrollArea>
    </Stack>
  );
}
