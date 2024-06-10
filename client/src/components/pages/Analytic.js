import { Box, CardContent, Stack, Card } from '@mui/material'
import DataTable from '../Charts/DataTable';
import SideBar from 'components/SideBar/Sidebar'
import { useData } from 'contexts/dataContexts';
import Grid from '@mui/material/Grid';
import React, { useState, useEffect } from 'react'
import PieChart from 'components/Charts/pieChart';
import CountryChart from 'components/Charts/countryChart';
import CountryMap from 'components/Charts/CountryMap';
import "./Analytic.css"
export default function Analytic() {
    const [tableData, setTableData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const { data } = useData()

    useEffect(() => {
        setChartData(data);
    }, [data]);


    useEffect(() => {
        const adjustedData = data.map(item => ({
            ...item,
            region: item.region || 'N/A'
        }));
        setTableData(adjustedData);
    }, [data]);

    return (
        <>
            <Box height={75} />
            <Box display={"flex"}>
                <SideBar />
                <Box spacing={2} component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid item xs={8}>
                        <Grid item >
                            <Stack spacing={2} direction={"row"} >
                                <Card className='analyticcolor'>
                                    <CardContent >
                                        <Grid className='analyticcolor'>
                                            <DataTable data={tableData} />
                                        </Grid>

                                    </CardContent>
                                </Card>
                                <Card sx={{ maxWidth: 60 + "%", height: 40 + "%" }}>
                                    <CardContent className='analyticcolor'>
                                        <Grid >
                                            <h3>Pie Chart</h3>
                                            <PieChart data={chartData} />
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Stack>
                        </Grid>

                        <Box height={30} />
                        <Stack spacing={2} >
                            <Grid>
                                <Grid>
                                    <Card>
                                        <CardContent className='countryChartbackgroundcolor'>
                                            <h3>
                                                Countries intensity,relevance,likelihood
                                            </h3>
                                            <CountryChart data={data} />
                                        </CardContent>

                                    </Card>
                                </Grid>

                            </Grid>
                        </Stack>
                        <Box height={20} />
                        <Stack spacing={2} >
                            <Grid>
                                <Grid>
                                    <Card>
                                        <CardContent className='countryChartbackgroundcolor'>
                                            <h3>Country map</h3>
                                            <CountryMap data={data} />
                                        </CardContent>

                                    </Card>
                                </Grid>

                            </Grid>
                        </Stack>
                    </Grid>
                </Box>
            </Box>

        </>
    )
}
