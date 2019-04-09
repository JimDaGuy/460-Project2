import React, { Component } from "react";
import ReactDOM from "react-dom";
import PackedCirclesChartStyles from "./PackedCirclesChart.module.scss";
import * as d3 from "d3";

class PackedCirclesChart extends Component {
  componentDidMount() {
    this.visualizeData();
  }

  visualizeData() {
    const svgWidth = 500;
    const svgHeight = 500;
    const chartIndent = 50;

    let packedData = {
      name: "parent",
      children: [
        {
          name: "parent",
          children: [
            {
              name: "child",
              value: 27
            },
            {
              name: "child",
              value: 105
            },
            {
              name: "child",
              value: 63
            },
            {
              name: "child",
              value: 233
            }
          ]
        },
        {
          name: "parent",
          children: [
            {
              name: "child",
              value: 267
            },
            {
              name: "child",
              value: 290
            },
            {
              name: "child",
              value: 43
            },
            {
              name: "child",
              value: 83
            }
          ]
        },
        {
          name: "parent",
          children: [
            {
              name: "child",
              value: 277
            },
            {
              name: "child",
              value: 312
            },
            {
              name: "child",
              value: 56
            },
            {
              name: "child",
              value: 300
            },
            {
              name: "child",
              value: 109
            },
            {
              name: "child",
              value: 135
            }
          ]
        },
        {
          name: "parent",
          children: [
            {
              name: "child",
              value: 65
            },
            {
              name: "child",
              value: 45
            },
            {
              name: "child",
              value: 69
            }
          ]
        },
        {
          name: "parent",
          children: [
            {
              name: "child",
              value: 217
            },
            {
              name: "child",
              value: 240
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

    let root = d3.hierarchy(packedData).sum(d => d.value || 0);

    let partition = d3
      .pack()
      .size([svgWidth - chartIndent * 2, svgHeight - chartIndent * 2])
      .padding(1);

    partition(root);

    let cScale = d3.scaleOrdinal(d3.schemePaired);

    svg
      .selectAll("circle")
      .data(root.descendants())
      .enter()
      .append("circle")
      .style("fill", d => cScale(d.depth))
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r)
      .attr("transform", `translate(${chartIndent}, ${chartIndent})`);

    svg
      .selectAll("text")
      .data(root.descendants())
      .enter()
      .filter(d => d.depth === 2)
      .append("text")
      .style("font-size", ".7em")
      .style("text-anchor", "middle")
      .attr("x", d => d.x)
      .attr("y", d => d.y + 4)
      .attr("transform", `translate(${chartIndent}, ${chartIndent})`)
      .text(d => d.data.name);
  }

  render() {
    return (
      <div className={PackedCirclesChartStyles.container}>
        <h1 className={PackedCirclesChartStyles.chartType}>
          Packed Circles Chart
        </h1>
        <hr />
        <h2 className={PackedCirclesChartStyles.chartH2}>Summary</h2>
        <p className={PackedCirclesChartStyles.p}>
          Describes the type of chart and its characteristics. Describes what it
          is useful for
        </p>
        <h3 className={PackedCirclesChartStyles.chartH3}>Marks</h3>
        <ul>
          <li>Lines/Bars</li>
        </ul>
        <h3 className={PackedCirclesChartStyles.chartH3}>Channels</h3>
        <ul>
          <li>Vertical Length (Magnitude)</li>
        </ul>
        <div className={PackedCirclesChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default PackedCirclesChart;
