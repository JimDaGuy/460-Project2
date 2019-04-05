import React, { Component } from "react";
import ReactDOM from "react-dom";
import ChordChartStyles from "./ChordChart.module.scss";
import * as d3 from "d3";
import data from "../data/ChordChart.csv";

class ChordChart extends Component {
  componentDidMount() {
    d3.csv(data, d => {
      return {
        name: d.name,
        wins: parseInt(d.wins)
      };
    })
      .then(data => {
        this.visualizeData();
      })
      .catch(error => {
        console.dir(error);
      });
  }

  visualizeData() {
    // Reference code https://blockbuilder.org/mbostock/4062006
    const svgWidth = 500;
    const svgHeight = 600;
    const legendHeight = 100;
    const chartIndent = 50;
    const chordRingWidth = 30;
    const padDegrees = 2;
    const legendPaddingX = 30;
    const legendPaddingY = 10;
    const boxSize = 30;
    const textToBoxPadding = 5;

    const categories = [
      "Instagram",
      "Facebook",
      "Twitter",
      "Snapchat",
      "Reddit"
    ];
    const dataset = [
      [27, 34, 12, 23, 16],
      [34, 33, 5, 12, 21],
      [46, 10, 23, 2, 30],
      [65, 24, 10, 13, 5],
      [10, 3, 4, 18, 10]
    ];

    let cScale = d3
      .scaleOrdinal()
      .domain(d3.range(categories.length))
      .range(d3.schemePastel1);

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    // Plotting data
    const chord = d3
      .chord()
      .padAngle((padDegrees / 360) * 2 * Math.PI)
      .sortChords(d3.descending);

    const arc = d3
      .arc()
      .innerRadius(svgWidth / 2 - chartIndent - chordRingWidth)
      .outerRadius(svgWidth / 2 - chartIndent);

    const ribbon = d3
      .ribbon()
      .radius(svgWidth / 2 - chartIndent - chordRingWidth);

    const g = svg
      .append("g")
      .attr(
        "transform",
        `translate(${svgWidth / 2}, ${(svgHeight - legendHeight) / 2})`
      )
      .datum(chord(dataset));

    const group = g
      .append("g")
      .attr("class", "groups")
      .selectAll("g")
      .data(d => d.groups)
      .enter()
      .append("g");

    group
      .append("path")
      .style("fill", (d, i) => cScale(d.index))
      .style("stroke", (d, i) => d3.rgb(cScale(d.index)).darker())
      .attr("d", arc)
      .append("title")
      .text(d => `${categories[d.index]}: ${d.value}`);

    // Add ribbons
    g.append("g")
      .attr("class", "ribbons")
      .selectAll("path")
      .data(d => d)
      .enter()
      .append("path")
      .attr("d", ribbon)
      .style("fill", (d, i) => cScale(d.target.index))
      .style("stroke", (d, i) => d3.rgb(cScale(d.target.index)).darker())
      .append("title")
      .text(
        d =>
          `${categories[d.source.index]}->${categories[d.target.index]}: ${
            d.target.value
          }`
      );

    // Create Legend

    // Boxes
    svg
      .selectAll(".bop")
      .data(categories)
      .enter()
      .append("rect")
      .attr("x", (d, i) => {
        // Get index matching three legend items per row
        const indexWithRows = i % 3;
        const paddedWidth = svgWidth - chartIndent * 2;
        const x =
          chartIndent + legendPaddingX + (indexWithRows * paddedWidth) / 3;
        return x;
      })
      .attr("y", (d, i) => {
        const initialHeight = svgHeight - legendHeight + legendPaddingY;
        const row = Math.floor(i / 3);
        const height = initialHeight + row * (30 + legendPaddingY);
        return height;
      })
      .attr("width", boxSize)
      .attr("height", boxSize)
      .attr("fill", (d, i) => {
        const colors = d3.schemePastel1;
        return colors[i % d.length];
      });

    // Text
    svg
      .selectAll(".dop")
      .data(categories)
      .enter()
      .append("text")
      .text(d => d)
      .attr("transform", (d, i) => {
        // Get index matching three legend items per row
        const indexWithRows = i % 3;
        const paddedWidth = svgWidth - chartIndent * 2;
        const x =
          chartIndent +
          legendPaddingX +
          boxSize +
          textToBoxPadding +
          (indexWithRows * paddedWidth) / 3;

        const initialHeight = svgHeight - legendHeight + legendPaddingY;
        const row = Math.floor(i / 3);
        const y = initialHeight + 15 + row * (30 + legendPaddingY);

        return `translate(${x},${y})`;
      })
      .style("alignment-baseline", "middle")
      .style("text-align", "left");
  }

  render() {
    return (
      <div className={ChordChartStyles.container}>
        <h1 className={ChordChartStyles.chartType}>Chord Chart</h1>
        <hr />
        <h2 className={ChordChartStyles.chartH2}>Summary</h2>
        <p className={ChordChartStyles.p}>
          Describes the type of chart and its characteristics. Describes what it
          is useful for
        </p>
        <h3 className={ChordChartStyles.chartH3}>Marks</h3>
        <p className={ChordChartStyles.p}>Describes the marks</p>
        <h3 className={ChordChartStyles.chartH3}>Channels</h3>
        <p className={ChordChartStyles.p}>Describes the channels</p>
        <div className={ChordChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default ChordChart;
