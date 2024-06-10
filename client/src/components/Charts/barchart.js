import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
const BarChart = ({ data, yearFilter }) => {
  const svgRef = useRef();

  useEffect(() => {
    // Filter data based on yearFilter
    const filteredData = data.filter(item => yearFilter === ' ' || (item.published && item.published.includes(yearFilter)));

    // Set dimensions and margins
    const width = 600;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };

    // Clear previous chart
    d3.select(svgRef.current).selectAll('*').remove();

    // Create the SVG container
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Extract years and handle undefined or improperly formatted dates
    const years = filteredData.map(d => {
      const parts = d.published ? d.published.split(',') : [];
      return parts.length > 1 ? parts[1].trim() : 'Unknown';
    });

    // Set the scales
    const x = d3.scaleBand()
      .domain(years)
      .range([0, width - margin.left - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(filteredData, d => Math.max(d.intensity || 0, d.likelihood || 0, d.relevance || 0))]).nice()
      .range([height - margin.top - margin.bottom, 0]);

    // Add the x-axis
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.top - margin.bottom})`)
      .call(d3.axisBottom(x));

    // Add the y-axis
    svg.append('g')
      .call(d3.axisLeft(y));

    // Create a color scale
    const color = d3.scaleOrdinal()
      .domain(['intensity', 'likelihood', 'relevance'])
      .range(['rgba(75,192,192,0.6)', 'rgba(192,75,192,0.6)', 'rgba(75,192,75,0.6)']);

    // Add the bars for intensity
    svg.selectAll('.bar-intensity')
      .data(filteredData)
      .enter().append('rect')
      .attr('class', 'bar-intensity')
      .attr('x', d => x(d.published ? d.published.split(',')[1].trim() : 'Unknown'))
      .attr('y', d => y(d.intensity || 0))
      .attr('width', x.bandwidth() / 3)
      .attr('height', d => height - margin.top - margin.bottom - y(d.intensity || 0))
      .attr('fill', color('intensity'));

    // Add the bars for likelihood
    svg.selectAll('.bar-likelihood')
      .data(filteredData)
      .enter().append('rect')
      .attr('class', 'bar-likelihood')
      .attr('x', d => x(d.published ? d.published.split(',')[1].trim() : 'Unknown') + x.bandwidth() / 3)
      .attr('y', d => y(d.likelihood || 0))
      .attr('width', x.bandwidth() / 3)
      .attr('height', d => height - margin.top - margin.bottom - y(d.likelihood || 0))
      .attr('fill', color('likelihood'));

    // Add the bars for relevance
    svg.selectAll('.bar-relevance')
      .data(filteredData)
      .enter().append('rect')
      .attr('class', 'bar-relevance')
      .attr('x', d => x(d.published ? d.published.split(',')[1].trim() : 'Unknown') + 2 * x.bandwidth() / 3)
      .attr('y', d => y(d.relevance || 0))
      .attr('width', x.bandwidth() / 3)
      .attr('height', d => height - margin.top - margin.bottom - y(d.relevance || 0))
      .attr('fill', color('relevance'));

    // Add legend
    const legend = svg.append('g')
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


  }, [data, yearFilter]);

  return (
    <svg ref={svgRef}></svg>
  );
};

export default BarChart;
