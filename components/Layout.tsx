import React, { ReactNode, ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Head from "next/head";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

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
        <Typography color="textSecondary">© Tobias </Typography>
      </footer>
    </Container>
  );
};

export default Layout;
