import React, { Component } from "react";
import ReactDOM from "react-dom";
import AreaChartStyles from "./AreaChart.module.scss";
import * as d3 from "d3";
import data from "../data/AreaChart.csv";

class AreaChart extends Component {
  componentDidMount() {
    d3.csv(data, d => {
      return {
        growth: parseFloat(d.growth),
        date: new Date(parseInt(d.year), parseInt(d.month))
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

    dataset.sort((a, b) => a.date - b.date);

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    // Plotting data
    let xScale = d3
      .scaleTime()
      .domain(d3.extent(dataset, d => d.date))
      .rangeRound([chartIndent, svgWidth - chartIndent]);

    let yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d.growth)])
      .range([svgHeight - chartIndent, chartIndent]);

    let area = d3
      .area()
      .x(d => xScale(d.date))
      .y0(svgHeight - chartIndent)
      .y1(d => yScale(d.growth));

    svg
      .append("path")
      .data([dataset])
      .attr("class", "area")
      .attr("d", area)
      .attr("fill", "lightgreen");

    // Axes
    svg
      .append("g")
      .attr("class", AreaChartStyles.xAxis)
      .attr("transform", `translate(0, ${svgHeight - chartIndent})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("class", AreaChartStyles.yAxis)
      .attr("transform", `translate(${chartIndent}, 0 )`)
      .call(d3.axisLeft(yScale).tickFormat(d => `${d}%`));

    // Axis Labels
    svg
      .append("text")
      .text("Date")
      .attr("text-anchor", "middle")
      .style("text-align", "center")
      .style("alignment-baseline", "middle")
      .attr("transform", `translate(${svgWidth / 2},${svgHeight - 15})`);

    svg
      .append("text")
      .text("Growth")
      .attr("text-anchor", "middle")
      .style("text-align", "center")
      .style("alignment-baseline", "middle")
      .attr("transform", `translate(10 ,${svgHeight / 2}) rotate(270)`);
  }

  render() {
    return (
      <div className={AreaChartStyles.container}>
        <h1 className={AreaChartStyles.chartType}>Area Chart</h1>
        <hr />
        <h2 className={AreaChartStyles.chartH2}>Summary</h2>
        <p className={AreaChartStyles.p}>
          The area chart is often used to show data values over the course of
          time. While it is similar to the line chart, the plain area chart only
          displays one category of data over time.
        </p>
        <h3 className={AreaChartStyles.chartH3}>Marks</h3>
        <ul>
          <li>Area</li>
        </ul>
        <h3 className={AreaChartStyles.chartH3}>Channels</h3>
        <ul>
          <li>Vertical/Horizontal position of points (Magnitude)</li>
          <li>Slope/Tilt (Magnitude)</li>
        </ul>
        <div className={AreaChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default AreaChart;
