import React, { Component } from "react";
import ReactDOM from "react-dom";
import TemplateStyles from "./Template.module.scss";
import * as d3 from "d3";
import data from "../data/template.csv";

class Template extends Component {
  componentDidMount() {
    d3.csv(data, d => {
      return {};
    })
      .then(data => {
        this.visualizeData(data);
      })
      .catch(error => {
        console.dir(error);
      });
  }

  visualizeData(dataset) {
    const svgWidth = 650;
    const svgHeight = 550;

    // dataset.sort((a, b) => b.downloads - a.downloads);

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    // Plotting data
    /*
    let xScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d.downloads)])
      .range([0, svgWidth - 100]);

    let yScale = d3
      .scaleBand()
      .domain(dataset.map(d => d.app_name))
      .rangeRound([20, svgHeight - 40]);

    let colorScale = d3
      .scaleLinear()
      .domain([4.5, 5])
      .range(["#C588FF", "#7016C7"]);

    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("x", 80)
      .attr("y", d => yScale(d.app_name) + 2)
      .attr("width", d => xScale(d.downloads))
      .attr("height", 20)
      .attr("fill", d => colorScale(d.average_rating));

    // Axes
    svg
      .append("g")
      .attr("class", "xAxis")
      .attr("transform", `translate(80, ${svgHeight - 20})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("class", ChartStyles.yAxis)
      .attr("transform", `translate(80,0 )`)
      .call(d3.axisLeft(yScale));
      
    */
  }

  render() {
    return <div className={TemplateStyles.d3Content} ref="d3Content" />;
  }
}

export default Template;
