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
      {tunnels.map(({ id, status }) => (
        <div
          className={styles.row}
          key={id}
          style={{ padding: 10, display: "block", position: "relative" }}
        >
          <div style={{ width: "100%", display: "block" }}>
            {id}{" "}
            <button
              className={styles.button}
              aria-label="Evict tunnel"
              onClick={() => dispatch(evictTunnel(id))}
            >
              Evict ({status.connectedSockets})
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
