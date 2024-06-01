import { LeftSquareOutlined, RightSquareOutlined } from '@ant-design/icons';
import React from 'react';
import styled from 'styled-components';

interface IToggleButton {
    isActivityVisible: boolean;
    setIsActivityVisible: (value: boolean) => void;
    widgetWidth: string;
    setWidgetWidth: (value: string) => void;
    onClick?: () => void;
}
const Button = styled.div`
    background-color: #006cb8;
    border-radius: 10px 0px 0px 10px;
    height: 32px;
    width: 28px;
    position: absolute;
    top: 10px;
    right: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    cursor: pointer;
    svg {
        color: white;
    }
`;
const ToggleButton = (props: IToggleButton) => {
    const toggleActivityVisibility = () => {
        if (props.onClick) {
            props.onClick();
        }

        props.setIsActivityVisible(!props.isActivityVisible);
        props.setWidgetWidth(props.isActivityVisible ? '100%' : '1800px');
    };

    return (
        <Button onClick={toggleActivityVisibility}>
            {props.isActivityVisible ? (
                <LeftSquareOutlined rev={''} color="white" />
            ) : (
                <RightSquareOutlined rev={''} color="#fff" />
            )}
        </Button>
    );
};

export default ToggleButton;
