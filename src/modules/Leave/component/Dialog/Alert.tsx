import 'mantine-datatable/styles.layer.css';
import { LeaveStore } from "../../LeaveStore";
import { Divider, Modal } from "@mantine/core";
import { Text } from "@mantine/core";
import '@mantine/dates/styles.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { useEffect } from 'react';
import { FileCheck } from 'lucide-react';
import { IconFileExcel } from '@tabler/icons-react';
import { useMatches } from '@mantine/core';

enum AlertType {
    RequestSubmitted = 'RequestSubmitted',
    EndorsementSuccess = 'EndorsementSuccess',
    RequestApproved = 'RequestApproved',
    RequestCancelled = 'RequestCancelled',
    RequestRejected = 'RequestRejected',
    RequestUpdated = 'RequestUpdated',
}

export default function Alert() {
    const { ALERT, SET_ALERT } = LeaveStore();

    useEffect(() => {
        if (Object.values(AlertType).includes(ALERT as AlertType)) {
            const timer = setTimeout(() => {
                SET_ALERT('');
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [ALERT, SET_ALERT]);

    const modalSize = useMatches({
        base: '100%',
        lg: '30%',
    });

    return (
        <>
            <Modal opened={ALERT === AlertType.RequestSubmitted} withCloseButton={false} onClose={() => SET_ALERT('')} styles={{ title: { color: '#559CDA', fontSize: 22, fontWeight: 600 } }} title={'Request Submitted'} centered size={modalSize} padding={30}>
                <Divider size="xs" color='#6D6D6D' />
                <div className='flex flex-col mt-6 items-center gap-4' style={{ color: '#6D6D6D' }}>
                    <FileCheck color="#559cda" size={80} />
                    <Text>The application has been successfully submitted.</Text>
                </div>
            </Modal>

            <Modal opened={ALERT === AlertType.EndorsementSuccess} withCloseButton={false} onClose={() => SET_ALERT('')} styles={{ title: { color: '#559CDA', fontSize: 22, fontWeight: 600 } }} title={'Endorsement Success'} centered size={modalSize} padding={30}>
                <Divider size="xs" color='#6D6D6D' />
                <div className='flex flex-col mt-6 items-center gap-4' style={{ color: '#6D6D6D' }}>
                    <FileCheck color="#559cda" size={80} />
                    <Text>The request has been successfully endorsed to the approver.</Text>
                </div>
            </Modal>

            <Modal opened={ALERT === AlertType.RequestApproved} withCloseButton={false} onClose={() => SET_ALERT('')} styles={{ title: { color: '#559CDA', fontSize: 22, fontWeight: 600 } }} title={'Request Approved'} centered size={modalSize} padding={30}>
                <Divider size="xs" color='#6D6D6D' />
                <div className='flex flex-col mt-6 items-center gap-4' style={{ color: '#6D6D6D' }}>
                    <FileCheck color="#559cda" size={80} />
                    <Text>The request has been successfully approved.</Text>
                </div>
            </Modal>

            <Modal opened={ALERT === AlertType.RequestCancelled} withCloseButton={false} onClose={() => SET_ALERT('')} styles={{ title: { color: '#559CDA', fontSize: 22, fontWeight: 600 } }} title={'Request Cancelled'} centered size={modalSize} padding={30}>
                <Divider size="xs" color='#6D6D6D' />
                <div className='flex flex-col mt-6 items-center gap-4' style={{ color: '#6D6D6D' }}>
                    <IconFileExcel color="#559cda" size={80} />
                    <Text>The request has been cancelled.</Text>
                </div>
            </Modal>

            <Modal opened={ALERT === AlertType.RequestRejected} withCloseButton={false} onClose={() => SET_ALERT('')} styles={{ title: { color: '#559CDA', fontSize: 22, fontWeight: 600 } }} title={'Request Rejected'} centered size={modalSize} padding={30}>
                <Divider size="xs" color='#6D6D6D' />
                <div className='flex flex-col mt-6 items-center gap-4' style={{ color: '#6D6D6D' }}>
                    <IconFileExcel color="#559cda" size={80} />
                    <Text>The request has been rejected.</Text>
                </div>
            </Modal>

            <Modal opened={ALERT === AlertType.RequestUpdated} withCloseButton={false} onClose={() => SET_ALERT('')} styles={{ title: { color: '#559CDA', fontSize: 22, fontWeight: 600 } }} title={'Request Updated'} centered size={modalSize} padding={30}>
                <Divider size="xs" color='#6D6D6D' />
                <div className='flex flex-col mt-6 items-center gap-4' style={{ color: '#6D6D6D' }}>
                    <FileCheck color="#559cda" size={80} />
                    <Text>The request has been updated.</Text>
                </div>
            </Modal>
        </>
    );
}