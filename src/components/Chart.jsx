import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
export const Chart = ({ data }) => {

    const [lineData, setLineData] = useState()

    const options = {
        chart: {
            id: "basic-bar"
        },
        stroke: {
            width: 2,
            curve: 'smooth'
        },
        markers: {
            size: 6
        },
        noData: {
            text: 'Loading .....'
        },
        xaxis: { categories: ["p1", "p10", "p25"] },
        yaxis: {name: 'Range'},
        colors: ['grey'],

    }

    const series = [{ name: 'Device A', data: lineData ? lineData : [] }]

    useEffect(() => {
        if (data != undefined) {
            console.log(data)
            data && setLineData([data.data.p1, data.data.p10, data.data.p25])
        }
    }, [data])

    return (
        <div>
            <h1>Comparision Graph</h1>
            <ReactApexChart
                options={options}
                series={series}
                type={'area'}
                height={'300'}
            />
        </div>
    )
}