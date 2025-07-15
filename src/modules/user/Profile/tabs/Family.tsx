/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Divider, Flex, ScrollArea, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import family from "../assets/profile.module.css";
import { useProfileStore } from "../store";
import { EmployeeInformation } from "../assets/Personal.types";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import { useQuery } from "@tanstack/react-query";
import { ProfileServices } from "../services/api";
import { DataTable } from "mantine-datatable";

export default function Family() {
  const personalInfo = useQuery<EmployeeInformation>({
    queryKey: ["family_information"],
    queryFn: async () => {
      const startTime = performance.now();
      const result = await ProfileServices.getEmployeeInfo();
      const endTime = performance.now();
      const executionTime = (endTime - startTime) / 1000;
      console.log(executionTime.toFixed(3).toString());
      return result;
    },
    staleTime: 1000 * 60 * 5,
  });

  const { setOpenModal } = useProfileStore();
  const matches = useMediaQuery("(min-width: 480px)");
  return (
    <Stack className="h-full overflow-hidden w-full">
      <ScrollArea className="h-full w-full">
        <Stack className="pt-2">
          <Flex className={family.header}>
            <Text fw={600} fz={matches ? 18 : 14}>
              Other Information
            </Text>
            <IconEdit size={matches ? 25 : 18} onClick={() => setOpenModal("OtherInfo")} className="cursor-pointer" />
          </Flex>
          <Divider />
          <Flex className={family.content}>
            <Flex className={family.contentContainer}>
              <Flex className={family.textContainer}>
                Spouse's Name:
                <Text size="sm" className={family.infoValue}>
                  {personalInfo.data?.personalInformation.familyInformation.spouseName}
                </Text>
              </Flex>
              <Flex className={family.textContainer}>
                Spouse's Birth Date:
                <Text size="sm" className={family.infoValue}>
                  {DateTimeUtils.dateDefaultToWord(
                    personalInfo.data?.personalInformation.familyInformation.spouseBirthDate!
                  )}
                </Text>
              </Flex>
              <Flex className={family.textContainer}>
                Spouse's Occupation:
                <Text size="sm" className={family.infoValue}>
                  {personalInfo.data?.personalInformation.familyInformation.spouseOccupation}
                </Text>
              </Flex>
              <Flex className={family.textContainer}>
                Spouse's Employer:
                <Text size="sm" className={family.infoValue}>
                  {personalInfo.data?.personalInformation.familyInformation.spouseEmployer}
                </Text>
              </Flex>
            </Flex>
            <Flex className={family.contentContainer}>
              <Flex className={family.textContainer}>
                Father's Name:
                <Text size="sm" className={family.infoValue}>
                  {personalInfo.data?.personalInformation.familyInformation.fatherName}
                </Text>
              </Flex>
              <Flex className={family.textContainer}>
                Father's Birth Date:
                <Text size="sm" className={family.infoValue}>
                  {DateTimeUtils.dateDefaultToWord(
                    personalInfo.data?.personalInformation.familyInformation.fatherBirthDate!
                  )}
                </Text>
              </Flex>
              <Flex className={family.textContainer}>
                Father's Occupation:
                <Text size="sm" className={family.infoValue}>
                  {personalInfo.data?.personalInformation.familyInformation.fatherOccupation}
                </Text>
              </Flex>
            </Flex>
            <Flex className={family.contentContainer}>
              <Flex className={family.textContainer}>
                Mother's Name:
                <Text size="sm" className={family.infoValue}>
                  {personalInfo.data?.personalInformation.familyInformation.motherName}
                </Text>
              </Flex>
              <Flex className={family.textContainer}>
                Mother's Birth Date:
                <Text size="sm" className={family.infoValue}>
                  {DateTimeUtils.dateDefaultToWord(
                    personalInfo.data?.personalInformation.familyInformation.motherBirthDate!
                  )}
                </Text>
              </Flex>
              <Flex className={family.textContainer}>
                Mother's Occupation:
                <Text size="sm" className={family.infoValue}>
                  {personalInfo.data?.personalInformation.familyInformation.motherOccupation}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Stack>

        <Stack className="pt-4">
          <Flex className={family.header}>
            <Text fw={600} fz={matches ? 18 : 14}>
              Contacts
            </Text>
            <IconEdit size={matches ? 25 : 18} onClick={() => setOpenModal("Contacts")} className="cursor-pointer" />
          </Flex>
          <Divider />
          <DataTable
            records={[]}
            fetching={false}
            classNames={{ header: "bg-gray-200", root: "rounded-md", table: "bg-gray-200" }}
            className="w-full"
            columns={[
              { accessor: "name", title: "Name" },
              { accessor: "address", title: "Address" },
              { accessor: "number", title: "Number" },
              { accessor: "relationship", title: "Relationship" },
            ]}
          />
        </Stack>
        <Stack className="pt-4">
          <Flex className={family.header}>
            <Text fw={600} fz={matches ? 18 : 14}>
              Dependants
            </Text>
            <IconEdit size={matches ? 25 : 18} onClick={() => setOpenModal("Dependants")} className="cursor-pointer" />
          </Flex>
          <Divider />
          <DataTable
            records={[]}
            fetching={false}
            classNames={{ header: "bg-gray-200", root: "rounded-md", table: "bg-gray-200" }}
            className="w-full"
            columns={[
              { accessor: "name", title: "Name" },
              { accessor: "relationship", title: "Relationship" },
              { accessor: "birthDate", title: "Date of Birth" },
              { accessor: "gender", title: "Gender" },
              { accessor: "civilStatus", title: "Civil Status" },
              { accessor: "isStudy", title: "Is studying" },
            ]}
          />{" "}
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
