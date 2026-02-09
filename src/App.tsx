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
const U = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.j@massy.com',
    role: 'approver',
    dept: 'Finance',
    title: 'Finance Mgr',
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
    title: 'Mktg Director',
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
    title: 'Mktg Coordinator',
    status: 'inactive',
  },
];
const WF = [
  {
    id: 'w1',
    name: 'GRN Approval',
    desc: 'Goods verification with finance/ops sign-off',
    steps: [
      { r: 'Finance Mgr', a: 'Budget', s: '24h' },
      { r: 'VP Ops', a: 'Approve', s: '48h' },
    ],
    dt: 'GRN',
    on: 1,
    n: 142,
    rt: 98,
  },
  {
    id: 'w2',
    name: 'Purchase Order',
    desc: 'Budget check + executive sign-off',
    steps: [
      { r: 'Finance Mgr', a: 'Budget', s: '48h' },
      { r: 'Dept Head', a: 'Auth', s: '48h' },
      { r: 'CFO', a: '>$10k', s: '72h' },
    ],
    dt: 'Purchase Order',
    on: 1,
    n: 89,
    rt: 95,
  },
  {
    id: 'w3',
    name: 'Leave Request',
    desc: 'Manager + HR review',
    steps: [
      { r: 'Manager', a: 'Review', s: '24h' },
      { r: 'HR', a: 'Policy', s: '48h' },
    ],
    dt: 'Leave Request',
    on: 1,
    n: 234,
    rt: 99,
  },
  {
    id: 'w4',
    name: 'Expense Report',
    desc: 'Receipt validation + approval',
    steps: [
      { r: 'Manager', a: 'Verify', s: '24h' },
      { r: 'Finance', a: 'Validate', s: '48h' },
      { r: 'Finance Mgr', a: 'Approve', s: '72h' },
    ],
    dt: 'Expense Report',
    on: 1,
    n: 178,
    rt: 92,
  },
  {
    id: 'w5',
    name: 'Vendor Invoice',
    desc: 'Three-way match + payment auth',
    steps: [
      { r: 'AP', a: 'Match', s: '24h' },
      { r: 'Finance Mgr', a: 'Pay Auth', s: '48h' },
    ],
    dt: 'Vendor Invoice',
    on: 0,
    n: 56,
    rt: 88,
  },
];
const ID = [
  {
    id: 'GRN-2026-001',
    title: 'Office Supplies GRN',
    type: 'GRN',
    status: 'pending',
    by: 'John Smith',
    at: '2026-02-08',
    desc: 'Premium paper, pens, archival folders for Q1.',
    amt: 2450,
    pri: 'medium',
    due: '2026-02-10',
    dept: 'Procurement',
    vnd: 'Office Depot',
    items: [
      { n: 'Paper A4', q: 50, p: 25 },
      { n: 'Pens', q: 20, p: 15 },
      { n: 'Folders', q: 100, p: 12 },
    ],
    ap: [
      {
        id: 'a1',
        uid: '1',
        nm: 'Sarah Johnson',
        rl: 'Finance Mgr',
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
      { a: 'Created', u: 'John Smith', t: '02/08 09:30', d: 'Submitted' },
      { a: 'Routed', u: 'System', t: '02/08 09:31', d: '→ Sarah Johnson' },
    ],
  },
  {
    id: 'GRN-2026-002',
    title: 'IT Hardware Refresh',
    type: 'GRN',
    status: 'in_progress',
    by: 'Maria Garcia',
    at: '2026-02-07',
    desc: 'Laptops, peripherals, monitors for Q1 refresh.',
    amt: 15750,
    pri: 'high',
    due: '2026-02-09',
    dept: 'IT',
    vnd: 'Tech Solutions',
    items: [
      { n: 'Dell Laptop', q: 5, p: 1200 },
      { n: 'Mouse', q: 10, p: 35 },
      { n: 'Hub', q: 5, p: 75 },
      { n: 'Monitor', q: 5, p: 2000 },
    ],
    ap: [
      {
        id: 'a3',
        uid: '1',
        nm: 'Sarah Johnson',
        rl: 'Finance Mgr',
        st: 'approved',
        ts: '02/08 08:20',
        cm: 'Budget verified.',
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
      { a: 'Created', u: 'Maria Garcia', t: '02/07 14:15', d: 'IT request' },
      {
        a: 'Approved 1/2',
        u: 'Sarah Johnson',
        t: '02/08 08:20',
        d: 'Finance OK',
      },
    ],
  },
  {
    id: 'PO-2026-045',
    title: 'Marketing Materials PO',
    type: 'Purchase Order',
    status: 'completed',
    by: 'Lisa Anderson',
    at: '2026-02-06',
    desc: 'Q1 banners, brochures, branded merchandise.',
    amt: 8900,
    pri: 'medium',
    dept: 'Marketing',
    vnd: 'PrintPro',
    items: [
      { n: 'Banners', q: 20, p: 125 },
      { n: 'Brochures', q: 5, p: 380 },
      { n: 'Bags', q: 500, p: 8 },
    ],
    ap: [
      {
        id: 'a5',
        uid: '3',
        nm: 'David Park',
        rl: 'Mktg Dir',
        st: 'approved',
        ts: '02/07 10:30',
        cm: 'Q1 approved.',
        sg: 'DP',
      },
      {
        id: 'a6',
        uid: '1',
        nm: 'Sarah Johnson',
        rl: 'Finance Mgr',
        st: 'approved',
        ts: '02/07 16:45',
        cm: 'Within budget.',
        sg: 'SJ',
      },
    ],
    tr: [
      { a: 'Created', u: 'Lisa Anderson', t: '02/06 11:00', d: 'PO submitted' },
      { a: 'Approved 1/2', u: 'David Park', t: '02/07 10:30', d: 'Mktg OK' },
      {
        a: 'Approved 2/2',
        u: 'Sarah Johnson',
        t: '02/07 16:45',
        d: 'Finance OK',
      },
      { a: 'Completed', u: 'System', t: '02/07 16:45', d: 'All approvals' },
    ],
  },
  {
    id: 'LR-2026-012',
    title: 'Annual Leave Request',
    type: 'Leave Request',
    status: 'pending',
    by: 'Maria Garcia',
    at: '2026-02-08',
    desc: 'Feb 20-28 vacation. Coverage arranged.',
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
      { a: 'Created', u: 'Maria Garcia', t: '02/08 10:00', d: 'Leave request' },
    ],
  },
  {
    id: 'EXP-2026-008',
    title: 'Client Dinner Expense',
    type: 'Expense Report',
    status: 'rejected',
    by: 'David Park',
    at: '2026-02-05',
    desc: 'Acme Corp dinner. Missing receipt.',
    amt: 475.5,
    pri: 'medium',
    dept: 'Marketing',
    vnd: 'Capital Grille',
    ap: [
      {
        id: 'a8',
        uid: '1',
        nm: 'Sarah Johnson',
        rl: 'Finance Mgr',
        st: 'rejected',
        ts: '02/06 09:15',
        cm: 'Missing itemized receipt.',
      },
    ],
    tr: [
      { a: 'Created', u: 'David Park', t: '02/05 15:30', d: 'Submitted' },
      {
        a: 'Rejected',
        u: 'Sarah Johnson',
        t: '02/06 09:15',
        d: 'Missing receipt',
      },
    ],
  },
  {
    id: 'VI-2026-003',
    title: 'AWS Cloud Invoice',
    type: 'Vendor Invoice',
    status: 'in_progress',
    by: 'Maria Garcia',
    at: '2026-02-07',
    desc: 'January AWS. Three-way match verified.',
    amt: 12340,
    pri: 'high',
    due: '2026-02-12',
    dept: 'IT',
    vnd: 'AWS',
    ap: [
      {
        id: 'a9',
        uid: '2',
        nm: 'Michael Chen',
        rl: 'VP Ops',
        st: 'approved',
        ts: '02/08 11:00',
        cm: 'Confirmed.',
        sg: 'MC',
      },
      {
        id: 'a10',
        uid: '1',
        nm: 'Sarah Johnson',
        rl: 'Finance Mgr',
        st: 'pending',
      },
    ],
    tr: [
      { a: 'Created', u: 'Maria Garcia', t: '02/07 08:45', d: 'Invoice' },
      { a: 'Approved 1/2', u: 'Michael Chen', t: '02/08 11:00', d: 'Ops OK' },
    ],
  },
  {
    id: 'PO-2026-046',
    title: 'Ergonomic Furniture PO',
    type: 'Purchase Order',
    status: 'draft',
    by: 'John Smith',
    at: '2026-02-08',
    desc: 'Standing desks + chairs for wellness.',
    amt: 22500,
    pri: 'medium',
    dept: 'Procurement',
    vnd: 'Herman Miller',
    items: [
      { n: 'Aeron Chair', q: 15, p: 1200 },
      { n: 'Nevi Desk', q: 5, p: 900 },
    ],
    ap: [],
    tr: [{ a: 'Draft', u: 'John Smith', t: '02/08 13:00', d: 'Saved' }],
  },
];
const cM = [
  { m: 'Sep', sub: 45, app: 38, rej: 4, avg: 3.2 },
  { m: 'Oct', sub: 52, app: 44, rej: 5, avg: 2.9 },
  { m: 'Nov', sub: 48, app: 42, rej: 3, avg: 2.7 },
  { m: 'Dec', sub: 38, app: 34, rej: 2, avg: 2.5 },
  { m: 'Jan', sub: 61, app: 53, rej: 4, avg: 2.4 },
  { m: 'Feb', sub: 29, app: 18, rej: 2, avg: 2.3 },
];
const cD = [
  { name: 'Finance', value: 34, color: '#3b82f6' },
  { name: 'Ops', value: 28, color: '#10b981' },
  { name: 'Mktg', value: 22, color: '#f59e0b' },
  { name: 'IT', value: 31, color: '#8b5cf6' },
  { name: 'HR', value: 15, color: '#ec4899' },
  { name: 'Proc', value: 26, color: '#06b6d4' },
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
        display: 'inline-flex',
        padding: '3px 10px',
        borderRadius: 6,
        fontSize: 11,
        fontWeight: 700,
        background: v.b,
        color: v.c,
        textTransform: 'capitalize',
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
        fontSize: 11,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: c[p],
      }}
    >
      {p}
    </span>
  );
};
export default function App() {
  const [vw, setVw] = useState('dashboard');
  const [docs, setDocs] = useState(ID);
  const [sel, setSel] = useState(null);
  const [modal, setModal] = useState(null);
  const [showN, setShowN] = useState(false);
  const [sb, setSb] = useState(true);
  const [sq, setSq] = useState('');
  const [fS, setFS] = useState('all');
  const [fT, setFT] = useState('all');
  const [fD, setFD] = useState('all');
  const [cu, setCu] = useState(U[0]);
  const [selWf, setSelWf] = useState(null);
  const [selU, setSelU] = useState(null);
  const [sTab, setSTab] = useState('users');
  const [notifs, setNotifs] = useState([
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
    {
      id: 'n3',
      title: 'Invoice',
      msg: 'VI-2026-003 awaiting auth',
      type: 'warning',
      ts: '02/08 11:01',
      read: false,
    },
  ]);
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
  const cRef = useRef(null);
  const now = () => new Date().toLocaleString();
  const notify = (t, m, ty = 'info') =>
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
  // Actions
  const createDoc = () => {
    if (!nd.title || !nd.desc) return alert('Fill required fields');
    const px = {
      GRN: 'GRN',
      'Purchase Order': 'PO',
      'Leave Request': 'LR',
      'Expense Report': 'EXP',
      'Vendor Invoice': 'VI',
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
            rl: 'Finance Mgr',
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
  const subDraft = (doc) => {
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
                  rl: 'Finance Mgr',
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
  const doApproval = (id, ok) => {
    if (ok && !sig) return alert('Sign first');
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
        const allOk = ups.every((a) => a.st === 'approved'),
          bad = ups.some((a) => a.st === 'rejected');
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
          t.push({ a: 'Completed', u: 'System', t: now(), d: 'All approvals' });
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
  const doReassign = (id) => {
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
  const doResub = (doc) => {
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
  const delDoc = (id) => {
    if (!confirm('Delete?')) return;
    setDocs((p) => p.filter((d) => d.id !== id));
    setModal(null);
    setSel(null);
    notify('Deleted', id, 'error');
  };
  const dupDoc = (doc) => {
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
  const expDoc = (doc) => {
    const b = new Blob([JSON.stringify(doc, null, 2)], {
      type: 'application/json',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(b);
    a.download = `${doc.id}.json`;
    a.click();
    notify('Exported', doc.id, 'success');
  };
  // Sig pad
  useEffect(() => {
    if (modal !== 'sig' || !cRef.current) return;
    const c = cRef.current,
      ctx = c.getContext('2d');
    let on = false,
      lx = 0,
      ly = 0;
    const pos = (e) => {
      const r = c.getBoundingClientRect(),
        t = e.touches ? e.touches[0] : e;
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
  const clrSig = () => {
    const c = cRef.current;
    if (c) {
      c.getContext('2d').clearRect(0, 0, c.width, c.height);
      setSig('');
    }
  };
  // MODALS
  const DocModal = () => {
    if (!sel || modal !== 'doc') return null;
    const d = sel,
      ca = d.ap?.some((a) => a.uid === cu.id && a.st === 'pending');
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: 20,
          backdropFilter: 'blur(4px)',
        }}
        onClick={() => setModal(null)}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            maxWidth: 800,
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              padding: '18px 22px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <h2 style={{ fontSize: 18, fontWeight: 800 }}>{d.id}</h2>
            <div style={{ display: 'flex', gap: 5 }}>
              <button
                onClick={() => expDoc(d)}
                style={{ ...bt('#fff', '#334155'), padding: '6px' }}
              >
                <Download size={15} />
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(d.id);
                  notify('Copied', 'ID', 'success');
                }}
                style={{ ...bt('#fff', '#334155'), padding: '6px' }}
              >
                <Copy size={15} />
              </button>
              <button
                onClick={() => setModal(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div style={{ padding: 22 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 14,
              }}
            >
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 5 }}>
                  {d.title}
                </h3>
                <SB s={d.status} />
              </div>
              <PB p={d.pri} />
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))',
                gap: 8,
                padding: 12,
                background: '#f8fafc',
                borderRadius: 8,
                marginBottom: 14,
                fontSize: 13,
              }}
            >
              <div>
                <span style={{ color: '#94a3b8' }}>Type:</span> <b>{d.type}</b>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Date:</span> <b>{d.at}</b>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>By:</span> <b>{d.by}</b>
              </div>
              <div>
                <span style={{ color: '#94a3b8' }}>Dept:</span> <b>{d.dept}</b>
              </div>
              {d.vnd && (
                <div>
                  <span style={{ color: '#94a3b8' }}>Vendor:</span>{' '}
                  <b>{d.vnd}</b>
                </div>
              )}
              {d.amt > 0 && (
                <div>
                  <span style={{ color: '#94a3b8' }}>Amount:</span>{' '}
                  <b>
                    $
                    {d.amt.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                    })}
                  </b>
                </div>
              )}
              {d.due && (
                <div>
                  <span style={{ color: '#94a3b8' }}>Due:</span> <b>{d.due}</b>
                </div>
              )}
            </div>
            <div style={{ marginBottom: 14 }}>
              <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 5 }}>
                Description
              </h4>
              <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6 }}>
                {d.desc}
              </p>
            </div>
            {d.items?.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
                  Items
                </h4>
                <table
                  style={{
                    width: '100%',
                    borderCollapse: 'collapse',
                    fontSize: 13,
                  }}
                >
                  <thead>
                    <tr>
                      {['Item', 'Qty', 'Price', 'Total'].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: '6px 8px',
                            textAlign: 'left',
                            borderBottom: '2px solid #e2e8f0',
                            fontSize: 12,
                            fontWeight: 700,
                            color: '#64748b',
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {d.items.map((i, x) => (
                      <tr key={x} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '6px 8px' }}>{i.n}</td>
                        <td style={{ padding: '6px 8px' }}>{i.q}</td>
                        <td style={{ padding: '6px 8px' }}>
                          ${i.p.toFixed(2)}
                        </td>
                        <td style={{ padding: '6px 8px', fontWeight: 600 }}>
                          ${(i.q * i.p).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {d.ap?.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
                  Approvals
                </h4>
                {d.ap.map((a, i) => (
                  <div
                    key={a.id}
                    style={{
                      display: 'flex',
                      gap: 10,
                      paddingBottom: 12,
                      position: 'relative',
                    }}
                  >
                    {i < d.ap.length - 1 && (
                      <div
                        style={{
                          position: 'absolute',
                          left: 13,
                          top: 28,
                          bottom: -4,
                          width: 2,
                          background: '#e2e8f0',
                        }}
                      />
                    )}
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        zIndex: 1,
                        background:
                          a.st === 'approved'
                            ? '#ecfdf5'
                            : a.st === 'rejected'
                            ? '#fef2f2'
                            : '#fffbeb',
                        color:
                          a.st === 'approved'
                            ? '#10b981'
                            : a.st === 'rejected'
                            ? '#ef4444'
                            : '#f59e0b',
                      }}
                    >
                      {a.st === 'approved' ? (
                        <Check size={13} />
                      ) : a.st === 'rejected' ? (
                        <X size={13} />
                      ) : (
                        <Clock size={13} />
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <b style={{ fontSize: 13 }}>{a.nm}</b>
                        <SB s={a.st} />
                      </div>
                      <div style={{ fontSize: 12, color: '#94a3b8' }}>
                        {a.rl}
                      </div>
                      {a.ts && (
                        <div style={{ fontSize: 12, color: '#94a3b8' }}>
                          {a.ts}
                        </div>
                      )}
                      {a.cm && (
                        <div
                          style={{
                            padding: '5px 8px',
                            background: '#f8fafc',
                            borderRadius: 6,
                            fontSize: 13,
                            marginTop: 3,
                          }}
                        >
                          {a.cm}
                        </div>
                      )}
                      {a.sg && (
                        <div
                          style={{
                            fontSize: 12,
                            color: '#10b981',
                            fontWeight: 600,
                            marginTop: 2,
                          }}
                        >
                          ✓ Signed
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {d.tr?.length > 0 && (
              <div style={{ marginBottom: 14 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>
                  Audit Trail
                </h4>
                <div
                  style={{
                    background: '#f8fafc',
                    borderRadius: 8,
                    padding: 12,
                  }}
                >
                  {d.tr.map((e, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        gap: 7,
                        fontSize: 13,
                        marginBottom: i < d.tr.length - 1 ? 7 : 0,
                        paddingBottom: i < d.tr.length - 1 ? 7 : 0,
                        borderBottom:
                          i < d.tr.length - 1 ? '1px solid #e2e8f0' : 'none',
                      }}
                    >
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: '#94a3b8',
                          marginTop: 5,
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <b>{e.a}</b>{' '}
                        <span style={{ color: '#94a3b8' }}>by {e.u}</span>
                        <div style={{ fontSize: 12, color: '#94a3b8' }}>
                          {e.t} — {e.d}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div
              style={{
                display: 'flex',
                gap: 5,
                paddingTop: 12,
                borderTop: '1px solid #e2e8f0',
                flexWrap: 'wrap',
              }}
            >
              <button
                onClick={() => setModal(null)}
                style={bt('#fff', '#334155')}
              >
                Close
              </button>
              {d.status === 'draft' && (
                <button
                  onClick={() => {
                    subDraft(d);
                    setModal(null);
                  }}
                  style={bt()}
                >
                  <Send size={14} />
                  Submit
                </button>
              )}
              {d.status === 'rejected' && (
                <button onClick={() => setModal('resub')} style={bt('#f59e0b')}>
                  <RefreshCw size={14} />
                  Resubmit
                </button>
              )}
              {ca && (
                <button
                  onClick={() => setModal('reassign')}
                  style={bt('#fff', '#334155')}
                >
                  <Users size={14} />
                  Reassign
                </button>
              )}
              {ca && (
                <button
                  onClick={() => doApproval(d.id, false)}
                  style={bt('#ef4444')}
                >
                  <XCircle size={14} />
                  Reject
                </button>
              )}
              {ca && (
                <button onClick={() => setModal('sig')} style={bt('#10b981')}>
                  <PenTool size={14} />
                  Sign
                </button>
              )}
              {(d.status === 'completed' || d.status === 'rejected') && (
                <button onClick={() => dupDoc(d)} style={bt('#fff', '#334155')}>
                  <Copy size={14} />
                  Duplicate
                </button>
              )}
              {d.status === 'draft' && (
                <button
                  onClick={() => delDoc(d.id)}
                  style={{ ...bt('#fff', '#ef4444'), marginLeft: 'auto' }}
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  const SigModal = () => {
    if (modal !== 'sig' || !sel) return null;
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: 20,
          backdropFilter: 'blur(4px)',
        }}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            maxWidth: 540,
            width: '100%',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              padding: '16px 22px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <h2 style={{ fontSize: 17, fontWeight: 800 }}>Digital Signature</h2>
            <button
              onClick={() => {
                setModal(null);
                setSig('');
                setCmt('');
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>
          <div style={{ padding: 22 }}>
            <div
              style={{
                padding: 10,
                background: '#f8fafc',
                borderRadius: 8,
                marginBottom: 16,
                fontSize: 13,
              }}
            >
              <div>
                <b>Doc:</b> {sel.title} ({sel.id})
              </div>
              <div>
                <b>Approver:</b> {cu.name}
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 5,
                }}
              >
                Signature <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <div
                style={{
                  border: '2px solid #e2e8f0',
                  borderRadius: 8,
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: 5,
                }}
              >
                <canvas
                  ref={cRef}
                  width={480}
                  height={140}
                  style={{
                    display: 'block',
                    width: '100%',
                    cursor: 'crosshair',
                    background: '#fff',
                  }}
                />
                {!sig && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%,-50%)',
                      color: '#cbd5e1',
                      pointerEvents: 'none',
                      fontSize: 14,
                    }}
                  >
                    Draw signature
                  </div>
                )}
              </div>
              <button
                onClick={clrSig}
                style={{
                  ...bt('#fff', '#64748b'),
                  padding: '3px 8px',
                  fontSize: 12,
                }}
              >
                <RefreshCw size={12} />
                Clear
              </button>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 5,
                }}
              >
                Comments
              </label>
              <textarea
                value={cmt}
                onChange={(e) => setCmt(e.target.value)}
                placeholder="Notes..."
                rows={3}
                style={{ ...ii, resize: 'vertical' }}
              />
            </div>
            <div
              style={{ display: 'flex', gap: 5, justifyContent: 'flex-end' }}
            >
              <button
                onClick={() => {
                  setModal(null);
                  setSig('');
                  setCmt('');
                }}
                style={bt('#fff', '#334155')}
              >
                Cancel
              </button>
              <button
                onClick={() => doApproval(sel.id, false)}
                style={bt('#ef4444')}
              >
                <XCircle size={14} />
                Reject
              </button>
              <button
                onClick={() => doApproval(sel.id, true)}
                disabled={!sig}
                style={{
                  ...bt('#10b981'),
                  opacity: sig ? 1 : 0.5,
                  cursor: sig ? 'pointer' : 'not-allowed',
                }}
              >
                <CheckCircle size={14} />
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const CreateModal = () => {
    if (modal !== 'create') return null;
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: 20,
          backdropFilter: 'blur(4px)',
        }}
        onClick={() => setModal(null)}
      >
        <div
          style={{
            background: '#fff',
            borderRadius: 14,
            maxWidth: 600,
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            style={{
              padding: '16px 22px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <h2 style={{ fontSize: 17, fontWeight: 800 }}>New Document</h2>
            <button
              onClick={() => setModal(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
          </div>
          <div style={{ padding: 22 }}>
            <div style={{ marginBottom: 12 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                Type *
              </label>
              <select
                value={nd.type}
                onChange={(e) => setNd({ ...nd, type: e.target.value })}
                style={ii}
              >
                {DT.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                Title *
              </label>
              <input
                value={nd.title}
                onChange={(e) => setNd({ ...nd, title: e.target.value })}
                placeholder="Title"
                style={ii}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                Description *
              </label>
              <textarea
                value={nd.desc}
                onChange={(e) => setNd({ ...nd, desc: e.target.value })}
                placeholder="Description"
                rows={3}
                style={{ ...ii, resize: 'vertical' }}
              />
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
                marginBottom: 12,
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  Amount
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
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 4,
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
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
                marginBottom: 12,
              }}
            >
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  Vendor
                </label>
                <input
                  value={nd.vnd}
                  onChange={(e) => setNd({ ...nd, vnd: e.target.value })}
                  placeholder="Vendor"
                  style={ii}
                />
              </div>
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: 13,
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  Dept
                </label>
                <select
                  value={nd.dept}
                  onChange={(e) => setNd({ ...nd, dept: e.target.value })}
                  style={ii}
                >
                  {DP.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ marginBottom: 12 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 4,
                }}
              >
                Due
              </label>
              <input
                type="date"
                value={nd.due}
                onChange={(e) => setNd({ ...nd, due: e.target.value })}
                style={ii}
              />
            </div>
            <div style={{ marginBottom: 12 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 5,
                }}
              >
                Items
              </label>
              {nd.items.map((it, i) => (
                <div
                  key={i}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr auto',
                    gap: 5,
                    marginBottom: 3,
                  }}
                >
                  <input
                    value={it.n}
                    onChange={(e) => {
                      const items = [...nd.items];
                      items[i] = { ...items[i], n: e.target.value };
                      setNd({ ...nd, items });
                    }}
                    placeholder="Item"
                    style={{ ...ii, padding: '6px', fontSize: 13 }}
                  />
                  <input
                    type="number"
                    value={it.q}
                    onChange={(e) => {
                      const items = [...nd.items];
                      items[i] = { ...items[i], q: +e.target.value };
                      setNd({ ...nd, items });
                    }}
                    style={{ ...ii, padding: '6px', fontSize: 13 }}
                  />
                  <input
                    type="number"
                    value={it.p}
                    onChange={(e) => {
                      const items = [...nd.items];
                      items[i] = { ...items[i], p: +e.target.value };
                      setNd({ ...nd, items });
                    }}
                    placeholder="$"
                    style={{ ...ii, padding: '6px', fontSize: 13 }}
                  />
                  <button
                    onClick={() => {
                      const items = nd.items.filter((_, j) => j !== i);
                      setNd({
                        ...nd,
                        items: items.length ? items : [{ n: '', q: 1, p: 0 }],
                      });
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#ef4444',
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={() =>
                  setNd({ ...nd, items: [...nd.items, { n: '', q: 1, p: 0 }] })
                }
                style={{
                  ...bt('#fff', '#3b82f6'),
                  padding: '3px 8px',
                  fontSize: 12,
                }}
              >
                <Plus size={12} />
                Add
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 5,
                justifyContent: 'flex-end',
                paddingTop: 12,
                borderTop: '1px solid #e2e8f0',
              }}
            >
              <button
                onClick={() => setModal(null)}
                style={bt('#fff', '#334155')}
              >
                Cancel
              </button>
              <button onClick={createDoc} style={bt()}>
                <FilePlus size={14} />
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const SmallModal = ({ title, children }) => (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: 20,
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 14,
          maxWidth: 440,
          width: '100%',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: '16px 22px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h2 style={{ fontSize: 17, fontWeight: 800 }}>{title}</h2>
          <button
            onClick={() => setModal(null)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>
        <div style={{ padding: 22 }}>{children}</div>
      </div>
    </div>
  );
  const ReassignM = () => {
    if (modal !== 'reassign' || !sel) return null;
    return (
      <SmallModal title="Reassign">
        <p style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>
          Reassign <b>{sel.id}</b>
        </p>
        <select value={rTo} onChange={(e) => setRTo(e.target.value)} style={ii}>
          <option value="">Choose...</option>
          {U.filter((u) => u.role === 'approver' && u.id !== cu.id).map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} — {u.title}
            </option>
          ))}
        </select>
        <div
          style={{
            display: 'flex',
            gap: 5,
            justifyContent: 'flex-end',
            marginTop: 14,
          }}
        >
          <button onClick={() => setModal(null)} style={bt('#fff', '#334155')}>
            Cancel
          </button>
          <button
            onClick={() => doReassign(sel.id)}
            disabled={!rTo}
            style={{ ...bt(), opacity: rTo ? 1 : 0.5 }}
          >
            Reassign
          </button>
        </div>
      </SmallModal>
    );
  };
  const ResubM = () => {
    if (modal !== 'resub' || !sel) return null;
    return (
      <SmallModal title="Resubmit">
        <p style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>
          Resubmit <b>{sel.id}</b> — all approvals reset.
        </p>
        <textarea
          value={rN}
          onChange={(e) => setRN(e.target.value)}
          placeholder="What changed..."
          rows={3}
          style={{ ...ii, resize: 'vertical' }}
        />
        <div
          style={{
            display: 'flex',
            gap: 5,
            justifyContent: 'flex-end',
            marginTop: 14,
          }}
        >
          <button onClick={() => setModal(null)} style={bt('#fff', '#334155')}>
            Cancel
          </button>
          <button onClick={() => doResub(sel)} style={bt('#f59e0b')}>
            <RefreshCw size={14} />
            Resubmit
          </button>
        </div>
      </SmallModal>
    );
  };
  const WfM = () => {
    if (modal !== 'wf' || !selWf) return null;
    return (
      <SmallModal title={selWf.name}>
        <p
          style={{
            fontSize: 14,
            color: '#475569',
            marginBottom: 14,
            lineHeight: 1.6,
          }}
        >
          {selWf.desc}
        </p>
        <div
          style={{ display: 'flex', gap: 10, marginBottom: 14, fontSize: 13 }}
        >
          <span
            style={{
              padding: '3px 7px',
              background: '#f1f5f9',
              borderRadius: 5,
              fontWeight: 600,
            }}
          >
            {selWf.dt}
          </span>
          <span
            style={{
              padding: '3px 7px',
              background: selWf.on ? '#ecfdf5' : '#fef2f2',
              borderRadius: 5,
              fontWeight: 600,
              color: selWf.on ? '#047857' : '#b91c1c',
            }}
          >
            {selWf.on ? 'Active' : 'Off'}
          </span>
          <span style={{ color: '#94a3b8' }}>{selWf.n} uses</span>
        </div>
        <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
          Steps
        </h4>
        {selWf.steps.map((s, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: 10,
              marginBottom: 12,
              position: 'relative',
            }}
          >
            {i < selWf.steps.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  left: 13,
                  top: 28,
                  bottom: -12,
                  width: 2,
                  background: '#e2e8f0',
                }}
              />
            )}
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: '#eff6ff',
                color: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 13,
                flexShrink: 0,
                zIndex: 1,
              }}
            >
              {i + 1}
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{s.r}</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>
                {s.a} • {s.s}
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 14,
            paddingTop: 12,
            borderTop: '1px solid #e2e8f0',
          }}
        >
          <button onClick={() => setModal(null)} style={bt('#fff', '#334155')}>
            Close
          </button>
        </div>
      </SmallModal>
    );
  };
  const UsrM = () => {
    if (modal !== 'usr' || !selU) return null;
    return (
      <SmallModal title="User Profile">
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: 18,
              fontWeight: 700,
              margin: '0 auto 8px',
            }}
          >
            {selU.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{selU.name}</h3>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 12 }}>
            {selU.title}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
              textAlign: 'left',
              padding: 12,
              background: '#f8fafc',
              borderRadius: 8,
              fontSize: 13,
            }}
          >
            <div>
              <span style={{ color: '#94a3b8' }}>Email:</span>
              <br />
              <b>{selU.email}</b>
            </div>
            <div>
              <span style={{ color: '#94a3b8' }}>Dept:</span>
              <br />
              <b>{selU.dept}</b>
            </div>
            <div>
              <span style={{ color: '#94a3b8' }}>Role:</span>
              <br />
              <b style={{ textTransform: 'capitalize' }}>{selU.role}</b>
            </div>
            <div>
              <span style={{ color: '#94a3b8' }}>Status:</span>
              <br />
              <b
                style={{
                  color: selU.status === 'active' ? '#047857' : '#b91c1c',
                }}
              >
                {selU.status === 'active' ? '● Active' : '● Inactive'}
              </b>
            </div>
          </div>
        </div>
      </SmallModal>
    );
  };
  // VIEWS
  const Dash = () => (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
          flexWrap: 'wrap',
          gap: 10,
        }}
      >
        <div>
          <h1
            style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em' }}
          >
            Dashboard
          </h1>
          <p style={{ color: '#64748b', fontSize: 14, marginTop: 3 }}>
            Welcome back, {cu.name.split(' ')[0]}
          </p>
        </div>
        <button onClick={() => setModal('create')} style={bt()}>
          <Plus size={16} />
          New Document
        </button>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(170px,1fr))',
          gap: 11,
          marginBottom: 20,
        }}
      >
        {[
          {
            l: 'Total',
            v: st.total,
            c: '#3b82f6',
            bg: '#eff6ff',
            ic: <FileText size={19} />,
          },
          {
            l: 'Pending',
            v: st.pend,
            c: '#f59e0b',
            bg: '#fffbeb',
            ic: <Clock size={19} />,
          },
          {
            l: 'In Progress',
            v: st.prog,
            c: '#8b5cf6',
            bg: '#f5f3ff',
            ic: <Activity size={19} />,
          },
          {
            l: 'Completed',
            v: st.done,
            c: '#10b981',
            bg: '#ecfdf5',
            ic: <CheckCircle size={19} />,
          },
          {
            l: 'Rejected',
            v: st.rej,
            c: '#ef4444',
            bg: '#fef2f2',
            ic: <XCircle size={19} />,
          },
          {
            l: 'Drafts',
            v: st.dft,
            c: '#64748b',
            bg: '#f8fafc',
            ic: <Edit size={19} />,
          },
        ].map((s, i) => (
          <div
            key={i}
            style={{
              background: '#fff',
              padding: 14,
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              display: 'flex',
              gap: 10,
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 6px 16px -4px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 8,
                background: s.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: s.c,
              }}
            >
              {s.ic}
            </div>
            <div>
              <div style={{ fontSize: 11, color: '#94a3b8' }}>{s.l}</div>
              <div style={{ fontSize: 22, fontWeight: 800 }}>{s.v}</div>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            background: '#fff',
            padding: 16,
            borderRadius: 10,
            border: '1px solid #e2e8f0',
          }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
            Monthly Volume
          </h3>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={cM}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="m" fontSize={12} stroke="#94a3b8" />
              <YAxis fontSize={12} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Bar
                dataKey="app"
                fill="#10b981"
                radius={[3, 3, 0, 0]}
                name="Approved"
              />
              <Bar
                dataKey="rej"
                fill="#ef4444"
                radius={[3, 3, 0, 0]}
                name="Rejected"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            background: '#fff',
            padding: 16,
            borderRadius: 10,
            border: '1px solid #e2e8f0',
          }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
            Processing Time (days)
          </h3>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={cT}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="w" fontSize={12} stroke="#94a3b8" />
              <YAxis fontSize={12} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Area
                type="monotone"
                dataKey="t"
                stroke="#3b82f6"
                fill="rgba(59,130,246,0.1)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '5fr 3fr', gap: 14 }}>
        <div
          style={{
            background: '#fff',
            padding: 16,
            borderRadius: 10,
            border: '1px solid #e2e8f0',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 700 }}>Recent</h3>
            <button
              onClick={() => setVw('documents')}
              style={{
                background: 'none',
                border: 'none',
                color: '#3b82f6',
                fontSize: 13,
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              All →
            </button>
          </div>
          {docs.slice(0, 5).map((d) => (
            <div
              key={d.id}
              onClick={() => {
                setSel(d);
                setModal('doc');
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '7px 0',
                borderBottom: '1px solid #f1f5f9',
                cursor: 'pointer',
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {d.title}
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>{d.id}</div>
              </div>
              <SB s={d.status} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div
            style={{
              background: '#fff',
              padding: 14,
              borderRadius: 10,
              border: '1px solid #e2e8f0',
            }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
              Quick Actions
            </h3>
            {[
              {
                ic: <FilePlus size={15} />,
                l: 'New Document',
                a: () => setModal('create'),
              },
              {
                ic: <Folder size={15} />,
                l: 'Documents',
                a: () => setVw('documents'),
              },
              {
                ic: <BarChart3 size={15} />,
                l: 'Analytics',
                a: () => setVw('analytics'),
              },
              {
                ic: <GitBranch size={15} />,
                l: 'Workflows',
                a: () => setVw('workflows'),
              },
            ].map((x, i) => (
              <button
                key={i}
                onClick={x.a}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  padding: '7px 10px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: 6,
                  width: '100%',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 4,
                  color: '#334155',
                }}
              >
                {x.ic}
                {x.l}
              </button>
            ))}
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg,#0c1222,#1e293b)',
              padding: 14,
              borderRadius: 10,
              color: '#fff',
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.6 }}>
              SLA Performance
            </div>
            <div style={{ fontSize: 24, fontWeight: 800 }}>94.2%</div>
            <div style={{ fontSize: 12, color: '#10b981' }}>↑ 3.1%</div>
          </div>
        </div>
      </div>
    </div>
  );
  const Docs = () => (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16,
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <div>
          <h1
            style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em' }}
          >
            Documents
          </h1>
          <p style={{ color: '#64748b', fontSize: 14, marginTop: 3 }}>
            Manage and approve
          </p>
        </div>
        <button onClick={() => setModal('create')} style={bt()}>
          <Plus size={16} />
          New
        </button>
      </div>
      <div
        style={{
          background: '#fff',
          padding: '9px 12px',
          borderRadius: 8,
          border: '1px solid #e2e8f0',
          marginBottom: 12,
          display: 'flex',
          gap: 7,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Filter size={14} color="#94a3b8" />
        <select value={fS} onChange={(e) => setFS(e.target.value)} style={si}>
          <option value="all">Status</option>
          {['draft', 'pending', 'in_progress', 'completed', 'rejected'].map(
            (s) => (
              <option key={s} value={s}>
                {s.replace('_', ' ')}
              </option>
            )
          )}
        </select>
        <select value={fT} onChange={(e) => setFT(e.target.value)} style={si}>
          <option value="all">Type</option>
          {DT.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select value={fD} onChange={(e) => setFD(e.target.value)} style={si}>
          <option value="all">Dept</option>
          {DP.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: '#94a3b8' }}>
          {fd.length}/{docs.length}
        </span>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))',
          gap: 12,
        }}
      >
        {fd.map((d) => (
          <div
            key={d.id}
            onClick={() => {
              setSel(d);
              setModal('doc');
            }}
            style={{
              background: '#fff',
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              padding: 15,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 8px 20px -6px rgba(0,0,0,0.1)';
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 5,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#64748b',
                  background: '#f1f5f9',
                  padding: '2px 5px',
                  borderRadius: 4,
                }}
              >
                {d.type}
              </span>
              <PB p={d.pri} />
            </div>
            <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>
              {d.title}
            </h3>
            <div style={{ fontSize: 11, color: '#94a3b8', marginBottom: 5 }}>
              {d.id}
            </div>
            <p
              style={{
                fontSize: 13,
                color: '#64748b',
                lineHeight: 1.4,
                marginBottom: 8,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {d.desc}
            </p>
            {d.amt > 0 && (
              <div style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>
                ${d.amt.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>
            )}
            <div
              style={{
                display: 'flex',
                gap: 8,
                fontSize: 11,
                color: '#94a3b8',
                marginBottom: 8,
                paddingBottom: 8,
                borderBottom: '1px solid #f1f5f9',
              }}
            >
              <span>{d.by}</span>
              <span>{(d.at || '').split(' ')[0]}</span>
              {d.vnd && <span>{d.vnd}</span>}
            </div>
            {d.ap?.length > 0 && (
              <div style={{ marginBottom: 8 }}>
                <div
                  style={{
                    height: 3,
                    background: '#f1f5f9',
                    borderRadius: 2,
                    overflow: 'hidden',
                    marginBottom: 2,
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${
                        (d.ap.filter((a) => a.st !== 'pending').length /
                          d.ap.length) *
                        100
                      }%`,
                      background: d.ap.some((a) => a.st === 'rejected')
                        ? '#ef4444'
                        : 'linear-gradient(90deg,#3b82f6,#10b981)',
                      transition: 'width 0.3s',
                    }}
                  />
                </div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>
                  {d.ap.filter((a) => a.st !== 'pending').length}/{d.ap.length}
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
              <SB s={d.status} />
              {d.status === 'draft' && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    subDraft(d);
                  }}
                  style={{
                    marginLeft: 'auto',
                    padding: '3px 9px',
                    background: '#3b82f6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 5,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                  }}
                >
                  <Send size={11} />
                  Submit
                </button>
              )}
              {d.ap?.some((a) => a.uid === cu.id && a.st === 'pending') && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSel(d);
                    setModal('sig');
                  }}
                  style={{
                    marginLeft: 'auto',
                    padding: '3px 9px',
                    background: '#10b981',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 5,
                    fontSize: 11,
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                  }}
                >
                  <PenTool size={11} />
                  Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {fd.length === 0 && (
        <div style={{ textAlign: 'center', padding: 36, color: '#94a3b8' }}>
          <Folder size={32} style={{ opacity: 0.3, marginBottom: 6 }} />
          <div style={{ fontWeight: 600 }}>No documents</div>
        </div>
      )}
    </div>
  );
  const WfV = () => (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em' }}>
          Workflows
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, marginTop: 3 }}>
          Approval chains
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))',
          gap: 12,
        }}
      >
        {WF.map((w) => (
          <div
            key={w.id}
            onClick={() => {
              setSelWf(w);
              setModal('wf');
            }}
            style={{
              background: '#fff',
              borderRadius: 10,
              border: '1px solid #e2e8f0',
              padding: 16,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 8px 20px -6px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: 7,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#64748b',
                  background: '#f1f5f9',
                  padding: '2px 5px',
                  borderRadius: 4,
                }}
              >
                {w.dt}
              </span>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  padding: '2px 5px',
                  borderRadius: 4,
                  background: w.on ? '#ecfdf5' : '#fef2f2',
                  color: w.on ? '#047857' : '#b91c1c',
                }}
              >
                {w.on ? 'Active' : 'Off'}
              </span>
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 3 }}>
              {w.name}
            </h3>
            <p
              style={{
                fontSize: 13,
                color: '#64748b',
                lineHeight: 1.4,
                marginBottom: 10,
              }}
            >
              {w.desc}
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 3,
                marginBottom: 8,
              }}
            >
              {w.steps.map((s, i) => (
                <React.Fragment key={i}>
                  <span
                    style={{
                      padding: '3px 6px',
                      background: '#f1f5f9',
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#475569',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {s.r}
                  </span>
                  {i < w.steps.length - 1 && (
                    <ArrowRight size={11} color="#94a3b8" />
                  )}
                </React.Fragment>
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                gap: 12,
                fontSize: 12,
                color: '#94a3b8',
              }}
            >
              <span>{w.steps.length} steps</span>
              <span>{w.n} uses</span>
              <span>{w.rt}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  const Ana = () => (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em' }}>
          Analytics
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, marginTop: 3 }}>
          Performance metrics
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            background: '#fff',
            padding: 16,
            borderRadius: 10,
            border: '1px solid #e2e8f0',
          }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
            Trends
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={cM}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="m" fontSize={12} stroke="#94a3b8" />
              <YAxis fontSize={12} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="sub"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Submitted"
              />
              <Line
                type="monotone"
                dataKey="app"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Approved"
              />
              <Line
                type="monotone"
                dataKey="rej"
                stroke="#ef4444"
                strokeWidth={2}
                dot={{ r: 3 }}
                name="Rejected"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            background: '#fff',
            padding: 16,
            borderRadius: 10,
            border: '1px solid #e2e8f0',
          }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
            By Department
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={cD}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                fontSize={11}
              >
                {cD.map((e, i) => (
                  <Cell key={i} fill={e.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            background: '#fff',
            padding: 16,
            borderRadius: 10,
            border: '1px solid #e2e8f0',
          }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
            Processing
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={cT}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="w" fontSize={12} stroke="#94a3b8" />
              <YAxis fontSize={12} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Area
                type="monotone"
                dataKey="t"
                stroke="#8b5cf6"
                fill="rgba(139,92,246,0.1)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div
          style={{
            background: '#fff',
            padding: 16,
            borderRadius: 10,
            border: '1px solid #e2e8f0',
          }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>
            Avg Days/Month
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={cM}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="m" fontSize={12} stroke="#94a3b8" />
              <YAxis fontSize={12} stroke="#94a3b8" unit="d" />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="avg" fill="#f59e0b" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div
        style={{
          background: '#fff',
          padding: 16,
          borderRadius: 10,
          border: '1px solid #e2e8f0',
        }}
      >
        <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 10 }}>
          KPIs
        </h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Metric', 'Current', 'Target', 'Trend'].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: '6px 10px',
                    textAlign: 'left',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#64748b',
                    textTransform: 'uppercase',
                    borderBottom: '2px solid #e2e8f0',
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { m: 'Avg Approval', c: '2.3d', t: '2.0d', r: '↓15%', g: 1 },
              { m: '1st-Time Rate', c: '87%', t: '90%', r: '↑3%', g: 1 },
              { m: 'SLA', c: '94.2%', t: '95%', r: '↑3.1%', g: 1 },
              { m: 'Completion', c: '94%', t: '95%', r: '→0%', g: 0 },
            ].map((r, i) => (
              <tr key={i}>
                <td
                  style={{
                    padding: '8px 10px',
                    fontSize: 13,
                    fontWeight: 600,
                    borderBottom: '1px solid #f1f5f9',
                  }}
                >
                  {r.m}
                </td>
                <td
                  style={{
                    padding: '8px 10px',
                    fontSize: 13,
                    borderBottom: '1px solid #f1f5f9',
                  }}
                >
                  {r.c}
                </td>
                <td
                  style={{
                    padding: '8px 10px',
                    fontSize: 13,
                    borderBottom: '1px solid #f1f5f9',
                    color: '#94a3b8',
                  }}
                >
                  {r.t}
                </td>
                <td
                  style={{
                    padding: '8px 10px',
                    fontSize: 13,
                    borderBottom: '1px solid #f1f5f9',
                    color: r.g ? '#10b981' : '#94a3b8',
                    fontWeight: 600,
                  }}
                >
                  {r.r}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  const Sett = () => (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.03em' }}>
          Settings
        </h1>
        <p style={{ color: '#64748b', fontSize: 14, marginTop: 3 }}>
          Configuration
        </p>
      </div>
      <div style={{ display: 'flex', gap: 3, marginBottom: 16 }}>
        {['users', 'security', 'integrations', 'system'].map((t) => (
          <button
            key={t}
            onClick={() => setSTab(t)}
            style={{
              padding: '6px 13px',
              background: sTab === t ? '#0f172a' : '#fff',
              color: sTab === t ? '#fff' : '#64748b',
              border: '1px solid #e2e8f0',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              textTransform: 'capitalize',
            }}
          >
            {t}
          </button>
        ))}
      </div>
      {sTab === 'users' && (
        <div
          style={{
            background: '#fff',
            borderRadius: 10,
            border: '1px solid #e2e8f0',
            overflow: 'hidden',
          }}
        >
          <div
            style={{ padding: '10px 14px', borderBottom: '1px solid #e2e8f0' }}
          >
            <b style={{ fontSize: 14 }}>{U.length} Users</b>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['User', 'Role', 'Dept', 'Status', ''].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '6px 10px',
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 700,
                      color: '#64748b',
                      borderBottom: '1px solid #e2e8f0',
                      background: '#f8fafc',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {U.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '7px 10px' }}>
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: 10,
                          fontWeight: 700,
                        }}
                      >
                        {u.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>
                          {u.name}
                        </div>
                        <div style={{ fontSize: 11, color: '#94a3b8' }}>
                          {u.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '7px 10px' }}>
                    <span
                      style={{
                        padding: '2px 5px',
                        borderRadius: 4,
                        background: '#f1f5f9',
                        fontWeight: 600,
                        fontSize: 12,
                        textTransform: 'capitalize',
                      }}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: '7px 10px',
                      fontSize: 13,
                      color: '#64748b',
                    }}
                  >
                    {u.dept}
                  </td>
                  <td style={{ padding: '7px 10px' }}>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: u.status === 'active' ? '#047857' : '#b91c1c',
                      }}
                    >
                      {u.status === 'active' ? '●' : '○'} {u.status}
                    </span>
                  </td>
                  <td style={{ padding: '7px 10px' }}>
                    <button
                      onClick={() => {
                        setSelU(u);
                        setModal('usr');
                      }}
                      style={{
                        padding: '3px 7px',
                        background: 'none',
                        border: '1px solid #e2e8f0',
                        borderRadius: 5,
                        fontSize: 12,
                        cursor: 'pointer',
                        fontWeight: 600,
                        color: '#3b82f6',
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {sTab === 'security' && (
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
        >
          {[
            {
              ic: <Lock size={16} />,
              t: 'Password Policy',
              d: 'Min 12 chars, MFA',
              s: 'Enforced',
            },
            {
              ic: <Shield size={16} />,
              t: 'Audit Logging',
              d: 'Full trail',
              s: 'Active',
            },
            {
              ic: <Globe size={16} />,
              t: 'IP Allowlist',
              d: 'Restrict by IP',
              s: 'Configured',
            },
            {
              ic: <Lock size={16} />,
              t: 'Sessions',
              d: '30-min timeout',
              s: 'Active',
            },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                padding: 14,
                borderRadius: 10,
                border: '1px solid #e2e8f0',
                display: 'flex',
                gap: 10,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: '#eff6ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#3b82f6',
                  flexShrink: 0,
                }}
              >
                {s.ic}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{s.t}</div>
                <div
                  style={{ fontSize: 13, color: '#64748b', marginBottom: 3 }}
                >
                  {s.d}
                </div>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#047857',
                    background: '#ecfdf5',
                    padding: '2px 5px',
                    borderRadius: 4,
                  }}
                >
                  {s.s}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      {sTab === 'integrations' && (
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
        >
          {[
            { n: 'Oracle ERP', d: 'Financial sync', ok: 1 },
            { n: 'SAP S/4HANA', d: 'Procurement', ok: 0 },
            { n: 'Microsoft 365', d: 'Email & Calendar', ok: 1 },
            { n: 'DocuSign', d: 'E-signatures', ok: 1 },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                padding: 14,
                borderRadius: 10,
                border: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{s.n}</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>{s.d}</div>
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  padding: '3px 7px',
                  borderRadius: 5,
                  background: s.ok ? '#ecfdf5' : '#f1f5f9',
                  color: s.ok ? '#047857' : '#64748b',
                }}
              >
                {s.ok ? 'Connected' : 'Available'}
              </span>
            </div>
          ))}
        </div>
      )}
      {sTab === 'system' && (
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}
        >
          {[
            { t: 'Retention', v: '7 years', d: 'Auto-archive' },
            { t: 'Notifications', v: 'Email + In-App', d: 'Per step' },
            { t: 'Default SLA', v: '48 hours', d: 'Fallback' },
            { t: 'Escalation', v: 'Enabled', d: 'After 2× SLA' },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: '#fff',
                padding: 14,
                borderRadius: 10,
                border: '1px solid #e2e8f0',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700 }}>{s.t}</div>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 3 }}>
                {s.d}
              </div>
              <span style={{ fontSize: 15, fontWeight: 700 }}>{s.v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  // LAYOUT
  const Sidebar = () => (
    <div
      style={{
        width: sb ? 240 : 64,
        background: '#0c1222',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        transition: 'width 0.3s',
        zIndex: 1000,
        borderRight: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div
        style={{
          padding: sb ? '22px 18px' : '22px 12px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          alignItems: 'center',
          gap: 9,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Zap size={17} />
        </div>
        {sb && (
          <span style={{ fontSize: 16, fontWeight: 800 }}>
            Massy<span style={{ color: '#3b82f6' }}>Flow</span>
          </span>
        )}
      </div>
      <nav
        style={{
          flex: 1,
          padding: '12px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {[
          { k: 'dashboard', ic: <Home size={17} />, l: 'Dashboard' },
          {
            k: 'documents',
            ic: <Folder size={17} />,
            l: 'Documents',
            b: st.pend,
          },
          { k: 'workflows', ic: <GitBranch size={17} />, l: 'Workflows' },
          { k: 'analytics', ic: <BarChart3 size={17} />, l: 'Analytics' },
          { k: 'settings', ic: <Settings size={17} />, l: 'Settings' },
        ].map((i) => (
          <button
            key={i.k}
            onClick={() => setVw(i.k)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 9,
              padding: sb ? '9px 18px' : '9px 0',
              justifyContent: sb ? 'flex-start' : 'center',
              color: vw === i.k ? '#fff' : 'rgba(255,255,255,0.4)',
              background: vw === i.k ? 'rgba(59,130,246,0.15)' : 'transparent',
              border: 'none',
              width: '100%',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: vw === i.k ? 600 : 400,
              borderLeft:
                vw === i.k ? '3px solid #3b82f6' : '3px solid transparent',
              transition: 'all 0.15s',
            }}
          >
            {i.ic}
            {sb && <span style={{ flex: 1, textAlign: 'left' }}>{i.l}</span>}
            {sb && i.b > 0 && (
              <span
                style={{
                  background: '#ef4444',
                  color: '#fff',
                  fontSize: 10,
                  padding: '1px 5px',
                  borderRadius: 9,
                  fontWeight: 700,
                }}
              >
                {i.b}
              </span>
            )}
          </button>
        ))}
      </nav>
      <div
        style={{ padding: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        {sb ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <User size={15} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {cu.name}
              </div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>
                {cu.title}
              </div>
            </div>
          </div>
        ) : (
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
            }}
          >
            <User size={15} />
          </div>
        )}
      </div>
    </div>
  );
  const Topbar = () => (
    <div
      style={{
        background: '#fff',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '0 20px',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <button
        onClick={() => setSb(!sb)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 5,
          borderRadius: 6,
          display: 'flex',
        }}
      >
        {sb ? <X size={17} /> : <Menu size={17} />}
      </button>
      <div
        style={{
          flex: 1,
          maxWidth: 400,
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          background: '#f1f5f9',
          border: '1px solid #e2e8f0',
          borderRadius: 7,
          padding: '6px 10px',
        }}
      >
        <Search size={15} color="#94a3b8" />
        <input
          type="text"
          placeholder="Search..."
          value={sq}
          onChange={(e) => setSq(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            background: 'none',
            outline: 'none',
            fontSize: 14,
          }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <select
          value={cu.id}
          onChange={(e) => {
            const u = U.find((u) => u.id === e.target.value);
            if (u) setCu(u);
          }}
          style={{
            padding: '4px 7px',
            border: '1px solid #e2e8f0',
            borderRadius: 5,
            fontSize: 12,
            cursor: 'pointer',
            maxWidth: 160,
            color: '#475569',
          }}
        >
          {U.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} ({u.role})
            </option>
          ))}
        </select>
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowN(!showN)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 5,
              borderRadius: 6,
              display: 'flex',
              position: 'relative',
            }}
          >
            <Bell size={17} />
            {notifs.filter((n) => !n.read).length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 1,
                  right: 1,
                  background: '#ef4444',
                  color: '#fff',
                  fontSize: 9,
                  width: 15,
                  height: 15,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
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
                top: '100%',
                right: 0,
                marginTop: 5,
                width: 340,
                background: '#fff',
                borderRadius: 10,
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.15)',
                border: '1px solid #e2e8f0',
                zIndex: 1000,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  padding: '10px 14px',
                  borderBottom: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <b style={{ fontSize: 14 }}>Notifications</b>
                <button
                  onClick={() =>
                    setNotifs((p) => p.map((n) => ({ ...n, read: true })))
                  }
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#3b82f6',
                    fontSize: 12,
                    cursor: 'pointer',
                  }}
                >
                  Read all
                </button>
              </div>
              <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                {notifs.length === 0 ? (
                  <div
                    style={{
                      padding: 24,
                      textAlign: 'center',
                      color: '#94a3b8',
                    }}
                  >
                    None
                  </div>
                ) : (
                  notifs.map((n) => (
                    <div
                      key={n.id}
                      onClick={() =>
                        setNotifs((p) =>
                          p.map((x) =>
                            x.id === n.id ? { ...x, read: true } : x
                          )
                        )
                      }
                      style={{
                        padding: '8px 14px',
                        borderBottom: '1px solid #f1f5f9',
                        cursor: 'pointer',
                        background: n.read ? '#fff' : 'rgba(59,130,246,0.03)',
                        display: 'flex',
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: '50%',
                          background: n.read ? 'transparent' : '#3b82f6',
                          marginTop: 5,
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600 }}>
                          {n.title}
                        </div>
                        <div style={{ fontSize: 12, color: '#64748b' }}>
                          {n.msg}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: '#94a3b8',
                            marginTop: 1,
                          }}
                        >
                          {n.ts}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setNotifs((p) => p.filter((x) => x.id !== n.id));
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: 2,
                        }}
                      >
                        <X size={12} color="#94a3b8" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#f8fafc',
        fontFamily: "'Inter',-apple-system,sans-serif",
        color: '#0f172a',
      }}
    >
      <Sidebar />
      <div
        style={{
          flex: 1,
          marginLeft: sb ? 240 : 64,
          transition: 'margin 0.3s',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Topbar />
        <div style={{ flex: 1, padding: 28, overflowY: 'auto' }}>
          {vw === 'dashboard' && <Dash />}
          {vw === 'documents' && <Docs />}
          {vw === 'workflows' && <WfV />}
          {vw === 'analytics' && <Ana />}
          {vw === 'settings' && <Sett />}
        </div>
      </div>
      <DocModal />
      <SigModal />
      <CreateModal />
      <ReassignM />
      <ResubM />
      <WfM />
      <UsrM />
    </div>
  );
}
