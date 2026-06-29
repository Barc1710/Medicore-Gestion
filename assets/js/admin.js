function initAdminPage() {
  const loginForm = document.querySelector("#adminLoginForm");

  if (!loginForm) {
    return;
  }

  const app = window.GestionApp;
  const loginView = document.querySelector("#adminLogin");
  const shell = document.querySelector("#adminShell");
  const loginUser = document.querySelector("#loginUser");
  const loginRole = document.querySelector("#loginRole");
  const adminNav = document.querySelector("#adminNav");
  const adminContent = document.querySelector("#adminContent");
  const currentModule = document.querySelector("#currentModule");
  const currentTitle = document.querySelector("#currentTitle");
  const logoutButton = document.querySelector("#logoutButton");
  const jwtDrawer = document.querySelector("#jwtDrawer");
  const openJwt = document.querySelector("#openJwt");
  const closeJwt = document.querySelector("#closeJwt");
  const notificationButton = document.querySelector("#notificationButton");
  const notificationMenu = document.querySelector("#notificationMenu");
  const profileButton = document.querySelector("#profileButton");
  const profileMenu = document.querySelector("#profileMenu");
  const topbarUser = document.querySelector("#topbarUser");
  const profileMenuUser = document.querySelector("#profileMenuUser");
  const profileMenuRole = document.querySelector("#profileMenuRole");
  const adminJwt = document.querySelector("#adminJwt");
  const adminPermissions = document.querySelector("#adminPermissions");

  let activeScreenId = app.adminGroups[0].screens[0].id;
  let activeRole = loginRole.value;
  let activeUser = loginUser.value;
  const expandedGroups = new Set([app.adminGroups[0].id]);

  function getScreens() {
    return app.adminGroups.flatMap((group) => group.screens.map((screen) => ({ ...screen, group })));
  }

  function getGroupIcon(groupId) {
    const icons = {
      "citas-agenda": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/></svg>',
      "historia-recetas": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 14h6"/><path d="M12 11v6"/></svg>',
      "farmacia-inventario": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m10.5 20.5 10-10a4.95 4.95 0 0 0-7-7l-10 10a4.95 4.95 0 0 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>',
      "caja-facturacion": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2Z"/><path d="M16 8h-6"/><path d="M16 12h-6"/><path d="M10 16h4"/></svg>',
      "dashboards-reportes": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/><path d="M14 9h5v5"/></svg>',
      "seguridad-usuarios": '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z"/><path d="m9 12 2 2 4-4"/></svg>',
    };

    return icons[groupId] || '<svg viewBox="0 0 24 24" aria-hidden="true"><rect width="16" height="16" x="4" y="4" rx="2"/><path d="M9 9h6"/><path d="M9 15h6"/></svg>';
  }

  function renderNav() {
    adminNav.innerHTML = app.adminGroups
      .map((group) => {
        const isExpanded = expandedGroups.has(group.id);

        return `
          <section class="nav-group ${isExpanded ? "open" : ""}">
            <button class="nav-group-toggle" type="button" data-group="${group.id}" aria-expanded="${isExpanded}">
              <span class="nav-group-icon">${getGroupIcon(group.id)}</span>
              <span class="nav-group-copy">
                <small>${group.screens.length} vistas</small>
                <strong>${group.label}</strong>
              </span>
              <b>${group.screens.length}</b>
            </button>
            <div class="nav-group-panel">
              ${group.screens
              .map(
                (screen) => `
                  <button class="admin-nav-button ${screen.id === activeScreenId ? "active" : ""}" type="button" data-screen="${screen.id}">
                    <span class="screen-dot"></span>
                    <span>
                    <small>${screen.useCase}</small>
                    ${screen.title}
                    </span>
                  </button>
                `,
              )
              .join("")}
            </div>
          </section>
        `;
      })
      .join("");

    adminNav.querySelectorAll("[data-group]").forEach((button) => {
      button.addEventListener("click", () => {
        const groupId = button.dataset.group;

        if (expandedGroups.has(groupId)) {
          expandedGroups.delete(groupId);
        } else {
          expandedGroups.add(groupId);
        }

        renderNav();
      });
    });

    adminNav.querySelectorAll("[data-screen]").forEach((button) => {
      button.addEventListener("click", () => renderScreen(button.dataset.screen));
    });
  }

  function renderMetricCards(metrics) {
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

  function renderFields(fields) {
    return fields
      .map(
        (field, index) => {
          const config = typeof field === "string" ? { label: field } : field;
          const value = config.value || (index % 2 === 0 ? "Dato de prueba" : "Pendiente de confirmar");
          const isWide = config.wide || config.type === "textarea";

          if (config.type === "textarea") {
            return `
          <label class="${isWide ? "wide" : ""}">
            ${config.label}
            <textarea>${value}</textarea>
          </label>
        `;
          }

          return `
          <label class="${isWide ? "wide" : ""}">
            ${config.label}
            <input type="${config.type || "text"}" value="${value}" />
          </label>
        `;
        },
      )
      .join("");
  }

  function renderList(items, className = "check-list") {
    return `<ul class="${className}">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  }

  function renderChips(items) {
    return `<div class="clinical-chip-row">${items.map((item) => `<span>${item}</span>`).join("")}</div>`;
  }

  function renderDetailBlock(title, items, className = "") {
    return `
      <article class="clinical-detail ${className}">
        <h4>${title}</h4>
        ${renderList(items, "clinical-list")}
      </article>
    `;
  }

  function renderOverviewSections(sections) {
    return `
      <section class="clinical-summary-grid">
        ${sections
          .map(
            (section) => `
              <article class="clinical-summary-card">
                <h4>${section.title}</h4>
                ${renderList(section.items, "clinical-list")}
              </article>
            `,
          )
          .join("")}
      </section>
    `;
  }

  function renderLucideIcon(name) {
    const paths = {
      activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
      alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
      calendar: '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',
      check: '<path d="M20 6 9 17l-5-5"/>',
      clipboard: '<rect width="8" height="4" x="8" y="2" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>',
      download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/>',
      file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M9 13h6"/><path d="M9 17h6"/>',
      heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/><path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>',
      lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
      pill: '<path d="m10.5 20.5 10-10a4.95 4.95 0 0 0-7-7l-10 10a4.95 4.95 0 0 0 7 7Z"/><path d="m8.5 8.5 7 7"/>',
      plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
      printer: '<path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/>',
      search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
      send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
      shield: '<path d="M20 13c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V5l8-3 8 3Z"/>',
      stethoscope: '<path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 12 0V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15a6 6 0 0 0 12 0v-3"/><circle cx="20" cy="10" r="2"/>',
      user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
      x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    };

    return `<svg class="lucide-icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.file}</svg>`;
  }

  function renderClinicalSystem(screen) {
    const patients = screen.patients || [];
    const tabs = [
      ["resumen", "Resumen", "clipboard"],
      ["triaje", "Triaje", "heart"],
      ["consulta", "Consulta", "stethoscope"],
      ["ordenes", "Ordenes", "clipboard"],
      ["receta", "Receta", "pill"],
      ["documentos", "Documentos", "file"],
      ["auditoria", "Auditoria", "shield"],
    ];
    let activePatientId = patients[0]?.id;
    let activeTab = screen.initialTab || "resumen";
    let activeModal = "";

    function getPatient() {
      return patients.find((patient) => patient.id === activePatientId) || patients[0];
    }

    function renderMiniTable(headers, rows) {
      return `
        <div class="hce-table-wrap">
          <table class="hce-table">
            <thead><tr>${headers.map((header) => `<th>${header}</th>`).join("")}</tr></thead>
            <tbody>${rows.map((row) => `<tr>${row.map((cell, index) => `<td>${index === row.length - 1 ? `<span class="hce-pill">${cell}</span>` : cell}</td>`).join("")}</tr>`).join("")}</tbody>
          </table>
        </div>
      `;
    }

    function renderVitals(patient) {
      return Object.entries(patient.vitals)
        .map(
          ([key, value]) => `
            <article>
              <span>${{
                pressure: "Presion",
                heartRate: "F. cardiaca",
                respiratoryRate: "F. respiratoria",
                temperature: "Temperatura",
                oxygen: "Saturacion",
                weight: "Peso",
                height: "Talla",
                bmi: "IMC",
              }[key]}</span>
              <strong>${value}</strong>
            </article>
          `,
        )
        .join("");
    }

    function renderActionModal(patient) {
      if (!activeModal) {
        return "";
      }

      const modalMap = {
        "new-history": `
          <div class="hce-system-modal-card large">
            <header>
              <div>${renderLucideIcon("plus")}<h3>Nueva historia clinica</h3></div>
              <button type="button" data-hce-close-modal aria-label="Cerrar">${renderLucideIcon("x")}</button>
            </header>
            <form class="hce-form hce-modal-form">
              <label>Tipo documento<select><option>DNI</option><option>CE</option><option>Pasaporte</option></select></label>
              <label>Numero documento<input value="" placeholder="Ingrese documento" /></label>
              <label>Nombres<input value="" placeholder="Nombres" /></label>
              <label>Apellidos<input value="" placeholder="Apellidos" /></label>
              <label>Fecha de nacimiento<input type="date" value="1988-08-12" /></label>
              <label>Sexo<select><option>Femenino</option><option>Masculino</option><option>No especifica</option></select></label>
              <label>Telefono<input value="" placeholder="Celular o fijo" /></label>
              <label>Correo<input value="" placeholder="correo@dominio.com" /></label>
              <label>Direccion<input value="" placeholder="Direccion completa" /></label>
              <label>Distrito<input value="" placeholder="Distrito" /></label>
              <label>Seguro<select><option>Particular</option><option>Seguro Clinica</option><option>Plan Familiar</option></select></label>
              <label>Numero de poliza<input value="" placeholder="Opcional" /></label>
              <label>Contacto emergencia<input value="" placeholder="Nombre y parentesco" /></label>
              <label>Telefono emergencia<input value="" placeholder="Celular" /></label>
              <label class="wide">Alergias conocidas<textarea placeholder="Medicamentos, alimentos o sustancias"></textarea></label>
              <label class="wide">Antecedentes y medicacion habitual<textarea placeholder="Enfermedades cronicas, cirugias, medicamentos de uso frecuente"></textarea></label>
              <label class="wide">Observaciones de admision<textarea placeholder="Notas administrativas o clinicas iniciales"></textarea></label>
              <label class="wide hce-checkbox"><input type="checkbox" checked /> Consentimiento informado para tratamiento de datos clinicos</label>
            </form>
            <footer>
              <button class="ghost-button" type="button" data-hce-close-modal>Cancelar</button>
              <button class="button primary" type="button" data-hce-confirm-modal>${renderLucideIcon("check")}Crear historia</button>
            </footer>
          </div>
        `,
        print: `
          <div class="hce-system-modal-card print">
            <header>
              <div>${renderLucideIcon("printer")}<h3>Vista de impresion</h3></div>
              <button type="button" data-hce-close-modal aria-label="Cerrar">${renderLucideIcon("x")}</button>
            </header>
            <section class="prescription-paper">
              <div class="prescription-head">
                <div><strong>MEDICORE</strong><span>Clinica Integral</span></div>
                <div><b>${patient.prescription.code}</b><span>${new Date().toLocaleDateString("es-PE")}</span></div>
              </div>
              <div class="prescription-patient">
                <span>Paciente</span><strong>${patient.name}</strong>
                <span>${patient.document} · ${patient.age}</span>
              </div>
              ${renderMiniTable(["Medicamento", "Dosis", "Frecuencia", "Duracion"], patient.prescription.items)}
              <div class="prescription-notes">
                <strong>Indicaciones</strong>
                <p>Tomar segun indicacion medica. Acudir a emergencia ante signos de alarma o reaccion adversa.</p>
              </div>
              <div class="prescription-sign">
                <span>${patient.physician}</span>
                <small>Firma y sello</small>
              </div>
            </section>
            <footer>
              <button class="ghost-button" type="button" data-hce-close-modal>Cerrar</button>
              <button class="button primary" type="button" data-hce-confirm-modal>${renderLucideIcon("printer")}Imprimir</button>
            </footer>
          </div>
        `,
        schedule: `
          <div class="hce-system-modal-card medium">
            <header>
              <div>${renderLucideIcon("calendar")}<h3>Programar cita</h3></div>
              <button type="button" data-hce-close-modal aria-label="Cerrar">${renderLucideIcon("x")}</button>
            </header>
            <form class="hce-form hce-modal-form">
              <label>Paciente<input value="${patient.name}" /></label>
              <label>Fecha sugerida<input type="date" value="2026-07-15" /></label>
              <label>Hora<input type="time" value="09:30" /></label>
              <label>Especialidad<select><option>Medicina interna</option><option>Cardiologia</option><option>Endocrinologia</option><option>Traumatologia</option></select></label>
              <label>Medico<select><option>${patient.physician}</option><option>Dr. Ramos</option><option>Dra. Leon</option></select></label>
              <label>Prioridad<select><option>Media</option><option>Alta</option><option>Baja</option></select></label>
              <label class="wide">Motivo<textarea>Control posterior a atencion y revision de tratamiento.</textarea></label>
            </form>
            <footer>
              <button class="ghost-button" type="button" data-hce-close-modal>Cancelar</button>
              <button class="button primary" type="button" data-hce-confirm-modal>${renderLucideIcon("calendar")}Confirmar cita</button>
            </footer>
          </div>
        `,
      };

      return `
        <div class="hce-system-modal" data-hce-modal-backdrop>
          ${modalMap[activeModal] || ""}
        </div>
      `;
    }

    function renderTab(patient) {
      const panels = {
        resumen: `
          <section class="hce-summary-grid">
            <article class="hce-panel">
              <div class="hce-panel-head"><div>${renderLucideIcon("clipboard")}<h4>Resumen clinico</h4></div></div>
              <div class="hce-info-list">
                <div><span>Alergias</span><strong>${patient.allergy}</strong></div>
                <div><span>Antecedentes relevantes</span><strong>${patient.chronic}</strong></div>
                <div><span>Ultima atencion</span><strong>${patient.lastVisit}</strong></div>
                <div><span>Motivo actual</span><strong>${patient.reason}</strong></div>
              </div>
            </article>
            <article class="hce-panel">
              <div class="hce-panel-head"><div>${renderLucideIcon("calendar")}<h4>Historial de consultas</h4></div></div>
              ${renderMiniTable(["Fecha", "Servicio", "Motivo", "Estado"], patient.history)}
            </article>
          </section>
          <section class="hce-panel">
            <div class="hce-panel-head"><div>${renderLucideIcon("activity")}<h4>Diagnosticos y medicamentos activos</h4></div></div>
            <div class="hce-token-row">
              ${patient.diagnoses.map((item) => `<span>${item}</span>`).join("")}
              ${patient.medicines.map((item) => `<span>${item}</span>`).join("")}
            </div>
          </section>
        `,
        triaje: `
          <section class="hce-panel">
            <div class="hce-panel-head"><div>${renderLucideIcon("heart")}<h4>Signos vitales</h4></div><button class="ghost-button" type="button" data-hce-action>${renderLucideIcon("check")}Guardar triaje</button></div>
            <div class="hce-vitals-grid">${renderVitals(patient)}</div>
          </section>
          <section class="hce-panel">
            <div class="hce-panel-head"><div>${renderLucideIcon("clipboard")}<h4>Evaluacion inicial</h4></div></div>
            <form class="hce-form">
              <label>Motivo inicial<input value="${patient.reason}" /></label>
              <label>Prioridad<select><option>${patient.priority}</option><option>Muy alta</option><option>Media</option></select></label>
              <label class="wide">Observaciones de enfermeria<textarea>Paciente orientado. Se deriva a ${patient.physician} segun agenda del turno.</textarea></label>
            </form>
          </section>
        `,
        consulta: `
          <section class="hce-panel">
            <div class="hce-panel-head"><div>${renderLucideIcon("stethoscope")}<h4>Consulta medica</h4></div><button class="ghost-button" type="button" data-hce-action>${renderLucideIcon("check")}Guardar evolucion</button></div>
            <form class="hce-form">
              <label>Motivo de consulta<input value="${patient.reason}" /></label>
              <label>Tiempo de enfermedad<input value="7 dias" /></label>
              <label class="wide">Enfermedad actual<textarea>Cefalea intermitente, sin signos neurologicos de alarma. Paciente refiere adherencia irregular al tratamiento.</textarea></label>
              <label class="wide">Examen fisico<textarea>Buen estado general. Piel tibia. Torax sin agregados. Abdomen blando. Neurologico sin focalizacion.</textarea></label>
            </form>
          </section>
          <section class="hce-work-row">
            <article class="hce-panel">
              <div class="hce-panel-head"><div>${renderLucideIcon("activity")}<h4>Diagnostico</h4></div></div>
              <div class="hce-token-row">${patient.diagnoses.map((item) => `<span>${item}</span>`).join("")}</div>
              <button class="ghost-button" type="button" data-hce-action>${renderLucideIcon("plus")}Agregar diagnostico</button>
            </article>
            <article class="hce-panel">
              <div class="hce-panel-head"><div>${renderLucideIcon("clipboard")}<h4>Plan e indicaciones</h4></div></div>
              <div class="hce-mini-grid">
                <div><span>Tratamiento</span><strong>Continuar medicacion</strong></div>
                <div><span>Control</span><strong>Segun evolucion</strong></div>
                <div><span>Alertas</span><strong>Explicadas</strong></div>
              </div>
              <button class="ghost-button" type="button" data-hce-action>${renderLucideIcon("lock")}Cerrar atencion</button>
            </article>
          </section>
        `,
        receta: `
          <section class="hce-prescription">
            <article class="hce-panel">
              <div class="hce-panel-head"><div>${renderLucideIcon("pill")}<h4>Receta ${patient.prescription.code}</h4></div><span class="hce-pill">${patient.prescription.status}</span></div>
              ${renderMiniTable(["Medicamento", "Dosis", "Frecuencia", "Duracion"], patient.prescription.items)}
              <div class="hce-action-row">
                <button class="button primary" type="button" data-hce-action>${renderLucideIcon("send")}Emitir receta</button>
                <button class="ghost-button" type="button" data-hce-action>${renderLucideIcon("check")}Firmar</button>
                <button class="ghost-button" type="button" data-hce-action="print-prescription">${renderLucideIcon("printer")}Imprimir</button>
                <button class="ghost-button" type="button" data-hce-action="send-prescription">${renderLucideIcon("pill")}Enviar a farmacia</button>
              </div>
            </article>
            <aside class="hce-panel hce-warning-panel">
              ${renderLucideIcon("alert")}
              <h4>Validaciones automaticas</h4>
              <p>${patient.allergy.includes("Sin alergias") ? "Sin alergias medicamentosas registradas para esta receta." : `Alerta: revisar ${patient.allergy} antes de emitir.`}</p>
              <p>No se detectan duplicados activos en la receta actual.</p>
            </aside>
          </section>
        `,
        ordenes: `
          <section class="hce-panel">
            <div class="hce-panel-head"><div>${renderLucideIcon("clipboard")}<h4>Ordenes y solicitudes</h4></div><button class="ghost-button" type="button" data-hce-action>${renderLucideIcon("plus")}Nueva orden</button></div>
            ${renderMiniTable(["Tipo", "Solicitud", "Prioridad", "Estado"], patient.orders)}
          </section>
          <section class="hce-work-row">
            <article class="hce-panel">
              <div class="hce-panel-head"><div>${renderLucideIcon("calendar")}<h4>Seguimiento</h4></div></div>
              <div class="hce-mini-grid">
                <div><span>Estado</span><strong>Por programar</strong></div>
                <div><span>Prioridad</span><strong>Media</strong></div>
              </div>
              <button class="ghost-button" type="button" data-hce-action="schedule-appointment">${renderLucideIcon("calendar")}Agendar control</button>
            </article>
            <article class="hce-panel">
              <div class="hce-panel-head"><div>${renderLucideIcon("file")}<h4>Consentimientos</h4></div></div>
              <div class="hce-mini-grid">
                <div><span>Pendientes</span><strong>0</strong></div>
                <div><span>Firmados</span><strong>2</strong></div>
              </div>
              <button class="ghost-button" type="button" data-hce-action>${renderLucideIcon("file")}Generar documento</button>
            </article>
          </section>
        `,
        documentos: `
          <section class="hce-panel">
            <div class="hce-panel-head"><div>${renderLucideIcon("file")}<h4>Documentos clinicos</h4></div><button class="ghost-button" type="button" data-hce-action>${renderLucideIcon("plus")}Adjuntar documento</button></div>
            ${renderMiniTable(["Tipo", "Documento", "Fecha", "Permiso"], patient.documents)}
          </section>
          <section class="hce-work-row">
            <article class="hce-panel"><div class="hce-panel-head"><div>${renderLucideIcon("file")}<h4>Informe medico</h4></div><button class="ghost-button" type="button" data-hce-action>${renderLucideIcon("file")}Generar</button></div></article>
            <article class="hce-panel"><div class="hce-panel-head"><div>${renderLucideIcon("calendar")}<h4>Descanso medico</h4></div><button class="ghost-button" type="button" data-hce-action>${renderLucideIcon("calendar")}Crear</button></div></article>
          </section>
        `,
        auditoria: `
          <section class="hce-panel">
            <div class="hce-panel-head"><div>${renderLucideIcon("shield")}<h4>Auditoria de la historia</h4></div><button class="ghost-button" type="button" data-hce-action>${renderLucideIcon("download")}Exportar</button></div>
            ${renderMiniTable(["Hora", "Usuario", "Accion", "Area"], patient.audit)}
          </section>
        `,
      };

      return panels[activeTab] || panels.resumen;
    }

    function render() {
      const patient = getPatient();
      currentModule.textContent = `${screen.group.module} · ${screen.group.label}`;
      currentTitle.textContent = "Atencion clinica";
      adminContent.innerHTML = `
        <section class="hce-app">
          <header class="hce-command-bar">
            <div>
              <p class="eyebrow">Historia clinica</p>
              <h3>${screen.title}</h3>
              <div class="hce-header-stats">
                <span>${renderLucideIcon("user")} ${patients.length} pacientes</span>
                <span>${renderLucideIcon("stethoscope")} ${patient.status}</span>
                <span>${renderLucideIcon("alert")} ${patient.priority}</span>
              </div>
            </div>
            <div class="hce-command-actions">
              <button class="ghost-button" type="button" data-hce-action="new-history">${renderLucideIcon("plus")}Nueva historia</button>
              <button class="button primary" type="button" data-hce-action>${renderLucideIcon("check")}Firmar atencion</button>
            </div>
          </header>

          <section class="hce-patient-board">
            <div class="hce-board-head">
              <div>
                <span>Pacientes del turno</span>
                <strong>${patients.length} pacientes activos</strong>
              </div>
              <label class="hce-search wide">${renderLucideIcon("search")}<input id="hcePatientSearch" type="search" placeholder="Buscar por nombre, documento o historia" /></label>
            </div>
            <div class="hce-patient-cards">
              ${patients
                .map(
                  (item) => `
                    <button class="${item.id === patient.id ? "active" : ""}" type="button" data-hce-patient="${item.id}" data-hce-search="${`${item.name} ${item.document} ${item.record} ${item.status} ${item.reason}`.toLowerCase()}">
                      <span>${item.appointment}</span>
                      <strong>${item.name}</strong>
                      <small>${item.document}</small>
                      <b>${item.status}</b>
                    </button>
                  `,
                )
                .join("")}
            </div>
          </section>

          <section class="hce-layout">
            <main class="hce-record">
              <section class="hce-patient-banner">
                <div>
                  <span class="hce-record-label">${renderLucideIcon("user")}${patient.record}</span>
                  <h3>${patient.name}</h3>
                  <p>${patient.document} · ${patient.age} · ${patient.insurance}</p>
                </div>
                <div class="hce-banner-status">
                  <span>${patient.status}</span>
                  <strong>${patient.physician}</strong>
                  <small>${patient.appointment}</small>
                </div>
              </section>

              <nav class="hce-tabs" aria-label="Secciones de historia clinica">
                ${tabs.map(([id, label, icon]) => `<button class="${id === activeTab ? "active" : ""}" type="button" data-hce-tab="${id}">${renderLucideIcon(icon)}${label}</button>`).join("")}
              </nav>

              <section class="hce-tab-content">${renderTab(patient)}</section>
            </main>

            <aside class="hce-context">
              <article class="hce-alert-card">
                <span>Alerta clinica</span>
                <strong>${patient.allergy}</strong>
              </article>
              <article class="hce-panel">
                <h4>Trabajo pendiente</h4>
                <div class="hce-task-list">
                  <button type="button" data-hce-action>${renderLucideIcon("lock")}Cerrar atencion</button>
                  <button type="button" data-hce-action>${renderLucideIcon("check")}Firmar atencion</button>
                  <button type="button" data-hce-action>${renderLucideIcon("pill")}Emitir receta</button>
                  <button type="button" data-hce-action="send-prescription">${renderLucideIcon("send")}Enviar a farmacia</button>
                </div>
              </article>
              <article class="hce-panel">
                <h4>Proximo control</h4>
                <div class="hce-mini-grid single">
                  <div><span>Fecha</span><strong>Sin programar</strong></div>
                  <div><span>Especialidad</span><strong>Por definir</strong></div>
                </div>
                <button class="ghost-button full" type="button" data-hce-action="schedule-appointment">${renderLucideIcon("calendar")}Programar cita</button>
              </article>
            </aside>
          </section>
          ${renderActionModal(patient)}
        </section>
      `;

      adminContent.querySelectorAll("[data-hce-patient]").forEach((button) => {
        button.addEventListener("click", () => {
          activePatientId = button.dataset.hcePatient;
          activeTab = "resumen";
          render();
        });
      });

      const patientSearch = adminContent.querySelector("#hcePatientSearch");
      if (patientSearch) {
        patientSearch.addEventListener("input", () => {
          const query = patientSearch.value.trim().toLowerCase();
          adminContent.querySelectorAll("[data-hce-patient]").forEach((button) => {
            button.classList.toggle("hidden", query && !button.dataset.hceSearch.includes(query));
          });
        });
      }

      adminContent.querySelectorAll("[data-hce-tab]").forEach((button) => {
        button.addEventListener("click", () => {
          activeTab = button.dataset.hceTab;
          render();
        });
      });

      adminContent.querySelectorAll("[data-hce-action]").forEach((button) => {
        const originalHtml = button.innerHTML;
        button.addEventListener("click", () => {
          const action = button.dataset.hceAction;

          if (action === "new-history") {
            activeModal = "new-history";
            render();
            return;
          }

          if (action === "print-prescription") {
            activeModal = "print";
            render();
            return;
          }

          if (action === "schedule-appointment") {
            activeModal = "schedule";
            render();
            return;
          }

          if (action === "send-prescription") {
            button.innerHTML = `${renderLucideIcon("check")}Receta enviada`;
            button.classList.add("success");
            return;
          }

          button.textContent = "Procesado";
          button.classList.add("success");
          setTimeout(() => {
            button.innerHTML = originalHtml;
            button.classList.remove("success");
          }, 900);
        });
      });

      adminContent.querySelectorAll("[data-hce-close-modal]").forEach((button) => {
        button.addEventListener("click", () => {
          activeModal = "";
          render();
        });
      });

      adminContent.querySelectorAll("[data-hce-confirm-modal]").forEach((button) => {
        button.addEventListener("click", () => {
          button.innerHTML = `${renderLucideIcon("check")}Confirmado`;
          button.classList.add("success");
          setTimeout(() => {
            activeModal = "";
            render();
          }, 700);
        });
      });

      const modalBackdrop = adminContent.querySelector("[data-hce-modal-backdrop]");
      if (modalBackdrop) {
        modalBackdrop.addEventListener("click", (event) => {
          if (event.target === modalBackdrop) {
            activeModal = "";
            render();
          }
        });
      }

      renderNav();
    }

    render();
  }

  function renderScreen(screenId) {
    const screen = getScreens().find((item) => item.id === screenId) || getScreens()[0];
    activeScreenId = screen.id;
    expandedGroups.add(screen.group.id);
    currentModule.textContent = `${screen.group.module} · ${screen.group.label}`;
    currentTitle.textContent = screen.title;

    if (screen.layout === "clinical-system") {
      renderClinicalSystem(screen);
      return;
    }

    adminContent.innerHTML = `
      <section class="screen-hero-card">
        <div>
          <span class="${screen.code ? "case-badge" : "tag"}">${screen.code ? `[${screen.code}]` : screen.useCase}</span>
          <h3>${screen.title}</h3>
          <p>${screen.objective}</p>
          ${screen.description ? `<p class="screen-description">${screen.description}</p>` : ""}
        </div>
        <div class="actor-card">
          <span>Actor principal</span>
          <strong>${screen.actor}</strong>
          ${screen.secondaryActors ? `<small>Tambien: ${screen.secondaryActors.join(", ")}</small>` : ""}
        </div>
      </section>
      ${
        screen.alert
          ? `<section class="clinical-alert"><strong>Alerta</strong><span>${screen.alert}</span></section>`
          : ""
      }
      <section class="admin-metrics">${renderMetricCards(screen.metrics)}</section>
      <section class="admin-workspace">
        <article class="admin-form-card">
          <div class="card-heading">
            <div><p class="eyebrow">Pantalla funcional</p><h3>Campos principales</h3></div>
            <button class="ghost-button" type="button" data-admin-action>${screen.actions ? screen.actions[0] : "Guardar"}</button>
          </div>
          <form class="admin-form">
            ${renderFields(screen.fields)}
            <label class="wide">Observaciones<textarea>${screen.finalState || "Vista de prueba. No se guardan datos reales porque no existe backend."}</textarea></label>
          </form>
          ${screen.actions ? `<div class="clinical-actions">${screen.actions.map((action) => `<button class="ghost-button" type="button" data-admin-action>${action}</button>`).join("")}</div>` : ""}
        </article>
        <aside class="admin-side-card">
          <p class="eyebrow">Control</p>
          <h3>Permisos y relaciones</h3>
          ${screen.permissions ? renderList(screen.permissions.slice(0, 4)) : renderList(screen.side || [])}
          ${screen.relations ? renderChips(screen.relations) : ""}
          <button class="button primary full" type="button" data-admin-action>Procesar vista</button>
        </aside>
      </section>
      ${
        screen.components
          ? `<section class="clinical-detail-grid">
              ${renderDetailBlock("Componentes de la pantalla", screen.components)}
              ${renderDetailBlock("Validaciones", screen.validations || [])}
              ${renderDetailBlock("Reglas de negocio", screen.rules || [])}
              ${renderDetailBlock("Auditoria", screen.audit || [])}
            </section>`
          : ""
      }
      ${
        screen.mainFlow
          ? `<section class="clinical-flow-grid">
              ${renderDetailBlock("Flujo principal", screen.mainFlow, "flow")}
              ${renderDetailBlock("Flujos alternativos", screen.alternateFlows || [], "flow")}
              <article class="clinical-detail final-state">
                <h4>Estado final esperado</h4>
                <p>${screen.finalState}</p>
                <h4>Recomendacion UX/UI</h4>
                <p>${screen.ux}</p>
              </article>
            </section>`
          : ""
      }
      ${screen.summarySections ? renderOverviewSections(screen.summarySections) : ""}
      <section class="admin-list-card">
        <div class="card-heading">
          <div><p class="eyebrow">Listado</p><h3>${screen.code === "HCE-REC" ? "Tabla resumen MVP" : "Registros"}</h3></div>
          <div class="table-actions">
            <button class="ghost-button" type="button" data-admin-action>Filtrar</button>
            <button class="ghost-button" type="button" data-admin-action>Exportar</button>
          </div>
        </div>
        ${app.renderTable(screen.table)}
      </section>
    `;

    adminContent.querySelectorAll("[data-admin-action]").forEach((button) => {
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

  function renderJwtDrawer() {
    const permissions = app.rolePermissions[activeRole] || app.rolePermissions.Administrador;
    adminJwt.textContent = app.createFakeJwt(activeRole, activeUser);
    adminPermissions.innerHTML = permissions.map((permission) => `<span class="permission">${permission}</span>`).join("");
  }

  function startSession() {
    activeRole = loginRole.value;
    activeUser = loginUser.value.trim() || "admin.clinica";
    topbarUser.textContent = activeUser;
    profileMenuUser.textContent = activeUser;
    profileMenuRole.textContent = activeRole;
    loginView.classList.add("hidden");
    shell.classList.remove("hidden");
    renderJwtDrawer();
    renderScreen(activeScreenId);
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    startSession();
  });

  logoutButton.addEventListener("click", () => {
    shell.classList.add("hidden");
    loginView.classList.remove("hidden");
    jwtDrawer.classList.remove("open");
    profileMenu.classList.add("hidden");
  });

  openJwt.addEventListener("click", () => {
    renderJwtDrawer();
    jwtDrawer.classList.add("open");
    profileMenu.classList.add("hidden");
  });

  closeJwt.addEventListener("click", () => jwtDrawer.classList.remove("open"));

  notificationButton.addEventListener("click", (event) => {
    event.stopPropagation();
    notificationMenu.classList.toggle("hidden");
    profileMenu.classList.add("hidden");
  });

  profileButton.addEventListener("click", (event) => {
    event.stopPropagation();
    profileMenu.classList.toggle("hidden");
    notificationMenu.classList.add("hidden");
  });

  profileMenu.querySelectorAll("[data-profile-action]").forEach((button) => {
    button.addEventListener("click", () => {
      button.textContent = "Vista abierta";
      setTimeout(() => {
        button.textContent = button.dataset.profileAction === "perfil" ? "Mi perfil" : "Preferencias";
      }, 900);
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".topbar-menu")) {
      notificationMenu.classList.add("hidden");
      profileMenu.classList.add("hidden");
    }
  });
}

initAdminPage();
