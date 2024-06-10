import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import "./countryChart.css"

const CountryChart = ({ data }) => {
  const svgRef = useRef();
  const [countryFilter, setCountryFilter] = useState('st');

  useEffect(() => {
    // Filter data based on countryFilter
    const filteredData = data.filter(item => countryFilter === '' || (item.country && item.country.includes(countryFilter)));

    // Set dimensions and margins
    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Create the SVG container
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Extract countries and handle undefined or improperly formatted data
    const countries = Array.from(new Set(filteredData.map(d => d.country || 'Unknown')));

    // Set the scales
    const x = d3.scaleBand()
      .domain(countries)
      .range([0, width - margin.left - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => Math.max(d.intensity || 0, d.likelihood || 0, d.relevance || 0))]).nice()
      .range([height - margin.top - margin.bottom, 0]);

    // Add the x-axis
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Add the y-axis
    svg.append('g')
      .attr('class', 'axis')
      .call(d3.axisLeft(y));

    // Create a color scale
    const color = d3.scaleOrdinal()
      .domain(['intensity', 'likelihood', 'relevance'])
      .range(['rgba(75,192,192,0.6)', 'rgba(192,75,192,0.6)', 'rgba(75,192,75,0.6)']);

    // Create line generators
    const lineIntensity = d3.line()
      .x(d => x(d.country || 'Unknown') + x.bandwidth() / 2)
      .y(d => y(d.intensity || 0));

    const lineLikelihood = d3.line()
      .x(d => x(d.country || 'Unknown') + x.bandwidth() / 2)
      .y(d => y(d.likelihood || 0));

    const lineRelevance = d3.line()
      .x(d => x(d.country || 'Unknown') + x.bandwidth() / 2)
      .y(d => y(d.relevance || 0));

    // Add lines for intensity
    svg.append('path')
      .datum(filteredData)
      .attr('fill', 'none')
      .attr('stroke', color('intensity'))
      .attr('stroke-width', 1.5)
      .attr('d', lineIntensity);

    // Add lines for likelihood
    svg.append('path')
      .datum(filteredData)
      .attr('fill', 'none')
      .attr('stroke', color('likelihood'))
      .attr('stroke-width', 1.5)
      .attr('d', lineLikelihood);

    // Add lines for relevance
    svg.append('path')
      .datum(filteredData)
      .attr('fill', 'none')
      .attr('stroke', color('relevance'))
      .attr('stroke-width', 1.5)
      .attr('d', lineRelevance);

    // Add legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - margin.right - 100}, ${margin.top})`);

    legend.selectAll('rect')
      .data(color.domain())
      .enter().append('rect')
      .attr('x', 0)
      .attr('y', (d, i) => i * 20)
      .attr('width', 18)
      .attr('height', 18)
      .attr('fill', color);

    legend.selectAll('text')
      .data(color.domain())
      .enter().append('text')
      .attr('x', 24)
      .attr('y', (d, i) => i * 20 + 9)
      .attr('dy', '0.35em')
      .text(d => d.charAt(0).toUpperCase() + d.slice(1));

  }, [data, countryFilter]);

  return (
    <div className='countryChartbackgroundcolor'>
      <div>
        <label>Country Filter: </label>
        <input
          placeholder='Enter country name'
          type="text"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        />
      </div>
      <svg className='countryChartbackgroundcolor' ref={svgRef}></svg>
    </div>
  );
};

export default CountryChart;
