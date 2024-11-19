import { useEffect } from "react";
import { Text } from "@mantine/core";
import { IconBriefcase, IconCake, IconCalendarClock, IconCreditCard, IconCreditCardOff, IconFaceMask, IconGrave, IconGrave2, IconMoodKid, IconUrgent, IconVenus, IconWoman } from "@tabler/icons-react";
import { LeaveStore } from "@/modules/Leave/LeaveStore";

const iconsStyle = { size: 75, color: 'white' }

const leaveTypes = [
    { count: 6, label: "Vacation Leave", icon: <IconBriefcase size={75} color="white" style={iconsStyle} /> },
    { count: 3, label: "Sick Leave", icon: <IconFaceMask size={75} color="white" style={iconsStyle} /> },
    { count: 2, label: "Emergency Leave", icon: <IconUrgent size={75} color="white" style={iconsStyle} /> },
    { count: 1, label: "Birthday Leave", icon: <IconCake size={75} color="white" style={iconsStyle} /> },
    { count: 16, label: "Bereavement Leave", icon: <IconGrave2 size={75} color="white" style={iconsStyle} /> },
    { count: 7, label: "Maternity Leave", icon: <IconMoodKid size={75} color="white" style={iconsStyle} /> },
    { count: 7, label: "CTO", icon: <IconCalendarClock size={75} color="white" style={iconsStyle} /> },
    { count: 1, label: "SSS Allocation Leave", icon: <p style={{fontSize:'2.6rem', color:'white', fontWeight:'600', width:'4rem', textAlign:'center'
    }}>SSS</p> },
    { count: 6, label: "Magna Carta", icon: <IconVenus size={75} color="white" style={iconsStyle} /> },
    { count: 7, label: "Single Parent Leave", icon: <IconWoman size={75} color="white" style={iconsStyle} /> },
    { count: 7, label: "Leave Without Pay", icon: <IconCreditCardOff size={75} color="white" style={iconsStyle} /> },
];


export default function Ledger() {
    const { SET_ACTIVE_TAB, SET_SELECTED_LEAVE_TYPE } = LeaveStore();

    useEffect(() => {
        SET_ACTIVE_TAB("review");
    }, []);

    return (
        <div className="bg-white m-4  -mb-16 lg:h-screen-85 overflow-y-hidden -z-10 p-8 rounded-lg bottom-0">
            {/*  <div className=" bg-white rounded-lg m-8 p-8  flex flex-col justify-center lg:h-screen-80"> */}
            <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {leaveTypes.map((leave, index) => (
                    <div key={leave.label} className="cursor-pointer bg-white h-56 lg:p-2 flex flex-col items-center justify-center shadow-md shadow-blue-300 rounded-lg" onClick={() => {
                        SET_SELECTED_LEAVE_TYPE(leave)
                    }}>
                        <div className="rounded-full p-5" style={{ background: '#559cda' }}>
                            {/* <IconBriefcase size={75} color="white" style={iconsStyle} /> */}
                            {leave.icon}
                        </div>
                        <div className="flex items-center justify-start mt-2 -ml-16 max-w-16 gap-6">
                            <Text style={{ fontSize: '2.2rem' }} color="#559cda">
                                {leave.count}
                            </Text>
                            <Text color="#767F8C" >
                                {leave.label}
                            </Text>
                        </div>
                    </div>
                ))}
            </div>
            {/*  </div> */}
        </div>
    );
}
