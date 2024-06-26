import React, { useRef, useState } from "react";
import {
  DownOutlined,
  ExportOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, Space } from "antd";
import { useDownloadExcel } from "react-export-table-to-excel";
import { Buffer } from "buffer";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useReactToPrint } from "react-to-print";
import { PrinterOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);

  const tableRef = useRef(null);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const data = [
    {
      no: 1,
      itemCode: "131000030000",
      itemDescription: "BWL Joint Comfort",
      qty: 1,
      unitPrice: 213150,
      amount: 213150,
    },
    {
      no: 1,
      itemCode: "131000030000",
      itemDescription: "BWL Joint Comfort",
      qty: 1,
      unitPrice: 213150,
      amount: 213150,
    },
    {
      no: 2,
      itemCode: "131000040000",
      itemDescription: "Pro-Vitamin C Cream",
      qty: 1,
      unitPrice: 7788,
      amount: 8300,
    },
    {
      no: 3,
      itemCode: "131000050000",
      itemDescription: "Lipoaminocel 500ml",
      qty: 1,
      unitPrice: -11666528,
      amount: -11666528,
    },
  ];

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Export Excel",
    sheet: "Sheet",
  });

  const handleExportWord = () => {
    const html = document.getElementById("container");
    const buffer = Buffer.from(html.outerHTML);

    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Export Word.doc";
    a.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const handleExportPdf = () => {
    const doc = new jsPDF({
      orientation: "portrait",
    });

    autoTable(doc, {
      margin: { top: 10 },
      columnStyles: { halign: "right", cellWidth: "auto" },
      bodyStyles: { halign: "center" },
      theme: "plain",
      body: [
        ["Beautesoft Salon"],
        ["BLK 111 Toa Payoh Central"],
        ["#01-101 S310101"],
      ],
    });

    autoTable(doc, {
      headStyles: {
        halign: "center",
        fillColor: [211, 211, 211],
        textColor: [0, 0, 0],
      },
      theme: "plain",
      head: [["", "GRN", "", ""]],
      body: [
        ["GRN No. :", "WGRNMCHQ110012", "Print Date :", "05/03/2024"],
        ["PO1 Reference :", "WPOMC01110003", "Print Time :", "5:345:48 PM"],
        ["GR1 Reference :", "WPOMC01110003", "GRN Date :", "19/08/2022"],
        ["Staff Name :", "Support", "", ""],
      ],
    });

    autoTable(doc, {
      headStyles: {
        halign: "center",
        fillColor: [211, 211, 211],
        textColor: [0, 0, 0],
      },
      columnStyles: { halign: "center" },
      theme: "grid",
      head: [
        ["No", "Item Code", "Item Description", "Qty", "Unit Price", "Amount"],
      ],
      body: [
        [1, "131000030000", "BWL Joint Comfort", 1, 213150, 213150],
        [1, "131000030000", "BWL Joint Comfort", 1, 213150, 213150],
        [2, "131000040000", "Pro-Vitamin C Cream", 1, 7788, 8300],
        [3, "131000050000", "Lipoaminocel 500ml", 1, -11666528, -11666528],
        ["", "", "Total :", 4, -666528, -666528],
      ],
    });

    autoTable(doc, {
      columnStyles: { halign: "center" },
      theme: "plain",

      body: [
        ["Remark 1:", ""],
        ["Remark 2:", ""],
      ],
    });

    autoTable(doc, {
      columnStyles: { halign: "right", cellWidth: "auto" },
      bodyStyles: { halign: "center" },
      theme: "plain",
      body: [["Invoice/Stock In Report :Page 1 of 1"]],
    });

    doc.save("Export Pdf.pdf");
  };

  const items = [
    {
      label: <div onClick={onDownload}>Excel</div>,
      key: "0",
    },
    {
      label: <div onClick={handleExportPdf}>PDF</div>,
      key: "1",
    },
    {
      label: <div onClick={handleExportWord}>Word</div>,
      key: "3",
    },
  ];

  // handle print
  const onBeforeGetContentResolve = React.useRef(null);

  const [loading, setLoading] = React.useState(false);

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called"); // tslint:disable-line no-console
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called"); // tslint:disable-line no-console
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    console.log("`onBeforeGetContent` called"); // tslint:disable-line no-console
    setLoading(true);

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        resolve();
      }, 2000);
    });
  }, [setLoading]);

  const reactToPrintContent = React.useCallback(() => {
    return tableRef.current;
  }, [tableRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "AwesomeFileName",
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
  });

  React.useEffect(() => {
    if (
      data === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, data]);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ background: "#e9f5f8", width: "25%" }}
      >
        <div className="demo-logo-vertical" />
        <h1>MAIN MENU</h1>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          style={{ background: "#e9f5f8" }}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: "Goods Receive Note",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#e9f5f8" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          <h1 style={{ fontWeight: "normal" }}>Goods Receive Note Print</h1>
          <div style={{ border: "1px solid blue", width: "50%" }}>
            <div style={{ display: "flex", gap: 20 }}>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <Space onClick={(e) => e.preventDefault()}>
                  <ExportOutlined style={{ fontSize: 32 }} />
                  <DownOutlined />
                </Space>
              </Dropdown>
              <Button
                onClick={handlePrint}
                loading={loading}
                type="ghost"
                style={{ padding: 0 }}
                icon={<PrinterOutlined style={{ fontSize: 32 }} />}
              />
            </div>
            <div ref={tableRef} id="container">
              <table
                style={{
                  width: "100%",
                }}
              >
                <tbody>
                  <tr>
                    <td></td>
                    <td></td>
                    <td colspan={2} style={{ textAlign: "center" }}>
                      Beautesoft Salon
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td colspan={2} style={{ textAlign: "center" }}>
                      BLK 111 Toa Payoh Central
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td colspan={2} style={{ textAlign: "center" }}>
                      #01-101 S310101
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>

              <table
                style={{
                  width: "100%",
                }}
              >
                <thead>
                  <tr
                    style={{
                      background: "#d3d3d3",
                    }}
                  >
                    <th colspan={6}>GRN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ textAlign: "right" }}>GRN No. :</td>
                    <td colspan={2} style={{ textAlign: "left" }}>
                      WGRNMCHQ110012
                    </td>
                    <td style={{ textAlign: "right" }}>Print Date :</td>
                    <td colspan={2} style={{ textAlign: "left" }}>
                      05/03/2024
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "right" }}>PO1 Reference :</td>
                    <td colspan={2} style={{ textAlign: "left" }}>
                      WPOMC01110003
                    </td>
                    <td style={{ textAlign: "right" }}>Print Time :</td>
                    <td colspan={2} style={{ textAlign: "left" }}>
                      5:45:48 PM
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "right" }}>GR1 Reference :</td>
                    <td colspan={2} style={{ textAlign: "left" }}></td>
                    <td style={{ textAlign: "right" }}>GRN Date :</td>
                    <td colspan={2} style={{ textAlign: "left" }}>
                      19/08/2022
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "right" }}>Staff Name :</td>
                    <td colspan={2} style={{ textAlign: "left" }}>
                      Support
                    </td>
                    <td style={{ textAlign: "right" }}></td>
                    <td colspan={2} style={{ textAlign: "left" }}></td>
                  </tr>
                </tbody>
              </table>

              <br />

              <table
                style={{
                  width: "100%",
                  border: "1px solid #d3d3d3",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr
                    style={{
                      border: "1px solid #d3d3d3",
                      borderCollapse: "collapse",
                      background: "#d3d3d3",
                    }}
                  >
                    <th
                      style={{
                        border: "1px solid #d3d3d3",
                        borderCollapse: "collapse",
                      }}
                    >
                      No
                    </th>
                    <th
                      style={{
                        border: "1px solid #d3d3d3",
                        borderCollapse: "collapse",
                      }}
                    >
                      Item Code
                    </th>
                    <th
                      style={{
                        border: "1px solid #d3d3d3",
                        borderCollapse: "collapse",
                      }}
                    >
                      Item Description
                    </th>
                    <th
                      style={{
                        border: "1px solid #d3d3d3",
                        borderCollapse: "collapse",
                      }}
                    >
                      Qty
                    </th>
                    <th
                      style={{
                        border: "1px solid #d3d3d3",
                        borderCollapse: "collapse",
                      }}
                    >
                      Unit Price
                    </th>
                    <th
                      style={{
                        border: "1px solid #d3d3d3",
                        borderCollapse: "collapse",
                      }}
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      style={{
                        border: "1px solid #d3d3d3",
                        borderCollapse: "collapse",
                      }}
                    >
                      <td
                        style={{
                          border: "1px solid #d3d3d3",
                          borderCollapse: "collapse",
                        }}
                      >
                        {item.no}
                      </td>
                      <td
                        style={{
                          border: "1px solid #d3d3d3",
                          borderCollapse: "collapse",
                        }}
                      >
                        {item.itemCode}
                      </td>
                      <td
                        style={{
                          border: "1px solid #d3d3d3",
                          borderCollapse: "collapse",
                        }}
                      >
                        {item.itemDescription}
                      </td>
                      <td
                        style={{
                          border: "1px solid #d3d3d3",
                          borderCollapse: "collapse",
                        }}
                      >
                        {item.qty}
                      </td>
                      <td
                        style={{
                          border: "1px solid #d3d3d3",
                          borderCollapse: "collapse",
                        }}
                      >
                        {item.unitPrice}
                      </td>
                      <td
                        style={{
                          border: "1px solid #d3d3d3",
                          borderCollapse: "collapse",
                        }}
                      >
                        {item.amount}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td
                      colspan={3}
                      style={{
                        border: "1px solid #d3d3d3",
                        borderCollapse: "collapse",
                        textAlign: "right",
                      }}
                    >
                      Total :
                    </td>
                    <td
                      style={{
                        border: "1px solid #d3d3d3",
                        borderCollapse: "collapse",
                      }}
                    >
                      4
                    </td>
                    <td
                      style={{
                        border: "1px solid #d3d3d3",
                        borderCollapse: "collapse",
                      }}
                    >
                      -666528
                    </td>
                    <td
                      style={{
                        border: "1px solid #d3d3d3",
                        borderCollapse: "collapse",
                      }}
                    >
                      -666528
                    </td>
                  </tr>
                  <tr>
                    <td>Remark 1:</td>
                    <td colspan={5}></td>
                  </tr>
                  <tr>
                    <td>Remark 2:</td>
                  </tr>
                  <td colspan={5}></td>
                  <tr>
                    <td></td>
                    <td></td>
                    <td colspan={2}>Invoice/Stock In Report :Page 1 of 1</td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
