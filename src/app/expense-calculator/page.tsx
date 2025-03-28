"use client";
import React, {useState} from "react";
import {Input, Button, Table, Space, Form, Typography, Modal} from "antd";
import type {ColumnsType} from "antd/es/table";
import "antd/dist/reset.css";

const {Title} = Typography;

interface Expense {
    key: string;
    description: string;
    amount: number;
}

const ExpenseCalculator: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [modalForm] = Form.useForm();

    // Add Expense
    const handleAddExpense = (values: {description: string; amount: number}) => {
        const newExpense: Expense = {
            key: Date.now().toString(),
            description: values.description,
            amount: Number(values.amount),
        };
        setExpenses([...expenses, newExpense]);
        form.resetFields();
    };

    // Delete Expense
    const handleDeleteExpense = (key: string) => {
        const updatedExpenses = expenses.filter((expense) => expense.key !== key);
        setExpenses(updatedExpenses);
        console.log("Edit Expense", updatedExpenses);
    };

    // Calculate Total Amount
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    const handleEditExpense = (record: Expense) => {
        setIsModalOpen(true);
        //modalForm.setFieldsValue(expenses.find((expense) => expense.key === key));

        modalForm.setFieldsValue(record);
        const updatedExpenses = expenses.map((expense) =>
            expense.key === record.key ? {...expense, description: record.description, amount: record.amount} : expense
        );
        setExpenses(updatedExpenses);
    };

    const handleEditExpenseForm = (values: {description: string; amount: number}) => {
        const updatedExpenses = expenses.map((expense) =>
            expense.key === modalForm.getFieldValue("key")
                ? {...expense, description: values.description, amount: Number(values.amount)}
                : expense
        );

        console.log("Edit Expense", updatedExpenses);
        setExpenses(updatedExpenses);
        //setIsModalOpen(false);
    };

    // Columns for Ant Design Table
    const columns: ColumnsType<Expense> = [
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Amount (BDT)",
            dataIndex: "amount",
            key: "amount",
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="default" onClick={() => handleEditExpense(record)}>
                        Edit
                    </Button>
                    <Button danger onClick={() => handleDeleteExpense(record.key)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <div style={{padding: "20px"}}>
            <Title level={2}>Expense Calculator</Title>

            <Form form={form} onFinish={handleAddExpense} layout="inline" style={{marginBottom: "20px"}}>
                <Form.Item
                    name="description"
                    label="Description"
                    rules={[{required: true, message: "Please enter a description!"}]}
                >
                    <Input placeholder="Enter description" />
                </Form.Item>
                <Form.Item
                    name="amount"
                    label="Amount (BDT)"
                    rules={[{required: true, message: "Please enter an amount!"}]}
                >
                    <Input type="number" placeholder="Enter amount" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Expense
                    </Button>
                </Form.Item>
            </Form>

            <Table
                columns={columns}
                dataSource={expenses}
                rowKey="key"
                style={{marginBottom: "20px"}}
                pagination={{hideOnSinglePage: true}}
            />

            <Title level={4}>Total Amount Spent: BDT- {totalAmount}</Title>

            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => {
                    handleCancel();
                    modalForm.resetFields();
                }}
            >
                <Form form={modalForm} onFinish={handleEditExpenseForm} layout="inline" style={{marginBottom: "20px"}}>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{required: true, message: "Please enter a description!"}]}
                    >
                        <Input placeholder="Enter description" />
                    </Form.Item>
                    <Form.Item
                        name="amount"
                        label="Amount (BDT)"
                        rules={[{required: true, message: "Please enter an amount!"}]}
                    >
                        <Input type="number" placeholder="Enter amount" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update Expense
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ExpenseCalculator;
