import { createContext } from "react";
import CounterStore from "./counterStore";
import UiStore from "./uiStore";

interface Store {
    countStore: CounterStore,
    uiStore : UiStore
}


export const store:Store = {
    countStore : new CounterStore(),
    uiStore : new UiStore()
}

export const StoreContext = createContext(store);