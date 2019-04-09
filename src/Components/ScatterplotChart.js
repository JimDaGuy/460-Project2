import React, { Component } from "react";
import ReactDOM from "react-dom";
import ScatterplotChartStyles from "./ScatterplotChart.module.scss";
import * as d3 from "d3";
import data from "../data/ScatterplotChart.csv";

class ScatterplotChart extends Component {
  componentDidMount() {
    d3.csv(data, d => {
      return {
        height: parseInt(d.height),
        weight: parseInt(d.weight)
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
    const svgHeight = 500;
    const chartIndent = 50;

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    // Plotting data
    let xScale = d3
      .scaleLinear()
      .domain([
        d3.min(dataset, d => d.weight) - 10,
        d3.max(dataset, d => d.weight) + 10
      ])
      .range([chartIndent, svgWidth - chartIndent]);

    let yScale = d3
      .scaleLinear()
      .domain([
        d3.min(dataset, d => d.height) - 4,
        d3.max(dataset, d => d.height) + 4
      ])
      .range([svgHeight - chartIndent, chartIndent]);

    svg
      .selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", d => xScale(d.weight))
      .attr("cy", d => yScale(d.height))
      .attr("r", 5)
      .attr("fill", "orange");

    // Axes
    svg
      .append("g")
      .attr("class", ScatterplotChartStyles.xAxis)
      .attr("transform", `translate(0, ${svgHeight - chartIndent})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("class", ScatterplotChartStyles.yAxis)
      .attr("transform", `translate(${chartIndent}, 0 )`)
      .call(d3.axisLeft(yScale).tickFormat(d => `${d}''`));

    // Axis Labels
    svg
      .append("text")
      .text("Weight (lbs)")
      .attr("text-anchor", "middle")
      .style("text-align", "center")
      .style("alignment-baseline", "middle")
      .attr("transform", `translate(${svgWidth / 2},${svgHeight - 15})`);

    svg
      .append("text")
      .text("Height (in)")
      .attr("text-anchor", "middle")
      .style("text-align", "center")
      .style("alignment-baseline", "middle")
      .attr("transform", `translate(15,${svgHeight / 2}) rotate(270)`);
  }

  render() {
    return (
      <div className={ScatterplotChartStyles.container}>
        <h1 className={ScatterplotChartStyles.chartType}>Scatterplot Chart</h1>
        <hr />
        <h2 className={ScatterplotChartStyles.chartH2}>Summary</h2>
        <p className={ScatterplotChartStyles.p}>
          The scatterplot chart can be used to display values for two different
          sets of data. This is good for showing correlation between the two
          sets.
        </p>
        <h3 className={ScatterplotChartStyles.chartH3}>Marks</h3>
        <ul>
          <li>Points</li>
        </ul>
        <h3 className={ScatterplotChartStyles.chartH3}>Channels</h3>
        <ul>
          <li>Vertical Length (Magnitude)</li>
          <li>Horizontal Length (Magnitude)</li>
        </ul>
        <div className={ScatterplotChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default ScatterplotChart;
