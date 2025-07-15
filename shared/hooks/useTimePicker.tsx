/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { useRef } from "react";
import { ActionIcon, rem } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";

/**
 * Custom hook for managing a time picker input with an attached clock icon.
 * Provides a reference to the input field and a picker control button.
 * @function useTimePicker
 * @returns {object} An object containing:
 *  - `ref` {React.RefObject<HTMLInputElement>} - A reference to the time input field.
 *  - `pickerControl` {JSX.Element} - A button that triggers the time picker when clicked.
 */
export function useTimePicker() {
  const ref = useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  return { ref, pickerControl };
}
