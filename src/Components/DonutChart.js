import React, { Component } from "react";
import ReactDOM from "react-dom";
import DonutChartStyles from "./DonutChart.module.scss";
import * as d3 from "d3";
import data from "../data/DonutChart.csv";

class DonutChart extends Component {
  componentDidMount() {
    d3.csv(data, d => {
      return {
        donut: d.donut,
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
    const donutIndent = 40;
    const donutWidth = 100;
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
      .innerRadius((svgWidth - donutIndent * 2) / 2 - donutWidth)
      .outerRadius((svgWidth - donutIndent * 2) / 2);

    // use a color scale for the bar colors
    // ordinal scales created given an array of output range values
    // usually used by giving input indices into array
    let cScale = d3.scaleOrdinal(d3.schemeDark2);

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
      .text(d => `${d.data.donut}: ${d.data.count}`);

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
        const paddedWidth = svgWidth - donutIndent * 2;
        const x =
          donutIndent + legendPaddingX + (indexWithRows * paddedWidth) / 3;
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
        const colors = d3.schemeDark2;
        return colors[i % dataset.length];
      });

    // Text
    svg
      .selectAll(".dop")
      .data(dataset)
      .enter()
      .append("text")
      .text((d, i) => d.donut)
      .attr("transform", (d, i) => {
        // Get index matching three legend items per row
        const indexWithRows = i % 3;
        const paddedWidth = svgWidth - donutIndent * 2;
        const x =
          donutIndent +
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
      <div className={DonutChartStyles.container}>
        <h1 className={DonutChartStyles.chartType}>Donut Chart</h1>
        <hr />
        <h2 className={DonutChartStyles.chartH2}>Summary</h2>
        <p className={DonutChartStyles.p}>
          Describes the type of chart and its characteristics. Describes what it
          is useful for
        </p>
        <h3 className={DonutChartStyles.chartH3}>Marks</h3>
        <ul>
          <li>Lines/Bars</li>
        </ul>
        <h3 className={DonutChartStyles.chartH3}>Channels</h3>
        <ul>
          <li>Vertical Length (Magnitude)</li>
        </ul>
        <div className={DonutChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default DonutChart;
