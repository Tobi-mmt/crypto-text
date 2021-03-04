import React, { ReactNode, ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Head from "next/head";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";

export type LayoutProps = {
  children?: ReactNode;
  title?: string;
};

const useStyles = makeStyles((theme) => ({
  footer: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    borderTop: "1px solid gray",
    display: "flex",
    justifyContent: "space-between",
  },
  flex: {
    display: "flex",
  },
  link: {
    color: "black",
    marginLeft: "1em",
  },
}));

const Layout = ({
  children,
  title = "Crypto text",
}: LayoutProps): ReactElement => {
  const classes = useStyles();
  return (
    <Container>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header></header>

      <>{children}</>

      <footer className={classes.footer}>
        <Typography color="textSecondary">© Tobias</Typography>
        <div className={classes.flex}>
          <Typography color="textSecondary">
            This is an open source project{" "}
          </Typography>
          <a
            className={classes.link}
            href="https://github.com/Tobi-mmt/crypto-text"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
          </a>
        </div>
      </footer>
    </Container>
  );
};

export default Layout;
