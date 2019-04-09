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
    const svgHeight = 550;
    const legendHeight = 100;

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

    let companies = {};
    let companiesArray = [];
    for (let i = 0; i < dataset.length; i++) {
      const company = dataset[i].company;
      if (!companies[company]) {
        companies[company] = true;
        companiesArray.push(company);
      }
    }
    console.dir(companiesArray);

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
      .range([svgHeight - legendHeight - 40, 40]);

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
        const colors = d3.schemeSet1;
        return colors[i % companiesArray.length];
      })
      .style("fill", "none");

    // Axes
    svg
      .append("g")
      .attr("class", LineChartStyles.xAxis)
      .attr("transform", `translate(0, ${svgHeight - legendHeight - 40})`)
      .call(d3.axisBottom(xScale).tickFormat(d3.timeFormat("%m/%y")));

    svg
      .append("g")
      .attr("class", LineChartStyles.yAxis)
      .attr("transform", `translate(60, 0 )`)
      .call(d3.axisLeft(yScale));

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
      .text("Worth")
      .attr("text-anchor", "middle")
      .style("text-align", "center")
      .style("alignment-baseline", "middle")
      .attr(
        "transform",
        `translate(10 ,${(svgHeight - legendHeight) / 2}) rotate(270)`
      );

    const legendPadding = 10;

    // Create Legend
    svg
      .selectAll(".boxes")
      .data(companiesArray)
      .enter()
      .append("rect")
      .attr("x", (d, i) => {
        // Get index matching three legend items per row
        const indexWithRows = i % 3;
        const paddedWidth = svgWidth - legendPadding * 2;
        return (
          legendPadding +
          60 +
          (indexWithRows * paddedWidth) / companiesArray.length
        );
      })
      .attr("y", (d, i) => {
        const initialHeight = svgHeight - legendHeight + legendPadding;
        const row = Math.floor(i / 3);
        const height = initialHeight + row * (30 + legendPadding);
        return height;
      })
      .attr("width", 30)
      .attr("height", 30)
      .attr("fill", (d, i) => {
        const colors = d3.schemeSet1;
        return colors[i % companiesArray.length];
      });

    svg
      .selectAll(".legendText")
      .data(companiesArray)
      .enter()
      .append("text")
      .text((d, i) => companiesArray[i])
      .attr("transform", (d, i) => {
        // Get index matching three legend items per row
        const indexWithRows = i % 3;
        const paddedWidth = svgWidth - legendPadding * 2;
        const x =
          legendPadding +
          35 +
          60 +
          (indexWithRows * paddedWidth) / companiesArray.length;

        const initialHeight = svgHeight - legendHeight + legendPadding;
        const row = Math.floor(i / 3);
        const y = initialHeight + 15 + row * (30 + legendPadding);

        return `translate(${x},${y})`;
      })
      .style("alignment-baseline", "middle");
  }

  render() {
    return (
      <div className={LineChartStyles.container}>
        <h1 className={LineChartStyles.chartType}>Line Chart</h1>
        <hr />
        <h2 className={LineChartStyles.chartH2}>Summary</h2>
        <p className={LineChartStyles.p}>
          The line chart is often used to show data values over the course of
          time. Plotting multiple lines allows for a comparison between
          different categories over time or another factor.
        </p>
        <h3 className={LineChartStyles.chartH3}>Marks</h3>
        <ul>
          <li>Lines</li>
        </ul>
        <h3 className={LineChartStyles.chartH3}>Channels</h3>
        <ul>
          <li>Vertical/Horizontal position of points (Magnitude)</li>
          <li>Slope/Tilt (Magnitude)</li>
          <li>Color Hue (Identity)</li>
        </ul>
        <div className={LineChartStyles.d3Content} ref="d3Content" />
      </div>
    );
  }
}

export default LineChart;
