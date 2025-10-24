// Script JavaScript con Programación Funcional
// Autor: Adalberto Casteleiro
// Proyecto: CV Interactivo con Asistente Financiero

// Datos de países con códigos telefónicos
const paises = [
    { codigo: "521", nombre: "México", abrev: "MX", bandera: "🇲🇽" },
    { codigo: "1", nombre: "Estados Unidos", abrev: "US", bandera: "🇺🇸" },
    { codigo: "1", nombre: "Canadá", abrev: "CA", bandera: "🇨🇦" },
    { codigo: "54", nombre: "Argentina", abrev: "AR", bandera: "🇦🇷" },
    { codigo: "56", nombre: "Chile", abrev: "CL", bandera: "🇨🇱" },
    { codigo: "57", nombre: "Colombia", abrev: "CO", bandera: "🇨🇴" },
    { codigo: "506", nombre: "Costa Rica", abrev: "CR", bandera: "🇨🇷" },
    { codigo: "593", nombre: "Ecuador", abrev: "EC", bandera: "🇪🇨" },
    { codigo: "34", nombre: "España", abrev: "ES", bandera: "🇪🇸" }
];

// Datos de usuarios ejemplo para demostración
const usuariosEjemplo = [
    {
        id: 1,
        nombre: "Adalberto Casteleiro",
        email: "adalberto@example.com",
        telefono: "5216648466156",
        activo: true,
        servicios: ["reporte_diario", "reporte_semanal", "donante"]
    },
    {
        id: 2,
        nombre: "María González",
        email: "maria@example.com",
        telefono: "5215551234567",
        activo: true,
        servicios: ["reporte_mensual", "donante"]
    },
    {
        id: 3,
        nombre: "Carlos López",
        email: "carlos@example.com",
        telefono: "17181234567",
        activo: false,
        servicios: ["reporte_diario"]
    }
];

// Funciones de programación funcional

/**
 * Función para encontrar un país por código
 * Utiliza find() - programación funcional
 */
const encontrarPaisPorCodigo = (codigo) => {
    return paises.find(pais => pais.codigo === codigo);
};

/**
 * Función para filtrar países por región (América)
 * Utiliza filter() - programación funcional
 */
const filtrarPaisesAmericanos = () => {
    const paisesAmericanos = ["MX", "US", "CA", "AR", "CL", "CO", "CR", "EC"];
    return paises.filter(pais => paisesAmericanos.includes(pais.abrev));
};

/**
 * Función para mapear países a opciones de select
 * Utiliza map() - programación funcional
 */
const mapearPaisesAOpciones = () => {
    return paises.map(pais => ({
        value: pais.codigo,
        text: `${pais.abrev} (+${pais.codigo})`,
        display: `${pais.bandera} ${pais.nombre} (+${pais.codigo})`
    }));
};

/**
 * Función para filtrar usuarios activos
 * Utiliza filter() - programación funcional
 */
const obtenerUsuariosActivos = () => {
    return usuariosEjemplo.filter(usuario => usuario.activo === true);
};

/**
 * Función para encontrar usuario por email
 * Utiliza find() - programación funcional
 */
const buscarUsuarioPorEmail = (email) => {
    return usuariosEjemplo.find(usuario => 
        usuario.email.toLowerCase() === email.toLowerCase()
    );
};

/**
 * Función para obtener usuarios con servicio específico
 * Utiliza filter() y includes() - programación funcional
 */
const obtenerUsuariosConServicio = (servicio) => {
    return usuariosEjemplo.filter(usuario => 
        usuario.servicios.includes(servicio)
    );
};

/**
 * Función para reducir servicios únicos de todos los usuarios
 * Utiliza reduce() y Set - programación funcional
 */
const obtenerServiciosUnicos = () => {
    return usuariosEjemplo.reduce((servicios, usuario) => {
        usuario.servicios.forEach(servicio => servicios.add(servicio));
        return servicios;
    }, new Set());
};

/**
 * Función para validar formato de teléfono
 * Utiliza programación funcional con regex
 */
const validarTelefono = (telefono) => {
    const esNumero = /^\d+$/.test(telefono);
    const longitudCorrecta = telefono.length === 10;
    
    return {
        valido: esNumero && longitudCorrecta,
        errores: [
            !esNumero && "Solo se permiten números",
            !longitudCorrecta && "Debe tener exactamente 10 dígitos"
        ].filter(Boolean)
    };
};

/**
 * Función para formatear número de teléfono completo
 * Utiliza programación funcional
 */
const formatearTelefonoCompleto = (codigoPais, numeroLocal) => {
    const validacion = validarTelefono(numeroLocal);
    
    if (!validacion.valido) {
        return { error: validacion.errores.join(", ") };
    }
    
    return {
        numeroCompleto: codigoPais + numeroLocal,
        formato: `+${codigoPais} ${numeroLocal}`,
        whatsappUrl: `https://wa.me/${codigoPais}${numeroLocal}`
    };
};

/**
 * Función para inicializar selectores de país
 * Utiliza forEach() - programación funcional
 */
const inicializarSelectorPais = (selectorId) => {
    const selector = document.getElementById(selectorId);
    if (!selector) return;

    const opciones = mapearPaisesAOpciones();
    
    // Limpiar opciones existentes
    selector.innerHTML = '';
    
    // Agregar opciones usando forEach
    opciones.forEach(opcion => {
        const optionElement = document.createElement('option');
        optionElement.value = opcion.value;
        optionElement.textContent = opcion.text;
        selector.appendChild(optionElement);
    });
};

/**
 * Función para manejar validación en tiempo real
 * Utiliza programación funcional con eventos
 */
const configurarValidacionTelefono = (inputId, mensajeId) => {
    const input = document.getElementById(inputId);
    const mensaje = document.getElementById(mensajeId);
    
    if (!input) return;

    input.addEventListener('input', (event) => {
        const valor = event.target.value;
        const validacion = validarTelefono(valor);
        
        if (mensaje) {
            mensaje.textContent = validacion.valido ? 
                '✓ Número válido' : 
                validacion.errores.join(", ");
            mensaje.className = validacion.valido ? 
                'text-success' : 
                'text-danger';
        }
        
        // Aplicar estilos al input
        input.className = input.className.replace(/is-(valid|invalid)/g, '') + 
            (validacion.valido ? ' is-valid' : ' is-invalid');
    });
};

/**
 * Función para buscar y mostrar estadísticas de usuarios
 * Utiliza múltiples funciones de programación funcional
 */
const obtenerEstadisticasUsuarios = () => {
    const usuariosActivos = obtenerUsuariosActivos();
    const serviciosUnicos = obtenerServiciosUnicos();
    
    return {
        totalUsuarios: usuariosEjemplo.length,
        usuariosActivos: usuariosActivos.length,
        usuariosInactivos: usuariosEjemplo.length - usuariosActivos.length,
        serviciosDisponibles: Array.from(serviciosUnicos),
        usuariosPorServicio: Array.from(serviciosUnicos).map(servicio => ({
            servicio,
            cantidad: obtenerUsuariosConServicio(servicio).length
        }))
    };
};

/**
 * Función para filtrar y buscar usuarios
 * Utiliza filter() y includes() - programación funcional
 */
const buscarUsuarios = (termino) => {
    return usuariosEjemplo.filter(usuario => 
        usuario.nombre.toLowerCase().includes(termino.toLowerCase()) ||
        usuario.email.toLowerCase().includes(termino.toLowerCase())
    );
};

// Funciones de inicialización del DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializar selector de país si existe
    inicializarSelectorPais('country_code');
    
    // Configurar validación de teléfono si existe
    configurarValidacionTelefono('phone', 'phone-mensaje');
    
    // Mostrar estadísticas en consola (para desarrollo)
    console.log('Estadísticas de usuarios:', obtenerEstadisticasUsuarios());
    
    // Configurar formulario de registro si existe
    const formularioRegistro = document.querySelector('form[action*="registro"]');
    if (formularioRegistro) {
        formularioRegistro.addEventListener('submit', (event) => {
            const codigoPais = document.querySelector('[name="country_code"]')?.value;
            const telefono = document.querySelector('[name="phone"]')?.value;
            
            if (codigoPais && telefono) {
                const resultado = formatearTelefonoCompleto(codigoPais, telefono);
                
                if (resultado.error) {
                    event.preventDefault();
                    alert('Error en teléfono: ' + resultado.error);
                    return;
                }
                
                console.log('Teléfono formateado:', resultado.numeroCompleto);
            }
        });
    }
    
    // Configurar efectos hover mejorados
    const botones = document.querySelectorAll('.whatsapp-btn, .dashboard-btn');
    botones.forEach(boton => {
        boton.addEventListener('mouseenter', () => {
            boton.style.transform = 'translateY(-2px)';
            boton.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        });
        
        boton.addEventListener('mouseleave', () => {
            boton.style.transform = 'translateY(0)';
            boton.style.boxShadow = 'none';
        });
    });
});

// Exportar funciones para uso global (si es necesario)
window.AppFuncional = {
    encontrarPaisPorCodigo,
    filtrarPaisesAmericanos,
    mapearPaisesAOpciones,
    obtenerUsuariosActivos,
    buscarUsuarioPorEmail,
    obtenerUsuariosConServicio,
    validarTelefono,
    formatearTelefonoCompleto,
    obtenerEstadisticasUsuarios,
    buscarUsuarios
};

console.log('Script de programación funcional cargado correctamente ✓');