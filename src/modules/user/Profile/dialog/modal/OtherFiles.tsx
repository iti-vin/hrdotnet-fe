/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import Modal from "@/layout/main/dialog/UpdatedModal";
import { Box, Button, Flex, ScrollArea, Select, Stack, Text, useMatches } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { ModalProps } from "@shared/assets/types/Modal";
import { IconCaretDown } from "@tabler/icons-react";
import { Fragment } from "react";

export default function UpdateOtherFiles({ opened, onClose, buttonClose }: ModalProps) {
  const size = useMatches({ base: "100%", sm: "70%" });
  return (
    <Fragment>
      <Modal opened={opened} onClose={onClose} buttonClose={buttonClose} size={size} title="Update Other Files">
        <form onSubmit={undefined}>
          <Stack className="w-full h-full">
            <ScrollArea
              className="flex flex-col mt-3 w-full text-[#6d6d6d] relative  px-10"
              h={650}
              styles={{ scrollbar: { display: "block" } }}>
              <Flex className="w-full flex flex-col  gap-5">
                <Select
                  size="md"
                  placeholder="Other File"
                  label="Other File"
                  radius={8}
                  data={["Next Day", "Same Day"]}
                  classNames={{ input: "poppins" }}
                  rightSection={<IconCaretDown size={18} onClick={() => {}} />}
                  className="border-none w-full"
                  styles={{ label: { color: "#6d6d6d", fontSize: "15px" } }}
                />
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
