// src/components/PackagesCatalog.jsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

const PackagesCatalog = ({ packages }) => {
  return (
    <div className="row row-cols-1 row-cols-md-3 g-4">
      {packages.map((pkg) => (
        <div key={pkg.id} className="col">
          <Card className="h-100 shadow">
            <Card.Body>
              <Card.Title>{pkg.name}</Card.Title>
              <Card.Text>
                Precio: ${pkg.price}
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default PackagesCatalog;