import React, { useEffect, useState } from "react";
import { currency as currencyComma } from "src/modules/helpers/currency";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/SideBar";
import Footer from "../../components/Footer";
import styles from "../../styles/Dashboard.module.css";
import { useRouter } from "next/router";
import PageTitle from "src/components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import historyAction from "src/redux/actions/history";
import Card from "../../components/CardHistory";
import userAction from "../../redux/actions/user";
import Modal from "../../components/ModalTopUp";
import dashboardAction from "../../redux/actions/dashboard";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

function Dashboard() {
  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user.profile);
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const history = useSelector((state) => state.history);
  const [showModal, setShowModal] = useState(false);
  const statistic = useSelector((state) => state.dashboard.data);

  const [query, setQuery] = useState({ page: 1, limit: 10, filter: "MONTH" });
  const currency = (price) => {
    return (
      "RP. " +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  };
  const modalControl = () => setShowModal(!showModal);

  useEffect(() => {
    dispatch(
      userAction.getUserDetailThunk(auth.userData.token, auth.userData.id)
    );
    dispatch(historyAction.getHistoryThunk(auth.userData.token, query));
    dispatch(
      dashboardAction.statisticThunk(auth.userData.token, auth.userData.id)
    );
  }, []);

  const incomeData = {
    label: "Income",
    data: statistic.listIncome
      ? [
          statistic.listIncome[5].total,
          statistic.listIncome[6].total,
          statistic.listIncome[0].total,
          statistic.listIncome[1].total,
          statistic.listIncome[2].total,
          statistic.listIncome[3].total,
          statistic.listIncome[4].total,
        ]
      : [],
    backgroundColor: "#6379F4",
  };

  const expenseData = {
    label: "Expense",
    data: statistic.listExpense
      ? [
          statistic.listExpense[5].total,
          statistic.listExpense[6].total,
          statistic.listExpense[0].total,
          statistic.listExpense[1].total,
          statistic.listExpense[2].total,
          statistic.listExpense[3].total,
          statistic.listExpense[4].total,
        ]
      : [],
    backgroundColor: "#9DA6B5",
  };

  const data = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [incomeData, expenseData],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    legend: {
      label: {
        fontSize: 14,
        fontFamily: "Nunito Sans",
      },
    },
  };
  console.log(expenseData);
  return (
    <>
      <PageTitle title="Dashboard" />
      <Modal open={showModal} setOpen={setShowModal} />
      <Navbar history={history.data}>
        <div className={styles.container}>
          <div className={`col-lg-3 ${styles.onMobile}`}>
            <Sidebar />
          </div>
          <div className="col-lg-9">
            <aside className={styles.side}>
              <div className={styles["side-top"]}>
                <div className={styles["top-left"]}>
                  <p className={styles.balance}>Balance</p>
                  <p className={styles.price}>
                    {currency(profile.balance) || "RP. 0"}
                  </p>
                  <p className={styles.phone}>
                    {profile.noTelp
                      ? `+62 ${profile.noTelp}`
                      : "Please Save Your Phone Number"}
                  </p>
                </div>
                <div
                  className={`${styles["top-btn"]} ${styles.btnHide}`}
                  onClick={() => router.push("/transfer")}
                >
                  <div className={styles.btn}>
                    <i className="fa-sharp fa-solid fa-arrow-up"></i>
                    <p>Transfer</p>
                  </div>
                  <div className={styles.btn} onClick={modalControl}>
                    <i className="fa-solid fa-plus"></i>
                    <p>Top Up</p>
                  </div>
                </div>
              </div>
              <div
                className={`${styles["top-btn"]} ${styles.hide}`}
                onClick={() => router.push("/transfer")}
              >
                <div className={styles.btn}>
                  <i className="fa-sharp fa-solid fa-arrow-up"></i>
                  <p>Transfer</p>
                </div>
                <div className={styles.btn} onClick={modalControl}>
                  <i className="fa-solid fa-plus"></i>
                  <p>Top Up</p>
                </div>
              </div>
              <div className={styles["bottom"]}>
                <aside className={styles["right-side"]}>
                  <div className={styles["left-top"]}>
                    <div>
                      <i
                        className="fa-solid fa-arrow-down"
                        style={{
                          color: "#1EC15F",
                          fontSize: "30px",
                          marginBottom: "0.5rem",
                        }}
                      ></i>
                      <p style={{ color: "#6A6A6A" }}>Income</p>
                      <p
                        style={{
                          fontWeight: "700",
                          fontSize: "18px",
                          marginTop: "0.5rem",
                        }}
                      >
                        {`Rp. ${currencyComma(statistic.totalIncome)}`}
                      </p>
                    </div>
                    <div>
                      <i
                        className="fa-solid fa-arrow-up"
                        style={{
                          color: "#FF5B37",
                          fontSize: "30px",
                          marginBottom: "0.5rem",
                        }}
                      ></i>
                      <p style={{ color: "#6A6A6A" }}>Expense</p>
                      <p
                        style={{
                          fontWeight: "700",
                          fontSize: "18px",
                          marginTop: "0.5rem",
                        }}
                      >
                        {`Rp. ${currencyComma(statistic.totalExpense)}`}
                      </p>
                    </div>
                  </div>
                  <Bar
                    data={data}
                    options={chartOptions}
                    className={styles["bar-chart"]}
                  />
                </aside>
                <div className={styles["bottom-right"]}>
                  <div className={styles["right-top"]}>
                    <p className={styles["transaction"]}>Transaction History</p>
                    <p
                      className={styles["seall"]}
                      onClick={() => {
                        router.push("/history");
                      }}
                    >
                      See all
                    </p>
                  </div>
                  {history?.data?.length < 1 ? (
                    <p>No transaction yet</p>
                  ) : (
                    history?.data?.map((data, index) => {
                      if (index < 4) return <Card data={data} key={index} />;
                    })
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
        <Footer />
      </Navbar>
    </>
  );
}

export default Dashboard;
