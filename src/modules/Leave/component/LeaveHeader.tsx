import { IconCircleCheck, IconFolderPlus, IconFilePlus } from "@tabler/icons-react";
import 'mantine-datatable/styles.layer.css';
import { LeaveStore } from "@/modules/Leave/LeaveStore";
import { Header, Filter } from "@shared/template";

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
            <div className="flex flex-col sm:flex-row justify-between pb-4  sm:pb-2">
                <Header
                    title="Leave"
                    buttonLabel={getActionText(ACTIVE_TAB)}
                    buttonIcon=  {getActionIcon(ACTIVE_TAB)}
                    buttonClick={() => { SET_ACTION(getActionValue(ACTIVE_TAB) ?? '') }}
                />
            </div>
            <Filter filterOpen={()=>SET_ACTION('FILTER')} />
        </div>
    );
}