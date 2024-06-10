import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import './CountryMap.css';

const CountryMap = ({ data }) => {
    const svgRef = useRef();
    const [geoData, setGeoData] = useState(null);

    useEffect(() => {

        d3.json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson').then(setGeoData);
    }, []);

    useEffect(() => {
        if (!geoData) return;

        const width = 800;
        const height = 600;

        const projection = d3.geoMercator()
            .scale(100)
            .translate([width / 2, height / 1.5]);

        const path = d3.geoPath().projection(projection);


        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        // Clear previous map
        svg.selectAll('*').remove();

        // Append GeoJSON data
        svg.selectAll('path')
            .data(geoData.features)
            .enter().append('path')
            .attr('d', path)
            .attr('class', 'country')
            .attr('fill', d => {
                const countryData = data.find(item => item.country === d.properties.name);
                return countryData ? 'rgba(75,192,192,0.6)' : '#ccc';
            })
            .attr('stroke', '#000');

    }, [geoData, data]);

    return <svg className="countrycolor" ref={svgRef}></svg>;
};

export default CountryMap;
