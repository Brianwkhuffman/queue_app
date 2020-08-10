import React, { useState, useEffect } from "react";
import styles from "./RetailerView.module.scss";
import Customer from "../../components/CustomerInList";
import clock from "../../utils/imgs/clock.png";
import { connect } from "react-redux";
import { fetchOneRetailer } from "../../actions";

function RetailerView(props) {
  // handles open and close of On Hold list
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let holdList = document.getElementById("holdList");
    let expand = document.getElementById("expand");
    let collapse = document.getElementById("collapse");

    if (isOpen) {
      holdList.setAttribute("style", "top:3%");
      expand.setAttribute("style", "display: none");
      collapse.removeAttribute("style");
    } else {
      holdList.removeAttribute("style");
      expand.removeAttribute("style");
      collapse.setAttribute("style", "display: none");
    }
  }, [isOpen]);

  const handleExpand = () => {
    setIsOpen(true);
  };

  const handleCollapse = () => {
    setIsOpen(false);
  };

  // grabs the initial data when the view loads
  const { dispatchFetchOneRetailer } = props;
  useEffect(() => {
    dispatchFetchOneRetailer("5f30ad8e43006674ca19bd01");
  }, []);

  return (
    <div className={styles.RetailerView}>
      <ul className={styles.WaitList}>
        <div className={styles.header}>
          <h3>Queue</h3>
          <div className={styles.time}>
            <img src={clock} alt="average wait time" />
            <h3>5 min</h3>
          </div>
        </div>
        <div className={styles.listContainer}>
          {props.waitList.map((customer, index) => {
            let statuses = {
              confirmed: "#6d9773",
              hold: "#ffba00",
              cancelled: "#ff421f",
            };

            let color;
            if (
              customer.status !== "pending" ||
              customer.status !== "entered"
            ) {
              color = statuses[customer.status];
            }
            return (
              <Customer
                customer={customer}
                color={color}
                index={index}
                key={index}
              ></Customer>
            );
          })}
        </div>
      </ul>
      <ul className={styles.HoldList} id="holdList">
        <div className={styles.expand} onClick={handleExpand} id="expand" />
        <div className={styles.header}>
          <h3>On Hold</h3>
          <div
            className={styles.collapse}
            onClick={handleCollapse}
            id="collapse"
          ></div>
        </div>
        <div className={styles.listContainer}>
          {props.holdList.map((customer, index) => {
            let statuses = {
              confirmed: "#6d9773",
              hold: "#ffba00",
              cancelled: "#ff421f",
            };

            let color;
            if (
              customer.status !== "pending" ||
              customer.status !== "entered"
            ) {
              color = statuses[customer.status];
            }
            return (
              <Customer
                customer={customer}
                color={color}
                index={index}
                key={index}
              ></Customer>
            );
          })}{" "}
        </div>
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    waitList: [...state.currentRetailer.waitList],
    holdList: [...state.currentRetailer.holdList],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFetchOneRetailer: (retailerId) => {
      dispatch(fetchOneRetailer(retailerId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RetailerView);
