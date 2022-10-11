import Button from "./Button";
import { IoArrowRedoCircleSharp, IoCheckmarkSharp } from "react-icons/io5";

import "./styles.css";
import React from 'react';

export default function App() {
    return (
        <div className="App">
            <Button primary>Click me</Button>
            <Button secondary>Click me</Button>
            <Button primary arrow>
                Click me
            </Button>
            <Button secondary icon={<IoArrowRedoCircleSharp />}>
                Click me
            </Button>
            <Button secondary icon={<IoCheckmarkSharp />}>
                Click me
            </Button>
        </div>
    );
}
