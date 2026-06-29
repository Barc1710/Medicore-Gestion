window.GestionApp = window.GestionApp || {};
window.GestionApp.adminGroups = window.GestionApp.adminGroups || [];

window.GestionApp.rolePermissions = {
  Administrador: [
    "usuarios:gestionar",
    "roles:gestionar",
    "citas:total",
    "historia:total",
    "farmacia:total",
    "caja:supervisar",
    "reportes:exportar",
  ],
  Médico: ["agenda:ver", "historia:editar", "receta:emitir", "ordenes:crear", "reportes:basico"],
  Enfermería: ["agenda:ver", "historia:triaje", "historia:signos", "historia:antecedentes", "reportes:basico"],
  Recepción: ["citas:total", "historia:buscar", "pacientes:ver", "constancias:emitir"],
  Farmacia: ["receta:dispensar", "inventario:editar", "kardex:ver", "stock:alertas"],
  Caja: ["pagos:registrar", "comprobantes:emitir", "arqueo:crear", "deudas:ver"],
  Gerencia: ["dashboard:ver", "reportes:ver", "reportes:exportar", "auditoria:ver"],
  "Auditor médico": ["historia:consultar", "receta:consultar", "auditoria:ver", "reportes:exportar"],
  Paciente: ["citas:propias", "historia:propia", "recetas:propias", "pagos:propios"],
};

window.GestionApp.registerAdminGroup = function registerAdminGroup(group) {
  window.GestionApp.adminGroups.push(group);
};

window.GestionApp.toBase64Url = function toBase64Url(value) {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");

  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
};

window.GestionApp.createFakeJwt = function createFakeJwt(role, user = "admin.clinica") {
  const now = new Date();
  const expires = new Date(now.getTime() + 2 * 60 * 60 * 1000);
  const permissions = window.GestionApp.rolePermissions[role] || window.GestionApp.rolePermissions.Administrador;
  const header = window.GestionApp.toBase64Url({ alg: "HS256", typ: "JWT" });
  const payload = window.GestionApp.toBase64Url({
    sub: role === "Paciente" ? "PAC-001" : "USR-001",
    name: user,
    role,
    permissions,
    iat: now.toISOString(),
    exp: expires.toISOString(),
    environment: "frontend",
  });

  return `${header}.${payload}.mcore_signature`;
};

window.GestionApp.renderTable = function renderTable(table) {
  return `
    <div class="admin-table-wrap">
      <table class="admin-table">
        <thead>
          <tr>${table.headers.map((header) => `<th>${header}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${table.rows
            .map(
              (row) => `
                <tr>
                  ${row.map((cell, index) => `<td>${index === row.length - 1 ? `<span class="pill">${cell}</span>` : cell}</td>`).join("")}
                </tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
};
