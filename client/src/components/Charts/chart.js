import React, { useState } from 'react';
import { useData } from '../../contexts/dataContexts';
import BarChart from './barchart';
const Chart = () => {
    const { data } = useData();
    const [yearFilter, setYearFilter] = useState('2014');
    return (
        <div >
            <div>
                <label >Year Filter: </label>
                <input
                    placeholder='Enter year'
                    type="text"
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                />
            </div>
            <BarChart data={data} yearFilter={yearFilter} />
        </div>
    );
}

export default Chart;
