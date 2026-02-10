import React, { useState, useEffect, useRef } from 'react';
import {
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Users,
  Settings,
  Menu,
  X,
  Search,
  Filter,
  Download,
  Bell,
  Home,
  Folder,
  PenTool,
  BarChart3,
  Shield,
  Zap,
  Check,
  User,
  Plus,
  Trash2,
  RefreshCw,
  FilePlus,
  Copy,
  ArrowRight,
  Activity,
  Edit,
  Send,
  Lock,
  Globe,
  GitBranch,
  ChevronDown,
  Save,
  DollarSign,
  Package,
  TrendingUp,
  Briefcase,
  FileCheck,
  Truck,
  Database,
  ClipboardCheck,
  Building2,
  ShoppingCart,
  Landmark,
  AlertTriangle,
  Calculator,
  Warehouse,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
  Area,
  AreaChart,
} from 'recharts';

// ============================================================
// DATA & CONFIGURATION
// ============================================================

// ENTERPRISE MODULES CONFIGURATION
const ENTERPRISE_MODULES = [
  {
    id: 'approvals',
    name: 'Approval Workflows',
    desc: 'Automated approval routing and digital signatures',
    icon: CheckCircle,
    color: '#3b82f6',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    available: true,
    stats: { active: 142, pending: 23, rate: '98%' },
  },
  {
    id: 'procurement',
    name: 'Procurement Management',
    desc: 'Purchase orders, requisitions, and vendor management',
    icon: ShoppingCart,
    color: '#10b981',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    available: false,
    stats: { active: 567, pending: 89, rate: '96%' },
  },
  {
    id: 'financial',
    name: 'Financial Management',
    desc: 'Accounting, budgeting, and financial reporting',
    icon: DollarSign,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    available: false,
    stats: { active: 892, pending: 156, rate: '94%' },
  },
  {
    id: 'hr',
    name: 'Human Resources',
    desc: 'Employee management, payroll, and benefits',
    icon: Users,
    color: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    available: false,
    stats: { active: 1245, pending: 67, rate: '99%' },
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain',
    desc: 'Logistics, inventory, and warehouse management',
    icon: Truck,
    color: '#06b6d4',
    gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    available: false,
    stats: { active: 678, pending: 124, rate: '91%' },
  },
  {
    id: 'contracts',
    name: 'Contract Lifecycle',
    desc: 'Contract creation, negotiation, and compliance',
    icon: FileCheck,
    color: '#ec4899',
    gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    available: false,
    stats: { active: 234, pending: 45, rate: '97%' },
  },
  {
    id: 'assets',
    name: 'Asset Management',
    desc: 'Track and manage physical and digital assets',
    icon: Database,
    color: '#14b8a6',
    gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    available: false,
    stats: { active: 1567, pending: 234, rate: '93%' },
  },
  {
    id: 'bi',
    name: 'Business Intelligence',
    desc: 'Analytics, dashboards, and predictive insights',
    icon: TrendingUp,
    color: '#f43f5e',
    gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    available: false,
    stats: { active: 456, pending: 0, rate: '100%' },
  },
  {
    id: 'compliance',
    name: 'Compliance & Audit',
    desc: 'Regulatory compliance and audit trails',
    icon: Shield,
    color: '#ef4444',
    gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    available: false,
    stats: { active: 89, pending: 12, rate: '95%' },
  },
  {
    id: 'documents',
    name: 'Document Management',
    desc: 'Centralized document storage and collaboration',
    icon: Folder,
    color: '#84cc16',
    gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    available: false,
    stats: { active: 3456, pending: 567, rate: '89%' },
  },
  {
    id: 'vendors',
    name: 'Vendor Management',
    desc: 'Vendor onboarding, performance, and payments',
    icon: Briefcase,
    color: '#a855f7',
    gradient: 'linear-gradient(135deg, #f77062 0%, #fe5196 100%)',
    available: false,
    stats: { active: 789, pending: 145, rate: '92%' },
  },
  {
    id: 'inventory',
    name: 'Inventory Control',
    desc: 'Real-time inventory tracking and optimization',
    icon: Package,
    color: '#0ea5e9',
    gradient: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
    available: false,
    stats: { active: 2345, pending: 456, rate: '88%' },
  },
];

// 15 ENTERPRISE USERS
const U = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@massy.com',
    role: 'approver',
    dept: 'Finance',
    title: 'Finance Manager',
    status: 'active',
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.c@massy.com',
    role: 'approver',
    dept: 'Operations',
    title: 'VP Operations',
    status: 'active',
  },
  {
    id: '3',
    name: 'David Park',
    email: 'david.p@massy.com',
    role: 'approver',
    dept: 'Marketing',
    title: 'Marketing Director',
    status: 'active',
  },
  {
    id: '4',
    name: 'Jennifer Lee',
    email: 'jennifer.l@massy.com',
    role: 'admin',
    dept: 'HR',
    title: 'HR Director',
    status: 'active',
  },
  {
    id: '5',
    name: 'John Smith',
    email: 'john.s@massy.com',
    role: 'requester',
    dept: 'Procurement',
    title: 'Procurement Lead',
    status: 'active',
  },
  {
    id: '6',
    name: 'Maria Garcia',
    email: 'maria.g@massy.com',
    role: 'requester',
    dept: 'IT',
    title: 'IT Coordinator',
    status: 'active',
  },
  {
    id: '7',
    name: 'Robert Wilson',
    email: 'robert.w@massy.com',
    role: 'approver',
    dept: 'Executive',
    title: 'CFO',
    status: 'active',
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    email: 'lisa.a@massy.com',
    role: 'requester',
    dept: 'Marketing',
    title: 'Marketing Coordinator',
    status: 'active',
  },
  {
    id: '9',
    name: 'James Taylor',
    email: 'james.t@massy.com',
    role: 'approver',
    dept: 'Legal',
    title: 'Legal Counsel',
    status: 'active',
  },
  {
    id: '10',
    name: 'Emma Davis',
    email: 'emma.d@massy.com',
    role: 'approver',
    dept: 'IT',
    title: 'CTO',
    status: 'active',
  },
  {
    id: '11',
    name: 'Ryan Martinez',
    email: 'ryan.m@massy.com',
    role: 'requester',
    dept: 'Operations',
    title: 'Operations Analyst',
    status: 'active',
  },
  {
    id: '12',
    name: 'Sophie Brown',
    email: 'sophie.b@massy.com',
    role: 'approver',
    dept: 'HR',
    title: 'VP Human Resources',
    status: 'active',
  },
  {
    id: '13',
    name: 'Oliver White',
    email: 'oliver.w@massy.com',
    role: 'requester',
    dept: 'Finance',
    title: 'Financial Analyst',
    status: 'active',
  },
  {
    id: '14',
    name: 'Ava Thompson',
    email: 'ava.t@massy.com',
    role: 'approver',
    dept: 'Procurement',
    title: 'Chief Procurement Officer',
    status: 'active',
  },
  {
    id: '15',
    name: 'Ethan Clark',
    email: 'ethan.c@massy.com',
    role: 'requester',
    dept: 'Legal',
    title: 'Compliance Officer',
    status: 'active',
  },
];

// 8 EDITABLE WORKFLOWS
const INITIAL_WORKFLOWS = [
  {
    id: 'w1',
    name: 'GRN Approval',
    desc: 'Goods Receipt Note verification with finance and operations sign-off',
    steps: [
      { r: 'Finance Manager', a: 'Budget Check', s: '24h' },
      { r: 'VP Operations', a: 'Quality Approval', s: '48h' },
    ],
    dt: 'GRN',
    on: 1,
    n: 142,
    rt: 98,
  },
  {
    id: 'w2',
    name: 'Purchase Order',
    desc: 'Multi-level PO approval with budget check and executive sign-off',
    steps: [
      { r: 'Finance Manager', a: 'Budget Verification', s: '48h' },
      { r: 'Department Head', a: 'Authorization', s: '48h' },
      { r: 'CFO', a: 'Final Approval (>$10k)', s: '72h' },
    ],
    dt: 'Purchase Order',
    on: 1,
    n: 89,
    rt: 95,
  },
  {
    id: 'w3',
    name: 'Leave Request',
    desc: 'Employee leave approval through manager and HR review',
    steps: [
      { r: 'Direct Manager', a: 'Team Review', s: '24h' },
      { r: 'HR Director', a: 'Policy Compliance', s: '48h' },
    ],
    dt: 'Leave Request',
    on: 1,
    n: 234,
    rt: 99,
  },
  {
    id: 'w4',
    name: 'Expense Report',
    desc: 'Employee expense reimbursement with receipt validation',
    steps: [
      { r: 'Manager', a: 'Initial Verify', s: '24h' },
      { r: 'Finance Team', a: 'Receipt Validation', s: '48h' },
      { r: 'Finance Manager', a: 'Final Approval', s: '72h' },
    ],
    dt: 'Expense Report',
    on: 1,
    n: 178,
    rt: 92,
  },
  {
    id: 'w5',
    name: 'Vendor Invoice',
    desc: 'Vendor payment processing with three-way match verification',
    steps: [
      { r: 'AP Team', a: 'Three-way Match', s: '24h' },
      { r: 'Finance Manager', a: 'Payment Authorization', s: '48h' },
    ],
    dt: 'Vendor Invoice',
    on: 1,
    n: 56,
    rt: 88,
  },
  {
    id: 'w6',
    name: 'Contract Approval',
    desc: 'Legal contract review and executive approval workflow',
    steps: [
      { r: 'Legal Counsel', a: 'Legal Review', s: '72h' },
      { r: 'Finance Manager', a: 'Financial Terms', s: '48h' },
      { r: 'CFO', a: 'Executive Approval', s: '96h' },
    ],
    dt: 'Contract',
    on: 1,
    n: 45,
    rt: 94,
  },
  {
    id: 'w7',
    name: 'IT Asset Request',
    desc: 'Hardware and software procurement approval',
    steps: [
      { r: 'IT Manager', a: 'Technical Review', s: '48h' },
      { r: 'CTO', a: 'Strategic Alignment', s: '72h' },
      { r: 'Finance Manager', a: 'Budget Approval', s: '48h' },
    ],
    dt: 'IT Asset Request',
    on: 0,
    n: 67,
    rt: 91,
  },
  {
    id: 'w8',
    name: 'Capital Expenditure',
    desc: 'Major capital investment approval chain',
    steps: [
      { r: 'Department Head', a: 'Business Case', s: '96h' },
      { r: 'Finance Manager', a: 'Financial Analysis', s: '96h' },
      { r: 'CFO', a: 'Risk Assessment', s: '120h' },
      { r: 'CEO', a: 'Final Authorization', s: '120h' },
    ],
    dt: 'CapEx',
    on: 1,
    n: 23,
    rt: 87,
  },
];

// 10 SAMPLE DOCUMENTS (including $875k CapEx)
const INITIAL_DOCS = [
  {
    id: 'GRN-2026-001',
    title: 'Office Supplies - Q1 2026',
    type: 'GRN',
    status: 'pending',
    by: 'John Smith',
    at: '2026-02-08',
    desc: 'Premium office supplies including paper, pens, and archival folders for Q1 operations.',
    amt: 2450,
    pri: 'medium',
    due: '2026-02-10',
    dept: 'Procurement',
    vnd: 'Office Depot',
    items: [
      { n: 'Paper A4 Premium', q: 50, p: 25 },
      { n: 'Ballpoint Pens', q: 20, p: 15 },
      { n: 'Archival Folders', q: 100, p: 12 },
    ],
    ap: [
      {
        id: 'a1',
        uid: '1',
        nm: 'Sarah Johnson',
        rl: 'Finance Manager',
        st: 'pending',
      },
      {
        id: 'a2',
        uid: '2',
        nm: 'Michael Chen',
        rl: 'VP Operations',
        st: 'pending',
      },
    ],
    tr: [
      {
        a: 'Created',
        u: 'John Smith',
        t: '02/08 09:30',
        d: 'Initial submission',
      },
      {
        a: 'Routed',
        u: 'System',
        t: '02/08 09:31',
        d: 'Sent to Sarah Johnson',
      },
    ],
  },
  {
    id: 'GRN-2026-002',
    title: 'IT Hardware Refresh - Engineering',
    type: 'GRN',
    status: 'in_progress',
    by: 'Maria Garcia',
    at: '2026-02-07',
    desc: 'Laptops, peripherals, and monitors for Q1 engineering team hardware refresh.',
    amt: 15750,
    pri: 'high',
    due: '2026-02-09',
    dept: 'IT',
    vnd: 'Tech Solutions Inc',
    items: [
      { n: 'Dell Laptop XPS 15', q: 5, p: 1200 },
      { n: 'Wireless Mouse', q: 10, p: 35 },
      { n: 'USB-C Hub', q: 5, p: 75 },
      { n: '27" Monitor', q: 5, p: 400 },
    ],
    ap: [
      {
        id: 'a3',
        uid: '1',
        nm: 'Sarah Johnson',
        rl: 'Finance Manager',
        st: 'approved',
        ts: '02/08 08:20',
        cm: 'Budget verified and approved.',
        sg: 'SJ',
      },
      {
        id: 'a4',
        uid: '2',
        nm: 'Michael Chen',
        rl: 'VP Operations',
        st: 'pending',
      },
    ],
    tr: [
      {
        a: 'Created',
        u: 'Maria Garcia',
        t: '02/07 14:15',
        d: 'IT hardware request submitted',
      },
      {
        a: 'Approved 1/2',
        u: 'Sarah Johnson',
        t: '02/08 08:20',
        d: 'Finance approved',
      },
    ],
  },
  {
    id: 'PO-2026-045',
    title: 'Marketing Materials - Q1 Campaign',
    type: 'Purchase Order',
    status: 'completed',
    by: 'Lisa Anderson',
    at: '2026-02-06',
    desc: 'Q1 marketing campaign materials including banners, brochures, and branded merchandise.',
    amt: 8900,
    pri: 'medium',
    dept: 'Marketing',
    vnd: 'PrintPro Solutions',
    items: [
      { n: 'Trade Show Banners', q: 20, p: 125 },
      { n: 'Product Brochures', q: 5000, p: 0.38 },
      { n: 'Branded Tote Bags', q: 500, p: 8 },
    ],
    ap: [
      {
        id: 'a5',
        uid: '3',
        nm: 'David Park',
        rl: 'Marketing Director',
        st: 'approved',
        ts: '02/07 10:30',
        cm: 'Q1 campaign approved.',
        sg: 'DP',
      },
      {
        id: 'a6',
        uid: '1',
        nm: 'Sarah Johnson',
        rl: 'Finance Manager',
        st: 'approved',
        ts: '02/07 16:45',
        cm: 'Within quarterly budget.',
        sg: 'SJ',
      },
    ],
    tr: [
      { a: 'Created', u: 'Lisa Anderson', t: '02/06 11:00', d: 'PO submitted' },
      {
        a: 'Approved 1/2',
        u: 'David Park',
        t: '02/07 10:30',
        d: 'Marketing approved',
      },
      {
        a: 'Approved 2/2',
        u: 'Sarah Johnson',
        t: '02/07 16:45',
        d: 'Finance approved',
      },
      {
        a: 'Completed',
        u: 'System',
        t: '02/07 16:45',
        d: 'All approvals received',
      },
    ],
  },
  {
    id: 'LR-2026-012',
    title: 'Annual Leave - February 2026',
    type: 'Leave Request',
    status: 'pending',
    by: 'Maria Garcia',
    at: '2026-02-08',
    desc: 'Annual leave request for Feb 20-28, 2026. Team coverage arranged with backup.',
    amt: 0,
    pri: 'low',
    due: '2026-02-15',
    dept: 'IT',
    ap: [
      {
        id: 'a7',
        uid: '4',
        nm: 'Jennifer Lee',
        rl: 'HR Director',
        st: 'pending',
      },
    ],
    tr: [
      {
        a: 'Created',
        u: 'Maria Garcia',
        t: '02/08 10:00',
        d: 'Leave request submitted',
      },
    ],
  },
  {
    id: 'EXP-2026-008',
    title: 'Client Dinner - Acme Corp',
    type: 'Expense Report',
    status: 'rejected',
    by: 'David Park',
    at: '2026-02-05',
    desc: 'Client entertainment expense for Acme Corp dinner meeting. Missing itemized receipt.',
    amt: 475.5,
    pri: 'medium',
    dept: 'Marketing',
    vnd: 'The Capital Grille',
    ap: [
      {
        id: 'a8',
        uid: '1',
        nm: 'Sarah Johnson',
        rl: 'Finance Manager',
        st: 'rejected',
        ts: '02/06 09:15',
        cm: 'Please provide itemized receipt per policy.',
      },
    ],
    tr: [
      {
        a: 'Created',
        u: 'David Park',
        t: '02/05 15:30',
        d: 'Expense submitted',
      },
      {
        a: 'Rejected',
        u: 'Sarah Johnson',
        t: '02/06 09:15',
        d: 'Missing documentation',
      },
    ],
  },
  {
    id: 'VI-2026-003',
    title: 'AWS Cloud Services - January 2026',
    type: 'Vendor Invoice',
    status: 'in_progress',
    by: 'Maria Garcia',
    at: '2026-02-07',
    desc: 'Monthly AWS cloud infrastructure invoice. Three-way match verified.',
    amt: 12340,
    pri: 'high',
    due: '2026-02-12',
    dept: 'IT',
    vnd: 'Amazon Web Services',
    ap: [
      {
        id: 'a9',
        uid: '2',
        nm: 'Michael Chen',
        rl: 'VP Operations',
        st: 'approved',
        ts: '02/08 11:00',
        cm: 'Usage confirmed.',
        sg: 'MC',
      },
      {
        id: 'a10',
        uid: '1',
        nm: 'Sarah Johnson',
        rl: 'Finance Manager',
        st: 'pending',
      },
    ],
    tr: [
      {
        a: 'Created',
        u: 'Maria Garcia',
        t: '02/07 08:45',
        d: 'Invoice received',
      },
      {
        a: 'Approved 1/2',
        u: 'Michael Chen',
        t: '02/08 11:00',
        d: 'Operations verified',
      },
    ],
  },
  {
    id: 'PO-2026-046',
    title: 'Ergonomic Office Furniture',
    type: 'Purchase Order',
    status: 'draft',
    by: 'John Smith',
    at: '2026-02-08',
    desc: 'Standing desks and ergonomic chairs for employee wellness program.',
    amt: 22500,
    pri: 'medium',
    dept: 'Procurement',
    vnd: 'Herman Miller',
    items: [
      { n: 'Aeron Chair', q: 15, p: 1200 },
      { n: 'Nevi Standing Desk', q: 10, p: 900 },
    ],
    ap: [],
    tr: [
      {
        a: 'Draft Created',
        u: 'John Smith',
        t: '02/08 13:00',
        d: 'Saved as draft',
      },
    ],
  },
  {
    id: 'PO-2026-047',
    title: 'Annual Software Licenses - Enterprise Suite',
    type: 'Purchase Order',
    status: 'pending',
    by: 'Maria Garcia',
    at: '2026-02-09',
    desc: 'Annual renewal for enterprise software suite including Microsoft 365, Salesforce, and Adobe Creative Cloud.',
    amt: 45780,
    pri: 'high',
    due: '2026-02-15',
    dept: 'IT',
    vnd: 'Software Licensing Corp',
    items: [
      { n: 'Microsoft 365 E5', q: 150, p: 168 },
      { n: 'Salesforce Enterprise', q: 75, p: 225 },
      { n: 'Adobe Creative Cloud', q: 20, p: 599 },
    ],
    ap: [
      { id: 'a11', uid: '10', nm: 'Emma Davis', rl: 'CTO', st: 'pending' },
      {
        id: 'a12',
        uid: '1',
        nm: 'Sarah Johnson',
        rl: 'Finance Manager',
        st: 'pending',
      },
    ],
    tr: [
      {
        a: 'Created',
        u: 'Maria Garcia',
        t: '02/09 09:15',
        d: 'License renewal request',
      },
      {
        a: 'Routed',
        u: 'System',
        t: '02/09 09:16',
        d: 'Sent to CTO for review',
      },
    ],
  },
  {
    id: 'CON-2026-001',
    title: 'Vendor Service Agreement - Logistics Partner',
    type: 'Contract',
    status: 'pending',
    by: 'Ryan Martinez',
    at: '2026-02-08',
    desc: '3-year logistics and warehousing service agreement with preferred vendor.',
    amt: 250000,
    pri: 'urgent',
    due: '2026-02-20',
    dept: 'Operations',
    vnd: 'Global Logistics Inc',
    ap: [
      {
        id: 'a13',
        uid: '9',
        nm: 'James Taylor',
        rl: 'Legal Counsel',
        st: 'pending',
      },
      {
        id: 'a14',
        uid: '1',
        nm: 'Sarah Johnson',
        rl: 'Finance Manager',
        st: 'pending',
      },
      { id: 'a15', uid: '7', nm: 'Robert Wilson', rl: 'CFO', st: 'pending' },
    ],
    tr: [
      {
        a: 'Created',
        u: 'Ryan Martinez',
        t: '02/08 14:30',
        d: 'Contract review requested',
      },
      {
        a: 'Routed',
        u: 'System',
        t: '02/08 14:31',
        d: 'Sent to Legal for review',
      },
    ],
  },
  {
    id: 'CAPEX-2026-001',
    title: 'Warehouse Automation System',
    type: 'CapEx',
    status: 'in_progress',
    by: 'Michael Chen',
    at: '2026-02-05',
    desc: 'Capital investment for automated warehouse management system with ROI of 3.2 years.',
    amt: 875000,
    pri: 'urgent',
    due: '2026-02-28',
    dept: 'Operations',
    vnd: 'AutoWare Systems',
    ap: [
      {
        id: 'a16',
        uid: '2',
        nm: 'Michael Chen',
        rl: 'VP Operations',
        st: 'approved',
        ts: '02/05 16:00',
        cm: 'Business case validated.',
        sg: 'MC',
      },
      {
        id: 'a17',
        uid: '1',
        nm: 'Sarah Johnson',
        rl: 'Finance Manager',
        st: 'approved',
        ts: '02/06 10:30',
        cm: 'Financial analysis complete.',
        sg: 'SJ',
      },
      { id: 'a18', uid: '7', nm: 'Robert Wilson', rl: 'CFO', st: 'pending' },
    ],
    tr: [
      {
        a: 'Created',
        u: 'Michael Chen',
        t: '02/05 10:00',
        d: 'CapEx proposal submitted',
      },
      {
        a: 'Approved 1/3',
        u: 'Michael Chen',
        t: '02/05 16:00',
        d: 'Operations approved',
      },
      {
        a: 'Approved 2/3',
        u: 'Sarah Johnson',
        t: '02/06 10:30',
        d: 'Finance approved',
      },
    ],
  },
];

const cM = [
  { m: 'Sep', sub: 45, app: 38, rej: 4, avg: 3.2 },
  { m: 'Oct', sub: 52, app: 44, rej: 5, avg: 2.9 },
  { m: 'Nov', sub: 48, app: 42, rej: 3, avg: 2.7 },
  { m: 'Dec', sub: 38, app: 34, rej: 2, avg: 2.5 },
  { m: 'Jan', sub: 61, app: 53, rej: 4, avg: 2.4 },
  { m: 'Feb', sub: 35, app: 24, rej: 3, avg: 2.3 },
];

const cD = [
  { name: 'Finance', value: 42, color: '#3b82f6' },
  { name: 'Operations', value: 38, color: '#10b981' },
  { name: 'Marketing', value: 28, color: '#f59e0b' },
  { name: 'IT', value: 45, color: '#8b5cf6' },
  { name: 'HR', value: 22, color: '#ec4899' },
  { name: 'Procurement', value: 34, color: '#06b6d4' },
  { name: 'Legal', value: 18, color: '#f43f5e' },
];

const cT = [
  { w: 'W1', t: 3.8 },
  { w: 'W2', t: 3.5 },
  { w: 'W3', t: 3.1 },
  { w: 'W4', t: 2.9 },
  { w: 'W5', t: 2.7 },
  { w: 'W6', t: 2.5 },
  { w: 'W7', t: 2.4 },
  { w: 'W8', t: 2.3 },
];

const DT = [
  'GRN',
  'Purchase Order',
  'Leave Request',
  'Expense Report',
  'Vendor Invoice',
  'Contract',
  'IT Asset Request',
  'CapEx',
];
const DP = [
  'Finance',
  'Operations',
  'Marketing',
  'HR',
  'Procurement',
  'IT',
  'Legal',
  'Executive',
];

// Styles
const si = {
  padding: '7px 12px',
  border: '1px solid #e2e8f0',
  borderRadius: 6,
  fontSize: 13,
  cursor: 'pointer',
  background: '#fff',
};
const ii = {
  width: '100%',
  padding: '9px 12px',
  border: '1px solid #e2e8f0',
  borderRadius: 8,
  fontSize: 14,
  fontFamily: 'inherit',
  outline: 'none',
};
const bt = (bg = '#3b82f6', fg = '#fff') => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  padding: '9px 18px',
  background: bg,
  color: fg,
  border: bg === '#fff' ? '1px solid #e2e8f0' : 'none',
  borderRadius: 8,
  fontWeight: 600,
  fontSize: 13,
  cursor: 'pointer',
});

const SB = ({ s }) => {
  const m = {
    draft: { b: '#f1f5f9', c: '#64748b' },
    pending: { b: '#fffbeb', c: '#b45309' },
    in_progress: { b: '#eff6ff', c: '#2563eb' },
    completed: { b: '#ecfdf5', c: '#047857' },
    rejected: { b: '#fef2f2', c: '#b91c1c' },
  };
  const v = m[s] || m.draft;
  return (
    <span
      style={{
        padding: '4px 10px',
        background: v.b,
        color: v.c,
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 600,
      }}
    >
      {s.replace('_', ' ')}
    </span>
  );
};

const PB = ({ p }) => {
  const c = {
    urgent: '#ef4444',
    high: '#f59e0b',
    medium: '#3b82f6',
    low: '#94a3b8',
  };
  return (
    <span
      style={{
        padding: '3px 8px',
        background: `${c[p]}15`,
        color: c[p],
        borderRadius: 4,
        fontSize: 11,
        fontWeight: 600,
        textTransform: 'uppercase',
      }}
    >
      {p}
    </span>
  );
};

const STORAGE_KEYS = {
  DOCS: 'approval_docs',
  NOTIFS: 'approval_notifs',
  CURRENT_USER: 'approval_current_user',
  WORKFLOWS: 'approval_workflows',
  ACTIVE_MODULE: 'active_module',
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
};

const loadFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Error loading from localStorage:', e);
    return defaultValue;
  }
};

// ============================================================
// LANDING SCREEN COMPONENT
// ============================================================

const LandingScreen = ({ onModuleSelect, currentUser }) => {
  const [hoveredModule, setHoveredModule] = useState(null);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <header
        style={{
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding: '20px 40px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                width: 48,
                height: 48,
                background: '#fff',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Building2 size={28} style={{ color: '#667eea' }} />
            </div>
            <div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 24,
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                Massy Enterprise Suite
              </h1>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: 'rgba(255,255,255,0.8)',
                }}
              >
                Unified Business Management Platform
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              style={{
                padding: '8px 16px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: 8,
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.8)',
                  marginBottom: 2,
                }}
              >
                Logged in as
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>
                {currentUser.name}
              </div>
            </div>
            <div
              style={{
                width: 44,
                height: 44,
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: 16,
                color: '#fff',
              }}
            >
              {currentUser.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
          </div>
        </div>
      </header>

      <div
        style={{ maxWidth: 1400, margin: '0 auto', padding: '60px 40px 40px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <h2
            style={{
              margin: 0,
              marginBottom: 16,
              fontSize: 42,
              fontWeight: 700,
              color: '#fff',
              textShadow: '0 2px 20px rgba(0,0,0,0.2)',
            }}
          >
            Enterprise Business Solutions
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 18,
              color: 'rgba(255,255,255,0.9)',
              maxWidth: 700,
              margin: '0 auto',
            }}
          >
            Streamline operations across your organization with our
            comprehensive suite of integrated business applications
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
            marginBottom: 50,
          }}
        >
          {[
            {
              label: 'Active Users',
              value: '1,245',
              icon: Users,
              color: '#10b981',
            },
            {
              label: 'Workflows',
              value: '142',
              icon: GitBranch,
              color: '#3b82f6',
            },
            {
              label: 'Documents',
              value: '15.7K',
              icon: FileText,
              color: '#f59e0b',
            },
            { label: 'Uptime', value: '99.9%', icon: Zap, color: '#8b5cf6' },
          ].map((stat, idx) => (
            <div
              key={idx}
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: 16,
                padding: 24,
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.8)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {stat.label}
                </div>
                <stat.icon size={22} style={{ color: stat.color }} />
              </div>
              <div style={{ fontSize: 36, fontWeight: 700, color: '#fff' }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: '#fff',
              marginBottom: 24,
              textAlign: 'center',
            }}
          >
            Select a Module to Get Started
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 24,
            }}
          >
            {ENTERPRISE_MODULES.map((module) => (
              <div
                key={module.id}
                onClick={() => {
                  if (module.available) onModuleSelect(module.id);
                }}
                onMouseEnter={() => setHoveredModule(module.id)}
                onMouseLeave={() => setHoveredModule(null)}
                style={{
                  background:
                    hoveredModule === module.id
                      ? 'rgba(255,255,255,0.25)'
                      : 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 20,
                  padding: 28,
                  border:
                    hoveredModule === module.id
                      ? '2px solid rgba(255,255,255,0.4)'
                      : '2px solid rgba(255,255,255,0.2)',
                  cursor: module.available ? 'pointer' : 'not-allowed',
                  opacity: module.available ? 1 : 0.6,
                  transition: 'all 0.3s ease',
                  transform:
                    hoveredModule === module.id && module.available
                      ? 'translateY(-4px) scale(1.02)'
                      : 'translateY(0) scale(1)',
                  boxShadow:
                    hoveredModule === module.id
                      ? '0 20px 60px rgba(0,0,0,0.3)'
                      : '0 10px 30px rgba(0,0,0,0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '50%',
                    height: '100%',
                    background: module.gradient,
                    opacity: 0.1,
                    borderRadius: '50%',
                    filter: 'blur(40px)',
                    pointerEvents: 'none',
                  }}
                />
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: 16,
                    }}
                  >
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        background: module.available
                          ? module.gradient
                          : 'rgba(148,163,184,0.3)',
                        borderRadius: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                      }}
                    >
                      <module.icon size={28} style={{ color: '#fff' }} />
                    </div>
                    {module.available ? (
                      <span
                        style={{
                          padding: '6px 12px',
                          background: '#10b981',
                          color: '#fff',
                          borderRadius: 8,
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        Active
                      </span>
                    ) : (
                      <span
                        style={{
                          padding: '6px 12px',
                          background: 'rgba(148,163,184,0.3)',
                          color: 'rgba(255,255,255,0.8)',
                          borderRadius: 8,
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        Soon
                      </span>
                    )}
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      marginBottom: 10,
                      fontSize: 20,
                      fontWeight: 700,
                      color: '#fff',
                    }}
                  >
                    {module.name}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      marginBottom: 20,
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.6,
                    }}
                  >
                    {module.desc}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingTop: 16,
                      borderTop: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          color: 'rgba(255,255,255,0.7)',
                          marginBottom: 4,
                        }}
                      >
                        Active
                      </div>
                      <div
                        style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}
                      >
                        {module.stats.active}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          color: 'rgba(255,255,255,0.7)',
                          marginBottom: 4,
                        }}
                      >
                        Pending
                      </div>
                      <div
                        style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}
                      >
                        {module.stats.pending}
                      </div>
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 11,
                          color: 'rgba(255,255,255,0.7)',
                          marginBottom: 4,
                        }}
                      >
                        Success Rate
                      </div>
                      <div
                        style={{
                          fontSize: 18,
                          fontWeight: 700,
                          color: '#10b981',
                        }}
                      >
                        {module.stats.rate}
                      </div>
                    </div>
                  </div>
                  {module.available && (
                    <div
                      style={{
                        marginTop: 20,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        color: '#fff',
                        fontSize: 14,
                        fontWeight: 600,
                      }}
                    >
                      Launch Module <ArrowRight size={18} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 60,
            textAlign: 'center',
            padding: '30px 0',
            borderTop: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <p
            style={{ margin: 0, fontSize: 13, color: 'rgba(255,255,255,0.7)' }}
          >
            © 2026 Massy Enterprise Suite. All rights reserved. | Version 2.5.0
            | <span style={{ color: '#10b981' }}>● System Operational</span>
          </p>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// MAIN APP COMPONENT
// ============================================================

export default function App() {
  // Module selection state
  const [activeModule, setActiveModule] = useState(() =>
    loadFromStorage(STORAGE_KEYS.ACTIVE_MODULE, null)
  );

  // Approval Hub states
  const [vw, setVw] = useState('dashboard');
  const [docs, setDocs] = useState(() =>
    loadFromStorage(STORAGE_KEYS.DOCS, INITIAL_DOCS)
  );
  const [workflows, setWorkflows] = useState(() =>
    loadFromStorage(STORAGE_KEYS.WORKFLOWS, INITIAL_WORKFLOWS)
  );
  const [sel, setSel] = useState(null);
  const [modal, setModal] = useState(null);
  const [showN, setShowN] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [sb, setSb] = useState(true);
  const [sq, setSq] = useState('');
  const [fS, setFS] = useState('all');
  const [fT, setFT] = useState('all');
  const [fD, setFD] = useState('all');
  const [cu, setCu] = useState(() =>
    loadFromStorage(STORAGE_KEYS.CURRENT_USER, U[0])
  );
  const [selWf, setSelWf] = useState(null);
  const [sTab, setSTab] = useState('users');
  const [notifs, setNotifs] = useState(() =>
    loadFromStorage(STORAGE_KEYS.NOTIFS, [
      {
        id: 'n1',
        title: 'Approval Required',
        msg: 'GRN-2026-001 needs your signature',
        type: 'warning',
        ts: '02/08 09:31',
        read: false,
      },
      {
        id: 'n2',
        title: 'Completed',
        msg: 'PO-2026-045 fully approved',
        type: 'success',
        ts: '02/07 16:45',
        read: true,
      },
      {
        id: 'n3',
        title: 'Urgent',
        msg: 'CAPEX-2026-001 requires CFO approval',
        type: 'warning',
        ts: '02/06 10:31',
        read: false,
      },
    ])
  );
  const [sig, setSig] = useState('');
  const [cmt, setCmt] = useState('');
  const [rTo, setRTo] = useState('');
  const [rN, setRN] = useState('');
  const [nd, setNd] = useState({
    title: '',
    type: 'GRN',
    desc: '',
    amt: '',
    pri: 'medium',
    vnd: '',
    dept: 'Procurement',
    due: '',
    items: [{ n: '', q: 1, p: 0 }],
  });
  const [editingWf, setEditingWf] = useState(null);

  const cRef = useRef(null);

  // Persistence effects
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.DOCS, docs);
  }, [docs]);
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.WORKFLOWS, workflows);
  }, [workflows]);
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.NOTIFS, notifs);
  }, [notifs]);
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CURRENT_USER, cu);
  }, [cu]);
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ACTIVE_MODULE, activeModule);
  }, [activeModule]);

  // Helper functions
  const now = () => new Date().toLocaleString();
  const notify = (t, m, ty = 'info') => {
    setNotifs((p) => [
      {
        id: `n${Date.now()}`,
        title: t,
        msg: m,
        type: ty,
        ts: now(),
        read: false,
      },
      ...p,
    ]);
  };

  // Stats
  const st = {
    total: docs.length,
    pend: docs.filter((d) =>
      d.ap?.some((a) => a.uid === cu.id && a.st === 'pending')
    ).length,
    done: docs.filter((d) => d.status === 'completed').length,
    rej: docs.filter((d) => d.status === 'rejected').length,
    prog: docs.filter((d) => d.status === 'in_progress').length,
    dft: docs.filter((d) => d.status === 'draft').length,
  };

  // Filtered documents
  const fd = docs.filter((d) => {
    const q = sq.toLowerCase();
    return (
      (!q ||
        d.title.toLowerCase().includes(q) ||
        d.id.toLowerCase().includes(q) ||
        d.desc.toLowerCase().includes(q)) &&
      (fS === 'all' || d.status === fS) &&
      (fT === 'all' || d.type === fT) &&
      (fD === 'all' || d.dept === fD)
    );
  });

  // Module handlers
  const handleModuleSelect = (moduleId) => {
    setActiveModule(moduleId);
    notify(
      'Module Loaded',
      `Switched to ${ENTERPRISE_MODULES.find((m) => m.id === moduleId)?.name}`,
      'success'
    );
  };

  const handleBackToModules = () => {
    setActiveModule(null);
    setVw('dashboard');
  };

  // User switching
  const switchUser = (userId, e) => {
    if (e) e.stopPropagation();
    const user = U.find((u) => u.id === userId);
    if (user) {
      setCu(user);
      setShowUserMenu(false);
      notify('User Switched', `Now logged in as ${user.name}`, 'info');
    }
  };

  // Document actions
  const createDoc = (e) => {
    if (e) e.preventDefault();
    if (!nd.title || !nd.desc) {
      alert('Fill required fields');
      return;
    }
    const px = {
      GRN: 'GRN',
      'Purchase Order': 'PO',
      'Leave Request': 'LR',
      'Expense Report': 'EXP',
      'Vendor Invoice': 'VI',
      Contract: 'CON',
      'IT Asset Request': 'IT',
      CapEx: 'CAPEX',
    }[nd.type];
    const id = `${px}-2026-${String(docs.length + 1).padStart(3, '0')}`;
    const its = nd.items.filter((i) => i.n.trim());
    setDocs((p) => [
      {
        id,
        title: nd.title,
        type: nd.type,
        status: 'pending',
        by: cu.name,
        at: now(),
        desc: nd.desc,
        amt: nd.amt
          ? parseFloat(nd.amt)
          : its.reduce((s, i) => s + i.q * i.p, 0) || 0,
        pri: nd.pri,
        dept: nd.dept,
        vnd: nd.vnd || undefined,
        due: nd.due || undefined,
        items: its.length ? its : undefined,
        ap: [
          {
            id: `a${Date.now()}`,
            uid: '1',
            nm: 'Sarah Johnson',
            rl: 'Finance Manager',
            st: 'pending',
          },
          {
            id: `a${Date.now() + 1}`,
            uid: '2',
            nm: 'Michael Chen',
            rl: 'VP Operations',
            st: 'pending',
          },
        ],
        tr: [
          { a: 'Created', u: cu.name, t: now(), d: 'Submitted' },
          { a: 'Routed', u: 'System', t: now(), d: '→ Sarah Johnson' },
        ],
      },
      ...p,
    ]);
    setModal(null);
    setNd({
      title: '',
      type: 'GRN',
      desc: '',
      amt: '',
      pri: 'medium',
      vnd: '',
      dept: cu.dept,
      due: '',
      items: [{ n: '', q: 1, p: 0 }],
    });
    notify('Created', `${id} submitted`, 'success');
  };

  const subDraft = (doc, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setDocs((p) =>
      p.map((d) =>
        d.id !== doc.id
          ? d
          : {
              ...d,
              status: 'pending',
              ap: [
                {
                  id: `a${Date.now()}`,
                  uid: '1',
                  nm: 'Sarah Johnson',
                  rl: 'Finance Manager',
                  st: 'pending',
                },
                {
                  id: `a${Date.now() + 1}`,
                  uid: '2',
                  nm: 'Michael Chen',
                  rl: 'VP Operations',
                  st: 'pending',
                },
              ],
              tr: [
                ...(d.tr || []),
                { a: 'Submitted', u: cu.name, t: now(), d: 'Draft → pending' },
              ],
            }
      )
    );
    notify('Submitted', `${doc.id} pending`, 'success');
  };

  const doApproval = (id, ok, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (ok && !sig) {
      alert('Sign first');
      return;
    }
    setDocs((p) =>
      p.map((doc) => {
        if (doc.id !== id) return doc;
        const ups = doc.ap.map((a) =>
          a.uid === cu.id && a.st === 'pending'
            ? {
                ...a,
                st: ok ? 'approved' : 'rejected',
                ts: now(),
                cm: cmt || undefined,
                sg: ok ? sig : undefined,
              }
            : a
        );
        const allOk = ups.every((a) => a.st === 'approved');
        const bad = ups.some((a) => a.st === 'rejected');
        const ns = bad ? 'rejected' : allOk ? 'completed' : 'in_progress';
        const t = [
          ...(doc.tr || []),
          {
            a: ok
              ? `Approved ${ups.filter((a) => a.st !== 'pending').length}/${
                  ups.length
                }`
              : 'Rejected',
            u: cu.name,
            t: now(),
            d: cmt || (ok ? 'Signed' : 'Rejected'),
          },
        ];
        if (ns === 'completed')
          t.push({
            a: 'Completed',
            u: 'System',
            t: now(),
            d: 'All approvals received',
          });
        notify(
          ok ? 'Approved' : 'Rejected',
          `${doc.id}`,
          ok ? 'success' : 'error'
        );
        return { ...doc, ap: ups, status: ns, tr: t };
      })
    );
    setModal(null);
    setSel(null);
    setSig('');
    setCmt('');
  };

  const doReassign = (id, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const t = U.find((u) => u.id === rTo);
    if (!t) return;
    setDocs((p) =>
      p.map((d) =>
        d.id !== id
          ? d
          : {
              ...d,
              ap: d.ap.map((a) =>
                a.uid === cu.id && a.st === 'pending'
                  ? { ...a, uid: t.id, nm: t.name, rl: t.title }
                  : a
              ),
              tr: [
                ...(d.tr || []),
                { a: 'Reassigned', u: cu.name, t: now(), d: `→ ${t.name}` },
              ],
            }
      )
    );
    notify('Reassigned', `→ ${t.name}`, 'info');
    setModal(null);
    setRTo('');
  };

  const doResub = (doc, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setDocs((p) =>
      p.map((d) =>
        d.id !== doc.id
          ? d
          : {
              ...d,
              status: 'pending',
              ap: d.ap.map((a) => ({
                ...a,
                st: 'pending',
                ts: undefined,
                cm: undefined,
                sg: undefined,
              })),
              tr: [
                ...(d.tr || []),
                { a: 'Resubmitted', u: cu.name, t: now(), d: rN || 'Revised' },
              ],
            }
      )
    );
    notify('Resubmitted', doc.id, 'info');
    setModal(null);
    setRN('');
  };

  const delDoc = (id, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (!confirm('Delete?')) return;
    setDocs((p) => p.filter((d) => d.id !== id));
    setModal(null);
    setSel(null);
    notify('Deleted', id, 'error');
  };

  const dupDoc = (doc, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const nid = `${doc.id.split('-').slice(0, -1).join('-')}-${String(
      docs.length + 1
    ).padStart(3, '0')}`;
    setDocs((p) => [
      {
        ...doc,
        id: nid,
        status: 'draft',
        by: cu.name,
        at: now(),
        ap: [],
        tr: [{ a: 'Duplicated', u: cu.name, t: now(), d: `From ${doc.id}` }],
      },
      ...p,
    ]);
    notify('Duplicated', nid, 'success');
  };

  const expDoc = (doc, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const b = new Blob([JSON.stringify(doc, null, 2)], {
      type: 'application/json',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = `${doc.id}.json`;
    a.click();
    notify('Exported', doc.id, 'success');
  };

  // Workflow actions
  const createWorkflow = (e) => {
    if (e) e.preventDefault();
    const newWf = {
      id: `w${workflows.length + 1}`,
      name: 'New Workflow',
      desc: 'Workflow description',
      steps: [{ r: 'Approver Role', a: 'Action', s: '24h' }],
      dt: 'GRN',
      on: 0,
      n: 0,
      rt: 0,
    };
    setWorkflows((p) => [...p, newWf]);
    setEditingWf(newWf);
    setModal('edit-wf');
    notify('Created', 'New workflow created', 'success');
  };

  const updateWorkflow = (e) => {
    if (e) e.preventDefault();
    if (!editingWf) return;
    setWorkflows((p) => p.map((w) => (w.id === editingWf.id ? editingWf : w)));
    setModal(null);
    setEditingWf(null);
    notify('Updated', 'Workflow saved', 'success');
  };

  const deleteWorkflow = (wfId, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (!confirm('Delete this workflow?')) return;
    setWorkflows((p) => p.filter((w) => w.id !== wfId));
    setModal(null);
    setSelWf(null);
    notify('Deleted', 'Workflow removed', 'error');
  };

  const toggleWorkflow = (wfId, e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setWorkflows((p) =>
      p.map((w) => (w.id === wfId ? { ...w, on: w.on ? 0 : 1 } : w))
    );
    notify('Updated', 'Workflow status changed', 'info');
  };

  const resetData = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    if (!confirm('Reset all data to defaults? This cannot be undone.')) return;
    localStorage.clear();
    setDocs(INITIAL_DOCS);
    setWorkflows(INITIAL_WORKFLOWS);
    setNotifs([
      {
        id: 'n1',
        title: 'Approval Required',
        msg: 'GRN-2026-001 needs signature',
        type: 'warning',
        ts: '02/08 09:31',
        read: false,
      },
      {
        id: 'n2',
        title: 'Approved',
        msg: 'PO-2026-045 complete',
        type: 'success',
        ts: '02/07 16:45',
        read: true,
      },
    ]);
    setCu(U[0]);
    setActiveModule(null);
    notify('Reset Complete', 'All data restored to defaults', 'info');
  };

  // Signature canvas
  useEffect(() => {
    if (modal !== 'sig' || !cRef.current) return;
    const c = cRef.current;
    const ctx = c.getContext('2d');
    let on = false,
      lx = 0,
      ly = 0;
    const pos = (e) => {
      const r = c.getBoundingClientRect();
      const t = e.touches ? e.touches[0] : e;
      return [t.clientX - r.left, t.clientY - r.top];
    };
    const start = (e) => {
      on = true;
      [lx, ly] = pos(e);
    };
    const move = (e) => {
      if (!on) return;
      e.preventDefault();
      const [x, y] = pos(e);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(lx, ly);
      ctx.lineTo(x, y);
      ctx.stroke();
      [lx, ly] = [x, y];
    };
    const stop = () => {
      if (on) {
        on = false;
        setSig(c.toDataURL());
      }
    };
    const ev = [
      ['mousedown', start],
      ['mousemove', move],
      ['mouseup', stop],
      ['mouseout', stop],
      ['touchstart', start],
      ['touchmove', move],
      ['touchend', stop],
    ];
    setTimeout(() => ev.forEach(([e, h]) => c.addEventListener(e, h)), 50);
    return () => ev.forEach(([e, h]) => c.removeEventListener(e, h));
  }, [modal]);

  const clrSig = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const c = cRef.current;
    if (c) {
      c.getContext('2d').clearRect(0, 0, c.width, c.height);
      setSig('');
    }
  };

  // Show landing screen if no module selected
  if (!activeModule) {
    return (
      <LandingScreen onModuleSelect={handleModuleSelect} currentUser={cu} />
    );
  }

  // ============================================================
  // MODALS
  // ============================================================

  // Document Detail Modal
  const DocModal = () => {
    if (!sel || modal !== 'doc') return null;
    const d = sel;
    const ca = d.ap?.some((a) => a.uid === cu.id && a.st === 'pending');
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setModal(null);
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            width: '90%',
            maxWidth: 800,
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}
        >
          <div
            style={{
              padding: 20,
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <h2 style={{ margin: 0, fontSize: 20 }}>{d.title}</h2>
              <div
                style={{
                  marginTop: 8,
                  display: 'flex',
                  gap: 8,
                  alignItems: 'center',
                }}
              >
                <span style={{ color: '#64748b', fontSize: 14 }}>{d.id}</span>
                <SB s={d.status} />
                <PB p={d.pri} />
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModal(null);
              }}
              style={{ ...bt('#fff', '#000'), padding: 8 }}
            >
              <X size={20} />
            </button>
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ marginBottom: 20 }}>
              <h3 style={{ fontSize: 14, color: '#64748b', marginBottom: 8 }}>
                Description
              </h3>
              <p style={{ margin: 0 }}>{d.desc}</p>
            </div>
            {d.items && d.items.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h3
                  style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}
                >
                  Items
                </h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr
                      style={{
                        background: '#f8fafc',
                        borderBottom: '2px solid #e2e8f0',
                      }}
                    >
                      {['Item', 'Qty', 'Price', 'Total'].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: 12,
                            textAlign: 'left',
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {d.items.map((i, idx) => (
                      <tr
                        key={idx}
                        style={{ borderBottom: '1px solid #e2e8f0' }}
                      >
                        <td style={{ padding: 12 }}>{i.n}</td>
                        <td style={{ padding: 12 }}>{i.q}</td>
                        <td style={{ padding: 12 }}>${i.p.toFixed(2)}</td>
                        <td style={{ padding: 12, fontWeight: 600 }}>
                          ${(i.q * i.p).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {d.amt > 0 && (
              <div
                style={{
                  padding: 16,
                  background: '#f8fafc',
                  borderRadius: 8,
                  marginBottom: 20,
                }}
              >
                <span style={{ fontSize: 14, color: '#64748b' }}>
                  Total Amount:{' '}
                </span>
                <span
                  style={{ fontSize: 20, fontWeight: 700, color: '#1e293b' }}
                >
                  ${d.amt.toLocaleString()}
                </span>
              </div>
            )}
            {d.ap && d.ap.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h3
                  style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}
                >
                  Approvers
                </h3>
                {d.ap.map((a) => (
                  <div
                    key={a.id}
                    style={{
                      padding: 12,
                      background: '#f8fafc',
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600 }}>{a.nm}</div>
                        <div style={{ fontSize: 12, color: '#64748b' }}>
                          {a.rl}
                        </div>
                      </div>
                      <SB s={a.st} />
                    </div>
                    {a.cm && (
                      <div
                        style={{ marginTop: 8, fontSize: 13, color: '#64748b' }}
                      >
                        💬 {a.cm}
                      </div>
                    )}
                    {a.sg && (
                      <div
                        style={{ marginTop: 8, fontSize: 13, color: '#059669' }}
                      >
                        ✓ Signed
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {d.tr && d.tr.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <h3
                  style={{ fontSize: 14, color: '#64748b', marginBottom: 12 }}
                >
                  Activity Trail
                </h3>
                {d.tr.map((t, idx) => (
                  <div
                    key={idx}
                    style={{ display: 'flex', gap: 12, marginBottom: 12 }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        background: '#3b82f6',
                        borderRadius: '50%',
                        marginTop: 6,
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{t.a}</div>
                      <div
                        style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}
                      >
                        {t.u} • {t.t} • {t.d}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div
              style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                marginTop: 24,
              }}
            >
              {ca && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModal('sig');
                    }}
                    style={bt('#10b981')}
                  >
                    <Check size={16} /> Approve
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      doApproval(d.id, false, e);
                    }}
                    style={bt('#ef4444')}
                  >
                    <XCircle size={16} /> Reject
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setModal('reassign');
                    }}
                    style={bt('#f59e0b')}
                  >
                    <Send size={16} /> Reassign
                  </button>
                </>
              )}
              {d.status === 'draft' && (
                <button onClick={(e) => subDraft(d, e)} style={bt('#3b82f6')}>
                  <Send size={16} /> Submit
                </button>
              )}
              {d.status === 'rejected' && d.by === cu.name && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setModal('resub');
                  }}
                  style={bt('#8b5cf6')}
                >
                  <RefreshCw size={16} /> Resubmit
                </button>
              )}
              <button onClick={(e) => dupDoc(d, e)} style={bt('#fff', '#000')}>
                <Copy size={16} /> Duplicate
              </button>
              <button onClick={(e) => expDoc(d, e)} style={bt('#fff', '#000')}>
                <Download size={16} /> Export
              </button>
              {(d.by === cu.name || cu.role === 'admin') && (
                <button
                  onClick={(e) => delDoc(d.id, e)}
                  style={bt('#fef2f2', '#ef4444')}
                >
                  <Trash2 size={16} /> Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Signature Modal
  const SigModal = () => {
    if (!sel || modal !== 'sig') return null;
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1001,
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setModal('doc');
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            padding: 24,
            width: '90%',
            maxWidth: 600,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Sign Approval</h3>
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Comments (optional)
            </label>
            <textarea
              value={cmt}
              onChange={(e) => setCmt(e.target.value)}
              placeholder="Add review comments..."
              style={{ ...ii, minHeight: 80, resize: 'vertical' }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Signature *
            </label>
            <div
              style={{
                border: '2px solid #3b82f6',
                borderRadius: 8,
                position: 'relative',
              }}
            >
              <canvas
                ref={cRef}
                width={500}
                height={150}
                style={{
                  display: 'block',
                  width: '100%',
                  cursor: 'crosshair',
                  touchAction: 'none',
                }}
              />
              {!sig && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#94a3b8',
                    pointerEvents: 'none',
                  }}
                >
                  Sign here
                </div>
              )}
            </div>
            <button
              onClick={clrSig}
              style={{ ...bt('#fff', '#000'), marginTop: 8, fontSize: 12 }}
            >
              Clear Signature
            </button>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={(e) => doApproval(sel.id, true, e)}
              disabled={!sig}
              style={{
                ...bt(sig ? '#10b981' : '#94a3b8'),
                opacity: sig ? 1 : 0.5,
              }}
            >
              <Check size={16} /> Confirm Approval
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModal('doc');
              }}
              style={bt('#fff', '#000')}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Reassign Modal
  const ReassignModal = () => {
    if (!sel || modal !== 'reassign') return null;
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1001,
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setModal('doc');
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            padding: 24,
            width: '90%',
            maxWidth: 500,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Reassign Approval</h3>
          <p style={{ color: '#64748b', marginBottom: 20 }}>
            Reassign <strong>{sel.id}</strong> to another approver
          </p>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: 'block',
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              New Approver
            </label>
            <select
              value={rTo}
              onChange={(e) => setRTo(e.target.value)}
              style={ii}
            >
              <option value="">Select approver...</option>
              {U.filter((u) => u.role === 'approver' && u.id !== cu.id).map(
                (u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} - {u.title}
                  </option>
                )
              )}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={(e) => doReassign(sel.id, e)}
              disabled={!rTo}
              style={{
                ...bt(rTo ? '#3b82f6' : '#94a3b8'),
                opacity: rTo ? 1 : 0.5,
              }}
            >
              <Send size={16} /> Reassign
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModal('doc');
              }}
              style={bt('#fff', '#000')}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Resubmit Modal
  const ResubModal = () => {
    if (!sel || modal !== 'resub') return null;
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1001,
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setModal('doc');
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            padding: 24,
            width: '90%',
            maxWidth: 500,
          }}
        >
          <h3 style={{ marginTop: 0 }}>Resubmit Document</h3>
          <p style={{ color: '#64748b', marginBottom: 20 }}>
            Resubmit <strong>{sel.id}</strong> — all approvals will be reset.
          </p>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: 'block',
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Revision Note
            </label>
            <textarea
              value={rN}
              onChange={(e) => setRN(e.target.value)}
              placeholder="Describe changes made..."
              style={{ ...ii, minHeight: 80, resize: 'vertical' }}
            />
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={(e) => doResub(sel, e)} style={bt('#8b5cf6')}>
              <RefreshCw size={16} /> Resubmit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModal('doc');
              }}
              style={bt('#fff', '#000')}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Create Document Modal
  const CreateModal = () => {
    if (modal !== 'create') return null;
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) setModal(null);
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            width: '90%',
            maxWidth: 700,
            maxHeight: '90vh',
            overflow: 'auto',
          }}
        >
          <div
            style={{
              padding: 20,
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2 style={{ margin: 0, fontSize: 20 }}>Create New Document</h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModal(null);
              }}
              style={{ ...bt('#fff', '#000'), padding: 8 }}
            >
              <X size={20} />
            </button>
          </div>
          <div style={{ padding: 20 }}>
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Document Type *
              </label>
              <select
                value={nd.type}
                onChange={(e) => setNd({ ...nd, type: e.target.value })}
                style={ii}
              >
                {DT.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Title *
              </label>
              <input
                type="text"
                value={nd.title}
                onChange={(e) => setNd({ ...nd, title: e.target.value })}
                placeholder="Enter document title..."
                style={ii}
              />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Description *
              </label>
              <textarea
                value={nd.desc}
                onChange={(e) => setNd({ ...nd, desc: e.target.value })}
                placeholder="Describe the request..."
                style={{ ...ii, minHeight: 80, resize: 'vertical' }}
              />
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: 8,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Department
                </label>
                <select
                  value={nd.dept}
                  onChange={(e) => setNd({ ...nd, dept: e.target.value })}
                  style={ii}
                >
                  {DP.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: 8,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Priority
                </label>
                <select
                  value={nd.pri}
                  onChange={(e) => setNd({ ...nd, pri: e.target.value })}
                  style={ii}
                >
                  {['low', 'medium', 'high', 'urgent'].map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
                marginBottom: 16,
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: 8,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Amount ($)
                </label>
                <input
                  type="number"
                  value={nd.amt}
                  onChange={(e) => setNd({ ...nd, amt: e.target.value })}
                  placeholder="0.00"
                  style={ii}
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    marginBottom: 8,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  Due Date
                </label>
                <input
                  type="date"
                  value={nd.due}
                  onChange={(e) => setNd({ ...nd, due: e.target.value })}
                  style={ii}
                />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Vendor
              </label>
              <input
                type="text"
                value={nd.vnd}
                onChange={(e) => setNd({ ...nd, vnd: e.target.value })}
                placeholder="Enter vendor name..."
                style={ii}
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: 'block',
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Line Items
              </label>
              {nd.items.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr auto',
                    gap: 8,
                    marginBottom: 8,
                  }}
                >
                  <input
                    type="text"
                    value={item.n}
                    onChange={(e) => {
                      const items = [...nd.items];
                      items[idx].n = e.target.value;
                      setNd({ ...nd, items });
                    }}
                    placeholder="Item name"
                    style={ii}
                  />
                  <input
                    type="number"
                    value={item.q}
                    onChange={(e) => {
                      const items = [...nd.items];
                      items[idx].q = parseInt(e.target.value) || 1;
                      setNd({ ...nd, items });
                    }}
                    placeholder="Qty"
                    style={ii}
                  />
                  <input
                    type="number"
                    value={item.p}
                    onChange={(e) => {
                      const items = [...nd.items];
                      items[idx].p = parseFloat(e.target.value) || 0;
                      setNd({ ...nd, items });
                    }}
                    placeholder="Price"
                    style={ii}
                  />
                  {nd.items.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setNd({
                          ...nd,
                          items: nd.items.filter((_, i) => i !== idx),
                        });
                      }}
                      style={{
                        ...bt('#fef2f2', '#ef4444'),
                        padding: '9px 12px',
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setNd({ ...nd, items: [...nd.items, { n: '', q: 1, p: 0 }] });
                }}
                style={{ ...bt('#fff', '#000'), fontSize: 12, marginTop: 8 }}
              >
                <Plus size={14} /> Add Item
              </button>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={createDoc} style={bt('#10b981')}>
                <Check size={16} /> Create & Submit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setModal(null);
                }}
                style={bt('#fff', '#000')}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Workflow Detail Modal
  const WfModal = () => {
    if (!selWf || modal !== 'wf') return null;
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setSelWf(null);
            setModal(null);
          }
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            padding: 24,
            width: '90%',
            maxWidth: 600,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
              marginBottom: 20,
            }}
          >
            <div>
              <h2 style={{ marginTop: 0, marginBottom: 8 }}>{selWf.name}</h2>
              <p style={{ margin: 0, color: '#64748b' }}>{selWf.desc}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelWf(null);
                setModal(null);
              }}
              style={{ ...bt('#fff', '#000'), padding: 8 }}
            >
              <X size={20} />
            </button>
          </div>
          <div style={{ marginBottom: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>
              Approval Steps
            </h3>
            {selWf.steps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: '#3b82f6',
                    color: '#fff',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                  }}
                >
                  {idx + 1}
                </div>
                <div
                  style={{
                    flex: 1,
                    padding: 12,
                    background: '#f8fafc',
                    borderRadius: 8,
                  }}
                >
                  <div style={{ fontWeight: 600 }}>{step.r}</div>
                  <div style={{ fontSize: 12, color: '#64748b' }}>
                    {step.a} • SLA: {step.s}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: 16,
              background: '#f8fafc',
              borderRadius: 8,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
              }}
            >
              <div>
                <div
                  style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}
                >
                  Total Processed
                </div>
                <div style={{ fontSize: 24, fontWeight: 700 }}>{selWf.n}</div>
              </div>
              <div>
                <div
                  style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}
                >
                  Completion Rate
                </div>
                <div
                  style={{ fontSize: 24, fontWeight: 700, color: '#10b981' }}
                >
                  {selWf.rt}%
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingWf(selWf);
                setModal('edit-wf');
              }}
              style={bt('#3b82f6')}
            >
              <Edit size={16} /> Edit
            </button>
            <button
              onClick={(e) => toggleWorkflow(selWf.id, e)}
              style={bt(selWf.on ? '#f59e0b' : '#10b981')}
            >
              {selWf.on ? 'Deactivate' : 'Activate'}
            </button>
            <button
              onClick={(e) => deleteWorkflow(selWf.id, e)}
              style={bt('#fef2f2', '#ef4444')}
            >
              <Trash2 size={16} /> Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Edit Workflow Modal
  const EditWfModal = () => {
    if (!editingWf || modal !== 'edit-wf') return null;
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1002,
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setEditingWf(null);
            setModal(null);
          }
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 12,
            padding: 24,
            width: '90%',
            maxWidth: 700,
            maxHeight: '90vh',
            overflow: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <h2 style={{ margin: 0, fontSize: 20 }}>Edit Workflow</h2>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingWf(null);
                setModal(selWf ? 'wf' : null);
              }}
              style={{ ...bt('#fff', '#000'), padding: 8 }}
            >
              <X size={20} />
            </button>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Workflow Name *
            </label>
            <input
              type="text"
              value={editingWf.name}
              onChange={(e) =>
                setEditingWf({ ...editingWf, name: e.target.value })
              }
              placeholder="Workflow name"
              style={ii}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                marginBottom: 8,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Description *
            </label>
            <textarea
              value={editingWf.desc}
              onChange={(e) =>
                setEditingWf({ ...editingWf, desc: e.target.value })
              }
              placeholder="Describe the workflow..."
              style={{ ...ii, minHeight: 80, resize: 'vertical' }}
            />
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
              marginBottom: 16,
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Document Type
              </label>
              <select
                value={editingWf.dt}
                onChange={(e) =>
                  setEditingWf({ ...editingWf, dt: e.target.value })
                }
                style={ii}
              >
                {DT.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                style={{
                  display: 'block',
                  marginBottom: 8,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                Status
              </label>
              <select
                value={editingWf.on}
                onChange={(e) =>
                  setEditingWf({ ...editingWf, on: parseInt(e.target.value) })
                }
                style={ii}
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: 'block',
                marginBottom: 12,
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              Approval Steps
            </label>
            {editingWf.steps.map((step, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: 12,
                  padding: 16,
                  background: '#f8fafc',
                  borderRadius: 8,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <span style={{ fontWeight: 600, fontSize: 14 }}>
                    Step {idx + 1}
                  </span>
                  {editingWf.steps.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingWf({
                          ...editingWf,
                          steps: editingWf.steps.filter((_, i) => i !== idx),
                        });
                      }}
                      style={{
                        ...bt('#fef2f2', '#ef4444'),
                        padding: '6px 10px',
                        fontSize: 12,
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 2fr 1fr',
                    gap: 8,
                  }}
                >
                  <input
                    type="text"
                    value={step.r}
                    onChange={(e) => {
                      const steps = [...editingWf.steps];
                      steps[idx].r = e.target.value;
                      setEditingWf({ ...editingWf, steps });
                    }}
                    placeholder="Role/Person"
                    style={ii}
                  />
                  <input
                    type="text"
                    value={step.a}
                    onChange={(e) => {
                      const steps = [...editingWf.steps];
                      steps[idx].a = e.target.value;
                      setEditingWf({ ...editingWf, steps });
                    }}
                    placeholder="Action"
                    style={ii}
                  />
                  <input
                    type="text"
                    value={step.s}
                    onChange={(e) => {
                      const steps = [...editingWf.steps];
                      steps[idx].s = e.target.value;
                      setEditingWf({ ...editingWf, steps });
                    }}
                    placeholder="SLA"
                    style={ii}
                  />
                </div>
              </div>
            ))}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingWf({
                  ...editingWf,
                  steps: [
                    ...editingWf.steps,
                    { r: 'New Role', a: 'Action', s: '24h' },
                  ],
                });
              }}
              style={{ ...bt('#fff', '#000'), fontSize: 12 }}
            >
              <Plus size={14} /> Add Step
            </button>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button onClick={updateWorkflow} style={bt('#10b981')}>
              <Save size={16} /> Save Workflow
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingWf(null);
                setModal(selWf ? 'wf' : null);
              }}
              style={bt('#fff', '#000')}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ============================================================
  // MAIN UI RENDER
  // ============================================================

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        background: '#f8fafc',
      }}
    >
      {sb && (
        <div
          style={{
            width: 240,
            background: '#1e293b',
            color: '#fff',
            padding: 20,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ marginBottom: 32 }}>
            <h1
              style={{
                margin: 0,
                fontSize: 20,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Shield size={24} />
              ApprovalHub
            </h1>
          </div>
          <button
            onClick={handleBackToModules}
            style={{
              ...bt('#fef2f2', '#ef4444'),
              width: '100%',
              marginBottom: 16,
              fontSize: 12,
              justifyContent: 'center',
            }}
          >
            <Home size={14} /> Back to Modules
          </button>
          <nav style={{ flex: 1 }}>
            {[
              { id: 'dashboard', icon: Home, label: 'Dashboard' },
              { id: 'documents', icon: FileText, label: 'Documents' },
              { id: 'workflows', icon: GitBranch, label: 'Workflows' },
              { id: 'analytics', icon: BarChart3, label: 'Analytics' },
              { id: 'settings', icon: Settings, label: 'Settings' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setVw(item.id);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  width: '100%',
                  padding: '12px 16px',
                  marginBottom: 8,
                  background: vw === item.id ? '#3b82f6' : 'transparent',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
          <div style={{ paddingTop: 20, borderTop: '1px solid #334155' }}>
            <div style={{ position: 'relative', marginBottom: 12 }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUserMenu(!showUserMenu);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '8px 12px',
                  background: '#334155',
                  border: 'none',
                  borderRadius: 8,
                  color: '#fff',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    background: '#3b82f6',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: 13,
                  }}
                >
                  {cu.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>
                    {cu.name.split(' ')[0]}
                  </div>
                  <div style={{ fontSize: 11, color: '#94a3b8' }}>
                    {cu.role}
                  </div>
                </div>
                <ChevronDown size={16} style={{ color: '#94a3b8' }} />
              </button>
              {showUserMenu && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: 0,
                    right: 0,
                    marginBottom: 8,
                    background: '#fff',
                    borderRadius: 8,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                    maxHeight: 400,
                    overflow: 'auto',
                    zIndex: 100,
                  }}
                >
                  <div
                    style={{ padding: 12, borderBottom: '1px solid #e2e8f0' }}
                  >
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#64748b',
                        marginBottom: 8,
                      }}
                    >
                      Switch User
                    </div>
                  </div>
                  {U.map((user) => (
                    <button
                      key={user.id}
                      onClick={(e) => switchUser(user.id, e)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 12px',
                        background: cu.id === user.id ? '#eff6ff' : '#fff',
                        border: 'none',
                        borderBottom: '1px solid #f1f5f9',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        if (cu.id !== user.id)
                          e.currentTarget.style.background = '#f8fafc';
                      }}
                      onMouseLeave={(e) => {
                        if (cu.id !== user.id)
                          e.currentTarget.style.background = '#fff';
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          background: cu.id === user.id ? '#3b82f6' : '#94a3b8',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 600,
                          fontSize: 11,
                          color: '#fff',
                        }}
                      >
                        {user.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#1e293b',
                          }}
                        >
                          {user.name}
                        </div>
                        <div style={{ fontSize: 11, color: '#64748b' }}>
                          {user.title} • {user.role}
                        </div>
                      </div>
                      {cu.id === user.id && (
                        <Check size={16} style={{ color: '#3b82f6' }} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={resetData}
              style={{ ...bt('#ef4444'), width: '100%', fontSize: 12 }}
            >
              <RefreshCw size={14} /> Reset Data
            </button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            background: '#fff',
            borderBottom: '1px solid #e2e8f0',
            padding: '16px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSb(!sb);
              }}
              style={{ ...bt('#fff', '#000'), padding: 8 }}
            >
              <Menu size={20} />
            </button>
            <h2 style={{ margin: 0, fontSize: 18, color: '#1e293b' }}>
              {vw.charAt(0).toUpperCase() + vw.slice(1)}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                padding: '6px 12px',
                background: '#eff6ff',
                borderRadius: 6,
                fontSize: 12,
                color: '#3b82f6',
                fontWeight: 600,
              }}
            >
              {cu.name} • {cu.title}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModal('create');
              }}
              style={bt('#3b82f6')}
            >
              <Plus size={16} /> New Document
            </button>
            <div style={{ position: 'relative' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowN(!showN);
                }}
                style={{
                  ...bt('#fff', '#000'),
                  padding: 8,
                  position: 'relative',
                }}
              >
                <Bell size={20} />
                {notifs.filter((n) => !n.read).length > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: -4,
                      right: -4,
                      width: 18,
                      height: 18,
                      background: '#ef4444',
                      color: '#fff',
                      borderRadius: '50%',
                      fontSize: 11,
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {notifs.filter((n) => !n.read).length}
                  </span>
                )}
              </button>
              {showN && (
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    marginTop: 8,
                    width: 360,
                    background: '#fff',
                    borderRadius: 12,
                    boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                    maxHeight: 480,
                    overflow: 'auto',
                    zIndex: 100,
                  }}
                >
                  <div
                    style={{
                      padding: 16,
                      borderBottom: '1px solid #e2e8f0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <h3 style={{ margin: 0, fontSize: 16 }}>Notifications</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowN(false);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <X size={18} />
                    </button>
                  </div>
                  {notifs.length === 0 ? (
                    <div
                      style={{
                        padding: 24,
                        textAlign: 'center',
                        color: '#94a3b8',
                      }}
                    >
                      No notifications
                    </div>
                  ) : (
                    notifs.map((n) => (
                      <div
                        key={n.id}
                        style={{
                          padding: 16,
                          borderBottom: '1px solid #e2e8f0',
                          background: n.read ? '#fff' : '#eff6ff',
                          cursor: 'pointer',
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setNotifs((p) =>
                            p.map((x) =>
                              x.id === n.id ? { ...x, read: true } : x
                            )
                          );
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'start',
                            marginBottom: 4,
                          }}
                        >
                          <span style={{ fontWeight: 600, fontSize: 14 }}>
                            {n.title}
                          </span>
                          <span style={{ fontSize: 11, color: '#64748b' }}>
                            {n.ts}
                          </span>
                        </div>
                        <div style={{ fontSize: 13, color: '#64748b' }}>
                          {n.msg}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        <main style={{ flex: 1, padding: 24, overflow: 'auto' }}>
          {vw === 'dashboard' && (
            <div>
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ marginTop: 0, marginBottom: 8, fontSize: 20 }}>
                  Welcome back, {cu.name.split(' ')[0]}!
                </h3>
                <p style={{ margin: 0, color: '#64748b' }}>
                  Manage and approve documents efficiently across your
                  organization
                </p>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: 16,
                  marginBottom: 32,
                }}
              >
                {[
                  {
                    label: 'Pending Approval',
                    value: st.pend,
                    icon: Clock,
                    color: '#f59e0b',
                  },
                  {
                    label: 'In Progress',
                    value: st.prog,
                    icon: Activity,
                    color: '#3b82f6',
                  },
                  {
                    label: 'Completed',
                    value: st.done,
                    icon: CheckCircle,
                    color: '#10b981',
                  },
                  {
                    label: 'Total Documents',
                    value: st.total,
                    icon: FileText,
                    color: '#8b5cf6',
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: '#fff',
                      padding: 20,
                      borderRadius: 12,
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        marginBottom: 12,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 13,
                          color: '#64748b',
                          fontWeight: 500,
                        }}
                      >
                        {stat.label}
                      </div>
                      <stat.icon size={20} style={{ color: stat.color }} />
                    </div>
                    <div
                      style={{
                        fontSize: 32,
                        fontWeight: 700,
                        color: '#1e293b',
                      }}
                    >
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                }}
              >
                <div style={{ padding: 20, borderBottom: '1px solid #e2e8f0' }}>
                  <h3 style={{ margin: 0, fontSize: 16 }}>Recent Documents</h3>
                </div>
                <div>
                  {docs.slice(0, 6).map((d) => (
                    <div
                      key={d.id}
                      style={{
                        padding: 16,
                        borderBottom: '1px solid #e2e8f0',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSel(d);
                        setModal('doc');
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f8fafc';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fff';
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 600, marginBottom: 4 }}>
                            {d.title}
                          </div>
                          <div style={{ fontSize: 13, color: '#64748b' }}>
                            {d.id} • {d.by} • {d.at}
                          </div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12,
                          }}
                        >
                          {d.amt > 0 && (
                            <span style={{ fontSize: 14, fontWeight: 600 }}>
                              ${d.amt.toLocaleString()}
                            </span>
                          )}
                          <SB s={d.status} />
                          <PB p={d.pri} />
                        </div>
                      </div>
                      {d.desc && (
                        <div
                          style={{
                            fontSize: 13,
                            color: '#64748b',
                            marginTop: 8,
                          }}
                        >
                          {d.desc.substring(0, 120)}...
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {vw === 'documents' && (
            <div>
              <div
                style={{
                  background: '#fff',
                  padding: 20,
                  borderRadius: 12,
                  border: '1px solid #e2e8f0',
                  marginBottom: 20,
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr',
                    gap: 16,
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <Search
                      size={18}
                      style={{
                        position: 'absolute',
                        left: 12,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#94a3b8',
                      }}
                    />
                    <input
                      type="text"
                      value={sq}
                      onChange={(e) => setSq(e.target.value)}
                      placeholder="Search documents..."
                      style={{ ...ii, paddingLeft: 40 }}
                    />
                  </div>
                  <select
                    value={fS}
                    onChange={(e) => setFS(e.target.value)}
                    style={si}
                  >
                    <option value="all">All Status</option>
                    <option value="draft">Draft</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <select
                    value={fT}
                    onChange={(e) => setFT(e.target.value)}
                    style={si}
                  >
                    <option value="all">All Types</option>
                    {DT.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <select
                    value={fD}
                    onChange={(e) => setFD(e.target.value)}
                    style={si}
                  >
                    <option value="all">All Departments</option>
                    {DP.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                }}
              >
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr
                      style={{
                        background: '#f8fafc',
                        borderBottom: '2px solid #e2e8f0',
                      }}
                    >
                      {[
                        'ID',
                        'Title',
                        'Type',
                        'Status',
                        'Amount',
                        'Priority',
                        'Due Date',
                        'Actions',
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: 16,
                            textAlign: 'left',
                            fontSize: 13,
                            fontWeight: 600,
                            color: '#64748b',
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fd.length === 0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          style={{
                            padding: 40,
                            textAlign: 'center',
                            color: '#94a3b8',
                          }}
                        >
                          No documents found
                        </td>
                      </tr>
                    ) : (
                      fd.map((d) => (
                        <tr
                          key={d.id}
                          style={{
                            borderBottom: '1px solid #e2e8f0',
                            cursor: 'pointer',
                            transition: 'background 0.2s',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSel(d);
                            setModal('doc');
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#f8fafc';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#fff';
                          }}
                        >
                          <td
                            style={{
                              padding: 16,
                              fontSize: 13,
                              fontWeight: 600,
                            }}
                          >
                            {d.id}
                          </td>
                          <td style={{ padding: 16 }}>
                            <div style={{ fontWeight: 600, marginBottom: 4 }}>
                              {d.title}
                            </div>
                            <div style={{ fontSize: 12, color: '#64748b' }}>
                              {d.by}
                            </div>
                          </td>
                          <td style={{ padding: 16, fontSize: 13 }}>
                            {d.type}
                          </td>
                          <td style={{ padding: 16 }}>
                            <SB s={d.status} />
                          </td>
                          <td
                            style={{
                              padding: 16,
                              fontSize: 14,
                              fontWeight: 600,
                            }}
                          >
                            {d.amt > 0 ? `$${d.amt.toLocaleString()}` : '-'}
                          </td>
                          <td style={{ padding: 16 }}>
                            <PB p={d.pri} />
                          </td>
                          <td
                            style={{
                              padding: 16,
                              fontSize: 13,
                              color: '#64748b',
                            }}
                          >
                            {d.due || '-'}
                          </td>
                          <td style={{ padding: 16 }}>
                            <div style={{ display: 'flex', gap: 8 }}>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  expDoc(d, e);
                                }}
                                style={{
                                  ...bt('#fff', '#000'),
                                  padding: '6px 10px',
                                  fontSize: 12,
                                }}
                              >
                                <Download size={14} />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  dupDoc(d, e);
                                }}
                                style={{
                                  ...bt('#fff', '#000'),
                                  padding: '6px 10px',
                                  fontSize: 12,
                                }}
                              >
                                <Copy size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {vw === 'workflows' && (
            <div>
              <div
                style={{
                  marginBottom: 24,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h3 style={{ marginTop: 0, marginBottom: 8, fontSize: 20 }}>
                    Approval Workflows
                  </h3>
                  <p style={{ margin: 0, color: '#64748b' }}>
                    Create and manage approval chains and routing rules
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    createWorkflow(e);
                  }}
                  style={bt('#10b981')}
                >
                  <Plus size={16} /> Create Workflow
                </button>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                  gap: 20,
                }}
              >
                {workflows.map((w) => (
                  <div
                    key={w.id}
                    style={{
                      background: '#fff',
                      padding: 20,
                      borderRadius: 12,
                      border: '1px solid #e2e8f0',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelWf(w);
                      setModal('wf');
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        '0 8px 24px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'start',
                        marginBottom: 12,
                      }}
                    >
                      <h3 style={{ margin: 0, fontSize: 16 }}>{w.name}</h3>
                      <span
                        style={{
                          padding: '4px 10px',
                          background: w.on ? '#ecfdf5' : '#f1f5f9',
                          color: w.on ? '#047857' : '#64748b',
                          borderRadius: 6,
                          fontSize: 11,
                          fontWeight: 600,
                        }}
                      >
                        {w.on ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        marginBottom: 16,
                        fontSize: 13,
                        color: '#64748b',
                      }}
                    >
                      {w.desc}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        gap: 8,
                        marginBottom: 16,
                        flexWrap: 'wrap',
                      }}
                    >
                      {w.steps.slice(0, 3).map((s, idx) => (
                        <div
                          key={idx}
                          style={{
                            flex: 1,
                            minWidth: 60,
                            padding: 8,
                            background: '#f8fafc',
                            borderRadius: 6,
                            fontSize: 11,
                            textAlign: 'center',
                          }}
                        >
                          <div style={{ fontWeight: 600, marginBottom: 2 }}>
                            {idx + 1}
                          </div>
                          <div style={{ color: '#64748b' }}>
                            {s.r.split(' ')[0]}
                          </div>
                        </div>
                      ))}
                      {w.steps.length > 3 && (
                        <div
                          style={{
                            width: 32,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#64748b',
                            fontSize: 11,
                          }}
                        >
                          +{w.steps.length - 3}
                        </div>
                      )}
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingTop: 12,
                        borderTop: '1px solid #e2e8f0',
                        fontSize: 12,
                      }}
                    >
                      <span style={{ color: '#64748b' }}>
                        Processed: <strong>{w.n}</strong>
                      </span>
                      <span style={{ color: '#10b981', fontWeight: 600 }}>
                        {w.rt}% success
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {vw === 'analytics' && (
            <div>
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ marginTop: 0, marginBottom: 8, fontSize: 20 }}>
                  Performance Metrics
                </h3>
                <p style={{ margin: 0, color: '#64748b' }}>
                  Track approval efficiency and organizational trends
                </p>
              </div>
              <div style={{ display: 'grid', gap: 20, marginBottom: 20 }}>
                <div
                  style={{
                    background: '#fff',
                    padding: 24,
                    borderRadius: 12,
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <h3 style={{ marginTop: 0, marginBottom: 20, fontSize: 16 }}>
                    Monthly Submission Trends
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={cM}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="m" stroke="#64748b" />
                      <YAxis stroke="#64748b" />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="sub"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.2}
                        name="Submitted"
                      />
                      <Area
                        type="monotone"
                        dataKey="app"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.2}
                        name="Approved"
                      />
                      <Area
                        type="monotone"
                        dataKey="rej"
                        stroke="#ef4444"
                        fill="#ef4444"
                        fillOpacity={0.2}
                        name="Rejected"
                      />
                      <Legend />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 20,
                  }}
                >
                  <div
                    style={{
                      background: '#fff',
                      padding: 24,
                      borderRadius: 12,
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <h3
                      style={{ marginTop: 0, marginBottom: 20, fontSize: 16 }}
                    >
                      By Department
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={cD}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label
                        >
                          {cD.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div
                    style={{
                      background: '#fff',
                      padding: 24,
                      borderRadius: 12,
                      border: '1px solid #e2e8f0',
                    }}
                  >
                    <h3
                      style={{ marginTop: 0, marginBottom: 20, fontSize: 16 }}
                    >
                      Processing Time Trend
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={cT}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="w" stroke="#64748b" />
                        <YAxis stroke="#64748b" />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="t"
                          stroke="#8b5cf6"
                          strokeWidth={3}
                          name="Avg Days"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {vw === 'settings' && (
            <div>
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ marginTop: 0, marginBottom: 8, fontSize: 20 }}>
                  System Configuration
                </h3>
                <p style={{ margin: 0, color: '#64748b' }}>
                  Manage users, roles, and system settings
                </p>
              </div>
              <div
                style={{ borderBottom: '2px solid #e2e8f0', marginBottom: 24 }}
              >
                {[
                  { id: 'users', label: 'Users', icon: Users },
                  { id: 'roles', label: 'Roles', icon: Shield },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSTab(tab.id);
                    }}
                    style={{
                      padding: '12px 20px',
                      marginRight: 8,
                      background: 'none',
                      border: 'none',
                      borderBottom:
                        sTab === tab.id
                          ? '2px solid #3b82f6'
                          : '2px solid transparent',
                      color: sTab === tab.id ? '#3b82f6' : '#64748b',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      position: 'relative',
                      top: 2,
                    }}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>
              {sTab === 'users' && (
                <div
                  style={{
                    background: '#fff',
                    borderRadius: 12,
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden',
                  }}
                >
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr
                        style={{
                          background: '#f8fafc',
                          borderBottom: '2px solid #e2e8f0',
                        }}
                      >
                        {['User', 'Email', 'Role', 'Department', 'Status'].map(
                          (h) => (
                            <th
                              key={h}
                              style={{
                                padding: 16,
                                textAlign: 'left',
                                fontSize: 13,
                                fontWeight: 600,
                              }}
                            >
                              {h}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {U.map((u) => (
                        <tr
                          key={u.id}
                          style={{ borderBottom: '1px solid #e2e8f0' }}
                        >
                          <td style={{ padding: 16 }}>
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                              }}
                            >
                              <div
                                style={{
                                  width: 40,
                                  height: 40,
                                  background: '#3b82f6',
                                  color: '#fff',
                                  borderRadius: '50%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontWeight: 600,
                                  fontSize: 14,
                                }}
                              >
                                {u.name
                                  .split(' ')
                                  .map((n) => n[0])
                                  .join('')}
                              </div>
                              <div>
                                <div style={{ fontWeight: 600 }}>{u.name}</div>
                                <div style={{ fontSize: 12, color: '#64748b' }}>
                                  {u.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: 16, fontSize: 13 }}>
                            {u.email}
                          </td>
                          <td style={{ padding: 16 }}>
                            <span
                              style={{
                                padding: '4px 10px',
                                background: '#f8fafc',
                                borderRadius: 6,
                                fontSize: 12,
                                fontWeight: 600,
                              }}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td style={{ padding: 16, fontSize: 13 }}>
                            {u.dept}
                          </td>
                          <td style={{ padding: 16 }}>
                            <span
                              style={{
                                color:
                                  u.status === 'active' ? '#10b981' : '#94a3b8',
                                fontSize: 20,
                              }}
                            >
                              ●
                            </span>
                            <span style={{ marginLeft: 8, fontSize: 13 }}>
                              {u.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {sTab === 'roles' && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 20,
                  }}
                >
                  {[
                    {
                      name: 'Admin',
                      desc: 'Full system access and configuration',
                      count: U.filter((u) => u.role === 'admin').length,
                      color: '#ef4444',
                    },
                    {
                      name: 'Approver',
                      desc: 'Can review and approve requests',
                      count: U.filter((u) => u.role === 'approver').length,
                      color: '#3b82f6',
                    },
                    {
                      name: 'Requester',
                      desc: 'Can submit and track requests',
                      count: U.filter((u) => u.role === 'requester').length,
                      color: '#10b981',
                    },
                  ].map((role) => (
                    <div
                      key={role.name}
                      style={{
                        background: '#fff',
                        padding: 24,
                        borderRadius: 12,
                        border: '1px solid #e2e8f0',
                      }}
                    >
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          background: `${role.color}15`,
                          color: role.color,
                          borderRadius: 12,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 16,
                        }}
                      >
                        <Shield size={24} />
                      </div>
                      <h3 style={{ margin: 0, marginBottom: 8, fontSize: 18 }}>
                        {role.name}
                      </h3>
                      <p
                        style={{
                          margin: 0,
                          marginBottom: 16,
                          fontSize: 13,
                          color: '#64748b',
                        }}
                      >
                        {role.desc}
                      </p>
                      <div
                        style={{
                          fontSize: 24,
                          fontWeight: 700,
                          color: role.color,
                        }}
                      >
                        {role.count} users
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <DocModal />
      <SigModal />
      <ReassignModal />
      <ResubModal />
      <CreateModal />
      <WfModal />
      <EditWfModal />
    </div>
  );
}
