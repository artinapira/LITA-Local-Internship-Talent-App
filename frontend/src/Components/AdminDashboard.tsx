import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { LocationService } from "../Services/LocationService";
import { People, Place, School } from "@mui/icons-material";
import { UserService } from "../Services/UserService";

export default function AdminDashboard() {
  // Shtetet për numrat e Lectures, Students dhe Locations
  const [employerCount, setEmployerCount] = useState<number>(0);
  const [locationCount, setLocationCount] = useState<number>(0);
  const [studentCount, setStudentCount] = useState<number>(0);

  // Të dhënat për PieChart-in e departamenteve
  const [pieData, setPieData] = useState<{ name: string; value: number }[]>([]);

  // Funksionet për marrje të të dhënave nga backend
  const fetchEmployerCount = async () => {
    try {
      const count = await UserService.CountEmployers();
      setEmployerCount(count);
    } catch (error) {
      console.error("Error fetching employer count:", error);
    }
  };

  const fetchLocationCount = async () => {
    try {
      const count = await LocationService.CountLocations();
      setLocationCount(count);
    } catch (error) {
      console.error("Error fetching location count:", error);
    }
  };

  const fetchStudentCount = async () => {
    try {
      const count = await UserService.CountStudents();
      setStudentCount(count);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  

  useEffect(() => {
    fetchEmployerCount();
    fetchLocationCount();
    fetchStudentCount();
  }, []);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#dc3545",
    "#20c997"
  ];

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Admin Dashboard</h2>

      <Row className="mb-4">
        <Col md={4}>
          <Card
            className="shadow-sm border-0"
            style={{ backgroundColor: "#0d6efd", color: "white" }}
          >
            <Card.Body>
              <Card.Title>
                <School style={{ marginRight: "8px" }} />
                Total Employers
              </Card.Title>
              <h3>{employerCount}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="shadow-sm border-0"
            style={{ backgroundColor: "#198754", color: "white" }}
          >
            <Card.Body>
              <Card.Title>
                <People style={{ marginRight: "8px" }} />
                Total Students
              </Card.Title>
              <h3>{studentCount}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card
            className="shadow-sm border-0"
            style={{ backgroundColor: "#6f42c1", color: "white" }}
          >
            <Card.Body>
              <Card.Title>
                <Place style={{ marginRight: "8px" }} />
                Total Locations
              </Card.Title>
              <h3>{locationCount}</h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
