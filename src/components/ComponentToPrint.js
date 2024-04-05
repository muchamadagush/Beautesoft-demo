import * as React from "react";

export class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { checked: false };
  }

  canvasEl;

  handleCheckboxOnChange = () =>
    this.setState({ checked: !this.state.checked });

  setRef = (ref) => (this.canvasEl = ref);

  render() {
    const { data, tableRef } = this.props;

    return (
      <div ref={tableRef} className="relativeCSS" style={{ display: "none" }}>
        <style type="text/css" media="print">
          {
            "\
   @page { size: landscape; }\
"
          }
        </style>
        <div className="flash" />
        <div id="container">
          <p style={{ width: "50%", textAlign: "center" }}>Beautesoft HQ</p>
          <p style={{ width: "50%", textAlign: "center" }}>
            BLK 1 Pasir Ris Rise
          </p>
          <p style={{ width: "50%", textAlign: "center" }}>#01-101 S510001</p>

          <table
            style={{
              width: "50%",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#d3d3d3",
                }}
              >
                <th colspan={4}>GRN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "right" }}>GRN No. :</td>
                <td style={{ textAlign: "left" }}>WGRNMCHQ110001</td>
                <td style={{ textAlign: "right" }}>Print Date :</td>
                <td style={{ textAlign: "left" }}>04/04/2024</td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>PO1 Reference :</td>
                <td style={{ textAlign: "left" }}></td>
                <td style={{ textAlign: "right" }}>Print Time :</td>
                <td style={{ textAlign: "left" }}>8:38:03 PM</td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>GR1 Reference :</td>
                <td style={{ textAlign: "left" }}></td>
                <td style={{ textAlign: "right" }}>GRN Date :</td>
                <td style={{ textAlign: "left" }}>12/07/2022</td>
              </tr>
              <tr>
                <td style={{ textAlign: "right" }}>Staff Name :</td>
                <td style={{ textAlign: "left" }}>KK</td>
                <td style={{ textAlign: "right" }}></td>
                <td style={{ textAlign: "left" }}></td>
              </tr>
            </tbody>
          </table>

          <br />

          <table
            style={{
              width: "50%",
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
                  1000
                </td>
                <td
                  style={{
                    border: "1px solid #d3d3d3",
                    borderCollapse: "collapse",
                  }}
                >
                  1320
                </td>
                <td
                  style={{
                    border: "1px solid #d3d3d3",
                    borderCollapse: "collapse",
                  }}
                >
                  132000
                </td>
              </tr>
            </tbody>
          </table>

          <p>Remark 1:</p>
          <p>Remark 2:</p>
          <br />
          <p style={{ width: "100%", textAlign: "center" }}>
            Invoice/Stock In Report :Page 1 of 1
          </p>
        </div>
      </div>
    );
  }
}

export const FunctionalComponentToPrint = React.forwardRef((props, ref) => {
  return <ComponentToPrint ref={ref} text={props.text} />;
});
