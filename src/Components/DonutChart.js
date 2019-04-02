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
    const svgHeight = 500;

    dataset.sort((a, b) => b.count - a.count);
    console.dir(dataset);

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    let pie = d3.pie().value(d => d.count);

    // create D3 arc generator we will use for pie layout
    let arc = d3
      .arc()
      .innerRadius((svgWidth - 80) / 2 - 100)
      .outerRadius((svgWidth - 80) / 2);

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
      .attr("transform", `translate(${svgWidth / 2}, ${svgHeight / 2})`);

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
        <p className={DonutChartStyles.p}>Describes the marks</p>
        <h3 className={DonutChartStyles.chartH3}>Channels</h3>
        <p className={DonutChartStyles.p}>Describes the channels</p>
        <div className={DonutChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default DonutChart;
