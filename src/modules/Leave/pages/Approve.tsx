import React, { useEffect, useState } from "react";
import { Stack, Text } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { IconCheck, IconCircleCheck, IconFileText, IconFilter, IconFilterSearch } from "@tabler/icons-react";
import 'mantine-datatable/styles.layer.css';
import { Button } from '@mantine/core';
import LeaveHeader from "@/modules/Leave/component/LeaveHeader";
import LeaveTable from "@/modules/Leave/component/LeaveTable";
import { LeaveStore, } from "@/modules/Leave/LeaveStore";

export default function Approve() {


    const { SET_ACTIVE_TAB } = LeaveStore();


    useEffect(() => {
        SET_ACTIVE_TAB('approve')
    }, [])


    return (
        <div className="bg-white m-4  -mb-16 h-screen-85 overflow-y-hidden -z-10 p-8 rounded-lg bottom-0">
            <Stack className="h-full w-full">
                <LeaveHeader />
                <LeaveTable />
            </Stack>
        </div>
    );
}