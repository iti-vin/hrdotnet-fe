import {
  IconBriefcase,
  IconCake,
  IconCircleCheck,
  IconFaceMask,
  IconGrave2,
  IconLockSquareRounded,
  IconMoodKid,
  IconUrgent,
  IconVenus,
} from "@tabler/icons-react";

const iconStyle = { width: "rem(100)", height: "rem(100)", stroke: "1.5" };

export const LeaveTypes = [
  { count: 6, label: "Vacation Leave", icon: <IconBriefcase size={75} style={iconStyle} /> },
  { count: 3, label: "Sick Leave", icon: <IconFaceMask size={75} style={iconStyle} /> },
  { count: 2, label: "Emergency Leave", icon: <IconUrgent size={75} style={iconStyle} /> },
  { count: 1, label: "Birthday Leave", icon: <IconCake size={75} style={iconStyle} /> },
  { count: 6, label: "Leave Without Pay", icon: <IconCircleCheck style={iconStyle} size={75} /> },
  { count: 16, label: "Bereavement Leave", icon: <IconGrave2 size={75} style={iconStyle} /> },
  { count: 7, label: "Maternity Leave", icon: <IconMoodKid size={75} style={iconStyle} /> },
  { count: 1, label: "SSS Allocation Leave", icon: <IconLockSquareRounded size={75} style={iconStyle} /> },
  { count: 6, label: "Magna Carta", icon: <IconVenus size={75} style={iconStyle} /> },
];

// <p style={{ fontSize: "2.6rem", color: "#559cda", fontWeight: "600", width: "4rem", textAlign: "center" }}>
//   SSS
// </p>
