import React, { useRef, useEffect } from 'react';
import './BarChart.css';
import * as d3 from 'd3';

const BarChart = ({ data, size }) => {

    // Desctructure width, height, padding.
    const { width, height, padding } = size;

    // Get acces to DOM for svg.g. Will create chart here.
    const barRef = useRef();

    useEffect( () => {
        drawBarChart(data);
    })

    const drawBarChart = (data) => {

        // Access ref (svg.g) to place chart inside. 
        const barChart = d3.select(barRef.current);

        // Define xScale as time.
        const xScale = d3.scaleTime()
            // Could pull domain vals out of data itself, but it seems 
            // easier to hard code b/c these are known values for this data set.
            .domain([new Date("1947-01-01"), new Date("2015-07-01")]).nice()
            .range([padding, width - padding])

        // Define yScale as linear for $ values.
        const yScale = d3.scaleLinear()
            .domain(d3.extent(data, (d) => d[1])).nice()
            .range([height - padding, padding])

        // Append x axis.
        barChart.append('g')
            .attr('transform', `translate(0, ${height - padding})`)
            .attr('class', 'axis')
            .call(
                d3.axisBottom(xScale)
                    .tickFormat(d3.timeFormat("%Y"))
                    .ticks(d3.timeYear.every(5))
        );

        // Append y axis
        barChart.append('g')
                .attr('transform', `translate(${padding}, 0)`)
                .attr('class', 'axis')
                .call(
                    d3.axisLeft(yScale)
                        // Should default to en_US as the locale
                        .ticks(9)
                        .tickFormat(d3.format("($,.0f"))
                );
        
        // Add bars/rects to chart. 
        barChart.append('g')
            .selectAll('rect')
            .data(data)
            .join('rect')
            .attr('width', 5)
            .attr('height', (d) => height - yScale(d[1]) - padding)
            .attr('fill', "#03963f")
            .attr('x', (d, i) => xScale(new Date(d[0])))
            .attr('y', (d) => yScale(d[1]))
        
        /* // Add text labels to bars.
        barChart.append('g')
            .selectAll('text')
            .data(data)
            .join('text')
            .attr('x', (d, i) => xScale(i) + 5)
            .attr('y', (d) => yScale(d[1]) - 5)
            .text((d) => d[1])
            .attr('text-anchor', 'middle'); */
    }

    return (
        <svg 
            className="svgChart"
            width={width} 
            height={height}
        >
            <g 
                ref={barRef}
                transform={`translate(0, 0)`}
            />

        </svg>
    )
}

export default BarChart;