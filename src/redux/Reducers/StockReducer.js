
// const initiale_value = { products :[
    
//     {
//         id: 1,
//         name: "Phone",
//         image: "/phone.jpg",
//         qt: 200,
//         distrubiteur: "Ahmed Motawakil"
//     },
//     {
//         id: 2,
//         name: "Laptop",
//         image: "/Laptop.jpg",
//         qt: 150,
//         distrubiteur: "John Doe"
//     },
//     {
//         id: 3,
//         name: "Tablet",
//         image: "/tablet.jpg",
//         qt: 100,
//         distrubiteur: "Jane Smith"
//     },
//     {
//         id: 4,
//         name: "Headphones",
//         image: "/headPhones.jpg",
//         qt: 300,
//         distrubiteur: "Bob Johnson"
//     }
  
    
// ]
// }
let initiale_value = JSON.parse(localStorage.getItem("products")) 
if (initiale_value === null) {
    initiale_value = {products:[]}
}
const StockReducer = (state = initiale_value, action) => {
    switch (action.type) {
        case "ADD_STOCK":
            localStorage.setItem("products",JSON.stringify({...state , products: [...state.products, action.payload]}))
            return {...state , products: [...state.products, action.payload]}
        case "DELETE_STOCK":    
            localStorage.setItem("products",JSON.stringify({...state , products: state.products.filter((item) => item.id !== action.payload)}))
            return  {...state , products: state.products.filter((item) => item.id !== action.payload)}
        case "UPDATE_STOCK":
            localStorage.setItem("products",JSON.stringify({...state , products: state.products.map((item) => item.id === action.payload.id ? action.payload : item)}))
                return {...state , products: state.products.map((item) => item.id === action.payload.id ? action.payload : item)}
        default:
            return state;
    }
};

export default StockReducer