import 'mantine-datatable/styles.layer.css';
import { LeaveStore } from "../../LeaveStore";
import { Autocomplete, Button, Divider, Modal, Select, Textarea, TextInput } from "@mantine/core";
import { Text } from "@mantine/core";
import { IconCalendarMonth, IconCaretDown, IconCloudUpload, IconFilePlus, IconMail } from '@tabler/icons-react';
import { DatePicker, DatePickerInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import '@mantine/dates/styles.css';
import { ChevronDown } from 'lucide-react';
import FilingBreakdown from "@/modules/Leave/component/Table/FilingBreakdown";
import Dropzone from '@shared/template/Dropzone';
import { Image, useMatches } from '@mantine/core';
import SelectDataButtons from '@/modules/Leave/component/Template/SelectDataButtons'

export default function SelectData() {


    const { ACTION, SELECTED_DATA, SET_ACTION, SET_SELECTED_DATA } = LeaveStore();
    const [startDate, setStartDate] = useState<Date | null>(null);
    const statusColors = [
        { status: 'Reviewed', color: '#FF7800' },
        { status: 'Approved', color: '#1E8449' },
        { status: 'Cancelled', color: '#FF4B34' },
        { status: 'Filed', color: '#9B51E0' },
    ];

    const getColor = () => {
        const color = statusColors.find((item) => (item.status === SELECTED_DATA.status));
        return color?.color
    }

    const [isMultipleDayLeave, setIsMultipleDayLeave] = useState(false);

    useEffect(() => {
        if (SELECTED_DATA != '') {
            if (SELECTED_DATA.leaveFrom && SELECTED_DATA.leaveTo) {
                const leaveFromDate = new Date(SELECTED_DATA.leaveFrom);
                const leaveToDate = new Date(SELECTED_DATA.leaveTo);

                // Strip the time component for date-only comparison
                leaveFromDate.setHours(0, 0, 0, 0);
                leaveToDate.setHours(0, 0, 0, 0);

                // Compare dates to check if leave spans multiple days
                setIsMultipleDayLeave(leaveFromDate.getTime() !== leaveToDate.getTime());
            } else {
                console.log('Either leaveFrom or leaveTo is missing.');
            }
            setIsReadOnly(SELECTED_DATA.status == 'Cancelled' || SELECTED_DATA.status == 'Approved')
        }
    }, [SELECTED_DATA]);

    const modalSize = useMatches({
        base: '100%',
        lg: '70%',
    });

    const [isReadOnly, setIsReadOnly] = useState(false)

    return (
        <Modal zIndex={999999} opened={Object.keys(SELECTED_DATA).length !== 0} onClose={() => SET_SELECTED_DATA({})} styles={{ title: { color: '#559CDA', fontSize: 22, fontWeight: 600 } }} title={'Leave Request Details'} radius="md" centered size={modalSize} padding={30}>
            <div className='flex flex-col gap-8 ' style={{ color: '#6D6D6D' }}>
                <Divider size="xs" color='#6D6D6D' />
                <div className='flex flex-col md:flex-row gap-6'>



                    <div className='w-full md:w-1/2 flex flex-col gap-4  border-solid border-0.5 border-sky-500 p-4 rounded-lg'>
                        <Text style={{ color: '#559CDA' }} className='font-bold'>General Information</Text>
                        <Select
                            disabled={isReadOnly}
                            withAsterisk
                            size="lg"
                            radius="md"
                            label="Leave Type"
                            data={['Vacation Leave', 'Sick Leave', 'Emergency Leave', 'Birthday Leave']}
                            placeholder="Select Leave Type"
                            className="w-full"
                        />
                        <Select
                            disabled={isReadOnly}
                            withAsterisk
                            size="lg"
                            radius="md"
                            label="Leave Option"
                            data={['Vacation Leave', 'Sick Leave', 'Emergency Leave', 'Birthday Leave']}
                            placeholder="Select Leave Option"
                            className="w-full"
                        />
                        <div className='flex flex-col md:flex-row gap-2'>


                            <DatePickerInput
                                disabled={isReadOnly}
                                withAsterisk
                                radius="md"
                                size="lg"
                                label="Start Date"
                                placeholder="Start Date"
                                value={startDate}
                                onChange={setStartDate}
                                className="w-full"
                                rightSection={<IconCalendarMonth size={20} />}
                            />

                            <DatePickerInput
                                disabled={isReadOnly}
                                withAsterisk
                                radius="md"
                                size="lg"
                                label="End Date"
                                placeholder="End Date"
                                value={startDate}
                                onChange={setStartDate}
                                className="w-full"
                                rightSection={<IconCalendarMonth size={20} />}
                            />

                        </div>

                        <TextInput
                            disabled={isReadOnly}
                            radius="md"
                            size="lg"
                            withAsterisk
                            label="Duration (Days)"
                            placeholder="Total Number of Days"
                            className="w-full"
                        />

                        <TextInput
                            disabled={isReadOnly}
                            radius="md"
                            size="lg"
                            label="Reference Number"
                            placeholder="00-0000-0000-0000"
                            className="w-full"
                        />
                    </div>

                    <div className='w-full md:w-1/2 flex flex-col gap-2 border-solid border-0.5 border-sky-500 p-4 rounded-lg'>
                        <Text style={{ color: '#559CDA' }} className='font-bold'>Detailed Information</Text>
                        <div className='mt-2'>
                            <Text>Status</Text>

                            {/* <div style={{ background: `#9B51E0` }} className='w-full text-center p-2 rounded-md text-white'> */}
                            <div style={{ background: getColor() }} className='w-full text-center p-4 rounded-md text-white'>
                                <Text className='opacity-75'>{SELECTED_DATA.status}</Text>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row justify-between gap-4'>
                            <TextInput
                                disabled={isReadOnly}
                                radius="md"
                                size="lg"
                                label="Document No. "
                                placeholder="00000000"
                                className="w-full md:w-1/2"
                            />

                            <DatePickerInput
                                disabled={isReadOnly}
                                radius="md"
                                size="lg"
                                label="Transaction Date"
                                placeholder="mm/dd/yyyy"
                                value={startDate}
                                onChange={setStartDate}
                                className="w-full md:w-1/2"
                            // rightSection={<IconCalendarMonth size={20} />}
                            />
                        </div>
                        <div className='flex flex-col md:flex-row justify-between gap-8'>
                            <Textarea
                                disabled={isReadOnly}
                                size="md"
                                radius="md"
                                label="Endorsement Information"
                                placeholder="Endorsed by Jane Smith on October 25, 2024 at 6:43 PM."
                                className="w-full"
                            />
                        </div>
                        <div className='flex flex-col md:flex-row justify-between gap-8'>
                            <Textarea
                                disabled={isReadOnly}
                                size="md"
                                radius="md"
                                label="Approval Information"
                                placeholder="Approved by Jane Smith on October 25, 2024 at 6:43 PM (Batch Approval)"
                                className="w-full"
                            />
                        </div>
                        <div className='flex flex-col md:flex-row justify-between gap-8'>
                            <Textarea
                                disabled={isReadOnly}
                                size="md"
                                radius="md"
                                label="Cancellation Information"
                                placeholder="No Information"
                                className="w-full"
                            />
                        </div>
                    </div>


                </div>

                <div className='flex flex-col gap-2 border-solid border-0.5 border-sky-500 p-4 rounded-lg'>
                    <Text style={{ color: '#559CDA' }} className='font-bold'>Reason <span className="text-red-400 font-semibold">*</span></Text>
                    <Textarea
                        disabled={isReadOnly}
                        size="xl"
                        radius="lg"
                        placeholder="Briefly state the reasons for filing leave."
                    />
                </div>

                <div className='flex flex-col gap-5 border-solid border-0.5 border-sky-500 p-4 rounded-lg'>
                    <Text style={{ color: '#559CDA' }} className='font-bold'>Attachment <span className="text-red-400 font-semibold">*</span></Text>
                    <div className='border-dashed border-0.5 border-sky-500 p-4 rounded-lg flex flex-col  items-center' style={{ color: '#6D6D6D' }}>
                        {SELECTED_DATA.status == 'Filed' && (
                            <>
                                <IconCloudUpload size={55} color='#559CDA' />
                                <div className='flex flex-col items-center mt-3'>
                                    <div className='flex'>
                                        <IconFilePlus />
                                        <Text>File: attachment.pdf Size: 20 MB </Text>
                                    </div>
                                    <Text>Replace Existing  File</Text>
                                    <Text>Supported Formats: PDF, DOC</Text>
                                    <Text>Max File: 25MB</Text>
                                </div>
                            </>
                        )}

                        {SELECTED_DATA.status != 'Filed' && (<div className='flex items-center'>
                            <IconFilePlus />
                            <Text>File: attachment.pdf Size: 20 MB </Text>
                        </div>)}
                    </div>
                </div>

                <div className='flex flex-col md:flex-row  gap-4'>

                    {SELECTED_DATA.status != 'Filed' && isMultipleDayLeave && (<div className='flex flex-col w-full md:w-2/3 gap-2 border-solid border-0.5 border-sky-500 p-4 rounded-lg'>
                        <Text style={{ color: '#559CDA' }} className='font-bold'>Filing Breakdown</Text>
                        <FilingBreakdown />
                    </div>)}


                    <div className='flex flex-col gap-2 w-full border-solid border-0.5 border-sky-500 p-4 rounded-lg'>
                        <Text style={{ color: '#559CDA' }} className='font-bold'>Edit Log</Text>
                        <Textarea
                            disabled={isReadOnly}
                            variant="filled"
                            size="xl"
                            radius="lg"
                            placeholder="Date of Change  - Employee name changed the Application date from mm/dd/yyyy to mm/dd/yyyy."
                        />
                    </div>

                </div>

                <SelectDataButtons />
            </div>
        </Modal>
    );
}