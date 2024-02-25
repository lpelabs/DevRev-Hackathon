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

export default class Example extends PureComponent {
    render() {
        const { data } = this.props; // Retrieve the data from props

        const goodleSDataPoints = Object.values(data["google_play"]["swot_cluster_dict"]["s"]).flat().map((point, index) => ({
            x: point[0],
            y: point[1],
            z: point[2],
        }));

        const goodleWDataPoints = Object.values(data["google_play"]["swot_cluster_dict"]["w"]).flat().map((point, index) => ({
            x: point[0],
            y: point[1],
            z: point[2],
        }));

        const goodleODataPoints = Object.values(data["google_play"]["swot_cluster_dict"]["o"]).flat().map((point, index) => ({
            x: point[0],
            y: point[1],
            z: point[2],
        }));

        const goodleTDataPoints = Object.values(data["google_play"]["swot_cluster_dict"]["t"]).flat().map((point, index) => ({
            x: point[0],
            y: point[1],
            z: point[2],
        }));

        const twitterSDataPoints = Object.values(data["twitter"]["swot_cluster_dict"]["s"]).flat().map((point, index) => ({
            x: point[0],
            y: point[1],
            z: point[2],
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



        return (
            <>
            <Label className="flex flex-col text-md font-bold text-[40px] p-5 underline" htmlFor="BU_Id">Google Play Strength</Label>
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
                        {Object.keys(data["google_play"]["swot_cluster_dict"]["s"][0]).map((key, index) => (
                            <Scatter key={index} name="Google Play Strength" data={goodleSDataPoints} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} shape="point" />
                        ))}
                    </ScatterChart>
                </ResponsiveContainer>

                <Label className="flex flex-col text-md font-bold text-[40px] p-5 underline" htmlFor="BU_Id">Google Play Weakness</Label>
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
                        {Object.keys(data["google_play"]["swot_cluster_dict"]["w"][0]).map((key, index) => (
                            <Scatter key={index} name="Google Play Weakness" data={goodleWDataPoints} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} shape="point" />
                        ))}
                    </ScatterChart>

                </ResponsiveContainer>

                <Label className="flex flex-col text-md font-bold text-[40px] p-5 underline" htmlFor="BU_Id">Google Play Opportunities</Label>
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
                        {Object.keys(data["google_play"]["swot_cluster_dict"]["w"][0]).map((key, index) => (
                            <Scatter key={index} name="Google Play Opportunities" data={goodleODataPoints} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} shape="point" />
                        ))}
                    </ScatterChart>

                </ResponsiveContainer>
                <Label className="flex flex-col text-md font-bold text-[40px] p-5 underline" htmlFor="BU_Id">Google Play Threats</Label>
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
                        {Object.keys(data["google_play"]["swot_cluster_dict"]["w"][0]).map((key, index) => (
                            <Scatter key={index} name="Google Play Threats" data={goodleTDataPoints} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} shape="point" />
                        ))}
                    </ScatterChart>

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
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        {Object.keys(data["google_play"]["swot_cluster_dict"]["s"][0]).map((key, index) => (
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
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        {Object.keys(data["google_play"]["swot_cluster_dict"]["s"][0]).map((key, index) => (
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
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        {Object.keys(data["google_play"]["swot_cluster_dict"]["s"][0]).map((key, index) => (
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
                        {Object.keys(data["google_play"]["swot_cluster_dict"]["s"][0]).map((key, index) => (
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
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        {Object.keys(data["google_play"]["swot_cluster_dict"]["s"][0]).map((key, index) => (
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
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        {Object.keys(data["google_play"]["swot_cluster_dict"]["s"][0]).map((key, index) => (
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
                        {Object.keys(data["google_play"]["swot_cluster_dict"]["s"][0]).map((key, index) => (
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
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        {Object.keys(data["google_play"]["swot_cluster_dict"]["s"][0]).map((key, index) => (
                            <Scatter key={index} name="Reddit Threats" data={redditTDataPoints} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} shape="point" />
                        ))}
                    </ScatterChart>
                </ResponsiveContainer>


            </>
        );
    }
}
