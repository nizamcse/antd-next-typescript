import React, {useState} from "react";
import {Input, Button, Table, Space, Modal, Form, DatePicker, Select, Tag} from "antd";
import type {ColumnsType} from "antd/es/table";
import dayjs from "dayjs";
import "antd/dist/reset.css";

const {RangePicker} = DatePicker;
const {Option} = Select;

interface Todo {
    key: string;
    serialNumber: number;
    task: string;
    dueDate?: string;
    status: "Pending" | "Completed";
}

const TodoApp: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const [filterStatus, setFilterStatus] = useState<"All" | "Pending" | "Completed">("All");
    const [form] = Form.useForm();

    // Add or Update Todo
    const handleAddOrUpdateTodo = (values: {task: string; dueDate: dayjs.Dayjs}) => {
        if (editingTodo) {
            // Update existing todo
            const updatedTodos = todos.map((todo) =>
                todo.key === editingTodo.key
                    ? {...todo, task: values.task, dueDate: values.dueDate?.format("YYYY-MM-DD")}
                    : todo
            );
            setTodos(updatedTodos);
        } else {
            // Add new todo
            const newTodo: Todo = {
                key: Date.now().toString(),
                serialNumber: todos.length + 1,
                task: values.task,
                dueDate: values.dueDate?.format("YYYY-MM-DD"),
                status: "Pending",
            };
            setTodos([...todos, newTodo]);
        }
        setIsModalVisible(false);
        form.resetFields();
    };

    // Delete Todo
    const handleDeleteTodo = (key: string) => {
        const updatedTodos = todos.filter((todo) => todo.key !== key);
        setTodos(updatedTodos);
    };

    // Edit Todo
    const handleEditTodo = (todo: Todo) => {
        setEditingTodo(todo);
        form.setFieldsValue({task: todo.task, dueDate: todo.dueDate ? dayjs(todo.dueDate) : null});
        setIsModalVisible(true);
    };

    // Toggle Task Status
    const handleToggleStatus = (key: string) => {
        const updatedTodos = todos.map((todo) =>
            todo.key === key
                ? {...todo, status: todo.status === "Pending" ? ("Completed" as "Completed") : ("Pending" as "Pending")}
                : todo
        );
        setTodos(updatedTodos);
    };

    // Filtered Todos
    const filteredTodos = todos.filter((todo) => {
        if (filterStatus === "All") return true;
        return todo.status === filterStatus;
    });

    // Columns for Ant Design Table
    const columns: ColumnsType<Todo> = [
        {
            title: "Serial Number",
            dataIndex: "serialNumber",
            key: "serialNumber",
        },
        {
            title: "Task",
            dataIndex: "task",
            key: "task",
        },
        {
            title: "Due Date",
            dataIndex: "dueDate",
            key: "dueDate",
            render: (dueDate: string) => (dueDate ? dayjs(dueDate).format("YYYY-MM-DD") : "N/A"),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: "Pending" | "Completed") => (
                <Tag color={status === "Pending" ? "volcano" : "green"}>{status}</Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => handleEditTodo(record)}>
                        Edit
                    </Button>
                    <Button danger onClick={() => handleDeleteTodo(record.key)}>
                        Delete
                    </Button>
                    <Button onClick={() => handleToggleStatus(record.key)}>
                        {record.status === "Pending" ? "Mark Completed" : "Mark Pending"}
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{padding: "20px"}}>
            <h1>To-Do TodoApp</h1>
            <Button
                type="primary"
                onClick={() => {
                    setEditingTodo(null);
                    setIsModalVisible(true);
                }}
                style={{marginBottom: "20px"}}
            >
                Add Task
            </Button>

            <Select
                defaultValue="All"
                style={{width: 120, marginLeft: "10px"}}
                onChange={(value: "All" | "Pending" | "Completed") => setFilterStatus(value)}
            >
                <Option value="All">All</Option>
                <Option value="Pending">Pending</Option>
                <Option value="Completed">Completed</Option>
            </Select>

            <Table columns={columns} dataSource={filteredTodos} rowKey="key" style={{marginTop: "20px"}} />

            <Modal
                title={editingTodo ? "Edit Task" : "Add Task"}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    form.resetFields();
                }}
                footer={null}
            >
                <Form form={form} onFinish={handleAddOrUpdateTodo}>
                    <Form.Item name="task" label="Task" rules={[{required: true, message: "Please enter a task!"}]}>
                        <Input placeholder="Enter your task" />
                    </Form.Item>
                    <Form.Item name="dueDate" label="Due Date">
                        <DatePicker style={{width: "100%"}} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {editingTodo ? "Update" : "Add"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default TodoApp;
