import { Text } from '@mantine/core';
import { IconCircleCheck, IconFolderPlus, IconFilePlus } from "@tabler/icons-react";
import 'mantine-datatable/styles.layer.css';
import { Button } from '@mantine/core';
import { LeaveStore } from "@/modules/Leave/LeaveStore";
import Filter from './Template/Filter';

export default function LeaveHeader() {

    const iconStyle = { width: 'rem(100)', height: 'rem(100)', stroke: '1.5', color: "white" };

    const { ACTIVE_TAB, SET_ACTION } = LeaveStore();

    const leaveObject = [
        { tab: 'list', text: 'New Request', value: 'NewRequest', icon: <IconFilePlus style={iconStyle} size={24} /> },
        { tab: 'review', text: 'Endorse', value: 'Endorse', icon: <IconFolderPlus style={iconStyle} size={24} /> },
        { tab: 'approve', text: 'Approve', value: 'Approve', icon: <IconCircleCheck style={iconStyle} size={24} /> },
    ];

    const getActionText = (tab: string) => {
        return leaveObject.find(action => action.tab === tab)?.text;
    };

    const getActionValue = (tab: string) => {
        return leaveObject.find(action => action.tab === tab)?.value;
    };

    const getActionIcon = (tab: string) => {
        return leaveObject.find(action => action.tab === tab)?.icon;
    };

    return (
        <div className=' flex flex-col' >
            <div className="flex flex-col sm:flex-row justify-between pb-4 sm:pb-2">
                <Text size="md" style={{ color: '#559CDA' }} className="font-semibold text-2xl p-2 text-center sm:text-start">
                    Leave
                </Text>
                <div className="flex justify-between items-center gap-2 sm:gap-6 self-center">
                    <Button h={36} onClick={() => { SET_ACTION(getActionValue(ACTIVE_TAB) ?? '') }} leftSection={
                        <div className="">
                            {getActionIcon(ACTIVE_TAB)}
                        </div>
                    } variant="filled" size="md" radius="md" fw={500}>
                        {getActionText(ACTIVE_TAB)}
                    </Button>
                </div>
            </div>
            <Filter filterOpen={() => SET_ACTION('FILTER')} />
        </div>
    );
}