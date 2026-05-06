import { useState, useEffect } from "react";

// ─── Data ─────────────────────────────────────────────────────────────────────
const ALL_SKILLS = [
  { id: 5, name: "Python", category: "Programming", icon: "🐍" },
  { id: 6, name: "Java", category: "Programming", icon: "☕" },
  { id: 7, name: "C / C++", category: "Programming", icon: "⚙️" },
  { id: 8, name: "JavaScript", category: "Programming", icon: "🟨" },
  { id: 9, name: "React.js", category: "Programming", icon: "⚛️" },
  { id: 10, name: "Node.js", category: "Programming", icon: "🟩" },
  { id: 11, name: "Flutter / Dart", category: "Programming", icon: "📱" },
  { id: 12, name: "Web Development", category: "Programming", icon: "🌐" },
  { id: 13, name: "Machine Learning", category: "AI/ML", icon: "🤖" },
  { id: 14, name: "Deep Learning", category: "AI/ML", icon: "🧠" },
  { id: 15, name: "NLP", category: "AI/ML", icon: "💬" },
  { id: 16, name: "Computer Vision", category: "AI/ML", icon: "👁️" },
  { id: 17, name: "UI/UX Design", category: "Design", icon: "🎨" },
  { id: 18, name: "Figma", category: "Design", icon: "✏️" },
  { id: 19, name: "Canva / Graphic Design", category: "Design", icon: "🖼️" },
  { id: 20, name: "Video Editing", category: "Design", icon: "🎬" },
  { id: 21, name: "SQL / MySQL", category: "Database", icon: "🗄️" },
  { id: 22, name: "MongoDB", category: "Database", icon: "🍃" },
  { id: 23, name: "Firebase", category: "Database", icon: "🔥" },
  { id: 24, name: "Data Structures & Algorithms", category: "CS Core", icon: "🧮" },
  { id: 25, name: "Operating Systems", category: "CS Core", icon: "💾" },
  { id: 26, name: "Computer Networks", category: "CS Core", icon: "🔗" },
  { id: 27, name: "DBMS Theory", category: "CS Core", icon: "📚" },
  { id: 28, name: "Arduino / IoT", category: "Electronics", icon: "🔌" },
  { id: 29, name: "Circuit Design", category: "Electronics", icon: "⚡" },
  { id: 30, name: "VLSI", category: "Electronics", icon: "🔬" },
  { id: 31, name: "Public Speaking", category: "Arts & Soft Skills", icon: "🎤" },
  { id: 32, name: "Classical Dance", category: "Arts & Soft Skills", icon: "💃" },
  { id: 33, name: "Western Dance", category: "Arts & Soft Skills", icon: "🕺" },
  { id: 34, name: "Music / Guitar", category: "Arts & Soft Skills", icon: "🎸" },
  { id: 35, name: "Sketching / Fine Arts", category: "Arts & Soft Skills", icon: "🖌️" },
  { id: 36, name: "Photography", category: "Arts & Soft Skills", icon: "📷" },
  { id: 37, name: "Music", category: "Arts & Soft Skills", icon: "🎵" },
  { id: 38, name: "GitHub Basics", category: "Programming", icon: "🐙" },
  { id: 39, name: "Hip Hop", category: "Arts & Soft Skills", icon: "🎤" },
];

const CATEGORIES = ["All", "Programming", "AI/ML", "Design", "Database", "CS Core", "Electronics", "Arts & Soft Skills"];
const CS_LOCATIONS = ["UB Block", "TP1 Block", "TP2 Block"];
const CS_ROOMS = ["702", "703", "704", "801", "802", "Lab 1", "Lab 2", "Seminar Hall"];
const NON_CS_LOCATIONS = ["MBA Block", "Online (Google Meet)", "Library Study Room"];
const CS_CATEGORIES = ["Programming", "AI/ML", "Database", "CS Core", "Electronics"];

function getLocationOptions(skillCat) {
  return CS_CATEGORIES.includes(skillCat) ? CS_LOCATIONS : NON_CS_LOCATIONS;
}

const MOCK_USERS = [
  { id: 2, name: "Arun Raj", dept: "ECE", year: 3, avatar: "AR", offering: ["UI/UX Design", "Figma"], requesting: ["Python"] },
  { id: 3, name: "Priya Nair", dept: "IT", year: 2, avatar: "PN", offering: ["React.js", "Web Development"], requesting: ["Machine Learning"] },
  { id: 4, name: "Karthik S", dept: "CSE", year: 4, avatar: "KS", offering: ["Machine Learning", "Data Structures & Algorithms"], requesting: ["Figma"] },
  { id: 5, name: "Divya M", dept: "AIDS", year: 3, avatar: "DM", offering: ["SQL / MySQL", "Python"], requesting: ["React.js"] },
  { id: 6, name: "Rahul V", dept: "CSE", year: 2, avatar: "RV", offering: ["C / C++", "DBMS Theory"], requesting: ["Deep Learning"] },
  { id: 7, name: "Meera K", dept: "ECE", year: 3, avatar: "MK", offering: ["Classical Dance", "Western Dance"], requesting: ["Python"] },
];

// ─── CSS ──────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --bg: #09090e; --surface: #12121a; --surface2: #1a1a25; --surface3: #222230;
    --border: rgba(255,255,255,0.07); --border2: rgba(255,255,255,0.12);
    --accent: #6c63ff; --accent2: #ff6b6b; --accent3: #43e97b; --gold: #f7c948;
    --text: #f0eeff; --muted: #7b7a99; --muted2: #5a5975;
    --card-glow: rgba(108,99,255,0.1);
  }
  body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; line-height: 1.5; }
  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* ── Nav ── */
  .nav { display:flex; align-items:center; justify-content:space-between; padding:0 32px; height:62px; background:rgba(9,9,14,0.9); backdrop-filter:blur(20px); border-bottom:1px solid var(--border); position:sticky; top:0; z-index:100; }
  .nav-logo { font-family:'Syne',sans-serif; font-weight:800; font-size:17px; display:flex; align-items:center; gap:10px; letter-spacing:-0.02em; }
  .logo-dot { width:9px; height:9px; border-radius:50%; background:var(--accent); box-shadow:0 0 14px var(--accent); animation:pulse 2.4s infinite; }
  @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(0.85)}}
  .nav-tabs { display:flex; gap:2px; }
  .nav-tab { padding:7px 16px; border-radius:8px; cursor:pointer; font-size:13.5px; font-weight:500; color:var(--muted); border:none; background:transparent; transition:all 0.18s; font-family:'DM Sans',sans-serif; }
  .nav-tab:hover { color:var(--text); background:var(--surface2); }
  .nav-tab.active { color:var(--text); background:var(--surface2); box-shadow:inset 0 0 0 1px var(--border2); }
  .nav-user { display:flex; align-items:center; gap:9px; font-size:13.5px; padding:5px 13px; border-radius:50px; background:var(--surface2); border:1px solid var(--border); cursor:pointer; transition:all 0.18s; }
  .nav-user:hover { border-color:var(--border2); }
  .avatar-sm { width:28px; height:28px; border-radius:50%; background:linear-gradient(135deg,var(--accent),var(--accent2)); display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:800; font-family:'Syne',sans-serif; }

  /* ── Login ── */
  .login-page { flex:1; display:flex; align-items:center; justify-content:center; min-height:100vh; position:relative; overflow:hidden; }
  .login-bg { position:absolute; inset:0; background:radial-gradient(ellipse 55% 55% at 15% 50%, rgba(108,99,255,0.14) 0%,transparent 70%),radial-gradient(ellipse 40% 40% at 85% 25%, rgba(255,107,107,0.09) 0%,transparent 70%),radial-gradient(ellipse 45% 45% at 55% 85%, rgba(67,233,123,0.06) 0%,transparent 70%); pointer-events:none; }
  .login-grid { position:absolute; inset:0; background-image:linear-gradient(var(--border) 1px,transparent 1px),linear-gradient(90deg,var(--border) 1px,transparent 1px); background-size:52px 52px; mask-image:radial-gradient(ellipse 75% 75% at 50% 50%,black 30%,transparent 100%); pointer-events:none; }
  .login-wrap { display:flex; gap:0; border-radius:28px; overflow:hidden; border:1px solid var(--border); box-shadow:0 0 80px rgba(108,99,255,0.12); animation:slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both; position:relative; z-index:1; }
  .login-panel-left { background:linear-gradient(145deg,rgba(108,99,255,0.15),rgba(255,107,107,0.08)); padding:44px 40px; width:350px; display:flex; flex-direction:column; justify-content:space-between; border-right:1px solid var(--border); }  
  .login-panel-right { background:var(--surface); padding:44px 40px; width:380px; }
  .login-college { font-size:12px; color:var(--muted); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:24px; }
  .login-big { font-family:'Syne',sans-serif; font-size:26px; font-weight:800; line-height:1.1; margin-bottom:12px; }
  .login-big .acc { color:var(--accent); }
  .login-desc { color:var(--muted); font-size:13px; line-height:1.7; }
  .login-steps { display:flex; flex-direction:column; gap:10px; }
  .login-step { display:flex; align-items:center; gap:10px; font-size:12px; color:var(--muted); }
  .step-dot { width:6px; height:6px; border-radius:50%; background:var(--accent); flex-shrink:0; }
  .login-title { font-family:'Syne',sans-serif; font-size:22px; font-weight:800; margin-bottom:4px; }
  .login-sub { color:var(--muted); font-size:13px; margin-bottom:28px; }
  .input-group { margin-bottom:14px; }
  .input-label { font-size:11px; font-weight:600; color:var(--muted); margin-bottom:6px; text-transform:uppercase; letter-spacing:0.06em; display:block; }
  .input-wrap { position:relative; }
  .input-icon { position:absolute; left:13px; top:50%; transform:translateY(-50%); color:var(--muted); font-size:15px; pointer-events:none; }
  .input-field { width:100%; padding:11px 13px 11px 38px; background:var(--surface2); border:1px solid var(--border); border-radius:11px; color:var(--text); font-family:'DM Sans',sans-serif; font-size:14px; transition:border-color 0.2s,box-shadow 0.2s; outline:none; }
  .input-field.no-icon { padding-left:13px; }
  .input-field::placeholder { color:var(--muted2); }
  .input-field:focus { border-color:rgba(108,99,255,0.5); box-shadow:0 0 0 3px rgba(108,99,255,0.1); }
  .srm-hint { font-size:11px; color:var(--muted2); margin-top:5px; }
  .btn-primary { width:100%; padding:12px; border-radius:11px; background:var(--accent); color:#fff; font-family:'Syne',sans-serif; font-size:15px; font-weight:700; border:none; cursor:pointer; transition:all 0.2s; box-shadow:0 4px 20px rgba(108,99,255,0.35); margin-top:6px; }
  .btn-primary:hover { background:#7d75ff; box-shadow:0 6px 30px rgba(108,99,255,0.5); transform:translateY(-1px); }
  .btn-primary:active { transform:translateY(0); }
  .error-msg { background:rgba(255,107,107,0.1); border:1px solid rgba(255,107,107,0.25); color:#ff9090; font-size:13px; padding:10px 14px; border-radius:10px; margin-bottom:14px; }

  /* ── Page ── */
  .page { flex:1; padding:32px; max-width:1200px; margin:0 auto; width:100%; }
  .page-header { margin-bottom:28px; animation:slideUp 0.4s both; }
  .page-title { font-family:'Syne',sans-serif; font-size:26px; font-weight:800; margin-bottom:3px; }
  .page-sub { color:var(--muted); font-size:13.5px; }
  @keyframes slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}

  /* ── Stats ── */
  .stats-strip { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:28px; }
  .stat-card { background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:20px 22px; animation:slideUp 0.4s both; }
  .stat-label { font-size:11px; color:var(--muted); text-transform:uppercase; letter-spacing:0.07em; margin-bottom:8px; }
  .stat-value { font-family:'Syne',sans-serif; font-size:30px; font-weight:800; }
  .stat-value.accent{color:var(--accent)} .stat-value.gold{color:var(--gold)} .stat-value.green{color:var(--accent3)} .stat-value.red{color:var(--accent2)}

  /* ── Section title ── */
  .section-title { font-family:'Syne',sans-serif; font-size:15px; font-weight:700; margin-bottom:14px; display:flex; align-items:center; gap:8px; }
  .section-title span { color:var(--muted); font-size:12.5px; font-weight:400; font-family:'DM Sans',sans-serif; }

  /* ── Chips ── */
  .chips { display:flex; flex-wrap:wrap; gap:7px; }
  .chip { padding:5px 13px; border-radius:50px; font-size:13px; font-weight:500; background:var(--surface2); border:1px solid var(--border); cursor:pointer; transition:all 0.18s; }
  .chip:hover { border-color:rgba(108,99,255,0.4); }
  .chip.offer { border-color:rgba(67,233,123,0.3); color:var(--accent3); background:rgba(67,233,123,0.06); }
  .chip.request { border-color:rgba(255,107,107,0.3); color:var(--accent2); background:rgba(255,107,107,0.06); }
  .chip.selected { border-color:var(--accent); background:rgba(108,99,255,0.14); color:#a89fff; }

  /* ── User cards ── */
  .users-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(270px,1fr)); gap:14px; }
  .user-card { background:var(--surface); border:1px solid var(--border); border-radius:20px; padding:22px; cursor:pointer; transition:all 0.25s; animation:slideUp 0.4s both; position:relative; overflow:hidden; }
  .user-card::before { content:''; position:absolute; inset:0; background:radial-gradient(circle at 80% 20%,var(--card-glow),transparent 60%); opacity:0; transition:opacity 0.3s; }
  .user-card:hover { border-color:rgba(108,99,255,0.3); transform:translateY(-3px); box-shadow:0 12px 40px rgba(0,0,0,0.3); }
  .user-card:hover::before { opacity:1; }
  .user-card-top { display:flex; align-items:center; gap:13px; margin-bottom:14px; }
  .avatar-lg { width:46px; height:46px; border-radius:50%; background:linear-gradient(135deg,var(--accent),var(--accent2)); display:flex; align-items:center; justify-content:center; font-size:15px; font-weight:800; font-family:'Syne',sans-serif; flex-shrink:0; }
  .user-name { font-family:'Syne',sans-serif; font-weight:700; font-size:15px; }
  .user-meta { color:var(--muted); font-size:12px; margin-top:2px; }
  .skill-label { font-size:11px; color:var(--muted); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:5px; }
  .user-skills-section { margin-bottom:9px; }
  .connect-btn { width:100%; padding:9px; margin-top:12px; border-radius:10px; background:rgba(108,99,255,0.1); border:1px solid rgba(108,99,255,0.22); color:#a89fff; font-family:'Syne',sans-serif; font-size:13px; font-weight:700; cursor:pointer; transition:all 0.2s; }
  .connect-btn:hover { background:rgba(108,99,255,0.2); border-color:rgba(108,99,255,0.5); }

  /* ── Skills ── */
  .skills-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:12px; }
  .skill-card { background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:18px; cursor:pointer; transition:all 0.22s; animation:slideUp 0.4s both; }
  .skill-card:hover { border-color:rgba(108,99,255,0.35); transform:translateY(-2px); box-shadow:0 8px 28px rgba(0,0,0,0.25); }
  .skill-icon { font-size:28px; margin-bottom:10px; }
  .skill-name { font-family:'Syne',sans-serif; font-weight:700; font-size:14.5px; margin-bottom:3px; }
  .skill-cat { color:var(--muted); font-size:11px; margin-bottom:14px; }
  .skill-actions { display:flex; gap:7px; }
  .btn-offer { flex:1; padding:7px; border-radius:8px; background:rgba(67,233,123,0.08); border:1px solid rgba(67,233,123,0.2); color:var(--accent3); font-size:12px; font-weight:700; cursor:pointer; transition:all 0.18s; font-family:'Syne',sans-serif; }
  .btn-offer:hover { background:rgba(67,233,123,0.17); }
  .btn-req { flex:1; padding:7px; border-radius:8px; background:rgba(255,107,107,0.08); border:1px solid rgba(255,107,107,0.2); color:var(--accent2); font-size:12px; font-weight:700; cursor:pointer; transition:all 0.18s; font-family:'Syne',sans-serif; }
  .btn-req:hover { background:rgba(255,107,107,0.17); }

  /* ── Sessions ── */
  .session-row { background:var(--surface); border:1px solid var(--border); border-radius:16px; padding:18px 22px; display:flex; align-items:center; gap:18px; animation:slideUp 0.4s both; cursor:pointer; transition:all 0.2s; }
  .session-row:hover { border-color:rgba(108,99,255,0.3); transform:translateY(-1px); }
  .session-avatar { width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg,var(--accent2),var(--gold)); display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:800; font-family:'Syne',sans-serif; flex-shrink:0; }
  .session-info { flex:1; }
  .session-name { font-weight:600; font-size:14.5px; }
  .session-detail { color:var(--muted); font-size:12.5px; margin-top:2px; }
  .status-badge { padding:3px 11px; border-radius:50px; font-size:12px; font-weight:600; white-space:nowrap; }
  .status-badge.completed { background:rgba(67,233,123,0.1); color:var(--accent3); border:1px solid rgba(67,233,123,0.2); }
  .status-badge.scheduled { background:rgba(247,201,72,0.1); color:var(--gold); border:1px solid rgba(247,201,72,0.2); }
  .status-badge.pending { background:rgba(108,99,255,0.1); color:#a89fff; border:1px solid rgba(108,99,255,0.2); }
  .rating-stars { color:var(--gold); font-size:13px; }

  /* ── Profile ── */
  .profile-hero { background:var(--surface); border:1px solid var(--border); border-radius:22px; padding:30px; margin-bottom:20px; display:flex; align-items:flex-start; gap:22px; animation:slideUp 0.4s both; background-image:radial-gradient(ellipse 50% 80% at 90% 50%,rgba(108,99,255,0.07) 0%,transparent 70%); }
  .avatar-xl { width:76px; height:76px; border-radius:50%; background:linear-gradient(135deg,var(--accent),var(--accent2)); display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:800; font-family:'Syne',sans-serif; flex-shrink:0; box-shadow:0 0 0 4px rgba(108,99,255,0.18),0 0 24px rgba(108,99,255,0.15); }
  .profile-name { font-family:'Syne',sans-serif; font-size:22px; font-weight:800; margin-bottom:4px; }
  .profile-email { color:var(--muted); font-size:13px; margin-bottom:10px; }
  .profile-tags { display:flex; gap:7px; flex-wrap:wrap; }
  .profile-tag { padding:3px 11px; border-radius:50px; font-size:12px; font-weight:500; background:var(--surface2); border:1px solid var(--border); }
  .profile-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .profile-section { background:var(--surface); border:1px solid var(--border); border-radius:18px; padding:22px; animation:slideUp 0.4s both; }
  .profile-section.full { grid-column:1/-1; }
  .edit-btn { padding:9px 20px; border-radius:10px; background:var(--surface2); border:1px solid var(--border); color:var(--text); font-family:'Syne',sans-serif; font-size:13px; font-weight:700; cursor:pointer; transition:all 0.2s; white-space:nowrap; }
  .edit-btn:hover { border-color:var(--border2); background:var(--surface3); }
  .save-btn { padding:9px 20px; border-radius:10px; background:var(--accent); border:none; color:#fff; font-family:'Syne',sans-serif; font-size:13px; font-weight:700; cursor:pointer; transition:all 0.2s; white-space:nowrap; }
  .save-btn:hover { background:#7d75ff; }

  /* ── Withdraw button ── */
  .btn-withdraw { padding:3px 10px; border-radius:50px; background:rgba(255,107,107,0.08); border:1px solid rgba(255,107,107,0.25); color:var(--accent2); font-size:11px; font-weight:700; cursor:pointer; transition:all 0.18s; font-family:'Syne',sans-serif; margin-left:6px; }
  .btn-withdraw:hover { background:rgba(255,107,107,0.2); }

  /* ── Skill row with withdraw ── */
  .skill-row { display:flex; align-items:center; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border); }
  .skill-row:last-child { border-bottom:none; }

  /* ── Session detail card (in profile) ── */
  .session-detail-card { background:var(--surface2); border:1px solid var(--border); border-radius:14px; padding:16px 18px; cursor:pointer; transition:all 0.2s; display:flex; align-items:center; gap:14px; }
  .session-detail-card:hover { border-color:rgba(108,99,255,0.3); transform:translateX(3px); }
  .sdc-icon { font-size:22px; flex-shrink:0; }
  .sdc-info { flex:1; }
  .sdc-title { font-family:'Syne',sans-serif; font-weight:700; font-size:14px; margin-bottom:2px; }
  .sdc-sub { color:var(--muted); font-size:12px; }
  .sdc-location { font-size:11px; color:#a89fff; background:rgba(108,99,255,0.1); border:1px solid rgba(108,99,255,0.2); padding:2px 9px; border-radius:50px; white-space:nowrap; }

  /* ── Modal ── */
  .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.65); backdrop-filter:blur(10px); display:flex; align-items:center; justify-content:center; z-index:200; animation:fadeIn 0.2s both; }
  @keyframes fadeIn{from{opacity:0}to{opacity:1}}
  .modal { background:var(--surface); border:1px solid var(--border2); border-radius:22px; padding:30px; width:500px; max-width:95vw; max-height:90vh; overflow-y:auto; box-shadow:0 24px 80px rgba(0,0,0,0.55); animation:slideUp 0.3s cubic-bezier(0.16,1,0.3,1) both; }
  .modal-title { font-family:'Syne',sans-serif; font-size:19px; font-weight:800; margin-bottom:4px; }
  .modal-sub { color:var(--muted); font-size:13px; margin-bottom:22px; }
  .modal-actions { display:flex; gap:10px; margin-top:22px; }
  .btn-cancel { flex:1; padding:11px; border-radius:10px; background:var(--surface2); border:1px solid var(--border); color:var(--muted); font-family:'Syne',sans-serif; font-size:14px; font-weight:700; cursor:pointer; }
  .btn-confirm { flex:1; padding:11px; border-radius:10px; background:var(--accent); border:none; color:#fff; font-family:'Syne',sans-serif; font-size:14px; font-weight:700; cursor:pointer; transition:all 0.2s; }
  .btn-confirm:hover { background:#7d75ff; }
  .btn-danger { flex:1; padding:11px; border-radius:10px; background:rgba(255,107,107,0.1); border:1px solid rgba(255,107,107,0.3); color:var(--accent2); font-family:'Syne',sans-serif; font-size:14px; font-weight:700; cursor:pointer; transition:all 0.2s; }
  .btn-danger:hover { background:rgba(255,107,107,0.2); }
  .location-tag { display:inline-flex; align-items:center; gap:6px; background:rgba(108,99,255,0.12); border:1px solid rgba(108,99,255,0.25); color:#a89fff; font-size:12px; padding:4px 12px; border-radius:50px; margin-top:8px; }

  /* ── Session detail modal ── */
  .detail-row { display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid var(--border); }
  .detail-row:last-child { border-bottom:none; }
  .detail-label { color:var(--muted); font-size:13px; }
  .detail-value { font-weight:600; font-size:13.5px; font-family:'Syne',sans-serif; }

  /* ── Toast ── */
  .toast { position:fixed; bottom:28px; left:50%; transform:translateX(-50%); background:var(--surface2); border:1px solid var(--border2); border-radius:50px; padding:11px 22px; font-size:14px; font-weight:500; z-index:300; box-shadow:0 8px 32px rgba(0,0,0,0.4); animation:toastIn 0.3s cubic-bezier(0.16,1,0.3,1) both; white-space:nowrap; }
  @keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(14px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}

  select.input-field { padding-left:13px; }
  .divider { height:1px; background:var(--border); margin:16px 0; }

  @media(max-width:768px){
    .stats-strip{grid-template-columns:repeat(2,1fr)}
    .profile-grid{grid-template-columns:1fr}
    .login-panel-left{display:none}
    .login-wrap{border-radius:20px}
    .page{padding:16px}
    .nav{padding:0 16px}
    .nav-tabs{display:none}
  }
`;

// ─── Sessions linked to current user (sample data) ────────────────────────────
const MY_SESSIONS = [
  {
    id: 1, type: "requested", with: "Arun Raj", withAvatar: "AR",
    skill: "UI/UX Design", skillCat: "Design",
    date: "Feb 10, 2026", time: "4:00 PM", duration: "60 min",
    status: "Completed", location: "MBA Block", room: null,
    rating: 5, comment: "Very helpful session! Learned Figma basics.",
  },
  {
    id: 2, type: "offered", with: "Divya M", withAvatar: "DM",
    skill: "Python", skillCat: "Programming",
    date: "Feb 12, 2026", time: "10:00 AM", duration: "45 min",
    status: "Completed", location: "TP2 Block", room: "702",
    rating: 4, comment: "Good explanation of lists.",
  },
  {
    id: 3, type: "offered", with: "Rahul V", withAvatar: "RV",
    skill: "SQL / MySQL", skillCat: "Database",
    date: "Apr 30, 2026", time: "2:00 PM", duration: "60 min",
    status: "Scheduled", location: "UB Block", room: "801",
    rating: null, comment: null,
  },
  {
    id: 4, type: "requested", with: "Priya Nair", withAvatar: "PN",
    skill: "React.js", skillCat: "Programming",
    date: "May 5, 2026", time: "11:00 AM", duration: "45 min",
    status: "Pending", location: "TP1 Block", room: "Lab 1",
    rating: null, comment: null,
  },
];

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("login");
  const [currentUser, setCurrentUser] = useState(null);
  const [sessions, setSessions] = useState(MY_SESSIONS);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState(null);
  const [connectModal, setConnectModal] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUser({ id: payload.id, name: payload.name, email: payload.email, offering: [], requesting: [] });
        setPage("dashboard");
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const [loginStep, setLoginStep] = useState("register");
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const handleRegister = async () => {
    if (!regName.trim()) return setLoginError("Please enter your full name.");
    if (!regEmail.endsWith("@srmist.edu.in")) return setLoginError("Use your @srmist.edu.in college email.");
    if (regPassword.length < 4) return setLoginError("Password must be at least 4 characters.");
    try {
      const res = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: regName, email: regEmail, password: regPassword }),
      });
      const data = await res.json();
      if (!res.ok) return setLoginError(data.error);
      localStorage.setItem("token", data.token);
      setCurrentUser({ ...data.user, offering: [], requesting: [] });
      setPage("dashboard");
    } catch {
      setLoginError("Could not connect to server.");
    }
  };

  const handleLogin = async () => {
    if (!loginEmail.endsWith("@srmist.edu.in")) return setLoginError("Use your @srmist.edu.in college email.");
    if (loginPassword.length < 4) return setLoginError("Password must be at least 4 characters.");
    try {
      const res = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      const data = await res.json();
      if (!res.ok) return setLoginError(data.error);
      localStorage.setItem("token", data.token);
      setCurrentUser({ ...data.user, offering: [], requesting: [] });
      setPage("dashboard");
    } catch {
      setLoginError("Could not connect to server.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setPage("login");
    setLoginError("");
  };
  
  const handleCommunityJoin = async (targetUser, skill) => {
  try {
    const res = await fetch(`http://localhost:4000/api/skills/offering-detail/${targetUser.user_id}/${encodeURIComponent(skill)}`);
    const data = await res.json();
    if (!data.offer_id) return showToast("Could not find offer details.");
    const res2 = await fetch(`http://localhost:4000/api/skills/request-detail/${currentUser.id}/${encodeURIComponent(skill)}`);
    const data2 = await res2.json();
    if (!data2.request_id) {
      const res3 = await fetch("http://localhost:4000/api/skills/request", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pref_time: "Flexible", goal: `Learn ${skill} from ${targetUser.name}`, user_id: currentUser.id, skill_id: data.skill_id }),
      });
      const data3 = await res3.json();
      await fetch("http://localhost:4000/api/skills/session/create", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offer_id: data.offer_id, request_id: data3.request_id }),
      });
    } else {
      await fetch("http://localhost:4000/api/skills/session/create", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offer_id: data.offer_id, request_id: data2.request_id }),
      });
    }
    showToast(`🎉 Join request sent to ${targetUser.name} for ${skill}!`);
    setConnectModal(null);
  } catch { showToast("Failed to send join request."); }
};

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {page !== "login" && currentUser && (
          <Nav page={page} setPage={setPage} user={currentUser} onLogout={handleLogout} />
        )}
        {page === "login" && (
          <LoginPage
            step={loginStep} setStep={setLoginStep}
            regName={regName} setRegName={setRegName}
            regEmail={regEmail} setRegEmail={setRegEmail}
            regPassword={regPassword} setRegPassword={setRegPassword}
            loginEmail={loginEmail} setLoginEmail={setLoginEmail}
            loginPassword={loginPassword} setLoginPassword={setLoginPassword}
            error={loginError} onRegister={handleRegister} onLogin={handleLogin}
          />
        )}
        {page === "dashboard" && <DashboardPage user={currentUser} sessions={sessions} setPage={setPage} showToast={showToast} setModal={setModal} />}
        {page === "skills" && <SkillsPage setModal={setModal} showToast={showToast} currentUser={currentUser} />}
        {page === "community" && <CommunityPage showToast={showToast} currentUser={currentUser} setConnectModal={setConnectModal} />}
        {page === "sessions" && <SessionsPage sessions={sessions} setModal={setModal} currentUser={currentUser} showToast={showToast} />}
        {page === "profile" && <ProfilePage user={currentUser} setUser={setCurrentUser} sessions={sessions} setModal={setModal} showToast={showToast} />}
        {modal && <Modal modal={modal} setModal={setModal} showToast={showToast} sessions={sessions} setSessions={setSessions} />}
        {connectModal && (
  <div className="modal-overlay" onClick={() => setConnectModal(null)}>
    <div className="modal" onClick={e => e.stopPropagation()}>
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20 }}>
        <div className="avatar-lg">{connectModal.avatar || connectModal.name.slice(0,2).toUpperCase()}</div>
        <div>
          <div className="modal-title">{connectModal.name}</div>
          <div style={{ color:"var(--muted)", fontSize:13 }}>{connectModal.dept} · Year {connectModal.year}</div>
        </div>
      </div>
      {connectModal.offering.length > 0 ? (
        <>
          <div style={{ color:"var(--muted)", fontSize:13, marginBottom:14 }}>
            Choose a skill to learn from {connectModal.name.split(" ")[0]}:
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
            {connectModal.offering.map(skill => (
              <div key={skill} style={{ background:"var(--surface2)", border:"1px solid var(--border)", borderRadius:12, padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:14 }}>{skill}</div>
                  <div style={{ color:"var(--muted)", fontSize:12, marginTop:2 }}>Offered by {connectModal.name.split(" ")[0]}</div>
                </div>
                <button className="btn-confirm" style={{ width:"auto", padding:"8px 16px", fontSize:13 }}
                  onClick={() => handleCommunityJoin(connectModal, skill)}>
                  Join Session →
                </button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ color:"var(--muted)", fontSize:13, textAlign:"center", padding:20 }}>
          {connectModal.name.split(" ")[0]} hasn't offered any skills yet.
        </div>
      )}
      <div className="modal-actions">
        <button className="btn-cancel" onClick={() => setConnectModal(null)}>Close</button>
      </div>
    </div>
  </div>
)}
        {toast && <div className="toast">✓ {toast}</div>}
      </div>
    </>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ page, setPage, user, onLogout }) {
  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "skills", label: "Skills" },
    { id: "community", label: "Community" },
    { id: "sessions", label: "Sessions" },
  ];
  return (
    <nav className="nav">
      <div className="nav-logo"><div className="logo-dot" />SkillBridge <span style={{ color: "var(--muted)", fontWeight: 400, fontSize: 13 }}>SRM</span></div>
      <div className="nav-tabs">
        {tabs.map(t => <button key={t.id} className={`nav-tab ${page === t.id ? "active" : ""}`} onClick={() => setPage(t.id)}>{t.label}</button>)}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <div className="nav-user" onClick={() => setPage("profile")}>
          <div className="avatar-sm">{user.name.split(" ").map(w => w[0]).join("").slice(0, 2)}</div>
          {user.name.split(" ")[0]}
        </div>
        <button onClick={onLogout} style={{ background: "none", border: "1px solid var(--border)", color: "var(--muted)", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 12, fontFamily: "'DM Sans',sans-serif" }}>Logout</button>
      </div>
    </nav>
  );
}

// ─── Login Page ───────────────────────────────────────────────────────────────
function LoginPage({ step, setStep, regName, setRegName, regEmail, setRegEmail, regPassword, setRegPassword, loginEmail, setLoginEmail, loginPassword, setLoginPassword, error, onRegister, onLogin }) {
  const isReg = step === "register";
  return (
    <div className="login-page">
      <div className="login-bg" /><div className="login-grid" />
      <div className="login-wrap">
        <div className="login-panel-left">
          <div>
            <div className="login-college">SRM Institute of Science & Technology</div>
            <div className="login-big">Student<br /><span className="acc">Skill</span><br />Exchange</div>
            <div className="login-desc">Peer-to-peer skill sharing across departments. Teach what you know, learn what you need.</div>
          </div>
          <div className="login-steps">
            {["Sign up with your SRM email", "Offer or request skills", "Connect & schedule sessions", "Rate and grow together"].map((s, i) => (
              <div key={i} className="login-step"><div className="step-dot" />{s}</div>
            ))}
          </div>
        </div>
        <div className="login-panel-right">
          <div className="login-title">{isReg ? "Create Account" : "Welcome Back"}</div>
          <div className="login-sub">{isReg ? "New to SkillBridge? Let's get you set up." : "Sign in to your SkillBridge account."}</div>
          {error && <div className="error-msg">⚠ {error}</div>}
          {isReg ? (
            <>
              <div className="input-group">
                <label className="input-label">Full Name</label>
                <div className="input-wrap"><span className="input-icon">👤</span>
                  <input className="input-field" placeholder="e.g. Sandra Kumar" value={regName} onChange={e => setRegName(e.target.value)} onKeyDown={e => e.key === "Enter" && onRegister()} />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">College Email</label>
                <div className="input-wrap"><span className="input-icon">✉</span>
                  <input className="input-field" placeholder="yourname@srmist.edu.in" value={regEmail} onChange={e => setRegEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && onRegister()} />
                </div>
                <div className="srm-hint">Only @srmist.edu.in addresses are accepted</div>
              </div>
              <div className="input-group">
                <label className="input-label">Password</label>
                <div className="input-wrap"><span className="input-icon">🔒</span>
                  <input className="input-field" type="password" placeholder="Create a password" value={regPassword} onChange={e => setRegPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && onRegister()} />
                </div>
              </div>
              <button className="btn-primary" onClick={onRegister}>Create Account →</button>
              <div style={{ marginTop: 16, textAlign: "center", fontSize: 13, color: "var(--muted)" }}>
                Already have an account?{" "}
                <span style={{ color: "#a89fff", cursor: "pointer", fontWeight: 600 }} onClick={() => setStep("login")}>Sign in</span>
              </div>
            </>
          ) : (
            <>
              <div className="input-group">
                <label className="input-label">College Email</label>
                <div className="input-wrap"><span className="input-icon">✉</span>
                  <input className="input-field" placeholder="yourname@srmist.edu.in" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && onLogin()} />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Password</label>
                <div className="input-wrap"><span className="input-icon">🔒</span>
                  <input className="input-field" type="password" placeholder="Your password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && onLogin()} />
                </div>
              </div>
              <button className="btn-primary" onClick={onLogin}>Sign In →</button>
              <div style={{ marginTop: 16, textAlign: "center", fontSize: 13, color: "var(--muted)" }}>
                New here?{" "}
                <span style={{ color: "#a89fff", cursor: "pointer", fontWeight: 600 }} onClick={() => setStep("register")}>Create an account</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
function DashboardPage({ user, sessions, setPage, showToast, setModal }) {
  const firstName = user.name.split(" ")[0];
  const completed = sessions.filter(s => s.status === "Completed").length;
  const scheduled = sessions.filter(s => s.status === "Scheduled" || s.status === "Pending").length;
  const avgRating = (sessions.filter(s => s.rating).reduce((a, b) => a + b.rating, 0) / (sessions.filter(s => s.rating).length || 1)).toFixed(1);
  const [offeredCount, setOfferedCount] = useState(0);
  const [requestedCount, setRequestedCount] = useState(0);

  useEffect(() => {
    if (user.id) {
      fetch(`http://localhost:4000/api/skills/offers/${user.id}`)
        .then(res => res.json())
        .then(data => setOfferedCount(data.length))
        .catch(() => {});
      fetch(`http://localhost:4000/api/skills/requests/${user.id}`)
        .then(res => res.json())
        .then(data => setRequestedCount(data.length))
        .catch(() => {});
    }
  }, [user.id]);

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Good morning, {firstName} 👋</div>
        <div className="page-sub">Here's what's happening in your skill exchange network.</div>
      </div>
      <div className="stats-strip">
        {[
          { label: "Skills Offered", value: offeredCount, cls: "accent" },
          { label: "Skills Requested", value: requestedCount, cls: "red" },
          { label: "Sessions Done", value: completed, cls: "green" },
          { label: "Avg. Rating", value: `${avgRating}★`, cls: "gold" },
        ].map((s, i) => (
          <div className="stat-card" key={i} style={{ animationDelay: `${i * 0.06}s` }}>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-value ${s.cls}`}>{s.value}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div>
          <div className="section-title">Quick Actions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {[
              { icon: "🎯", label: "Offer a Skill", sub: "Share what you know", action: () => setPage("skills") },
              { icon: "🔍", label: "Request a Skill", sub: "Find someone to learn from", action: () => setPage("skills") },
              { icon: "👥", label: "Browse Community", sub: "See all student profiles", action: () => setPage("community") },
              { icon: "📅", label: "My Sessions", sub: `${scheduled} upcoming`, action: () => setPage("sessions") },
            ].map((item, i) => (
              <div key={i} onClick={item.action} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 13, padding: "14px 18px", display: "flex", alignItems: "center", gap: 13, cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(108,99,255,0.3)"} onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
                <div style={{ fontSize: 22 }}>{item.icon}</div>
                <div><div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14 }}>{item.label}</div><div style={{ color: "var(--muted)", fontSize: 12, marginTop: 1 }}>{item.sub}</div></div>
                <div style={{ marginLeft: "auto", color: "var(--accent)", fontWeight: 700 }}>→</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="section-title">Recent Sessions <span>{sessions.length} total</span></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {sessions.slice(0, 3).map(s => (
              <div key={s.id} onClick={() => setModal({ type: "session_detail", session: s })} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 13, padding: "14px 18px", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(108,99,255,0.3)"} onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div><div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14 }}>{s.skill} · {s.type === "offered" ? "Teaching" : "Learning"}</div><div style={{ color: "var(--muted)", fontSize: 12, marginTop: 2 }}>{s.date} · {s.with}</div></div>
                  <span className={`status-badge ${s.status.toLowerCase()}`}>{s.status}</span>
                </div>
                {s.rating && <div style={{ marginTop: 6, fontSize: 12, color: "var(--gold)" }}>{"★".repeat(s.rating)} <span style={{ color: "var(--muted)" }}>{s.comment}</span></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 28 }}>
        <div className="section-title">Suggested Matches <span>based on your skills</span></div>
        <div className="users-grid">
          {MOCK_USERS.slice(0, 3).map((u, i) => <UserCard key={u.id} user={u} delay={i * 0.05} showToast={showToast} />)}
        </div>
      </div>
    </div>
  );
}

// ─── Skills Page ──────────────────────────────────────────────────────────────
function SkillsPage({ setModal, currentUser }) {
  const [cat, setCat] = useState("All");
  const [search, setSearch] = useState("");
  const filtered = ALL_SKILLS.filter(s => (cat === "All" || s.category === cat) && s.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Browse Skills</div>
        <div className="page-sub">{ALL_SKILLS.length} skills across {CATEGORIES.length - 1} categories — offer what you know, request what you need.</div>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div className="input-wrap" style={{ flex: 1, minWidth: 200 }}>
          <span className="input-icon">🔍</span>
          <input className="input-field" placeholder="Search skills..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>
      <div className="chips" style={{ marginBottom: 20 }}>
        {CATEGORIES.map(c => <div key={c} className={`chip ${cat === c ? "selected" : ""}`} onClick={() => setCat(c)}>{c}</div>)}
      </div>
      <div className="skills-grid">
        {filtered.map((sk, i) => (
          <div className="skill-card" key={sk.id} style={{ animationDelay: `${(i % 12) * 0.03}s` }}>
            <div className="skill-icon">{sk.icon}</div>
            <div className="skill-name">{sk.name}</div>
            <div className="skill-cat">{sk.category}</div>
            <div className="skill-actions">
              <button className="btn-offer" onClick={() => setModal({ type: "offer", skill: sk, currentUser })}>Offer</button>
              <button className="btn-req" onClick={() => setModal({ type: "request", skill: sk, currentUser })}>Request</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ color: "var(--muted)", gridColumn: "1/-1", textAlign: "center", padding: 40 }}>No skills found.</div>}
      </div>
    </div>
  );
}

// ─── Community Page ───────────────────────────────────────────────────────────
function CommunityPage({ showToast, currentUser, setConnectModal }) {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");
  const [users, setUsers] = useState([]);
  const depts = ["All", "CSE", "ECE", "IT", "AIDS", "EEE"];

  useEffect(() => {
    fetch("http://localhost:4000/api/skills/community/users")
      .then(res => res.json())
      .then(data => {
        const others = data.filter(u => u.user_id !== currentUser.id);
        const parsed = others.map(u => ({
          ...u,
          offering: u.offering ? u.offering.split("||") : [],
          requesting: u.requesting ? u.requesting.split("||") : [],
        }));
        setUsers(parsed);
      })
      .catch(() => console.error("Failed to fetch users"));
  }, []);

  const filtered = users.filter(u =>
    (dept === "All" || u.dept === dept) &&
    (u.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Community</div>
        <div className="page-sub">Connect with fellow SRM students across departments.</div>
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <div className="input-wrap" style={{ flex: 1, minWidth: 200 }}>
          <span className="input-icon">🔍</span>
          <input className="input-field" placeholder="Search by name..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="chips">{depts.map(d => <div key={d} className={`chip ${dept === d ? "selected" : ""}`} onClick={() => setDept(d)}>{d}</div>)}</div>
      </div>
      <div className="users-grid">
        {filtered.map((u, i) => (
          <div key={u.user_id} className="user-card" style={{ animationDelay: `${i * 0.05}s` }}>
            <div className="user-card-top">
              <div className="avatar-lg">{u.avatar || u.name.slice(0, 2).toUpperCase()}</div>
              <div>
                <div className="user-name">{u.name}</div>
                <div className="user-meta">{u.dept || "SRM"} · Year {u.year || 1}</div>
              </div>
            </div>
            {u.offering.length > 0 && (
              <div className="user-skills-section">
                <div className="skill-label">Offers</div>
                <div className="chips" style={{ marginBottom: 9 }}>
                  {u.offering.map(s => <span key={s} className="chip offer">{s}</span>)}
                </div>
              </div>
            )}
            {u.requesting.length > 0 && (
              <div className="user-skills-section">
                <div className="skill-label">Wants to Learn</div>
                <div className="chips">
                  {u.requesting.map(s => <span key={s} className="chip request">{s}</span>)}
                </div>
              </div>
            )}
            {u.offering.length === 0 && u.requesting.length === 0 && (
              <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 9 }}>No skills listed yet.</div>
            )}
            <button className="connect-btn" onClick={() => setConnectModal(u)}>Connect →</button>
          </div>
        ))}
        {filtered.length === 0 && <div style={{ color: "var(--muted)", gridColumn: "1/-1", textAlign: "center", padding: 40 }}>No students found.</div>}
      </div>
    </div>
  );
}
// ─── UserCard (used in Dashboard suggested matches) ───────────────────────────
function UserCard({ user, delay = 0, showToast }) {
  return (
    <div className="user-card" style={{ animationDelay: `${delay}s` }}>
      <div className="user-card-top">
        <div className="avatar-lg">{user.avatar}</div>
        <div><div className="user-name">{user.name}</div><div className="user-meta">{user.dept} · Year {user.year}</div></div>
      </div>
      <div className="user-skills-section">
        <div className="skill-label">Offers</div>
        <div className="chips" style={{ marginBottom: 9 }}>{user.offering.map(s => <span key={s} className="chip offer">{s}</span>)}</div>
        <div className="skill-label">Wants to Learn</div>
        <div className="chips">{user.requesting.map(s => <span key={s} className="chip request">{s}</span>)}</div>
      </div>
      <button className="connect-btn" onClick={() => showToast(`Connection request sent to ${user.name}!`)}>Connect →</button>
    </div>
  );
}

// ─── Sessions Page ────────────────────────────────────────────────────────────
function SessionsPage({ sessions, setModal, currentUser, showToast }) {
  const [filter, setFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [offeredSkills, setOfferedSkills] = useState([]);
  const [requestedSkills, setRequestedSkills] = useState([]);

  const fetchSkills = () => {
    if (currentUser?.id) {
      fetch(`http://localhost:4000/api/skills/offers/${currentUser.id}`)
        .then(res => res.json())
        .then(data => setOfferedSkills(data))
        .catch(() => {});
      fetch(`http://localhost:4000/api/skills/requests/${currentUser.id}`)
        .then(res => res.json())
        .then(data => setRequestedSkills(data))
        .catch(() => {});
    }
  };

  useEffect(() => { fetchSkills(); }, [currentUser?.id]);

  const handleWithdrawOffer = async (skillName) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/skills/offer/${currentUser.id}/${encodeURIComponent(skillName)}`,
        { method: "DELETE" }
      );
      if (res.ok) { showToast(`Offer for ${skillName} withdrawn!`); fetchSkills(); }
    } catch { showToast("Failed to withdraw offer."); }
  };

  const handleWithdrawRequest = async (skillName) => {
    try {
      const res = await fetch(
        `http://localhost:4000/api/skills/request/${currentUser.id}/${encodeURIComponent(skillName)}`,
        { method: "DELETE" }
      );
      if (res.ok) { showToast(`Request for ${skillName} withdrawn!`); fetchSkills(); }
    } catch { showToast("Failed to withdraw request."); }
  };

  // Combine mock sessions + real offers/requests into one unified list
  const offeredItems = offeredSkills.map((s, i) => ({
    id: `offer-${i}`,
    type: "offered",
    skill: s.skill_name,
    skillCat: "",
    with: "Open — awaiting learners",
    withAvatar: "⏳",
    date: "Pending match",
    time: s.availability,
    duration: s.proficiency,
    status: "Pending",
    location: "TBD",
    room: null,
    rating: null,
    comment: null,
    isOffer: true,
    skillName: s.skill_name,
  }));

  const requestedItems = requestedSkills.map((s, i) => ({
    id: `request-${i}`,
    type: "requested",
    skill: s.skill_name,
    skillCat: "",
    with: "Open — awaiting teacher",
    withAvatar: "⏳",
    date: "Pending match",
    time: s.pref_time,
    duration: s.goal,
    status: "Pending",
    location: "TBD",
    room: null,
    rating: null,
    comment: null,
    isRequest: true,
    skillName: s.skill_name,
  }));

  const allItems = [...sessions, ...offeredItems, ...requestedItems];

  const displayed = allItems.filter(s =>
    (filter === "All" || s.status === filter) &&
    (typeFilter === "All" ||
      (typeFilter === "Offered" ? s.type === "offered" : s.type === "requested"))
  );

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">My Sessions</div>
        <div className="page-sub">Click any session to see full details and location.</div>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
        <div className="chips">
          {["All", "Completed", "Scheduled", "Pending"].map(f => (
            <div key={f} className={`chip ${filter === f ? "selected" : ""}`} onClick={() => setFilter(f)}>{f}</div>
          ))}
        </div>
        <div style={{ width: 1, background: "var(--border)", margin: "0 4px" }} />
        <div className="chips">
          {["All", "Offered", "Requested"].map(f => (
            <div key={f} className={`chip ${typeFilter === f ? "selected" : ""}`} onClick={() => setTypeFilter(f)}>{f}</div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {displayed.map((s, i) => (
          <div key={s.id} className="session-row" style={{ animationDelay: `${i * 0.06}s` }}
            onClick={() => !s.isOffer && !s.isRequest && setModal({ type: "session_detail", session: s })}>
            <div className="session-avatar" style={{ fontSize: typeof s.withAvatar === "string" && s.withAvatar.length > 2 ? 20 : 14 }}>
              {s.withAvatar}
            </div>
            <div className="session-info">
              <div className="session-name">
                {s.skill} · {s.type === "offered" ? "Teaching" : "Learning"}
              </div>
              <div className="session-detail">
                {s.with} · {s.date}
                {s.isOffer || s.isRequest ? ` · ${s.time}` : ` ${s.time}`}
              </div>
              {!s.isOffer && !s.isRequest && (
                <div style={{ marginTop: 4, fontSize: 12 }}>
                  <span style={{ color: "#a89fff" }}>📍 {s.location}{s.room ? ` – Room ${s.room}` : ""}</span>
                </div>
              )}
              {(s.isOffer || s.isRequest) && (
                <div style={{ marginTop: 4, fontSize: 12, color: "var(--muted)" }}>
                  {s.isOffer ? `Proficiency: ${s.duration}` : `Goal: ${s.duration}`}
                </div>
              )}
            </div>
            {s.rating && <div className="rating-stars">{"★".repeat(s.rating)}</div>}
            <span className={`status-badge ${s.status.toLowerCase()}`}>{s.status}</span>
            {s.isOffer && (
              <button className="btn-withdraw" onClick={e => { e.stopPropagation(); handleWithdrawOffer(s.skillName); }}>
                ✕ Withdraw
              </button>
            )}
            {s.isRequest && (
              <button className="btn-withdraw" onClick={e => { e.stopPropagation(); handleWithdrawRequest(s.skillName); }}>
                ✕ Withdraw
              </button>
            )}
            {!s.isOffer && !s.isRequest && (
              <span style={{ color: "var(--muted)", fontSize: 18 }}>›</span>
            )}
          </div>
        ))}
        {displayed.length === 0 && (
          <div style={{ color: "var(--muted)", textAlign: "center", padding: 40 }}>No sessions found.</div>
        )}
      </div>
    </div>
  );
}

// ─── Profile Page ─────────────────────────────────────────────────────────────
function ProfilePage({ user, setUser, sessions, setModal, showToast }) {
  const [editing, setEditing] = useState(false);
  const [offeredSkills, setOfferedSkills] = useState([]);
  const [requestedSkills, setRequestedSkills] = useState([]);
  const [form, setForm] = useState({ name: user.name, dept: user.dept, year: user.year });
  const depts = ["CSE", "ECE", "IT", "AIDS", "EEE", "MECH", "CIVIL"];

  const fetchSkills = () => {
    if (user.id) {
      fetch(`http://localhost:4000/api/skills/offers/${user.id}`)
        .then(res => res.json())
        .then(data => setOfferedSkills(data))
        .catch(() => {});
      fetch(`http://localhost:4000/api/skills/requests/${user.id}`)
        .then(res => res.json())
        .then(data => setRequestedSkills(data))
        .catch(() => {});
    }
  };

  useEffect(() => { fetchSkills(); }, [user.id]);

  const handleWithdrawOffer = async (skillName) => {
    try {
      const res = await fetch(`http://localhost:4000/api/skills/offer/${user.id}/${encodeURIComponent(skillName)}`, { method: "DELETE" });
      if (res.ok) { showToast(`Offer for ${skillName} withdrawn!`); fetchSkills(); }
    } catch { showToast("Failed to withdraw offer."); }
  };

  const handleWithdrawRequest = async (skillName) => {
    try {
      const res = await fetch(`http://localhost:4000/api/skills/request/${user.id}/${encodeURIComponent(skillName)}`, { method: "DELETE" });
      if (res.ok) { showToast(`Request for ${skillName} withdrawn!`); fetchSkills(); }
    } catch { showToast("Failed to withdraw request."); }
  };

  const handleSave = () => {
    if (!form.name.trim()) return showToast("Name cannot be empty!");
    setUser(prev => ({ ...prev, name: form.name.trim(), dept: form.dept, year: Number(form.year) }));
    setEditing(false);
    showToast("Profile updated successfully!");
  };

  const offered = sessions.filter(s => s.type === "offered");
  const requested = sessions.filter(s => s.type === "requested");
  const completed = sessions.filter(s => s.status === "Completed");
  const avgRating = (sessions.filter(s => s.rating).reduce((a, b) => a + b.rating, 0) / (sessions.filter(s => s.rating).length || 1)).toFixed(1);
  const initials = user.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">My Profile</div>
        <div className="page-sub">Manage your account, skills, and session history.</div>
      </div>
      <div className="profile-hero">
        <div className="avatar-xl">{initials}</div>
        <div style={{ flex: 1 }}>
          {editing ? (
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
              <div style={{ flex: 1, minWidth: 180 }}>
                <label className="input-label">Full Name</label>
                <input className="input-field no-icon" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={{ marginBottom: 8 }} />
                <label className="input-label">Department</label>
                <select className="input-field" value={form.dept} onChange={e => setForm(f => ({ ...f, dept: e.target.value }))} style={{ marginBottom: 8 }}>
                  {depts.map(d => <option key={d}>{d}</option>)}
                </select>
                <label className="input-label">Year</label>
                <select className="input-field" value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))}>
                  {[1, 2, 3, 4].map(y => <option key={y}>{y}</option>)}
                </select>
              </div>
            </div>
          ) : (
            <>
              <div className="profile-name">{user.name}</div>
              <div className="profile-email">{user.email}</div>
              <div className="profile-tags">
                <span className="profile-tag">🏛 {user.dept}</span>
                <span className="profile-tag">📅 Year {user.year}</span>
                <span className="profile-tag" style={{ color: "var(--accent3)", borderColor: "rgba(67,233,123,0.2)" }}>✓ Verified SRM Student</span>
              </div>
            </>
          )}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {editing ? (
            <>
              <button className="edit-btn" onClick={() => setEditing(false)}>Cancel</button>
              <button className="save-btn" onClick={handleSave}>Save Changes</button>
            </>
          ) : (
            <button className="edit-btn" onClick={() => { setForm({ name: user.name, dept: user.dept, year: user.year }); setEditing(true); }}>✏ Edit Profile</button>
          )}
        </div>
      </div>

      <div className="profile-grid">
        {/* Skills I Offer */}
        <div className="profile-section">
          <div className="section-title">Skills I Offer
            <span style={{ background: "rgba(67,233,123,0.1)", color: "var(--accent3)", border: "1px solid rgba(67,233,123,0.2)", padding: "2px 8px", borderRadius: 50, fontSize: 11 }}>{offeredSkills.length}</span>
          </div>
          {offeredSkills.length === 0
            ? <div style={{ color: "var(--muted)", fontSize: 13 }}>No skills offered yet.</div>
            : offeredSkills.map(s => (
              <div key={s.skill_name} className="skill-row">
                <span className="chip offer" style={{ cursor: "default" }}>{s.skill_name}</span>
                <button className="btn-withdraw" onClick={() => handleWithdrawOffer(s.skill_name)}>✕ Withdraw</button>
              </div>
            ))}
        </div>

        {/* Skills I Want */}
        <div className="profile-section">
          <div className="section-title">Skills I Want to Learn
            <span style={{ background: "rgba(255,107,107,0.1)", color: "var(--accent2)", border: "1px solid rgba(255,107,107,0.2)", padding: "2px 8px", borderRadius: 50, fontSize: 11 }}>{requestedSkills.length}</span>
          </div>
          {requestedSkills.length === 0
            ? <div style={{ color: "var(--muted)", fontSize: 13 }}>No skills requested yet.</div>
            : requestedSkills.map(s => (
              <div key={s.skill_name} className="skill-row">
                <span className="chip request" style={{ cursor: "default" }}>{s.skill_name}</span>
                <button className="btn-withdraw" onClick={() => handleWithdrawRequest(s.skill_name)}>✕ Withdraw</button>
              </div>
            ))}
        </div>

        {/* Stats */}
        <div className="profile-section">
          <div className="section-title">Session Stats</div>
          <div style={{ display: "flex", gap: 28 }}>
            {[
              { val: completed.length, label: "Completed", color: "var(--accent3)" },
              { val: avgRating + "★", label: "Avg Rating", color: "var(--gold)" },
              { val: offered.length, label: "Teaching", color: "var(--accent)" },
              { val: requested.length, label: "Learning", color: "var(--accent2)" },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 24, fontWeight: 800, color: item.color }}>{item.val}</div>
                <div style={{ color: "var(--muted)", fontSize: 11, marginTop: 2 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent feedback */}
        <div className="profile-section">
          <div className="section-title">Recent Feedback</div>
          {sessions.filter(s => s.comment).length === 0
            ? <div style={{ color: "var(--muted)", fontSize: 13 }}>No feedback yet.</div>
            : sessions.filter(s => s.comment).map(s => (
              <div key={s.id} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: "1px solid var(--border)" }}>
                <div style={{ color: "var(--gold)", fontSize: 12, marginBottom: 3 }}>{"★".repeat(s.rating)}</div>
                <div style={{ fontSize: 13 }}>"{s.comment}"</div>
                <div style={{ color: "var(--muted)", fontSize: 11, marginTop: 3 }}>{s.with} · {s.skill}</div>
              </div>
            ))}
        </div>

        {/* Sessions Teaching */}
        <div className="profile-section">
          <div className="section-title">Sessions I'm Teaching <span>{offered.length}</span></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {offered.length === 0 ? <div style={{ color: "var(--muted)", fontSize: 13 }}>None yet — go offer a skill!</div>
              : offered.map(s => (
                <div key={s.id} className="session-detail-card" onClick={() => setModal({ type: "session_detail", session: s })}>
                  <div className="sdc-icon">🎓</div>
                  <div className="sdc-info">
                    <div className="sdc-title">{s.skill}</div>
                    <div className="sdc-sub">Teaching {s.with} · {s.date}</div>
                  </div>
                  <span className={`status-badge ${s.status.toLowerCase()}`}>{s.status}</span>
                  <div className="sdc-location">📍 {s.location}{s.room ? ` ${s.room}` : ""}</div>
                </div>
              ))}
          </div>
        </div>

        {/* Sessions Learning */}
        <div className="profile-section">
          <div className="section-title">Sessions I'm Learning <span>{requested.length}</span></div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {requested.length === 0 ? <div style={{ color: "var(--muted)", fontSize: 13 }}>None yet — go request a skill!</div>
              : requested.map(s => (
                <div key={s.id} className="session-detail-card" onClick={() => setModal({ type: "session_detail", session: s })}>
                  <div className="sdc-icon">📖</div>
                  <div className="sdc-info">
                    <div className="sdc-title">{s.skill}</div>
                    <div className="sdc-sub">With {s.with} · {s.date}</div>
                  </div>
                  <span className={`status-badge ${s.status.toLowerCase()}`}>{s.status}</span>
                  <div className="sdc-location">📍 {s.location}{s.room ? ` ${s.room}` : ""}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────
function Modal({ modal, setModal, showToast, sessions, setSessions }) {
  const [proficiency, setProficiency] = useState("Intermediate");
  const [avail, setAvail] = useState("Weekends");
  const [goal, setGoal] = useState("");
  const [prefTime, setPrefTime] = useState("Evenings");
  const [location, setLocation] = useState("");
  const [room, setRoom] = useState("");

  const skill = modal.skill;
  const isCS = skill && CS_CATEGORIES.includes(skill.category);
  const locationOptions = skill ? getLocationOptions(skill.category) : [];

  useEffect(() => {
    if (locationOptions.length) setLocation(locationOptions[0]);
  }, [modal]);

  const handleOfferSubmit = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/skills/offer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proficiency, availability: avail, user_id: modal.currentUser.id, skill_id: skill.id }),
      });
      const data = await res.json();
      if (!res.ok) return showToast(data.error);
      showToast(`You're now offering ${skill.name}!`);
      setModal(null);
    } catch {
      showToast("Failed to post offer.");
    }
  };

  const handleRequestSubmit = async () => {
    if (!goal.trim()) return;
    try {
      const res = await fetch("http://localhost:4000/api/skills/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pref_time: prefTime, goal, user_id: modal.currentUser.id, skill_id: skill.id }),
      });
      const data = await res.json();
      if (!res.ok) return showToast(data.error);
      showToast(`Request for ${skill.name} submitted!`);
      setModal(null);
    } catch {
      showToast("Failed to submit request.");
    }
  };

  if (modal.type === "session_detail") {
    const s = modal.session;
    return (
      <div className="modal-overlay" onClick={() => setModal(null)}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <div style={{ fontSize: 36 }}>{s.type === "offered" ? "🎓" : "📖"}</div>
            <div>
              <div className="modal-title">{s.skill}</div>
              <div style={{ color: "var(--muted)", fontSize: 13 }}>{s.type === "offered" ? "You're teaching" : "You're learning from"} {s.with}</div>
            </div>
            <span className={`status-badge ${s.status.toLowerCase()}`} style={{ marginLeft: "auto" }}>{s.status}</span>
          </div>
          <div style={{ background: "var(--surface2)", borderRadius: 14, padding: "4px 16px", marginBottom: 16 }}>
            {[
              { label: "Date", value: s.date },
              { label: "Time", value: s.time },
              { label: "Duration", value: s.duration },
              { label: "Location", value: `${s.location}${s.room ? ` — Room ${s.room}` : ""}` },
              { label: "Role", value: s.type === "offered" ? "Teacher / Mentor" : "Student / Learner" },
              { label: "Skill Category", value: s.skillCat },
            ].map((row, i) => (
              <div key={i} className="detail-row">
                <span className="detail-label">{row.label}</span>
                <span className="detail-value">{row.value}</span>
              </div>
            ))}
          </div>
          {s.rating && (
            <div style={{ background: "rgba(247,201,72,0.07)", border: "1px solid rgba(247,201,72,0.15)", borderRadius: 12, padding: "12px 16px" }}>
              <div style={{ color: "var(--gold)", fontSize: 16, marginBottom: 4 }}>{"★".repeat(s.rating)}</div>
              <div style={{ fontSize: 13, fontStyle: "italic" }}>"{s.comment}"</div>
            </div>
          )}
          <div className="modal-actions">
            <button className="btn-cancel" onClick={() => setModal(null)}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={() => setModal(null)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-title">{modal.type === "offer" ? "✅ Offer a Skill" : "📨 Request a Skill"}</div>
        <div className="modal-sub">{modal.type === "offer" ? `Let others know you can teach ${skill.name}` : `Find someone to teach you ${skill.name}`}</div>
        <div style={{ background: "var(--surface2)", borderRadius: 12, padding: "12px 14px", marginBottom: 18, display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 26 }}>{skill.icon}</span>
          <div><div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700 }}>{skill.name}</div><div style={{ color: "var(--muted)", fontSize: 12 }}>{skill.category}</div></div>
        </div>
        {modal.type === "offer" ? (
          <>
            <div className="input-group">
              <label className="input-label">Proficiency Level</label>
              <select className="input-field" value={proficiency} onChange={e => setProficiency(e.target.value)}>
                {["Beginner", "Intermediate", "Advanced", "Expert"].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Availability</label>
              <select className="input-field" value={avail} onChange={e => setAvail(e.target.value)}>
                {["Weekdays", "Weekends", "Evenings", "Mornings", "Flexible"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </>
        ) : (
          <>
            <div className="input-group">
              <label className="input-label">Preferred Time</label>
              <select className="input-field" value={prefTime} onChange={e => setPrefTime(e.target.value)}>
                {["Mornings", "Afternoons", "Evenings", "Night", "Weekends"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Learning Goal</label>
              <input className="input-field no-icon" placeholder={`e.g. Learn ${skill.name} basics for my project`} value={goal} onChange={e => setGoal(e.target.value)} />
            </div>
            <div className="input-group">
              <label className="input-label">Preferred Location</label>
              <select className="input-field" value={location} onChange={e => setLocation(e.target.value)}>
                {locationOptions.map(l => <option key={l}>{l}</option>)}
              </select>
              <div className="location-tag">
                {isCS ? "🏫 CS-related sessions: UB, TP1, TP2 blocks" : "🎭 Arts/other sessions: MBA Block or Online"}
              </div>
            </div>
            {isCS && location !== "Online (Google Meet)" && (
              <div className="input-group">
                <label className="input-label">Classroom / Room Number</label>
                <select className="input-field" value={room} onChange={e => setRoom(e.target.value)}>
                  <option value="">Select room</option>
                  {CS_ROOMS.map(r => <option key={r}>{r}</option>)}
                </select>
              </div>
            )}
          </>
        )}
        <div className="modal-actions">
          <button className="btn-cancel" onClick={() => setModal(null)}>Cancel</button>
          <button className="btn-confirm" onClick={modal.type === "offer" ? handleOfferSubmit : handleRequestSubmit}>
            {modal.type === "offer" ? "Post Offer" : "Send Request"}
          </button>
        </div>
      </div>
    </div>
  );
}