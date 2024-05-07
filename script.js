document.addEventListener('DOMContentLoaded', function() {
    const xmlFileInput = document.getElementById('xmlFile');
    const statusDiv = document.getElementById('status');
    const tableContainer = document.createElement('div');
    tableContainer.id = 'tableContainer';

    xmlFileInput.addEventListener('change', function(event) {
        const xmlFile = event.target.files[0];
        if (!xmlFile) return;

        const reader = new FileReader();

        reader.onload = function(event) {
            const xmlText = event.target.result;
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

            const data = parseXML(xmlDoc);
            renderTable(data);
        };

        reader.readAsText(xmlFile);
    });

    function parseXML(xmlDoc) {
        const emisor = xmlDoc.getElementsByTagName('cfdi:Emisor')[0];
        if (!emisor) {
            console.error('El elemento <emisor> no fue encontrado en el documento XML.');
            return {};
        }
        const comprobante = xmlDoc.getElementsByTagName('cfdi:Comprobante')[0];
        if (!comprobante) {
            console.error('El elemento <comprobante> no fue encontrado en el documento XML.');
            return {};
        }
        const timbre = xmlDoc.getElementsByTagName('tfd:TimbreFiscalDigital')[0];

        const total = comprobante.getAttribute('Total');
        const subtotal = comprobante.getAttribute('SubTotal');
        const empresaFactura = emisor.getAttribute('Nombre');
        const rfcemisor = emisor.getAttribute('Rfc');
        const fecha = timbre.getAttribute('FechaTimbrado');
        const uuid = timbre.getAttribute('UUID');
    
        if (!total || !empresaFactura) {
            console.error('Algunos elementos dentro de <factura> no fueron encontrados en el documento XML.');
            return {};
        }
    
        return {
            total,
            subtotal,
            empresaFactura,
            rfcemisor,
            fecha,
            uuid
            // Puedes agregar más campos aquí según la estructura de tu XML
        };
    }

    function renderTable(data) {
        const table = document.createElement('table');
        table.innerHTML = `
            <tr>
            <th>Orden de compra</th>
            <th>RFC Emisor</th>
            <th>Razón social</th>
            <th>Fecha timbrado</th>
            <th>Subtotal</th>
            <th>Total</th>
            <th>UUID</th>
            <!-- Agrega más encabezados de columna según sea necesario -->
            </tr> 
            <tr>
            <td>${document.getElementById("myInputOC")}</td>
            <td>${data.rfcemisor}</td>
            <td>${data.empresaFactura}</td>
            <td>${data.fecha}</td>
            <td>$${data.subtotal} MXN</td>
            <td>$${data.total} MXN</td>
            <td>$${data.uuid}</td>
            <!-- Agrega más datos de la tabla según sea necesario -->
            </tr>
        `;
        tableContainer.innerHTML = '';
        tableContainer.appendChild(table);
        statusDiv.appendChild(tableContainer);
    }
});


// Register and login functions

const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});
