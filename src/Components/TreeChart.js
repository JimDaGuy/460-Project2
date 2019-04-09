import React, { Component } from "react";
import ReactDOM from "react-dom";
import TreeChartStyles from "./TreeChart.module.scss";
import * as d3 from "d3";

class TreeChart extends Component {
  componentDidMount() {
    this.visualizeData();
  }

  visualizeData() {
    const svgWidth = 500;
    const svgHeight = 500;
    const chartIndent = 50;

    let treeData = {
      name: "First 1",
      children: [
        {
          name: "Second 2",
          children: [
            { name: "Child1" },
            { name: "Child2" },
            { name: "Child3" },
            { name: "Child4" }
          ]
        },
        {
          name: "Third 3"
        },
        {
          name: "Fourth 4",
          children: [{ name: "Child1" }]
        }
      ]
    };

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    let root = d3.hierarchy(treeData);

    let tree = d3
      .tree()
      .size([svgHeight - chartIndent * 2, svgWidth - chartIndent * 2]);

    tree(root);

    // Links
    svg
      .selectAll(".link")
      .data(root.links())
      .enter()
      .append("g")
      .append("line")
      .attr("stroke", "lightblue")
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)
      .attr("transform", `translate(${chartIndent}, ${chartIndent})`);

    // Nodes
    svg
      .selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .append("circle")
      .attr("fill", "blue")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 4)
      .attr("transform", `translate(${chartIndent}, ${chartIndent})`);

    // Labels
    svg
      .selectAll("text")
      .data(root.descendants())
      .enter()
      .append("text")
      .style("font-size", ".7em")
      .style("text-anchor", "middle")
      .attr("x", d => d.x)
      .attr("y", d => (d.children == null ? d.y + 15 : d.y - 5))
      .attr("transform", `translate(${chartIndent}, ${chartIndent})`)
      .text(d => d.data.name);
  }

  render() {
    return (
      <div className={TreeChartStyles.container}>
        <h1 className={TreeChartStyles.chartType}>Tree Chart</h1>
        <hr />
        <h2 className={TreeChartStyles.chartH2}>Summary</h2>
        <p className={TreeChartStyles.p}>
          The tree chart can be used to display hierarchical data using points
          and connections between that data using lines. The tree chart tells a
          slightly different story from the cluster chart because it determines
          the height of each node based on its depth in the hierarchy of the
          data.
        </p>
        <h3 className={TreeChartStyles.chartH3}>Marks</h3>
        <ul>
          <li>Points/Nodes</li>
          <li>Lines/Connections</li>
        </ul>
        <h3 className={TreeChartStyles.chartH3}>Channels</h3>
        <ul>
          <li>Line Connection (Identity)</li>
        </ul>
        <div className={TreeChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default TreeChart;
