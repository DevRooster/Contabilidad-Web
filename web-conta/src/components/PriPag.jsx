import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PackagesCatalog from '../components/PackagesCatalog';
import PurchaseForm from '../components/PurchaseForm';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios'; // Importa axios si no lo has hecho


const packagesData = [
    { id: 1, name: 'Paquete Básico', price: 50 },
    { id: 2, name: 'Paquete Estándar', price: 100 },
    { id: 3, name: 'Paquete Premium', price: 150 },
    { id: 4, name: 'Paquete Golden', price: 300 },
    { id: 5, name: 'Paquete Estudiante', price: 200 },
    { id: 5, name: 'Paquete Docente', price: 400 },
];
const PriPag = () => {
    const [sales, setSales] = useState([]);

    const handleAddSale = (sale) => {
        setSales([...sales, sale]);
    };

    const refreshSales = async () => {
        try {
            const response = await axios.get('http://localhost:3001/sales'); // Ajusta la URL según tu configuración
            setSales(response.data);
        } catch (error) {
            console.error('Error al obtener las ventas:', error);
        }
    };

    return (
        <Container className="mt-0">
            <Row>
                <Col>
                    <h2>Catálogo de Paquetes Internet</h2>
                    <PackagesCatalog packages={packagesData} />
                </Col>
                <Col>
                    <h2 style={{position:'relative', left:'110px'}}>Formulario de Compra</h2>
                    <PurchaseForm packages={packagesData} addSale={handleAddSale} refreshSales={refreshSales} />
                </Col>
            </Row>
        </Container>
    )
}

export default PriPag
