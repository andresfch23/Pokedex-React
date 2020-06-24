import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    Radar,
    RadarChart,
    PolarGrid,
    ResponsiveContainer,
    PolarAngleAxis,
    PolarRadiusAxis
} from 'recharts';

class Chart extends Component {
    render() {
        return (
            <div className="pokemon__chart">
                <h2 className="pokemon__chart-title">Stats</h2>
                <ResponsiveContainer  height={300}>
                    <RadarChart data={this.props.data} className={this.props.className} >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="name" />
                        <PolarRadiusAxis />
                        <Radar name={this.props.name} dataKey="base_stat" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        )
    }
}

export default Chart;

Chart.propTypes = {
    data: PropTypes.array,
    className: PropTypes.string,
    name: PropTypes.string
}