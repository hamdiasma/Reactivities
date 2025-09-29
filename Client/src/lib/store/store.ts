import { createContext } from "react";
import CounterStore from "./counterStore";
import UiStore from "./uiStore";
import ActivityStore from "./activityStore";

interface Store {
    countStore: CounterStore,
    uiStore : UiStore,
    activityStore : ActivityStore
}


export const store:Store = {
    countStore : new CounterStore(),
    uiStore : new UiStore(),
    activityStore : new ActivityStore()
}

export const StoreContext = createContext(store);