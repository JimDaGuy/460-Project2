import React, { Component } from "react";
import ReactDOM from "react-dom";
import StackedBarChartStyles from "./StackedBarChart.module.scss";
import * as d3 from "d3";
import data from "../data/StackedBarChart.csv";

class StackedBarChart extends Component {
  componentDidMount() {
    d3.csv(data, d => {
      return {
        date: new Date(parseInt(d.year), parseInt(d.month)),
        food: parseInt(d.foodMoney),
        movie: parseInt(d.movieMoney),
        videogame: parseInt(d.videogameMoney)
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
    const chartIndent = 70;
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

    let stack = d3.stack().keys(["food", "movie", "videogame"]);

    let stackedData = stack(dataset);

    let extent = d3.extent(dataset, d => d.date);

    let xScale = d3
      .scaleTime()
      .domain(extent)
      .range([chartIndent, svgWidth - chartIndent]);

    let yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d.food + d.movie + d.videogame)])
      .range([svgHeight - chartIndent - legendHeight, chartIndent]);

    let cScale = d3.scaleOrdinal(d3.schemeCategory10);

    let groups = svg
      .selectAll("g")
      .data(stackedData)
      .enter()
      .append("g")
      .style("fill", (d, i) => cScale(i));

    let barlen = (svgWidth - chartIndent * 2) / dataset.length - 10;

    groups
      .selectAll("rect")
      .data(d => d)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.data.date) - barlen / 2)
      .attr("y", d => yScale(d[1]))
      .attr("width", barlen)
      .attr("height", d => yScale(d[0]) - yScale(d[1]))
      .append("title")
      .text(
        d =>
          `Food: $${d.data.food} \nMovies: $${d.data.movie} \nVideogames: $${
            d.data.videogame
          } \n`
      );

    // Axes
    svg
      .append("g")
      .attr("class", StackedBarChartStyles.xAxis)
      .attr(
        "transform",
        `translate(0, ${svgHeight - chartIndent - legendHeight})`
      )
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%b")));

    svg
      .append("g")
      .attr("class", StackedBarChartStyles.yAxis)
      .attr("transform", `translate(${chartIndent - barlen / 2 - 4}, 0 )`)
      .call(d3.axisLeft(yScale).tickFormat(d => `$${d}`));

    // Axis Labels
    svg
      .append("text")
      .text("Date")
      .attr("text-anchor", "middle")
      .style("text-align", "center")
      .style("alignment-baseline", "middle")
      .attr(
        "transform",
        `translate(${svgWidth / 2},${svgHeight -
          legendHeight -
          chartIndent +
          30})`
      );

    svg
      .append("text")
      .text("Monthly Expenses")
      .attr("text-anchor", "middle")
      .style("text-align", "center")
      .style("alignment-baseline", "middle")
      .attr(
        "transform",
        `translate(${chartIndent - barlen / 2 - 44} ,${(svgHeight -
          legendHeight) /
          2}) rotate(270)`
      );

    // Create Legend
    const categories = ["Food", "Movies", "Videogames"];

    // Boxes
    svg
      .selectAll(".bop")
      .data(categories)
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
        return height - 30;
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
      .data(categories)
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

        return `translate(${x},${y - 30})`;
      })
      .style("alignment-baseline", "middle")
      .style("text-align", "left");
  }

  render() {
    return (
      <div className={StackedBarChartStyles.container}>
        <h1 className={StackedBarChartStyles.chartType}>Stacked Bar Chart</h1>
        <hr />
        <h2 className={StackedBarChartStyles.chartH2}>Summary</h2>
        <p className={StackedBarChartStyles.p}>
          The stacked bar chart is similar to the bar chart, but it stacks
          multiple bars on top of each other. This can be used to compare
          multiples values that together make up the same category. They are
          typically more effective with a smaller ammount of stacked categories.
        </p>
        <h3 className={StackedBarChartStyles.chartH3}>Marks</h3>
        <ul>
          <li>Lines/Bars</li>
        </ul>
        <h3 className={StackedBarChartStyles.chartH3}>Channels</h3>
        <ul>
          <li>Vertical Length (Magnitude)</li>
          <li>Horizontal Position (Magnitude)</li>
          <li>Color Hue (Identity)</li>
        </ul>
        <div className={StackedBarChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default StackedBarChart;
