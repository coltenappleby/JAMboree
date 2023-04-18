import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import { Listen, ListenHistory } from "../../types";
import { ListenDay } from "./calendarTypes";

interface CalendarHeatMapProps {
    listens: ListenHistory;
}



const CalendarHeatMap = ({listens}: CalendarHeatMapProps) => {

    const [days, setDays] = useState<ListenDay[]>([])

    useEffect(() => {
        
        // Is this the best way to do this? convert day (string) to Date then back to string only to go back to a Date again? 
        // There could be a fix if we can rollup by day and round the days
        // Other option is keep the end time as a string

        // format Date to YYYY-MM-DD
        const formatDate = d3.timeFormat("%Y-%m-%d");

        // using d3.rollup find the total time listened on each day, convert the time to days
        const timePerDayInDays = d3.rollup(days, (v) => d3.sum(v, (d) => d.time), (d) => formatDate(d.date));


        // using d3.rollup find the total number of listens on each day
        const listensPerDay = d3.rollup(days, (v) => d3.sum(v, (d) => d.listens), (d) => d.date);

        console.log(timePerDayInDays);

        setDays(days);


    }, [listens]);

    // console.log(days);



    return(
        <></>
    )
};

export default CalendarHeatMap;