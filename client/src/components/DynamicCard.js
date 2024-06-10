import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

import { useData } from 'contexts/dataContexts';
import "../components/pages/Home.css"

const DynamicCard = () => {

    const [index, setIndex] = useState(0);
    const { data } = useData()
    const insights = data;

    useEffect(() => {
        if (insights.length === 0) return;

        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % insights.length);
        }, 5000); // Change content every 5 seconds

        return () => clearInterval(interval);
    }, [insights.length]);

    if (insights.length === 0) {
        return (
            <Card sx={{ minWidth: 100 + "%", }} >

                <CardContent className='gradient'>
                    <Typography variant="h5" color={"white"} component="div">
                        No data available
                    </Typography>
                </CardContent>

            </Card>
        );
    }

    return (
        <Card sx={{ maxWidth: 100 + "%" }}>
            <CardContent className='gradient'>
                <Typography gutterBottom sx={{ color: "black", }}>
                    <h3>Title : {insights[index].title || "No Title"}</h3>

                </Typography>
                <Typography gutterBottom sx={{ color: "000000", }}>
                    <h4> Insights : {insights[index].insight || "No Insight"}</h4>
                </Typography>
                <Typography gutterBottom sx={{ color: "#000000", }} >
                    <h4>    Country Name : {insights[index].country || "No Insight"}</h4>
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DynamicCard;
