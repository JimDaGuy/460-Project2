import React, { Component } from "react";
import ReactDOM from "react-dom";
import CandlestickChartStyles from "./CandlestickChart.module.scss";
import * as d3 from "d3";
import data from "../data/CandlestickChart.csv";

class CandlestickChart extends Component {
  componentDidMount() {
    d3.csv(data, d => {
      return {
        date: new Date(parseInt(d.year), parseInt(d.month)),
        open: parseInt(d.open),
        close: parseInt(d.close),
        lower: parseInt(d.lower),
        upper: parseInt(d.upper)
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
    const svgWidth = 700;
    const svgHeight = 600;
    const chartIndent = 50;
    const lineWidthPercent = 0.2;
    const barWidthPercent = 0.45;

    console.dir(dataset);

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    // Plotting data
    let xScale = d3
      .scaleTime()
      .domain(d3.extent(dataset, d => d.date))
      .range([chartIndent, svgWidth - chartIndent]);

    let yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d.upper) + 5])
      .range([svgHeight - chartIndent, chartIndent]);

    // Draw lower/upper line
    svg
      .selectAll(".upperLower")
      .data(dataset)
      .enter()
      .append("rect")
      // X - Half of bar width
      .attr("x", d => {
        const initialXPos = xScale(d.date);
        const lineWidth =
          ((svgWidth - chartIndent * 2) / dataset.length) * lineWidthPercent;
        return initialXPos - lineWidth / 2;
      })
      .attr("y", d => {
        return yScale(d.upper);
      })
      .attr(
        "width",
        ((svgWidth - chartIndent * 2) / dataset.length) * lineWidthPercent
      )
      .attr("height", d => svgHeight - chartIndent - yScale(d.upper - d.lower))
      .attr("fill", "gray")
      .append("title")
      .text(d => `Upper: ${d.upper} Lower: ${d.lower}`);

    // Draw open/close line
    svg
      .selectAll(".openClose")
      .data(dataset)
      .enter()
      .append("rect")
      // X - Half of bar width
      .attr("x", d => {
        const initialXPos = xScale(d.date);
        const lineWidth =
          ((svgWidth - chartIndent * 2) / dataset.length) * barWidthPercent;
        return initialXPos - lineWidth / 2;
      })
      .attr("y", d => {
        return yScale(Math.max(d.open, d.close));
      })
      .attr(
        "width",
        ((svgWidth - chartIndent * 2) / dataset.length) * barWidthPercent
      )
      .attr(
        "height",
        d => svgHeight - chartIndent - yScale(Math.abs(d.open - d.close))
      )
      .attr("fill", d => (d.open > d.close ? "red" : "green"))
      .append("title")
      .text(d => `Open: ${d.open} Close: ${d.close}`);

    // Axes
    svg
      .append("g")
      .attr("class", CandlestickChartStyles.xAxis)
      .attr("transform", `translate(0, ${svgHeight - chartIndent})`)
      .call(
        d3
          .axisBottom(xScale)
          .tickFormat(d3.timeFormat("%b"))
          .ticks(dataset.length)
      );

    svg
      .append("g")
      .attr("class", CandlestickChartStyles.yAxis)
      .attr("transform", `translate(${chartIndent - 20}, 0 )`)
      .call(d3.axisLeft(yScale));
  }

  render() {
    return (
      <div className={CandlestickChartStyles.container}>
        <h1 className={CandlestickChartStyles.chartType}>Candlestick Chart</h1>
        <hr />
        <h2 className={CandlestickChartStyles.chartH2}>Summary</h2>
        <p className={CandlestickChartStyles.p}>
          Describes the type of chart and its characteristics. Describes what it
          is useful for
        </p>
        <h3 className={CandlestickChartStyles.chartH3}>Marks</h3>
        <p className={CandlestickChartStyles.p}>Describes the marks</p>
        <h3 className={CandlestickChartStyles.chartH3}>Channels</h3>
        <p className={CandlestickChartStyles.p}>Describes the channels</p>
        <div className={CandlestickChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default CandlestickChart;
