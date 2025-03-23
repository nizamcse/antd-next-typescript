import {RadarChartOutlined} from "@ant-design/icons";
import {Header} from "antd/es/layout/layout";
import React from "react";

const AppHeader = () => {
    return (
        <Header className="myapp-header !bg-white border-b border[#001529]">
            <div className="flex items-center gap-2">
                <RadarChartOutlined />
                <div>AntD-Next-Typescript</div>
            </div>
            <div>Avater</div>
        </Header>
    );
};

export default AppHeader;
