import React, { FC, FocusEvent, ChangeEvent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  textField: {
    border: '2px solid lightgray',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  iconHolder: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196f3',
    color: '#fff',
    '&:hover': {
      backgroundColor: '##1e93f1',
    },
  },
  inputField: {
    backgroundColor: '#fff',
    paddingLeft: 3,
  },
}));

type Props = {
  children: JSX.Element;
  MuiTextFieldProps: TextFieldProps;
};

interface TextFieldProps {
  type: string;
  InputProps?: object;
  fullWidth?: boolean;
  className?: any;
  required?: boolean;
  name?: string;
  autoComplete?: 'off' | 'new-password' | 'new-username';
  onFocus?: (e: FocusEvent<HTMLInputElement>) => any;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any;
  value?: string;
}

const LeftIconTextField: FC<Props> = ({ children, MuiTextFieldProps }) => {
  const classes = useStyles();
  const { InputProps, fullWidth, className, ...RestMuiTextProps } =
    MuiTextFieldProps;

  return (
    <div className={clsx(classes.textField, className)}>
      <Grid container justifyContent="center">
        <Grid item xs={2} className={classes.iconHolder}>
          {children}
        </Grid>
        <Grid item xs>
          <TextField
            fullWidth={fullWidth || true}
            InputProps={{ disableUnderline: true, ...InputProps }}
            className={clsx(classes.inputField)}
            {...RestMuiTextProps}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default LeftIconTextField;
