import React, { useState } from 'react';
import { Form, Button, Spinner, Container, Row, Col, Card, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PurchaseForm = ({ packages, addSale }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    ruc: '',
    dni: '',
    phone: '',
    packageId: packages[0].id,
    paymentDate: new Date().toISOString().slice(0, 10),
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedPackage = packages.find(pkg => pkg.id == formData.packageId);
    const baseImponible = parseFloat(selectedPackage.price / 1.18).toFixed(2);
    const igv = parseFloat(selectedPackage.price * 0.18).toFixed(2);
    const saleData = {
      fullName: formData.fullName,
      ruc: formData.ruc,
      dni: formData.dni,
      phone: formData.phone,
      packageName: selectedPackage.name,
      paymentDate: formData.paymentDate,
      baseImponible,
      igv,
      totalPrice: selectedPackage.price
    };

    try {
      setLoading(true);

      const response = await axios.post('http://localhost:3001/sales/add', saleData);
      addSale(response.data);
      setFormData({
        fullName: '',
        ruc: '',
        dni: '',
        phone: '',
        packageId: packages[0].id,
        paymentDate: new Date().toISOString().slice(0, 10),
      });

      setShowModal(true); // Mostrar el modal después de una compra exitosa
      setTimeout(() => {
        setShowModal(false); // Cerrar el modal después de 1 segundo
      }, 1000);

    } catch (error) {
      console.error('Error registrando la venta:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTable = () => {
    navigate('/table');
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container className="mt-2">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card>
            <Card.Header className="bg-primary text-white">Registro de Compra</Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-end mb-3">
                <Button variant="secondary" onClick={handleTable}>
                  Registros de Venta
                </Button>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="fullName">
                  <Form.Label>Nombre Completo</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="Ingrese su nombre completo"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="ruc">
                  <Form.Label>RUC</Form.Label>
                  <Form.Control
                    type="text"
                    name="ruc"
                    value={formData.ruc}
                    onChange={handleInputChange}
                    required
                    placeholder="Ingrese su RUC"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="dni">
                  <Form.Label>DNI</Form.Label>
                  <Form.Control
                    type="text"
                    name="dni"
                    value={formData.dni}
                    onChange={handleInputChange}
                    required
                    placeholder="Ingrese su DNI"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Ingrese su número de teléfono"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="package">
                  <Form.Label>Paquete</Form.Label>
                  <Form.Control
                    as="select"
                    name="packageId"
                    value={formData.packageId}
                    onChange={handleInputChange}
                  >
                    {packages.map(pkg => (
                      <option key={pkg.id} value={pkg.id}>{pkg.name} - ${pkg.price}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading} className="w-100">
                  {loading ? (
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : null}
                  Confirmar Compra
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación Exitosa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¡La compra ha sido registrada exitosamente!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PurchaseForm;