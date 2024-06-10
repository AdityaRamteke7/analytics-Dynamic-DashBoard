import React, { useEffect, useRef } from 'react';
import { Paper, useTheme } from '@mui/material';
import * as d3 from 'd3';
import "./pieChart.css"

const PieChart = ({ data }) => {
    const svgRef = useRef();
    const theme = useTheme();

    useEffect(() => {
        if (!data || data.length === 0) return;

        const width = 300;
        const height = 300;
        const radius = Math.min(width, height) / 2;

        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2},${height / 2})`);

        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie()
            .value(d => d.count)
            .sort(null);

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(radius);

        const dataCombined = combineData(data);

        const arcs = svg.selectAll('.arc')
            .data(pie(dataCombined))
            .enter()
            .append('g')
            .attr('class', 'arc');

        arcs.append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => color(i))
            .attr('opacity', 0.8)
            .on('mouseover', function (event) {
                d3.select(this).attr('opacity', 1);
            })
            .on('mouseout', function (event) {
                d3.select(this).attr('opacity', 0.8);
            });



    }, [data, theme.palette.text.primary]);

    const combineData = (data) => {
        const combined = {};
        data.forEach(entry => {
            const key = `${entry.sector}-${entry.topic}`;
            if (combined[key]) {
                combined[key].count++;
            } else {
                combined[key] = { sector: entry.sector, topic: entry.topic, count: 1 };
            }
        });
        return Object.values(combined);
    };

    return (
        <Paper className='piecharbackgroundcolor' elevation={3} style={{ width: 'fit-content', margin: 'auto' }}>
            <svg children="hover" ref={svgRef}></svg>
        </Paper>
    );
};

export default PieChart;
