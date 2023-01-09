import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/LayoutAuth";
import PageTitle from "../../components/PageTitle";
import styles from "../../styles/Forgot.module.css";
import authAction from "../../redux/actions/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Forgot() {
  const dispatch = useDispatch();
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const [body, setBody] = useState({
    linkDirect: "http://localhost:3000/forgot/",
  });

  const forgotSuccess = () => {
    toast.success("Please check your email to reset your password");
  };
  const forgotDenied = () => toast.error(`${auth.error}`);
  const [emptyForm, setEmptyForm] = useState(true);
  const changeHandler = (e) =>
    setBody({ ...body, [e.target.name]: e.target.value });

  const checkEmptyForm = (body) => {
    if (!body.email) return setEmptyForm(true);
    body.email && setEmptyForm(false);
  };

  const forgotHandler = (e) => {
    e.preventDefault();
    dispatch(authAction.forgotThunk(body, forgotSuccess, forgotDenied));
  };

  useEffect(() => {
    checkEmptyForm(body);
  }, [body]);

  useEffect(() => {
    if (auth.isLoading) setEmptyForm(true);
  }, [auth]);

  return (
    <>
      <PageTitle title="Forgot Password" />

      <Layout>
        <h1 className={styles["h1"]}>
          Did You Forgot Your Password? Don’t Worry, You Can Reset Your Password
          In a Minutes.
        </h1>
        <p className={styles["description"]}>
          To reset your password, you must type your e-mail and we will send a
          link to your email and you will be directed to the reset password
          screens.
        </p>
        <form onSubmit={forgotHandler} className={styles["form"]}>
          <div className={styles["email"]}>
            <i className="bi bi-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Enter your e-mail"
              required
              onChange={changeHandler}
            ></input>
          </div>
          <button type="submit" disabled={emptyForm}>
            Confirm
          </button>
          <div className={styles["link-blue"]}>
            Back to{"  "}
            <Link href="/login">Login</Link>
          </div>
        </form>
      </Layout>
    </>
  );
}
