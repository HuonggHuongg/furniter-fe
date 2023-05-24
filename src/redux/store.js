import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import { userSlice } from "./slices/userSlice";
import { productSlice } from "./slices/productSlice";
import globalSlice  from "./slices/globalSlice";
import categorySlice  from "./slices/categorySlice";
import orderSlice  from "./slices/orderSlice";
import orderPendingSlice  from "./slices/orderPendingSlice";
import orderDeliveredSlice  from "./slices/orderDeliveredSlice";



const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        cart: cartSlice,
        product: productSlice.reducer,
        globalSlice,
        categorySlice,
        orderSlice,
        orderPendingSlice,
        orderDeliveredSlice
    }
})

export default store;