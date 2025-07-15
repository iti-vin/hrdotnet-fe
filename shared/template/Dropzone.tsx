import { Flex, Group, Text, rem } from "@mantine/core";
import {
  IconUpload,
  IconX,
  IconCloudUp,
  IconPhoto,
  IconFileTypePdf,
  IconFileTypeDoc,
  IconFileTypeDocx,
  IconFileTypeTxt,
} from "@tabler/icons-react";
import { Dropzone } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";
import { useState } from "react";

export default function Attachment() {
  const [files, setFiles] = useState<File[]>([]);
  const handleDrop = (dropped: File[]) => {
    setFiles((prev) => [...prev, ...dropped]);
  };
  const getFileIcon = (file: File) => {
    const type = file.type;
    const name = file.name.toLowerCase();

    if (type.startsWith("image/")) return <IconPhoto size={24} />;
    if (name.endsWith(".pdf")) return <IconFileTypePdf size={24} color="red" />;
    if (name.endsWith(".doc")) return <IconFileTypeDoc size={24} color="blue" />;
    if (name.endsWith(".docx")) return <IconFileTypeDocx size={24} color="blue" />;
    if (name.endsWith(".txt")) return <IconFileTypeTxt size={24} />;
    return <IconX size={24} />;
  };

  return (
    <Group className="w-full">
      <Text size="md" fw={500} className="flex gap-2">
        Attachment<span className="text-red-400 font-semibold">*</span>
      </Text>
      <Dropzone
        onDrop={handleDrop}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={25 * 1024 ** 2}
        accept={["image/*", ".pdf", ".doc", ".docx", ".txt"]}
        className="border-dashed w-full">
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
          <Dropzone.Accept>
            <IconUpload
              style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-blue-6)" }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX style={{ width: rem(52), height: rem(52), color: "var(--mantine-color-red-6)" }} stroke={1.5} />
          </Dropzone.Reject>

          <Flex direction="column" align="center" gap={5}>
            <IconCloudUp color="#559cda" stroke={1.5} size={80} />
            <Group gap={5}>
              <Text size="xl" inline className="flex justify-center">
                Drag & drop files or
              </Text>
              <Text size="xl" className="text-blue-400 underline">
                Browse
              </Text>
            </Group>
            <Text size="sm" c="dimmed" inline mt={7}>
              Supported formats: PDF, DOC, JPG, PNG, TXT
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Max File Size: 25mb
            </Text>
          </Flex>
        </Group>
      </Dropzone>
      <Flex className="w-full flex-col gap-2 mt-4">
        {files.map((file, index) => (
          <Group key={index} className="border p-2 rounded-md justify-between w-full">
            <Group gap="sm" align="center">
              {getFileIcon(file)}
              <Text className="truncate">{file.name}</Text>
            </Group>
            <Text size="sm" c="dimmed">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </Text>
          </Group>
        ))}
      </Flex>
    </Group>
  );
}
