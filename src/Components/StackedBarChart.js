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
    const svgHeight = 450;

    console.dir(dataset);

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    let stack = d3.stack().keys(["food", "movie", "videogame"]);

    let stackedData = stack(dataset);

    let yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d.food + d.movie + d.videogame)])
      .range([svgHeight - 40, 40]);

    let extent = d3.extent(dataset, d => d.date);
    let endDate = new Date(extent[1].getFullYear(), extent[1].getMonth() + 1);

    let xScale = d3
      .scaleTime()
      .domain([extent[0], endDate])
      .range([40, svgWidth - 40]);

    let cScale = d3.scaleOrdinal(d3.schemeCategory10);

    let groups = svg
      .selectAll("g")
      .data(stackedData)
      .enter()
      .append("g")
      .style("fill", (d, i) => cScale(i));

    let barlen = (svgWidth - 80) / dataset.length - 4;

    groups
      .selectAll("rect")
      .data(d => d)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.data.date))
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
      .attr("transform", `translate(0, ${svgHeight - 40})`)
      .call(d3.axisBottom(xScale));

    svg
      .append("g")
      .attr("class", StackedBarChartStyles.yAxis)
      .attr("transform", `translate(40, 0 )`)
      .call(d3.axisLeft(yScale).tickFormat(d => `$${d}`));

    // Axis Labels
    svg
      .append("text")
      .text("Date")
      .attr("text-anchor", "middle")
      .style("text-align", "center")
      .style("alignment-baseline", "middle")
      .attr("transform", `translate(${svgWidth / 2},${svgHeight - 10})`);

    svg
      .append("text")
      .text("Monthly Expenses")
      .attr("text-anchor", "middle")
      .style("text-align", "center")
      .style("alignment-baseline", "middle")
      .attr("transform", `translate(10 ,${svgHeight / 2}) rotate(270)`);
  }

  render() {
    return (
      <div className={StackedBarChartStyles.container}>
        <h1 className={StackedBarChartStyles.chartType}>Stacked Bar Chart</h1>
        <hr />
        <h2 className={StackedBarChartStyles.chartH2}>Summary</h2>
        <p className={StackedBarChartStyles.p}>
          Describes the type of chart and its characteristics. Describes what it
          is useful for
        </p>
        <h3 className={StackedBarChartStyles.chartH3}>Marks</h3>
        <p className={StackedBarChartStyles.p}>Describes the marks</p>
        <h3 className={StackedBarChartStyles.chartH3}>Channels</h3>
        <p className={StackedBarChartStyles.p}>Describes the channels</p>
        <div className={StackedBarChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default StackedBarChart;
