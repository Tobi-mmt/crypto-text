import React, { ReactElement, useState, useEffect } from "react";
import { decrypt } from "../../lib/crypto";
import { getKeyFromRouter } from "../../lib/key";
import { useRouter } from "next/router";

import Layout from "../../components/Layout";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginBottom: theme.spacing(3),
  },
  cardsWrapper: {
    display: "flex",
  },
  cards: {
    width: "100%",
  },
  firstCard: {
    marginRight: theme.spacing(3),
  },
}));

const IndexPage = (): ReactElement => {
  const router = useRouter();
  const { cypherBase64 } = router.query;
  const [plainText, setPlainText] = useState<string>("");
  const [key, setKey] = useState<string>(""); //23456ytrew56
  const [error, setError] = useState<string>("");
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    const key = getKeyFromRouter(router);
    setKey(key);
  }, [router]);

  useEffect(() => {
    // decrypt on change
    if (!key) return setError("Please enter your password");
    if (typeof cypherBase64 === "string") {
      setError("");
      try {
        const plain = decrypt(cypherBase64, key);
        if (!plain) throw new Error("Something went wrong while decrypting");
        setPlainText(plain);
      } catch (e) {
        setError("Looks like your password is wrong");
      }
    }
  }, [key, cypherBase64]);

  return (
    <Layout title="Crypto string">
      <Typography variant="h1" gutterBottom>
        Decrypt
      </Typography>

      <FormControl variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
        <OutlinedInput
          id="password"
          fullWidth
          className={classes.textField}
          value={key}
          onChange={(e) => setKey(e.target.value)}
          type={showPassword ? "text" : "password"}
          labelWidth={70}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      {error ? (
        <Typography>{error}</Typography>
      ) : (
        <TextField
          multiline
          fullWidth
          className={classes.textField}
          label="Your secret Message"
          variant="outlined"
          placeholder="Dear Alice ..."
          rows={4}
          value={plainText}
        />
      )}
    </Layout>
  );
};

export default IndexPage;
