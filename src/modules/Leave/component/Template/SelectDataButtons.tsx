import 'mantine-datatable/styles.layer.css';
import { LeaveStore } from "../../LeaveStore";
import { Autocomplete, Button, Divider, Modal, Select, Textarea, TextInput } from "@mantine/core";
import { Text } from "@mantine/core";
import { IconCalendarMonth, IconCaretDown, IconCloudUpload, IconFilePlus, IconMail } from '@tabler/icons-react';
import { DatePicker, DatePickerInput } from '@mantine/dates';
import { useEffect, useState } from 'react';
import '@mantine/dates/styles.css';
import { ChevronDown } from 'lucide-react';
import { Image, useMatches } from '@mantine/core';

export default function SelectDataButtons() {


    const { ACTION, SELECTED_DATA, SET_ALERT, SET_SELECTED_DATA, ACTIVE_TAB } = LeaveStore();

    return (
        <>
            {
                ACTIVE_TAB == 'list' && SELECTED_DATA.status != 'Cancelled' &&
                (<div className='w-2/3 md:w-1/3 flex gap-2 self-end'>
                    <Button className='w-1/2 rounded-md' variant='outline' onClick={() => { SET_SELECTED_DATA({}); SET_ALERT('RequestCancelled') }}>Cancel</Button>
                    <Button variant="transparent" className="w-1/2 rounded-md text-white border-none  br-gradient" onClick={() => { SET_SELECTED_DATA({}); SET_ALERT('RequestUpdated') }}>Update</Button>
                </div>)
            }
            {
                ACTIVE_TAB == 'review' && SELECTED_DATA.status != 'Cancelled' && SELECTED_DATA.status != 'Reviewed' &&
                (<div className='w-2/3 md:w-1/3 flex gap-2 self-end'>
                    <Button className='w-1/2 rounded-md' variant='outline' onClick={() => { SET_SELECTED_DATA({}); SET_ALERT('RequestRejected'); }}>Reject</Button>
                    <Button variant="transparent" className="w-1/2 rounded-md text-white border-none  br-gradient" onClick={() => { SET_SELECTED_DATA({}); SET_ALERT('EndorsementSuccess') }}>Endorse</Button>
                </div>)
            }
            {
                ACTIVE_TAB == 'approve' && SELECTED_DATA.status != 'Cancelled' && SELECTED_DATA.status != 'Approved' &&
                (<div className='w-2/3 md:w-1/3 flex gap-2 self-end'>
                    <Button className='w-1/2 rounded-md' variant='outline' onClick={() => { SET_SELECTED_DATA({}); SET_ALERT('RequestRejected'); }}>Reject</Button>
                    <Button variant="transparent" className="w-1/2 rounded-md text-white border-none  br-gradient" onClick={() => { SET_SELECTED_DATA({}); SET_ALERT('RequestApproved') }}>Approve</Button>
                </div>)
            }
        </>
    );
}