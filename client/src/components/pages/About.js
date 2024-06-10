import { Box } from '@mui/material'
import SideBar from 'components/SideBar/Sidebar'
import React from 'react'

export default function About() {
    return (
        <>
            <Box height={40} />
            <Box display={"flex"}>
                <SideBar />
                <div><h1>About</h1></div>
            </Box>
        </>
    )
}
