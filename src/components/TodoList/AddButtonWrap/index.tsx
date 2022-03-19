import { useCallback } from "react";
import { Row, Button } from "antd";
import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { useDatasource, useAddData } from "../Provider";

const AddButtonWrap = () => {
    const data = useDatasource();
    const addData = useAddData();

    const onAddData = useCallback(() => {
        addData({
            key: (data.length + 1).toString(),
            no: (data.length + 1).toString(),
            todo: "",
            desc: "",
            completed: false,
            editing: false
        });
    }, [data, addData]);

    return (
        <Row>
            <AddButton onClick={onAddData}>
                <PlusOutlined />추가
            </AddButton>
        </Row>
    );
};

export default AddButtonWrap;

const AddButton = styled(Button)(({ theme }) => ({
    marginBottom: 10
}));