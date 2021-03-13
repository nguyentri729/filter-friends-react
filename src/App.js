import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actSetUserInfo } from "./redux/actions/User.action";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import profile from "./modules/profile"
import routers from "./constants/routers";
import "./index.css";
function App({ setUserInfo, user }) {
  useEffect(() => {
    profile.getUserInfo().then(res => {
      const {accessToken} = res;
      localStorage.setItem("accessToken", accessToken);
    });
  }, [])
  return (
    <div>
      <Router>
        <Switch>
          {routers.map((router) => {
            return (
              <Route path={router.path} component={router.component}></Route>
            );
          })}
        </Switch>
      </Router>
    </div>
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
