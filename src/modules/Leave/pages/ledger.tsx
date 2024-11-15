import { useEffect } from "react";
import { Text } from "@mantine/core";
import { IconBriefcase } from "@tabler/icons-react";
import { LeaveStore } from "@/modules/Leave/LeaveStore";

const leaveTypes = [
    { count: 6, label: "Vacation Leave" },
    { count: 3, label: "Sick Leave" },
    { count: 2, label: "Emergency Leave" },
    { count: 1, label: "Birthday Leave" },
    { count: 16, label: "Bereavement Leave" },
    { count: 7, label: "Maternity Leave" },
    { count: 1, label: "SSS Allocation Leave" },
    { count: 6, label: "Magna Carta" },
    { count: 7, label: "Single Parent Leave" },
];

export default function Ledger() {
    const { SET_ACTIVE_TAB } = LeaveStore();

    useEffect(() => {
        SET_ACTIVE_TAB("review");
    }, []);

    return (
        <div className="bg-white m-4  -mb-16 lg:h-screen-85 overflow-y-hidden -z-10 p-8 rounded-lg bottom-0">
        {/*  <div className=" bg-white rounded-lg m-8 p-8  flex flex-col justify-center lg:h-screen-80"> */}
                <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {leaveTypes.map((leave, index) => (
                        <div key={leave.label} className="bg-white h-59 lg:p-2 flex flex-col items-center justify-center shadow-md shadow-blue-300 rounded-lg">
                            <div className="rounded-full p-5" style={{ background: '#559cda' }}>
                                <IconBriefcase size={75} color="white" />
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
