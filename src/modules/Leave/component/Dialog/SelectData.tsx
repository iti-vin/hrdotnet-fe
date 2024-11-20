import 'mantine-datatable/styles.layer.css';
import { LeaveStore } from "../../LeaveStore";
import { Divider, Modal, Popover, Textarea, TextInput } from "@mantine/core";
import { Text } from "@mantine/core";
import { IconCopy, IconDownload, IconFilePlus, IconFileUpload, IconX } from '@tabler/icons-react';
import { DatePickerInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import '@mantine/dates/styles.css';
import FilingBreakdown from "@/modules/Leave/component/Table/FilingBreakdown";
import { useMatches } from '@mantine/core';
import SelectDataButtons from '@/modules/Leave/component/Template/SelectDataButtons'
import { useDisclosure } from '@mantine/hooks';

export default function SelectData() {

    const [openedExport, { close: closeExport, open: openExport }] = useDisclosure(false);
    const [openedCopy, { close: closeCopy, open: openCopy }] = useDisclosure(false);

    const { SELECTED_DATA, SET_SELECTED_DATA } = LeaveStore();
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
            // setIsReadOnly(SELECTED_DATA.status == 'Cancelled' || SELECTED_DATA.status == 'Approved' || SELECTED_DATA.status == 'Filed')
        }
    }, [SELECTED_DATA]);

    const modalSize = useMatches({
        base: '100%',
        lg: '70%',
    });

    const [isReadOnly, setIsReadOnly] = useState(true)

    return (
        <Modal opened={Object.keys(SELECTED_DATA).length !== 0} onClose={() => SET_SELECTED_DATA({})} withCloseButton={false} styles={{ title: { color: '#559CDA', fontSize: 22, fontWeight: 600 } }} radius="md" centered size={modalSize} padding={30}>
            <div className='flex justify-between'>
                <Text fw={600} fz={22} c="#559CDA">
                    {'Leave Request Details'}
                </Text>
                <div className='flex gap-2'>

                    <Popover width={200} position="bottom" withArrow shadow="md" opened={openedCopy}>
                        <Popover.Target>
                            <IconCopy onMouseEnter={openCopy} onMouseLeave={closeCopy}
                                className="cursor-pointer"
                                size={30}
                                color="gray"
                            />
                        </Popover.Target>
                        <Popover.Dropdown style={{ pointerEvents: 'none' }}>
                            <Text size="sm">Copy</Text>
                        </Popover.Dropdown>
                    </Popover>

                    <Popover width={200} position="bottom" withArrow shadow="md" opened={openedExport}>
                        <Popover.Target>
                            <IconFileUpload onMouseEnter={openExport} onMouseLeave={closeExport}
                                className="cursor-pointer"
                                size={30}
                                color="gray"
                            />
                        </Popover.Target>
                        <Popover.Dropdown style={{ pointerEvents: 'none' }}>
                            <Text size="sm">Export</Text>
                        </Popover.Dropdown>
                    </Popover>

                    <IconX
                        className="cursor-pointer"
                        onClick={() => SET_SELECTED_DATA({})}
                        size={30}
                        color="gray"
                    />
                </div>
            </div>
            <div className='flex flex-col gap-8 mt-6' style={{ color: '#6D6D6D' }}>
                <Divider size="xs" color='#6D6D6D' />
                <div className='flex flex-col md:flex-row gap-6'>

                    <div className='w-full md:w-1/2 flex flex-col gap-4  border-solid border-0.5 border-sky-500 p-4 rounded-lg'>
                        <Text style={{ color: '#559CDA' }} className='font-bold'>General Information</Text>

                        <div>
                            <Text className='font-semibold'>Leave Type</Text>
                            <TextInput
                                disabled={isReadOnly}
                                size="lg"
                                radius="md"
                                // data={['Vacation Leave', 'Sick Leave', 'Emergency Leave', 'Birthday Leave']}
                                placeholder="Select Leave Type"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <Text className='font-semibold'>Leave Option</Text>
                            <TextInput
                                disabled={isReadOnly}
                                size="lg"
                                radius="md"
                                // data={['Vacation Leave', 'Sick Leave', 'Emergency Leave', 'Birthday Leave']}
                                placeholder="Select Leave Option"
                                className="w-full"
                            />
                        </div>

                        <div className='flex flex-col gap-8  sm:gap-8'>

                            <div className='flex flex-col md:flex-row gap-2'>
                                <div className="w-full">
                                    <Text className='font-semibold'>Start Date</Text>
                                    <DatePickerInput
                                        disabled={isReadOnly}
                                        radius="md"
                                        size="lg"
                                        placeholder="Start Date"
                                        value={startDate}
                                        onChange={setStartDate}
                                    />
                                </div>

                                <div className="w-full">
                                    <Text className='font-semibold'>End Date</Text>
                                    <DatePickerInput
                                        disabled={isReadOnly}
                                        radius="md"
                                        size="lg"
                                        placeholder="End Date"
                                        value={startDate}
                                        onChange={setStartDate}
                                    />
                                </div>
                            </div>

                            <div className="w-full">
                                <Text className='font-semibold'>Duration (Days)</Text>
                                <TextInput
                                    disabled={isReadOnly}
                                    radius="md"
                                    size="lg"
                                    placeholder="Total Number of Days"

                                />
                            </div>

                            <div className="w-full">
                                <Text className='font-semibold'>Reference Number</Text>
                                <TextInput
                                    disabled={isReadOnly}
                                    radius="md"
                                    size="lg"
                                    placeholder="00-0000-0000-0000"

                                />
                            </div>

                        </div>
                    </div>

                    <div className='w-full md:w-1/2 flex flex-col gap-2 border-solid border-0.5 border-sky-500 p-4 rounded-lg'>
                        <Text style={{ color: '#559CDA' }} className='font-bold'>Detailed Information</Text>
                        <div className='mt-2'>
                            <Text className='font-semibold'>Status</Text>
                            <div style={{ background: getColor() }} className='w-full text-center p-4 rounded-md text-white'>
                                <Text className=''>{SELECTED_DATA.status}</Text>
                            </div>
                        </div>

                        <div className='flex flex-col md:flex-row justify-between gap-4'>

                            <div className='flex flex-col w-full md:w-1/2'>
                                <Text className='font-semibold'>Document No.</Text>
                                <TextInput
                                    disabled={isReadOnly}
                                    radius="md"
                                    size="lg"
                                    placeholder="00000000"
                                />
                            </div>


                            <div className='flex flex-col w-full md:w-1/2'>
                                <Text className='font-semibold'>Transaction Date</Text>
                                <DatePickerInput
                                    disabled={isReadOnly}
                                    radius="md"
                                    size="lg"
                                    placeholder="mm/dd/yyyy"
                                    value={startDate}
                                    onChange={setStartDate}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <Text className='font-semibold'>Endorsement Information</Text>
                            <Textarea
                                disabled={isReadOnly}
                                size="lg"
                                radius="md"
                                placeholder="Endorsed by Jane Smith on October 25, 2024 at 6:43 PM."
                                className="w-full"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <Text className='font-semibold'>Approval Information</Text>
                            <Textarea
                                disabled={isReadOnly}
                                size="lg"
                                radius="md"
                                placeholder="Approved by Jane Smith on October 25, 2024 at 6:43 PM (Batch Approval)"
                                className="w-full"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <Text className='font-semibold'>Cancellation Information</Text>
                            <Textarea
                                disabled={isReadOnly}
                                size="lg"
                                radius="md"
                                placeholder="No Information"
                                className="w-full"
                            />
                        </div>

                    </div>


                </div>

                <div className='flex flex-col gap-2 border-solid border-0.5 border-sky-500 p-4 rounded-lg'>
                    <Text style={{ color: '#559CDA' }} className='font-bold'>Reason </Text>
                    <Textarea
                        disabled={isReadOnly}
                        size="xl"
                        radius="md"
                        placeholder="Briefly state the reasons for filing leave."
                    />
                </div>

                <div className='flex flex-col gap-5 border-solid border-0.5 border-sky-500 p-4 rounded-lg'>
                    <Text style={{ color: '#559CDA' }} className='font-bold '>Attachment </Text>
                    <div className='border-dashed border-0.5 border-sky-500 p-4 rounded-lg flex flex-col  items-center' style={{ color: '#6D6D6D', background: '#ced4da', opacity: '0.4' }}>
                        {/* {SELECTED_DATA.status == 'Filed' && (
                            <>
                                <IconCloudUpload size={55} color='#559CDA' />
                                <div className='flex flex-col items-center mt-3'>
                                    <div className='flex'>
                                        <IconFilePlus />
                                        <Text>File: attachment.pdf Size: 20 MB </Text>
                                    </div>
                                    <Text>Replace Existing  <span style={{ color: '#559CDA', textDecoration: 'underline', cursor: 'pointer' }}>file.</span></Text>
                                    <Text>Supported Formats: PDF, DOC</Text>
                                    <Text>Max File: 25MB</Text>
                                </div>
                            </>
                        )} */}

                        {/* {SELECTED_DATA.status != 'Filed' && (<div className='flex items-center'> */}
                        <div className='flex items-center' >

                            <IconFilePlus />
                            <Text>File: attachment.pdf Size: 20 MB </Text>
                        </div>
                        {/* </div>)} */}
                    </div>
                </div>

                <div className='flex flex-col md:flex-row  gap-4'>

                    {SELECTED_DATA.status != 'Filed' && isMultipleDayLeave && (<div className='flex flex-col w-full md:w-2/3 gap-2 border-solid border-0.5 border-sky-500 p-4 rounded-lg'>
                        <Text style={{ color: '#559CDA' }} className='font-bold'>Filing Breakdown</Text>
                        <FilingBreakdown />
                    </div>)}


                    <div className='flex flex-col gap-2  w-full border-solid border-0.5 border-sky-500 p-4 rounded-lg'>
                        <Text style={{ color: '#559CDA' }} className='font-bold'>Edit Log</Text>
                        <Textarea
                            styles={{ input: { height: '12.5rem' } }}
                            variant="filled"
                            // disabled={isReadOnly}
                            size="xl"
                            radius="md"
                            placeholder="Date of Change  - Employee name changed the Application date from mm/dd/yyyy to mm/dd/yyyy."
                        />
                    </div>

                </div>
                <SelectDataButtons />
            </div>
        </Modal>
    );
}