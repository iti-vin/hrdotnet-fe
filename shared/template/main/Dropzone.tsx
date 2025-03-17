import { Flex, Group, Image, Text, rem } from "@mantine/core";
import { IconUpload, IconX, IconCloudUp } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE, MIME_TYPES } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";
import React from "react";

interface Props {
  isColored?: boolean;
  content?: React.ReactNode;
  isBold?: boolean;
  itHasValue?: boolean;
}

export default function Attachment({ isColored = false, isBold = false, content, itHasValue = false }: Props) {
  const [files, setFiles] = React.useState<File[]>([]);

  const [preview, setPreview] = React.useState<string>();

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      console.log("Accepted files:", acceptedFiles);
      setFiles(acceptedFiles);
      setPreview(URL.createObjectURL(acceptedFiles[0]));
    }
  };

  return (
    <Group className="w-full">
      {itHasValue ? (
        <>
          <Text size="md" fw={isBold ? 700 : 500} className="flex gap-2" c={`${isColored && "blue"}`}>
            Attachment
          </Text>
          {content}
        </>
      ) : (
        <>
          <Text size="md" fw={isBold ? 700 : 500} className="flex gap-2" c={`${isColored ? "blue" : "#6d6d6d"} `}>
            Attachment{files.length === 0 && <span className="text-red-400 font-semibold">*</span>}
          </Text>
          <Dropzone
            onDrop={handleDrop}
            onReject={(files) => console.log("Rejected files:", files)}
            maxSize={5 * 1024 ** 2}
            accept={[...IMAGE_MIME_TYPE, MIME_TYPES.pdf]}
            className="border-dashed w-full"
            acceptColor="red">
            <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: "none" }}>
              <Dropzone.Accept>
                <IconUpload
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-blue-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{
                    width: rem(52),
                    height: rem(52),
                    color: "var(--mantine-color-red-6)",
                  }}
                  stroke={1.5}
                />
              </Dropzone.Reject>

              {files.length > 0 ? (
                <div className="mt-4">
                  <Text size="sm" fw={600}>
                    Uploaded Files:
                  </Text>
                  <ul>
                    {files.map((file, index) => (
                      <li key={index}>
                        {preview && <Image src={preview} alt="Uploaded Preview" width={200} height={200} mt="md" radius="md" />}
                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <>
                  <Flex direction="column" align="center" gap={5}>
                    <IconCloudUp color="#559cda" stroke={1.5} size={80} />
                    {content ? content : "Add Contents"}
                    <Text size="sm" c="dimmed" inline mt={7}>
                      Supported formats: PDF, DOC
                    </Text>
                    <Text size="sm" c="dimmed" inline mt={7}>
                      Max File Size: 25mb
                    </Text>
                  </Flex>
                </>
              )}
            </Group>
          </Dropzone>
        </>
      )}
    </Group>
  );
}
