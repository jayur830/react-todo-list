import { Layout, Button } from "antd";
import { Link, Outlet } from "react-router-dom";

import styled from "styled-components";

const menus = [
    {
        label: "Todo List",
        href: "/todoList"
    }
];

const FullLayout = () => {
    return (
        <AppLayout className="layout">
            <AppHeader className="header">
                <h1>Hello world</h1>
            </AppHeader>
            <Layout>
                <AppSider className="sider">
                    {menus.map((obj, i) => <MenuButton key={i}><Link to={obj.href}>{obj.label}</Link></MenuButton>)}
                </AppSider>
                <AppContent className="content">
                    <Outlet />
                </AppContent>
            </Layout>
            <AppFooter className="footer">
                Footer
            </AppFooter>
        </AppLayout>
    );
};

export default FullLayout;

const AppLayout = styled(Layout)(({ theme }) => ({
    backgroundColor: "white",
    height: "inherit"
}));

const AppHeader = styled(Layout.Header)(({ theme }) => ({
    backgroundColor: "lightblue",
    margin: 0,
    padding: 10
}));

const AppSider = styled(Layout.Sider)(({ theme }) => ({
    backgroundColor: "#0178bd",
    color: "white",
    padding: 10,
    button: {
        backgroundColor: "transparent",
        color: "white",
        ":hover": {
            backgroundColor: "#95d5fa",
            color: "white"
        }
    }
}));

const MenuButton = styled(Button)(({ theme }) => ({
    width: "100%",
    marginBottom: 10
}));

const AppContent = styled(Layout.Content)(({ theme }) => ({
    backgroundColor: "white",
    height: "calc(100% - 20px)",
    margin: "10px 10px 50px 10px",
    padding: 10
}));

const AppFooter = styled(Layout.Footer)(({ theme }) => ({
    backgroundColor: "beige",
    margin: 0
}));