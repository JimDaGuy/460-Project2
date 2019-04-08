import React, { Component } from "react";
import ReactDOM from "react-dom";
import ForceDirectedChartStyles from "./ForceDirectedChart.module.scss";
import * as d3 from "d3";

class ForceDirectedChart extends Component {
  componentDidMount() {
    const dataset = {
      nodes: [
        { name: "IGME430" }, // 0
        { name: "IGME330" }, // 1
        { name: "IGME230" }, // 2
        { name: "IGME202" }, // 3
        { name: "IGME110" }, // 4
        { name: "IGME102" }, // 5
        { name: "IGME116" }, // 6
        { name: "IGME206" } // 7

        // 5 > 3
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
    console.dir(dataset);

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
      .call(
        d3
          .drag()
          .on("start", d => {
            if (!d3.event.active) {
              force.alphaTarget(0.3).restart();
            }
            // use fx and fy as fixed x and y values; when set, overrides computed x/y
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", d => {
            // set fx and fy to event x/y
            d.fx = d3.event.x;
            d.fy = d3.event.y;
          })
          .on("end", d => {
            if (!d3.event.active) {
              force.alphaTarget(1).restart();
            }
            // clear fx and fy so that computed x/y is used once again
            d.fx = null;
            d.fy = null;
          })
      );

    // append title elements for all nodes, giving us tooltips
    nodes.append("title").text(d => d.name);

    // Next we deal with dynamic properties using the forceSimulation.
    // We do this by setting what happens when the forceSimulation 'ticks'
    // when running.

    force.on("tick", () => {
      // update edge line's starting and ending x/y using the
      // joined data that D3 derived from our dataset
      edges
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      // update node center x/y's using the
      // joined data that D3 derived from our dataset
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
          Describes the type of chart and its characteristics. Describes what it
          is useful for
        </p>
        <h3 className={ForceDirectedChartStyles.chartH3}>Marks</h3>
        <p className={ForceDirectedChartStyles.p}>Describes the marks</p>
        <h3 className={ForceDirectedChartStyles.chartH3}>Channels</h3>
        <p className={ForceDirectedChartStyles.p}>Describes the channels</p>
        <div className={ForceDirectedChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default ForceDirectedChart;
