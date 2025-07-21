/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Avatar, Flex, Skeleton, Stack, Tabs, Text } from "@mantine/core";
import "./assets/index.css";
import Personal from "./tabs/Personal";
import Family from "./tabs/Family";
import Experience from "./tabs/Experience";
import Job from "./tabs/Job";
import Files from "./tabs/Files";
import { useMediaQuery } from "@mantine/hooks";
import profile from "./assets/profile.module.css";
import { IconBriefcaseFilled, IconFileStarFilled, IconFoldersFilled, IconHomeFilled, IconUserFilled } from "@tabler/icons-react";
import Modals from "./dialog";
import { ProfileServices } from "./services/api";
import { useQuery } from "@tanstack/react-query";
import { EmployeeWorkProfiles } from "./assets/Types";
import mina from "@shared/assets/images/mina2.jpg";
import { useState } from "react";

export default function Profile() {
  const matches = useMediaQuery("(min-width: 480px)");

  const { data, isLoading } = useQuery<EmployeeWorkProfiles>({
    queryKey: ["profile"],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await ProfileServices.getEmployeeWorkInfo();
      const endTime = performance.now();
      const executionTime = (endTime - startTime) / 1000;
      console.log(executionTime.toFixed(3).toString());
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  const [activeTab, setActiveTab] = useState<string | null>("personal");

  const hasActiveClassName = (name: string) => {
    if (name === activeTab) return true;

    return false;
  };

  return (
    <Stack className="h-full w-full p-4">
      <title>Profile</title>
      <Stack className={profile.container}>
        <Skeleton visible={isLoading} className="w-full h-full gap-2">
          <Flex className={profile.headerTitleContainer}>
            <Text fz={{ base: 16, md: 18 }} fw={800} c={"#559cda"} children="Profile" />
            <Text fz={{ base: 12, md: 14 }} c={"#6d6d6d"} children="Manage and update your personal and work-related details" />
          </Flex>
          <Flex className={profile.headContainer} style={{ border: "1px solid #cdcdcd" }}>
            <Avatar className="h-full w-auto" src={mina} radius={10} size={"xl"} />
            <Flex className="flex flex-col w-full">
              <Text className={profile.name} children={data?.personalInformation.name.formalName} />
              <Flex className={profile.employeeContainer}>
                <Flex className={profile.employeeInfoContent}>
                  <Flex className={profile.employeeInfo}>
                    Employee Code:<Text className={profile.employeeInfoValue}>{data?.code}</Text>
                  </Flex>
                  <Flex className={profile.employeeInfo}>
                    Designation:
                    <Text className={profile.employeeInfoValue}>{data?.workInformation.designation.name ? data?.workInformation.designation.name : "Not Set"}</Text>
                  </Flex>
                  <Flex className={profile.employeeInfo}>
                    Department:
                    <Text className={profile.employeeInfoValue}>{data?.workInformation.department.name ? data?.workInformation.department.name : "Not Set"}</Text>
                  </Flex>
                </Flex>
                <Flex className={profile.employeeInfoContent}>
                  <Flex className={profile.employeeInfo}>
                    Scheduler:<Text className={profile.employeeInfoValue}>Bronny James</Text>
                  </Flex>
                  <Flex className={profile.employeeInfo}>
                    Approver:<Text className={profile.employeeInfoValue}>Bronny James</Text>
                  </Flex>
                  <Flex className={profile.employeeInfo}>
                    Reviewer:<Text className={profile.employeeInfoValue}>Bronny James</Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
          <Stack className="w-full h-[72%] my-2">
            <Tabs value={activeTab} onChange={setActiveTab} className="h-full w-full">
              <Tabs.List className="tabs-list h-[8%] bg-[#fafafa] w-full">
                <Tabs.Tab
                  value="personal"
                  className="btn-personal"
                  children={
                    <>
                      <Text className={`${hasActiveClassName("personal") && "font-semibold"} hover:font-semibold hidden xl:block`}>Personal Information</Text>
                      <IconUserFilled className="block xl:hidden" size={matches ? 18 : 11} />
                    </>
                  }
                />
                <Tabs.Tab
                  value="fam"
                  className="btn-personal"
                  children={
                    <>
                      <Text className={`${hasActiveClassName("fam") && "font-semibold"} hover:font-semibold hidden xl:block`}>Family</Text>
                      <IconHomeFilled className="block xl:hidden" size={matches ? 18 : 11} />
                    </>
                  }
                />
                <Tabs.Tab
                  value="exp"
                  className="btn-personal"
                  children={
                    <>
                      <Text className={`${hasActiveClassName("exp") && "font-semibold"} hover:font-semibold hidden xl:block`}>Experiences</Text>
                      <IconFileStarFilled className="block xl:hidden" size={matches ? 18 : 11} />
                    </>
                  }
                />
                <Tabs.Tab
                  value="job"
                  className="btn-personal"
                  children={
                    <>
                      <Text className={`${hasActiveClassName("job") && "font-semibold"} hover:font-semibold hidden xl:block`}>Job Information</Text>
                      <IconBriefcaseFilled className="block xl:hidden" size={matches ? 18 : 11} />
                    </>
                  }
                />
                <Tabs.Tab
                  value="files"
                  className="btn-personal"
                  children={
                    <>
                      <Text className={`${hasActiveClassName("files") && "font-semibold"} hover:font-semibold hidden xl:block`}>Additional Files</Text>
                      <IconFoldersFilled className="block xl:hidden" size={matches ? 18 : 11} />
                    </>
                  }
                />
              </Tabs.List>
              <Tabs.Panel value="personal" className="h-[93%] w-full py-4" children={<Personal />} />
              <Tabs.Panel value="fam" className="h-[93%] w-full py-4" children={<Family />} />
              <Tabs.Panel value="exp" className="h-[93%] w-full py-4" children={<Experience />} />
              <Tabs.Panel value="job" className="h-[93%] w-full py-4" children={<Job />} />
              <Tabs.Panel value="files" className="h-[93%] w-full py-4" children={<Files />} />
            </Tabs>
          </Stack>
        </Skeleton>
      </Stack>
      <Modals />
    </Stack>
  );
}
