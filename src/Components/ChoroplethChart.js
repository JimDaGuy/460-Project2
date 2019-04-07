import React, { Component } from "react";
import ReactDOM from "react-dom";
import ChoroplethChartStyles from "./ChoroplethChart.module.scss";
import * as d3 from "d3";
import data from "../data/ChoroplethChart.csv";

// Source: http://bl.ocks.org/michellechandra/0b2ce4923dc9b5809922

class ChoroplethChart extends Component {
  componentDidMount() {
    d3.csv(data, d => {
      return {
        state: d.state,
        value: parseInt(d.value)
      };
    })
      .then(stateData => {
        console.dir(stateData);
        d3.json("us-states.json")
          .then(geojson => {
            console.dir(geojson);
            this.visualizeData(geojson, stateData);
          })
          .catch(error => {
            console.dir(error);
          });
      })
      .catch(error => {
        console.dir(error);
      });
  }

  visualizeData(geojson, stateData) {
    const svgWidth = 500;
    const svgHeight = 500;
    const legendWidth = 350;
    const legendHeight = 30;

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    let projection = d3
      .geoAlbersUsa()
      .translate([svgWidth / 2, svgHeight / 2])
      .scale([650]);

    let path = d3.geoPath().projection(projection);

    let maxValue = d3.max(stateData, d => d.value);

    let cScale = d3
      .scaleLinear()
      .domain([
        0,
        maxValue * 0.2,
        maxValue * 0.4,
        maxValue * 0.6,
        maxValue * 0.8,
        maxValue
      ])
      .range([
        "#4d9221",
        "#a1d76a",
        "#e6f5d0",
        "#fde0ef",
        "#e9a3c9",
        "#c51b7d"
      ]);

    svg
      .selectAll("path")
      .data(geojson.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", d => {
        for (let i = 0; i < stateData.length; i++) {
          if (d.properties.NAME === stateData[i].state)
            return cScale(stateData[i].value);
        }
        return "lightgray";
      })
      .attr("stroke", "black");

    // Create legend
    let legend = svg
      .append("defs")
      .append("svg:linearGradient")
      .attr("id", "gradient")
      .attr("x1", "0%")
      .attr("y1", "100%")
      .attr("x2", "100%")
      .attr("y2", "100%")
      .attr("spreadMethod", "pad");

    legend
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#4d9221")
      .attr("stop-opacity", 1);

    legend
      .append("stop")
      .attr("offset", "20%")
      .attr("stop-color", "#a1d76a")
      .attr("stop-opacity", 1);

    legend
      .append("stop")
      .attr("offset", "40%")
      .attr("stop-color", "#e6f5d0")
      .attr("stop-opacity", 1);

    legend
      .append("stop")
      .attr("offset", "60%")
      .attr("stop-color", "#fde0ef")
      .attr("stop-opacity", 1);

    legend
      .append("stop")
      .attr("offset", "80%")
      .attr("stop-color", "#e9a3c9")
      .attr("stop-opacity", 1);

    legend
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#c51b7d")
      .attr("stop-opacity", 1);

    // Legend Rectangle
    svg
      .append("rect")
      .attr("width", legendWidth)
      .attr("height", legendHeight)
      .style("fill", "url(#gradient)")
      .style("stroke", "black")
      .attr(
        "transform",
        `translate( ${svgWidth / 2 - legendWidth / 2}, ${svgHeight -
          legendHeight -
          10})`
      );

    // Append lower bound text
    svg
      .append("text")
      .attr("x", svgWidth / 2 - legendWidth / 2 + 5)
      .attr("y", svgHeight - legendHeight - 5)
      .attr("dominant-baseline", "hanging")
      .attr("fill", "black")
      .style("font-weight", "bold")
      .text("Value: 0");

    // Append upper bound text
    svg
      .append("text")
      .attr("x", svgWidth / 2 + legendWidth / 2 - 5)
      .attr("y", svgHeight - legendHeight - 5)
      .attr("dominant-baseline", "hanging")
      .attr("text-anchor", "end")
      .attr("fill", "black")
      .style("font-weight", "bold")
      .text(`Value: ${maxValue}`);
  }

  render() {
    return (
      <div className={ChoroplethChartStyles.container}>
        <h1 className={ChoroplethChartStyles.chartType}>Choropleth Chart</h1>
        <hr />
        <h2 className={ChoroplethChartStyles.chartH2}>Summary</h2>
        <p className={ChoroplethChartStyles.p}>
          Describes the type of chart and its characteristics. Describes what it
          is useful for
        </p>
        <h3 className={ChoroplethChartStyles.chartH3}>Marks</h3>
        <p className={ChoroplethChartStyles.p}>Describes the marks</p>
        <h3 className={ChoroplethChartStyles.chartH3}>Channels</h3>
        <p className={ChoroplethChartStyles.p}>Describes the channels</p>
        <div className={ChoroplethChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default ChoroplethChart;
