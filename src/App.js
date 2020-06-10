import React from "react";
import "./index.css";
import NavBar from "./components/Navbar/index";
import Dashboard from "./components/Dashboard/index";
import FilterFriends from "./components/Tools/FilterFriends/index";

import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";

const { Content, Footer } = Layout;

function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <NavBar />
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Switch>
              <Route path="/" component={Dashboard} exact />
              <Route path="/tools/filterFriends" component={FilterFriends} />

              <Route component={Error} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Facebook Extensions Tools
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;
