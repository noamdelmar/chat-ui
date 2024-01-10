import { createContext } from "react";

const AppContext = createContext({
    showPopup: (component) => { },
    hidePopup: () => { },
    isPopupShown: false,
    component: null
});

export default AppContext;