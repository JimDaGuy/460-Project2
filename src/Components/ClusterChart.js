import React, { Component } from "react";
import ReactDOM from "react-dom";
import ClusterChartStyles from "./ClusterChart.module.scss";
import * as d3 from "d3";

class ClusterChart extends Component {
  componentDidMount() {
    this.visualizeData();
  }

  visualizeData(dataset) {
    const svgWidth = 500;
    const svgHeight = 500;
    const chartIndent = 50;

    let clusterData = {
      name: "First 1",
      children: [
        {
          name: "Second 2",
          children: [{ name: "Child1" }, { name: "Child2" }, { name: "Child3" }]
        },
        { name: "Child 1" },
        {
          name: "Third 3",
          children: [{ name: "Child1" }, { name: "Child2" }]
        },
        {
          name: "Fourth 4",
          children: [
            {
              name: "Fifth 5",
              children: [{ name: "Child1" }]
            }
          ]
        }
      ]
    };

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    let root = d3.hierarchy(clusterData);

    let cluster = d3
      .cluster()
      .size([svgHeight - chartIndent * 2, svgWidth - chartIndent * 2]);

    cluster(root);

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
      <div className={ClusterChartStyles.container}>
        <h1 className={ClusterChartStyles.chartType}>Cluster Chart</h1>
        <hr />
        <h2 className={ClusterChartStyles.chartH2}>Summary</h2>
        <p className={ClusterChartStyles.p}>
          Describes the type of chart and its characteristics. Describes what it
          is useful for
        </p>
        <h3 className={ClusterChartStyles.chartH3}>Marks</h3>
        <p className={ClusterChartStyles.p}>Describes the marks</p>
        <h3 className={ClusterChartStyles.chartH3}>Channels</h3>
        <p className={ClusterChartStyles.p}>Describes the channels</p>
        <div className={ClusterChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default ClusterChart;
