import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  message,
  Upload,
  Space,
  Spin,
  Select,
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { Category, UploadResponse, uploadImage } from "@/services";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";

interface ModalFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: FormData;
  categories?: Category[];
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  price: z.number().min(0, "Price must be greater than or equal to 0"),
  description: z.string().min(1, { message: "Description is required" }),
  categoryId: z.number().int().min(1, "CategoryId must be a positive integer"),
  images: z.array(z.string().url("Must be a valid URL")),
});

type FormData = z.infer<typeof formSchema>;

const ModalForm: React.FC<ModalFormProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
  categories,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title ? initialData.title :"",
      price: initialData?.price || undefined,
      description: initialData?.description || "",
      categoryId: initialData?.categoryId || undefined,
      images: [""],
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);
  const handleOk = async (data: FormData) => {
    await onSubmit(data);
    
    onClose();
  };

  const mutation: UseMutationResult<UploadResponse, Error, File> = useMutation({
    mutationFn: uploadImage,
    onSuccess: (data: UploadResponse) => {
      setValue("images", [data.location]);
      message.success("Image uploaded successfully");
    },
    onError: () => {
      message.error("Image upload failed");
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const beforeUpload = (file: File) => {
    setIsLoading(true);
    mutation.mutate(file);
    return false; // Prevent the default behavior of the upload component
  };
  return (
    <Modal
      title={initialData ? "Edit Product" : "Create Product"}
      open={visible}
      onCancel={() =>{
        reset({
          title: "",
          price: undefined,
          description: "",
          categoryId: undefined,
          images: [""],
        });
        onClose();
      }}
      footer={null}
    >
      <Form layout="vertical" onFinish={handleSubmit(handleOk)}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Title"
              validateStatus={errors.title ? "error" : ""}
              help={errors.title?.message}
            >
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input {...field} placeholder="write your product name" />
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Price"
              validateStatus={errors.price ? "error" : ""}
              help={errors.price?.message}
            >
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    style={{ width: "100%" }}
                    placeholder="write your price"
                  />
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Description"
              validateStatus={errors.description ? "error" : ""}
              help={errors.description?.message}
            >
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Input.TextArea
                    {...field}
                    placeholder="Write your description"
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Category ID"
              validateStatus={errors.categoryId ? "error" : ""}
              help={errors.categoryId?.message}
            >
              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: "100%" }}
                    placeholder="Select Category"
                  >
                    {categories?.map((category: Category) => (
                      <Select.Option key={category.id} value={category.id}>
                        {category.name}
                      </Select.Option>
                    ))}
                  </Select>
                )}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Images (URLs)"
          validateStatus={errors.images ? "error" : ""}
          help={errors.images?.message}
        >
          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <Space>
                <Input
                  {...field}
                  value={field.value[0]}
                  style={{ display: "none" }}
                />
                {isLoading && <Spin />}
                {field.value.map(
                  (image: string, index: number) =>
                    (image || initialData?.images[0]) && (
                      <Space key={index}>
                        <img
                          src={image || initialData?.images[0]}
                          alt="product"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                        <DeleteOutlined
                          onClick={() => setValue("images", [""])}
                        />
                      </Space>
                    )
                )}
                <Upload beforeUpload={beforeUpload} showUploadList={false}>
                  <Button icon={<UploadOutlined />}>Upload Image</Button>
                </Upload>
              </Space>
            )}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            {initialData ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
