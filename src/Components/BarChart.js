import React, { Component } from "react";
import ReactDOM from "react-dom";
import BarChartStyles from "./BarChart.module.scss";
import * as d3 from "d3";
import data from "../data/BarChart.csv";

class BarChart extends Component {
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

    dataset.sort((a, b) => a.wins - b.wins);

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    // Plotting data
    let xScale = d3
      .scaleBand()
      .domain(dataset.map(d => d.name))
      .rangeRound([40, svgWidth - 40])
      .padding(0.15)
      .align(0.1);

    let yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d.wins)])
      .range([svgHeight - 40, 40]);

    svg
      .selectAll("rect")
      .data(dataset, d => d.name)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.name))
      .attr("y", d => yScale(d.wins))
      .attr("width", xScale.bandwidth())
      .attr("height", d => svgHeight - 40 - yScale(d.wins))
      .attr("fill", "orange")
      .attr("stroke", "black");

    // Axes
    svg
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate(0, ${svgHeight - 40})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("class", BarChartStyles.yAxis)
      .attr("transform", `translate(40, 0 )`)
      .call(d3.axisLeft(yScale));

    // Axis Labels
    svg
      .append("text")
      .text("Person")
      .attr("text-anchor", "middle")
      .style("text-align", "center")
      .style("alignment-baseline", "middle")
      .attr("transform", `translate(${svgWidth / 2},${svgHeight - 10})`);

    svg
      .append("text")
      .text("Wins")
      .attr("text-anchor", "middle")
      .style("text-align", "center")
      .style("alignment-baseline", "middle")
      .attr("transform", `translate(10 ,${svgHeight / 2}) rotate(270)`);
  }

  render() {
    return (
      <div className={BarChartStyles.container}>
        <h1 className={BarChartStyles.chartType}>Bar Chart</h1>
        <hr />
        <h2 className={BarChartStyles.chartH2}>Summary</h2>
        <p className={BarChartStyles.p}>
          The bar chart is a very basic and fairly straightforward chart. Bar
          charts are useful for the comparison of values among different
          categories or times.
        </p>
        <h3 className={BarChartStyles.chartH3}>Marks</h3>
        <ul>
          <li>Lines/Bars</li>
        </ul>
        <h3 className={BarChartStyles.chartH3}>Channels</h3>
        <ul>
          <li>Vertical Length (Magnitude)</li>
        </ul>
        <div className={BarChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default BarChart;
