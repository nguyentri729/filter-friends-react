import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import "./index.css";
import { getInfo } from "./modules/Facebook";
import { actSetUserInfo } from "./redux/actions/User.action";
import NavBar from "./components/Navbar/index";
import Dashboard from "./components/Dashboard/index";
import FilterFriends from "./components/Tools/FilterFriends/index";
import { Layout } from "antd";
const { Content, Footer } = Layout;
function App({ setUserInfo, user }) {
  const [routerPath, setRouterPath] = useState("/");
  const router = [
    {
      path: "/",
      component: <Dashboard />,
    },
    {
      path: "/tools/filterFriends",
      component: <FilterFriends />,
    },
  ];


  useEffect(() => {
    async function fbLogin() {
      const info = await getInfo();
      
      info.name && info.uid ? setUserInfo(info) : console.log("logout");
    }
    fbLogin();
  }, []);

  const onCbRouter = (to) => {
    setRouterPath(to);
  };

  const indexRouter = router.findIndex((value) => value.path == routerPath);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <NavBar cbRouter={onCbRouter} user = {user} />
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            {router[indexRouter].component}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Facebook Extensions Tools
        </Footer>
      </Layout>
    </Layout>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    setUserInfo: (info) => {
      dispatch(actSetUserInfo(info));
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
