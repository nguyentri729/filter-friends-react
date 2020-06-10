import React, { useState, useEffect } from "react";
import { Card } from "antd";
import { FilterOutlined, LoadingOutlined } from "@ant-design/icons";
import filterData from '../../../data.json';
import FilterTable from "./FilterTable"
function FilterFriends() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([])
  useEffect(() => {
    setTimeout(() => {
      setData(filterData)
      setLoading(false)
    }, 2000)
  }, [])
  
  
  return (
    <div>
      <Card
        title={
          <h1>
            {isLoading ? <LoadingOutlined /> : <FilterOutlined />} Filter Friends 
          </h1>
        }
        loading = {isLoading}
      >
       <FilterTable data = {data}/>
      </Card>
    </div>
  );
}

export default FilterFriends;
