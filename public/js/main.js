/* ═══════════════════════════════════════════════════════════
   AJI MITRA STATISTIKA — Main JavaScript
   ═══════════════════════════════════════════════════════════ */

const API = '';  // same origin

/* ─── UTILS ─────────────────────────────────────────────────── */
function formatRupiah(n) {
  return 'Rp ' + Number(n).toLocaleString('id-ID');
}

function getStatusClass(status) {
  if (status === 'Akan dilaksanakan') return 'status-akan';
  if (status === 'Sedang Berlangsung') return 'status-sedang';
  return 'status-rekaman';
}

function getTypeBadge(type) {
  if (type === 'bootcamp') return '<span class="program-card-badge badge-bootcamp">Bootcamp</span>';
  return '<span class="program-card-badge badge-short">Short Class</span>';
}

function getThumbBg(tags) {
  const colors = [
    'linear-gradient(135deg,#1B3A6B 0%,#2E6DB4 100%)',
    'linear-gradient(135deg,#0D1F3C 0%,#1B3A6B 100%)',
    'linear-gradient(135deg,#2E6DB4 0%,#5BA4E5 100%)',
    'linear-gradient(135deg,#1a4a8a 0%,#2E6DB4 100%)',
  ];
  return colors[Math.abs((tags[0] || 'x').charCodeAt(0)) % colors.length];
}

function getEmojiForTags(tags) {
  const map = {
    'SPSS':'📊','SmartPLS':'🔗','R':'📈','R Studio':'📈',
    'Python':'🐍','NVivo':'🔍','Metodologi':'📋','Scopus':'📝',
    'Sinta':'📝','Penulisan Ilmiah':'✍️','Statistika Dasar':'📐',
    'Visualisasi':'📊','Data Science':'🤖','Kuantitatif':'🧮',
    'Kualitatif':'💬','default':'📊'
  };
  for (const t of tags) { if (map[t]) return map[t]; }
  return map.default;
}

function buildProgramCard(p) {
  const bg = getThumbBg(p.tags);
  const emoji = getEmojiForTags(p.tags);
  const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
  const statusCls = getStatusClass(p.status);
  const typeBadge = getTypeBadge(p.type);

  return `
  <div class="card program-card fade-in-up" onclick="window.location='/program/${p.id}'">
    <div class="program-card-thumb" style="background:${bg}">
      ${typeBadge}
      <span class="program-card-badge badge-status ${statusCls}" style="top:auto;bottom:12px;left:12px;right:auto">${p.status}</span>
      <div class="thumb-placeholder">
        <span class="thumb-placeholder-emoji">${emoji}</span>
        <span class="thumb-logo">AJI</span>
      </div>
    </div>
    <div class="program-card-body">
      <div class="program-card-tags">${tags}</div>
      <div class="program-card-title">${p.title}</div>
      <div class="program-card-meta">
        <div class="program-card-meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/></svg>
          ${p.date}
        </div>
        <div class="program-card-meta-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          ${p.duration}
        </div>
      </div>
      <div class="program-card-price">
        <span class="price-original">${formatRupiah(p.originalPrice)}</span>
        <span class="price-current">${formatRupiah(p.price)}</span>
      </div>
      <a class="btn btn-blue btn-sm btn-block" href="/program/${p.id}" onclick="event.stopPropagation()">Lihat Detail →</a>
    </div>
  </div>`;
}

/* ─── NAVBAR ─────────────────────────────────────────────────── */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }
  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Set active nav link
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active');
  });
}

/* ─── TESTIMONIALS SLIDER ────────────────────────────────────── */
function initTestimonialsSlider(testimonials) {
  const container = document.getElementById('testimonials-container');
  if (!container) return;

  let current = 0;
  const total = testimonials.length;

  function renderSlider() {
    container.innerHTML = `
      <div class="testimonial-slider">
        <div class="testimonial-track" id="testi-track">
          ${testimonials.map(t => `
            <div class="testimonial-slide">
              <div class="testimonial-card">
                <p class="testimonial-quote">${t.quote}</p>
                <div class="testimonial-author">
                  <div class="testimonial-avatar">${t.avatar}</div>
                  <div>
                    <div class="testimonial-name">${t.name}</div>
                    <div class="testimonial-role">${t.role}</div>
                    <div class="testimonial-program">Program: ${t.program}</div>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="slider-controls">
        <button class="slider-btn" id="testi-prev">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <div class="slider-dots">
          ${testimonials.map((_,i) => `<div class="slider-dot${i===0?' active':''}" data-i="${i}"></div>`).join('')}
        </div>
        <button class="slider-btn" id="testi-next">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    `;

    function goTo(idx) {
      current = (idx + total) % total;
      document.getElementById('testi-track').style.transform = `translateX(-${current*100}%)`;
      document.querySelectorAll('.slider-dot').forEach((d,i) => d.classList.toggle('active', i===current));
    }

    document.getElementById('testi-prev').addEventListener('click', () => goTo(current - 1));
    document.getElementById('testi-next').addEventListener('click', () => goTo(current + 1));
    document.querySelectorAll('.slider-dot').forEach(d => d.addEventListener('click', () => goTo(+d.dataset.i)));

    // Auto advance
    setInterval(() => goTo(current + 1), 5000);
  }

  renderSlider();
}

/* ─── INQUIRY FORM ───────────────────────────────────────────── */
function initInquiryForm(formId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const msg = document.getElementById('form-msg');
    const data = Object.fromEntries(new FormData(form));

    btn.disabled = true;
    btn.textContent = 'Mengirim...';
    if (msg) { msg.className = 'form-message'; msg.textContent = ''; }

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      if (json.success) {
        if (msg) { msg.className = 'form-message success'; msg.textContent = json.message; }
        form.reset();
      } else {
        if (msg) { msg.className = 'form-message error'; msg.textContent = json.message; }
      }
    } catch(err) {
      if (msg) { msg.className = 'form-message error'; msg.textContent = 'Terjadi kesalahan. Silakan coba lagi.'; }
    }
    btn.disabled = false;
    btn.textContent = 'Kirim Pesan';
  });
}

/* ─── PROGRAMS PAGE ──────────────────────────────────────────── */
async function initProgramsPage(type) {
  const grid = document.getElementById('programs-grid');
  const countEl = document.getElementById('results-count');
  if (!grid) return;

  let allPrograms = [];
  let activeTag = null;
  let activeStatus = null;
  let searchQ = '';

  async function load() {
    grid.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><span>Memuat program...</span></div>';
    try {
      const res = await fetch(`/api/programs?type=${type}`);
      const json = await res.json();
      allPrograms = json.data || [];
      render();
    } catch(err) {
      grid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">😕</div><h3>Gagal memuat data</h3><p>Periksa koneksi Anda dan coba lagi.</p></div>';
    }
  }

  function render() {
    let filtered = [...allPrograms];
    if (searchQ) {
      const q = searchQ.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (activeTag) {
      filtered = filtered.filter(p => p.tags.some(t => t.toLowerCase() === activeTag.toLowerCase()));
    }
    if (activeStatus) {
      filtered = filtered.filter(p => p.status === activeStatus);
    }

    if (countEl) countEl.innerHTML = `Menampilkan <strong>${filtered.length}</strong> program`;

    if (filtered.length === 0) {
      grid.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🔍</div><h3>Program tidak ditemukan</h3><p>Coba kata kunci atau filter lain.</p></div>';
      return;
    }
    grid.innerHTML = filtered.map(buildProgramCard).join('');
  }

  // Search
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', e => { searchQ = e.target.value; render(); });
  }

  // Tag filters
  document.querySelectorAll('.filter-tag[data-tag]').forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag;
      activeTag = (activeTag === tag) ? null : tag;
      document.querySelectorAll('.filter-tag[data-tag]').forEach(b => b.classList.toggle('active', b.dataset.tag === activeTag));
      render();
    });
  });

  // Status filters
  document.querySelectorAll('.filter-tag[data-status]').forEach(btn => {
    btn.addEventListener('click', () => {
      const s = btn.dataset.status;
      activeStatus = (activeStatus === s) ? null : s;
      document.querySelectorAll('.filter-tag[data-status]').forEach(b => b.classList.toggle('active', b.dataset.status === activeStatus));
      render();
    });
  });

  await load();
}

/* ─── PROGRAM DETAIL PAGE ────────────────────────────────────── */
async function initProgramDetail() {
  const main = document.getElementById('program-detail-main');
  if (!main) return;

  const id = window.location.pathname.split('/').pop();

  main.innerHTML = '<div class="loading-spinner" style="padding:120px 24px"><div class="spinner"></div><span>Memuat detail program...</span></div>';

  try {
    const res = await fetch(`/api/programs/${id}`);
    const json = await res.json();
    if (!json.success) throw new Error('not found');
    const p = json.data;

    const bg = getThumbBg(p.tags);
    const emoji = getEmojiForTags(p.tags);
    const tags = p.tags.map(t => `<span class="tag">${t}</span>`).join('');
    const curriculumItems = p.curriculum.map((c, i) => `<li data-num="${i+1}">${c}</li>`).join('');
    const initials = p.facilitator.split(' ').slice(0,2).map(w=>w[0]).join('');

    document.title = `${p.title} — Aji Mitra Statistika`;
    document.querySelector('.breadcrumb-title')?.textContent && (document.querySelector('.breadcrumb-title').textContent = p.title);

    main.innerHTML = `
      <div class="program-detail-layout">
        <!-- Left: Main Content -->
        <div>
          <div class="detail-thumb" style="background:${bg}">
            <div class="thumb-placeholder" style="height:100%">
              <span class="thumb-placeholder-emoji" style="font-size:4rem">${emoji}</span>
              <span class="thumb-logo" style="font-size:1.6rem">Aji Mitra Statistika</span>
            </div>
          </div>

          <div class="detail-tags">${tags}</div>
          <h1 style="font-size:clamp(1.4rem,3vw,2rem);margin-bottom:16px;">${p.title}</h1>
          <p style="font-size:1rem;line-height:1.8;color:var(--gray-600);margin-bottom:24px;">${p.description}</p>

          <div class="detail-meta">
            <div class="detail-meta-item">
              <div class="detail-meta-icon">📅</div>
              <div>
                <div class="detail-meta-label">Tanggal Mulai</div>
                <div class="detail-meta-value">${p.date}</div>
              </div>
            </div>
            <div class="detail-meta-item">
              <div class="detail-meta-icon">⏱️</div>
              <div>
                <div class="detail-meta-label">Durasi</div>
                <div class="detail-meta-value">${p.duration}</div>
              </div>
            </div>
            <div class="detail-meta-item">
              <div class="detail-meta-icon">📡</div>
              <div>
                <div class="detail-meta-label">Format</div>
                <div class="detail-meta-value">Online via Zoom</div>
              </div>
            </div>
            <div class="detail-meta-item">
              <div class="detail-meta-icon">🏆</div>
              <div>
                <div class="detail-meta-label">Sertifikat</div>
                <div class="detail-meta-value">E-Sertifikat Resmi</div>
              </div>
            </div>
          </div>

          <h2 style="font-size:1.3rem;margin-bottom:4px;margin-top:40px;">Kurikulum &amp; Materi</h2>
          <p style="font-size:0.9rem;color:var(--gray-500);margin-bottom:16px;">Yang akan Anda pelajari dalam program ini</p>
          <ul class="curriculum-list">${curriculumItems}</ul>

          <div class="facilitator-card" style="margin-top:40px;">
            <p style="font-size:0.75rem;font-weight:700;color:var(--gray-500);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:16px;">Fasilitator</p>
            <div style="display:flex;align-items:center;gap:16px;">
              <div class="facilitator-avatar">${initials}</div>
              <div>
                <div style="font-family:var(--font-heading);font-weight:700;color:var(--gray-900);">${p.facilitator}</div>
                <div style="font-size:0.85rem;color:var(--gray-500);margin-top:4px;">${p.facilitatorBio}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right: Sticky Price Card -->
        <div class="sticky-sidebar">
          <div class="price-card">
            <p style="font-size:0.8rem;color:var(--gray-500);margin-bottom:8px;">Harga Program</p>
            <div class="price-card-price-row">
              <span class="price-card-original">${formatRupiah(p.originalPrice)}</span>
              <span class="price-card-current">${formatRupiah(p.price)}</span>
            </div>
            <div style="background:rgba(16,185,129,0.1);color:#059669;border-radius:var(--radius-sm);padding:10px 14px;font-size:0.85rem;font-weight:600;margin-bottom:24px;">
              🎉 Hemat ${formatRupiah(p.originalPrice - p.price)} (${Math.round((1 - p.price/p.originalPrice)*100)}% off)
            </div>
            <a href="${p.whatsappLink}" target="_blank" class="btn btn-primary btn-block" style="margin-bottom:12px;">
              💬 Daftar via WhatsApp
            </a>
            <a href="${p.marketplaceLink}" target="_blank" class="btn btn-outline-blue btn-block">
              🛒 Beli di Marketplace
            </a>
            <div class="divider" style="margin:20px 0;"></div>
            <div style="display:flex;flex-direction:column;gap:8px;">
              <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--gray-600);">
                <span>✅</span> Akses rekaman seumur hidup
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--gray-600);">
                <span>✅</span> E-Sertifikat resmi
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--gray-600);">
                <span>✅</span> Materi & modul lengkap
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--gray-600);">
                <span>✅</span> Grup diskusi WhatsApp
              </div>
              <div style="display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--gray-600);">
                <span>✅</span> Konsultasi pasca kelas
              </div>
            </div>
            <div class="divider" style="margin:20px 0;"></div>
            <p style="font-size:0.8rem;text-align:center;color:var(--gray-400);">Status: <strong style="color:var(--primary-mid)">${p.status}</strong></p>
          </div>
        </div>
      </div>
    `;
  } catch(err) {
    main.innerHTML = `
      <div class="empty-state" style="padding:120px 24px">
        <div class="empty-state-icon">😕</div>
        <h3>Program tidak ditemukan</h3>
        <p>Maaf, program yang Anda cari tidak ditemukan.</p>
        <a href="/" class="btn btn-blue" style="margin-top:24px;display:inline-flex;">Kembali ke Beranda</a>
      </div>`;
  }
}

/* ─── HOMEPAGE ───────────────────────────────────────────────── */
async function initHomepage() {
  // Featured Programs
  const featuredGrid = document.getElementById('featured-programs');
  if (featuredGrid) {
    featuredGrid.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';
    try {
      const res = await fetch('/api/programs');
      const json = await res.json();
      const featured = (json.data || []).slice(0, 3);
      featuredGrid.innerHTML = featured.map(buildProgramCard).join('');
    } catch(e) {
      featuredGrid.innerHTML = '';
    }
  }

  // Testimonials on homepage
  try {
    const res = await fetch('/api/testimonials');
    const json = await res.json();
    initTestimonialsSlider(json.data || []);
  } catch(e) {}
}

/* ─── INIT ───────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();

  const page = document.body.dataset.page;
  if (page === 'home')          initHomepage();
  if (page === 'bootcamp')      initProgramsPage('bootcamp');
  if (page === 'short-class')   initProgramsPage('short-class');
  if (page === 'program-detail') initProgramDetail();
  if (page === 'private-class') initTestimonialsWidget();
  if (page === 'konsultasi')    initTestimonialsWidget();

  // Inquiry forms
  initInquiryForm('inquiry-form');
  initInquiryForm('inquiry-form-konsultasi');
});

async function initTestimonialsWidget() {
  try {
    const res = await fetch('/api/testimonials');
    const json = await res.json();
    initTestimonialsSlider(json.data || []);
  } catch(e) {}
}
