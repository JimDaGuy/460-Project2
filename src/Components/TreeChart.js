import React, { Component } from "react";
import ReactDOM from "react-dom";
import TreeChartStyles from "./TreeChart.module.scss";
import * as d3 from "d3";

// Source : https://codepen.io/netkuy/pen/qZGdoj?editors=1010

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
          name: "Third 3",
          children: [{ name: "Child1" }, { name: "Child2" }, { name: "Child3" }]
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
          Describes the type of chart and its characteristics. Describes what it
          is useful for
        </p>
        <h3 className={TreeChartStyles.chartH3}>Marks</h3>
        <ul>
          <li>Lines/Bars</li>
        </ul>
        <h3 className={TreeChartStyles.chartH3}>Channels</h3>
        <ul>
          <li>Vertical Length (Magnitude)</li>
        </ul>
        <div className={TreeChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default TreeChart;
