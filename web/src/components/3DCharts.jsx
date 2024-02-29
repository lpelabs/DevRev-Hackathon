import React, { PureComponent } from 'react';
import Plot from 'react-plotly.js';

export default function Example(props) {
    const { data } = props; // Retrieve the data from props

    var layout = {
        margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0
        }
    };

    let traceTwitterS = []
    let traceTwitterW = []
    let traceTwitterO = []
    let traceTwitterT = []

    let tracegoogleplayS = []
    let tracegoogleplayW = []
    let tracegoogleplayO = []
    let tracegoogleplayT = []

    let traceredditS = []
    let traceredditW = []
    let traceredditO = []
    let traceredditT = []

    if (!('error' in data["twitter"])) {
        const twitterSDataPointsX = []
        const twitterSDataPointsY = []
        const twitterSDataPointsZ = []

        const twitterSDataPoints = (Object.values(data["twitter"]["swot_cluster_dict"]["s"]).flat().map((point, index) => ({
            x: point[0],
            y: point[1],
            z: point[2],
        })).map((data) => {
            twitterSDataPointsX.push(data["x"])
            twitterSDataPointsY.push(data["y"])
            twitterSDataPointsZ.push(data["z"])
        }));

        const twitterWDataPointsX = []
        const twitterWDataPointsY = []
        const twitterWDataPointsZ = []

        const twitterWDataPoints = (Object.values(data["twitter"]["swot_cluster_dict"]["w"]).flat().map((point, index) => ({
            x: point[0],
            y: point[1],
            z: point[2],
        })).map((data) => {
            twitterWDataPointsX.push(data["x"])
            twitterWDataPointsY.push(data["y"])
            twitterWDataPointsZ.push(data["z"])
        }));

        const twitterODataPointsX = []
        const twitterODataPointsY = []
        const twitterODataPointsZ = []

        const twitterODataPoints = (Object.values(data["twitter"]["swot_cluster_dict"]["o"]).flat().map((point, index) => ({
            x: point[0],
            y: point[1],
            z: point[2],
        })).map((data) => {
            twitterODataPointsX.push(data["x"])
            twitterODataPointsY.push(data["y"])
            twitterODataPointsZ.push(data["z"])
        }));

        const twitterTDataPointsX = []
        const twitterTDataPointsY = []
        const twitterTDataPointsZ = []

        const twitterTDataPoints = (Object.values(data["twitter"]["swot_cluster_dict"]["t"]).flat().map((point, index) => ({
            x: point[0],
            y: point[1],
            z: point[2],
        })).map((data) => {
            twitterTDataPointsX.push(data["x"])
            twitterTDataPointsY.push(data["y"])
            twitterTDataPointsZ.push(data["z"])
        }));

        traceTwitterS = {
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
            name: "strength"
        }

        traceTwitterW = {
            x: twitterWDataPointsX,
            y: twitterWDataPointsY,
            z: twitterWDataPointsZ,
            type: 'scatter3d',
            mode: 'markers',
            marker: {
                size: 12,
                line: {
                    color: 'rgba(60, 50, 168, 0.14)',
                    width: 0.5
                },
                opacity: 0.8
            },
            name: "weakness"
        }
        traceTwitterO = {
            x: twitterODataPointsX,
            y: twitterODataPointsY,
            z: twitterODataPointsZ,
            type: 'scatter3d',
            mode: 'markers',
            marker: {
                size: 12,
                line: {
                    color: 'rgba(168, 50, 80, 0.14)',
                    width: 0.5
                },
                opacity: 0.8
            },
            name: "opportunity"
        }
        traceTwitterT = {
            x: twitterTDataPointsX,
            y: twitterTDataPointsY,
            z: twitterTDataPointsZ,
            type: 'scatter3d',
            mode: 'markers',
            marker: {
                size: 12,
                line: {
                    color: 'rgba(168, 162, 50, 0.14)',
                    width: 0.5
                },
                opacity: 0.8
            },
            name: "threats",
        }
    }

    if (!('error' in data["reddit"])) {
        const redditSDataPointsX = []
        const redditSDataPointsY = []
        const redditSDataPointsZ = []

        const twitterSDataPoints = (Object.values(data["reddit"]["swot_cluster_dict"]["s"]).flat().map((point, index) => ({
            x: point[0],
            y: point[1],
            z: point[2],
        })).map((data) => {
            redditSDataPointsX.push(data["x"])
            redditSDataPointsY.push(data["y"])
            redditSDataPointsZ.push(data["z"])
        }));

        const redditWDataPointsX = []
        const redditWDataPointsY = []
        const redditWDataPointsZ = []

        const twitterWDataPoints = (Object.values(data["reddit"]["swot_cluster_dict"]["w"]).flat().map((point, index) => ({
            x: point[0],
            y: point[1],
            z: point[2],
        })).map((data) => {
            redditWDataPointsX.push(data["x"])
            redditWDataPointsY.push(data["y"])
            redditWDataPointsZ.push(data["z"])
        }));

        const redditODataPointsX = []
        const redditODataPointsY = []
        const redditODataPointsZ = []

        const twitterODataPoints = (Object.values(data["reddit"]["swot_cluster_dict"]["o"]).flat().map((point, index) => ({
            x: point[0],
            y: point[1],
            z: point[2],
        })).map((data) => {
            redditODataPointsX.push(data["x"])
            redditODataPointsY.push(data["y"])
            redditODataPointsZ.push(data["z"])
        }));

        const redditTDataPointsX = []
        const redditTDataPointsY = []
        const redditTDataPointsZ = []

        const twitterTDataPoints = (Object.values(data["reddit"]["swot_cluster_dict"]["t"]).flat().map((point, index) => ({
            x: point[0],
            y: point[1],
            z: point[2],
        })).map((data) => {
            redditTDataPointsX.push(data["x"])
            redditTDataPointsY.push(data["y"])
            redditTDataPointsZ.push(data["z"])
        }));

        traceredditS = {
            x: redditSDataPointsX,
            y: redditSDataPointsY,
            z: redditSDataPointsZ,
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
            name: "strength"
        }

        traceredditW = {
            x: redditWDataPointsX,
            y: redditWDataPointsY,
            z: redditWDataPointsZ,
            type: 'scatter3d',
            mode: 'markers',
            marker: {
                size: 12,
                line: {
                    color: 'rgba(60, 50, 168, 0.14)',
                    width: 0.5
                },
                opacity: 0.8
            },
            name: "weakness"
        }
        traceredditO = {
            x: redditODataPointsX,
            y: redditODataPointsY,
            z: redditODataPointsZ,
            type: 'scatter3d',
            mode: 'markers',
            marker: {
                size: 12,
                line: {
                    color: 'rgba(168, 50, 80, 0.14)',
                    width: 0.5
                },
                opacity: 0.8
            },
            name: "opportunity"
        }
        traceredditT = {
            x: redditTDataPointsX,
            y: redditTDataPointsY,
            z: redditTDataPointsZ,
            type: 'scatter3d',
            mode: 'markers',
            marker: {
                size: 12,
                line: {
                    color: 'rgba(168, 162, 50, 0.14)',
                    width: 0.5
                },
                opacity: 0.8
            },
            name: "threats",
        }
    }

    if (!('error' in data["google_play"])) {
        const googleplaySDataPointsX = []
        const googleplaySDataPointsY = []
        const googleplaySDataPointsZ = []

        const googleplaySDataPoints = (Object.values(data["googleplay"]["swot_cluster_dict"]["s"]).flat().map((point, index) => ({
            x: point[0],
            y: point[1],
            z: point[2],
        })).map((data) => {
            googleplaySDataPointsX.push(data["x"])
            googleplaySDataPointsY.push(data["y"])
            googleplaySDataPointsZ.push(data["z"])
        }));

        const googleplayWDataPointsX = []
        const googleplayWDataPointsY = []
        const googleplayWDataPointsZ = []

        const googleplayWDataPoints = (Object.values(data["googleplay"]["swot_cluster_dict"]["w"]).flat().map((point, index) => ({
            x: point[0],
            y: point[1],
            z: point[2],
        })).map((data) => {
            googleplayWDataPointsX.push(data["x"])
            googleplayWDataPointsY.push(data["y"])
            googleplayWDataPointsZ.push(data["z"])
        }));

        const googleplayODataPointsX = []
        const googleplayODataPointsY = []
        const googleplayODataPointsZ = []

        const googleplayODataPoints = (Object.values(data["googleplay"]["swot_cluster_dict"]["o"]).flat().map((point, index) => ({
            x: point[0],
            y: point[1],
            z: point[2],
        })).map((data) => {
            googleplayODataPointsX.push(data["x"])
            googleplayODataPointsY.push(data["y"])
            googleplayODataPointsZ.push(data["z"])
        }));

        const googleplayTDataPointsX = []
        const googleplayTDataPointsY = []
        const googleplayTDataPointsZ = []

        const googleplayTDataPoints = (Object.values(data["googleplay"]["swot_cluster_dict"]["t"]).flat().map((point, index) => ({
            x: point[0],
            y: point[1],
            z: point[2],
        })).map((data) => {
            googleplayTDataPointsX.push(data["x"])
            googleplayTDataPointsY.push(data["y"])
            googleplayTDataPointsZ.push(data["z"])
        }));

        tracegoogleplayS = {
            x: googleplaySDataPointsX,
            y: googleplaySDataPointsY,
            z: googleplaySDataPointsZ,
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
            name: "strength"
        }

        tracegoogleplayW = {
            x: googleplayWDataPointsX,
            y: googleplayWDataPointsY,
            z: googleplayWDataPointsZ,
            type: 'scatter3d',
            mode: 'markers',
            marker: {
                size: 12,
                line: {
                    color: 'rgba(60, 50, 168, 0.14)',
                    width: 0.5
                },
                opacity: 0.8
            },
            name: "weakness"
        }
        tracegoogleplayO = {
            x: googleplayODataPointsX,
            y: googleplayODataPointsY,
            z: googleplayODataPointsZ,
            type: 'scatter3d',
            mode: 'markers',
            marker: {
                size: 12,
                line: {
                    color: 'rgba(168, 50, 80, 0.14)',
                    width: 0.5
                },
                opacity: 0.8
            },
            name: "opportunity"
        }
        tracegoogleplayT = {
            x: googleplayTDataPointsX,
            y: googleplayTDataPointsY,
            z: googleplayTDataPointsZ,
            type: 'scatter3d',
            mode: 'markers',
            marker: {
                size: 12,
                line: {
                    color: 'rgba(168, 162, 50, 0.14)',
                    width: 0.5
                },
                opacity: 0.8
            },
            name: "threats",
        }
    }


    const twitterdatapointS = [traceTwitterS]
    const twitterdatapointW = [traceTwitterW]
    const twitterdatapointO = [traceTwitterO]
    const twitterdatapointT = [traceTwitterT]

    const googleplaydatapointS = [tracegoogleplayS]
    const googleplaydatapointW = [tracegoogleplayW]
    const googleplaydatapointO = [tracegoogleplayO]
    const googleplaydatapointT = [tracegoogleplayT]

    const redditdatapointS = [traceredditS]
    const redditdatapointW = [traceredditW]
    const redditdatapointO = [traceredditO]
    const redditdatapointT = [traceredditT]

    return (
        <div className='mb-6'>
            {!('error' in data["twitter"]) && (
                <section>
                    <h1 className='text-2xl font-semibold text-center my-5 underline'>Swot Analysis based on twitter's data</h1>
                    <div className='grid xl:grid-cols-2 gap-10 grid-cols-1'>
                        <div className='m-auto flex flex-col justify-center bg-gray-200 rounded-lg w-full'>
                            <Plot data={twitterdatapointS} layout={layout} className='w-full' />
                            <p className='text-center text-[#5C5547] font-semibold mt-2'>Strength distribution for twitter VoC data</p>
                        </div>
                        <div className='m-auto flex flex-col justify-center bg-gray-200 rounded-lg w-full'>
                            <Plot data={twitterdatapointW} layout={layout} className='w-full' />
                            <p className='text-center text-[#5C5547] font-semibold mt-2'>Weakness distribution for twitter VoC data</p>
                        </div>
                        <div className='m-auto flex flex-col justify-center bg-gray-200 rounded-lg w-full'>
                            <Plot data={twitterdatapointO} layout={layout} className='w-full' />
                            <p className='text-center text-[#5C5547] font-semibold mt-2'>Oppourtunities distribution for twitter VoC data</p>
                        </div>
                        <div className='m-auto flex flex-col justify-center bg-gray-200 rounded-lg w-full'>
                            <Plot data={twitterdatapointT} layout={layout} className='w-full' />
                            <p className='text-center text-[#5C5547] font-semibold mt-2'>Threats distribution for twitter VoC data</p>
                        </div>
                    </div>
                </section>
            )}
            {!('error' in data["google_play"]) && (
                <section>
                    <h1 className='text-2xl font-semibold text-center my-5 underline'>Swot Analysis based on google play's review</h1>
                    <div className='grid xl:grid-cols-2 gap-10 grid-cols-1'>
                        <div className='m-auto flex flex-col justify-center bg-gray-200 rounded-lg w-full'>
                            <Plot data={googleplaydatapointS} layout={layout} className='w-full' />
                            <p className='text-center text-[#5C5547] font-semibold mt-2'>Strength distribution for google play VoC data</p>
                        </div>
                        <div className='m-auto flex flex-col justify-center bg-gray-200 rounded-lg w-full'>
                            <Plot data={googleplaydatapointW} layout={layout} className='w-full' />
                            <p className='text-center text-[#5C5547] font-semibold mt-2'>Weakness distribution for google play VoC data</p>
                        </div>
                        <div className='m-auto flex flex-col justify-center bg-gray-200 rounded-lg w-full'>
                            <Plot data={googleplaydatapointO} layout={layout} className='w-full' />
                            <p className='text-center text-[#5C5547] font-semibold mt-2'>Oppourtunities distribution for google play VoC data</p>
                        </div>
                        <div className='m-auto flex flex-col justify-center bg-gray-200 rounded-lg w-full'>
                            <Plot data={googleplaydatapointT} layout={layout} className='w-full' />
                            <p className='text-center text-[#5C5547] font-semibold mt-2'>Threats distribution for google play VoC data</p>
                        </div>
                    </div>
                </section>
            )}
            {!('error' in data["reddit"]) && (
                <section>
                    <h1 className='text-2xl font-semibold text-center my-5 underline'>Swot Analysis based on reddit's data</h1>
                    <div className='grid xl:grid-cols-2 gap-10 grid-cols-1'>
                        <div className='m-auto flex flex-col justify-center bg-gray-200 rounded-lg w-full'>
                            <Plot data={redditdatapointS} layout={layout} className='w-full' />
                            <p className='text-center text-[#5C5547] font-semibold mt-2'>Strength distribution for reddit VoC data</p>
                        </div>
                        <div className='m-auto flex flex-col justify-center bg-gray-200 rounded-lg w-full'>
                            <Plot data={redditdatapointW} layout={layout} className='w-full' />
                            <p className='text-center text-[#5C5547] font-semibold mt-2'>Weakness distribution for reddit VoC data</p>
                        </div>
                        <div className='m-auto flex flex-col justify-center bg-gray-200 rounded-lg w-full'>
                            <Plot data={redditdatapointO} layout={layout} className='w-full' />
                            <p className='text-center text-[#5C5547] font-semibold mt-2'>Oppourtunities distribution for reddit VoC data</p>
                        </div>
                        <div className='m-auto flex flex-col justify-center bg-gray-200 rounded-lg w-full'>
                            <Plot data={redditdatapointT} layout={layout} className='w-full' />
                            <p className='text-center text-[#5C5547] font-semibold mt-2'>Threats distribution for reddit VoC data</p>
                        </div>
                    </div>
                </section>
            )}


        </div>
    );
}

