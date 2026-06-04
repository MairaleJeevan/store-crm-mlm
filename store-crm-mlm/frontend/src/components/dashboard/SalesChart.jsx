import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

const SalesChart = ({ data }) => {

    return (

        <ResponsiveContainer
            width="100%"
            height={300}
        >

            <LineChart data={data}>

                <XAxis
                    dataKey="created_at"
                />

                <YAxis />

                <Tooltip />

                <Line
                    type="monotone"
                    dataKey="amount"
                />

            </LineChart>

        </ResponsiveContainer>

    );
};

export default SalesChart;