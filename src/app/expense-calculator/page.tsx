"use client";
import React, {useState} from "react";
import {Input, Button, Table, Space, Form, Typography} from "antd";
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
    const [form] = Form.useForm();

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
    };

    // Calculate Total Amount
    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

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
                    <Button danger onClick={() => handleDeleteExpense(record.key)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

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
        </div>
    );
};

export default ExpenseCalculator;
