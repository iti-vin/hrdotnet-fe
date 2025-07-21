/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Avatar, Flex, Skeleton, Stack, Tabs, Text } from "@mantine/core";
import profile from "./assets/account.module.css";
import mina from "@shared/assets/images/mina2.jpg";
import { useRef, useState } from "react";
import ChangePassword from "./tabs/ChangePassword";
import Notifications from "./tabs/Notifications";
import { Button } from "@shared/components";
import { IconCamera } from "@tabler/icons-react";

export default function AccountSettings() {
  const [activeTab, setActiveTab] = useState<string | null>("password");
  const [newImage, setNewImage] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setNewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const hasActiveClassName = (name: string) => {
    if (name === activeTab) return true;

    return false;
  };

  return (
    <Stack className="h-full w-full p-4">
      <title>Account Settings</title>
      <Stack className={profile.container}>
        <Skeleton visible={false} className="w-full h-full gap-2">
          <Flex className={profile.headerTitleContainer}>
            <Text fz={{ base: 16, md: 18 }} fw={800} c={"#559cda"} children="Account Settings" />
            <Text fz={{ base: 12, md: 14 }} c={"#6d6d6d"} children="Manage your profile picture, password and notifications" />
          </Flex>
          <Flex className={profile.headContainer} style={{ border: "1px solid #cdcdcd" }}>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
            <Avatar className="h-full" src={newImage != "" ? newImage : mina} size={"xl"} w={150} />
            <Flex className="flex flex-col w-full gap-5">
              <Flex className="flex flex-col w-full">
                <Text fz={24} fw={600} c={"#6d6d6d"}>
                  Myoui Sharon Mina
                </Text>
                <Text fz={14} c={"#969696"}>
                  HR Admin
                </Text>
              </Flex>
              <Button
                variant="outline"
                onClick={handleButtonClick}
                leftSection={<IconCamera size={18} className="cursor-pointer" />}
                className="w-48 max-h-9 border-[#559cda] text-[#559cda]">
                UPLOAD NEW PICTURE
              </Button>
            </Flex>
          </Flex>
          <Stack className="w-full h-[72%] my-2">
            <Tabs value={activeTab} onChange={setActiveTab} className="h-full w-full">
              <Tabs.List className="tabs-list h-[8%] bg-[#fafafa] w-full">
                <Tabs.Tab
                  value="password"
                  className="btn-personal"
                  children={<Text className={`${hasActiveClassName("password") && "font-semibold"} hover:font-semibold`}>Change Password</Text>}
                />
                <Tabs.Tab
                  value="notifications"
                  className="btn-personal"
                  children={<Text className={`${hasActiveClassName("notifications") && "font-semibold"} hover:font-semibold`}>Notifications</Text>}
                />
              </Tabs.List>
              <Tabs.Panel value="password" className="h-[93%] w-full py-4" children={<ChangePassword />} />
              <Tabs.Panel value="notifications" className="h-[93%] w-full py-4" children={<Notifications />} />
            </Tabs>
          </Stack>
        </Skeleton>
      </Stack>
    </Stack>
  );
}
