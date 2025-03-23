import React from "react";
import {Menu} from "antd";
import type {MenuProps} from "antd";
import {AppstoreOutlined, HomeOutlined} from "@ant-design/icons";
import Link from "next/link";
import {usePathname} from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
    {
        label: <Link href={"/"}>"Home"</Link>,
        key: "home",
        icon: <HomeOutlined />,
    },
    {
        label: <Link href="ExpenseCalc"> "Todo Lists"</Link>,
        key: "app",
        icon: <AppstoreOutlined />,
    },
    {
        label: <Link href="ExpenceCalculetor"> "Expence Calculetor"</Link>,
        key: "ExpenceCalculetor",
        icon: <AppstoreOutlined />,
    },
];
const AppSideMenu = () => {
    const pathname = usePathname();
    const [selectKey, setSelectKey] = React.useState("home");
    React.useEffect(() => {
        if (pathname === "/") {
            setSelectKey("home");
        }
        if (pathname === "/Todo List") {
            setSelectKey("app");
        }
        if (pathname === "/ExpenceCalculetor") {
            setSelectKey("ExpenceCalculetor");
        }
    }, [pathname]);

    return (
        <div>
            <Menu mode="inline" items={items} selectedKeys={[selectKey]} />;
        </div>
    );
};

export default AppSideMenu;
