import React, { useEffect, useState } from "react";
import Router from "next/router";
import { toast } from "react-toastify";
// import useRequest from "../../../hooks/use-request";
// import DashboardLayout from "../repuser/DashboardLayout/DashboardLayout";
import styles from "../../styles/Home.module.css";

import { Button, Container, Text } from "../components/ui";

const Superadmin = () => {
  const roles = ["admin", "superadmin", "user"];
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  //   const { doRequest, errors } = useRequest({
  //     url: "/api/users/signup",
  //     method: "post",
  //     body: data,
  //     onSuccess: (user) => {
  //       setData({
  //         email: "",
  //         password: "",
  //         role: "user",
  //       });
  //       toast("Registerd!");
  //     },
  //   });

  //   useEffect(() => {
  //     const userStorage = window.localStorage.getItem("user");
  //     const user = userStorage ? JSON.parse(userStorage) : null;

  //     if (user?.role === "superadmin") return;
  //     Router.push("/");
  //   }, []);

  const onSubmit = async (event?: any) => {
    event.preventDefault();

    // await doRequest();
  };

  const handleChange = (e?: any) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    // <DashboardLayout>
    <Container>
      <form onSubmit={onSubmit} className="pt-20 pl-20">
        <Text variant="pageHeading">Add Users</Text>
        <div className="form-group">
          <label>Email Address</label>
          <input
            name="email"
            value={data.email}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            name="password"
            value={data.password}
            onChange={handleChange}
            type="password"
            className="form-control"
          />
          <div className="form-group">
            <label>Role</label>
            <select
              name="role"
              value={data.role}
              onChange={handleChange}
              className="form-control"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* {errors} */}
        <button className="btn btn-primary">Sign Up</button>
      </form>
      <form className="w-full max-w-lg pt-20 pl-20" onSubmit={onSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6"></div>

        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-state"
        >
          Email
        </label>
        <input
          type="email"
          className={styles.inputField}
          placeholder="name@example.com"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-state"
        >
          Password
        </label>
        <input
          type="email"
          className={styles.inputField}
          placeholder="******************"
          // onChange={(e) => setEmail(e.target.value)}
        />
        <label
          className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          htmlFor="grid-state"
        >
          Role
        </label>
        <div className={styles.inputField}>
          <select
            name="role"
            value={data.role}
            onChange={handleChange}
            className="pl-40"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <Button className={styles.ButtonField} type="submit">
          Sign Up
        </Button>
      </form>
    </Container>
  );
};

export default Superadmin;
