import { TypedUseSelectorHook, useSelector } from "react-redux";
import { DispatchType, StoreType } from "../store/store";
import { useDispatch } from "react-redux";

export const useSelectorTyped: TypedUseSelectorHook<StoreType> = useSelector;
export const useDispatchTyped: () => DispatchType = useDispatch;
