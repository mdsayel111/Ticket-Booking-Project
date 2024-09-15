"use client"

import CommonButton from "../../Shared/CommonButton/CommonButton";

const CheckOutBtn = () => {
    const handleOnclick = () => {

    }
    return (
        <div>
            <CommonButton value={{ text: "Check Out", onClick: handleOnclick }} />
        </div>
    );
};

export default CheckOutBtn;