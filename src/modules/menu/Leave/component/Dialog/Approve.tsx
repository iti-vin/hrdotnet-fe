import 'mantine-datatable/styles.layer.css';
import { LeaveStore } from "../../LeaveStore";
import { Button, Divider, Modal } from "@mantine/core";
import { Text } from "@mantine/core";
import '@mantine/dates/styles.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { useMatches } from '@mantine/core';
export default function Approve() {

    const { ACTION, SET_ACTION, SET_ALERT } = LeaveStore();
    const modalSize = useMatches({
        base: '100%',
        lg: '30%',
    });

    return (
        <>
            <Modal opened={ACTION == 'Approve'} onClose={() => SET_ACTION('')} styles={{ title: { color: '#559CDA', fontSize: 22, fontWeight: 600 } }} title={'Approve Request?'} centered size={modalSize} padding={30}>
                <Divider size="xs" color='#6D6D6D' />
                <div className='flex flex-col mt-2' style={{ color: '#6D6D6D' }}>
                    <Text>10 Sick Leave</Text>
                    <Text>10 Vacation Leave</Text>
                    <Text>10 Emergency Leave</Text>
                    <Text>10 Bereveavement Leave</Text>
                    <Text>10 Leave without pay</Text>
                    <Button variant="transparent" className="w-2/4 md:w-1/4 rounded-md text-white border-none  br-gradient self-end mt-2" onClick={() => {
                        SET_ALERT('RequestApproved')
                        SET_ACTION('')
                    }}>APPROVE</Button>
                </div>
            </Modal>
        </>
    );
}