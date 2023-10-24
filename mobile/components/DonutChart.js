import React, { Component } from 'react';
import { View } from 'react-native';
import { ART } from '@react-native-community/art';
import * as d3 from 'd3';

const { Surface, Group, Shape } = ART;

export default class DonutChart extends Component {
  render() {
    const { data, width, height } = this.props;

    const colors = d3.scaleSequential(d3.interpolateRainbow)
      .domain([0, data.length]);

    const sectionAngles = d3.pie().value(d => d.price)(data);

    const path = d3.arc()
      .outerRadius(Math.min(width, height) / 2 - 10)
      .padAngle(0.05)
      .innerRadius(Math.min(width, height) / 4);

    return (
      <View>
        <Surface width={width} height={height}>
          <Group x={width / 2} y={height / 2}>
            {sectionAngles.map((section, index) => (
              <Shape
                key={index}
                d={path(section)}
                stroke="white"
                fill={colors(index)}
              />
            ))}
          </Group>
        </Surface>
      </View>
    );
  }
}
