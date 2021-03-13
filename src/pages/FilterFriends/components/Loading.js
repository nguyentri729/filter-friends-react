import React from "react";
import { Card } from "antd";
import { SyncOutlined } from "@ant-design/icons";
function FilterFriends(props) {
  return (
    <div>
      <Card style={{textAlign: "center"}}>
        <SyncOutlined spin style={{fontSize: 30, marginBottom: 5}}/>
        <h3>Plese wait ! Fetching data...</h3>
      </Card>
    </div>
  );
}

export default FilterFriends;
