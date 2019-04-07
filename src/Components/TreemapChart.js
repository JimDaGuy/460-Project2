import React, { Component } from "react";
import ReactDOM from "react-dom";
import TreemapChartStyles from "./TreemapChart.module.scss";
import * as d3 from "d3";
import data from "../data/TreemapChart.csv";

// Source https://bl.ocks.org/denjn5/bb835c4fb8923ee65a13008832d2efed

class TreemapChart extends Component {
  componentDidMount() {
    d3.csv(data, d => {
      return {
        id: d.id,
        parentId: d.parentId,
        size: parseInt(d.size)
      };
    })
      .then(data => {
        const treemapData = d3.stratify()(data);
        this.visualizeData(treemapData);
      })
      .catch(error => {
        console.dir(error);
      });
  }

  visualizeData(data) {
    const svgWidth = 600;
    const svgHeight = 600;

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    let treemap = d3
      .treemap()
      .size([svgWidth, svgHeight])
      .padding(15);

    let root = d3.hierarchy(data).sum(d => d.data.size);

    let nodes = root.descendants();

    treemap(root);

    const cScale = d3.scaleOrdinal(d3.schemePastel2);

    // Append slices
    svg
      .selectAll("rect")
      .data(nodes)
      .enter()
      .append("rect")
      .attr("fill", d => cScale(d.depth))
      .attr("x", function(d) {
        return d.x0;
      })
      .attr("y", function(d) {
        return d.y0;
      })
      .attr("width", function(d) {
        return d.x1 - d.x0;
      })
      .attr("height", function(d) {
        return d.y1 - d.y0;
      });

    // Append text for slices
    svg
      .selectAll("text")
      .data(nodes)
      .enter()
      .append("text")
      .style("font-size", "8pt")
      .style("font-weight", d => (d.children ? "bold" : "normal"))
      .attr("x", d => d.x0 + 3)
      .attr("y", d => d.y0 + 12)
      .text(d => d.data.id);
  }

  render() {
    return (
      <div className={TreemapChartStyles.container}>
        <h1 className={TreemapChartStyles.chartType}>Treemap Chart</h1>
        <hr />
        <h2 className={TreemapChartStyles.chartH2}>Summary</h2>
        <p className={TreemapChartStyles.p}>
          Describes the type of chart and its characteristics. Describes what it
          is useful for
        </p>
        <h3 className={TreemapChartStyles.chartH3}>Marks</h3>
        <p className={TreemapChartStyles.p}>Describes the marks</p>
        <h3 className={TreemapChartStyles.chartH3}>Channels</h3>
        <p className={TreemapChartStyles.p}>Describes the channels</p>
        <div className={TreemapChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default TreemapChart;
