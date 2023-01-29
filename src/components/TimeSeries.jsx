import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"


function TimeSeries({ value }) {

    const [data, setData] = useState({
        p1: [],
        p10: [],
        p25: []
    });

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
        }
    }

    const series = [
        { name: "p1", type: 'area', data: data.p1 ? data.p1 : [] },
        { name: "p2", type: 'area', data: data.p10 ? data.p10 : [] },
        { name: "p3", type: 'area', data: data.p25 ? data.p25 : [] }
    ]



    useEffect(() => {
        if (value && value != undefined) {
            let i = 0;
            let arr1 = [];
            let arr10 = [];
            let arr25 = [];

            for (i; i < value.length; i++) {
                arr1.push(value[i].p1)
                arr10.push(value[i].p10)
                arr25.push(value[i].p25)
            }
            setData({
                p1: arr1,
                p10: arr10,
                p25: arr25
            })
            console.log(data)
        }

        // return () => {
        //     return setLineData({
        //         p1: lineData.p1.splice(0, lineData.p1.length),
        //         p10: lineData.p10.splice(0, lineData.p10.length),
        //         p25: lineData.p25.splice(0, lineData.p25.length),
        //     })
        // }

    }, [value])

    return (
        <div>
            <h1>Time series Graph</h1>
            <ReactApexChart
                options={options}
                series={series}
                type={'area'}
                height={'300'}
            />
        </div>
    )
}

export default TimeSeries