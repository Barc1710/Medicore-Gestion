const patientSections = [
  {
    id: "resumen",
    label: "Resumen",
    title: "Resumen del paciente",
    description: "Vista general de citas, recetas, pagos y alertas personales.",
    metrics: [["Próxima cita", "29 Jun", "Medicina"], ["Recetas", "2", "Pendientes"], ["Pagos", "S/ 128", "Por pagar"], ["Alertas", "1", "Receta por recoger"]],
    cards: [
      ["Cita confirmada", "Dra. Vargas · Medicina general · 09:00"],
      ["Receta pendiente", "Losartán 50 mg · Farmacia central"],
      ["Pago pendiente", "Consulta + farmacia · S/ 128"],
    ],
  },
  {
    id: "citas",
    label: "Citas",
    title: "Mis citas y agenda",
    description: "Permite ver próximas citas, solicitar una nueva cita y reprogramar horarios.",
    metrics: [["Programadas", "2", "Próximas"], ["Históricas", "8", "Atendidas"], ["Pendientes", "1", "Confirmar"]],
    table: {
      headers: ["Fecha", "Especialidad", "Médico", "Estado"],
      rows: [["2026-06-29 09:00", "Medicina", "Dra. Vargas", "Confirmada"], ["2026-07-12 11:30", "Cardiología", "Dr. Ramos", "Pendiente"], ["2026-05-30 10:00", "Laboratorio", "Tec. Ruiz", "Atendida"]],
    },
    form: ["Especialidad", "Médico preferido", "Fecha tentativa", "Turno", "Motivo"],
    actions: ["Solicitar cita", "Reprogramar", "Cancelar"],
  },
  {
    id: "historia",
    label: "Historia",
    title: "Historia clínica electrónica",
    description: "Muestra antecedentes, alergias, consultas cerradas y resultados registrados.",
    metrics: [["Consultas", "16", "Históricas"], ["Alergias", "1", "Penicilina"], ["Controles", "3", "Programados"]],
    table: {
      headers: ["Fecha", "Servicio", "Diagnóstico", "Estado"],
      rows: [["2026-06-03", "Medicina", "Control hipertensión", "Cerrada"], ["2026-05-14", "Laboratorio", "Perfil lipídico", "Completado"], ["2026-04-20", "Medicina", "Cefalea tensional", "Cerrada"]],
    },
    form: ["Filtro por fecha", "Especialidad", "Tipo de registro"],
    actions: ["Ver detalle", "Descargar resumen"],
  },
  {
    id: "recetas",
    label: "Recetas",
    title: "Mis recetas",
    description: "Lista recetas emitidas, indicaciones médicas, estado de despacho y vencimiento.",
    metrics: [["Activas", "2", "Vigentes"], ["Dispensadas", "8", "Históricas"], ["Vencen pronto", "1", "Revisar"]],
    table: {
      headers: ["Receta", "Medicamento", "Indicaciones", "Estado"],
      rows: [["RX-1049", "Losartán 50 mg", "1 tableta cada 24 h", "Pendiente"], ["RX-1050", "Metformina 850 mg", "1 tableta con comida", "Dispensada"], ["RX-1035", "Paracetamol 500 mg", "Cada 8 h por dolor", "Vencida"]],
    },
    form: ["Código de receta", "Farmacia", "Fecha de emisión"],
    actions: ["Ver indicaciones", "Enviar a farmacia"],
  },
  {
    id: "farmacia",
    label: "Farmacia",
    title: "Farmacia para paciente",
    description: "Consulta disponibilidad de medicamentos y estado de entrega de recetas.",
    metrics: [["Por recoger", "1", "Lista"], ["Disponible", "3", "Productos"], ["Sin stock", "0", "Actual"]],
    table: {
      headers: ["Producto", "Farmacia", "Disponibilidad", "Estado"],
      rows: [["Losartán 50 mg", "Central", "18 unidades", "Reservado"], ["Omeprazol 20 mg", "Central", "110 unidades", "Disponible"], ["Paracetamol 500 mg", "Sede Norte", "24 unidades", "Stock bajo"]],
    },
    form: ["Medicamento", "Sede", "Receta asociada"],
    actions: ["Reservar", "Ver alternativa"],
  },
  {
    id: "pagos",
    label: "Pagos",
    title: "Caja y facturación del paciente",
    description: "Permite revisar montos pendientes, comprobantes y medios de pago de prueba.",
    metrics: [["Pendiente", "S/ 128", "Actual"], ["Pagado", "S/ 640", "Histórico"], ["Comprobantes", "9", "Emitidos"]],
    table: {
      headers: ["Concepto", "Monto", "Comprobante", "Estado"],
      rows: [["Consulta general", "S/ 80", "B001-00231", "Pendiente"], ["Farmacia", "S/ 48", "B001-00232", "Pendiente"], ["Laboratorio", "S/ 65", "B001-00198", "Pagado"]],
    },
    form: ["Concepto", "Medio de pago", "Correo para comprobante"],
    actions: ["Pagar", "Ver comprobante"],
  },
  {
    id: "perfil",
    label: "Perfil",
    title: "Seguridad y perfil",
    description: "Muestra datos personales, contacto, contraseña y JWT del paciente.",
    metrics: [["Sesión", "Activa", "JWT"], ["Permisos", "4", "Paciente"], ["Datos", "Actualizados", "Hoy"]],
    table: {
      headers: ["Dato", "Valor", "Uso", "Estado"],
      rows: [["Documento", "45678123", "Identificación", "Activo"], ["Correo", "maria.salas@email.com", "Notificaciones", "Validado"], ["Teléfono", "999 888 777", "Contacto", "Validado"]],
    },
    form: ["Correo", "Teléfono", "Dirección", "Contacto de emergencia"],
    actions: ["Actualizar perfil", "Ver JWT"],
  },
];

function initPatientPortal() {
  const loginForm = document.querySelector("#patientLoginForm");

  if (!loginForm) {
    return;
  }

  const app = window.GestionApp;
  const loginView = document.querySelector("#patientLogin");
  const shell = document.querySelector("#patientShell");
  const patientNameInput = document.querySelector("#patientNameInput");
  const patientDocument = document.querySelector("#patientDocument");
  const patientName = document.querySelector("#patientName");
  const patientDoc = document.querySelector("#patientDoc");
  const patientNav = document.querySelector("#patientNav");
  const patientContent = document.querySelector("#patientContent");
  const patientLogout = document.querySelector("#patientLogout");
  let activeSectionId = "resumen";
  let currentPatient = patientNameInput.value;

  function renderMetrics(metrics) {
    return metrics
      .map(
        ([label, value, note]) => `
          <article class="admin-metric">
            <span>${label}</span>
            <strong>${value}</strong>
            <small>${note}</small>
          </article>
        `,
      )
      .join("");
  }

  function renderNav() {
    patientNav.innerHTML = patientSections
      .map(
        (section) => `
          <button class="${section.id === activeSectionId ? "active" : ""}" type="button" data-patient-section="${section.id}">
            ${section.label}
          </button>
        `,
      )
      .join("");

    patientNav.querySelectorAll("[data-patient-section]").forEach((button) => {
      button.addEventListener("click", () => renderSection(button.dataset.patientSection));
    });
  }

  function renderForm(fields = []) {
    return fields
      .map(
        (field) => `
          <label>
            ${field}
            <input type="text" value="Dato de prueba" />
          </label>
        `,
      )
      .join("");
  }

  function renderSection(sectionId) {
    const section = patientSections.find((item) => item.id === sectionId) || patientSections[0];
    activeSectionId = section.id;
    const jwtBlock =
      section.id === "perfil"
        ? `<pre>${app.createFakeJwt("Paciente", currentPatient)}</pre>`
        : "";

    patientContent.innerHTML = `
      <section class="screen-hero-card patient-section-hero">
        <div>
          <span class="tag">Portal Web del Paciente</span>
          <h3>${section.title}</h3>
          <p>${section.description}</p>
        </div>
        <div class="actor-card">
          <span>Paciente</span>
          <strong>${currentPatient}</strong>
        </div>
      </section>
      <section class="admin-metrics">${renderMetrics(section.metrics)}</section>
      ${
        section.cards
          ? `<section class="patient-card-grid">${section.cards
              .map(([title, detail]) => `<article><strong>${title}</strong><span>${detail}</span></article>`)
              .join("")}</section>`
          : `
            <section class="admin-workspace">
              <article class="admin-form-card">
                <div class="card-heading">
                  <div><p class="eyebrow">Acción del paciente</p><h3>Formulario</h3></div>
                </div>
                <form class="admin-form">${renderForm(section.form)}</form>
                <div class="patient-action-row">
                  ${section.actions.map((action) => `<button class="ghost-button" type="button" data-patient-action>${action}</button>`).join("")}
                </div>
                ${jwtBlock}
              </article>
              <article class="admin-list-card">
                <div class="card-heading">
                  <div><p class="eyebrow">Mis registros</p><h3>${section.title}</h3></div>
                </div>
                ${app.renderTable(section.table)}
              </article>
            </section>
          `
      }
    `;

    patientContent.querySelectorAll("[data-patient-action]").forEach((button) => {
      const originalText = button.textContent;
      button.addEventListener("click", () => {
        button.textContent = "Acción realizada";
        button.classList.add("success");
        setTimeout(() => {
          button.textContent = originalText;
          button.classList.remove("success");
        }, 1000);
      });
    });

    renderNav();
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    currentPatient = patientNameInput.value.trim() || "María Salas";
    patientName.textContent = currentPatient;
    patientDoc.textContent = patientDocument.value.trim() || "45678123";
    loginView.classList.add("hidden");
    shell.classList.remove("hidden");
    renderSection(activeSectionId);
  });

  patientLogout.addEventListener("click", () => {
    shell.classList.add("hidden");
    loginView.classList.remove("hidden");
  });
}

initPatientPortal();
