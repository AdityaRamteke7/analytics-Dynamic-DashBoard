import { Box } from '@mui/material'
import SideBar from 'components/SideBar/Sidebar'
import React from 'react'

export default function Setting() {
    return (
        <>
            <Box height={45} />
            <Box display={"flex"}>
                <SideBar />
                <div><h1>Setting</h1></div>
            </Box>
        </>
    )
}
