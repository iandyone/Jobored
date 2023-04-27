import axios from "@/axios";
import { ICatalog } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchCatalogAsync = createAsyncThunk(`fetchUsers`, async (_, thunkAPI) => {
  try {
    const response = await axios.get<ICatalog[]>("/2.0/catalogues/", {
      headers: {
        Authorization: localStorage.getItem("Access"),
      },
    });
    return response.data;
  } catch (error) {
    thunkAPI.rejectWithValue('Не удалось загрузить список категорий');
  }
});

export default fetchCatalogAsync;

