import React from 'react';
import { useAppContext } from './popup_context_provider';
import { PopupContainerStyle, FlexContainer, BlackBack } from '../../components/popup/styles';

const PopupContainer = () => {
    const { isPopupShown, component, hidePopup } = useAppContext();

    if (!isPopupShown) return null;

    return (
        <>
            <BlackBack onClick={hidePopup} />
            <FlexContainer>
                <PopupContainerStyle>
                    {component}
                </PopupContainerStyle>
            </FlexContainer>
        </>
    )
}

export default PopupContainer;