import React, { Component } from "react";
import homeStyles from "./Home.module.scss";
import BarChart from "../Components/BarChart";
import Chart2 from "../Components/Chart2";
import Chart3 from "../Components/Chart3";
import Chart4 from "../Components/Chart4";
import Chart5 from "../Components/Chart5";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chart: 1
    };

    this.setChart = this.setChart.bind(this);
  }

  componentDidMount() {}

  setChart(num) {
    this.setState({
      chart: num
    });
  }

  render() {
    const { chart } = this.state;

    return (
      <div className={homeStyles.container}>
        <div className={homeStyles.header}>
          <span>D3 Visualization Catalog</span>
        </div>
        {chart === 0 ? (
          <div className={homeStyles.mainContent}>
            <div className={homeStyles.linksBox}>
              <button onClick={() => this.setChart(1)}>1. Bar Chart</button>
              <button onClick={() => this.setChart(2)}>2 Line Chart</button>
              <button onClick={() => this.setChart(3)}>3. Area Chart</button>
              <button onClick={() => this.setChart(4)}>4. Scatterplot</button>
              <button onClick={() => this.setChart(5)}>5. Pie Chart</button>
              <button onClick={() => this.setChart(6)}>6. Donut Chart</button>
              <button onClick={() => this.setChart(7)}>
                7. Stacked Bar Chart
              </button>
              <button onClick={() => this.setChart(8)}>
                8. Stacked Area Chart
              </button>
              <button onClick={() => this.setChart(9)}>
                9. Force Directed Graph
              </button>
              <button onClick={() => this.setChart(10)}>10. Chord</button>
              <button onClick={() => this.setChart(11)}>11. Cluster</button>
              <button onClick={() => this.setChart(12)}>
                12. Packed Circles
              </button>
              <button onClick={() => this.setChart(13)}>13. Partition</button>
              <button onClick={() => this.setChart(14)}>14. Tree</button>
              <button onClick={() => this.setChart(15)}>15. Treemap</button>
              <button onClick={() => this.setChart(16)}>
                16. Maps (points, connections)
              </button>
              <button onClick={() => this.setChart(17)}>17. Choropleth</button>
              <button onClick={() => this.setChart(18)}>18. Candlestick</button>
            </div>
          </div>
        ) : (
          <div className={homeStyles.chartContent}>
            <button onClick={() => this.setChart(0)}>Home</button>
            {chart === 1 ? <BarChart /> : null}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
