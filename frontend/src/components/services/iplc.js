import "../../../src/bootstrap.min.css";
import { Container, Table } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import React from "react";

class IPLC extends React.Component {
  render() {
    return (
      <div className="p-4">
        <div style={{ textAlign: "center" }}>
          <h2>IPLC Service</h2>
        </div>

        <Container>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <strong>IPLC via Submarine Cables!</strong>
              </Accordion.Header>
              <Accordion.Body>
                BSCPLC is the main service provider and operator of submarine
                cable bandwidth in the country. BSCPLC's submarine cable landing
                stations are located at Cox's Bazar and Kuakata. Customers can
                connect to IPLC (International Private Lease Circuit) services
                from the co-location centers of the backhaul service providers
                (currently Chittagong, Mohakhali, Dhaka and Moghbazar, Dhaka)
                through their fiber optic cables. In addition, to provide
                multiple options for backhaul connectivity, co-location centers
                have been set up at Cox's Bazar/Kuakata landing stations.
                BSCPLC's valued customers can select the backhaul service
                provider of their choice, those backhaul services providers can
                be directly connected to BSCCL's co-location centers through
                fiber optic cables.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <strong>
                  Currently, BSCPLC is providing IPLC services to the following
                  customers:
                </strong>
              </Accordion.Header>
              <Accordion.Body>
                # International Internet Gateway (IIG) provides various routes
                and different levels of services such as STM-1, STM-4, STM-16,
                STM-64, 1G/10G/100G services to companies through International
                Private Leased Circuit (IPLC). # International Voice Gateway
                (IGW) provides various routes and different levels of services
                such as STM-1, STM-4, STM-16 to companies. # Provides dedicated
                IPLC services to any corporate customer subject to the approval
                of Bangladesh Telecommunication Regulatory Commission (BTRC). #
                In addition, it exports unused bandwidth to foreign customers
                where applicable.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <strong>Application Form for IP Transit Connection</strong>
              </Accordion.Header>
              <Accordion.Body>
                <Table striped bordered hover responsive>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>
                          APPLICATION FORM FOR IPLC REGISTRANT’S INFORMATION
                        </strong>
                      </td>
                      <td>
                        <a
                          href="https://www.bsccl.com.bd/doc/up_file/IPLC_Application_1448350461-52.pdf"
                          class="download-link"
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Agreement for IPLC Connection</strong>
                      </td>
                      <td>
                        <a
                          href="https://bsccl.com.bd/uploads/file-manager/ae6f5a84-2619-44c4-a31d-b046f675446a.docx"
                          class="download-link"
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </div>
    );
  }
}
export default IPLC;
