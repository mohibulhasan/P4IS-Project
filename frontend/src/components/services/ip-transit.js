import "../../../src/bootstrap.min.css";
import { Container, Table } from "react-bootstrap";
import { Accordion } from "react-bootstrap";
import React from "react";

class IPTransit extends React.Component {
  render() {
    return (
      <div className="p-4">
        <div style={{ textAlign: "center" }}>
          <h2>IP Transit Service</h2>
        </div>

        <Container>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Journey to IIG</Accordion.Header>
              <Accordion.Body>
                BSCPLC started the journey of providing IP transit connectivity
                services from 1st July 2013 aiming to facilitate the pace of
                building a prosperous and flourishing Bangladesh. BSCPLC has
                been providing quality IP bandwidth to IIG operators as ILDC
                operator and ISP customers as IIG operator. To provide this
                quality IP bandwidth, BSCPLC has deployed routers at Equnix in
                Singapore and has connected with global Tier-1 Internet Service
                Providers and regional Tier-1 Internet Service Providers based
                on customer needs. BSCPLC's Autonomous System AS-132602 is
                connected to around 200 (Autonomous System) networks around the
                world. BSCPLC has interconnectivity of 100 Gbps, 40 Gbps or 10
                Gbps with all these networks based on requirement. BSCPLC
                ensured uninterrupted bandwidth supply to its IP transit
                customers through two submarine cables landing at two different
                locations and offering best price. We guarantee the speedy
                delivery of seamless service along with simplifying the process
                of selling our products. We are committed to provide 24/7
                technical support provided by our skilled Network Operations
                Center to simplify customers network operations to ensure
                customer satisfaction.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>Product Features:</Accordion.Header>
              <Accordion.Body>
                • Complete Redundancy: BSCPLC is connected to various upstream
                routers in in Singapore and Marseille via SMW-4 submarine cable
                landed in Cox's Bazar and via SMW-5 submarine cable to landed in
                Kuakata. Dhaka is connected to Cox’s Bazar and Kuakata via
                different NTTN providers to ensure redundancy. Hence, BSCPLC
                provides IP transit services by ensuring complete redundancy
                with upstream carriers, submarine cable systems and backhaul
                connections as well. • Launching of various POPs: In order to
                facilitate the provision of IP transit services by BSCPLC, a
                total of 6 POPs have been launched at Kuakata Landing Station,
                Cox's Bazar Landing Station, Tejgaon in Dhaka, Khaja Tower in
                Mohakhali, BTCL Exchange in Moghbazar, Mymensingh. Besides, the
                issue of launching a new POP in Agargao ICT Bhavan in Dhaka is
                under process. • Full SLA: Our SLA provides 100% worldwide
                network availability, 99.9% uptime and provide customer down
                notification via e-mail within 15 minutes. • Fast Connection:
                The desired service is activated within 24 hours if Demand Note
                fee is paid and physical link is completed. • Customer Support:
                Our customer support is available 24/7 throughout the year. •
                Long Term Commitment: No longterm commitment is required.
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
                          APPLICATION FORM FOR LEASED INTERNET BANDWIDTH
                          REGISTRANT’S INFORMATION
                        </strong>
                      </td>
                      <td>
                        <a
                          href="https://bsccl.com.bd/uploads/file-manager/022719d1-fccd-4ae8-b506-f671ef0d1c7a.pdf"
                          class="download-link"
                        >
                          Download
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Agreement for IP Transit Connection</strong>
                      </td>
                      <td>
                        <a
                          href="https://bsccl.com.bd/uploads/file-manager/76e67b61-421c-49fb-a8a7-73394a9c6811.pdf"
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
export default IPTransit;
