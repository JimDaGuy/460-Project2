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
    const svgHeight = 450;

    dataset.sort((a, b) => a.date - b.date);
    console.dir(dataset);

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    // Plotting data
    let xScale = d3
      .scaleTime()
      .domain(d3.extent(dataset, d => d.date))
      .rangeRound([40, svgWidth - 40]);

    let yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d.growth)])
      .range([svgHeight - 40, 40]);

    let area = d3
      .area()
      .x(d => xScale(d.date))
      .y0(svgHeight - 40)
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
      .attr("transform", `translate(0, ${svgHeight - 40})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("class", AreaChartStyles.yAxis)
      .attr("transform", `translate(40, 0 )`)
      .call(d3.axisLeft(yScale).tickFormat(d => `${d}%`));

    // Axis Labels
    svg
      .append("text")
      .text("Date")
      .attr("text-anchor", "middle")
      .style("text-align", "center")
      .style("alignment-baseline", "middle")
      .attr("transform", `translate(${svgWidth / 2},${svgHeight - 10})`);

    svg
      .append("text")
      .text("Growth")
      .attr("text-anchor", "middle")
      .style("text-align", "center")
      .style("alignment-baseline", "middle")
      .attr("transform", `translate(10 ,${svgHeight / 2}) rotate(270)`);

    /*
    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", svgHeight - 20)
      .attr("width", svgWidth / 2)
      .attr("height", 20);
      */
  }

  render() {
    return (
      <div className={AreaChartStyles.container}>
        <h1 className={AreaChartStyles.chartType}>Area Chart</h1>
        <hr />
        <h2 className={AreaChartStyles.chartH2}>Summary</h2>
        <p className={AreaChartStyles.p}>
          Describes the type of chart and its characteristics. Describes what it
          is useful for
        </p>
        <h3 className={AreaChartStyles.chartH3}>Marks</h3>
        <p className={AreaChartStyles.p}>Describes the marks</p>
        <h3 className={AreaChartStyles.chartH3}>Channels</h3>
        <p className={AreaChartStyles.p}>Describes the channels</p>
        <div className={AreaChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default AreaChart;
