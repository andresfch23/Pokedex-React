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
            <RadarChart cx={325} cy={250} outerRadius={170} width={600} height={600} data={this.props.data} className={this.props.className} >
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar name={this.props.name} dataKey="base_stat" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
        )
    }
}

export default Chart;