import React, { ReactElement, useState, useEffect } from "react";
import classnames from "classnames";
import Layout from "../components/Layout";
import { encrypt, stringToBase64 } from "../lib/crypto";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

import LinkCard from "../components/LinkCard";

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
  const [plainText, setPlainText] = useState<string>("");
  const [cypher, setCypher] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>(
    "You need to enter a password AND your message"
  );
  const classes = useStyles();

  useEffect(() => {
    // encrypt on change
    setError("");
    if (plainText && key) {
      try {
        const plain = encrypt(plainText, key);
        if (!plain) throw new Error("Something went wrong while decrypting");
        setCypher(plain);
      } catch (e) {
        setError("Looks like your password is wrong");
      }
    } else {
      setError("You need to enter a password AND your message");
    }
  }, [key, plainText]);

  return (
    <Layout title="Crypto string">
      <Typography variant="h1" gutterBottom>
        Crypto string - encrypt
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

      <TextField
        multiline
        fullWidth
        className={classes.textField}
        label="Your secret Message"
        variant="outlined"
        placeholder="Dear Alice ..."
        rows={4}
        value={plainText}
        onChange={(e) => setPlainText(e.target.value)}
      />
      {error ? (
        <Typography>{error}</Typography>
      ) : (
        <div className={classes.cardsWrapper}>
          <LinkCard
            className={classnames(classes.cards, classes.firstCard)}
            headline="Public link"
            text="It is save to send this link via unsecured ways since all data are
              securely encrypted."
            url={`/decrypt/${cypher}`}
          />
          <LinkCard
            className={classes.cards}
            headline="Private link"
            text="This link contains the password. Do no post this in public places."
            url={`/decrypt/${cypher}#${stringToBase64(key)}`}
          />
        </div>
      )}
    </Layout>
  );
};

export default IndexPage;
