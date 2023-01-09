import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardHistory from "../../components/CardHistory";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/SideBar";
import styles from "../../styles/History.module.css";
import historyAction from "../../redux/actions/history";

function History() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const history = useSelector((state) => state.history);
  const totalPage = useSelector((state) => state.history.pagination.totalPage);
  const [query, setQuery] = useState({
    page: 1,
    limit: 4,
    filter: "MONTH",
  });
  const [filter, setFilter] = useState(false);
  const [filterSelect, setfilterSelect] = useState(null);
  const [dataFound, setDataFound] = useState(false);

  useEffect(() => {
    router.push(`/history?page=${query.page}&filter=${query.filter}`);
    dispatch(historyAction.getHistoryThunk(auth.userData.token, query));
    if (history?.data.length > 0) setDataFound(true);
  }, [query]);

  console.log(totalPage);
  return (
    <>
      <PageTitle title="History" />
      <Navbar />
      <div className={styles.container}>
        <div className={`col-lg-3 ${styles.onMobile}`}>
          <Sidebar />
        </div>
        <aside className={styles["bottom-right"]}>
          <div className={styles["right-top"]}>
            <p className={styles["transaction"]}>Transaction History</p>
            <div className={`${styles.filter} ${styles.filterHead}`}>
              <div
                className={styles.show}
                onClick={() => {
                  setFilter(filter ? false : true);
                  console.log(filter);
                }}
              >
                {!filterSelect ? "-- Select Filter --" : filterSelect}
              </div>
              {filter && (
                <div
                  className={
                    filter ? styles.filterDownOn : styles.filterDownOff
                  }
                >
                  <p
                    className={
                      filter ? styles.filterDownOn2 : styles.filterDownOff
                    }
                    onClick={() => {
                      setQuery({ ...query, page: 1, filter: "WEEK" });
                      setfilterSelect("Week");
                      setFilter(false);
                    }}
                  >
                    Week
                  </p>
                  <p
                    className={
                      filter ? styles.filterDownOn2 : styles.filterDownOff
                    }
                    onClick={() => {
                      setQuery({ ...query, page: 1, filter: "MONTH" });
                      setfilterSelect("Month");

                      setFilter(false);
                    }}
                  >
                    Month
                  </p>
                  <p
                    className={
                      filter ? styles.filterDownOn2 : styles.filterDownOff
                    }
                    onClick={() => {
                      setQuery({ ...query, page: 1, filter: "YEAR" });
                      setfilterSelect("Year");
                      setFilter(false);
                    }}
                  >
                    Year
                  </p>
                </div>
              )}
            </div>
          </div>
          {dataFound ? (
            history.data.map((data, index) => {
              return <CardHistory data={data} key={index} />;
            })
          ) : (
            <div>
              <div className={styles["no-data"]}>No Data Available</div>
            </div>
          )}
          <div className={styles["btn-container"]}>
            <button
              disabled={query.page === 1 ? true : false}
              onClick={() => {
                setQuery({ ...query, page: query.page - 1 });
              }}
            >
              <i className="bi bi-chevron-left"></i>
            </button>
            <button
              disabled={query.page === totalPage ? true : false}
              onClick={() => {
                setQuery({ ...query, page: query.page + 1 });
              }}
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </aside>
      </div>

      <Footer />
    </>
  );
}

export default History;
