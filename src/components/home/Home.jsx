import React, { useState } from "react";
import styles from "./Home.module.css";
import { Box, Container, TextField, Button } from "@mui/material";
import stocks from "../../data.json";

export default function Home() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [wishData, setWishData] = useState([]);

  const handleFind = (e) => {
    // console.log(e.target.value);
    let { value } = e.target;
    setInput(value);
    if (value === "") return;
    value = value.toUpperCase();
    let ans = stocks.filter((el) => el[0].split("::")[0].includes(value));
    console.log(ans);
    setData(ans);
  };
  function debouncer(delay, callback) {
    let debounce;
    return function (e) {
      debounce && clearTimeout(debounce);
      debounce = setTimeout(function () {
        callback(e);
      }, delay);
    };
  }

  function addWish(el) {
    if (
      wishData.findIndex(
        (e) => e[0].split("::")[0] === el[0].split("::")[0]
      ) !== -1
    ) {
      deleteWish(el);
      setInput("");
      return;
    }
    setWishData((pre) => {
      return [...pre, el];
    });
    setInput("");
  }
  function deleteWish(e) {
    let data = wishData.filter(
      (el) => el[0].split("::")[0] !== e[0].split("::")[0]
    );
    setWishData(data);
  }

  return (
    <Container
      sx={{
        width: "900px",
      }}
    >
      <Box
        sx={{
          height: "100vh",
          // backgroundColor: "primary.dark",
        }}
        className={styles.box}
      >
        <div className={styles.inputTagDiv}>
          <TextField
            sx={{ width: "95%" }}
            id="outlined-basic"
            label="Search stocks..."
            variant="outlined"
            onChange={debouncer(500, handleFind)}
            className={styles.inputTag}
          />
          <div
            className={`${styles.searchSeaction} ${
              input !== "" && styles.showIt
            }`}
          >
            {data.map((el, i) => (
              <div key={i} className={styles.eachItem}>
                <div className={styles.eachItemEachLine}>
                  <div>{el[0].split("::")[0]}</div>
                  <div>{el[1]}</div>
                </div>
                <div className={styles.eachItemEachLine}>
                  <div>{el[0].split("::")[1]}</div>
                  <div>{((el[1] - el[2]) / el[2]).toFixed(4)} %</div>
                </div>
                <Button
                  variant="contained"
                  className={styles.eachAddIcon}
                  onClick={() => addWish(el)}
                >
                  {wishData.findIndex(
                    (e) => e[0].split("::")[0] === el[0].split("::")[0]
                  ) === -1
                    ? "Add"
                    : "Delete"}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.wishSection}>
          {wishData.map((el, i) => (
            <div
              key={i}
              className={`${styles.eachItem} ${styles.eachWishItem}`}
            >
              <div className={`${styles.eachItemEachLine}`}>
                <div
                  className={`${
                    el[1] > el[2] ? styles.makeItGreen : styles.makeItRed
                  }`}
                >
                  {el[0].split("::")[0]}
                </div>
                <div
                  className={`${
                    el[1] > el[2] ? styles.makeItGreen : styles.makeItRed
                  }`}
                >
                  {el[1]}
                </div>
              </div>
              <div className={styles.eachItemEachLine}>
                <div className={styles.nse}>{el[0].split("::")[1]}</div>
                <div>{((el[1] - el[2]) / el[2]).toFixed(4)} %</div>
              </div>
              <Button
                variant="contained"
                className={styles.eachAddIcon}
                onClick={() => deleteWish(el)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>
      </Box>
    </Container>
  );
}
