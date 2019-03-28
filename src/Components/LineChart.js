import React, { Component } from "react";
import ReactDOM from "react-dom";
import LineChartStyles from "./LineChart.module.scss";
import * as d3 from "d3";
import data from "../data/LineChart.csv";

class LineChart extends Component {
  componentDidMount() {
    d3.csv(data, d => {
      return {
        company: d.company,
        worth: parseInt(d.worth),
        date: new Date(parseInt(d.year), parseInt(d.month))
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
    const parseLines = dataset => {
      let linesObj = {};
      for (let i = 0; i < dataset.length; i++) {
        const currLine = dataset[i];
        if (linesObj.hasOwnProperty(currLine.company)) {
          linesObj[currLine.company].push({
            worth: currLine.worth,
            date: currLine.date
          });
        } else {
          linesObj[currLine.company] = [
            {
              worth: currLine.worth,
              date: currLine.date
            }
          ];
        }
      }
      let lineData = [];
      for (let line in linesObj) {
        lineData.push(linesObj[line]);
      }
      return lineData;
    };

    const parsedLines = parseLines(dataset);
    console.dir(parsedLines);

    let svg = d3
      .select(ReactDOM.findDOMNode(this.refs.d3Content))
      .append("svg")
      .attr("width", `${svgWidth}px`)
      .attr("height", `${svgHeight}px`);

    // Plotting data
    let xScale = d3
      .scaleTime()
      .domain(d3.extent(dataset, d => d.date))
      .range([60, svgWidth - 40]);

    let yScale = d3
      .scaleLinear()
      .domain([0, d3.max(dataset, d => d.worth)])
      .range([svgHeight - 40, 40]);

    let line = d3
      .line()
      .x(d => xScale(d.date))
      .y(d => yScale(d.worth));

    let key = d => d;

    svg
      .selectAll("path")
      .data(parsedLines, key)
      .enter()
      .append("path")
      .attr("d", d => line(d))
      .style("stroke", (d, i) => {
        switch (i) {
          case 0:
            return "red";
          case 1:
            return "green";
          case 2:
            return "blue";
          default:
            return "black";
        }
      })
      .style("fill", "none");

    // Axes
    svg
      .append("g")
      .attr("class", LineChartStyles.xAxis)
      .attr("transform", `translate(0, ${svgHeight - 40})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%m/%y")));

    svg
      .append("g")
      .attr("class", LineChartStyles.yAxis)
      .attr("transform", `translate(60, 0 )`)
      .call(d3.axisLeft(yScale));
  }

  render() {
    return (
      <div className={LineChartStyles.container}>
        <h1 className={LineChartStyles.chartType}>Line Chart</h1>
        <hr />
        <h2 className={LineChartStyles.chartH2}>Summary</h2>
        <p className={LineChartStyles.p}>
          Describes the type of chart and its characteristics. Describes what it
          is useful for
        </p>
        <h3 className={LineChartStyles.chartH3}>Marks</h3>
        <p className={LineChartStyles.p}>Describes the marks</p>
        <h3 className={LineChartStyles.chartH3}>Channels</h3>
        <p className={LineChartStyles.p}>Describes the channels</p>
        <div className={LineChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default LineChart;
