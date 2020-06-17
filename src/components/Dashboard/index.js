import React from "react";
import { Card, Space, Avatar } from "antd";
import { connect } from "react-redux";

import { HomeOutlined } from "@ant-design/icons";
function Dashboard({ user }) {
  console.log(user);
  return (
    <Card
      title={
        <>
          <HomeOutlined /> Dashboard
        </>
      }
    >
        
      
     
    </Card>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(Dashboard);
