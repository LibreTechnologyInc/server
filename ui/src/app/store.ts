import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import tunnelsReducer from "../features/tunnels/tunnelsSlice";

export const store = configureStore({
  reducer: {
    tunnels: tunnelsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
