import { Box } from '@mui/material'
import SideBar from 'components/SideBar/Sidebar'
import React from 'react'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Chart from '../Charts/chart';
import DynamicCard from 'components/DynamicCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import "./Home.css"

export default function Home() {
    return (
        <>
            <Box height={75} />
            <Box display={"flex"} >
                <SideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Stack spacing={2} direction={"row"} >
                                <Card sx={{ minWidth: 100 + "%", }} >
                                    <CardContent className='gradient'>
                                        <DynamicCard />
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Grid>
                        <Grid item xs={4}>
                            <Stack spacing={2} direction={"column"} >
                                <Card sx={{ maxWidth: 345 }} className='gradient'>
                                    <CardContent>
                                        <Stack spacing={2} direction={"row"}>
                                            <div className='iconstyle'>
                                                < ShoppingBagIcon sx={{ color: "black" }} />
                                            </div>
                                            <div className='paddingall'>
                                                <span >
                                                    $ 200
                                                </span>
                                            </div>
                                        </Stack>
                                    </CardContent>
                                </Card>
                                <Card sx={{ maxWidth: 345 }} className='gradient'>
                                    <CardContent>
                                        <Stack spacing={2} direction={"row"}>
                                            <div className='iconstyle'>
                                                < ShoppingBagIcon sx={{ color: "black" }} />
                                            </div>
                                            <div className='paddingall'>
                                                <span >
                                                    $ 200
                                                </span>
                                            </div>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Stack>

                        </Grid>

                    </Grid>
                    <Box height={20} />
                    <Grid container spacing={2}>
                        <Grid item xs={8}>

                            <Card className='gradient' sx={{ display: "flex", justifyContent: "center", maxWidth: 120 + "vh", height: 75 + "vh", padding: 5 + "px", marginTop: 2 + "px" }}>
                                <Chart />
                            </Card>

                        </Grid>
                        <Grid item xs={4}>

                            <Card sx={{ maxWidth: 345 }}>

                            </Card>

                        </Grid>

                    </Grid>
                </Box>
            </Box>
        </>
    )
}
