import React, { Component } from 'react';

import {
    Radar,
    RadarChart,
    PolarGrid,
    Legend,
    PolarAngleAxis,
    PolarRadiusAxis
} from 'recharts';

class Chart extends Component {
    render() {
        return (
            <div className="pokemon__chart">
                <h2 className="pokemon__chart-title">Stats</h2>
                <RadarChart cx={300} cy={200} outerRadius={170} width={600} height={440} data={this.props.data} className={this.props.className} >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis />
                    <Radar name={this.props.name} dataKey="base_stat" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                </RadarChart>
            </div>
        )
    }
}

export default Chart;