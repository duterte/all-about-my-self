// import React, { FC } from "react";

// const Login: FC = () => {
//   return <h1>Login</h1>;
// };

import React, { FC, SyntheticEvent, useState, ChangeEvent } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";
// import CircularProgress from "@material-ui/core/CircularProgress";

// import axios from "axios";

import LeftIconTextField from "./LeftIconTextField";

const useStyles = makeStyles((theme) => ({
  loginModal: {
    position: "absolute",
    width: 400,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: theme.spacing(4),
    backgroundColor: "#e3f2fd",
  },
  userName: {
    marginTop: "2em",
    marginBottom: "2em",
  },
  createAccountBtn: {
    backgroundColor: "#2196f3",
    marginTop: "2em",
    marginBottom: "2em",
  },
  password: {
    marginBottom: "2em",
  },
  loginModalBtn: {
    marginTop: "2em",
    marginBottom: "2em",
  },
  divider: {
    backgroundColor: "#000",
    marginBottom: "2em",
  },
  loadingSpinner: {
    color: "#fff",
  },
}));

const Login: FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const classes = useStyles();

  function loginHandler(e: SyntheticEvent) {
    e.preventDefault();

    // axios
    //   .post("/login", { userName, password })
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));
  }

  return (
    <Paper className={classes.loginModal}>
      <Typography variant="h6" align="center">
        Login your account
      </Typography>
      <form autoComplete="off" onSubmit={loginHandler}>
        <LeftIconTextField
          MuiTextFieldProps={{
            type: "text",
            className: classes.userName,
            required: true,
            name: "login-user",
            autoComplete: "new-username",
            value: userName,
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value),
          }}
        >
          <AccountCircle />
        </LeftIconTextField>
        <LeftIconTextField
          MuiTextFieldProps={{
            type: "password",
            className: classes.password,
            required: true,
            name: "login-pwd",
            autoComplete: "new-password",
            value: password,
            onChange: (e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value),
          }}
        >
          <Lock />
        </LeftIconTextField>
        <Link color="textPrimary">Forgot Password?</Link>
        <Grid
          className={classes.loginModalBtn}
          container
          justifyContent="space-around"
        >
          <Grid item xs={5}>
            <Button color="secondary" variant="contained" fullWidth>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Login
              {/* <CircularProgress className={classes.loadingSpinner} size={25} /> */}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Divider variant="middle" className={classes.divider} />
      <Typography variant="subtitle1" align="center">
        Create Your Reale Estate Account
      </Typography>
      <Button
        className={classes.createAccountBtn}
        color="primary"
        variant="contained"
        fullWidth
      >
        Create Account
      </Button>
    </Paper>
  );
};

export default Login;
