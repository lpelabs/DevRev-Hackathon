import React, { PureComponent } from 'react';
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import { Label } from './ui/label';
import Plot from 'react-plotly.js';

export default function Example(props) {
    const { data } = props; // Retrieve the data from props

    const chartdata = Object.values(data["twitter"]["swot_cluster_dict"]["s"]).flat().map((point, index) => ({
        x: point[0],
        y: point[1],
        z: point[2],
    }))
    var trace1 = {
        chartdata,
        mode: 'markers',
        marker: {
            size: 12,
            line: {
                color: 'rgba(217, 217, 217, 0.14)',
                width: 0.5
            },
            opacity: 0.8
        },
        type: 'scatter3d'
    };

    var data2 = [trace1];

    var layout = {
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0
        }
    };



    // const goodleSDataPoints = Object.values(data["google_play"]["swot_cluster_dict"]["s"]).flat().map((point, index) => ({
    //     x: point[0],
    //     y: point[1],
    //     z: point[2],
    // }));

    // const goodleWDataPoints = Object.values(data["google_play"]["swot_cluster_dict"]["w"]).flat().map((point, index) => ({
    //     x: point[0],
    //     y: point[1],
    //     z: point[2],
    // }));

    // const goodleODataPoints = Object.values(data["google_play"]["swot_cluster_dict"]["o"]).flat().map((point, index) => ({
    //     x: point[0],
    //     y: point[1],
    //     z: point[2],
    // }));

    // const goodleTDataPoints = Object.values(data["google_play"]["swot_cluster_dict"]["t"]).flat().map((point, index) => ({
    //     x: point[0],
    //     y: point[1],
    //     z: point[2],
    // }));
    var listx = []
    var listy = []
    var listz = []
    console.log(Object.values(data["twitter"]["swot_cluster_dict"]["s"]).flat().map((point, index) => ({
        x: point[0],
        y: point[1],
        z: point[2],
    })).map((data) => {
        console.log(data["x"])
        listx.push(data["x"])
        listy.push(data["y"])
        listz.push(data["z"])
    }))
    const twitterSDataPointsX = []
    const twitterSDataPointsY = []
    const twitterSDataPointsZ = []

    console.log(listx)
    const twitterSDataPoints = (Object.values(data["twitter"]["swot_cluster_dict"]["s"]).flat().map((point, index) => ({
        x: point[0],
        y: point[1],
        z: point[2],
    })).map((data) => {
        twitterSDataPointsX.push(data["x"])
        twitterSDataPointsY.push(data["y"])
        twitterSDataPointsZ.push(data["z"])
    }));



    const twitterWDataPoints = Object.values(data["twitter"]["swot_cluster_dict"]["w"]).flat().map((point, index) => ({
        x: point[0],
        y: point[1],
        z: point[2],
    }));

    const twitterODataPoints = Object.values(data["twitter"]["swot_cluster_dict"]["o"]).flat().map((point, index) => ({
        x: point[0],
        y: point[1],
        z: point[2],
    }));

    const twitterTDataPoints = Object.values(data["twitter"]["swot_cluster_dict"]["t"]).flat().map((point, index) => ({
        x: point[0],
        y: point[1],
        z: point[2],
    }));

    const redditSDataPoints = Object.values(data["reddit"]["swot_cluster_dict"]["s"]).flat().map((point, index) => ({
        x: point[0],
        y: point[1],
        z: point[2],
    }));

    const redditWDataPoints = Object.values(data["reddit"]["swot_cluster_dict"]["w"]).flat().map((point, index) => ({
        x: point[0],
        y: point[1],
        z: point[2],
    }));

    const redditODataPoints = Object.values(data["reddit"]["swot_cluster_dict"]["o"]).flat().map((point, index) => ({
        x: point[0],
        y: point[1],
        z: point[2],
    }));

    const redditTDataPoints = Object.values(data["reddit"]["swot_cluster_dict"]["t"]).flat().map((point, index) => ({
        x: point[0],
        y: point[1],
        z: point[2],
    }));

    console.log(twitterSDataPointsX)

    return (
        <>
            <Plot data={[{
                x: twitterSDataPointsX,
                y: twitterSDataPointsY,
                z: twitterSDataPointsZ,
                type: 'scatter3d',
                mode: 'markers',
                marker: {
                    size: 12,
                    line: {
                        color: 'rgba(217, 217, 217, 0.14)',
                        width: 0.5
                    },
                    opacity: 0.8
                },
            },]} layout={layout} />
            <Label className="flex flex-col text-md font-bold text-[40px] p-5 underline" htmlFor="BU_Id">Google Play Strength</Label>
            {/* <ResponsiveContainer width="40%" height={400}>
                    <ScatterChart
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="x-axis" unit="u" />
                        <YAxis type="number" dataKey="y" name="y-axis" unit="u" />
                        <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" unit="u" />
                        // <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        // <Legend />
                        {Object.keys(data["google_play"]["swot_cluster_dict"]["s"][0]).map((key, index) => (
                            <Scatter key={index} name="Google Play Strength" data={goodleSDataPoints} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} shape="point" />
                        ))}
                    </ScatterChart>
                </ResponsiveContainer> */}

            <Label className="flex flex-col text-md font-bold text-[40px] p-5 underline" htmlFor="BU_Id">Google Play Weakness</Label>
            <ResponsiveContainer width="40%" height={400}>

                {/* <ScatterChart
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="x-axis" unit="u" />
                        <YAxis type="number" dataKey="y" name="y-axis" unit="u" />
                        <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" unit="u" />
                        // <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        // <Legend />
                        {Object.keys(data["google_play"]["swot_cluster_dict"]["w"][0]).map((key, index) => (
                            <Scatter key={index} name="Google Play Weakness" data={goodleWDataPoints} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} shape="point" />
                        ))}
                    </ScatterChart> */}

            </ResponsiveContainer>

            <Label className="flex flex-col text-md font-bold text-[40px] p-5 underline" htmlFor="BU_Id">Google Play Opportunities</Label>
            <ResponsiveContainer width="40%" height={400}>

                {/* <ScatterChart
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="x-axis" unit="u" />
                        <YAxis type="number" dataKey="y" name="y-axis" unit="u" />
                        <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" unit="u" />
                        // <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        // <Legend />
                        {Object.keys(data["google_play"]["swot_cluster_dict"]["w"][0]).map((key, index) => (
                            <Scatter key={index} name="Google Play Opportunities" data={goodleODataPoints} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} shape="point" />
                        ))}
                    </ScatterChart> */}

            </ResponsiveContainer>
            <Label className="flex flex-col text-md font-bold text-[40px] p-5 underline" htmlFor="BU_Id">Google Play Threats</Label>
            <ResponsiveContainer width="40%" height={400}>

                {/* <ScatterChart
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                    >
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="x-axis" unit="u" />
                        <YAxis type="number" dataKey="y" name="y-axis" unit="u" />
                        <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" unit="u" />
                        // <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        // <Legend />
                        {Object.keys(data["google_play"]["swot_cluster_dict"]["w"][0]).map((key, index) => (
                            <Scatter key={index} name="Google Play Threats" data={goodleTDataPoints} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} shape="point" />
                        ))}
                    </ScatterChart> */}

            </ResponsiveContainer>
            <Label className="flex flex-col text-md font-bold text-[40px] p-5 underline" htmlFor="BU_Id">Twitter Strength</Label>
            <ResponsiveContainer width="40%" height={400}>
                <ScatterChart
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="x-axis" unit="u" />
                    <YAxis type="number" dataKey="y" name="y-axis" unit="u" />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" unit="u" />
                    {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}
                    {/* <Legend /> */}
                    {Object.keys(data["twitter"]["swot_cluster_dict"]["s"][0]).map((key, index) => (
                        <Scatter key={index} name="Twitter Strength" data={twitterSDataPoints} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} shape="point" />
                    ))}
                </ScatterChart>
            </ResponsiveContainer>
            <Label className="flex flex-col text-md font-bold text-[40px] p-5 underline" htmlFor="BU_Id">Twitter Weakness</Label>
            <ResponsiveContainer width="40%" height={400}>
                <ScatterChart
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="x-axis" unit="u" />
                    <YAxis type="number" dataKey="y" name="y-axis" unit="u" />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" unit="u" />
                    {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}
                    {/* <Legend /> */}
                    {Object.keys(data["twitter"]["swot_cluster_dict"]["s"][0]).map((key, index) => (
                        <Scatter key={index} name="Twitter Weakness" data={twitterWDataPoints} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} shape="point" />
                    ))}
                </ScatterChart>
            </ResponsiveContainer>
            <Label className="flex flex-col text-md font-bold text-[40px] p-5 underline" htmlFor="BU_Id">Twitter Opportunities</Label>
            <ResponsiveContainer width="40%" height={400}>
                <ScatterChart
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="x-axis" unit="u" />
                    <YAxis type="number" dataKey="y" name="y-axis" unit="u" />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" unit="u" />
                    {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}
                    {/* <Legend /> */}
                    {Object.keys(data["twitter"]["swot_cluster_dict"]["s"][0]).map((key, index) => (
                        <Scatter key={index} name="Twitter Opportunities" data={twitterODataPoints} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} shape="point" />
                    ))}
                </ScatterChart>
            </ResponsiveContainer>
            <Label className="flex flex-col text-md font-bold text-[40px] p-5 underline" htmlFor="BU_Id">Twitter Threats</Label>
            <ResponsiveContainer width="40%" height={400}>
                <ScatterChart
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="x-axis" unit="u" />
                    <YAxis type="number" dataKey="y" name="y-axis" unit="u" />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" unit="u" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    {Object.keys(data["twitter"]["swot_cluster_dict"]["s"][0]).map((key, index) => (
                        <Scatter key={index} name="Twitter Threats" data={twitterTDataPoints} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} shape="point" />
                    ))}
                </ScatterChart>
            </ResponsiveContainer>
            <Label className="flex flex-col text-md font-bold text-[40px] p-5 underline" htmlFor="BU_Id">Reddit Strengths</Label>
            <ResponsiveContainer width="40%" height={400}>
                <ScatterChart
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="x-axis" unit="u" />
                    <YAxis type="number" dataKey="y" name="y-axis" unit="u" />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" unit="u" />
                    {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}
                    {/* <Legend /> */}
                    {Object.keys(data["reddit"]["swot_cluster_dict"]["s"][0]).map((key, index) => (
                        <Scatter key={index} name="Reddit Strengths" data={redditSDataPoints} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} shape="point" />
                    ))}
                </ScatterChart>
            </ResponsiveContainer>
            <Label className="flex flex-col text-md font-bold text-[40px] p-5 underline" htmlFor="BU_Id">Reddit Weakness</Label>
            <ResponsiveContainer width="40%" height={400}>
                <ScatterChart
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="x-axis" unit="u" />
                    <YAxis type="number" dataKey="y" name="y-axis" unit="u" />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" unit="u" />
                    {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}
                    {/* <Legend /> */}
                    {Object.keys(data["reddit"]["swot_cluster_dict"]["s"][0]).map((key, index) => (
                        <Scatter key={index} name="Reddit Weakness" data={redditWDataPoints} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} shape="point" />
                    ))}
                </ScatterChart>
            </ResponsiveContainer>
            <Label className="flex flex-col text-md font-bold text-[40px] p-5 underline" htmlFor="BU_Id">Reddit Opportunities</Label>
            <ResponsiveContainer width="40%" height={400}>
                <ScatterChart
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="x-axis" unit="u" />
                    <YAxis type="number" dataKey="y" name="y-axis" unit="u" />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" unit="u" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    {Object.keys(data["reddit"]["swot_cluster_dict"]["s"][0]).map((key, index) => (
                        <Scatter key={index} name="Reddit Opportunities" data={redditODataPoints} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} shape="point" />
                    ))}
                </ScatterChart>
            </ResponsiveContainer>
            <Label className="flex flex-col text-md font-bold text-[40px] p-5 underline" htmlFor="BU_Id">Reddit Threats</Label>
            <ResponsiveContainer width="40%" height={400}>
                <ScatterChart
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 20,
                    }}
                >
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="x-axis" unit="u" />
                    <YAxis type="number" dataKey="y" name="y-axis" unit="u" />
                    <ZAxis type="number" dataKey="z" range={[60, 400]} name="score" unit="u" />
                    {/* <Tooltip cursor={{ strokeDasharray: '3 3' }} /> */}
                    {/* <Legend /> */}
                    {Object.keys(data["reddit"]["swot_cluster_dict"]["s"][0]).map((key, index) => (
                        <Scatter key={index} name="Reddit Threats" data={redditTDataPoints} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} shape="point" />
                    ))}
                </ScatterChart>
            </ResponsiveContainer>


        </>
    );
}

