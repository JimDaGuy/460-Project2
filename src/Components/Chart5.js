import React, { Component } from "react";
import ReactDOM from "react-dom";
import ChartStyles from "./Chart4.module.scss";
import * as d3 from "d3";
import data from "../data/fake_app_download_rating.csv";

class Chart4 extends Component {
  componentDidMount() {
    d3.csv(data, d => {
      return {
        app_name: d.app_name,
        downloads: parseInt(d.downloads),
        average_rating: parseFloat(d.average_rating),
        thirty_day_keep: parseFloat(d.thirty_day_keep)
      };
    })
      .then(csvData => {
        this.svgCSV(csvData);
      })
      .catch(error => {
        console.dir(error);
      });
  }

  svgCSV(dataset) {
    const svgWidth = 650;
    const svgHeight = dataset.length * 28;

    dataset.sort((a, b) => b.thirty_day_keep - a.thirty_day_keep);

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`)
      .attr("class", ChartStyles.chart4);

    let xScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d.downloads)])
      .range([0, svgWidth - 150]);

    let yScale = d3
      .scaleLinear()
      .domain([d3.min(dataset, d => d.thirty_day_keep), 100])
      .range([svgHeight - 40, 20]);

    let areaScale = d3
      .scaleSqrt()
      .domain([0, d3.max(dataset, d => d.thirty_day_keep)])
      .range([3, 8]);

    svg
      .selectAll("circle")
      .data(dataset)
      .enter()
      .append("circle")
      .attr("cx", d => 80 + xScale(d.downloads))
      .attr("cy", d => yScale(d.thirty_day_keep))
      .attr("r", d => areaScale(d.thirty_day_keep))
      .attr("fill", "#FF60CF");

    svg
      .selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .attr("x", d => 80 + xScale(d.downloads))
      .attr("y", d => yScale(d.thirty_day_keep))
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .text(d => d.app_name);

    // Axes
    svg
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate(80, ${svgHeight - 20})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("class", "yAxis")
      .attr("transform", `translate(80,0 )`)
      .call(d3.axisLeft(yScale).tickFormat(d => d + "%"));
  }

  render() {
    return <div className={ChartStyles.d3Content} ref="d3Content" />;
  }
}

export default Chart4;
