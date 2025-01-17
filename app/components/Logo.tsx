/* eslint-disable react/prop-types */
import React from "react";

interface LogoProps {
    src: string;
    width: number;
}

export const Logo: React.FC<LogoProps> = ({ src, width }) => (
    <img src={src} alt="Novari logo" width={width}/>
);
