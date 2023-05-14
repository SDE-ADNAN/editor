import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth-slice';
import campaignReducer from './campaign-slice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        campaigns: campaignReducer
    }
});

export default store;