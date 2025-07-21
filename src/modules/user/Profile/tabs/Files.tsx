/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Flex, ScrollArea, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconEdit, IconFileText } from "@tabler/icons-react";
import experience from "../assets/profile.module.css";
import { useProfileStore } from "../store";
import { Button } from "@shared/components";

export default function Files() {
  const { setOpenModal } = useProfileStore();
  const matches = useMediaQuery("(min-width: 480px)");
  return (
    <Stack className="h-full overflow-hidden w-full">
      <ScrollArea className="h-full w-full" type="hover">
        <Stack className="w-full h-full gap-4">
          <Stack className="p-4 rounded-md gap-7" style={{ border: "1px solid #cdcdcd" }}>
            <Flex className={experience.header}>
              <Text fw={600} fz={matches ? 16 : 14}>
                201 Files
              </Text>
              <Button
                variant="outline"
                onClick={() => setOpenModal("Files")}
                leftSection={<IconEdit size={matches ? 25 : 18} className="cursor-pointer" />}
                className="w-24 max-h-9 border-[#559cda] text-[#559cda]">
                Edit
              </Button>
            </Flex>
            <Flex direction="column" gap={10}>
              <Flex className="bg-gray-200 w-full h-10 rounded-md  border-2 border-gray-400 border-dashed items-center justify-center">
                <Flex gap={2} className="items-center w-full h-full justify-center">
                  <IconFileText color="#6d6d6d" />
                  <Text c="#6d6d6d" fw={600}>
                    File Attachment.pdf
                  </Text>
                  <Text c="#6d6d6d" size="sm" fw={600}>
                    Size: 20 mb
                  </Text>
                </Flex>
              </Flex>
              <Flex className="bg-gray-200 w-full h-10 rounded-md  border-2 border-gray-400 border-dashed items-center justify-center">
                <Flex gap={2} className="items-center w-full h-full justify-center">
                  <IconFileText color="#6d6d6d" />
                  <Text c="#6d6d6d" fw={600}>
                    File Attachment.pdf
                  </Text>
                  <Text c="#6d6d6d" size="sm" fw={600}>
                    Size: 20 mb
                  </Text>
                </Flex>
              </Flex>
              <Flex className="bg-gray-200 w-full h-10 rounded-md  border-2 border-gray-400 border-dashed items-center justify-center">
                <Flex gap={2} className="items-center w-full h-full justify-center">
                  <IconFileText color="#6d6d6d" />
                  <Text c="#6d6d6d" fw={600}>
                    File Attachment.pdf
                  </Text>
                  <Text c="#6d6d6d" size="sm" fw={600}>
                    Size: 20 mb
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Stack>
          <Stack className="p-4 rounded-md gap-7" style={{ border: "1px solid #cdcdcd" }}>
            <Flex className={experience.header}>
              <Text fw={600} fz={matches ? 16 : 14}>
                Other Files
              </Text>
              <Button
                variant="outline"
                onClick={() => setOpenModal("OtherFiles")}
                leftSection={<IconEdit size={matches ? 25 : 18} className="cursor-pointer" />}
                className="w-24 max-h-9 border-[#559cda] text-[#559cda]">
                Edit
              </Button>
            </Flex>
            <Flex className="gap-2" direction="column">
              <Flex className="gap-2">
                Additional Files <Text c="#559cda">Diploma</Text>
              </Flex>
              <Flex className="bg-gray-200 w-full h-10 rounded-md  border-2 border-gray-400 border-dashed items-center justify-center">
                <Flex gap={2} className="items-center w-full h-full justify-center">
                  <IconFileText color="#6d6d6d" />
                  <Text c="#6d6d6d" fw={600}>
                    File Attachment.pdf
                  </Text>
                  <Text c="#6d6d6d" size="sm" fw={600}>
                    Size: 20 mb
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex className="gap-2" direction="column">
              <Flex className="gap-2">
                Additional Files <Text c="#559cda">NBI Clearance</Text>
              </Flex>
              <Flex className="bg-gray-200 w-full h-10 rounded-md  border-2 border-gray-400 border-dashed items-center justify-center">
                <Flex gap={2} className="items-center w-full h-full justify-center">
                  <IconFileText color="#6d6d6d" />
                  <Text c="#6d6d6d" fw={600}>
                    File Attachment.pdf
                  </Text>
                  <Text c="#6d6d6d" size="sm" fw={600}>
                    Size: 20 mb
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex className="gap-2" direction="column">
              <Flex className="gap-2">
                Additional Files <Text c="#559cda">TOR</Text>
              </Flex>
              <Flex className="bg-gray-200 w-full h-10 rounded-md  border-2 border-gray-400 border-dashed items-center justify-center">
                <Flex gap={2} className="items-center w-full h-full justify-center">
                  <IconFileText color="#6d6d6d" />
                  <Text c="#6d6d6d" fw={600}>
                    File Attachment.pdf
                  </Text>
                  <Text c="#6d6d6d" size="sm" fw={600}>
                    Size: 20 mb
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Stack>
        </Stack>
      </ScrollArea>
    </Stack>
  );
}
