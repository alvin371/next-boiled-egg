"use client";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  Input,
  Select,
  Space,
  Typography,
  message,
  Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  ProductItem,
  createProduct,
  deleteProduct,
  getListProduct,
} from "@/services";
import dayjs from "dayjs";
import { Button } from "@/components/atoms/button";
import { TitlePage } from "@/components/atoms/typography";
import { getListCategories } from "@/services/category";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ModalForm from "./modules/modal";

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editData, setEditData] = useState<ProductItem & { id?: number }>();

  const queryClient = useQueryClient();
  const { data: categories } = useQuery<Category[]>({
    ...getListCategories(),
  }); // Fetch categories using useQuery
  const endpointParams = {
    title: search,
    categoryId: filter,
    page: currentPage,
    perPage: pageSize,
  };

  // Fetching data using Tanstack Query
  const { data, isLoading, error } = useQuery<Product[]>({
    ...getListProduct({ params: endpointParams }),
    refetchOnMount: false,
  });
  const createProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      message.success("Product created successfully");
      queryClient.refetchQueries();
      setIsModalVisible(false);
    },
    onError: () => {
      message.error("Failed to create product");
    },
  });
  const handleCreateProduct = async (productData: ProductItem) => {
    createProductMutation.mutate(productData);
  };

  const editProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      message.success("Product updated successfully");
      queryClient.refetchQueries();
      setIsModalVisible(false);
    },
    onError: () => {
      message.error("Failed to update product");
    },
  });

  const handleEditProduct = async (productData: ProductItem) => {
    editProductMutation.mutate(productData);
  };

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      message.success("Product deleted successfully");
      queryClient.refetchQueries();
    },
    onError: () => {
      message.error("Failed to delete product");
    },
  });

  const handleDeleteProduct = async (id: number) => {
    deleteProductMutation.mutate(id);
  };

  // Define columns for the Ant Design table
  const columns: ColumnsType<Product> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 380,
      render: (text) => <Typography.Link>{text}</Typography.Link>,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: 280,
      sorter: (a, b) => a.price - b.price,
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      render: (category) => <Typography.Link>{category.name}</Typography.Link>,
    },
    {
      title: "Action",
      key: "action",
      render: (record: Product) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "green" }}
            onClick={() => {
              setEditData({
                id: record.id,
                title: record.title,
                price: record.price,
                description: record.description,
                images: record.images,
                categoryId: record.category.id,
              });
              setIsModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDeleteProduct(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined style={{ color: "red", cursor: "pointer" }} />
          </Popconfirm>
        </Space>
      ),
    },
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
          marginBottom: "16px",
        }}
      >
        <TitlePage size="xl" weight="bold">
          Products
        </TitlePage>
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Create
        </Button>
      </Space>
      <Space className="w-full my-10">
        <Input.Search
          placeholder="Search by products title"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </Space>
      <Table
        columns={columns}
        dataSource={data || []}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: data?.length,
          onChange: (page) => setCurrentPage(page),
        }}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>
              This data created on{" "}
              {dayjs(record.creationAt).format("DD MMMM YYYY")}
            </p>
          ),
          rowExpandable: (record) => record.id !== null,
        }}
        rowKey="id"
        loading={isLoading}
      />
      <ModalForm
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSubmit={handleCreateProduct}
        categories={categories}
        initialData={editData}
      />
    </>
  );
};

export default ProductPage;
