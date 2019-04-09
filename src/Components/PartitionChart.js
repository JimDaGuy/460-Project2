import React, { Component } from "react";
import ReactDOM from "react-dom";
import PartitionChartStyles from "./PartitionChart.module.scss";
import * as d3 from "d3";

class PartitionChart extends Component {
  componentDidMount() {
    this.visualizeData();
  }

  visualizeData() {
    const svgWidth = 600;
    const svgHeight = 600;

    const partitionData = {
      name: "Root/Parent",
      children: [
        {
          name: "Child/Parent",
          children: [
            { name: "Child/Leaf" },
            { name: "Child/Leaf" },
            { name: "Child/Leaf" }
          ]
        },
        {
          name: "Child/Parent",
          children: [
            {
              name: "Child/Parent",
              children: [{ name: "Child/Leaf" }]
            }
          ]
        },
        {
          name: "Child/Parent",
          children: [{ name: "Child/Leaf" }, { name: "Child/Leaf" }]
        }
      ]
    };

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    let root = d3.hierarchy(partitionData).count();

    let partition = d3
      .partition()
      .size([svgWidth, svgHeight])
      .padding(1)
      .round(true);

    partition(root);

    const cScale = d3.scaleOrdinal(d3.schemePastel1);

    // Draw nodes
    svg
      .selectAll("rect")
      .data(root.descendants())
      .enter()
      .append("rect")
      .style("fill", d => cScale(d.depth))
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0);

    // Draw node labels
    svg
      .selectAll("text")
      .data(root.descendants())
      .enter()
      .append("text")
      .style("font-size", "10pt")
      .style("font-weight", d => (d.children ? "bold" : "normal"))
      .attr("x", d => d.x0 + 10)
      .attr("y", d => d.y0 + 25)
      .text(d => d.data.name);
  }

  render() {
    return (
      <div className={PartitionChartStyles.container}>
        <h1 className={PartitionChartStyles.chartType}>Partition Chart</h1>
        <hr />
        <h2 className={PartitionChartStyles.chartH2}>Summary</h2>
        <p className={PartitionChartStyles.p}>
          The partition chart can be used to display hierarchical data. The
          color of each rectangle shows the depth of the node and its position
          below the parent node shows its relationship to it.
        </p>
        <h3 className={PartitionChartStyles.chartH3}>Marks</h3>
        <ul>
          <li>Lines/Rectangles</li>
        </ul>
        <h3 className={PartitionChartStyles.chartH3}>Channels</h3>
        <ul>
          <li>Spacial Region (Identity)</li>
          <li>Color Hue (Identity)</li>
        </ul>
        <div className={PartitionChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default PartitionChart;
