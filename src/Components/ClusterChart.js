import React, { Component } from "react";
import ReactDOM from "react-dom";
import ClusterChartStyles from "./ClusterChart.module.scss";
import * as d3 from "d3";
import data from "../data/ClusterChart.csv";

class ClusterChart extends Component {
  componentDidMount() {
    d3.csv(data, d => {
      return {
        name: d.name,
        wins: parseInt(d.wins)
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

    console.dir(dataset);

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    // Plotting data
    let xScale = d3
      .scaleBand()
      .domain(dataset.map(d => d.name))
      .rangeRound([chartIndent, svgWidth - chartIndent])
      .padding(0.15)
      .align(0.1);

    let yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d.wins)])
      .range([svgHeight - chartIndent, chartIndent]);

    svg
      .selectAll("rect")
      .data(dataset, d => d.name)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.name))
      .attr("y", d => yScale(d.wins))
      .attr("width", xScale.bandwidth())
      .attr("height", d => svgHeight - chartIndent - yScale(d.wins))
      .attr("fill", "orange")
      .attr("stroke", "black");

    // Axes
    svg
      .append("g")
      .attr("class", ClusterChartStyles.xAxis)
      .attr("transform", `translate(0, ${svgHeight - chartIndent})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("class", ClusterChartStyles.yAxis)
      .attr("transform", `translate(${chartIndent}, 0 )`)
      .call(d3.axisLeft(yScale));
  }

  render() {
    return (
      <div className={ClusterChartStyles.container}>
        <h1 className={ClusterChartStyles.chartType}>Cluster Chart</h1>
        <hr />
        <h2 className={ClusterChartStyles.chartH2}>Summary</h2>
        <p className={ClusterChartStyles.p}>
          Describes the type of chart and its characteristics. Describes what it
          is useful for
        </p>
        <h3 className={ClusterChartStyles.chartH3}>Marks</h3>
        <p className={ClusterChartStyles.p}>Describes the marks</p>
        <h3 className={ClusterChartStyles.chartH3}>Channels</h3>
        <p className={ClusterChartStyles.p}>Describes the channels</p>
        <div className={ClusterChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default ClusterChart;
