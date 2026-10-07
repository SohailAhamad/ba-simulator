// ============ TASK DATA ============
const TASKS = [
  {
    id: "t1_1", cat: "ops", catLabel: "Fab Operations", title: "WIP Tracking & Reporting",
    desc: "Monitor wafer lot movement across 500+ process steps in the fab",
    edge: "You built 15+ SSRS reports in CMF covering WIP tracking at Micron",
    activities: [
      "Gather requirements from fab ops managers on WIP visibility needs",
      "Define KPIs: WIP-by-step, WIP-by-product, WIP aging, bottleneck identification",
      "Write BRDs (Business Requirements Documents) for WIP dashboards",
      "Validate data from MES (e.g., CMF) against actual floor status",
      "UAT coordination with manufacturing engineers"
    ],
    kpis: ["WIP by step", "WIP by product", "WIP aging", "Bottleneck identification"],
    deliverables: ["BRD document", "WIP dashboard wireframe", "Data validation report", "UAT test cases"]
  },
  {
    id: "t1_2", cat: "ops", catLabel: "Fab Operations", title: "Cycle Time Analysis",
    desc: "Analyze wafer lot cycle times from start to finish (front-end fab through probe)",
    edge: null,
    activities: [
      "Define cycle time measurement points (queue time, process time, hold time)",
      "Document business rules for cycle time exclusions (engineering holds, equipment downs)",
      "Create user stories for cycle time trend dashboards",
      "Facilitate workshops between process engineers and IT to align on data definitions",
      "Benchmark against target cycle times and flag deviations"
    ],
    kpis: ["Average cycle time", "Cycle time vs target", "Queue time breakdown", "Hold time analysis"],
    deliverables: ["Cycle time waterfall charts", "Pareto analysis of delay contributors", "User stories and acceptance criteria"]
  },
  {
    id: "t1_3", cat: "ops", catLabel: "Fab Operations", title: "Lot Traceability & Genealogy",
    desc: "Trace wafer lots through all process steps, splits, and merges",
    edge: "Direct fab floor experience at Micron Malaysia + CMF entity mapping",
    activities: [
      "Map the lot lifecycle: creation, processing, split, merge, ship",
      "Define traceability requirements for quality investigations",
      "Document data lineage from MES lot history tables",
      "Write acceptance criteria for lot genealogy search tools"
    ],
    kpis: ["Lot trace accuracy", "Time to trace", "Split/merge tracking completeness"],
    deliverables: ["Lot lifecycle process flow diagram", "Data lineage documentation", "Acceptance criteria document"]
  },
  {
    id: "t2_1", cat: "equip", catLabel: "Equipment Analytics", title: "Equipment Utilization (OEE)",
    desc: "Track Overall Equipment Effectiveness across fab tools",
    edge: null,
    activities: [
      "Define OEE components: Availability x Performance x Quality",
      "Gather requirements for equipment state tracking (productive, standby, down, PM)",
      "Document business rules for utilization calculations",
      "Write specs for real-time equipment status dashboards",
      "Facilitate alignment between equipment engineering and MES teams"
    ],
    kpis: ["OEE %", "Tool availability %", "MTBF", "MTTR"],
    deliverables: ["OEE calculation spec", "Equipment state definitions", "Dashboard wireframe"]
  },
  {
    id: "t2_2", cat: "equip", catLabel: "Equipment Analytics", title: "PM Scheduling Analytics",
    desc: "Analyze preventive maintenance compliance and its impact on tool availability",
    edge: null,
    activities: [
      "Document PM scheduling rules and frequency requirements",
      "Define reporting needs: PM compliance rate, overdue PMs, PM duration trends",
      "Gather requirements for PM impact analysis",
      "Create user stories for PM calendar/scheduling dashboards"
    ],
    kpis: ["PM compliance rate", "Overdue PM count", "PM duration vs target", "Defect rate correlation"],
    deliverables: ["PM scheduling rules document", "User stories for PM dashboard", "Impact analysis report"]
  },
  {
    id: "t2_3", cat: "equip", catLabel: "Equipment Analytics", title: "Spare Parts & Consumables",
    desc: "Track equipment spare part usage, consumption rates, and inventory",
    edge: null,
    activities: [
      "Requirements gathering for spare parts consumption dashboards",
      "Define reorder point calculations and lead time analysis",
      "Map data flows between MES, ERP (SAP), and warehouse management",
      "Document integration requirements for automated reorder alerts"
    ],
    kpis: ["Parts consumption rate", "Inventory days of supply", "Reorder accuracy", "Lead time"],
    deliverables: ["Data flow diagram", "Reorder calculation spec", "Integration requirements doc"]
  },
  {
    id: "t3_1", cat: "quality", catLabel: "Quality & Yield", title: "Yield Analysis & Excursions",
    desc: "Track wafer yield and investigate yield excursions",
    edge: null,
    activities: [
      "Define yield calculation methodologies (probe yield, bin yield, stacked yield)",
      "Document excursion detection rules (SPC limits)",
      "Write requirements for yield trend dashboards with drill-down",
      "Facilitate cross-functional excursion review meetings",
      "Create workflow specs for excursion investigation and containment"
    ],
    kpis: ["Probe yield %", "Bin distribution", "Yield loss Pareto", "Excursion frequency"],
    deliverables: ["Yield calculation spec", "Excursion workflow document", "Dashboard requirements"]
  },
  {
    id: "t3_2", cat: "quality", catLabel: "Quality & Yield", title: "SPC Requirements",
    desc: "Define SPC charting and out-of-control action plans (OCAP)",
    edge: null,
    activities: [
      "Gather requirements from process engineers on critical parameters",
      "Document control limit calculation rules (Western Electric, Nelson rules)",
      "Write specs for SPC chart dashboards with automated alerting",
      "Define OCAP workflows"
    ],
    kpis: ["Cp/Cpk indices", "Out-of-control frequency", "OCAP response time"],
    deliverables: ["SPC parameter list", "Control limit rules spec", "OCAP workflow document"]
  },
  {
    id: "t3_3", cat: "quality", catLabel: "Quality & Yield", title: "Customer Returns (RMA)",
    desc: "Track complaints, returns, and failure analysis results",
    edge: null,
    activities: [
      "Define RMA tracking workflow and data requirements",
      "Document failure analysis (FA) reporting needs",
      "Create requirements for customer quality scorecards",
      "Map traceability from complaint back to fab lot, tool, and process step"
    ],
    kpis: ["RMA rate", "FA turnaround time", "Customer DPPM", "Repeat failure rate"],
    deliverables: ["RMA workflow spec", "Customer scorecard wireframe", "Traceability mapping doc"]
  },
  {
    id: "t4_1", cat: "supply", catLabel: "Supply Chain", title: "Raw Material Supply Tracking",
    desc: "Monitor silicon wafer supply, chemicals, gases, and target materials",
    edge: "You built 5+ procurement dashboards at Micron",
    activities: [
      "Document supply chain data flows (supplier to receiving to inventory to fab)",
      "Define KPIs: on-time delivery, supplier quality, inventory days of supply",
      "Write requirements for supplier performance scorecards",
      "Facilitate alignment between procurement and fab planning on safety stock"
    ],
    kpis: ["On-time delivery %", "Supplier quality score", "Days of supply", "Safety stock level"],
    deliverables: ["Supply chain data flow diagram", "Supplier scorecard spec", "KPI definitions"]
  },
  {
    id: "t4_2", cat: "supply", catLabel: "Supply Chain", title: "Capital Equipment Procurement",
    desc: "Track procurement, delivery, and qualification of new fab tools ($5M-$50M each)",
    edge: "You built installation & warranty analytics for Applied Materials",
    activities: [
      "Define equipment lifecycle: PO, manufacture, ship, install, qualify, production",
      "Document milestone tracking requirements",
      "Write specs for equipment installation timeline dashboards",
      "Gather requirements for warranty tracking post-installation"
    ],
    kpis: ["Install cycle time", "Qual completion rate", "Warranty cost trend", "On-time delivery"],
    deliverables: ["Equipment lifecycle spec", "Milestone tracking wireframe", "Warranty dashboard requirements"]
  },
  {
    id: "t4_3", cat: "supply", catLabel: "Supply Chain", title: "BOM & Engineering Changes",
    desc: "Track product BOMs and engineering changes (ECR/ECN/CR/CN)",
    edge: "BOM analytics and CR/CN lifecycle dashboards at Micron with Teamcenter PLM",
    activities: [
      "Map BOM hierarchies: Bill of Information, Bill of Process, Bill of Equipment",
      "Document CR/CN lifecycle workflow (create, review, approve, implement)",
      "Define reporting needs: open CRs by age, approval cycle time, implementation status",
      "Write requirements for BOM comparison tools (revision A vs B)"
    ],
    kpis: ["CR approval cycle time", "Open CR aging", "BOM accuracy", "Change implementation rate"],
    deliverables: ["BOM hierarchy documentation", "CR/CN workflow spec", "BOM comparison tool requirements"]
  },
  {
    id: "t5_1", cat: "planning", catLabel: "Planning & Capacity", title: "Capacity Planning",
    desc: "Align fab capacity (wafer starts per week) with demand forecast",
    edge: null,
    activities: [
      "Document capacity model inputs: tool count, process times, maintenance windows",
      "Define reporting requirements: capacity utilization %, bottleneck tools, what-if scenarios",
      "Gather requirements from planning team for demand vs. capacity gap analysis",
      "Write specs for capacity simulation dashboards"
    ],
    kpis: ["Capacity utilization %", "Bottleneck tool list", "Demand-capacity gap", "What-if outcomes"],
    deliverables: ["Capacity model documentation", "Gap analysis report", "Simulation dashboard wireframe"]
  },
  {
    id: "t5_2", cat: "planning", catLabel: "Planning & Capacity", title: "Wafer Start Planning",
    desc: "Determine optimal wafer start quantities by product and priority",
    edge: null,
    activities: [
      "Document business rules for wafer start prioritization",
      "Define KPIs: wafer starts vs. plan, product mix adherence, hot lot percentage",
      "Create requirements for daily/weekly wafer start tracking dashboards",
      "Facilitate planning meetings between sales, operations, and fab management"
    ],
    kpis: ["Wafer starts vs plan", "Product mix adherence", "Hot lot %", "Plan accuracy"],
    deliverables: ["Prioritization rules document", "Wafer start dashboard wireframe", "Meeting cadence plan"]
  },
  {
    id: "t6_1", cat: "mes", catLabel: "MES & IT Systems", title: "MES Enhancement Requirements",
    desc: "Define new features or improvements for the Manufacturing Execution System",
    edge: "You independently mapped CMF entity relationships at Micron",
    activities: [
      "Conduct stakeholder interviews to identify MES pain points",
      "Write detailed functional specs for MES enhancements",
      "Create process flow diagrams (as-is and to-be)",
      "Define data model changes in MES entities (Material, Resource, Process)",
      "Coordinate UAT and go-live with fab operations"
    ],
    kpis: ["Enhancement delivery rate", "Stakeholder satisfaction", "UAT pass rate"],
    deliverables: ["Stakeholder interview notes", "Functional spec", "Process flow diagrams", "UAT plan"]
  },
  {
    id: "t6_2", cat: "mes", catLabel: "MES & IT Systems", title: "Data Migration & Integration",
    desc: "Define requirements for migrating data between systems or integrating new data sources",
    edge: null,
    activities: [
      "Document source-to-target data mapping",
      "Define data validation rules and reconciliation procedures",
      "Write integration specs (API, ETL, real-time vs. batch)",
      "Coordinate migration testing and cutover planning"
    ],
    kpis: ["Data match rate", "Migration defect count", "Cutover downtime"],
    deliverables: ["Data mapping document", "Validation rules spec", "Migration test plan", "Cutover checklist"]
  },
  {
    id: "t7_1", cat: "reporting", catLabel: "Reporting", title: "Executive KPI Dashboards",
    desc: "Define and deliver C-level dashboards for fab performance",
    edge: "You implemented RLS and Power BI Service deployment for role-based access",
    activities: [
      "Gather requirements from VP/Director level stakeholders",
      "Define executive KPIs: wafer outs, yield, OEE, cycle time, cost per wafer",
      "Write specs for drill-down from executive summary to operational detail",
      "Define refresh frequency, data latency, and security (RLS)",
      "Conduct executive dashboard review and sign-off"
    ],
    kpis: ["Wafer outs", "Yield", "OEE", "Cycle time", "Cost per wafer"],
    deliverables: ["Executive KPI definitions", "Dashboard wireframe", "RLS design", "Sign-off document"]
  },
  {
    id: "t7_2", cat: "reporting", catLabel: "Reporting", title: "Self-Service Analytics",
    desc: "Enable engineers and managers to build their own reports",
    edge: null,
    activities: [
      "Define data model requirements for self-service (semantic layer, curated datasets)",
      "Document training needs and create user guides",
      "Define governance rules for self-service content",
      "Write requirements for data catalog / data dictionary tools"
    ],
    kpis: ["Self-service adoption rate", "Report creation time", "Data freshness"],
    deliverables: ["Semantic layer design", "Training materials", "Governance policy doc", "Data catalog requirements"]
  },
  {
    id: "t7_3", cat: "reporting", catLabel: "Reporting", title: "Report Migration",
    desc: "Consolidate redundant reports and migrate legacy platforms",
    edge: "You led the SSRS to Grafana migration at Micron (15+ dashboards)",
    activities: [
      "Inventory all existing reports across platforms",
      "Identify redundant/unused reports for retirement",
      "Define migration priority and approach (lift-and-shift vs reimagine)",
      "Write migration specs with feature parity validation criteria"
    ],
    kpis: ["Reports migrated", "Reports retired", "Feature parity %", "User adoption post-migration"],
    deliverables: ["Report inventory spreadsheet", "Migration priority matrix", "Feature parity checklist"]
  }
];

const SCENARIOS = [
  {
    num: 1, title: "Yield Excursion Investigation",
    situation: "Probe yield for Product X dropped from 92% to 78% over the last 3 days. The fab manager needs an urgent investigation.",
    task: "Document the investigation workflow, identify what data you'd pull, which stakeholders you'd involve, and what dashboards/reports you'd create to support the investigation.",
    hints: ["Check yield by tool, step, and lot", "Pull SPC data for recent out-of-control events", "Involve process, equipment, and quality engineers", "Create a yield waterfall to isolate the step causing loss"]
  },
  {
    num: 2, title: "Fab Health Dashboard",
    situation: "The VP of Operations wants a single real-time 'Fab Health' dashboard showing WIP, yield, equipment status, and cycle time - displayed on a large monitor on the fab floor.",
    task: "Write a BRD including stakeholder list, KPIs, data sources, refresh requirements, access control, and wireframe mockup.",
    hints: ["Consider fab floor display constraints (distance, lighting)", "Refresh rate: near-real-time for WIP/equipment, hourly for yield", "Use traffic light indicators for quick scanning", "Define data sources: MES for WIP, probe data for yield, equipment states from MES"]
  },
  {
    num: 3, title: "MES Migration (Promis to CMF)",
    situation: "The fab is migrating from legacy Promis MES to CMF (Critical Manufacturing Framework). You are the BA on the reporting workstream.",
    task: "Create a report inventory, define migration criteria, write gap analysis, and plan UAT.",
    hints: ["Inventory all existing Promis reports by category and usage", "Identify reports to retire vs migrate vs rebuild", "Map Promis data entities to CMF equivalents", "Define UAT criteria: data accuracy, performance, user acceptance"]
  },
  {
    num: 4, title: "Procurement Analytics Enhancement",
    situation: "Procurement wants better visibility into semiconductor equipment spare parts spend by tool type, vendor, and commodity category.",
    task: "Gather requirements, design the data model, define KPIs, and write user stories for a Power BI dashboard.",
    hints: ["Interview procurement leads and equipment engineers", "Data model: fact table (PO line items) + dimensions (tool, vendor, commodity, time)", "KPIs: spend by category, vendor concentration, price trends, lead time", "Consider drill-down from category to vendor to individual POs"]
  },
  {
    num: 5, title: "Cross-Fab Benchmarking",
    situation: "Management wants to compare KPIs across 3 fabs (USA, Japan, Singapore) to identify best practices and improvement opportunities.",
    task: "Define standardized KPI definitions, document data harmonization challenges, and write specs for a cross-fab comparison dashboard.",
    hints: ["Challenge: different MES systems, different naming conventions", "Standardize: common product groupings, consistent time zones, aligned shift definitions", "KPIs: yield, OEE, cycle time, cost per wafer - same formula across fabs", "Consider cultural factors in data collection and reporting practices"]
  }
];

const CHECKLIST = [
  "Wafer fabrication flow (deposition, lithography, etch, CMP, implant)",
  "Back-End flow (probe, assembly/packaging, final test)",
  "Lot lifecycle and split/merge mechanics",
  "DRAM vs. NAND Flash manufacturing differences",
  "Equipment qualification and re-qualification",
  "SPC fundamentals (control charts, Cp/Cpk)",
  "Yield loss categories (systematic, random, parametric)",
  "Excursion detection and containment process",
  "Engineering change process (ECR to ECN to implementation)",
  "BOM types: BoI (Bill of Information), BoP (Bill of Process), BoE (Bill of Equipment)",
  "Fab capacity concepts (bottleneck tools, utilization)",
  "Clean room protocols and contamination control",
  "Semiconductor supply chain ecosystem"
];

const KPIS = [
  { name: "Wafer Outs", desc: "Wafers completing fab per week", target: "Per product plan" },
  { name: "Probe Yield", desc: "% good die at wafer probe", target: ">90% (mature)" },
  { name: "OEE", desc: "Overall Equipment Effectiveness", target: ">80%" },
  { name: "Cycle Time", desc: "Days from wafer start to probe", target: "Product-dependent" },
  { name: "WIP Turns", desc: "How fast WIP moves through fab", target: "Higher = better" },
  { name: "MTBF", desc: "Mean Time Between Failures", target: "Tool-dependent" },
  { name: "MTTR", desc: "Mean Time To Repair", target: "<4 hours" },
  { name: "Scrap Rate", desc: "% wafers scrapped", target: "<1%" },
  { name: "On-Time Delivery", desc: "% orders shipped on time", target: ">95%" },
  { name: "Cost per Wafer", desc: "Total fab cost / wafers out", target: "Continuous reduction" }
];

// ============ STATE MANAGEMENT ============
const STATE_KEY = "ba_sim_state";

function loadState() {
  try {
    const s = localStorage.getItem(STATE_KEY);
    return s ? JSON.parse(s) : { taskStatus: {}, taskNotes: {}, checklist: {}, scenarioNotes: {} };
  } catch(e) { return { taskStatus: {}, taskNotes: {}, checklist: {}, scenarioNotes: {} }; }
}

function saveState(state) {
  try { localStorage.setItem(STATE_KEY, JSON.stringify(state)); } catch(e) {}
}

let state = loadState();

// ============ RENDERING ============
function getStats() {
  const total = TASKS.length;
  const completed = Object.values(state.taskStatus).filter(s => s === "completed").length;
  const inProgress = Object.values(state.taskStatus).filter(s => s === "in-progress").length;
  const checkDone = Object.values(state.checklist).filter(Boolean).length;
  return { total, completed, inProgress, notStarted: total - completed - inProgress, checkDone, checkTotal: CHECKLIST.length };
}

function updateHeader() {
  const s = getStats();
  document.getElementById("stat-total").textContent = s.total;
  document.getElementById("stat-done").textContent = s.completed;
  document.getElementById("stat-prog").textContent = s.inProgress;
  document.getElementById("stat-check").textContent = s.checkDone + "/" + s.checkTotal;
}

function renderTasks(filter) {
  const grid = document.getElementById("tasks-grid");
  let filtered = TASKS;
  if (filter && filter !== "all") filtered = TASKS.filter(t => t.cat === filter);
  const search = document.getElementById("task-search")?.value?.toLowerCase() || "";
  if (search) filtered = filtered.filter(t => t.title.toLowerCase().includes(search) || t.desc.toLowerCase().includes(search) || t.catLabel.toLowerCase().includes(search));

  grid.innerHTML = filtered.map(t => {
    const status = state.taskStatus[t.id] || "not-started";
    const statusLabel = status === "not-started" ? "Not Started" : status === "in-progress" ? "In Progress" : "Completed";
    return `<div class="card" onclick="openTask('${t.id}')">
      <span class="card-cat ${t.cat}">${t.catLabel}</span>
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
      ${t.edge ? `<div class="card-edge">&#9733; ${t.edge}</div>` : ""}
      <div class="card-footer">
        <span class="card-status status-${status}">${statusLabel}</span>
      </div>
    </div>`;
  }).join("");
}

function openTask(id) {
  const t = TASKS.find(x => x.id === id);
  if (!t) return;
  const status = state.taskStatus[id] || "not-started";
  const notes = state.taskNotes[id] || "";
  const m = document.getElementById("task-modal");

  m.querySelector(".modal-body").innerHTML = `
    <span class="card-cat ${t.cat}">${t.catLabel}</span>
    <h2>${t.title}</h2>
    <p style="color:var(--text-muted);margin-bottom:16px;">${t.desc}</p>
    ${t.edge ? `<div class="card-edge" style="margin-bottom:16px;">&#9733; ${t.edge}</div>` : ""}
    <h4>BA Activities</h4>
    <ul>${t.activities.map(a => `<li>${a}</li>`).join("")}</ul>
    <h4>KPIs to Track</h4>
    <ul>${t.kpis.map(k => `<li>${k}</li>`).join("")}</ul>
    <h4>Expected Deliverables</h4>
    <ul>${t.deliverables.map(d => `<li>${d}</li>`).join("")}</ul>
    <h4>Your Notes / Work</h4>
    <textarea class="notes-area" id="modal-notes" placeholder="Write your notes, approach, or deliverable drafts here...">${notes}</textarea>
    <div class="modal-actions">
      <button class="btn ${status === 'in-progress' ? 'btn-primary' : 'btn-outline'}" onclick="setStatus('${id}','in-progress')">&#9998; Mark In Progress</button>
      <button class="btn ${status === 'completed' ? 'btn-success' : 'btn-outline'}" onclick="setStatus('${id}','completed')">&#10003; Mark Completed</button>
      <button class="btn btn-outline" onclick="setStatus('${id}','not-started')">&#8634; Reset</button>
      <button class="btn btn-outline" onclick="saveNotes('${id}')">&#128190; Save Notes</button>
    </div>
  `;
  m.classList.add("active");
}

function closeModal() {
  document.getElementById("task-modal").classList.remove("active");
}

function setStatus(id, status) {
  state.taskStatus[id] = status;
  saveState(state);
  updateHeader();
  renderTasks(currentFilter);
  openTask(id);
}

function saveNotes(id) {
  const notes = document.getElementById("modal-notes").value;
  state.taskNotes[id] = notes;
  saveState(state);
  const btn = event.target;
  btn.textContent = "\u2713 Saved!";
  setTimeout(() => { btn.innerHTML = "&#128190; Save Notes"; }, 1500);
}

// ============ SCENARIOS ============
function renderScenarios() {
  const c = document.getElementById("scenarios-list");
  c.innerHTML = SCENARIOS.map(s => {
    const notes = state.scenarioNotes[s.num] || "";
    return `<div class="scenario-card">
      <span class="scenario-num">${s.num}</span>
      <h3>${s.title}</h3>
      <div class="scenario-sit"><strong>Situation:</strong> ${s.situation}</div>
      <p class="scenario-task"><strong>Your Task:</strong> ${s.task}</p>
      <details style="margin-top:12px;">
        <summary style="cursor:pointer;color:var(--accent);font-size:0.85rem;">Show Hints</summary>
        <ul style="margin-top:8px;">${s.hints.map(h => `<li style="color:var(--text-muted);font-size:0.85rem;">${h}</li>`).join("")}</ul>
      </details>
      <h4 style="color:var(--accent);margin-top:14px;font-size:0.9rem;">Your Response</h4>
      <textarea class="notes-area" id="scenario-notes-${s.num}" placeholder="Write your solution here...">${notes}</textarea>
      <button class="btn btn-primary" style="margin-top:8px;" onclick="saveScenarioNotes(${s.num})">&#128190; Save Response</button>
    </div>`;
  }).join("");
}

function saveScenarioNotes(num) {
  state.scenarioNotes[num] = document.getElementById("scenario-notes-" + num).value;
  saveState(state);
}

// ============ CHECKLIST ============
function renderChecklist() {
  const c = document.getElementById("checklist-list");
  const done = Object.values(state.checklist).filter(Boolean).length;
  document.getElementById("check-progress-fill").style.width = (done / CHECKLIST.length * 100) + "%";
  document.getElementById("check-progress-text").textContent = done + " / " + CHECKLIST.length + " completed";

  c.innerHTML = CHECKLIST.map((item, i) => {
    const checked = state.checklist[i] ? "checked" : "";
    return `<div class="checklist-item ${checked}" onclick="toggleCheck(${i})">
      <div class="cl-box">${state.checklist[i] ? "&#10003;" : ""}</div>
      <span class="cl-text">${item}</span>
    </div>`;
  }).join("");
}

function toggleCheck(i) {
  state.checklist[i] = !state.checklist[i];
  saveState(state);
  renderChecklist();
  updateHeader();
}

// ============ KPI TABLE ============
function renderKPIs() {
  document.getElementById("kpi-tbody").innerHTML = KPIS.map(k =>
    `<tr><td style="font-weight:600;color:var(--text-heading);">${k.name}</td><td>${k.desc}</td><td style="color:var(--accent);font-weight:600;">${k.target}</td></tr>`
  ).join("");
}

// ============ TABS ============
let currentFilter = "all";

function switchTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));
  document.getElementById("tab-" + tabId).classList.add("active");
  document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");

  if (tabId === "tasks") renderTasks(currentFilter);
  if (tabId === "scenarios") renderScenarios();
  if (tabId === "checklist") renderChecklist();
  if (tabId === "kpis") renderKPIs();
  if (tabId === "routines") {}
}

function filterTasks(cat) {
  currentFilter = cat;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  event.target.classList.add("active");
  renderTasks(cat);
}

function exportData() {
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "ba-simulation-progress.json";
  a.click();
}

function importData(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      state = JSON.parse(e.target.result);
      saveState(state);
      updateHeader(); renderTasks(currentFilter); renderChecklist();
      alert("Progress imported successfully!");
    } catch(err) { alert("Invalid file format"); }
  };
  reader.readAsText(file);
}

// ============ INIT ============
document.addEventListener("DOMContentLoaded", function() {
  updateHeader();
  renderTasks("all");

  document.getElementById("task-search").addEventListener("input", () => renderTasks(currentFilter));
  document.getElementById("task-modal").addEventListener("click", function(e) {
    if (e.target === this) closeModal();
  });
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") closeModal();
  });
});
