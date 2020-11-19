import React, { useState, useEffect } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import Styles from "./Chart.module.css";

const Chart = ({ country, data: { confirmed, recovered, deaths } }) => {
  const [dailyData, setDailyData] = useState([]);
  console.log("confirmed ", confirmed);
  useEffect(() => {
    (async function () {
      setDailyData(await fetchDailyData());
    })();
  }, []);

  const lineChart = dailyData ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            label: "confirmed",
            data: dailyData.map(({ confirmed }) => confirmed),
            borderColor: "rgba(237, 157, 9,0.5)",
            backgroundColor: "rgba(237, 157, 9,0.5)",
            fill: true,
          },
          {
            label: "Deaths",
            data: dailyData.map(({ deaths }) => deaths),
            borderColor: " rgba(850, 0, 0, 0.5)",
            backgroundColor: " rgba(850, 0, 0, 0.5)",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Confirmed", "Recovered", "Deaths"],
        datasets: [
          {
            lablel: "PROPLE",
            backgroundColor: [
              "rgba(237, 157, 9, 0.5)",
              "rgba(0,250,0,0.5)",
              "rgba(250,0,0,0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legends: { display: false },
        title: { display: true, text: `CURRENT STATE IN ${country}` },
      }}
    />
  ) : null;
  return (
    <div className={Styles.container}>{!country ? lineChart : barChart}</div>
  );
};

export default Chart;
