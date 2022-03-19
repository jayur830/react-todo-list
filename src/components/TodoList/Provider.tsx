import { useCallback, useMemo, useState } from "react";
import constate from "constate";
import { Button, Checkbox, Row } from "antd";
import styled from "styled-components";
import { useQuery, useMutation } from "@apollo/client";
import { loader } from "graphql.macro";

export interface Record {
    key: string,
    no: string,
    todo: string,
    desc: string,
    completed: boolean,
    editing: boolean
}

interface Todo {
    no: string;
    todo: string;
    desc: string;
    completed: boolean;
}

const GET_TODOS = loader("./getTodos.gql");
const ADD_TODO = loader("./addTodo.gql");
const REMOVE_TODO = loader("./removeTodo.gql");
const UPDATE_TODO = loader("./updateTodo.gql");

const TodoListContext = () => {
    const { loading, data } = useQuery(GET_TODOS);
    const [addTodo] = useMutation<{ todo: Todo }>(ADD_TODO);
    const [removeTodo] = useMutation<{ todo: Todo }>(REMOVE_TODO);
    const [updateTodo] = useMutation<{ todo: Todo }>(UPDATE_TODO);
    
    const [_data, setData] = useState<Record[]>([]);

    const copyTodo = useCallback((record: Record) => {
        return {
            no: record.no,
            todo: record.todo,
            desc: record.desc,
            completed: record.completed
        };
    }, []);

    const addData = useCallback((todo: Record) => {
        setData((state: Record[]) => state.concat([todo]));
        addTodo({ variables: { todo: copyTodo(todo) } });
    }, [setData, addTodo, copyTodo]);

    const setDataByNo = useCallback((no: string, callback: (records: Record[], index: number) => Record[]) => {
        setData((state: Record[]) => {
            let records = state.map(obj => ({ ...obj }));
            const index = records.findIndex(obj => obj.no === no);
            if (index !== -1)
                records = callback(records, index);
            return records;
        });
    }, [setData]);

    const onChangeCompleted = useCallback((completed: boolean, no: string) => {
        setDataByNo(no, (records, index) => {
            records[index].completed = completed;
            updateTodo({ variables: { todo: copyTodo(records[index]) } });
            return records;
        });
    }, [setDataByNo, updateTodo, copyTodo]);

    const setEdit = useCallback((no: string, edit: boolean) => {
        setDataByNo(no, (records, index) => {
            records[index].editing = edit;
            return records;
        });
    }, [setDataByNo]);

    const save = useCallback((record: Record) => {
        setDataByNo(record.no, (records, index) => {
            records[index].editing = false;
            updateTodo({ variables: { todo: copyTodo(records[index]) } });
            return records;
        });
    }, [setDataByNo, updateTodo, copyTodo]);

    const remove = useCallback((no: string) => {
        setDataByNo(no, (records, index) => {
            removeTodo({ variables: { todo: copyTodo(records[index]) } });
            records.splice(index, 1);
            return records;
        });
    }, [setDataByNo, removeTodo, copyTodo]);

    const columns: any[] = useMemo(() => [
        {
            key: "no",
            title: "No.",
            dataIndex: "no",
            editable: false,
            onCell: (record: Record) => ({
                dataIndex: "no",
                record,
                colSpan: loading || (!loading && data.todos.length === 0) ? 5 : 1
            })
        },
        {
            key: "todo",
            title: "TODO",
            dataIndex: "todo",
            editable: true,
            onCell: (record: Record) => ({
                dataIndex: "todo",
                record,
                colSpan: 1
            })
        },
        {
            key: "desc",
            title: "Description",
            dataIndex: "desc",
            editable: true,
            onCell: (record: Record) => ({
                dataIndex: "desc",
                record,
                colSpan: 1
            })
        },
        {
            key: "completed",
            title: "Completed",
            dataIndex: "completed",
            editable: false,
            render(completed: boolean, row: Record) {
                return <Checkbox checked={completed} onChange={e => onChangeCompleted(e.target.checked, row.no)} />;
            }
        },
        {
            key: "buttons",
            title: "Edit / Delete",
            dataIndex: "buttons",
            editable: false,
            render(_: any, row: Record) {
                return (
                    <>
                        {row.editing ?
                            <ButtonRow>
                                <Button onClick={() => save(row)} style={{ marginRight: 10 }}>Save</Button>
                                <Button onClick={() => setEdit(row.no, false)}>Cancel</Button>
                            </ButtonRow> :
                            <ButtonRow>
                                <Button onClick={() => setEdit(row.no, true)}>Edit</Button>
                            </ButtonRow>}
                        <ButtonRow>
                            <Button onClick={() => {
                                if (window.confirm("선택한 항목을 삭제하시겠습니까?"))
                                    remove(row.no);
                            }}>Delete</Button>
                        </ButtonRow>
                    </>
                );
            }
        }
    ], [loading, data, onChangeCompleted, save, setEdit, remove]);

    return { columns, loading, initialData: loading ? [] : data.todos, data: _data, setData, addData, save, setEdit };
};

const [Provider, useColumns, useLoading, useInitialData, useDatasource, useSetData, useAddData, useSave, useSetEdit] = constate(
    TodoListContext,
    value => value.columns,
    value => value.loading,
    value => value.initialData,
    value => value.data,
    value => value.setData,
    value => value.addData,
    value => value.save,
    value => value.setEdit
);

export { Provider, useColumns, useLoading, useInitialData, useDatasource, useSetData, useAddData, useSave, useSetEdit };

const ButtonRow = styled(Row)(({ theme }) => ({
    justifyContent: "center",
    ":first-child": {
        marginBottom: 10
    }
}));