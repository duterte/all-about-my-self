import React, { FC, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};
type Image = {
  url: string;
  alt: string;
};
type Props = {
  images: Image[];
};

type DragProperties = {
  offset: {
    x: number;
  };
  velocity: {
    x: number;
  };
};

const useStyle = makeStyles({
  container: {
    position: "relative",
    backgroundColor: "#333",
  },
  next: {
    right: 10,
    position: "absolute",
    bottom: "50%",
    backgroundColor: "white",
    borderRadius: 30,
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    pointerEvents: "all",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 12,
    zIndex: 2,
    padding: "1em",
  },
  prev: {
    left: 10,
    position: "absolute",
    bottom: "50%",
    backgroundColor: "white",
    borderRadius: 30,
    width: 40,
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    userSelect: "none",
    pointerEvents: "all",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 12,
    zIndex: 2,
    padding: "1em",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const ImageSlides: FC<Props> = ({ images }) => {
  const [page, setPage] = useState<[number, number]>([0, 0]);
  const classes = useStyle();

  function paginate(direction: number) {
    setPage((prev) => {
      return [prev[0] + direction, direction];
    });
  }

  function dragEndHandler(e: any, dragProperties: DragProperties) {
    console.log(e);
    const { offset, velocity } = dragProperties;
    const swipe = swipePower(offset.x, velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  }
  const index = wrap(0, images.length, page[0]);

  if (images.length > 0) {
    return (
      <div className={classes.container}>
        <AnimatePresence initial={false} custom={page[1]}>
          <motion.img
            key={page[0]}
            src={images[index].url}
            alt={images[index].alt}
            className={classes.img}
            custom={page[1]}
            variants={variants}
            initial="center"
            animate="center"
            exit="exit"
            transition={{
              x: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
              opacity: {
                duration: 0.2,
              },
            }}
            drag="x"
            dragConstraints={{
              left: 0,
              right: 0,
            }}
            dragElastic={1}
            onDragEnd={dragEndHandler}
          />
        </AnimatePresence>
        <div
          className={classes.next}
          onClick={() => {
            console.log("next");
            paginate(1);
          }}
        >
          Next
        </div>
        <div className={classes.prev} onClick={() => paginate(-1)}>
          Prev
        </div>
      </div>
    );
  } else {
    return <Typography>No Photo Available</Typography>;
  }
};

export default ImageSlides;
