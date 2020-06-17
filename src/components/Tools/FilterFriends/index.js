import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Card, Button, notification, Row, Col } from "antd";
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
  PauseCircleOutlined,
} from "@ant-design/icons";
import filterData from "../../../data.json";
import FilterTable from "./FilterTable";

function FilterFriends({user}) {
  const [isLoading, setLoading] = useState(true);
  const [isRunning, setRunning] = useState(false);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [total, setTotal] = useState(0);
  const [deleted, setDeleted] = useState(0);
  
  const onCbSelectedData = (data) => {
    setSelectedData(data);
  };
  notification.config({
    duration: 1,
  });

  const openNotificationWithIcon = (type = "success", name = "Mark") => {
    notification[type]({
      message: (
        <span>
          Đã xóa <b>{name}.</b>
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
      setData(filterData);
      setLoading(false);
    }

    process.env.NODE_ENV === "development" ? testData() : filterFriends();
  }, []);
  const removeFriendList = async () => {
    var removeData = data;
    for (let index = 0; index < selectedData.length; index++) {
      const removePeople = selectedData[index];
      if (process.env.NODE_ENV === "development") {
        await new Promise(function (resolve, reject) {
          setTimeout(() => {
            resolve("");
          }, 2000);
        });
      } else {
        await removeFriend(removePeople.id, user);
      }

      removeData = removeData.filter((value) => value.id !== removePeople.id);
      openNotificationWithIcon("success", removePeople.name);
      setData(removeData);
    }
    setRunning(false);
    openNotificationWithIcon("success", "hoàn tất...");
  };
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
        <Row>
          <Col span={12}>
            {isRunning ? (
              <Button
                type="primary"
                icon={<PauseCircleOutlined />}
                onClick={() => {}}
              >
                Đang xóa...
              </Button>
            ) : (
              <Button
                type="primary"
                icon={<DeleteOutlined />}
                danger
                onClick={() => {
                  setRunning(true);

                  removeFriendList();
                }}
              >
                Remove
              </Button>
            )}
          </Col>
          <Col>
            <h1 style={{ color: "green" }}>
              Đã xóa : <b></b>/<b></b>
            </h1>
          </Col>
        </Row>
        <FilterTable data={data} cbSelectedData={onCbSelectedData} />
      </Card>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps, null)(FilterFriends);
