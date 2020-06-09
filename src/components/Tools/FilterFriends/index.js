import React from "react";
import { Card, Table } from "antd";
import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";

function FilterFriends() {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];
  return (
    <div>
      <Card
        title={
          <h1>
            <FilterOutlined /> Filter Friends
          </h1>
        }
      >
        <Button type="primary" icon={<SearchOutlined />} style={{textAlign: 'right'}}>
          Search
        </Button>
        <br />
        <Table dataSource={dataSource} columns={columns} />;
      </Card>
    </div>
  );
}

export default FilterFriends;
