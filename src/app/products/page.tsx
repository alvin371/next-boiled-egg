"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Table, Input, Select, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getListProduct } from "@/services";
import dayjs from "dayjs";
import { Button } from "@/components/atoms/button";
import { TitlePage } from "@/components/atoms/typography";
import { getListCategories } from "@/services/category";

// Define the product type
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    image: string;
    creationAt: string;
    updatedAt: string;
  };
}
interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

const ProductPage = () => {
  const [filter, setFilter] = useState<string | undefined>(undefined);
  const [search, setSearch] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize] = useState<number>(5);
  const { data: categories } = useQuery({
    ...getListCategories()
  }); // Fetch categories using useQuery
  const endpointParams = {
    title: search,
    categoryId: filter,
    page: currentPage,
    perPage: pageSize
  };

  // Fetching data using Tanstack Query
  const { data, isLoading, error } = useQuery({
    ...getListProduct({ params: endpointParams }),
    refetchOnMount: false
  });

  // Define columns for the Ant Design table
  const columns: ColumnsType<Product> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 380,
      render: (text) => <a>{text}</a>
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 280,
      sorter: (a, b) => a.price - b.price,
      key: "price"
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 280,
      filterDropdown: () => (
        <Select
          defaultValue={filter}
          className="w-full"
          placeholder="Select a category"
          onChange={(value) => handleFilterChange(value)}
        >
          {categories?.map((category: Category) => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      ),
      render: (category) => <a>{category.name}</a>
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      )
    }
  ];

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);
    setCurrentPage(1);
  };

  if (error) return <div>Error loading products</div>;

  return (
    <>
      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom: "16px"
        }}
      >
        <TitlePage size="xl" weight="bold">
          Products
        </TitlePage>
        <Button type="primary">Create</Button>
      </Space>
      <Space className="w-full my-10">
        <Input.Search
          placeholder="Search by products title"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data?.length || 0,
          onChange: (page) => setCurrentPage(page)
        }}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>
              This data created on{" "}
              {dayjs(record.creationAt).format("DD MMMM YYYY")}
            </p>
          ),
          rowExpandable: (record) => record.id !== null
        }}
        rowKey="id"
        loading={isLoading}
      />
    </>
  );
};

export default ProductPage;
