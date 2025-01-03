import {createStore} from 'redux'
import StockReducer from '../Reducers/StockReducer'
export const store = createStore(StockReducer , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
