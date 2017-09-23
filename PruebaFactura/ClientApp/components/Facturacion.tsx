import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as FacturaReporte from './Reportes/Factura'

class Facturacion extends React.Component<any, {}> 
{ 
    constructor(props) {
        super(props);
        this.imprimir = this.imprimir.bind(this);
        this.getLines = this.getLines.bind(this);
    }
    getLines(cant) {

        let lines = [];
        for (var i = 0; i < cant; i++) {
            let precio = ((Math.random() * 300) + 1);
            lines.push({
                cant: 1,
                descripcion: 'ANIMALES DE GRANJA/MIS',
                edicionId: 1,
                precioTapa: precio.toFixed(2),
                precioVta: (precio * 1.2).toFixed(2)
            });
        }
        return lines;
    }
    imprimir() {
        let factura: FacturaReporte.IFactura = {
            ClienteInfo: {
                numero: '006-00014971',
                domicilio: 'AVDA RIVADAVIA 7284',
                cliente: 'RODRIGUEZ HUGO ALEJANDRO',
                cuit: 20125144463,
                condicionVta: 'CONTADO',
                iva:'Responsable Monotributo'
            },
            ProveedorInfo: {
                razonSocial: 'COOP. DE TRAB.DIAR/REV PARQUE LTDA.',
                domicilio: 'AV AUSTRALIA 2886-C1296ABL - BARRACAS',
                iva: 'IVA Responsable Inscripto',
                cuit: '30709161683',
                inicioAct: '01/09/2012',
            },
            CargaNoElegible: {
                Lineas: this.getLines(80),
            },
            VencimientoCargaNoElegible: {
                Subtotal: '63.650',
                Lineas: this.getLines(3)                
            }            
        }

        FacturaReporte.ImprimirFactura(factura);
    }

    public render() {
        return <div>
            <h1>Facturacion</h1>

            <p>Prueba de facturacion con PDFMake</p>

            <button onClick={this.imprimir}>Imprimir Facturas</button>
        </div>;
    }
}


export default connect(               
)(Facturacion) as typeof Facturacion;

