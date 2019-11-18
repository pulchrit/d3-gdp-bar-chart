import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';


const Tooltip = ({ selected, xScale, yScale }) => {

    const toolRef = useRef();

    useEffect( () => {
        drawToolTip(selected, xScale, yScale);
    }, [selected, xScale, yScale])

    const drawToolTip = (selected, xScale, yScale) => {
        
        const tip = d3.select(toolRef.current);

        const tipFormat = d3.format("($,.0f");

        tip.append('text')
            .attr('x', xScale(selected[0]))
            .attr('y', yScale(selected[1]))
            .text(`${tipFormat(selected[1])}`)
    }

    return (
        <g
            ref={toolRef}
        />
    )
}

export default Tooltip;