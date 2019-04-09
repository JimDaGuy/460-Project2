import React, { Component } from "react";
import ReactDOM from "react-dom";
import StackedAreaChartStyles from "./StackedAreaChart.module.scss";
import * as d3 from "d3";
import data from "../data/StackedAreaChart.csv";

class StackedAreaChart extends Component {
  componentDidMount() {
    d3.csv(data, d => {
      return {
        date: new Date(parseInt(d.year), parseInt(d.month)),
        "Debt Owed": parseInt(d["Debt Owed"]),
        "Debt Paid": parseInt(d["Debt Paid"]),
        Income: parseInt(d.Income)
      };
    })
      .then(data => {
        this.visualizeData(data);
      })
      .catch(error => {
        console.dir(error);
      });
  }

  visualizeData(dataset) {
    const svgWidth = 500;
    const svgHeight = 600;
    const chartIndent = 50;
    const legendHeight = 100;
    const legendPaddingX = 10;
    const legendPaddingY = 10;
    const boxSize = 30;
    const textToBoxPadding = 5;

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    let extent = d3.extent(dataset, d => d.date);
    let endDate = new Date(extent[1].getFullYear(), extent[1].getMonth());

    let xScale = d3
      .scaleTime()
      .domain([extent[0], endDate])
      .range([chartIndent, svgWidth - chartIndent]);

    let yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(dataset, d => {
          let total = 0;
          const categories = dataset.columns.slice(2);
          for (let i = 0; i < categories.length; i++) {
            total += d[categories[i]];
          }
          return total;
        })
      ])
      .range([svgHeight - chartIndent - legendHeight, chartIndent]);

    let area = d3
      .area()
      .x(d => xScale(d.data.date))
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]));

    let stack = d3.stack().keys(dataset.columns.slice(2));
    let stackedData = stack(dataset);

    svg
      .selectAll(".area")
      .data(stackedData)
      .enter()
      .append("path")
      .style("fill", (d, i) => d3.schemeCategory10[i])
      .attr("d", area);

    // Axes
    svg
      .append("g")
      .attr("class", StackedAreaChartStyles.xAxis)
      .attr(
        "transform",
        `translate(0, ${svgHeight - chartIndent - legendHeight})`
      )
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("class", StackedAreaChartStyles.yAxis)
      .attr("transform", `translate(${chartIndent}, 0 )`)
      .call(d3.axisLeft(yScale).tickFormat(d => `$${d / 1000}k`));

    // Axis Labels
    svg
      .append("text")
      .text("Date")
      .attr("text-anchor", "middle")
      .style("text-align", "center")
      .style("alignment-baseline", "middle")
      .attr(
        "transform",
        `translate(${svgWidth / 2},${svgHeight - legendHeight - 10})`
      );

    svg
      .append("text")
      .text("Debt, Payments, and Income")
      .attr("text-anchor", "middle")
      .style("text-align", "center")
      .style("alignment-baseline", "middle")
      .attr(
        "transform",
        `translate(10 ,${(svgHeight - legendHeight) / 2}) rotate(270)`
      );

    // Create Legend

    // Boxes
    svg
      .selectAll(".bop")
      .data(dataset.columns.slice(2))
      .enter()
      .append("rect")
      .attr("x", (d, i) => {
        // Get index matching three legend items per row
        const indexWithRows = i % 3;
        const paddedWidth = svgWidth - chartIndent * 2;
        const x =
          chartIndent + legendPaddingX + (indexWithRows * paddedWidth) / 3;
        return x;
      })
      .attr("y", (d, i) => {
        const initialHeight = svgHeight - legendHeight + legendPaddingY;
        const row = Math.floor(i / 3);
        const height = initialHeight + row * (30 + legendPaddingY);
        return height;
      })
      .attr("width", boxSize)
      .attr("height", boxSize)
      .attr("fill", (d, i) => {
        const colors = d3.schemeCategory10;
        return colors[i % dataset.length];
      });

    // Text
    svg
      .selectAll(".dop")
      .data(dataset.columns.slice(2))
      .enter()
      .append("text")
      .text((d, i) => d)
      .attr("transform", (d, i) => {
        // Get index matching three legend items per row
        const indexWithRows = i % 3;
        const paddedWidth = svgWidth - chartIndent * 2;
        const x =
          chartIndent +
          legendPaddingX +
          boxSize +
          textToBoxPadding +
          (indexWithRows * paddedWidth) / 3;

        const initialHeight = svgHeight - legendHeight + legendPaddingY;
        const row = Math.floor(i / 3);
        const y = initialHeight + 15 + row * (30 + legendPaddingY);

        return `translate(${x},${y})`;
      })
      .style("alignment-baseline", "middle")
      .style("text-align", "left");
  }

  render() {
    return (
      <div className={StackedAreaChartStyles.container}>
        <h1 className={StackedAreaChartStyles.chartType}>Stacked Area Chart</h1>
        <hr />
        <h2 className={StackedAreaChartStyles.chartH2}>Summary</h2>
        <p className={StackedAreaChartStyles.p}>
          The stacked area chart is similar to the area chart, but it allows for
          multiple categories of data over the course of time. The areas are
          stacked on top of each other like the stacked bar chart. This chart is
          good for comparing the magnitude of values for multiple categories of
          data at once.
        </p>
        <h3 className={StackedAreaChartStyles.chartH3}>Marks</h3>
        <ul>
          <li>Area</li>
        </ul>
        <h3 className={StackedAreaChartStyles.chartH3}>Channels</h3>
        <ul>
          <li>Vertical position (Magnitude)</li>
          <li>Horizontal Position (Magnitude)</li>
          <li>Slope/Tilt (Magnitude)</li>
          <li>Color Hue (Identity)</li>
        </ul>
        <div className={StackedAreaChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default StackedAreaChart;
