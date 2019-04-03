import React, { Component } from "react";
import ReactDOM from "react-dom";
import PieChartStyles from "./PieChart.module.scss";
import * as d3 from "d3";
import data from "../data/PieChart.csv";

class PieChart extends Component {
  componentDidMount() {
    d3.csv(data, d => {
      return {
        pet: d.pet,
        count: parseInt(d.count)
      };
    })
      .then(data => {
        this.visualizeData(data);
      })
      .catch(error => {
        console.dir(error);
      });
  }

  visualizeData(dataset) {
    const svgWidth = 500;
    const svgHeight = 600;
    const legendHeight = 100;
    const pieIndent = 40;
    const legendPaddingX = 30;
    const legendPaddingY = 10;
    const boxSize = 30;
    const textToBoxPadding = 5;

    dataset.sort((a, b) => b.count - a.count);

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    let pie = d3.pie().value(d => d.count);

    // create D3 arc generator we will use for pie layout
    let arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius((svgWidth - pieIndent * 2) / 2);

    // use a color scale for the bar colors
    // ordinal scales created given an array of output range values
    // usually used by giving input indices into array
    let cScale = d3.scaleOrdinal(d3.schemeSet1);

    let arcs = svg
      .selectAll("g.arc")
      .data(pie(dataset))
      .enter()
      .append("g")
      .attr("class", "arc")
      .attr(
        "transform",
        `translate(${svgWidth / 2}, ${(svgHeight - legendHeight) / 2})`
      );

    // append an SVG path to each g element for the pie wedge
    // uses the arc generator we configured earlier
    arcs
      .append("path")
      .attr("fill", (d, i) => cScale(i))
      .attr("d", arc)
      .append("title")
      .text(d => `${d.data.pet}: ${d.data.count}`);

    // now append text elements to each 'g' pie wedge
    arcs
      .append("text")
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("text-anchor", "middle")
      .text(d => d.value);

    // Create Legend

    // Boxes
    svg
      .selectAll(".bop")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", (d, i) => {
        // Get index matching three legend items per row
        const indexWithRows = i % 3;
        const paddedWidth = svgWidth - pieIndent * 2;
        const x =
          pieIndent + legendPaddingX + (indexWithRows * paddedWidth) / 3;
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
        const colors = d3.schemeSet1;
        return colors[i % dataset.length];
      });

    // Text
    svg
      .selectAll(".dop")
      .data(dataset)
      .enter()
      .append("text")
      .text((d, i) => d.pet)
      .attr("transform", (d, i) => {
        // Get index matching three legend items per row
        const indexWithRows = i % 3;
        const paddedWidth = svgWidth - pieIndent * 2;
        const x =
          pieIndent +
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
      <div className={PieChartStyles.container}>
        <h1 className={PieChartStyles.chartType}>Pie Chart</h1>
        <hr />
        <h2 className={PieChartStyles.chartH2}>Summary</h2>
        <p className={PieChartStyles.p}>
          Describes the type of chart and its characteristics. Describes what it
          is useful for
        </p>
        <h3 className={PieChartStyles.chartH3}>Marks</h3>
        <p className={PieChartStyles.p}>Describes the marks</p>
        <h3 className={PieChartStyles.chartH3}>Channels</h3>
        <p className={PieChartStyles.p}>Describes the channels</p>
        <div className={PieChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default PieChart;
