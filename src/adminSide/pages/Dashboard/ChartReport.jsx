import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  orderByPeriodTimeService,
  revenueByPeriodTimeService,
} from "../../../services/RevenueService";
import { Button, Menu, MenuItem } from "@mui/material";
import { Download } from "@mui/icons-material";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import ExportExcel from "./ExportExcel";

Chart.register(CategoryScale);

const ChartReport = (props) => {
  const [orderList, setOrderList] = useState();
  const [revenueList, setRevenueList] = useState();
  const [revenueLabels, setRevenueLabels] = useState([]);
  const [dataRevenueChart, setRevenueDataChart] = useState([]);
  const [orderLabels, setOrderLabels] = useState([]);
  const [dataOrderChart, setOrderDataChart] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    const fetchData = async () => {
      if (props.startDate && props.endDate) {
        const orderData = await orderByPeriodTimeService(
          props.startDate,
          props.endDate
        );
        const revenueData = await revenueByPeriodTimeService(
          props.startDate,
          props.endDate
        );
        setOrderList(orderData.data);
        setRevenueList(revenueData.data);
      }
    };

    fetchData();
  }, [props.startDate, props.endDate]);

  useEffect(() => {
    let timeLabel = [];
    let dataRevenue = [];
    revenueList?.forEach((revenue) => {
      timeLabel = [...timeLabel, revenue.time];
      dataRevenue = [...dataRevenue, revenue.revenue];
    });
    setRevenueLabels([...timeLabel]);
    setRevenueDataChart([...dataRevenue]);
  }, [revenueList]);
  useEffect(() => {
    let timeLabel = [];
    let dataRevenue = [];
    orderList?.forEach((order) => {
      timeLabel = [...timeLabel, order.time];
      dataRevenue = [...dataRevenue, order.totalOrders];
    });
    setOrderLabels([...timeLabel]);
    setOrderDataChart([...dataRevenue]);
  }, [orderList]);

  console.log(orderList, revenueList);
  const data = {
    labels: orderLabels,
    datasets: [
      {
        label: "Orders",
        type: "line",
        data: dataOrderChart || [],
        fill: false,
        borderColor: "#788FD5",
        backgroundColor: "#788FD5",
        yAxisID: "y-axis-1",
      },
      {
        label: "Revenue",
        type: "bar",
        data: dataRevenueChart || [],
        fill: false,
        borderColor: "#DFA693",
        backgroundColor: "#DFA693",
        yAxisID: "y-axis-2",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines: {
            drawOnChartArea: false,
          },
        },
      ],
    },
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h5 className="fw-semibold ms-2 ">Chart</h5>

        <Button
          onClick={handleClick}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textTransform: "none",
            gap: "1rem",
          }}
        >
          <Download sx={{ color: "#CCA752", fontSize: "25px" }} />
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={isOpen}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <MenuItem>
            {" "}
            <ExportExcel
              data={[revenueList, orderList]}
              label={["Revenue", "Total Orders"]}
            />
          </MenuItem>
        </Menu>
      </div>
      <Card
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: ["column", "column", "row"],
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Line data={data} options={options} />
        </Box>
      </Card>
    </div>
  );
};

export default ChartReport;
