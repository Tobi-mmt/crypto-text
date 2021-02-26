import React, { useState, ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Snackbar from "@material-ui/core/Snackbar";

import FileCopy from "@material-ui/icons/FileCopy";
import Check from "@material-ui/icons/Check";

const useStyles = makeStyles({
  title: {
    fontSize: 14,
  },
});

const copyToClipboard = (text: string): void => {
  navigator.clipboard.writeText(text);
};

export interface LinkCardProps {
  headline: string;
  text: string;
  url: string;
  className?: string;
}
const LinkCard = ({
  headline,
  text,
  url,
  className = "",
}: LinkCardProps): ReactElement => {
  const classes = useStyles();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  return (
    <>
      <Card className={className} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {headline}
          </Typography>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            {text}
          </Typography>
          <Input
            value={`https://crypto-text.vercel.app${url}`}
            fullWidth
            startAdornment={
              <InputAdornment position="start">
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={isCopied ? <Check /> : <FileCopy />}
                  onClick={() => {
                    copyToClipboard(`https://crypto-text.vercel.app${url}`);
                    setIsCopied(true);
                  }}
                >
                  Copy link
                </Button>
              </InputAdornment>
            }
          />
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={isCopied}
        autoHideDuration={3000}
        onClose={() => setIsCopied(false)}
        message="Link copied"
      />
    </>
  );
};

export default LinkCard;
