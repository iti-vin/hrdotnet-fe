/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Divider, Flex, ScrollArea, Skeleton, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import personal from "../assets/profile.module.css";
import { useProfileStore } from "../store";
import { useQuery } from "@tanstack/react-query";
import { ProfileServices } from "../services/api";
import { EmployeeInformation } from "../assets/Personal.types";

export default function Personal() {
  const { setOpenModal } = useProfileStore();
  const matches = useMediaQuery("(min-width: 480px)");

  const { data, isLoading } = useQuery<EmployeeInformation>({
    queryKey: ["personal"],
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

  return (
    <Stack className="h-full overflow-hidden w-full">
      <Skeleton visible={isLoading} className="w-full h-full">
        <ScrollArea className="h-full w-full">
          <Stack className="pt-2">
            <Flex className={personal.header}>
              <Text fw={600} fz={matches ? 18 : 14}>
                Personal Information
              </Text>
              <IconEdit size={matches ? 25 : 18} onClick={() => setOpenModal("Personal")} className="cursor-pointer" />
            </Flex>
            <Divider />
            <Flex className={personal.content}>
              <Flex className={personal.contentContainer}>
                <Flex className={personal.textContainer}>
                  Nationality:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.personalInformation.nationality.name}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  Citizenship:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.personalInformation.citizenship.name}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  Birthdate:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.personalInformation.birthDate}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  Birthplace:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.personalInformation.birthPlace}
                  </Text>
                </Flex>
              </Flex>
              <Flex className={personal.contentContainer}>
                <Flex className={personal.textContainer}>
                  Gender:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.personalInformation.gender.name}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  Blood Type:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.personalInformation.bloodType.name}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  Civil Status:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.personalInformation.civilStatus.name}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  Religion:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.personalInformation.religion.name}
                  </Text>
                </Flex>
              </Flex>
              <Flex className={personal.contentContainer}>
                <Flex className={personal.textContainer}>
                  Weight:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.personalInformation.weight}kg
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  Height:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.personalInformation.height}cm
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  Phone Number:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.contact.mobileNo}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  Email Address:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.personalInformation.emailAddress}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Stack>
          <Stack className="pt-4">
            <Flex className={personal.header}>
              <Text fw={600} fz={matches ? 18 : 14}>
                Address Information
              </Text>
              <IconEdit size={matches ? 25 : 18} onClick={() => setOpenModal("Address")} className="cursor-pointer" />
            </Flex>
            <Divider />
            <Flex className={personal.content}>
              <Flex className={personal.contentContainer}>
                <Flex className={personal.textContainer}>
                  Present Address:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.address.home}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  Zipcode:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.address.homeZipCode}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  Permanent Address:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.address.provincial}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  Zipcode:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.address.provincialZipCode}
                  </Text>
                </Flex>
              </Flex>
              <Flex className={personal.contentContainer}>
                <Flex className={personal.textContainer}>
                  Landline:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.contact.homePhoneNo ? data?.contact.homePhoneNo : "N/A"}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  Mobile Number:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.contact.homePhoneNo ? data?.contact.homePhoneNo : "N/A"}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  Landline:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.contact.provincialPhoneNo ? data?.contact.provincialPhoneNo : "N/A"}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  Mobile Number:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.contact.provincialPhoneNo ? data?.contact.provincialPhoneNo : "N/A"}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Stack>
          <Stack className="pt-4">
            <Flex className={personal.header}>
              <Text fw={600} fz={matches ? 18 : 14}>
                Identifications
              </Text>
              <IconEdit
                size={matches ? 25 : 18}
                onClick={() => setOpenModal("Identification")}
                className="cursor-pointer"
              />
            </Flex>
            <Divider />
            <Flex className={personal.content}>
              <Flex className={personal.contentContainer}>
                <Flex className={personal.textContainer}>
                  SSS No:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.identification.sssNo ? data.identification.sssNo : "Not Set"}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  HDMF No:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.identification.hdmfNo ? data.identification.hdmfNo : "Not Set"}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  PhilHealth No:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.identification.phicNo ? data.identification.phicNo : "Not Set"}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  GSIS No:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.identification.gsisNo ? data.identification.gsisNo : "Not Set"}
                  </Text>
                </Flex>
              </Flex>
              <Flex className={personal.contentContainer}>
                <Flex className={personal.textContainer}>
                  Driver's License No:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.identification.driversLicenseNo ? data.identification.driversLicenseNo : "Not Set"}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  Tin No:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.identification.tinNo ? data.identification.tinNo : "Not Set"}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  Passport No:
                  <Text size="sm" className={personal.infoValue}>
                    {data?.identification.passportNo ? data.identification.passportNo : "Not Set"}
                  </Text>
                </Flex>
                <Flex className={personal.textContainer}>
                  RDO Code:
                  <Text size="sm" className={personal.infoValue}>
                    {/* {data?.identification.gsisNo ? data.identification.gsisNo : "Not Set"} */}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Stack>
        </ScrollArea>
      </Skeleton>
    </Stack>
  );
}
