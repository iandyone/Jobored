import axios from "@/axios";
import { ICatalog } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";


// === NOT USED === //

const fetchCatalogAsync = createAsyncThunk(`fetchCatalog`, async (_, thunkAPI) => {
  try {
    const response = await axios.get<ICatalog[]>("/catalogues", {
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

