import 'mantine-datatable/styles.layer.css';
import { LeaveStore } from "../../LeaveStore";
import { Autocomplete, Button, Divider, Modal, Select, Textarea, TextInput } from "@mantine/core";
import { Text } from "@mantine/core";
import { IconCalendarMonth, IconCaretDown, IconCircleCheck, IconCloudUpload, IconFilePlus, IconHome, IconMail } from '@tabler/icons-react';
import { DatePicker, DatePickerInput } from '@mantine/dates';
import { useState } from 'react';
import '@mantine/dates/styles.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import { Carousel } from '@mantine/carousel';
import { Image, useMatches } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import Dropzone from '@shared/template/Dropzone'

export default function Add() {


    const { ACTION, SET_ACTION, SET_ALERT } = LeaveStore();
    const iconStyle = { width: 'rem(100)', height: 'rem(100)', stroke: '1.5', color: '#559CDA', };
    const matches = useMediaQuery('(min-width: 56.25em)');
    const sm2 = useMediaQuery('(min-width: 640px)');

    const leaveTypes = [
        { count: 6, label: "Vacation Leave" },
        { count: 3, label: "Sick Leave" },
        { count: 2, label: "Emergency Leave" },
        { count: 1, label: "Birthday Leave" },
        { count: 6, label: "Leave Without Pay", icon: <IconCircleCheck style={iconStyle} size={38} className='mb-2' /> },
        { count: 1, label: "SAL" },
        { count: 1, label: "EL" },
        { count: 1, label: "BDL" },
        { count: 1, label: "BDL2" },
    ];

    const slidesNum = useMatches({
        base: 1,
        xs: 2,
        sm: 3,
        md: 5,
    });

    const modalSize = useMatches({
        base: '100%',
        lg: '70%',
    });


    const [startDate, setStartDate] = useState<Date | null>(null);

    return (
        <Modal zIndex={999999} opened={ACTION == 'NewRequest'} onClose={() => SET_ACTION('')} styles={{ title: { color: '#559CDA', fontSize: 22, fontWeight: 600 } }} title={'New Request'} centered size={modalSize} padding={30}>
            <div className='flex flex-col gap-4' style={{ color: '#6D6D6D' }}>
                <Divider size="xs" color='#6D6D6D' />
                <div>
                    <Text>Select Available Leave Type</Text>

                    <Carousel
                        slideSize={{ base: '70%', xs: '50%', sm: '33.333%', md: '20%' }}
                        slideGap={{ base: 'sm', lg: 'xl' }}
                        slidesToScroll={slidesNum}
                    >
                        {leaveTypes.map((leave, index) => (
                            <Carousel.Slide key={index}>
                                <div className='h-28 w-full  flex flex-col  text-center justify-center items-center shadow-md shadow-blue-300 rounded-lg m-1' style={{ background: '#DEECFF' }}>

                                    {leave.label == 'Leave Without Pay' ?
                                        <>
                                            {leave.icon}
                                            <Text color="#559cda" >
                                                {leave.label}
                                            </Text>
                                        </>
                                        :
                                        <>
                                            <Text style={{ fontSize: '2.2rem' }} color="#559cda">
                                                {leave.count}
                                            </Text>
                                            <Text color="#559cda" >
                                                {leave.label}
                                            </Text>
                                        </>
                                    }

                                </div>
                            </Carousel.Slide>
                        ))}
                    </Carousel>


                </div>
                <div className='flex flex-col sm:flex-row gap-4 justify-between sm:gap-8'>
                    <Select
                        withAsterisk
                        size="md"
                        radius="md"
                        label="Leave Option"
                        data={['Vacation Leave', 'Sick Leave', 'Emergency Leave', 'Birthday Leave']}
                        placeholder="Select Leave Option"
                        className="w-full sm:w-1/2"
                    />
                    <Select
                        size="md"
                        radius="md"
                        label="Reference Number"
                        data={['Vacation Leave', 'Sick Leave', 'Emergency Leave', 'Birthday Leave']}
                        placeholder="Input Refence Number (if necessary)"
                        className="w-full sm:w-1/2"
                    />
                </div>
                <div className='flex flex-col sm:flex-row justify-between sm:gap-8'>
                    <DatePickerInput
                        size="md"
                        radius="md"
                        label="Duration"
                        placeholder="Start Date"
                        value={startDate}
                        onChange={setStartDate}
                        rightSection={<IconCalendarMonth size={20} />}
                        className="w-full sm:w-1/2"
                    />

                    <DatePickerInput
                        size="md"
                        radius="md"
                        label=" "
                        placeholder="End Date"
                        value={startDate}
                        onChange={setStartDate}
                        rightSection={<IconCalendarMonth size={20} />}
                        className="w-full sm:w-1/2"
                    />

                </div>
                <div className='flex flex-col gap-2'>
                    <Text >Reason <span className="text-red-400 font-semibold">*</span></Text>
                    <Textarea
                        size="xl"
                        radius="md"
                        placeholder="Briefly state the reasons for filing leave."
                    />
                </div>
                <div className='flex flex-col gap-2 rounded-lg'>
                    <Dropzone />
                </div>
                <Button onClick={() => {
                    SET_ALERT('RequestSubmitted')
                    SET_ACTION('')
                }}
                    className="w-2/4 sm:w-2/5 md:w-1/6  br-gradient self-end border-none"
                    radius="md"
                    size="md"
                >Submit</Button>
            </div>
        </Modal>
    );
}