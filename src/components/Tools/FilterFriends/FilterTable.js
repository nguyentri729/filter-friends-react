import React, { useState } from "react";
import { Table, Divider, Button } from "antd";
import { getInteractCount } from "../../../helper/index";
import { DeleteOutlined } from "@ant-design/icons";

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    name: record.name,
  }),
};
const FilterTable = ({ data }) => {
  const columns = [
    {
      title: "UID",
      dataIndex: "id",
      render: (uid) => <code>{uid}</code>,
      sorter: (a, b) => a - b,
      width: 150,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
      render: (name, total) => {
        return (
          <>
            <img
              src={
                "//graph.facebook.com/" +
                total.id +
                "/picture?type=large&width=40&height=40"
              }
              style={{ margin: 5 }}
            />

            <a href={"https://facebook.com/" + total.id + ""} target="_blank" rel="noopener noreferrer">
            <b>{name}</b>
            </a>
          </>
        );
      },
    },
    {
      title: "Reactions",
      dataIndex: "interactCount",
      defaultSortOrder: "descend",
      sorter: (a, b) => {
        return getInteractCount(a).reactors - getInteractCount(b).reactors;
      },
      render: (interact) => {
        return <b>{getInteractCount(interact, 1).reactors}</b>;
      },
    },
    {
      title: "Comments",
      dataIndex: "interactCount",
      sorter: (a, b) => {
        return getInteractCount(a).commenters - getInteractCount(b).commenters;
      },
      render: (interact) => {
        return <b>{getInteractCount(interact, 1).commenters}</b>;
      },
    },
    {
      title: "Total",
      dataIndex: "interactCount",
      sorter: (a, b) => {
        return (
          getInteractCount(a).reactors +
          getInteractCount(a).commenters -
          (getInteractCount(b).reactors + getInteractCount(b).commenters)
        );
      },
      render: (interact) => {
        return (
          <b>
            {getInteractCount(interact, 1).reactors +
              getInteractCount(interact, 1).commenters}
          </b>
        );
      },
    },
  ];

  return (
    <div>
      <Button type="primary" icon={<DeleteOutlined />} danger>
        Remove
      </Button>
      <Divider />

      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        rowKey="id"
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default FilterTable;
