import React, { Component } from "react";
import ReactDOM from "react-dom";
import MapChartStyles from "./MapChart.module.scss";
import * as d3 from "d3";

class MapChart extends Component {
  componentDidMount() {
    d3.json("newyork.json").then(data => {
      this.visualizeData(data);
    });
  }

  visualizeData(geojson) {
    const svgWidth = 500;
    const svgHeight = 500;

    let points = [
      {
        name: "Rochester",
        coords: [-77.6088, 43.1566]
      },
      {
        name: "Syracuse",
        coords: [-76.1474, 43.0481]
      },
      {
        name: "Buffalo",
        coords: [-78.8784, 42.8864]
      },
      {
        name: "Albany",
        coords: [-73.7562, 42.6526]
      }
    ];

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    let projection = d3
      .geoTransverseMercator()
      .rotate([76 + 35 / 60, -40])
      .scale([4700])
      .translate([200, 500]);

    let path = d3.geoPath().projection(projection);

    // Draw counties
    svg
      .selectAll("path")
      .data(geojson.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "lightgray")
      .attr("stroke", "white");

    // Plot city points
    svg
      .selectAll("circle")
      .data(points)
      .enter()
      .append("circle")
      .attr("cx", d => projection(d.coords)[0])
      .attr("cy", d => projection(d.coords)[1])
      .attr("r", "5px")
      .attr("fill", "red");

    // Plot city point text
    svg
      .selectAll("text")
      .data(points)
      .enter()
      .append("text")
      .style("font-size", "1em")
      .style("font-weight", "bold")
      .style("text-anchor", "middle")
      .style("cursor", "default")
      .attr("x", d => projection(d.coords)[0])
      .attr("y", d => projection(d.coords)[1] - 5)
      .text(d => d.name);
  }

  render() {
    return (
      <div className={MapChartStyles.container}>
        <h1 className={MapChartStyles.chartType}>Map Chart</h1>
        <hr />
        <h2 className={MapChartStyles.chartH2}>Summary</h2>
        <p className={MapChartStyles.p}>
          The map chart can be used to display the location of different places.
          The shape of each piece of land helps the viewer develop a frame of
          reference for the plotted locations.
        </p>
        <h3 className={MapChartStyles.chartH3}>Marks</h3>
        <ul>
          <li>Areas/States</li>
          <li>Points/Cities</li>
        </ul>
        <h3 className={MapChartStyles.chartH3}>Channels</h3>
        <ul>
          <li>Shape (Identity)</li>
        </ul>
        <div className={MapChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default MapChart;
