import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export const evictTunnel = createAsyncThunk(
  "tunnels/evict",
  async (id: string) => {
    const result = await fetch(`/api/tunnels/${id}`, { method: "DELETE" });
    return result.json();
  }
);

export const fetchTunnels = createAsyncThunk<
  TunnelsResponse,
  string,
  { state: RootState }
>("tunnels/fetchAll", async (id) => {
  const result = await fetch(`/api/tunnels`, {
    method: "GET",
  });
  return result.json();
});

interface Client {
  id: string;
  status: {
    connectedSockets: number;
  };
}
interface TunnelsResponse {
  clients: Client[];
}
const adapter = createEntityAdapter<Client>();

export const slice = createSlice({
  name: "tunnels",
  initialState: adapter.getInitialState({ loading: false }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(evictTunnel.fulfilled, (state, { payload }) => {
      state.loading = false;
      adapter.removeOne(state, payload);
    });
    builder.addCase(fetchTunnels.fulfilled, (state, { payload }) => {
      state.loading = false;
      adapter.setAll(state, payload.clients);
    });
  },
});

export const { selectAll, selectTotal } = adapter.getSelectors(
  (state: RootState) => state.tunnels
);

export default slice.reducer;
