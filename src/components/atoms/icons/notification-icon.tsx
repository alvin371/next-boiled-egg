import React from "react";
import { Badge, Dropdown, Empty, Menu, MenuProps, Tooltip } from "antd";
import { BellOutlined } from "@ant-design/icons";

import Link from "next/link";

interface INotificationIconProps {
  notifications?: number;
}

const NotificationIcon: React.FC<INotificationIconProps> = ({
  notifications
}) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          Notifikasi 1
        </a>
      )
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          Notifikasi 2
        </a>
      )
    },
    {
      key: "3",
      label: (
        <a target="_blank" rel="noopener noreferrer" href="#">
          Notifikasi 3
        </a>
      )
    }
  ];

  // const items: MenuProps['items'] = data?.notifications?.map(notification => {
  //     return {
  //         key: notification.id,
  //         label: (
  //             <a
  //                 target="_blank"
  //                 rel="noopener noreferrer"
  //                 href={router.replace}

  //                 TODO: Uncomment this code if ready
  //                 onClick={() => {
  //                     mutation.mutate(notification.id);
  //                 }}
  //             >
  //                 {notification?.message}
  //             </a>
  //         ),
  //     }
  // })

  return (
    <Tooltip title="Notifications" placement="right">
      <Dropdown
        trigger={["click"]}
        placement="bottom"
        dropdownRender={() => (
          <div>
            <div
              style={{
                overflowY: "auto",
                maxHeight: "200px",
                backgroundColor: "#ffffff"
              }}
            >
              {items?.length === 0 ? (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="Tidak ada notifikasi"
                />
              ) : (
                <Menu
                  style={{
                    boxShadow: "none",
                    borderRadius: "0px"
                  }}
                  items={items}
                />
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
                backgroundColor: "#ffffff"
              }}
            >
              <Link href={"/notifications"}>Lihat semua</Link>
            </div>
          </div>
        )}
      >
        <Badge count={notifications}>
          <BellOutlined
            rev={""}
            style={{
              display: "block",
              color: "#2D87C6",
              fontSize: "21px"
            }}
          />
        </Badge>
      </Dropdown>
    </Tooltip>
  );
};

export default NotificationIcon;
