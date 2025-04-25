/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Modal from "@/layout/main/dialog/UpdatedModal";
import { Box, Button, Flex, ScrollArea, Stack, Text, useMatches } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { ModalProps } from "@shared/assets/types/Modal";
import { IconFileText } from "@tabler/icons-react";
import { Fragment } from "react";

export default function Update201Files({ opened, onClose, buttonClose }: ModalProps) {
  const size = useMatches({ base: "100%", sm: "70%" });
  return (
    <Fragment>
      <Modal opened={opened} onClose={onClose} buttonClose={buttonClose} size={size} title="Update 201 Files">
        <form onSubmit={undefined}>
          <Stack className="w-full h-full">
            <ScrollArea
              className="flex flex-col mt-3 w-full text-[#6d6d6d] relative  px-10"
              h={650}
              styles={{ scrollbar: { display: "block" } }}>
              <Flex className="flex flex-col w-full gap-5">
                <Box className="w-full  rounded-md border-dashed border-2 border-gray-400">
                  <Dropzone h={200} bd={0} onDrop={() => {}} className="flex flex-col justify-center">
                    <Flex gap={2} className="flex flex-col items-center w-full h-full justify-center">
                      <Text c="#559cda" td="underline">
                        Upload Another File.
                      </Text>
                      <Text c="#6d6d6d" size="xs">
                        Supported Formats: .doc, .docx, .jpg, .png, .txt, .pdf
                      </Text>
                      <Text c="#6d6d6d" size="xs">
                        Max Total File Size: 25MB
                      </Text>
                      <Text c="#6d6d6d" size="xs">
                        Max No. of Files: 10
                      </Text>
                    </Flex>
                  </Dropzone>
                </Box>
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
