import React, { useEffect } from "react";
import { connect } from "react-redux";

import "./index.css";
import { getInfo } from "./modules/Facebook";
import { actSetUserInfo } from "./redux/actions/User.action";
import NavBar from "./components/Navbar/index";
import Dashboard from "./components/Dashboard/index";
import FilterFriends from "./components/Tools/FilterFriends/index";
import { Layout } from "antd";
const { Content, Footer } = Layout;
function App({setUserInfo}) {
  const router = [
    {
      path: "/",
      component: <Dashboard />,
    },
    {
      path: "/filter-friends",
      component: FilterFriends,
    },
  ];
  useEffect(() => {
    async function fbLogin() {
      
      const info = await getInfo();
      (info.length > 0 ? setUserInfo(info) : console.log('logout'))
    }
    fbLogin();
  }, []);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <NavBar />
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          ></div>
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

//Export component với két nối redux.
export default connect(mapStateToProps, mapDispatchToProps)(App);
