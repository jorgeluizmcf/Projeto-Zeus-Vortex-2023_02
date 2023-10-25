import React from 'react';
import { View } from 'react-native';
import Svg, { Circle, G, Path, Text } from 'react-native-svg';
import * as d3 from 'd3-shape';

export default class DonutChart extends React.Component {
  render() {
    const { data, width, height } = this.props;
    const pie = d3
      .pie()
      .value((d) => d.price)
      .sort(null);

    const arcs = pie(data);

    const radius = Math.min(width, height) / 2;

    const arc = d3
      .arc()
      .innerRadius(radius / 2)
      .outerRadius(radius);

    const color = d3.scaleOrdinal().range(['#ff5733', '#33ff57', '#5733ff', '#ff33f3']);

    return (
      <View>
        <Svg width={width} height={height}>
          <G transform={`translate(${width / 2},${height / 2})`}>
            {arcs.map((d, i) => (
              <Path key={i} d={arc(d)} fill={color(i)} />
            ))}
          </G>
        </Svg>
      </View>
    );
  }
}
