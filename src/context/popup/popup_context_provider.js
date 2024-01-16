import React, { useState, useContext } from "react";
import PopupContext from './popup_context';

export const useAppContext = () => useContext(PopupContext)

const ContextPopupProvider = ({ children }) => {
    const showPopup = (component, size) => {
        togglePopup(prevState => {
            return {
                ...prevState,
                isPopupShown: true,
                component: component,
                size: size
            }
        })
    }

    const hidePopup = () => {
        togglePopup(prevState => {
            return {
                ...prevState,
                isPopupShown: false,
                component: null
            }
        })
    }

    const loadingState = {
        isPopupShown: false,
        showPopup,
        hidePopup
    }

    const [loading, togglePopup] = useState(loadingState);

    return (
        <PopupContext.Provider value={loading}>
            {children}
        </PopupContext.Provider>
    )
}

export default ContextPopupProvider