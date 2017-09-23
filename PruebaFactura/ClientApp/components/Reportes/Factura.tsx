import * as Reportes from './Reportes';

export interface IFactura {
    ProveedorInfo: IProveedorInfo,
    ClienteInfo: IClienteInfo,
    CargaNoElegible?: IGrupoLineaFactura,
    VencimientoCargaNoElegible?: IGrupoLineaFactura,
    DevolucionRevistasOtros?: IGrupoLineaFactura,
    AcreditacionDevolucionCargaNoElegible?: IGrupoLineaFactura
}

export interface IGrupoLineaFactura {
    Lineas: ILineaFactura[],
    Subtotal?:number | string
}

export interface ILineaFactura {
    cant: number | string,
    descripcion: string,
    edicionId: number | string,
    precioTapa: number | string,
    precioVta: number | string,
}

export interface IProveedorInfo
{
    razonSocial: string,
    domicilio: string,
    iva: string,
    cuit: string | number;
    inicioAct: string | Date,
}

export interface IClienteInfo {
    numero: string,
    cliente: string,
    domicilio: string,
    iva: string,
    cuit: string | number;
    condicionVta: string ,
}

export const ImprimirFactura = (factura: IFactura) => {
    let pdfMake = Reportes.getPdfMake();
    var docDefinition = {
        content: [
            cabecera(factura),
            Reportes.separador,
            lineasFactura(factura),
        ],
    };
    let pdf = pdfMake.createPdf(docDefinition);
    pdf.open();
}

const cabecera = (factura: IFactura) => {
    return {
        columns: [
            proveedorInfo(factura.ProveedorInfo),
            Reportes.FacturaTipo('B'),
            clienteInfo(factura.ClienteInfo),
            {
                stack: [
                    { text: 'Emision: ' + new Date().toLocaleDateString() },
                    Reportes.separador,
                    { table: { body: [['445500']] }},
                    { table: { body: [['CULPINA']] }, marginTop: 10 }
                ],
                fontSize: 9,
                bold: true,
                marginLeft:5
            }
        ],
    }
}

const proveedorInfo = (info: IProveedorInfo) => {
    return {
        stack: [
            { text: info.razonSocial, fontSize: 9, bold:true},
            Reportes.separador,
            { text: info.domicilio },
            { text: info.iva },
            Reportes.field('CUIT:', info.cuit),
            Reportes.field('Inicio de Act:', info.inicioAct),
            { text: 'DOCUMENTO VALIDO COMO FACTURA RG 1415' },            
        ],
        fontSize: 7,
        width: '40%'
    };
}


const clienteInfo = (info: IClienteInfo) => {
    return {
        stack: [
            { text: 'N°'+info.numero, fontSize: 9, bold: true },
            Reportes.separador,
            Reportes.field('Cliente:', info.cliente),
            Reportes.field('Domicilio:', info.domicilio),
            Reportes.field('IVA:', info.cuit),
            Reportes.field('CUIT:', info.cuit),
            Reportes.field('Condicion de venta de Act:', info.condicionVta),
        ],
        fontSize: 7
    };
}

const mapLinea = lin => {
    let linea = (Object as any).values(lin);   
    linea.push('');
    //linea.push('');
    //linea.push('');
    //linea.push('');
    //linea.push('');
    //linea.push('');
    //linea.push('');
    return linea;
}

const LineaDoble = (lineasSimple: ILineaFactura[]) => {
    let ixMitad = Math.ceil(lineasSimple.length / 2);
    let ladoDerecho = lineasSimple.splice(0, ixMitad);
    let ladoIzquierdo = lineasSimple;
    let lineasDoble = [];
    for (var i = 0; i < ladoIzquierdo.length; i++) {
        let lineaDoble = mapLinea(ladoDerecho[i]).concat(mapLinea(ladoIzquierdo[i]));
        lineasDoble.push(lineaDoble)
    }
    if (ladoDerecho.length > ladoIzquierdo.length)
        lineasDoble.push(mapLinea(ladoDerecho[ladoDerecho.length - 1]).concat(['','','','','','']));
    return lineasDoble;
}

const getGrupoDescripcion = (descripcion) => {
    return ['', { text: descripcion, bold: true, fontSize: 9 }, '', '', '', '', '', '', '', '', '', ''];
}
const lineasFactura = (factura: IFactura) => {
    let body = [];
    let { CargaNoElegible, VencimientoCargaNoElegible, DevolucionRevistasOtros, AcreditacionDevolucionCargaNoElegible } = factura;

    let head = [
        {
            border: [false, true, false, true],
            text: 'Cant'
        },
        {
            border: [false, true, false, true],
            text: 'Descripcion'
        },
        {
            border: [false, true, false, true],
            text: 'Edicion'
        },
        {
            border: [false, true, false, true],
            text: 'P.Tapa'
        },
        {
            border: [false, true, false, true],
            text: 'P.Vta'
        },
        {
            border: [false, true, false, true],
            text: 'Subtotal'
        },
        {
            border: [false, true, false, true],
            text: 'Cant'
        },
        {
            border: [false, true, false, true],
            text: 'Descripcion'
        },
        {
            border: [false, true, false, true],
            text: 'Edicion'
        },
        {
            border: [false, true, false, true],
            text: 'P.Tapa'
        },
        {
            border: [false, true, false, true],
            text: 'P.Vta'
        },
        {
            border: [false, true, false, true],
            text: 'Subtotal'
        }
    ];

    body.push(head);
    let cuerpo = [];

    cuerpo.push(getGrupoDescripcion('Carga no elegible'));
    if (CargaNoElegible) {
        cuerpo = cuerpo.concat(LineaDoble(CargaNoElegible.Lineas));
        //cuerpo = cuerpo.concat(factura.CargaNoElegible.Lineas.map(mapLinea));
    }

    cuerpo.push(getGrupoDescripcion('Vencimiento de carga no elegible'));
    if (VencimientoCargaNoElegible) {
        cuerpo = cuerpo.concat(LineaDoble(VencimientoCargaNoElegible.Lineas));
        //cuerpo = cuerpo.concat(VencimientoCargaNoElegible.Lineas.map(mapLinea));
        cuerpo.push(['', { text: 'Subtotal', bold: true, fontSize: 8 }, '', '', '', VencimientoCargaNoElegible.Subtotal, '', '', '', '', '', ''])
    }

    cuerpo.push(getGrupoDescripcion('Devolucion de revistas y otros'));
    if (DevolucionRevistasOtros) {
        cuerpo = cuerpo.concat(DevolucionRevistasOtros.Lineas.map(mapLinea));
        cuerpo.push(['', { text: 'Subtotal', bold: true, fontSize: 8 }, '', '', '', DevolucionRevistasOtros.Subtotal, '','','','','',''])
    }

    cuerpo.push(getGrupoDescripcion('Acreditacion de devolucion de carga no elegible'));
    if (AcreditacionDevolucionCargaNoElegible) { 
        cuerpo = cuerpo.concat(AcreditacionDevolucionCargaNoElegible.Lineas.map(mapLinea));
        cuerpo.push(['', { text: 'Subtotal', bold: true, fontSize: 8 }, '', '', '', AcreditacionDevolucionCargaNoElegible.Subtotal, '', '', '', '', '', ''])
    }


    body = body.concat(cuerpo);

    return {
        table: {
            headerRows:1,
            body:body
        },
        layout: {
            defaultBorder: false,
        },
        fontSize: 7,
    }
}