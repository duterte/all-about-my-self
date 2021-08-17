import React, { FC, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

import { motion } from 'framer-motion';

import Login from './Login';

const useStyles = makeStyles({
  header: {
    backgroundImage: 'url("/img/bailey-zindel-NRQV-hBF10M-unsplash-lg.jpg")',
    height: '100vh',
    backgroundPosition: 'center center',
    position: 'relative',
    display: 'grid',
    gridTemplateRows: 'auto 65% 1fr',
  },
  appBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  pageTitle: {
    color: '#fff',
  },
  avatar: {
    width: '300px',
    height: '300px',
    justifySelf: 'center',
    alignSelf: 'center',
    position: 'relative',
    top: 50,
  },
  name: {
    fontWeight: 'bolder',
    justifySelf: 'center',
    color: '#dcd5d5',
    textShadow: '1px 1px 1px black, -1px -1px 1px black',
  },
});

const Header: FC = () => {
  const [toggleLogin, setToggleLogin] = useState<boolean>(false);
  const classes = useStyles(motion.div);

  return (
    <div className={classes.header}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={12} md={4}>
              <Typography className={classes.pageTitle}>
                All About MySelf
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs
              justifyContent="flex-end"
              alignItems="center"
            >
              <Grid item>
                <Button color="secondary">Home</Button>
              </Grid>
              <Grid item>
                <Button color="secondary">About Me</Button>
              </Grid>
              <Grid item>
                <Button color="secondary" onClick={() => setToggleLogin(true)}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Avatar
        src="/img/german-ochea.png"
        alt="German Ochea"
        className={classes.avatar}
        component={motion.div}
        animate={{
          borderRadius: ['50%', '50%', '20%', '20%', '50%'],
          rotateY: [0, 45, 90, 135, 180, 225, 270, 315, 360],
        }}
        transition={{
          delay: 7,
          duration: 10,
          yoyo: Infinity,
        }}
      />
      <Typography variant="h2" className={classes.name} component={motion.div}>
        German Ochea
      </Typography>
      <Modal open={toggleLogin} onClose={() => setToggleLogin(false)}>
        <>
          <Login />
        </>
      </Modal>
    </div>
  );
};

export default Header;
