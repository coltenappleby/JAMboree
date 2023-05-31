import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { Listen, ListenHistory } from "../../types";
import { ListenDay } from "./calendarTypes";

interface CalendarHeatMapProps {
    listens: ListenHistory;
    height?: number;
    width?: number;
}

// export type Listen = {
//     endTime : Date
//     startTime : Date
//     artistName : string
//     trackName : string
//     seconds : number
// }


const margin = { top: 15, right: 15, bottom: 55, left: 15 }



const CalendarHeatMap = ({
    listens,
    height = 2000,
    width = 1400
}: CalendarHeatMapProps) => {

    const [days, setDays] = useState<ListenDay[]>([])

    useEffect(() => {
        
        // Is this the best way to do this? convert day (string) to Date then back to string only to go back to a Date again? 
        // There could be a fix if we can rollup by day and round the days
        // Other option is keep the end time as a string

        // format Date to YYYY-MM-DD
        const formatDate = d3.timeFormat("%Y-%m-%d");

        // using d3.rollup find the total time listened on each day, convert the time to days
        const timePerDayInDays = d3.rollup(listens, (v) => d3.sum(v, (d) => d.seconds), (d) => d3.timeDay.floor(d.startTime));



        console.log(timePerDayInDays);

        setDays(days);

        if(days.length == 0) {
            return
        }

        // A scale for day of the week ie monday, tuesday, wednesday, 0, 1, 2
        const xScale = d3.scaleBand()
            // .domain([0, 1, 2, 3, 4, 5, 6])
            .range([0, width])
            .padding(0.05);



    }, [listens]);




    return(
		<>
			<h1> Calendar View </h1>
			<svg width={width} height={height}>
				<g transform={`translate(${margin.left},${margin.top})`}> 

    
				</g>
			</svg>
		</>
    )
};

export default CalendarHeatMap;