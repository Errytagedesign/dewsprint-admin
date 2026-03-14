"use client";

import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const RevenueBreakdown = () => {
  const revenueData = [
    { name: "Rent", amount: 23382.92, color: "#075B59" }, // Dark green
    { name: "SMS", amount: 18374.29, color: "#34C759" }, // Light green
    { name: "Boost", amount: 28237.27, color: "#FFCC00" }, // Yellow
    { name: "eSIM", amount: 10327.12, color: "#1E92F4" }, // Blue
  ];

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.amount, 0);

  const chartOptions: ApexOptions = {
    chart: {
      type: "donut" as const,
    },
    colors: revenueData.map((item) => item.color),
    labels: revenueData.map((item) => item.name),
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: "75%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Revenue",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#333",
              formatter: () =>
                `$${totalRevenue.toLocaleString("en-US", {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}`,
            },
            name: {
              show: true,
              fontSize: "14px",
              color: "#666",
              offsetY: 20,
            },
            value: {
              show: true,
              fontSize: "20px",
              fontWeight: "bold",
              color: "#333",
              offsetY: -10,
            },
          },
        },
      },
    },
    legend: {
      show: false,
      position: "bottom",
      formatter: function (seriesName: string, opts: any) {
        return `${seriesName}: $${opts.w.globals.series[
          opts.seriesIndex
        ].toLocaleString("en-US", {
          minimumFractionDigits: 2,
        })}`;
      },
    },
    stroke: {
      width: 0,
    },
  };

  const chartSeries = revenueData.map((item) => item.amount);

  return (
    <article className="roundedCard">
      <h4 className="text-grey-600 mb-4 !text-base !font-medium">
        Revenue Distribution
      </h4>
      <div className="flex h-[400px] w-full items-center justify-center">
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="donut"
          height={400}
        />
      </div>

      <ul className="flex flex-wrap items-center justify-between gap-4">
        {revenueData.map((item) => (
          <li key={item.name} className="w-full md:w-5/12">
            <div className="flex gap-2">
              <div
                className={`h-2 w-6 rounded-full`}
                style={{ backgroundColor: item.color }}
              />
              <div className="flex flex-col gap-1">
                <small className="!font-medium">{item.name}</small>
                <small className="text-grey-500 text-sm">
                  $
                  {item.amount.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </small>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default RevenueBreakdown;
