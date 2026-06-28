const publicModules = {
  medical: {
    tag: "Hito 4",
    title: "Atención Médica",
    description: "Controla el recorrido del paciente desde admisión hasta indicaciones médicas.",
    label: "Cola de atención",
    preview: "Pacientes priorizados",
    highlights: ["Triaje clínico", "Historia visible", "Diagnóstico y receta", "Seguimiento de estado"],
    rows: [
      ["María Salas", "Triage completado · Presión alta · Consultorio 2", "Prioridad alta"],
      ["Jorge Paredes", "Consulta general · Dolor abdominal · Espera 8 min", "En cola"],
      ["Rosa Medina", "Control crónico · Diabetes · Médico asignado", "Atendiendo"],
      ["Luis Herrera", "Receta emitida · Derivar a farmacia", "Finalizado"],
    ],
  },
  pharmacy: {
    tag: "Hito 5",
    title: "Farmacia e Inventario",
    description: "Gestiona recetas, dispensación, stock, vencimientos y movimientos de almacén.",
    label: "Inventario crítico",
    preview: "Medicamentos y recetas",
    highlights: ["Despacho por receta", "Stock mínimo", "Kardex", "Lotes y proveedores"],
    rows: [
      ["Paracetamol 500 mg", "Stock: 24 · Mínimo: 30 · Lote PA-220", "Reponer"],
      ["Amoxicilina 875 mg", "Receta #RX-1048 · Paciente: Luis Herrera", "Dispensar"],
      ["Losartán 50 mg", "Vence en 21 días · Lote LO-091", "Alerta"],
      ["Omeprazol 20 mg", "Entrada registrada · Proveedor FarmaSur", "Disponible"],
    ],
  },
  finance: {
    tag: "Hito 6",
    title: "Caja y Facturación",
    description: "Representa pagos, comprobantes, caja diaria y estados financieros básicos.",
    label: "Movimiento de caja",
    preview: "Pagos y comprobantes",
    highlights: ["Cobros", "Boleta/factura", "Arqueo", "Cuentas por cobrar"],
    rows: [
      ["Boleta B001-00231", "Consulta general · S/ 80.00 · Efectivo", "Pagado"],
      ["Factura F001-00088", "Medicamentos · S/ 142.50 · Tarjeta", "Emitida"],
      ["Arqueo turno tarde", "Ingresos S/ 2,410 · Diferencia S/ 0.00", "Cuadrado"],
      ["Cuenta pendiente", "Paciente: Jorge Paredes · Laboratorio", "Por cobrar"],
    ],
  },
  reports: {
    tag: "Hito 7",
    title: "Dashboards y Reportes",
    description: "Muestra indicadores, filtros, auditoría y seguridad JWT.",
    label: "Panel gerencial",
    preview: "Indicadores clave",
    highlights: ["KPIs", "Reportes filtrados", "Auditoría", "Roles y permisos"],
    rows: [
      ["Atenciones del mes", "742 consultas · 18% más que el periodo anterior", "KPI"],
      ["Rotación farmacia", "Top salida: Paracetamol · 312 unidades", "Reporte"],
      ["Ingresos acumulados", "S/ 86,400 · Ticket promedio S/ 116.50", "Finanzas"],
      ["Auditoría", "Administrador generó reporte de caja a las 15:42", "Log"],
    ],
  },
};

const publicUseCases = [
  ["Atención", "Médico", "Registrar consulta médica", "Registro de motivo, diagnóstico, indicaciones y cierre de atención.", "Historia actualizada"],
  ["Atención", "Enfermería", "Realizar triaje", "Captura de signos vitales y prioridad para ordenar la cola.", "Paciente priorizado"],
  ["Atención", "Médico", "Emitir receta", "Generación de medicamentos indicados desde consulta.", "Receta disponible"],
  ["Farmacia", "Farmacéutico", "Dispensar medicamento", "Validación de receta, stock y entrega al paciente.", "Stock descontado"],
  ["Farmacia", "Almacén", "Controlar inventario", "Existencias, lotes, vencimientos, mínimos y kardex.", "Inventario trazable"],
  ["Caja", "Cajero", "Cobrar atención", "Conceptos, medio de pago y confirmación del cobro.", "Pago confirmado"],
  ["Caja", "Cajero", "Emitir comprobante", "Boleta o factura con datos fiscales y detalle.", "Comprobante emitido"],
  ["Reportes", "Gerencia", "Consultar dashboard", "KPIs de atención, farmacia, caja y alertas.", "Indicadores visibles"],
  ["Seguridad", "Administrador", "Gestionar roles", "Permisos por módulo y JWT visual sin backend.", "Accesos delimitados"],
].map(([module, actor, title, description, result]) => ({ module, actor, title, description, result }));

function initPublicPage() {
  const moduleTag = document.querySelector("#moduleTag");

  if (!moduleTag) {
    return;
  }

  const moduleTitle = document.querySelector("#moduleTitle");
  const moduleDescription = document.querySelector("#moduleDescription");
  const moduleHighlights = document.querySelector("#moduleHighlights");
  const previewLabel = document.querySelector("#previewLabel");
  const previewTitle = document.querySelector("#previewTitle");
  const moduleRows = document.querySelector("#moduleRows");
  const tabs = document.querySelectorAll(".tab");
  const refreshView = document.querySelector("#refreshView");
  const useCaseGrid = document.querySelector("#useCaseGrid");
  const filters = document.querySelectorAll(".filter");
  let activeModule = "medical";

  function renderModule(moduleKey) {
    const module = publicModules[moduleKey];
    activeModule = moduleKey;
    moduleTag.textContent = module.tag;
    moduleTitle.textContent = module.title;
    moduleDescription.textContent = module.description;
    previewLabel.textContent = module.label;
    previewTitle.textContent = module.preview;
    moduleHighlights.innerHTML = module.highlights.map((item) => `<li>${item}</li>`).join("");
    moduleRows.innerHTML = module.rows
      .map(
        ([name, detail, state]) => `
          <article class="data-row">
            <div><strong>${name}</strong><span>${detail}</span></div>
            <span class="pill">${state}</span>
          </article>
        `,
      )
      .join("");

    tabs.forEach((tab) => {
      const isActive = tab.dataset.module === moduleKey;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });
  }

  function renderUseCases(filter = "all") {
    const visibleCases = filter === "all" ? publicUseCases : publicUseCases.filter((item) => item.module === filter);
    useCaseGrid.innerHTML = visibleCases
      .map(
        (item) => `
          <article class="use-case-card">
            <span class="case-module">${item.module}</span>
            <h3>${item.title}</h3>
            <p>${item.description}</p>
            <footer><span>Actor: ${item.actor}</span><strong>${item.result}</strong></footer>
          </article>
        `,
      )
      .join("");
  }

  tabs.forEach((tab) => tab.addEventListener("click", () => renderModule(tab.dataset.module)));
  filters.forEach((filterButton) => {
    filterButton.addEventListener("click", () => {
      filters.forEach((button) => button.classList.remove("active"));
      filterButton.classList.add("active");
      renderUseCases(filterButton.dataset.filter);
    });
  });

  refreshView?.addEventListener("click", () => {
    const rows = [...publicModules[activeModule].rows];
    rows.unshift(rows.pop());
    publicModules[activeModule].rows = rows;
    renderModule(activeModule);
  });

  renderModule(activeModule);
  renderUseCases();
}

initPublicPage();
