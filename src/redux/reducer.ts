import InitStore from "./store";

const reducer = function (state=InitStore, action:any) {
    switch (action.type) {
        case "add":
            return {...state,name:action.name}
        default:
            return InitStore;
    }
};

export default reducer;
