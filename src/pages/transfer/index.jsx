import Image from "next/image";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/SideBar";
import css from "../../styles/Transfer.module.css";
import icon from "public/images/search.png";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getAllUser } from "../../modules/api/transfer";
import transferAction from "../../redux/actions/transfer";
import Card from "../../components/CardUser";

function Transfer() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [userData, setUserData] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const token = useSelector((state) => state.auth.userData.token);
  let page = parseInt(router.query.page) || 1;

  useEffect(() => {
    router.query.q
      ? getAllUser(token, page, router.query.q)
          .then((res) => {
            setUserData(res.data.data);

            setPaginationData(res.data.pagination);
          })
          .catch((err) => console.log(err))
      : getAllUser(token, page)
          .then((res) => {
            setUserData(res.data.data);
            setPaginationData(res.data.pagination);
          })
          .catch((err) => console.log(err));
    dispatch(transferAction.transferReset());
  }, [router.query]);
  console.log(userData);

  return (
    <>
      <PageTitle title="Transfer" />
      <Navbar />
      <div className={css.container}>
        <div className={`col-lg-3 ${css.onMobile}`}>
          <Sidebar />
        </div>
        <aside className={`${css["bottom-right"]} ${css.side}`}>
          <div className={css["right-top"]}>
            <p className={css["transaction"]}>Search Receiver</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push(`/transfer?q=${e.target.q.value}`);
            }}
          >
            <div className={css.searchs}>
              <Image src={icon} className={css.searchImage} alt="search" />
              <input
                type="text"
                name="q"
                defaultValue={router.query.q || null}
                className={css.searchInput}
                placeholder="Search receiver here"
              />
            </div>
          </form>
          {userData ? (
            userData.map((data, index) => {
              return <Card data={data} key={index} />;
            })
          ) : (
            <div>
              <div className={css["no-data"]}>No Data Available</div>
            </div>
          )}
        </aside>
      </div>
      <Footer />
    </>
  );
}

export default Transfer;
