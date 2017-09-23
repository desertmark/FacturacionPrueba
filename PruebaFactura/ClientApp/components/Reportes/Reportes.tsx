import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';


export const getPdfMake = () => {
    console.log(pdfFonts);
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    return pdfMake;
}

export const styles = {
    sectionTitle: {
        fontSize: 14,
        bold: true,
        margin: [0, 20, 0, 8]
    },
}


export const separador = { text: "", marginTop: 15 }


export const tabla = (title: string, cols: string[], rows: Array<Object>) => {
    var body = [];
    body.push(cols);
    rows.map(row => {
        let rowValues = (Object as any).values(row);
        if (rowValues.length != cols.length)
            throw new Error(`La fila ${row} tiene mas columnas de lo esperado`);
        body.push(rowValues);
    })
    return [
        { text: title, ...styles.sectionTitle },
        {
            table: {
                //widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
                headerRows: 1,
                body: body
            },
            layout: 'lightHorizontalLines',
        }
    ]


}

export const lista = (title: string, items: any[]) => {
    return [
        { text: title, bold: true },
        {
            ul: items.map(item => {
                return { text: item, fontSize: 10 };
            }),
            marginTop: 5
        }
    ]
}

export const field = (label: string, value: any) => {
    return {
        columns: [
            { text: label, width:'auto' },
            { text: value, width:'auto' },
        ],
    }
}

export const FacturaTipo = (tipo: string)=> {
    return {
                stack: [
                    { text: 'Resumen de Cuenta', bold: true, margin: 0 },
                    separador,
                    { text: 'Cod.40', marginLeft: 23 },
                    { table: { body: [[tipo]] }, bold: true, marginLeft: 33, marginTop: 5, marginBottom: 5 },
                    { text: 'ORIGINAL', marginLeft: 23 },
                ],
                fontSize: 9,
            }
}
