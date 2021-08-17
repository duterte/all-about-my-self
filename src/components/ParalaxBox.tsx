import React, { FC, useState, useCallback, ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ParallaxLayer } from "@react-spring/parallax";
import Container from "@material-ui/core/Container";

const useStyle = makeStyles({
  box: {
    margin: "0 auto",
    padding: "4em 0",
    maxWidth: 1000,
  },
  bg: {
    backgroundColor: "orange",
  },
});

type Props = {
  children: JSX.Element | JSX.Element[];
  speed: number;
  offset: number;
};

const ParallaxBox: FC<Props> = ({ children, speed, offset }): ReactElement => {
  const [height, setHeight] = useState<string | number>("");
  const classes = useStyle();

  const intro = useCallback((node) => {
    if (node) {
      const height = getComputedStyle(node).height;
      setHeight(height);
    }
  }, []);

  return (
    <ParallaxLayer
      offset={offset}
      speed={speed}
      className={classes.bg}
      style={{ height: height || 0 }}
    >
      <ParallaxLayer
        offset={offset}
        speed={speed}
        style={{ transform: "none" }}
      >
        <Container className={classes.box} ref={intro}>
          {children}
        </Container>
      </ParallaxLayer>
    </ParallaxLayer>
  );
};

export default ParallaxBox;
