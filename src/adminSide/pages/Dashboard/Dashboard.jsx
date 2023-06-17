import { Grid } from "@mui/material";
import React from "react";
import * as Yup from "yup";
import CardStatsVertical from "./CardStatsVertical";

import CartCheck from "mdi-material-ui/CartCheck";
import CurrencyUsd from "mdi-material-ui/CurrencyUsd";
import AccountPlus from "mdi-material-ui/AccountPlus";
import Account from "mdi-material-ui/Account";
import ApexChartWrapper from "./ApexChartWrapper";
import { useEffect } from "react";
import moment from "moment";
import { summaryByPeriodTimeService } from "../../../services/RevenueService";
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import TopCategory from "./TopCategory";
import TopProduct from "./TopProduct";
import TopUser from "./TopUser";
import { USD } from "../../../utils/convertMoney";
import ChartReport from "./ChartReport";
import OrderRecent from "./OrderRecent";

const reportSchema = Yup.object().shape({
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string()
    .required("End date is required")
    .test(
      "is-greater-than-start",
      "End date is greater than start date",
      function (endDate) {
        const startDate = this.resolve(Yup.ref("startDate"));
        if (startDate && endDate) {
          return new Date(endDate) > new Date(startDate);
        }
        return true;
      }
    ),
});

function Dashboard() {
  const currentUser =
    JSON.parse(localStorage.getItem("currentUserInfor")).currentUser.userName ||
    "";

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const currentDate = moment().format("YYYY-MM-DD");
  const oneWeekAgo = moment(currentDate)
    .subtract(1, "week")
    .format("YYYY-MM-DD");
  const oneWeekAgoPlusOneDay = moment(oneWeekAgo)
    .add(1, "day")
    .format("YYYY-MM-DD");
  const [reportForm, setReportForm] = useState({
    startDate: oneWeekAgoPlusOneDay || "",
    endDate: currentDate || "",
  });
  const handleStartDateChange = (event, setFieldValue) => {
    const value = event.target.value;
    setFieldValue("startDate", value);
  };

  const handleEndDateChange = (event, setFieldValue) => {
    const value = event.target.value;
    setFieldValue("endDate", value);
  };

  useEffect(() => {
    const currentDate = moment().format("YYYY-MM-DD");
    const oneWeekAgo = moment(currentDate)
      .subtract(1, "week")
      .format("YYYY-MM-DD");
    const oneWeekAgoPlusOneDay = moment(oneWeekAgo)
      .add(1, "day")
      .format("YYYY-MM-DD");
    setStartDate(oneWeekAgoPlusOneDay);
    setEndDate(currentDate);
  }, []);

  const [summary, setSummary] = useState();
  useEffect(() => {
    const fetchPaymentApi = async () => {
      summaryByPeriodTimeService(startDate, endDate).then((data) => {
        setSummary(data.data);
      });
    };

    fetchPaymentApi();
  }, [endDate, startDate]);

  const handleSubmit = (values) => {
    setStartDate(values.startDate);
    setEndDate(values.endDate);
  };
  return (
    <div className="p-3">
      <ApexChartWrapper>
        <Grid container xs={12}>
          <Grid item md={6}>
            <div class="flex-grow-1">
              <h4 class="fs-16 mb-1">Hello, {currentUser}!</h4>
              <p class="text-muted mb-0">
                Here's what's happening with your store today.
              </p>
            </div>
          </Grid>
          <Grid md={6}>
            <Formik
              initialValues={reportForm}
              validationSchema={reportSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ errors, touched, setFieldValue }) => (
                <Form>
                  <div className="mb-4">
                    <div className="row">
                      <div className="form-group col-5 p-0 m-0">
                        <label htmlFor="startDate">Start date</label>

                        <Field
                          className="form-control"
                          id="startDate"
                          name="startDate"
                          as="input"
                          type="date"
                          onChange={(event) =>
                            handleStartDateChange(event, setFieldValue)
                          }
                        />
                        <div className="error ms-3">
                          {errors.startDate && touched.startDate ? (
                            <div>{errors.startDate}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="form-group col-5 p-0 my-0 ps-2">
                        <label htmlFor="endDate">End date</label>

                        <Field
                          className="form-control"
                          id="endDate"
                          name="endDate"
                          as="input"
                          type="date"
                          onChange={(event) =>
                            handleEndDateChange(event, setFieldValue)
                          }
                        />
                        <div className="error ms-3">
                          {errors.endDate && touched.endDate ? (
                            <div>{errors.endDate}</div>
                          ) : null}
                        </div>
                      </div>
                      <div className="col-2 ">
                        <label for="" class="form-label">
                          {`${"\u00A0"}`}
                        </label>
                        <button
                          className="btn btn-primary"
                          style={{ background: "#0288D1" }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          {summary && (
            <Grid item md={12} lg={12}>
              <Grid container spacing={3}>
                <Grid item xs={6} md={3}>
                  <CardStatsVertical
                    stats={USD.format(summary.totalRevenue)}
                    icon={<CurrencyUsd />}
                    trend={
                      summary.revenueChangePercent < 0 ? "negative" : "positive"
                    }
                    color="success"
                    trendNumber={
                      typeof summary.revenueChangePercent === "number"
                        ? `${summary.revenueChangePercent.toFixed(0)}%`
                        : "N/A"
                    }
                    title="Total Revenue"
                    subtitle="Weekly Profit"
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <CardStatsVertical
                    stats={summary.totalOrder}
                    title="Orders"
                    trend={
                      summary.orderChangePercent < 0 ? "negative" : "positive"
                    }
                    color="secondary"
                    trendNumber={
                      typeof summary.orderChangePercent === "number"
                        ? `${summary.orderChangePercent.toFixed(0)}%`
                        : "N/A"
                    }
                    subtitle="Past Month"
                    icon={<CartCheck />}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <CardStatsVertical
                    stats={summary.totalCustomer}
                    trend={
                      summary.customerChangePercent < 0
                        ? "negative"
                        : "positive"
                    }
                    trendNumber={
                      typeof summary.customerChangePercent === "number"
                        ? `${summary.customerChangePercent.toFixed(0)}%`
                        : "N/A"
                    }
                    color="info"
                    title="Customers"
                    subtitle="Yearly Project"
                    icon={<Account />}
                  />
                </Grid>
                <Grid item xs={6} md={3}>
                  <CardStatsVertical
                    stats={summary.totalNewUser}
                    trend={
                      summary.newUserChangePercent < 0 ? "negative" : "positive"
                    }
                    trendNumber={
                      typeof summary.newUserChangePercent === "number"
                        ? `${summary.newUserChangePercent.toFixed(0)}%`
                        : "N/A"
                    }
                    color="warning"
                    title="New Users"
                    subtitle="Yearly Project"
                    icon={<AccountPlus />}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item md={12} lg={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                {startDate && endDate && (
                  <ChartReport startDate={startDate} endDate={endDate} />
                )}
              </Grid>
              <Grid item xs={12} md={4}>
                {startDate && endDate && (
                  <TopCategory startDate={startDate} endDate={endDate} />
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={12} lg={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                {startDate && endDate && (
                  <TopProduct startDate={startDate} endDate={endDate} />
                )}
              </Grid>
              <Grid item xs={12} md={5}>
                {startDate && endDate && (
                  <TopUser startDate={startDate} endDate={endDate} />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} marginTop={5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                {startDate && endDate && (
                  <OrderRecent startDate={startDate} endDate={endDate} />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </ApexChartWrapper>
    </div>
  );
}

export default Dashboard;
