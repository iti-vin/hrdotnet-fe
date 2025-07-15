/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import PanelNav from "@/layout/main/panel";
import { Avatar, Flex, Skeleton, Stack, Tabs, Text } from "@mantine/core";
import "./assets/index.css";
import Personal from "./tabs/Personal";
import Family from "./tabs/Family";
import Experience from "./tabs/Experience";
import Job from "./tabs/Job";
import Files from "./tabs/Files";
import { useMediaQuery } from "@mantine/hooks";
import profile from "./assets/profile.module.css";
import {
  IconBriefcaseFilled,
  IconFileStarFilled,
  IconFoldersFilled,
  IconHomeFilled,
  IconUserFilled,
} from "@tabler/icons-react";
import Modals from "./dialog";
import { ProfileServices } from "./services/api";
import { useQuery } from "@tanstack/react-query";
import { EmployeeWorkProfiles } from "./assets/Types";

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

  return (
    <Stack className="h-full">
      <title>Profile</title>
      <PanelNav>
        <div className="h-8"></div>
      </PanelNav>
      <Stack className={profile.container}>
        <Skeleton visible={isLoading} className="w-full h-full">
          <Flex className={profile.headContainer}>
            <Flex className="gap-5">
              <Avatar src="https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png" size={matches ? "xl" : "lg"} />
              <Flex className={profile.nameContainer}>
                <Text className={profile.name} children={data?.personalInformation.name.lastName} />
                <Text className={profile.name} children={data?.personalInformation.name.firstName} />
              </Flex>
            </Flex>
            <Flex className={profile.employeeContainer}>
              <Flex className={profile.employeeInfoContent}>
                <Flex className={profile.employeeInfo}>
                  Employee Code:<Text className={profile.employeeInfoValue}>{data?.code}</Text>
                </Flex>
                <Flex className={profile.employeeInfo}>
                  Designation:
                  <Text className={profile.employeeInfoValue}>
                    {data?.workInformation.designation.name ? data?.workInformation.designation.name : "Not Set"}
                  </Text>
                </Flex>
                <Flex className={profile.employeeInfo}>
                  Department:
                  <Text className={profile.employeeInfoValue}>
                    {data?.workInformation.department.name ? data?.workInformation.department.name : "Not Set"}
                  </Text>
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
          <Stack className="w-full h-[70%] md:h-[90%]">
            <Tabs defaultValue="personal" className="h-full w-full">
              <Tabs.List className="h-[7%] bg-[#fafafa] w-full">
                <Tabs.Tab
                  value="personal"
                  className="btn-personal"
                  children={
                    <>
                      <Text className="font-semibold hidden xl:block">Personal Information</Text>
                      <IconUserFilled className="block xl:hidden" size={matches ? 18 : 11} />
                    </>
                  }
                />
                <Tabs.Tab
                  value="fam"
                  className="btn-personal"
                  children={
                    <>
                      <Text className="font-semibold hidden xl:block">Family</Text>
                      <IconHomeFilled className="block xl:hidden" size={matches ? 18 : 11} />
                    </>
                  }
                />
                <Tabs.Tab
                  value="exp"
                  className="btn-personal"
                  children={
                    <>
                      <Text className="font-semibold hidden xl:block">Experiences</Text>
                      <IconFileStarFilled className="block xl:hidden" size={matches ? 18 : 11} />
                    </>
                  }
                />
                <Tabs.Tab
                  value="job"
                  className="btn-personal"
                  children={
                    <>
                      <Text className="font-semibold hidden xl:block">Job Information</Text>
                      <IconBriefcaseFilled className="block xl:hidden" size={matches ? 18 : 11} />
                    </>
                  }
                />
                <Tabs.Tab
                  value="files"
                  className="btn-personal"
                  children={
                    <>
                      <Text className="font-semibold hidden xl:block">Additional Files</Text>
                      <IconFoldersFilled className="block xl:hidden" size={matches ? 18 : 11} />
                    </>
                  }
                />
              </Tabs.List>
              <Tabs.Panel value="personal" className="h-[93%] w-full p-4" children={<Personal />} />
              <Tabs.Panel value="fam" className="h-[93%] w-full p-4" children={<Family />} />
              <Tabs.Panel value="exp" className="h-[93%] w-full p-4" children={<Experience />} />
              <Tabs.Panel value="job" className="h-[93%] w-full p-4" children={<Job />} />
              <Tabs.Panel value="files" className="h-[93%] w-full p-4" children={<Files />} />
            </Tabs>
          </Stack>
        </Skeleton>
      </Stack>

      <Modals />
    </Stack>
  );
}
