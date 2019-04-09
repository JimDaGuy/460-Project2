import React, { Component } from "react";
import ReactDOM from "react-dom";
import ForceDirectedChartStyles from "./ForceDirectedChart.module.scss";
import * as d3 from "d3";

class ForceDirectedChart extends Component {
  componentDidMount() {
    const dataset = {
      nodes: [
        { name: "IGME430" },
        { name: "IGME330" },
        { name: "IGME230" },
        { name: "IGME202" },
        { name: "IGME110" },
        { name: "IGME102" },
        { name: "IGME116" },
        { name: "IGME206" }
      ],
      edges: [
        { source: 5, target: 2 },
        { source: 4, target: 2 },
        { source: 2, target: 1 },
        { source: 1, target: 0 },
        { source: 6, target: 3 },
        { source: 7, target: 3 },
        { source: 3, target: 1 }
      ]
    };

    this.visualizeData(dataset);
  }

  visualizeData(dataset) {
    const svgWidth = 500;
    const svgHeight = 500;

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("class", ForceDirectedChartStyles.svg)
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    const edgeLength = 100;

    const force = d3
      .forceSimulation(dataset.nodes)
      .force("charge", d3.forceManyBody())
      .force("link", d3.forceLink(dataset.edges).distance(edgeLength))
      .force(
        "center",
        d3
          .forceCenter()
          .x(svgWidth / 2)
          .y(svgHeight / 2)
      );

    let edges = svg
      .selectAll("line")
      .data(dataset.edges)
      .enter()
      .append("line")
      .attr("class", ForceDirectedChartStyles.edge);

    let nodes = svg
      .selectAll("circle")
      .data(dataset.nodes)
      .enter()
      .append("circle")
      .attr("r", 20)
      .style("fill", "gray")
      .style("fill", (d, i) => {
        const scheme = d3.schemeAccent;
        const colors = {
          0: scheme[0],
          1: scheme[1],
          2: scheme[2],
          3: scheme[2]
        };
        return colors[i] || scheme[3];
      })
      .call(
        d3
          .drag()
          .on("start", d => {
            if (!d3.event.active) {
              force.alphaTarget(0.3).restart();
            }

            // Int x and y forces
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", d => {
            // set x and y forces when dragging
            d.fx = d3.event.x;
            d.fy = d3.event.y;
          })
          .on("end", d => {
            if (!d3.event.active) {
              force.alphaTarget(1).restart();
            }

            // clear x and y forces
            d.fx = null;
            d.fy = null;
          })
      );

    nodes.append("title").text(d => d.name);

    // Update nodes and edges with each tick
    force.on("tick", () => {
      // Update edges
      edges
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      //Update ndoes
      nodes.attr("cx", d => d.x).attr("cy", d => d.y);
    });
  }

  render() {
    return (
      <div className={ForceDirectedChartStyles.container}>
        <h1 className={ForceDirectedChartStyles.chartType}>
          Force Directed Chart
        </h1>
        <hr />
        <h2 className={ForceDirectedChartStyles.chartH2}>Summary</h2>
        <p className={ForceDirectedChartStyles.p}>
          The force directed graph can be used to show connections between many
          different nodes. It can also use color to differentiate certain
          categories of nodes. This is good for display complex jumbles of
          connections in a visually pleasing and understandable way.
        </p>
        <h3 className={ForceDirectedChartStyles.chartH3}>Marks</h3>
        <ul>
          <li>Points/Nodes</li>
          <li>Lines/Connections</li>
        </ul>
        <h3 className={ForceDirectedChartStyles.chartH3}>Channels</h3>
        <ul>
          <li>Line Connection (Identity)</li>
          <li>Color Hue (Identity)</li>
        </ul>
        <div className={ForceDirectedChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default ForceDirectedChart;
