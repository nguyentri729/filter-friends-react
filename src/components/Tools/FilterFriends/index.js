import React, { useState, useEffect } from "react";
import { Card, Button, notification } from "antd";
import {
  getInfo,
  getFriendsList,
  scanReactions,
  friendsList,
  removeFriend,
} from "../../../modules/Facebook";

import {
  FilterOutlined,
  LoadingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import filterData from "../../../data.json";
import FilterTable from "./FilterTable";

function FilterFriends() {
  const [isLoading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([])

  const onCbSelectedData = (data) => {
    console.log(data)
    setSelectedData(data)
  }
  notification.config({
    duration: 1,
  });

  const openNotificationWithIcon = (type = "success", name = "Mark") => {
    notification[type]({
      message: (
        <span>
          Đã xóa <b>{name} !</b>
        </span>
      ),
    });
  };

  useEffect(() => {
    async function filterFriends() {
      try {
        setMsg("Lấy thông tin người dùng...");
        const info = await getInfo();
        setMsg("Lấy danh sách bạn bè...");
        await getFriendsList(info);
        setMsg("Quét tương tác.");
        await scanReactions(info);
        setMsg("");
        setData(friendsList);
        setLoading(false);
      } catch {
        setMsg("");
        setLoading(false);
      }
    }
    function testData() {
      setData(filterData)
      setLoading(false);
    }
    testData()
    //filterFriends();
  }, []);
  const removeFriendList = async () => {
      for (var index = 0; index < selectedData.length; index++) {
        const removeData = selectedData[index];
        console.log(index)
        await new Promise(function(resolve, reject) { 

          setTimeout(() => {
            resolve('')
          }, 2000);
        } );
        console.log('remove')
        setData(data.filter((item) => {
          return item.id != removeData.id
        }))
      }
  }
  return (
    <div>
      <Card
        title={
          <>
            <h1>
              <FilterOutlined /> Filter Friends
            </h1>

            <small style={{ color: "green" }}>
              {isLoading ? <LoadingOutlined /> : ""} {msg}
            </small>
          </>
        }
        loading={isLoading}
      >
        <Button
          type="primary"
          icon={<DeleteOutlined />}
          danger
          onClick={() => {
            removeFriendList()
          }}
        >
          Remove
        </Button>

        <FilterTable data={data} cbSelectedData = {onCbSelectedData}/>
      </Card>
    </div>
  );
}

export default FilterFriends;
