// bhai mai yahan apna dimaag laga raha tha toh galt ho gaya 


//

//

// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import authSlice from "./authSlice";
// import jobSlice from "./jobSlice";
// import {
//     persistStore,
//     persistReducer,
//     FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,
// } from 'redux-persist'
// // import {storage} from 'redux-persist/lib/storage';
// import companySlice from "./companySlice";
// // import applicationSlice from "./applicationSlice";

// // custom storage for browser localStorage
// const storage = {
//   getItem: (key) => Promise.resolve(localStorage.getItem(key)),
//   setItem: (key, value) => {
//     localStorage.setItem(key, value);
//     return Promise.resolve();
//   },
//   removeItem: (key) => {
//     localStorage.removeItem(key);
//     return Promise.resolve();
//   },
// };

// const persistConfig = {
//     key: 'root',
//     version: 1,
//     storage,
// }

// const rootReducer = combineReducers({
//     auth:authSlice,
//     job:jobSlice,
//     company:companySlice,
//     // application:applicationSlice
// })

// const persistedReducer = persistReducer(persistConfig, rootReducer)


// const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//             },
//         }),
// });
// export const persistor = persistStore(store);
// export default store;


// yaha sir apna laga rahe the kya dimaag


// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import authSlice from "./authSlice";
// import jobSlice from "./jobSlice";
// import companySlice from "./companySlice";

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";

// import storage from "redux-persist/lib/storage";

// const webStorage = storage.default;

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage: webStorage,
// };

// const rootReducer = combineReducers({
//   auth: authSlice,
//   job: jobSlice,
//   company: companySlice,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [
//           FLUSH,
//           REHYDRATE,
//           PAUSE,
//           PERSIST,
//           PURGE,
//           REGISTER,
//         ],
//       },
//     }),
// });

// export const persistor = persistStore(store);
// export default store;


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";


import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storageSession from "redux-persist/lib/storage";

const storage = storageSession.default || storageSession;
// import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage, // direct use karo
};

const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company: companySlice,
  application: applicationSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export const persistor = persistStore(store);
export default store;