import React, { FC, useEffect, useState } from "react";
import {
  ThemeProvider,
  createTheme,
  makeStyles,
} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import axios from "axios";

import ParallaxBox from "./components/ParalaxBox";
import Header from "./components/Header";
import ImageWindows, { Images } from "./components/ImageDisplay";
import ImageSlides from "./components/ImageSlides";

const theme = createTheme({
  palette: {
    primary: {
      light: "#3ba2f5",
      main: "#2196f3",
      dark: "#0d8df3",
      contrastText: "#fff",
    },
  },
});

const useStyle = makeStyles({
  socialIcons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  p: {
    marginTop: "3em",
  },
  left: {
    width: "46%",
    padding: "2em",
    position: "absolute",
    left: 0,
  },
  right: {
    width: "50%",
    position: "absolute",
    padding: "1em",
    right: 0,
  },
  box: {
    margin: "0 auto",
    padding: "4em 0",
    maxWidth: 1000,
    position: "relative",
  },
  imageSlide: {
    padding: "2em",
  },
  parallaxBG: {
    backgroundImage: 'url("/img/space.jpg")',
    backgroundPosition: "center center",
    // backgroundRepeat: ""
  },
});

type photoAttr = {
  alt_description: string;
  urls: {
    regular: string;
  };
};

const App: FC = () => {
  const [images, setImages] = useState<Images[]>([]);
  const classes = useStyle();

  useEffect(() => {
    const param = "&orientation=landscape&page=2&query=london";
    const publicKey = "client_id=8Eu3e4wPfPgoAVDYERpUC1EwCa7e5jfL8NaY7b-mpAM";
    const endpoint = "https://api.unsplash.com/search/photos?";
    const url = endpoint + publicKey + param;
    axios(url)
      .then((res) => {
        const data = res.data.results;
        const photos: Images[] = data.map((item: photoAttr) => {
          return {
            alt: item.alt_description,
            url: item.urls.regular,
          };
        });
        setImages(photos);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Parallax pages={6}>
        <ParallaxLayer offset={0} speed={0} style={{ zIndex: 2 }}>
          <Header />
        </ParallaxLayer>
        <ParallaxLayer
          offset={-0.2}
          factor={6}
          speed={0.2}
          className={classes.parallaxBG}
        />
        <ParallaxLayer
          offset={2.5}
          factor={6}
          speed={0.2}
          className={classes.parallaxBG}
        />

        <ParallaxBox speed={2} offset={1}>
          <div className={classes.socialIcons}>
            <div
              className="fb-share-button"
              data-href="https://developers.facebook.com/docs/plugins/"
              data-layout="button"
              data-size="large"
            >
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&src=sdkpreparse"
                className="fb-xfbml-parse-ignore"
              >
                share
              </a>
            </div>
          </div>
          <Typography variant="h5" component="h2">
            I'm a NodeJS and ReactJS + MaterialUI Developer
          </Typography>
          <Typography className={classes.p}>
            All my project uses NodeJS and server side framework ExpressJS in
            the backend but I also having alot of fun using ReactJS in the
            frontend when making user interface.
          </Typography>
        </ParallaxBox>

        <ParallaxLayer sticky={{ start: 1.9, end: 3 }}>
          <Container className={classes.box}>
            <Paper className={classes.left}>
              <Typography align="justify">
                I could use ReactJS and css rules but then I need to think my
                design theme that may take a lot of time. so I will often use
                MaterialUI which is also used by many instead of just css rules.
              </Typography>
            </Paper>
          </Container>
        </ParallaxLayer>

        <ParallaxLayer offset={2.5} speed={1}>
          <Container className={classes.box}>
            <Paper className={classes.right}>
              <Typography variant="caption">
                images displayed using MaterialUI while photos are fetch on
                unsplash.com
              </Typography>
              <ImageWindows images={images} />
            </Paper>
          </Container>
        </ParallaxLayer>
        <ParallaxLayer offset={3.9} speed={1}>
          <Container className={classes.box}>
            <Paper className={classes.imageSlide}>
              <ImageSlides images={images} />
            </Paper>
          </Container>
        </ParallaxLayer>
      </Parallax>
    </ThemeProvider>
  );
};

export default App;
