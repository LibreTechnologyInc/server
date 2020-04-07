import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTunnels,
  evictTunnel,
  selectAll,
  selectTotal,
} from "./tunnelsSlice";
import styles from "./Tunnels.module.css";

export function Tunnels() {
  const count = useSelector(selectTotal);
  const tunnels = useSelector(selectAll);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTunnels(""));
  }, []);

  return (
    <div>
      <div className={styles.row}>
        <span className={styles.value}>{count}</span>
      </div>
      <hr />
      {tunnels.map(({ id, status }) => (
        <div className={styles.row} key={id}>
          <span>id</span>{" "}
          <button
            className={styles.button}
            aria-label="Decrement value"
            onClick={() => dispatch(evictTunnel(id))}
          >
            -
          </button>
          <pre>{JSON.stringify(status, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}
