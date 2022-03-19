import { Input, Table } from "antd";
import { useCallback, useEffect } from "react";
import styled from "styled-components";
import { useColumns, useLoading, useInitialData, useSetData, useDatasource, useSave, Record } from "../Provider";

const TodoListContent = () => {
    const columns = useColumns();
    const initialData = useInitialData();
    const loading = useLoading();
    const data = useDatasource();
    const setData = useSetData();
    const save = useSave();

    useEffect(() => {
        if (!loading) setData(initialData.map((obj: any, i: number) => ({ key: (i + 1).toString(), ...obj })));
    }, [loading, setData, initialData]);

    const cell = useCallback(({ children, record, dataIndex, colSpan }) => {
        if (record && (dataIndex === "todo" || dataIndex === "desc"))
            return (
                <td colSpan={colSpan}>
                    {record.editing ?
                        <Input
                            defaultValue={record[dataIndex as ("todo" | "desc")]}
                            onKeyUp={(e: any) => {
                                if (e.key === "Enter")
                                    save(record);
                                else {
                                    setData((state: Record[]) => {
                                        const records = state.map(obj => ({ ...obj }));
                                        const index = records.findIndex(obj => obj.no === record.no);
                                        if (index !== -1)
                                            records[index][dataIndex as ("todo" | "desc")] = e.target.value;
                                        return records;
                                    });
                                }
                            }} /> :
                        children}
                </td>
            );
        else return <td colSpan={colSpan}>{children}</td>;
    }, [save, setData]);

    return (
        <TodoListTable
            components={{
                body: {
                    cell
                }
            }}
            pagination={{
                current: 1,
                pageSize: 7
            }}
            columns={columns}
            dataSource={data}
            bordered
        />
    );
};

export default TodoListContent;

const TodoListTable = styled(Table)(({ theme }) => ({
    "th, td": {
        ":nth-child(1)": {
            textAlign: "center",
            width: 50
        },
        ":nth-child(2)": {
            width: "20%"
        },
        ":nth-child(3)": {
            width: "50%"
        },
        ":nth-child(4)": {
            textAlign: "center",
            width: 110
        },
        ":nth-child(5)": {
            textAlign: "center",
            width: 200
        }
    }
}));