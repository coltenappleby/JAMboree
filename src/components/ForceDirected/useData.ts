// write a custom hook to fetch data from the API using Papaparse
import * as d3 from "d3";

import { useEffect, useState } from "react";
import Papa, { ParseResult } from "papaparse";

export const useData = (url: string | undefined, rawData: any | undefined, csv: boolean) => {
    const [data, setData] = useState<any[] | null>(null);

    useEffect(() => {
        if (rawData) {
            setData(rawData);
        } 
    },[url, rawData, csv]);

    return data;
};