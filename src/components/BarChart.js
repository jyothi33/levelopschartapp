import React, { useContext } from "react";

import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { ChartContext } from "../context/ChartContextContainer";
const BarChart = () => {
  const { state, initChart } = useContext(ChartContext);

  let { assignees, tickets, filteredData } = state;

  useEffect(() => {
    const getTicketFrequency = async () => {
      let ticketArr = [];
      filteredData.map((ticket) => ticketArr.push(ticket.assignee));

      let tick = await ticketArr.reduce((acc, curr) => {
        if (typeof acc[curr] == "undefined") {
          acc[curr] = 1;
        } else {
          acc[curr] += 1;
        }
        return acc;
      }, {});

      return tick;
    };
    getTicketFrequency().then((result) => {
      initChart({ result });
    });
  }, [filteredData]);

  const chartData = {
    labels: assignees,
    datasets: [
      {
        label: "Levelops Tickets",
        backgroundColor: "blue",
        borderWidth: 1,
        data: tickets,
      },
    ],
  };

  return (
    <div
      className="App"
      style={{
        width: "auto",
        height: "500px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        Total Tickets : {filteredData.length}
      </h1>
      <Bar
        data={chartData}
        options={{
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Tickets Information",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Tickets",
              },
            },
            x: {
              title: {
                display: true,
                text: "Assignees",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
