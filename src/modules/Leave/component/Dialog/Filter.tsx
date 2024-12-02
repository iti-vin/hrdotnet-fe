import 'mantine-datatable/styles.layer.css';
import { LeaveStore } from "../../LeaveStore";
import { Autocomplete, Button, Divider, Drawer, Modal, Select, TextInput } from "@mantine/core";
import { Text } from "@mantine/core";
import { IconCalendarMonth, IconCaretDown, IconCaretDownFilled, IconMail, IconSearch, IconX } from '@tabler/icons-react';
import { DatePicker, DatePickerInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import '@mantine/dates/styles.css';
import { ChevronDown } from 'lucide-react';
import { MultiSelect } from '@mantine/core';
import { useMediaQuery } from "@mantine/hooks";
export default function Filter() {


    const { ACTION, ACTIVE_TAB, SET_ACTION } = LeaveStore();


    const [startDate, setStartDate] = useState<Date | null>(null);
    const [leaveFilter, setLeaveFilter] = useState<string[]>([]);
    const [statusFilter, setStatusFilter] = useState<string[]>([]);
    const leavePlaceHolder = leaveFilter.length > 0 ? '' : 'Leave Type'
    const statusPlaceHolder = statusFilter.length > 0 ? '' : 'Status'

    useEffect(() => {
        // alert(ACTIVE_TAB)
    })
    const isMobile = useMediaQuery("(max-width: 425px)");
    return (
        <Drawer size={isMobile ? "100%" : "xs"} overlayProps={{ backgroundOpacity: 0, blur: 0 }}  opened={ACTION == 'FILTER'} onClose={() => SET_ACTION('')} radius="md" styles={{ title: { color: '#559CDA', fontSize: 22, fontWeight: 600 } }} title={'Filter By'} position='right' >
  
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-2'>
                    <Divider size="xs" color='#6D6D6D' />
                    <TextInput
                        styles={{ label: { color: '#6D6D6D', fontWeight: 500 } }}
                        radius="md"
                        size="md"
                        label="Document No. "
                        placeholder="Document No"
                    />
                </div>
                {ACTIVE_TAB != 'list' && (<>
                    <div className='flex flex-col gap-2'>
                        <Divider size="xs" color='#6D6D6D' />
                        <TextInput
                            styles={{ label: { color: '#6D6D6D', fontWeight: 500 } }}
                            radius="md"
                            size="md"
                            label="Branch Code"
                            placeholder="Branch Code"
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Divider size="xs" color='#6D6D6D' />
                        <TextInput
                            styles={{ label: { color: '#6D6D6D', fontWeight: 500 } }}
                            radius="md"
                            size="md"
                            label="Employee Code"
                            placeholder="Employee Code"
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <Divider size="xs" color='#6D6D6D' />
                        <TextInput
                            styles={{ label: { color: '#6D6D6D', fontWeight: 500 } }}
                            radius="md"
                            size="md"
                            label="Employee Name"
                            placeholder="Employee Name"
                        />
                    </div>
                </>)}
                <div className='flex flex-col gap-2'>
                    <Divider size="xs" className='opacity-50' />
                    <div>
                        <MultiSelect
                            value={leaveFilter}
                            onChange={setLeaveFilter}
                            searchable
                            clearable
                            radius="md"
                            size="md"
                            label="Leave Type. "
                            placeholder={leavePlaceHolder}
                            data={['Vacation Leave', 'Sick Leave', 'Emergency']}
                            styles={{ label: { color: '#6D6D6D', fontWeight: 500 } }}
                            rightSection={<IconCaretDownFilled size={18}/>}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <Divider size="xs" className='opacity-50' />
                    <Text style={{ color: '#6D6D6D', fontWeight: 500 }}>Leave Range</Text>
                    <DatePickerInput
                        radius="md"
                        size="md"
                        label="From"
                        placeholder="Start Date"
                        value={startDate}
                        onChange={setStartDate}
                        className="w-full"
                        rightSection={<IconCalendarMonth size={20} />}
                        styles={{ label: { color: '#6D6D6D', fontWeight: 500 } }}
                    />
                    <DatePickerInput
                        radius="md"
                        size="md"
                        label="To"
                        placeholder="End Date"
                        value={startDate}
                        onChange={setStartDate}
                        className="w-full"
                        rightSection={<IconCalendarMonth size={20} />}
                        styles={{ label: { color: '#6D6D6D', fontWeight: 500 } }}
                    />
                </div>
                <div className='flex flex-col gap-2'>
                    <Divider size="xs" className='opacity-50' />
                    <Text style={{ color: '#6D6D6D', fontWeight: 500 }}>Transaction Date</Text>
                    <DatePickerInput
                        radius="md"
                        size="md"
                        label="From"
                        placeholder="Start Date"
                        value={startDate}
                        onChange={setStartDate}
                        className="w-full"
                        rightSection={<IconCalendarMonth size={20} />}
                        styles={{ label: { color: '#6D6D6D', fontWeight: 500 } }}
                    />
                    <DatePickerInput
                        radius="md"
                        size="md"
                        label="To"
                        placeholder="End Date"
                        value={startDate}
                        onChange={setStartDate}
                        className="w-full"
                        rightSection={<IconCalendarMonth size={20} />}
                        styles={{ label: { color: '#6D6D6D', fontWeight: 500 } }}
                    />
                </div>
                {ACTIVE_TAB != 'review' && (<div className='flex flex-col gap-2'>
                    <Divider size="xs" className='opacity-50' />
                    <TextInput
                        radius="md"
                        size="md"
                        label="Processed By"
                        placeholder="Processed By"
                        styles={{ label: { color: '#6D6D6D', fontWeight: 500 } }}
                    />
                </div>)}
                <div className='flex flex-col gap-2'>
                    <Divider size="xs" className='opacity-50' />
                    <div>
                        <MultiSelect
                            value={statusFilter}
                            onChange={setStatusFilter}
                            clearable
                            radius="md"
                            size="md"
                            label="Status"
                            placeholder={statusPlaceHolder}
                            data={['Filed', 'Approved', 'Cancelled', 'Reviewed']}
                            styles={{ label: { color: '#6D6D6D', fontWeight: 500 } }}
                            rightSection={<IconCaretDownFilled size={18}/>}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <div>
                        <div className='flex justify-end  gap-4'>
                            <Button
                                variant='outline'
                                className="w-2/6"
                                radius="md"
                                size="sm"
                            >CLEAR</Button>
                            <Button
                                className="w-2/6 border-none  br-gradient"
                                radius="md"
                                size="sm"
                            >FILTER</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Drawer >
    );
}