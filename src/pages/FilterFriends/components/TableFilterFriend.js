import React, { useState } from "react";
import { Table, Avatar, Button, message, BackTop } from "antd";
import _ from "lodash";
import profile from "../../../modules/profile";
function TableFilterFriend({ data, isScaning }) {
  const [selectedRowKeys, setSelectedRow] = useState([]);
  const [isBying, setBying] = useState(false);
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name, row) => {
        return (
          <>
            <Avatar
              src={`http://graph.facebook.com/${
                row.id
              }/picture?type=square&access_token=${localStorage.getItem(
                "accessToken"
              )}`}
              style={{
                marginRight: 5,
              }}
            />
            <a href={"https://fb.me/" + row.id}>{row.name}</a>
          </>
        );
      },
    },
    {
      title: "Reaction",
      dataIndex: "reaction",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.reaction - b.reaction,
      key: "reaction",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      sorter: (a, b) => a.comment - b.comment,
    },
  ];

  const [interactionFriends, setInteractionFriends] = useState(data);
  async function removeSelectedFriend() {
    setBying(true);
    let _interactionFriends = interactionFriends;
    let _selectedRowKeys = selectedRowKeys;
    for (const row of selectedRowKeys) {
      await profile.removeFriend(row).then(() => {
        _interactionFriends = _.filter(_interactionFriends, (friend) => {
          if (_.isEqual(friend.id, row)) {
            message.success(`Deleted ${friend.name}.`);
            return false;
          }
          return true;
        });
        _selectedRowKeys = _.filter(
          _selectedRowKeys,
          (key) => !_.isEqual(key, row)
        );
        setInteractionFriends(_interactionFriends);
        setSelectedRow(_selectedRowKeys);
      });
    }
    message.success(`Done !`);
    setBying(false);
  }

  return (
    <div>
      <h3 style={{ float: "left" }}>Selected: {selectedRowKeys.length}</h3>
      <Button
        onClick={removeSelectedFriend}
        style={{ float: "right" }}
        type="primary"
        loading={isBying}
      >
        Bye Bye 👋👋
      </Button>
      <Table
        dataSource={interactionFriends}
        loading={isScaning}
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRow,
        }}
        columns={columns}
        rowKey={"id"}
        pagination={{
          defaultPageSize: 100,
          showSizeChanger: true,
          pageSizeOptions: ["50", "200", "500", "1000", "3000", "5000"],
        }}
      />

      <BackTop>
        <div
          style={{
            height: 40,
            width: 40,
            lineHeight: "40px",
            borderRadius: 4,
            backgroundColor: "#1088e9",
            color: "#fff",
            textAlign: "center",
            fontSize: 14,
          }}
        >
          UP
        </div>
      </BackTop>
    </div>
  );
}

export default TableFilterFriend;
