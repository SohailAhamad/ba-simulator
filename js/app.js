// ============ TASK DATA WITH GUIDES ============
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
    deliverables: ["BRD document", "WIP dashboard wireframe", "Data validation report", "UAT test cases"],
    // NEW: Step-by-step guide
    guide: {
      steps: [
        "Identify stakeholders: Fab shift managers, production planners, area supervisors",
        "Schedule 30-min interviews with each stakeholder group to understand their WIP visibility pain points",
        "Document current-state process: How do they check WIP today? (whiteboard, Excel, legacy reports?)",
        "Define data sources: CMF LotLocHistory, LotStatus, ProcessFlow tables",
        "Create mockups: Sketch dashboard layout showing WIP by area, by product, aging buckets",
        "Write SQL to validate: SELECT Area, COUNT(*) as WIP_Count FROM LotStatus WHERE Status='Active' GROUP BY Area",
        "Present findings to stakeholders and iterate on requirements",
        "Document acceptance criteria: Report must refresh every 15 min, show lots >24h hold in red"
      ],
      tools: ["CMF MES (Lot Locator, WIP Explorer)", "SQL Server Management Studio", "SSRS or Power BI", "Visio/Draw.io for process flows", "Jira/Confluence for documentation"],
      techniques: [
        "Stakeholder mapping: RACI matrix to identify who needs what",
        "5 Whys: Dig into why current WIP visibility is insufficient",
        "Data profiling: Check for NULL values, duplicates, stale records before trusting the data",
        "MoSCoW prioritization: Must-have vs Should-have vs Could-have features"
      ],
      sampleOutput: "BRD Section Example:\n\n1.1 WIP Dashboard Requirements\n\n**Business Need:** Fab managers need real-time WIP visibility to identify bottlenecks and balance load across areas.\n\n**Scope:** Front-end fab Areas: Photo, Etch, Thin Films, Diffusion, CMP\n\n**Data Sources:** CMF tables: Lot_Current_Location, Process_Flow_Master, Product_Code_Map\n\n**Report Frequency:** Auto-refresh every 15 minutes\n\n**Filters:** Area, Product Family, Lot Hold Status, Time in Step\n\n**Acceptance Criteria:**\n- AC1: Display WIP count by area and process step\n- AC2: Highlight lots held >24 hours in yellow, >48 hours in red\n- AC3: Drill-down to individual lot details (lot ID, product, current recipe)",
      pitfalls: [
        "Don't assume MES data is clean — always validate with floor spot checks",
        "Avoid scope creep: Stick to defined KPIs, add enhancements to backlog",
        "Don't skip UAT — fab users will find edge cases you missed"
      ]
    }
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
    deliverables: ["Cycle time waterfall charts", "Pareto analysis of delay contributors", "User stories and acceptance criteria"],
    guide: {
      steps: [
        "Define cycle time: Start = Lot release to fab, End = Lot ship to probe/assembly",
        "Break down components: Queue Time + Process Time + Hold Time + Transport Time",
        "Identify exclusions: Engineering holds, scheduled PMs, facility shutdowns",
        "Query MES for lot timestamps: Lot_Start, Step_In, Step_Out, Lot_Ship",
        "Calculate cycle time per lot: CT = Ship_Date - Start_Date (in hours)",
        "Create histogram to see distribution — identify outliers (lots with abnormally high CT)",
        "Drill into top 10 outliers: What caused the delay? (Equipment down? Priority change?)",
        "Build Pareto chart: Top 5 causes account for 80% of CT variance",
        "Present to management with recommendations: Reduce queue time in Photo area by 20%"
      ],
      tools: ["CMF Cycle Time Reporter", "SQL for timestamp calculations", "Excel/Power BI for Pareto charts", "JMP or Minitab for statistical analysis"],
      techniques: [
        "Waterfall analysis: Show time spent in each process module",
        "Pareto principle: Focus on the vital few causes of delay",
        "Box plots: Visualize cycle time distribution and outliers",
        "Control charts: Monitor CT trend over time, detect shifts"
      ],
      sampleOutput: "Cycle Time Report Template:\n\n**Lot ID:** ABC12345\n**Product:** DDR5-8Gb\n**Start Date:** 2026-09-01\n**Ship Date:** 2026-09-22\n**Total Cycle Time:** 21 days (Target: 18 days)\n\n**Breakdown:**\n- Queue Time: 5.2 days (25%)\n- Process Time: 12.8 days (61%)\n- Hold Time: 2.5 days (12%)\n- Transport Time: 0.5 days (2%)\n\n**Delay Causes:**\n1. Etch Tool PM (8 hours)\n2. Photo Re-work (6 hours)\n3. Wait for mask change (4 hours)",
      pitfalls: [
        "Don't compare apples to oranges: Different products have different target CTs",
        "Avoid cherry-picking data: Include ALL lots in the analysis period",
        "Don't ignore seasonality: CT may spike during holiday periods or turnarounds"
      ]
    }
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
    deliverables: ["Lot lifecycle process flow diagram", "Data lineage documentation", "Acceptance criteria document"],
    guide: {
      steps: [
        "Understand lot types: Parent lot, Child lot (after split), Merged lot",
        "Identify traceability use cases: Quality investigations, Customer complaints, Audit trails",
        "Map data sources: CMF LotHistory, LotSplitMerge, WaferGenealogy tables",
        "Create traceability diagram: Lot creation → Process steps → Split point → Merge → Ship",
        "Define search requirements: Input lot ID, output = full genealogy tree with timestamps",
        "Write user story: 'As a QA engineer, I want to trace all child lots from a parent lot within 5 minutes'",
        "Test with real data: Take a known split lot and verify the genealogy shows correct parent-child relationship"
      ],
      tools: ["CMF Lot Genealogy Explorer", "SQL recursive CTEs for tree traversal", "Visio for genealogy diagrams", "Confluence for documentation"],
      techniques: [
        "Parent-child tree queries: Use CTEs to traverse lot relationships",
        "Backward tracing: Start from finished lot, trace to raw wafers",
        "Forward tracing: Start from raw material, trace to all finished products",
        "Impact analysis: If this lot had a defect, which other lots are affected?"
      ],
      sampleOutput: "Lot Genealogy Query Result:\n\n**Root Lot:** LOT-2026-001234 (25 wafers)\n├─ Processed through Photo, Etch, Thin Films\n├─ Split at Step 150 (Inspection)\n│  ├─ Child Lot A: LOT-2026-001234-A (12 wafers)\n│  │  └─ Shipped to Probe: 2026-09-15\n│  └─ Child Lot B: LOT-2026-001234-B (13 wafers)\n│     └─ Merged with LOT-2026-001235\n│        └─ Final Lot: LOT-2026-001234-M (26 wafers)\n│           └─ Shipped to Probe: 2026-09-18",
      pitfalls: [
        "Don't assume 1 lot = 1 lot forever; splits and merges are common",
        "Avoid hardcoding lot naming conventions; they change over time",
        "Don't skip edge cases: What if lot was scrapped? Reclaimed?"
      ]
    }
  },
  {
    id: "t2_1", cat: "equip", catLabel: "Equipment Analytics", title: "Equipment Utilization (OEE)",
    desc: "Track Overall Equipment Effectiveness across fab tools",
    edge: null,
    activities: [
      "Define OEE components: Availability x Performance x Quality",
      "Gather requirements for equipment state tracking (productive, standby, down, PM)",
      "Analyze downtime root causes with Pareto analysis",
      "Create OEE dashboards for equipment engineers",
      "Validate OEE calculations against manual logs"
    ],
    kpis: ["OEE %", "Availability %", "Performance %", "Quality %", "MTBF", "MTTR"],
    deliverables: ["OEE definition document", "Downtime Pareto analysis", "OEE dashboard", "Data validation report"],
    guide: {
      steps: [
        "Understand OEE formula: Availability × Performance × Quality",
        "Define Availability: (Total Time - Downtime) / Total Time",
        "Define Performance: (Ideal Cycle Time × Total Units) / Operating Time",
        "Define Quality: Good Units / Total Units Produced",
        "Identify data sources: CMF EquipmentStateLog, E10 events, Downtime reason codes",
        "Calculate OEE for a sample tool over 1 week",
        "Compare to industry benchmarks: World-class OEE = 85%+",
        "Identify top downtime causes and create Pareto chart",
        "Present to equipment team with improvement recommendations"
      ],
      tools: ["CMF Equipment Dashboard", "E10 standard event logs", "Excel for OEE calculation", "Power BI for trending", "Pareto analysis template"],
      techniques: [
        "Time motion study: Observe tool states in real-time to validate MES data",
        "Six Big Losses: Breakdowns, Setup/Adjustment, Idling/Minor Stops, Reduced Speed, Process Defects, Reduced Yield",
        "MTBF/MTTR: Mean Time Between Failures, Mean Time To Repair",
        "SMED: Single Minute Exchange of Dies for setup reduction"
      ],
      sampleOutput: "OEE Report - Etch Tool ET-001:\n\n**Week of 2026-09-15**\n\n| Metric | Value | Target | Status |\n|--------|-------|--------|--------|\n| Availability | 87% | 90% | ⚠️ Below |\n| Performance | 92% | 95% | ⚠️ Below |\n| Quality | 98% | 99% | ✅ OK |\n| **OEE** | **78%** | **85%** | ⚠️ Below |\n\n**Top Downtime Causes:**\n1. Chamber clean (12 hrs)\n2. RF generator fault (8 hrs)\n3. Wafer jam (4 hrs)\n\n**Recommendation:** Extend chamber clean interval from 50 to 75 lots (requires process approval)",
      pitfalls: [
        "Don't mix scheduled PM with unplanned downtime in OEE calc",
        "Avoid comparing OEE across different tool types without context",
        "Don't chase OEE at the expense of quality"
      ]
    }
  },
  {
    id: "t2_2", cat: "equip", catLabel: "Equipment Analytics", title: "Predictive Maintenance Analytics",
    desc: "Use sensor data and event logs to predict equipment failures before they occur",
    edge: null,
    activities: [
      "Identify critical equipment for predictive maintenance pilot",
      "Document available sensor data (temperature, pressure, RF power, etc.)",
      "Work with data scientists to define prediction models",
      "Create user stories for predictive maintenance alerts",
      "Validate predictions against actual failure events"
    ],
    kpis: ["Predicted failures caught", "False positive rate", "Time saved vs reactive maintenance", "Cost avoidance"],
    deliverables: ["Predictive maintenance roadmap", "Feature specification for ML models", "Alert dashboard mockup", "Validation report"],
    guide: {
      steps: [
        "Identify pilot tool: High downtime impact, good sensor data availability",
        "Inventory data sources: Equipment sensors, E10 logs, PM history, Part replacement logs",
        "Define failure modes: What breaks? (Pump, RF generator, Robot, Chamber)",
        "Work with data team to extract historical data: 2+ years of sensor readings + failure events",
        "Define features for ML model: Temperature trend, Pressure variance, Run hours since last PM",
        "Set up pilot: Run predictions in shadow mode for 1 month",
        "Validate: How many actual failures were predicted? How many false alarms?",
        "Tune threshold: Balance between catching failures and avoiding alarm fatigue",
        "Roll out: Create alert dashboard and integrate with maintenance work order system"
      ],
      tools: ["Equipment sensor historians (OSIsoft PI, Wonderware)", "Python/R for ML models", "Grafana for alert dashboards", "CMF for maintenance work orders", "Jupyter notebooks for analysis"],
      techniques: [
        "Time-series analysis: Look for patterns before failures",
        "Anomaly detection: Flag readings outside normal range",
        "Supervised learning: Train on historical failure data",
        "Feature engineering: Create meaningful predictors from raw sensor data"
      ],
      sampleOutput: "Predictive Maintenance Alert:\n\n**Tool:** Etch Tool ET-003\n**Alert Type:** RF Generator Degradation\n**Confidence:** 87%\n**Predicted Failure Window:** 48-72 hours\n\n**Supporting Data:**\n- RF power variance increased 15% over last 50 runs\n- Chamber pressure instability during plasma ignition\n- 2,340 runs since last RF generator replacement (avg lifespan: 2,500 runs)\n\n**Recommended Action:** Schedule RF generator replacement during next planned downtime window.\n\n**Business Impact:** Avoiding unplanned downtime saves estimated $50K in lost production.",
      pitfalls: [
        "Don't overfit the model to historical data; it won't generalize",
        "Avoid alarm fatigue: Too many false positives and operators will ignore alerts",
        "Don't skip domain expertise: Engineers know what signals matter"
      ]
    }
  },
  {
    id: "t3_1", cat: "quality", catLabel: "Quality & Yield", title: "Yield Analysis & Reporting",
    desc: "Analyze die yield from fab through probe, identify yield loss drivers",
    edge: null,
    activities: [
      "Define yield metrics: Gross die, Net die, Probe yield, Fab yield",
      "Gather requirements for yield dashboards by product, technology, fab",
      "Analyze probe data to identify top yield loss bins",
      "Correlate yield loss to fab process variations (using FDC, SPC data)",
      "Create yield improvement recommendations"
    ],
    kpis: ["Probe yield %", "Fab yield %", "Yield loss by bin", "Yield trend", "Defect density"],
    deliverables: ["Yield dashboard", "Pareto of yield loss bins", "Yield correlation analysis", "Improvement recommendations"],
    guide: {
      steps: [
        "Understand yield flow: Wafer Start → Fab → Probe → Assembly → Test",
        "Define key metrics: Gross Die per wafer, Net Die after probe, Probe Yield = Net/Gross",
        "Get probe data: Wafer map with pass/fail by die, Bin codes for failure types",
        "Calculate yield by product, by technology, by fab over time",
        "Identify top yield loss bins: Which failures cause the most die loss?",
        "Correlate to fab data: Do low-yield lots share common process conditions?",
        "Drill down: Spatial yield analysis — are failures clustered on wafer?",
        "Present findings to process integration team with improvement recommendations"
      ],
      tools: ["Probe data systems (KLA, PDF Solutions)", "Yield management systems", "SQL for yield calculations", "JMP/Minitab for statistical analysis", "Power BI for dashboards"],
      techniques: [
        "Pareto analysis: Top 3 bins often account for 50%+ of yield loss",
        "Spatial analysis: Cluster failures may indicate equipment or process issue",
        "Correlation analysis: Link yield to process parameters (temp, pressure, time)",
        "DOE: Design of Experiments to find optimal process window"
      ],
      sampleOutput: "Yield Report - Product DDR5-8Gb:\n\n**Wafer Lot:** LOT-2026-001234\n**Gross Die:** 25,000\n**Net Die:** 22,500\n**Probe Yield:** 90.0% (Target: 92%)\n\n**Top Yield Loss Bins:**\n| Bin | Description | Die Lost | % of Total Loss |\n|-----|-------------|----------|----------------|\n| 15  | Bit Fail    | 1,200    | 48% |\n| 23  | Speed Fail  | 600      | 24% |\n| 07  | Leakage     | 400      | 16% |\n\n**Recommendation:** Focus on Bit Fail bin 15. Correlation shows higher fail rate on wafers processed through Etch Tool ET-003 during Week 35. Investigate chamber condition.",
      pitfalls: [
        "Don't average yields; median is more meaningful for skewed distributions",
        "Avoid comparing yields across products without normalizing for die size",
        "Don't ignore sample size: 2-wafer lot yield is not statistically significant"
      ]
    }
  },
  {
    id: "t3_2", cat: "quality", catLabel: "Quality & Yield", title: "SPC & Process Control",
    desc: "Implement Statistical Process Control for critical process parameters",
    edge: null,
    activities: [
      "Identify critical process parameters (CPPs) that affect CQAs (Critical Quality Attributes)",
      "Define SPC rules (Western Electric, Nelson rules)",
      "Gather requirements for SPC dashboards and alert systems",
      "Work with process engineers to set control limits",
      "Train operators on SPC interpretation and response"
    ],
    kpis: ["Cpk (process capability)", "Out-of-control events", "Time to respond to OOC", "False alarm rate"],
    deliverables: ["SPC control plan", "Control chart specifications", "Alert configuration document", "Training materials"],
    guide: {
      steps: [
        "Identify Critical Process Parameters (CPPs): Temp, Pressure, Gas flow, Time, etc.",
        "Collect historical data: 30+ data points minimum for baseline",
        "Calculate control limits: Mean ± 3σ (standard deviations)",
        "Select SPC rules: Start with Rule 1 (point beyond 3σ), add more as maturity increases",
        "Configure alerts in MES or SPC system (CMF SPC module, InfinityQS, etc.)",
        "Define response plan: What does operator do when OOC alert fires?",
        "Pilot on one process module, validate alerts catch real issues",
        "Roll out to all critical processes, train operators"
      ],
      tools: ["CMF SPC module", "InfinityQS ProFicient", "JMP for control charts", "Minitab", "Excel with SPC add-in"],
      techniques: [
        "Control charts: X-bar/R for means, I-MR for individual measurements",
        "Western Electric rules: 8 consecutive points on one side of mean = shift",
        "Cpk analysis: Process capability index, target Cpk ≥ 1.33",
        "OPLS (Out of Plan Limits) vs OOC (Out of Control): Different severity levels"
      ],
      sampleOutput: "SPC Control Chart - Etch Process Temperature:\n\n**Process:** Etch Step 150\n**Parameter:** Chamber Temperature\n**Target:** 250°C\n**Control Limits:** 247°C - 253°C (Mean ± 3σ)\n**Spec Limits:** 245°C - 255°C\n\n**Recent OOC Events:**\n- 2026-09-15 14:32: Point beyond 3σ (254.2°C)\n- Response: Operator checked chiller, found clogged filter\n- Resolution: Filter replaced, temp back in control\n\n**Process Capability:**\n- Cpk = 1.45 ✅ (Target: ≥ 1.33)\n- Process is capable and centered",
      pitfalls: [
        "Don't set control limits = spec limits; they're different concepts",
        "Avoid over-reacting to every OOC; investigate root cause first",
        "Don't ignore trending: 7 points in a row trending up/down signals drift"
      ]
    }
  },
  {
    id: "t4_1", cat: "supply", catLabel: "Supply Chain", title: "BOM Management & Validation",
    desc: "Manage Bill of Materials structures for semiconductor products",
    edge: "Teamcenter PLM experience at Applied Materials",
    activities: [
      "Document BOM structure: Equipment BOM vs Product BOM vs Process BOM",
      "Validate BOM accuracy against engineering masters",
      "Gather requirements for BOM version control and change management",
      "Create BOM comparison reports for engineering changes",
      "Train users on BOM maintenance procedures"
    ],
    kpis: ["BOM accuracy %", "Time to update BOM", "ECO cycle time", "BOM-related production issues"],
    deliverables: ["BOM structure documentation", "BOM validation report", "ECO process flow", "User guide"],
    guide: {
      steps: [
        "Understand BOM types: EBOM (Engineering), MBOM (Manufacturing), PBOM (Process)",
        "Identify BOM owners: Design engineering owns EBOM, Manufacturing engineering owns MBOM",
        "Map BOM levels: Level 0 = Finished product, Level 1 = Major assemblies, etc.",
        "Extract current BOM from PLM (Teamcenter) or ERP (SAP)",
        "Validate against engineering masters: Part numbers, quantities, revisions",
        "Identify discrepancies: Wrong part, wrong quantity, obsolete part",
        "Create BOM comparison report: Current vs Previous revision, highlight changes",
        "Document ECO (Engineering Change Order) process for BOM updates"
      ],
      tools: ["Teamcenter PLM", "SAP PP-BOM", "Excel for BOM comparison", "Visio for BOM structure diagrams", "Change management system"],
      techniques: [
        "BOM explosion: Expand all levels to see complete component list",
        "Where-used: Which products use this component?",
        "Effectivity dating: When does this BOM revision become active?",
        "Phantom BOMs: Sub-assemblies that aren't stocked separately"
      ],
      sampleOutput: "BOM Validation Report:\n\n**Product:** DDR5-8Gb Module\n**BOM Revision:** Rev 04\n**Effective Date:** 2026-09-01\n\n**Validation Results:**\n| Component | BOM Qty | Master Qty | Status |\n|-----------|---------|------------|--------|\n| PCB-001   | 1       | 1          | ✅ OK |\n| IC-DDR5-8G| 8       | 8          | ✅ OK |\n| CAP-0402  | 24      | 22         | ❌ Discrepancy |\n| RES-0402  | 12      | 12         | ✅ OK |\n\n**Issue:** Capacitor count discrepancy (BOM shows 24, master shows 22)\n**Action:** Submit ECO to correct BOM, effective immediately",
      pitfalls: [
        "Don't assume BOM is always right; validate against multiple sources",
        "Avoid making direct updates; always use formal ECO process",
        "Don't forget to update downstream systems (ERP, MES) after BOM change"
      ]
    }
  },
  {
    id: "t4_2", cat: "supply", catLabel: "Supply Chain", title: "CR/CN Lifecycle Management",
    desc: "Manage Change Requests and Change Notices for engineering changes",
    edge: null,
    activities: [
      "Document CR/CN workflow: Request → Review → Approve → Implement → Verify",
      "Gather requirements for CR/CN tracking system",
      "Analyze CR/CN cycle time and identify bottlenecks",
      "Create CR/CN dashboards for management visibility",
      "Train users on CR/CN submission and approval process"
    ],
    kpis: ["CR/CN cycle time", "Approval time per stage", "Rejection rate", "Implementation success rate"],
    deliverables: ["CR/CN process flow", "System requirements document", "Dashboard mockup", "Training materials"],
    guide: {
      steps: [
        "Understand terminology: CR = Change Request (proposed change), CN = Change Notice (approved change)",
        "Map workflow stages: Draft → Review → Approve → Schedule → Implement → Verify → Close",
        "Identify approvers: Who approves engineering changes? (Process owners, Quality, Production)",
        "Gather pain points: Where do CRs get stuck? (Long approval times? Missing information?)",
        "Define SLAs: Target cycle time for each stage (e.g., Review: 3 days, Approval: 5 days)",
        "Create tracking dashboard: CR count by status, aging report, cycle time trend",
        "Implement improvements: Parallel approvals, auto-notifications, simplified forms",
        "Train users: How to submit complete CRs that get approved quickly"
      ],
      tools: ["Teamcenter Change Management", "Agile PLM", "SAP Change Management", "Jira for workflow tracking", "Power BI for dashboards"],
      techniques: [
        "Value stream mapping: Visualize CR/CN flow, identify waste",
        "Root cause analysis: Why are CRs rejected or delayed?",
        "Bottleneck analysis: Which stage has longest queue time?",
        "Standard work: Template for complete CR submission"
      ],
      sampleOutput: "CR/CN Dashboard Summary:\n\n**Month: September 2026**\n\n**CR Statistics:**\n- Total CRs Submitted: 47\n- Approved: 38 (81%)\n- Rejected: 5 (11%)\n- Pending: 4 (8%)\n\n**Average Cycle Time by Stage:**\n| Stage | Avg Days | Target | Status |\n|-------|----------|--------|--------|\n| Review | 4.2 | 3 | ⚠️ Over |\n| Approval | 5.8 | 5 | ⚠️ Over |\n| Implementation | 12.3 | 14 | ✅ OK |\n| Total Cycle | 22.3 | 22 | ⚠️ Over |\n\n**Bottleneck:** Engineering review stage exceeds target. Root cause: Missing impact analysis in CR submissions.",
      pitfalls: [
        "Don't approve CRs without complete impact analysis",
        "Avoid changing scope mid-CR; submit new CR instead",
        "Don't skip verification step; confirm change was implemented correctly"
      ]
    }
  },
  {
    id: "t5_1", cat: "planning", catLabel: "Production Planning", title: "Production Scheduling Optimization",
    desc: "Optimize wafer start schedule to meet demand while balancing fab capacity",
    edge: null,
    activities: [
      "Understand demand signals: Customer orders, forecast, inventory targets",
      "Map capacity constraints: Equipment availability, operator shifts, material availability",
      "Gather requirements for scheduling optimization tools",
      "Create what-if scenarios for capacity planning",
      "Define KPIs for schedule adherence and fab utilization"
    ],
    kpis: ["Schedule adherence %", "Fab utilization %", "Cycle time predictability", "Late orders %"],
    deliverables: ["Scheduling requirements document", "Capacity model", "What-if scenario analysis", "KPI dashboard"],
    guide: {
      steps: [
        "Understand demand: Customer orders (firm), Forecast (planned), Safety stock targets",
        "Map capacity: Equipment hours available per week, by tool type",
        "Identify constraints: Which tools are bottlenecks? (Photo steppers, Etch tools)",
        "Calculate required starts: Demand ÷ Yield ÷ Cycle time buffer",
        "Create schedule: Which products start when, on which equipment",
        "Run what-if scenarios: What if demand increases 10%? What if Tool X goes down?",
        "Validate schedule with fab: Is it realistic? Any conflicts?",
        "Monitor adherence: Actual starts vs Scheduled starts, investigate variances"
      ],
      tools: ["Advanced Planning Systems (APS)", "Excel scheduling models", "CMF capacity planning module", "Power BI for dashboards", "Python for optimization models"],
      techniques: [
        "Theory of Constraints: Identify and manage bottleneck operations",
        "Linear programming: Optimize schedule given constraints",
        "Monte Carlo simulation: Model uncertainty in demand and capacity",
        "Kanban: Pull-based scheduling to reduce WIP"
      ],
      sampleOutput: "Weekly Wafer Start Schedule:\n\n**Week: 2026-09-22 to 2026-09-28**\n\n| Product | Mon | Tue | Wed | Thu | Fri | Sat | Sun | Total |\n|---------|-----|-----|-----|-----|-----|-----|-----|-------|\n| DDR5-8Gb| 120 | 120 | 120 | 120 | 120 | 60  | 0   | 660 |\n| DDR5-4Gb| 80  | 80  | 80  | 80  | 80  | 40  | 0   | 440 |\n| NAND-256| 100 | 100 | 100 | 100 | 100 | 50  | 0   | 550 |\n\n**Capacity Utilization:** 87% (Target: 85-90%)\n\n**Schedule Adherence Last Week:** 94% (Target: 95%)",
      pitfalls: [
        "Don't schedule 100% utilization; leave buffer for variability",
        "Avoid frequent schedule changes; fab needs stability",
        "Don't ignore maintenance windows in capacity planning"
      ]
    }
  },
  {
    id: "t5_2", cat: "planning", catLabel: "Production Planning", title: "Capacity Planning & Modeling",
    desc: "Build long-term capacity models for fab expansion decisions",
    edge: null,
    activities: [
      "Gather demand forecasts from sales/marketing",
      "Model current capacity: Equipment, labor, facilities",
      "Identify capacity gaps: When will demand exceed supply?",
      "Evaluate expansion options: New equipment, fab expansion, outsourcing",
      "Create business case for capacity investments"
    ],
    kpis: ["Capacity gap (wafers/month)", "Time to reach capacity limit", "ROI of expansion options", "Capacity utilization forecast"],
    deliverables: ["Capacity model", "Demand vs capacity analysis", "Expansion options comparison", "Business case document"],
    guide: {
      steps: [
        "Get demand forecast: 3-5 year outlook from sales/marketing",
        "Model current capacity: Wafer starts/month by product type",
        "Include assumptions: Yield improvement, cycle time reduction, equipment availability",
        "Calculate capacity gap: Demand - Capacity, by quarter/year",
        "Identify when gap becomes critical: When does demand exceed capacity?",
        "Evaluate options: Add equipment, extend shifts, new fab, outsource",
        "Calculate costs: CapEx, OpEx, time to implement for each option",
        "Recommend best option: Balance cost, risk, time to implement"
      ],
      tools: ["Excel capacity models", "AnyLogic simulation", "Python for optimization", "Power BI for scenario visualization", "Financial modeling tools"],
      techniques: [
        "Scenario planning: Best case, base case, worst case demand",
        "Sensitivity analysis: How do assumptions affect the gap?",
        "NPV/IRR: Financial evaluation of expansion options",
        "Risk matrix: Probability vs Impact for each option"
      ],
      sampleOutput: "Capacity Gap Analysis:\n\n**Current Capacity:** 40,000 wafer starts/month\n**Current Demand:** 38,000 wafer starts/month\n**Utilization:** 95%\n\n**Forecast (Base Case):**\n| Year | Demand | Capacity | Gap | Action Required |\n|------|--------|----------|-----|-----------------|\n| 2027 | 42,000 | 40,000   | -2,000 | Add 2 Etch tools |\n| 2028 | 46,000 | 42,000   | -4,000 | Extend to 24/7 ops |\n| 2029 | 52,000 | 46,000   | -6,000 | New fab module |\n\n**Recommendation:** Approve CapEx for 2 Etch tools in 2027 ($8M, 6-month lead time). Initiate study for fab expansion to be ready by 2029.",
      pitfalls: [
        "Don't assume linear demand growth; consider market cycles",
        "Avoid single-point forecasts; use ranges and scenarios",
        "Don't forget lead times: Equipment takes 6-12 months to install"
      ]
    }
  },
  {
    id: "t6_1", cat: "mes", catLabel: "MES & Systems", title: "MES Data Analysis & Reporting",
    desc: "Extract and analyze data from Manufacturing Execution System",
    edge: "CMF MES experience at Micron: built reports, validated data, UAT coordination",
    activities: [
      "Understand MES data model: Lots, wafers, recipes, equipment, events",
      "Write SQL queries to extract lot history, process data, equipment logs",
      "Validate data quality: Completeness, accuracy, timeliness",
      "Create reports and dashboards from MES data",
      "Train users on self-service data access"
    ],
    kpis: ["Data completeness %", "Data accuracy %", "Report usage", "Time to extract data"],
    deliverables: ["MES data dictionary", "SQL query library", "Data quality report", "User guide for self-service"],
    guide: {
      steps: [
        "Understand MES structure: Entities (Lot, Wafer, Equipment, Recipe) and their relationships",
        "Get data dictionary: Table names, column names, data types, relationships",
        "Identify key tables: LotStatus, LotHistory, ProcessData, EquipmentStateLog",
        "Write basic queries: Lot count by status, WIP by area, Recent lots processed",
        "Join tables: Connect Lot → Process Flow → Equipment → Process Data",
        "Validate data: Compare MES count to physical count on fab floor",
        "Create reusable views: Simplify complex queries for end users",
        "Document queries: Add comments explaining purpose, parameters, assumptions"
      ],
      tools: ["CMF MES", "SQL Server Management Studio", "Oracle SQL Developer", "Power BI Desktop", "Excel for ad-hoc analysis"],
      techniques: [
        "ERD (Entity Relationship Diagram): Map table relationships",
        "Data profiling: Check for NULLs, duplicates, outliers",
        "Query optimization: Use indexes, avoid SELECT *, filter early",
        "Parameterized queries: Create templates users can fill in"
      ],
      sampleOutput: "MES Query Examples:\n\n```sql\n-- WIP by Area\nSELECT Area, COUNT(*) as WIP_Count\nFROM LotStatus\nWHERE Status = 'Active'\nGROUP BY Area\nORDER BY WIP_Count DESC;\n\n-- Lots held > 24 hours\nSELECT LotID, Area, HoldReason, HoldTime\nFROM LotStatus\nWHERE Status = 'Held'\n  AND DATEDIFF(hour, HoldTime, GETDATE()) > 24\nORDER BY HoldTime;\n\n-- Process data for a specific lot\nSELECT Step, Recipe, Equipment, ParamName, ParamValue, Timestamp\nFROM ProcessData\nWHERE LotID = 'LOT-2026-001234'\nORDER BY Step, Timestamp;\n```",
      pitfalls: [
        "Don't run heavy queries during peak production hours",
        "Avoid SELECT * on large tables; specify columns you need",
        "Don't assume MES timestamp is accurate; check timezone settings"
      ]
    }
  },
  {
    id: "t6_2", cat: "mes", catLabel: "MES & Systems", title: "MES User Acceptance Testing",
    desc: "Coordinate UAT for MES enhancements and new features",
    edge: "UAT coordination experience at Micron for CMF releases",
    activities: [
      "Define UAT scope: What functionality needs testing?",
      "Create test cases from user requirements",
      "Recruit UAT testers from operations, engineering, quality",
      "Execute test cases and document results",
      "Manage defects through resolution and retest"
    ],
    kpis: ["Test case coverage %", "Pass rate %", "Defects found", "Time to complete UAT"],
    deliverables: ["UAT test plan", "Test cases", "Test execution report", "Defect log", "Sign-off document"],
    guide: {
      steps: [
        "Understand what's changing: Read release notes, talk to developers",
        "Define test scope: Which features affect users? Focus there",
        "Write test cases: Scenario → Steps → Expected Result → Actual Result → Pass/Fail",
        "Prioritize tests: Critical paths first, edge cases later",
        "Recruit testers: Include representatives from each user group",
        "Schedule UAT sessions: Book time in training environment",
        "Execute tests: Walk through scenarios with users, document results",
        "Log defects: Description, severity, steps to reproduce, screenshots",
        "Retest fixes: Verify defects are resolved before sign-off",
        "Get sign-off: Stakeholder approval to proceed to production"
      ],
      tools: ["Test management tools (Jira, Azure DevOps)", "Excel for test case tracking", "Training environment (sandbox MES)", "Screen recording tools for defects", "Confluence for documentation"],
      techniques: [
        "Equivalence partitioning: Test one representative from each group",
        "Boundary testing: Test edge cases (min, max values)",
        "Negative testing: Try to break it (invalid inputs)",
        "Regression testing: Verify new changes didn't break existing functionality"
      ],
      sampleOutput: "UAT Test Case Example:\n\n**Test Case ID:** TC-001\n**Feature:** WIP Dashboard Refresh\n**Scenario:** Verify dashboard auto-refreshes every 15 minutes\n\n**Steps:**\n1. Open WIP Dashboard in MES\n2. Note the WIP count and timestamp\n3. Wait 15 minutes without refreshing\n4. Verify WIP count and timestamp updated\n\n**Expected Result:** Dashboard shows updated WIP count with new timestamp within 15 minutes\n\n**Actual Result:** PASS - Dashboard refreshed at 14:32, timestamp updated from 14:17 to 14:32\n\n**Tester:** John Smith, Fab Supervisor\n**Date:** 2026-09-15",
      pitfalls: [
        "Don't test in production; use training/sandbox environment",
        "Avoid testing everything; focus on critical paths and high-risk changes",
        "Don't skip regression testing; new features can break old ones"
      ]
    }
  },
  {
    id: "t7_1", cat: "reporting", catLabel: "Reporting & Analytics", title: "Power BI Dashboard Development",
    desc: "Build interactive dashboards for manufacturing analytics",
    edge: "Power BI experience: built dashboards for Micron operations",
    activities: [
      "Gather dashboard requirements from stakeholders",
      "Design data model and relationships",
      "Create measures and calculated columns in DAX",
      "Build visualizations and configure interactivity",
      "Deploy and train users"
    ],
    kpis: ["Dashboard usage", "Query performance", "User satisfaction", "Decision impact"],
    deliverables: ["Dashboard mockup", "Data model diagram", "DAX measures documentation", "User guide"],
    guide: {
      steps: [
        "Interview stakeholders: What questions should the dashboard answer?",
        "Sketch mockup: Paper or whiteboard first, get feedback before building",
        "Identify data sources: MES, ERP, Yield systems, manual inputs",
        "Connect to data: Import or DirectQuery depending on volume and freshness needs",
        "Build data model: Star schema with fact table (transactions) and dimension tables (products, equipment, time)",
        "Write DAX measures: Total WIP, Average Cycle Time, Yield %, etc.",
        "Create visualizations: Choose chart types that answer the questions",
        "Add interactivity: Slicers, drill-through, tooltips",
        "Test performance: Ensure dashboard loads in <10 seconds",
        "Deploy to Power BI Service and set up refresh schedule",
        "Train users: How to navigate, filter, interpret the dashboard"
      ],
      tools: ["Power BI Desktop", "Power BI Service", "DAX Studio", "SQL Server for data prep", "Excel for mockups"],
      techniques: [
        "Star schema: Fact table in middle, dimensions around it",
        "DAX patterns: Time intelligence, running totals, Pareto",
        "Row-level security: Users only see their data",
        "Bookmarks: Save filter states for common views"
      ],
      sampleOutput: "Power BI Dashboard: Fab Operations Overview\n\n**Page 1: WIP Summary**\n- Card: Total WIP (3,247 lots)\n- Card: Lots on Hold (127)\n- Bar chart: WIP by Area\n- Line chart: WIP trend (7 days)\n- Table: Top 10 oldest lots\n\n**Page 2: Cycle Time**\n- Card: Avg Cycle Time (18.2 days)\n- Box plot: CT distribution by product\n- Scatter: CT vs WIP correlation\n\n**Filters/Slicers:**\n- Date range\n- Area\n- Product family\n- Lot status",
      pitfalls: [
        "Don't create measure explosion; reuse measures across visuals",
        "Avoid too many visuals; focus on answering key questions",
        "Don't ignore mobile layout; many users view on phones"
      ]
    }
  },
  {
    id: "t7_2", cat: "reporting", catLabel: "Reporting & Analytics", title: "Ad-Hoc Analysis & SQL Reporting",
    desc: "Respond to urgent data requests from management and operations",
    edge: null,
    activities: [
      "Gather requirements: What question needs answering?",
      "Identify data sources and write SQL queries",
      "Analyze results and identify patterns",
      "Create visualizations and executive summary",
      "Present findings and recommendations"
    ],
    kpis: ["Turnaround time", "Accuracy of analysis", "Actionability of insights", "Stakeholder satisfaction"],
    deliverables: ["SQL queries", "Analysis report", "Visualizations", "Recommendations"],
    guide: {
      steps: [
        "Clarify the question: What exactly does the stakeholder need to know?",
        "Define scope: Time period, products, areas to include",
        "Identify data sources: Which tables contain the needed data?",
        "Write query: Start simple, add complexity as needed",
        "Validate data: Does the output make sense? Spot check a few records",
        "Analyze: Calculate summary stats, identify patterns, look for outliers",
        "Visualize: Charts are worth 1000 rows of data",
        "Summarize: Executive summary in 3 bullet points",
        "Recommend: What action should be taken based on findings?",
        "Document: Save query for future reuse"
      ],
      tools: ["SQL Server Management Studio", "Excel for analysis", "Power BI Desktop", "Python/R for advanced analysis", "Outlook/Teams for communication"],
      techniques: [
        "Exploratory Data Analysis (EDA): Understand the data before analyzing",
        "Pivot tables: Quick summaries in Excel",
        "SQL window functions: Running totals, rankings",
        "Correlation vs causation: Don't assume relationship implies cause"
      ],
      sampleOutput: "Ad-Hoc Analysis Request:\n\n**Request:** \"Why did cycle time spike in Etch area last week?\"\n\n**Analysis Steps:**\n1. Queried lot history for Etch area, Week 37\n2. Compared to previous 4-week average\n3. Identified lots with CT > 24 hours\n4. Analyzed root causes\n\n**Findings:**\n- Avg CT increased from 18.2 to 22.5 days (+23%)\n- Top cause: Etch Tool ET-003 down for 18 hours (RF generator failure)\n- Secondary cause: High WIP created queue at remaining tools\n\n**Recommendations:**\n1. Expedite RF generator repair (critical spare part lead time issue)\n2. Cross-train operators on backup tool to increase capacity\n3. Adjust wafer start schedule when critical tool is down",
      pitfalls: [
        "Don't over-analyze; answer the question and stop",
        "Avoid presenting raw data; synthesize into insights",
        "Don't jump to conclusions; validate findings with domain experts"
      ]
    }
  },
  {
    id: "t7_3", cat: "reporting", catLabel: "Reporting & Analytics", title: "Automated Alert System Setup",
    desc: "Configure automated alerts for critical manufacturing metrics",
    edge: "Grafana alerting experience at Micron",
    activities: [
      "Identify metrics that need real-time monitoring",
      "Define alert thresholds and escalation rules",
      "Configure alerting in MES, Grafana, or custom tools",
      "Test alert delivery and response procedures",
      "Train operators on alert response protocols"
    ],
    kpis: ["Alert response time", "False positive rate", "Issue catch rate", "Operator satisfaction"],
    deliverables: ["Alert configuration document", "Threshold justification", "Escalation matrix", "Training materials"],
    guide: {
      steps: [
        "Identify critical metrics: What needs immediate attention? (Equipment down, High WIP, Yield drop)",
        "Set thresholds: What value triggers an alert? Use historical data to set meaningful thresholds",
        "Choose alert tool: CMF alerts, Grafana, Power BI data alerts, email, SMS, Teams/Slack",
        "Define recipients: Who needs to know? (Operators, Engineers, Managers)",
        "Create escalation rules: If not acknowledged in X minutes, escalate to Y",
        "Configure in tool: Set up alert rule, threshold, recipients, message template",
        "Test: Trigger test alert and verify it reaches the right people",
        "Document response procedure: What should recipient do when they get the alert?",
        "Monitor and tune: Adjust thresholds if too many false alarms"
      ],
      tools: ["CMF Alert Manager", "Grafana Alerting", "Power BI data alerts", "PagerDuty", "Teams/Slack webhooks"],
      techniques: [
        "Threshold tuning: Balance sensitivity vs false alarms",
        "Alert fatigue prevention: Group related alerts, reduce noise",
        "Runbooks: Document response procedure for each alert type",
        "On-call rotation: Distribute responsibility"
      ],
      sampleOutput: "Alert Configuration:\n\n**Alert Name:** Etch Area WIP Exceeds Capacity\n\n**Condition:**\n- Metric: WIP_Count in Etch area\n- Threshold: > 150 lots\n- Duration: > 30 minutes (avoid triggering on transient spikes)\n\n**Actions:**\n1. Send Teams message to \"Etch Ops\" channel\n2. Send email to Etch Supervisor and Planning Manager\n3. If not acknowledged in 15 minutes, page On-Call Engineer\n\n**Message Template:**\n⚠️ ALERT: Etch WIP at {value} lots (threshold: 150)\nAction: Review lot priority and consider expediting high-priority lots\nDashboard link: [URL]\n\n**Response Procedure:**\n1. Open WIP dashboard\n2. Identify high-priority lots\n3. Check equipment availability\n4. Expedite lots or adjust schedule",
      pitfalls: [
        "Don't set thresholds without historical context",
        "Avoid alerting on everything; focus on actionable events",
        "Don't forget to test alert delivery after changes"
      ]
    }
  },
  {
    id: "t7_4", cat: "reporting", catLabel: "Reporting & Analytics", title: "Grafana Dashboard Creation",
    desc: "Build real-time monitoring dashboards using Grafana",
    edge: "Grafana experience at Micron for fab monitoring",
    activities: [
      "Connect Grafana to data sources (InfluxDB, Prometheus, SQL)",
      "Design dashboard layout for real-time monitoring",
      "Create panels for key metrics: WIP, equipment status, yield",
      "Configure auto-refresh and time range selectors",
      "Set up alerting within Grafana"
    ],
    kpis: ["Dashboard load time", "Data freshness", "User adoption", "Alert effectiveness"],
    deliverables: ["Grafana dashboard", "Data source configuration", "Panel documentation", "Alert rules"],
    guide: {
      steps: [
        "Understand use case: Real-time monitoring or historical analysis?",
        "Choose data source: Time-series DB (InfluxDB, Prometheus) for real-time, SQL for historical",
        "Connect Grafana: Add data source, test connection",
        "Create dashboard: Add rows for logical groupings (WIP, Equipment, Yield)",
        "Add panels: Choose visualization type (gauge, graph, stat, table)",
        "Write queries: Select metric, filter, aggregation",
        "Configure thresholds: Green/Yellow/Red zones for gauges",
        "Add variables: Dashboard-level filters (Area, Product, Time Range)",
        "Set up annotations: Mark events (tool down, lot start) on graphs",
        "Configure refresh: Auto-refresh interval (5s for real-time, 1m for near-real-time)",
        "Add alerts: Threshold-based alerting within Grafana",
        "Share: Export dashboard JSON, import to production Grafana"
      ],
      tools: ["Grafana", "InfluxDB/Prometheus for time-series data", "SQL Server/MySQL for relational data", "Grafana plugins (if needed)"],
      techniques: [
        "Dashboard variables: Enable user filtering without editing panels",
        "Annotations: Overlay events on graphs for context",
        "Template variables: Create reusable dashboard templates",
        "Dashboard provisioning: Automate deployment via config files"
      ],
      sampleOutput: "Grafana Dashboard: Fab Floor Monitoring\n\n**Row 1: Overview**\n- Stat panel: Total WIP (3,247 lots)\n- Stat panel: Equipment Availability (92%)\n- Stat panel: Lots on Hold (127)\n\n**Row 2: WIP by Area**\n- Bar gauge: WIP by Area (Photo: 420, Etch: 380, Thin Films: 340, etc.)\n- Graph: WIP trend (last 24 hours)\n\n**Row 3: Equipment Status**\n- Table: Equipment List with Status, Utilization, Last PM\n- Pie chart: Equipment by State (Running, Standby, Down, PM)\n\n**Row 4: Alerts**\n- Table: Recent alerts with timestamp, severity, status\n\n**Variables:**\n- Area (dropdown)\n- Time Range (selector)\n- Refresh: Auto-refresh every 30 seconds",
      pitfalls: [
        "Don't over-crowd dashboard; create multiple focused dashboards instead",
        "Avoid too frequent refresh; balance real-time need with system load",
        "Don't forget to document dashboard for handoff to operations"
      ]
    }
  }
];

// ============ SCENARIOS DATA ============
const SCENARIOS = [
  {
    num: 1,
    title: "Equipment Down During Peak Production",
    situation: "A critical etch tool goes down unexpectedly during a high-demand period. You have 50 lots queued at this tool. The shift supervisor asks you to assess the impact and recommend actions.",
    task: "Analyze the impact, identify affected lots, and propose a response plan within 2 hours.",
    hints: [
      "Identify lots by priority: Which lots are for key customers or have tight delivery dates?",
      "Calculate capacity gap: How many wafers per hour is the down tool? What's the backup capacity?",
      "Estimate delay: Queue size ÷ remaining capacity = additional cycle time",
      "Recommend actions: Expedite repair, reroute to backup tool, adjust wafer starts, notify planning"
    ]
  },
  {
    num: 2,
    title: "Yield Drop Investigation",
    situation: "Probe yield for Product X dropped from 92% to 85% over the last 3 lots. The quality manager asks you to investigate and identify the root cause.",
    task: "Analyze the yield drop, identify potential causes, and recommend next steps within 4 hours.",
    hints: [
      "Verify data: Is the drop real or a data error? Check probe equipment status.",
      "Spatial analysis: Are failures clustered on wafer? May indicate equipment issue.",
      "Temporal analysis: When did yield start dropping? Correlate to process changes.",
      "Lot genealogy: Do the 3 lots share common equipment or process conditions?",
      "Compare to similar products: Is this product-specific or fab-wide?"
    ]
  },
  {
    num: 3,
    title: "Capacity Expansion Business Case",
    situation: "Sales forecasts show demand will exceed fab capacity in 18 months. Management asks you to build a business case for either adding equipment or expanding the fab.",
    task: "Create a 3-year capacity model and recommend the best expansion option within 1 week.",
    hints: [
      "Gather inputs: Demand forecast from sales, current capacity from engineering, cost data from finance",
      "Model scenarios: Base case, optimistic, pessimistic demand",
      "Evaluate options: Add equipment (lower cost, faster) vs. fab expansion (higher cost, longer)",
      "Calculate ROI: Net Present Value, Payback Period, Internal Rate of Return",
      "Consider risks: Technology changes, demand volatility, construction delays"
    ]
  },
  {
    num: 4,
    title: "New Product Introduction (NPI)",
    situation: "R&D has developed a new memory product that needs to be transferred to manufacturing. You're assigned as the BA to coordinate the NPI process.",
    task: "Define the NPI process, identify data and system requirements, and create a transition plan within 2 weeks.",
    hints: [
      "Understand the product: What's different from existing products? (New materials, process steps, equipment)",
      "Map system impacts: Does MES need new recipe codes? ERP need new BOM? Yield system need new bin definitions?",
      "Define data requirements: What parameters need to be tracked? What reports are needed?",
      "Create timeline: Process development → Pilot production → Volume ramp",
      "Identify stakeholders: R&D, Process Engineering, Quality, Planning, IT"
    ]
  },
  {
    num: 5,
    title: "Data Quality Crisis",
    situation: "A critical dashboard is showing incorrect WIP counts. Operators have lost trust in the data and are reverting to manual counts. The IT manager asks you to investigate and fix the data quality issues.",
    task: "Diagnose the data quality issues, implement fixes, and restore user confidence within 1 week.",
    hints: [
      "Quantify the issue: How big is the discrepancy? Which areas, products, time periods?",
      "Trace data lineage: Dashboard → Data warehouse → MES → Source systems",
      "Identify root causes: Missing data? Duplicate records? Incorrect transformations?",
      "Implement fixes: Data cleansing, process changes, validation checks",
      "Restore trust: Show before/after comparison, involve users in validation"
    ]
  }
];

// ============ DOMAIN KNOWLEDGE CHECKLIST ============
const CHECKLIST = [
  { text: "Understand semiconductor manufacturing flow: Wafer Start → Fab → Probe → Assembly → Test", category: "Process" },
  { text: "Know the difference between DRAM and NAND Flash manufacturing", category: "Product" },
  { text: "Understand MES (Manufacturing Execution System) purpose and key functions", category: "Systems" },
  { text: "Know the components of OEE: Availability × Performance × Quality", category: "Equipment" },
  { text: "Understand cycle time components: Queue Time + Process Time + Hold Time", category: "Operations" },
  { text: "Know how to calculate probe yield: Net Die ÷ Gross Die", category: "Quality" },
  { text: "Understand BOM (Bill of Materials) structure and levels", category: "Supply Chain" },
  { text: "Know the CR/CN (Change Request/Change Notice) workflow stages", category: "Change Mgmt" },
  { text: "Understand SPC (Statistical Process Control) and control limits vs spec limits", category: "Quality" },
  { text: "Know the difference between WIP (Work in Progress) and finished goods inventory", category: "Operations" },
  { text: "Understand lot genealogy: parent lot, child lot, splits, and merges", category: "Operations" },
  { text: "Know key fab equipment types: Photo, Etch, Thin Films, Diffusion, CMP, Inspection", category: "Equipment" },
  { text: "Understand the role of PLM (Product Lifecycle Management) in semiconductor manufacturing", category: "Systems" }
];

// ============ KPIs DATA ============
const KPIS = [
  { name: "WIP (Work in Progress)", desc: "Number of lots/wafers currently in the fab being processed", target: "Balance with capacity to minimize cycle time" },
  { name: "Cycle Time", desc: "Time from lot start to completion (fab, probe, or end-to-end)", target: "Minimize while maintaining quality; benchmark vs target" },
  { name: "OEE (Overall Equipment Effectiveness)", desc: "Availability × Performance × Quality; measures equipment productivity", target: "≥ 85% for world-class; ≥ 70% typical" },
  { name: "Probe Yield", desc: "Net die passing probe ÷ Gross die on wafer", target: "Product-specific; typically 85-95% for mature products" },
  { name: "Equipment Utilization", desc: "Productive time ÷ Available time", target: "≥ 85% for critical tools; balance with maintenance needs" },
  { name: "MTBF (Mean Time Between Failures)", desc: "Average time between equipment breakdowns", target: "Maximize; trend over time to predict maintenance needs" },
  { name: "MTTR (Mean Time To Repair)", desc: "Average time to repair equipment after breakdown", target: "Minimize; have spare parts and trained technicians ready" },
  { name: "Schedule Adherence", desc: "Actual wafer starts ÷ Scheduled wafer starts", target: "≥ 95%; lower indicates planning or execution issues" },
  { name: "Cpk (Process Capability)", desc: "Measures how well process meets specs; accounts for centering", target: "≥ 1.33 for critical parameters; ≥ 1.0 acceptable" },
  { name: "Defect Density", desc: "Defects per unit area (e.g., defects/cm²)", target: "Minimize; benchmark against industry standards" }
];

// ============ DAILY ROUTINES ============
const ROUTINES = [
  { time: "08:00", activity: "Check overnight alerts and escalations", owner: "BA", priority: "High" },
  { time: "08:30", activity: "Review WIP dashboard for anomalies", owner: "BA", priority: "High" },
  { time: "09:00", activity: "Attend shift handoff meeting", owner: "BA", priority: "Medium" },
  { time: "09:30", activity: "Work on active projects/requirements", owner: "BA", priority: "Medium" },
  { time: "11:00", activity: "Stakeholder meetings/interviews", owner: "BA", priority: "Medium" },
  { time: "12:00", activity: "Lunch break", owner: "BA", priority: "Low" },
  { time: "13:00", activity: "Data analysis and reporting", owner: "BA", priority: "Medium" },
  { time: "15:00", activity: "UAT coordination or testing", owner: "BA", priority: "Medium" },
  { time: "16:30", activity: "Document findings and prepare reports", owner: "BA", priority: "Medium" },
  { time: "17:00", activity: "End-of-day status update to manager", owner: "BA", priority: "Low" }
];

// ============ STATE MANAGEMENT ============
const STORAGE_KEY = "ba_sim_state_v2";

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Error loading state:", e);
  }
  return { taskStatus: {}, taskNotes: {}, checklist: {}, scenarioNotes: {}, activeTab: "tasks" };
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Error saving state:", e);
  }
}

let state = loadState();

// ============ RENDER FUNCTIONS ============

function renderTasks(filter = "all") {
  const container = document.getElementById("tasks-container");
  const searchVal = (document.getElementById("search-input")?.value || "").toLowerCase();

  const filtered = TASKS.filter(t => {
    if (filter !== "all" && t.cat !== filter) return false;
    if (searchVal && !t.title.toLowerCase().includes(searchVal) && !t.desc.toLowerCase().includes(searchVal)) return false;
    return true;
  });

  container.innerHTML = filtered.map(t => `
    <div class="card" onclick="openTask('${t.id}')">
      <span class="card-cat ${t.cat}">${t.catLabel}</span>
      <h3>${t.title}</h3>
      <p>${t.desc}</p>
      ${t.edge ? `<span class="card-edge">⭐ ${t.edge}</span>` : ""}
      <div class="card-footer">
        <span class="card-status status-${state.taskStatus[t.id] || 'not-started'}">
          ${formatStatus(state.taskStatus[t.id] || 'not-started')}
        </span>
        <span style="font-size:0.7rem;color:var(--text-muted)">${t.activities.length} activities</span>
      </div>
    </div>
  `).join("");

  updateStats();
}

function formatStatus(status) {
  return status.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function updateStats() {
  const total = TASKS.length;
  const completed = Object.values(state.taskStatus).filter(s => s === "completed").length;
  const inProgress = Object.values(state.taskStatus).filter(s => s === "in-progress").length;
  const checked = Object.values(state.checklist).filter(Boolean).length;

  document.getElementById("stat-total").textContent = total;
  document.getElementById("stat-completed").textContent = completed;
  document.getElementById("stat-progress").textContent = inProgress;
  document.getElementById("stat-knowledge").textContent = `${checked}/${CHECKLIST.length}`;
}

function openTask(id) {
  const t = TASKS.find(task => task.id === id);
  if (!t) return;

  const modal = document.getElementById("modal-overlay");
  const content = document.getElementById("modal-content");

  content.innerHTML = `
    <button class="modal-close" onclick="closeModal()">×</button>
    <h2>${t.title}</h2>
    <span class="card-cat ${t.cat}" style="margin-bottom:12px;display:inline-block">${t.catLabel}</span>

    <p style="color:var(--text-muted);margin-bottom:16px">${t.desc}</p>
    ${t.edge ? `<p style="color:var(--green);font-size:0.9rem;margin-bottom:16px">⭐ ${t.edge}</p>` : ""}

    <h4>📋 Step-by-Step Guide</h4>
    <ol style="padding-left:20px;margin-bottom:12px">
      ${t.guide.steps.map(s => `<li style="color:var(--text-muted);font-size:0.88rem;margin-bottom:6px">${s}</li>`).join("")}
    </ol>

    <h4>🛠️ Tools & Systems</h4>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:12px">
      ${t.guide.tools.map(tool => `<span style="background:var(--accent-bg);color:var(--accent);padding:4px 10px;border-radius:6px;font-size:0.8rem">${tool}</span>`).join("")}
    </div>

    <h4>💡 Techniques</h4>
    <ul style="padding-left:20px;margin-bottom:12px">
      ${t.guide.techniques.map(tech => `<li style="color:var(--text-muted);font-size:0.88rem;margin-bottom:4px">${tech}</li>`).join("")}
    </ul>

    <h4>📄 Sample Output</h4>
    <pre style="background:var(--bg);padding:12px;border-radius:8px;overflow-x:auto;font-size:0.8rem;color:var(--text-muted);margin-bottom:12px;white-space:pre-wrap">${t.guide.sampleOutput}</pre>

    <h4>⚠️ Common Pitfalls</h4>
    <ul style="padding-left:20px;margin-bottom:16px">
      ${t.guide.pitfalls.map(p => `<li style="color:var(--red);font-size:0.88rem;margin-bottom:4px">${p}</li>`).join("")}
    </ul>

    <h4>✅ Activities Checklist</h4>
    <ul style="padding-left:20px;margin-bottom:12px">
      ${t.activities.map(a => `<li style="color:var(--text-muted);font-size:0.88rem;margin-bottom:4px">${a}</li>`).join("")}
    </ul>

    <h4>📊 KPIs</h4>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px">
      ${t.kpis.map(k => `<span style="background:var(--yellow-bg);color:var(--yellow);padding:4px 10px;border-radius:6px;font-size:0.8rem">${k}</span>`).join("")}
    </div>

    <h4>📁 Deliverables</h4>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px">
      ${t.deliverables.map(d => `<span style="background:var(--purple-bg);color:var(--purple);padding:4px 10px;border-radius:6px;font-size:0.8rem">${d}</span>`).join("")}
    </div>

    <h4>📝 Your Notes</h4>
    <textarea class="notes-area" id="notes-${id}" placeholder="Add your notes, questions, or learnings here...">${state.taskNotes[id] || ""}</textarea>

    <div class="modal-actions">
      <button class="btn btn-success" onclick="setStatus('${id}','completed')">✓ Mark Complete</button>
      <button class="btn btn-primary" onclick="setStatus('${id}','in-progress')">▶ In Progress</button>
      <button class="btn btn-outline" onclick="setStatus('${id}','not-started')">↺ Reset</button>
      <button class="btn btn-outline" onclick="saveNotes('${id}')">💾 Save Notes</button>
    </div>
  `;

  modal.classList.add("active");
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("active");
}

function setStatus(id, status) {
  state.taskStatus[id] = status;
  saveState();
  renderTasks(document.querySelector(".filter-btn.active")?.dataset?.cat || "all");
  openTask(id);
}

function saveNotes(id) {
  state.taskNotes[id] = document.getElementById(`notes-${id}`).value;
  saveState();
  alert("Notes saved!");
}

function renderScenarios() {
  const container = document.getElementById("scenarios-container");
  container.innerHTML = SCENARIOS.map(s => `
    <div class="scenario-card">
      <span class="scenario-num">${s.num}</span>
      <h3>${s.title}</h3>
      <p class="scenario-sit"><strong>Situation:</strong> ${s.situation}</p>
      <p class="scenario-task"><strong>Your Task:</strong> ${s.task}</p>
      <details style="margin-top:12px">
        <summary style="color:var(--accent);cursor:pointer;font-size:0.9rem">💡 Show Hints</summary>
        <ul style="padding-left:20px;margin-top:8px">
          ${s.hints.map(h => `<li style="color:var(--text-muted);font-size:0.88rem;margin-bottom:4px">${h}</li>`).join("")}
        </ul>
      </details>
      <textarea class="notes-area" id="scenario-notes-${s.num}" placeholder="Your analysis and notes..." style="margin-top:12px">${state.scenarioNotes[s.num] || ""}</textarea>
      <button class="btn btn-outline" style="margin-top:8px" onclick="saveScenarioNotes(${s.num})">💾 Save Notes</button>
    </div>
  `).join("");
}

function saveScenarioNotes(num) {
  state.scenarioNotes[num] = document.getElementById(`scenario-notes-${num}`).value;
  saveState();
  alert("Notes saved!");
}

function renderChecklist() {
  const container = document.getElementById("checklist-container");
  const checked = Object.values(state.checklist).filter(Boolean).length;
  const pct = Math.round((checked / CHECKLIST.length) * 100);

  container.innerHTML = `
    <div class="progress-container">
      <div class="progress-label">
        <span>Domain Knowledge Progress</span>
        <span>${checked}/${CHECKLIST.length} (${pct}%)</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width:${pct}%"></div>
      </div>
    </div>
    ${CHECKLIST.map((item, i) => `
      <div class="checklist-item ${state.checklist[i] ? 'checked' : ''}" onclick="toggleCheck(${i})">
        <div class="cl-box">${state.checklist[i] ? "✓" : ""}</div>
        <span class="cl-text"><span style="color:var(--accent);font-size:0.75rem">[${item.category}]</span> ${item.text}</span>
      </div>
    `).join("")}
  `;

  updateStats();
}

function toggleCheck(i) {
  state.checklist[i] = !state.checklist[i];
  saveState();
  renderChecklist();
}

function renderKPIs() {
  const container = document.getElementById("kpis-container");
  container.innerHTML = `
    <table class="kpi-table">
      <thead>
        <tr>
          <th>KPI</th>
          <th>Description</th>
          <th>Target</th>
        </tr>
      </thead>
      <tbody>
        ${KPIS.map(k => `
          <tr>
            <td style="color:var(--accent);font-weight:600">${k.name}</td>
            <td>${k.desc}</td>
            <td>${k.target}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderRoutines() {
  const container = document.getElementById("routines-container");
  container.innerHTML = `
    <table class="routine-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Activity</th>
          <th>Owner</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        ${ROUTINES.map(r => `
          <tr>
            <td style="color:var(--accent);font-weight:600">${r.time}</td>
            <td>${r.activity}</td>
            <td>${r.owner}</td>
            <td><span style="background:${r.priority === 'High' ? 'var(--red-bg)' : r.priority === 'Medium' ? 'var(--yellow-bg)' : 'var(--bg)'};color:${r.priority === 'High' ? 'var(--red)' : r.priority === 'Medium' ? 'var(--yellow)' : 'var(--text-muted)'};padding:2px 8px;border-radius:4px;font-size:0.75rem">${r.priority}</span></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

function renderTools() {
  const container = document.getElementById("tools-container");
  const tools = {
    "MES Systems": ["CMF (Critical Manufacturing Framework)", "Promis", "WorkStream", "PAS"],
    "PLM Systems": ["Teamcenter", "Agile PLM", "Windchill"],
    "ERP Systems": ["SAP", "Oracle EBS", "JD Edwards"],
    "BI & Reporting": ["Power BI", "Tableau", "SSRS", "Grafana", "Snowflake", "ClickHouse"],
    "SPC & Quality": ["InfinityQS", "JMP", "Minitab", "SAS"],
    "Analysis Tools": ["SQL Server", "Excel", "Python", "R", "Jupyter"]
  };

  container.innerHTML = Object.entries(tools).map(([cat, items]) => `
    <div style="margin-bottom:20px">
      <h4 style="color:var(--accent);margin-bottom:8px">${cat}</h4>
      <div style="display:flex;flex-wrap:wrap;gap:8px">
        ${items.map(item => `<span style="background:var(--bg-card);border:1px solid var(--border);padding:8px 12px;border-radius:8px;font-size:0.85rem">${item}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

// ============ TAB SWITCHING ============

function switchTab(tabId) {
  document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(".nav-tab").forEach(t => t.classList.remove("active"));

  document.getElementById(tabId).classList.add("active");
  document.querySelector(`[data-tab="${tabId}"]`).classList.add("active");

  state.activeTab = tabId;
  saveState();
}

function filterTasks(cat) {
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  document.querySelector(`[data-cat="${cat}"]`).classList.add("active");
  renderTasks(cat);
}

// ============ IMPORT/EXPORT ============

function exportData() {
  const dataStr = JSON.stringify(state, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "ba-simulator-progress.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importData(input) {
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      state = { ...state, ...imported };
      saveState();
      renderTasks();
      renderChecklist();
      renderScenarios();
      alert("Progress imported successfully!");
    } catch (err) {
      alert("Error importing file. Please check the format.");
    }
  };
  reader.readAsText(file);
}

// ============ INITIALIZATION ============

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
  renderScenarios();
  renderChecklist();
  renderKPIs();
  renderRoutines();
  renderTools();

  // Restore active tab
  if (state.activeTab) {
    switchTab(state.activeTab);
  }

  // Search functionality
  document.getElementById("search-input")?.addEventListener("input", () => {
    renderTasks(document.querySelector(".filter-btn.active")?.dataset?.cat || "all");
  });

  // Close modal on overlay click
  document.getElementById("modal-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "modal-overlay") closeModal();
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
});
