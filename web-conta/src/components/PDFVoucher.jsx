// src/components/PDFVoucher.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    fontSize: 12,
  },
});

const PDFVoucher = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Nombre Completo: {data.fullName}</Text>
        <Text>RUC: {data.ruc}</Text>
        <Text>DNI: {data.dni}</Text>
        <Text>Teléfono: {data.phone}</Text>
        <Text>Fecha de Pago: {data.paymentDate}</Text>
        <Text>Nombre del Paquete: {data.package}</Text>
        <Text>Precio Total: {data.totalPrice}</Text>
        <Text>Base Imponible: {parseFloat(data.totalPrice / 1.18).toFixed(2)}</Text>
        <Text>IGV (18%): {parseFloat(data.totalPrice * 0.18).toFixed(2)}</Text>
      </View>
    </Page>
  </Document>
);

export default PDFVoucher;