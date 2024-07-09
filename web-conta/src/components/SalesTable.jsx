// src/components/SalesTable.jsx
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Container } from 'react-bootstrap';
import jsPDF from 'jspdf';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaPrint, FaEye } from 'react-icons/fa';

const SalesTable = () => {
  const navigate = useNavigate();

  const [sales, setSales] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);

  useEffect(() => {
    // Función para obtener las ventas desde el servidor
    const fetchSales = async () => {
      try {
        const response = await axios.get('http://localhost:3001/sales'); // Cambia la URL según tu configuración
        setSales(response.data); // Establecer las ventas en el estado local
      } catch (error) {
        console.error('Error al obtener las ventas:', error);
      }
    };

    // Llamar a la función para cargar las ventas al cargar el componente
    fetchSales();
  }, []); // El segundo argumento [] asegura que esta función se ejecute solo una vez al montar el componente

  const openModal = (sale) => {
    setSelectedSale(sale);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handlePrint = async (saleId) => {
    try {
      // Encontrar la venta seleccionada por ID
      const saleToPrint = sales.find(sale => sale.id === saleId);
      if (!saleToPrint) {
        throw new Error(`Venta con ID ${saleId} no encontrada`);
      }

      // Crear un nuevo documento jsPDF
      const doc = new jsPDF('p', 'mm', 'letter');

      // Definir el contenido del voucher
      const headerText = 'Voucher de Compra';
      const dividerLine = '____________________________________________________________';
      const contentLines = [
        `Nombre Completo:   ${saleToPrint.fullName}`,
        `RUC:               ${saleToPrint.ruc}`,
        `DNI:               ${saleToPrint.dni}`,
        `Teléfono:          ${saleToPrint.phone}`,
        `Paquete:           ${saleToPrint.packageName}`,
        `Fecha de Pago:     ${saleToPrint.paymentDate}`,
        `Base Imponible:    S/ ${saleToPrint.baseImponible.toFixed(2)}`,
        `IGV (18%):         S/ ${saleToPrint.igv.toFixed(2)}`,
        `Precio Total:      S/ ${saleToPrint.totalPrice.toFixed(2)}`
      ];
      const footerText = 'Gracias por su compra!';

      // Definir posición inicial
      let startY = 20;

      // Agregar encabezado
      doc.setFontSize(16);
      doc.text(headerText, 105, startY, { align: 'center' });
      startY += 10;
      doc.line(15, startY, 195, startY); // Línea bajo el encabezado
      startY += 10;

      // Agregar contenido
      doc.setFontSize(12);
      contentLines.forEach(line => {
        doc.text(line, 15, startY);
        startY += 10;
      });

      // Agregar línea divisoria
      startY += 5;
      doc.setFontSize(16);
      doc.text(dividerLine, 15, startY);
      startY += 10;

      // Agregar pie de página
      doc.setFontSize(12);
      doc.text(footerText, 105, startY, { align: 'center' });

      // Guardar el documento PDF con nombre único
      const fileName = `voucher_${saleId}.pdf`;
      doc.save(fileName);

      console.log('Voucher generado:', fileName);
    } catch (error) {
      console.error('Error al imprimir voucher:', error);
    }
  };

  const handleRegis = () => {
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <h1 className="mb-4 text-center">Registro de Venta</h1>
      <Button variant="dark" className="mb-4" onClick={handleRegis}>
        Atrás
      </Button>
      <Table striped bordered hover responsive className="table table-light">
        <thead>
          <tr>
            <th>Nombre Completo</th>
            <th>RUC</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Paquete</th>
            <th>Fecha de Pago</th>
            <th>Base Imponible</th>
            <th>IGV</th>
            <th>Precio Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale, index) => (
            <tr key={index}>
              <td>{sale.fullName}</td>
              <td>{sale.ruc}</td>
              <td>{sale.dni}</td>
              <td>{sale.phone}</td>
              <td>{sale.packageName}</td>
              <td>{sale.paymentDate}</td>
              <td>{sale.baseImponible.toFixed(2)}</td>
              <td>{sale.igv.toFixed(2)}</td>
              <td>{sale.totalPrice.toFixed(2)}</td>
              <td className="d-flex justify-content-start gap-2">
                <Button variant="primary" onClick={() => handlePrint(sale.id)}>
                  <FaPrint /> Imprimir
                </Button>
                <Button variant="info" onClick={() => openModal(sale)}>
                  <FaEye /> Ver Detalles
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        show={showModal}
        onHide={closeModal}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Voucher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSale && (
            <div>
              <p><strong>Nombre Completo:</strong> {selectedSale.fullName}</p>
              <p><strong>RUC:</strong> {selectedSale.ruc}</p>
              <p><strong>DNI:</strong> {selectedSale.dni}</p>
              <p><strong>Teléfono:</strong> {selectedSale.phone}</p>
              <p><strong>Paquete:</strong> {selectedSale.packageName}</p>
              <p><strong>Fecha de Pago:</strong> {selectedSale.paymentDate}</p>
              <p><strong>Base Imponible:</strong> S/ {selectedSale.baseImponible.toFixed(2)}</p>
              <p><strong>IGV:</strong> S/ {selectedSale.igv.toFixed(2)}</p>
              <p><strong>Precio Total:</strong> S/ {selectedSale.totalPrice.toFixed(2)}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SalesTable;