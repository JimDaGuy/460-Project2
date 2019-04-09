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
      name: "Categories",
      children: [
        {
          name: "Cat A",
          children: [
            {
              name: "Cat A1",
              value: 27
            },
            {
              name: "Cat A2",
              value: 105
            },
            {
              name: "Cat A3",
              value: 63
            },
            {
              name: "Cat A4",
              value: 233
            }
          ]
        },
        {
          name: "Cat B",
          children: [
            {
              name: "Cat B1",
              value: 267
            },
            {
              name: "Cat B2",
              value: 290
            },
            {
              name: "Cat B3",
              value: 43
            },
            {
              name: "Cat B4",
              value: 83
            }
          ]
        },
        {
          name: "Cat C",
          children: [
            {
              name: "Cat C1",
              value: 277
            },
            {
              name: "Cat C2",
              value: 312
            },
            {
              name: "Cat C3",
              value: 56
            },
            {
              name: "Cat C4",
              value: 300
            },
            {
              name: "Cat C5",
              value: 109
            },
            {
              name: "Cat C6",
              value: 135
            }
          ]
        },
        {
          name: "Cat D",
          children: [
            {
              name: "Cat D1",
              value: 65
            },
            {
              name: "Cat D2",
              value: 45
            },
            {
              name: "Cat D3",
              value: 69
            }
          ]
        },
        {
          name: "Cat E",
          children: [
            {
              name: "Cat E1",
              value: 217
            },
            {
              name: "Cat E2",
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
          The packed circles chart can be used to compare the magnitude of
          multiple subcategories of data. The top level circle represents the
          main category while all the circles inside of it have area
          proportional to their parent's value.
        </p>
        <h3 className={PackedCirclesChartStyles.chartH3}>Marks</h3>
        <ul>
          <li>Area/Circles</li>
        </ul>
        <h3 className={PackedCirclesChartStyles.chartH3}>Channels</h3>
        <ul>
          <li>Area (Magnitude)</li>
          <li>Color Hue (Identity)</li>
        </ul>
        <div className={PackedCirclesChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default PackedCirclesChart;
