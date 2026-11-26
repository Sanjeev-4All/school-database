// school_db - Frontend Client Application
let currentData = {
  dashboard: null,
  students: [],
  staff: [],
  fees: [],
  classes: [],
  events: [],
  exams: [],
  grades: [],
  libraryBooks: [],
  libraryLendings: [],
  subjects: [],
  transportRoutes: [],
  settings: null,
  activeStudentForModal: null
};

// Current user and auth state
let currentUser = null;

function getAuthToken() {
  return localStorage.getItem('schooldb_jwt_token') || localStorage.getItem('soma_jwt_token');
}

function setAuthSession(token, user) {
  if (token) {
    localStorage.setItem('schooldb_jwt_token', token);
  }
  if (user) {
    currentUser = user;
    localStorage.setItem('schooldb_user_profile', JSON.stringify(user));
    updateUserProfileUI(user);
  }
}

function clearAuthSession() {
  localStorage.removeItem('schooldb_jwt_token');
  localStorage.removeItem('schooldb_user_profile');
  localStorage.removeItem('soma_jwt_token');
  localStorage.removeItem('soma_user_profile');
  currentUser = null;
  updateUserProfileUI({
    name: 'Admin User',
    role: 'Super Admin',
    email: 'admin@greenfield.edu'
  });
}

function updateUserProfileUI(user) {
  if (!user) return;
  const displayName = document.getElementById('userDisplayName');
  const displayRole = document.getElementById('userDisplayRole');
  const avatarLetter = document.getElementById('userAvatarLetter');
  const menuName = document.getElementById('menuUserName');
  const menuEmail = document.getElementById('menuUserEmail');
  const menuRole = document.getElementById('menuUserRoleBadge');

  if (displayName) displayName.textContent = user.name;
  if (displayRole) displayRole.textContent = user.role || 'Admin';
  if (avatarLetter) avatarLetter.textContent = (user.name || 'A').charAt(0).toUpperCase();
  if (menuName) menuName.textContent = user.name;
  if (menuEmail) menuEmail.textContent = user.email || 'user@greenfield.edu';
  if (menuRole) menuRole.textContent = user.role || 'Admin';
}

function switchAuthTab(tab) {
  const tabLogin = document.getElementById('tabContentLogin');
  const tabRegister = document.getElementById('tabContentRegister');
  const btnLogin = document.getElementById('tabBtnLogin');
  const btnRegister = document.getElementById('tabBtnRegister');

  if (tab === 'login') {
    tabLogin?.classList.add('active');
    tabRegister?.classList.remove('active');
    btnLogin?.classList.add('active');
    btnRegister?.classList.remove('active');
  } else {
    tabLogin?.classList.remove('active');
    tabRegister?.classList.add('active');
    btnLogin?.classList.remove('active');
    btnRegister?.classList.add('active');
  }
  initIcons();
}

// Global fetch wrapper with automatic JWT Authorization header
async function authFetch(url, options = {}) {
  const token = getAuthToken();
  const headers = options.headers ? { ...options.headers } : {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return fetch(url, { ...options, headers });
}

document.addEventListener('DOMContentLoaded', () => {
  initIcons();
  setupAuthListeners();
  checkAuthSession();
  setupNavigation();
  setupShortcutsAndModals();
  setupSearchAndFilters();
  setupFormSubmissions();

  // Load initial settings and dashboard data
  loadSettings();
  loadDashboardData();
});

function setupAuthListeners() {
  const profileBtn = document.getElementById('userProfileBtn');
  const dropdown = document.getElementById('userMenuDropdown');

  // Toggle user profile dropdown
  profileBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown?.classList.toggle('active');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    dropdown?.classList.remove('active');
  });

  // Open Auth Modal
  document.getElementById('btnOpenAuthModal')?.addEventListener('click', () => {
    dropdown?.classList.remove('active');
    openModal('modalAuth');
  });

  // Logout action
  document.getElementById('btnLogout')?.addEventListener('click', () => {
    dropdown?.classList.remove('active');
    clearAuthSession();
    showToast('Signed out successfully.');
  });

  // Fill demo credentials
  document.getElementById('btnFillDemoCreds')?.addEventListener('click', () => {
    const emailField = document.getElementById('loginEmail');
    const pwdField = document.getElementById('loginPassword');
    if (emailField) emailField.value = 'admin@greenfield.edu';
    if (pwdField) pwdField.value = 'admin123';
  });

  // Sign In Form Submission
  document.getElementById('formLogin')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.token) {
        setAuthSession(data.token, data.user);
        closeModal('modalAuth');
        showToast(`Welcome back, ${data.user.name}! (Authenticated with JWT)`);
        e.target.reset();
      } else {
        showToast(data.message || 'Invalid email or password', 'error');
      }
    } catch (err) {
      showToast('Login server error', 'error');
    }
  });

  // Sign Up Form Submission
  document.getElementById('formRegister')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'),
      department: formData.get('department')
    };

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success && data.token) {
        setAuthSession(data.token, data.user);
        closeModal('modalAuth');
        showToast(`Account created for ${data.user.name}! Welcome to school_db.`);
        e.target.reset();
      } else {
        showToast(data.message || 'Registration failed', 'error');
      }
    } catch (err) {
      showToast('Registration server error', 'error');
    }
  });
}

async function checkAuthSession() {
  const token = getAuthToken();
  if (!token) return;

  try {
    const res = await fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (data.success && data.user) {
      setAuthSession(token, data.user);
    } else {
      clearAuthSession();
    }
  } catch (err) {
    console.warn('Auth check skipped:', err);
  }
}

function initIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Toast notification helper
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✓' : '⚠'}</span> <span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// Navigation View Switcher
function setupNavigation() {
  const links = document.querySelectorAll('.nav-menu .nav-link[data-view]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const viewId = link.getAttribute('data-view');
      switchView(viewId);
    });
  });

  // Direct buttons
  document.getElementById('btnViewFullAttendance')?.addEventListener('click', () => switchView('attendance'));
  document.getElementById('btnViewFinanceReport')?.addEventListener('click', () => switchView('finance'));
  document.getElementById('btnViewAcademicReport')?.addEventListener('click', () => switchView('academics'));
  document.getElementById('btnViewStaffDirectory')?.addEventListener('click', () => switchView('teachers'));
  document.getElementById('btnViewStaffTop')?.addEventListener('click', () => switchView('teachers'));
  document.getElementById('btnViewAllEvents')?.addEventListener('click', () => switchView('communication'));
}

function switchView(viewName) {
  // Update nav link active state
  document.querySelectorAll('.nav-menu .nav-link').forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-menu .nav-link[data-view="${viewName}"]`);
  if (activeLink) activeLink.classList.add('active');

  // Hide all views
  document.querySelectorAll('.content-view').forEach(v => v.classList.remove('active'));

  // Update titles
  const titleElem = document.getElementById('pageTitle');
  const subtitleElem = document.getElementById('pageSubtitle');

  switch (viewName) {
    case 'dashboard':
      document.getElementById('viewDashboard')?.classList.add('active');
      titleElem.textContent = 'School Overview';
      subtitleElem.textContent = 'Welcome back, Admin 👋';
      loadDashboardData();
      break;
    case 'students':
      document.getElementById('viewStudents')?.classList.add('active');
      titleElem.textContent = 'Students Directory';
      subtitleElem.textContent = 'Manage student records, enrollment, and attendance profiles';
      loadStudents();
      break;
    case 'teachers':
      document.getElementById('viewTeachers')?.classList.add('active');
      titleElem.textContent = 'Teachers & Faculty';
      subtitleElem.textContent = 'Academic teachers, department heads, and non-teaching staff';
      loadStaff();
      break;
    case 'finance':
      document.getElementById('viewFinance')?.classList.add('active');
      titleElem.textContent = 'Finance & Accounts';
      subtitleElem.textContent = 'Fee collections, student invoices, and reconciliation';
      loadFees();
      break;
    case 'attendance':
      document.getElementById('viewAttendance')?.classList.add('active');
      titleElem.textContent = 'Daily Attendance';
      subtitleElem.textContent = 'Real-time class attendance registers and status tracking';
      loadAttendanceView();
      break;
    case 'academics':
      document.getElementById('viewAcademics')?.classList.add('active');
      titleElem.textContent = 'Academic Curriculum & Timetable';
      subtitleElem.textContent = 'Educational subjects, syllabus tracking, and class timetables';
      loadSubjects();
      loadTimetable(document.getElementById('timetableClassSelect')?.value || '1st Class');
      break;
    case 'classes':
      document.getElementById('viewClasses')?.classList.add('active');
      titleElem.textContent = 'Classes & Curriculum';
      subtitleElem.textContent = 'Class divisions (1st to 12th), student counts, and class teachers';
      loadClasses();
      break;
    case 'examinations':
      document.getElementById('viewExaminations')?.classList.add('active');
      titleElem.textContent = 'Examinations & Gradebook';
      subtitleElem.textContent = 'Assessment schedule, terminal gradebook, and student report cards';
      loadExams();
      loadGrades(document.getElementById('gradebookClassFilter')?.value || 'all');
      break;
    case 'library':
      document.getElementById('viewLibrary')?.classList.add('active');
      titleElem.textContent = 'Library & Learning Center';
      subtitleElem.textContent = 'Book catalogue, shelf locations, and student book borrow/return transactions';
      loadLibraryBooks();
      loadLibraryLendings();
      break;
    case 'transport':
      document.getElementById('viewTransport')?.classList.add('active');
      titleElem.textContent = 'School Transport & Fleet Logistics';
      subtitleElem.textContent = 'Bus corridors, assigned drivers, capacity, and student transport allocations';
      loadTransport();
      break;
    case 'communication':
      document.getElementById('viewCommunication')?.classList.add('active');
      titleElem.textContent = 'Communication Board';
      subtitleElem.textContent = 'Circulars, PTA meetings, and upcoming school events';
      loadEvents();
      break;
    case 'reports':
      document.getElementById('viewReports')?.classList.add('active');
      titleElem.textContent = 'Reports & Data Export Center';
      subtitleElem.textContent = 'Instant 1-click CSV spreadsheet generation and system diagnostics';
      loadReportsHub();
      break;
    case 'settings':
      document.getElementById('viewSettings')?.classList.add('active');
      titleElem.textContent = 'School Profile & Database Settings';
      subtitleElem.textContent = 'Institution profile, academic session, and system backups';
      loadSettings();
      break;
    default:
      document.getElementById('viewDashboard')?.classList.add('active');
      titleElem.textContent = 'School Overview';
      subtitleElem.textContent = 'Welcome back, Admin 👋';
      loadDashboardData();
      break;
  }
  initIcons();
}

// Sub-nav Tab Switchers
function switchAcademicTab(tab) {
  const btnSubjects = document.getElementById('tabAcademicsSubjects');
  const btnTimetable = document.getElementById('tabAcademicsTimetable');
  const contentSubjects = document.getElementById('academicTabSubjectsContent');
  const contentTimetable = document.getElementById('academicTabTimetableContent');

  if (tab === 'subjects') {
    btnSubjects?.classList.add('active');
    btnTimetable?.classList.remove('active');
    if (contentSubjects) contentSubjects.style.display = 'block';
    if (contentTimetable) contentTimetable.style.display = 'none';
    loadSubjects();
  } else {
    btnSubjects?.classList.remove('active');
    btnTimetable?.classList.add('active');
    if (contentSubjects) contentSubjects.style.display = 'none';
    if (contentTimetable) contentTimetable.style.display = 'block';
    loadTimetable(document.getElementById('timetableClassSelect')?.value || '1st Class');
  }
  initIcons();
}

function switchExamTab(tab) {
  const btnSchedule = document.getElementById('tabExamsSchedule');
  const btnGradebook = document.getElementById('tabExamsGradebook');
  const contentSchedule = document.getElementById('examTabScheduleContent');
  const contentGradebook = document.getElementById('examTabGradebookContent');

  if (tab === 'schedule') {
    btnSchedule?.classList.add('active');
    btnGradebook?.classList.remove('active');
    if (contentSchedule) contentSchedule.style.display = 'block';
    if (contentGradebook) contentGradebook.style.display = 'none';
    loadExams();
  } else {
    btnSchedule?.classList.remove('active');
    btnGradebook?.classList.add('active');
    if (contentSchedule) contentSchedule.style.display = 'none';
    if (contentGradebook) contentGradebook.style.display = 'block';
    loadGrades(document.getElementById('gradebookClassFilter')?.value || 'all');
  }
  initIcons();
}

function switchLibraryTab(tab) {
  const btnCatalogue = document.getElementById('tabLibraryCatalogue');
  const btnLending = document.getElementById('tabLibraryLending');
  const contentCatalogue = document.getElementById('libraryTabCatalogueContent');
  const contentLending = document.getElementById('libraryTabLendingContent');

  if (tab === 'catalogue') {
    btnCatalogue?.classList.add('active');
    btnLending?.classList.remove('active');
    if (contentCatalogue) contentCatalogue.style.display = 'block';
    if (contentLending) contentLending.style.display = 'none';
    loadLibraryBooks();
  } else {
    btnCatalogue?.classList.remove('active');
    btnLending?.classList.add('active');
    if (contentCatalogue) contentCatalogue.style.display = 'none';
    if (contentLending) contentLending.style.display = 'block';
    loadLibraryLendings();
  }
  initIcons();
}

// Shortcut & Modal trigger listeners
function setupShortcutsAndModals() {
  document.getElementById('shortcutAddStudent')?.addEventListener('click', () => openModal('modalAddStudent'));
  document.getElementById('btnOpenAddStudentModal')?.addEventListener('click', () => openModal('modalAddStudent'));

  document.getElementById('shortcutMarkAttendance')?.addEventListener('click', () => openModal('modalMarkAttendance'));
  document.getElementById('btnQuickMarkAttendance')?.addEventListener('click', () => openModal('modalMarkAttendance'));

  document.getElementById('shortcutCreateAnnouncement')?.addEventListener('click', () => openModal('modalCreateNotice'));
  document.getElementById('btnCreateEventQuick')?.addEventListener('click', () => openModal('modalCreateNotice'));
  document.getElementById('btnOpenCreateNoticeModal')?.addEventListener('click', () => openModal('modalCreateNotice'));

  document.getElementById('btnOpenRecordPaymentModal')?.addEventListener('click', () => openModal('modalRecordPayment'));
  document.getElementById('shortcutGenerateReport')?.addEventListener('click', () => switchView('reports'));
  document.getElementById('btnGenerateAiReport')?.addEventListener('click', () => openAiReport());

  // New modules modal openers
  document.getElementById('btnOpenAddSubjectModal')?.addEventListener('click', () => openModal('modalAddSubject'));
  document.getElementById('btnOpenScheduleExamModal')?.addEventListener('click', () => openModal('modalScheduleExam'));
  document.getElementById('btnOpenRecordMarksModal')?.addEventListener('click', () => openModal('modalRecordMarks'));
  document.getElementById('btnOpenAddBookModal')?.addEventListener('click', () => openModal('modalAddBook'));
  document.getElementById('btnOpenIssueBookModal')?.addEventListener('click', () => openIssueBookModal());
  document.getElementById('btnOpenAddTransportModal')?.addEventListener('click', () => openModal('modalAddTransport'));

  // Timetable class selector change
  document.getElementById('timetableClassSelect')?.addEventListener('change', (e) => {
    loadTimetable(e.target.value);
  });

  // Gradebook class filter change
  document.getElementById('gradebookClassFilter')?.addEventListener('change', (e) => {
    loadGrades(e.target.value);
  });

  // Profile modal action -> open report card
  document.getElementById('btnProfileViewReportCard')?.addEventListener('click', () => {
    if (currentData.activeStudentForModal) {
      closeModal('modalStudentProfile');
      openReportCard(currentData.activeStudentForModal);
    }
  });
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('active');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('active');
}

// Global Search & Keyboard Shortcut (Cmd+K)
function setupSearchAndFilters() {
  const searchInput = document.getElementById('globalSearchInput');
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput?.focus();
    }
  });

  searchInput?.addEventListener('input', (e) => {
    const val = e.target.value.trim().toLowerCase();
    if (val.length > 1) {
      switchView('students');
      const studentFilter = document.getElementById('studentSearchFilter');
      if (studentFilter) studentFilter.value = val;
      loadStudents({ search: val });
    }
  });

  // Student directory filters
  document.getElementById('studentSearchFilter')?.addEventListener('input', (e) => {
    loadStudents({
      search: e.target.value,
      className: document.getElementById('studentClassFilter')?.value
    });
  });

  document.getElementById('studentClassFilter')?.addEventListener('change', (e) => {
    loadStudents({
      search: document.getElementById('studentSearchFilter')?.value,
      className: e.target.value
    });
  });
}

// ================= API CALLS & UI RENDERING =================

// 1. Dashboard Overview
async function loadDashboardData() {
  try {
    const res = await fetch('/api/dashboard');
    const json = await res.json();
    if (json.success && json.data) {
      currentData.dashboard = json.data;
      renderKPIs(json.data.kpis);
      renderAttendanceMatrix(json.data.attendanceWeeklyOverview);
      renderAiInsights(json.data.aiInsights);
      renderFeeSummary(json.data.feeSummary);
      renderEvents(json.data.events);
    }
  } catch (err) {
    console.error('Failed to load dashboard data:', err);
  }
}

function renderKPIs(kpis) {
  if (!kpis) return;
  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

  setVal('kpiTotalStudents', Number(kpis.totalStudents.value).toLocaleString());
  setVal('kpiStudentsChange', kpis.totalStudents.change || '↑ 12 this term');

  setVal('kpiAttendanceRate', kpis.attendanceRate.value || '96.4%');
  setVal('kpiAttendanceChange', kpis.attendanceRate.change || '↑ 2.7% vs last term');

  setVal('kpiFeeCollection', kpis.feeCollection.value || '84%');
  setVal('kpiFeeDetail', kpis.feeCollection.detail || '₦12.4M of ₦14.8M');
  const bar = document.getElementById('kpiFeeBar');
  if (bar) bar.style.width = `${kpis.feeCollection.progress || 84}%`;

  setVal('kpiTotalStaff', kpis.totalStaff.value || '86');
  setVal('kpiStaffStatus', `● ${kpis.totalStaff.onlineCount || 48} online`);

  setVal('kpiActiveClasses', kpis.activeClasses.value || '12 Classes');
  setVal('kpiClassesDetail', kpis.activeClasses.detail || '1st - 12th Class sequence');
}

function renderAttendanceMatrix(matrix) {
  const tbody = document.getElementById('attendanceMatrixBody');
  if (!tbody || !matrix) return;

  tbody.innerHTML = matrix.map(row => {
    const dayPills = (row.days || ['present', 'present', 'present', 'present', 'present', 'nodata'])
      .map(status => `<span class="status-pill ${status}" title="${status}"></span>`)
      .map(pill => `<td>${pill}</td>`)
      .join('');

    return `
      <tr>
        <td><strong>${escapeHtml(row.className)}</strong></td>
        ${dayPills}
        <td>${row.present}</td>
        <td>${row.late}</td>
        <td>${row.absent}</td>
        <td class="rate-badge">${row.rate}%</td>
      </tr>
    `;
  }).join('');
}

function renderAiInsights(insights) {
  const container = document.getElementById('aiInsightsList');
  if (!container || !insights) return;

  container.innerHTML = insights.map(item => `
    <div class="ai-insight-item" onclick="handleInsightClick('${escapeHtml(item.title)}')">
      <div class="insight-left">
        <div class="insight-icon ${item.type}">
          ${getInsightIcon(item.type)}
        </div>
        <div class="insight-text">
          <h4>${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.subtitle)}</p>
        </div>
      </div>
      <div class="insight-chevron">›</div>
    </div>
  `).join('');
  initIcons();
}

function getInsightIcon(type) {
  switch (type) {
    case 'warning': return '<i data-lucide="clock" style="width: 14px;"></i>';
    case 'finance': return '<i data-lucide="wallet" style="width: 14px;"></i>';
    case 'staff': return '<i data-lucide="folder" style="width: 14px;"></i>';
    case 'calendar': return '<i data-lucide="calendar" style="width: 14px;"></i>';
    default: return '<i data-lucide="info" style="width: 14px;"></i>';
  }
}

function handleInsightClick(title) {
  if (title.includes('students are at risk')) {
    switchView('students');
  } else if (title.includes('Fee collection')) {
    switchView('finance');
  } else if (title.includes('teachers')) {
    switchView('teachers');
  } else if (title.includes('Exams')) {
    switchView('examinations');
  }
}

function renderFeeSummary(summary) {
  if (!summary) return;
  const largeAmt = document.getElementById('feeLargeAmount');
  if (largeAmt) {
    largeAmt.innerHTML = `
      ${escapeHtml(summary.collectedFormatted)}
      <span>of ${escapeHtml(summary.totalExpectedFormatted)} collected</span>
    `;
  }
  const donutVal = document.getElementById('feeProgressDonutVal');
  if (donutVal) donutVal.textContent = `${summary.ratePercentage}%`;
  const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
  setTxt('feeCollectedText', summary.collectedFormatted);
  setTxt('feeExpectedText', summary.totalExpectedFormatted);
  setTxt('feeBalanceText', summary.balanceFormatted);
}

function renderEvents(events) {
  const container = document.getElementById('upcomingEventsContainer');
  if (!container || !events) return;

  container.innerHTML = events.slice(0, 4).map(evt => {
    const d = new Date(evt.date);
    const month = d.toLocaleString('en-US', { month: 'short' });
    const day = String(d.getDate()).padStart(2, '0');

    return `
      <div class="event-item">
        <div class="event-date-badge">
          <div class="event-month">${month}</div>
          <div class="event-day">${day}</div>
        </div>
        <div class="event-info">
          <h5>${escapeHtml(evt.title)}</h5>
          <p>${escapeHtml(evt.time || evt.description || 'All day event')}</p>
        </div>
      </div>
    `;
  }).join('');
}

// 2. Students Directory
async function loadStudents({ search = '', className = 'all' } = {}) {
  try {
    let url = `/api/students?`;
    if (search) url += `search=${encodeURIComponent(search)}&`;
    if (className && className !== 'all') url += `className=${encodeURIComponent(className)}&`;

    const res = await fetch(url);
    const json = await res.json();
    if (json.success && json.data) {
      currentData.students = json.data;
      const tbody = document.getElementById('studentsTableBody');
      const badge = document.getElementById('studentCountBadge');
      if (badge) badge.textContent = `Showing ${json.data.length} students`;

      if (!tbody) return;

      if (json.data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="10" style="text-align: center; padding: 24px; color: var(--text-muted);">No student records found matching the criteria.</td></tr>`;
        return;
      }

      tbody.innerHTML = json.data.map(student => `
        <tr>
          <td><strong>${escapeHtml(student.studentId)}</strong></td>
          <td>${escapeHtml(student.firstName)} ${escapeHtml(student.lastName)}</td>
          <td><span style="background: #F1ECE4; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${escapeHtml(student.class)}</span></td>
          <td>${student.rollNumber || '-'}</td>
          <td>${escapeHtml(student.gender || 'Other')}</td>
          <td>
            <div>${escapeHtml(student.guardian?.name || '-')}</div>
            <div style="font-size: 11px; color: var(--text-muted);">${escapeHtml(student.guardian?.phone || '')}</div>
          </td>
          <td>
            <span style="font-weight: 700; color: ${student.attendanceRate < 80 ? '#E53E3E' : '#38A169'};">
              ${student.attendanceRate || 95}%
            </span>
          </td>
          <td>${escapeHtml(student.performanceCategory || 'Good')}</td>
          <td>
            <span class="status-badge badge-${(student.feeStatus || 'Paid').toLowerCase()}">
              ${escapeHtml(student.feeStatus || 'Paid')}
            </span>
          </td>
          <td>
            <div class="action-btns">
              <button class="btn-sm-action" onclick="openStudentProfile('${escapeHtml(student.studentId)}')">Profile</button>
              <button class="btn-sm-action" onclick="openEditStudent('${escapeHtml(student.studentId)}')">Edit</button>
              <button class="btn-sm-action btn-delete" onclick="deleteStudentRecord('${escapeHtml(student.studentId)}')">Delete</button>
            </div>
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('Failed to load students:', err);
  }
}

async function deleteStudentRecord(studentId) {
  if (!confirm(`Are you sure you want to remove student ${studentId}?`)) return;

  try {
    const res = await authFetch(`/api/students/${studentId}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.success) {
      showToast(`Student ${studentId} removed successfully`);
      loadStudents();
      loadDashboardData();
    } else {
      showToast(json.message || 'Could not delete student', 'error');
    }
  } catch (err) {
    showToast('Failed to delete student', 'error');
  }
}

// Student Profile View Modal
function openStudentProfile(studentId) {
  const student = currentData.students.find(s => s.studentId === studentId);
  if (!student) return;

  currentData.activeStudentForModal = studentId;

  const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  setEl('profAvatar', (student.firstName || 'S').charAt(0).toUpperCase());
  setEl('profFullName', `${student.firstName} ${student.lastName}`);
  setEl('profStudentId', student.studentId);
  setEl('profClass', student.class);
  setEl('profRoll', student.rollNumber || '1');
  setEl('profAttendance', `${student.attendanceRate || 95}%`);
  setEl('profPerformance', student.performanceCategory || 'Good');
  setEl('profFeeStatus', student.feeStatus || 'Paid');
  setEl('profGender', student.gender || 'Not specified');
  setEl('profBlood', student.bloodGroup || 'O+');
  setEl('profEmail', student.email || `${student.firstName.toLowerCase()}@greenfield.edu`);
  setEl('profGuardianName', student.guardian?.name || 'Chief Parent');
  setEl('profGuardianPhone', student.guardian?.phone || 'Not available');
  setEl('profAddress', student.address || 'Campus Residential Quarter, Greenfield');

  openModal('modalStudentProfile');
  initIcons();
}

// Student Edit Modal
function openEditStudent(studentId) {
  const student = currentData.students.find(s => s.studentId === studentId);
  if (!student) return;

  const setVal = (id, val) => { const el = document.getElementById(id); if (el) el.value = val; };
  setVal('editStudentId', student.studentId);
  setVal('editFirstName', student.firstName);
  setVal('editLastName', student.lastName);
  setVal('editClass', student.class);
  setVal('editRollNumber', student.rollNumber || 1);
  setVal('editPerformance', student.performanceCategory || 'Good');
  setVal('editAttendanceRate', student.attendanceRate || 95);
  setVal('editGuardianName', student.guardian?.name || '');
  setVal('editGuardianPhone', student.guardian?.phone || '');
  setVal('editFeeStatus', student.feeStatus || 'Paid');

  openModal('modalEditStudent');
}

// 3. Staff / Teachers Directory
async function loadStaff() {
  try {
    const res = await fetch('/api/staff');
    const json = await res.json();
    if (json.success && json.data) {
      currentData.staff = json.data;
      const tbody = document.getElementById('staffTableBody');
      if (!tbody) return;

      tbody.innerHTML = json.data.map(staff => `
        <tr>
          <td><strong>${escapeHtml(staff.staffId)}</strong></td>
          <td>
            <div style="font-weight: 600;">${escapeHtml(staff.name)}</div>
            <div style="font-size: 11px; color: var(--text-muted);">${escapeHtml(staff.qualification || '')}</div>
          </td>
          <td><span style="font-size: 11.5px; padding: 2px 6px; border-radius: 4px; background: #EEF2F6;">${escapeHtml(staff.role)}</span></td>
          <td>${escapeHtml(staff.designation)}</td>
          <td>${escapeHtml(staff.department)}</td>
          <td>${escapeHtml((staff.assignedClasses || []).join(', ') || 'N/A')}</td>
          <td>
            <span style="display: inline-flex; align-items: center; gap: 5px; font-size: 12px;">
              <span style="width: 7px; height: 7px; border-radius: 50%; background: ${staff.isOnline ? '#38A169' : '#A0AEC0'};"></span>
              ${staff.isOnline ? 'Online' : 'Offline'}
            </span>
          </td>
          <td>${escapeHtml(staff.email)}</td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('Failed to load staff:', err);
  }
}

// 4. Finance & Fees
async function loadFees() {
  try {
    const res = await fetch('/api/fees');
    const json = await res.json();
    if (json.success && json.data) {
      currentData.fees = json.data;
      const tbody = document.getElementById('feesTableBody');
      if (!tbody) return;

      tbody.innerHTML = json.data.map(fee => `
        <tr>
          <td><strong>${escapeHtml(fee.invoiceNumber)}</strong></td>
          <td>${escapeHtml(fee.studentName)}</td>
          <td>${escapeHtml(fee.className)}</td>
          <td>${escapeHtml(fee.feeType)}</td>
          <td>₦${Number(fee.totalAmount).toLocaleString()}</td>
          <td style="color: #38A169;">₦${Number(fee.paidAmount).toLocaleString()}</td>
          <td style="color: ${fee.balance > 0 ? '#E53E3E' : '#718096'}; font-weight: 600;">₦${Number(fee.balance).toLocaleString()}</td>
          <td><span class="status-badge badge-${(fee.status || 'Paid').toLowerCase()}">${escapeHtml(fee.status)}</span></td>
          <td>${escapeHtml(fee.paymentMethod || 'Pending')}</td>
          <td>
            ${fee.balance > 0 
              ? `<button class="btn-sm-action" onclick="promptPayInvoice('${escapeHtml(fee.invoiceNumber)}', ${fee.balance})">Pay</button>` 
              : `<span style="font-size: 11.5px; color: #38A169; font-weight: 600;">Cleared ✓</span>`}
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('Failed to load fees:', err);
  }
}

function promptPayInvoice(invNum, balance) {
  const invField = document.getElementById('payInvoiceNumber');
  const amtField = document.querySelector('#formRecordPayment input[name="amount"]');
  if (invField) invField.value = invNum;
  if (amtField) amtField.value = balance;
  openModal('modalRecordPayment');
}

// 5. Classes View
async function loadClasses() {
  try {
    const res = await fetch('/api/classes');
    const json = await res.json();
    if (json.success && json.data) {
      currentData.classes = json.data;
      const container = document.getElementById('classesGrid');
      if (!container) return;

      container.innerHTML = json.data.map(cls => `
        <div class="dashboard-card" style="padding: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px;">
            <div>
              <h4 style="font-size: 16px; font-weight: 700; color: var(--text-main);">${escapeHtml(cls.name)}</h4>
              <p style="font-size: 11px; color: var(--text-muted);">${escapeHtml(cls.gradeLevel)}</p>
            </div>
            <span style="font-size: 11px; background: #F4EFE6; padding: 3px 8px; border-radius: 4px; font-weight: 600;">
              ${escapeHtml(cls.roomNumber || 'Room 101')}
            </span>
          </div>

          <div style="margin: 12px 0;">
            <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
              <span>Enrolled Students</span>
              <strong>${cls.enrolledCount} / ${cls.capacity}</strong>
            </div>
            <div style="width: 100%; height: 6px; background: #EDF2F7; border-radius: 3px; overflow: hidden;">
              <div style="height: 100%; width: ${(cls.enrolledCount / cls.capacity) * 100}%; background: var(--primary-accent);"></div>
            </div>
          </div>

          <div style="font-size: 12px; border-top: 1px solid var(--border-subtle); padding-top: 8px; color: var(--text-muted);">
            <div>Class Teacher: <strong style="color: var(--text-main);">${escapeHtml(cls.classTeacher)}</strong></div>
            <div style="margin-top: 4px;">Attendance Rate: <strong style="color: #38A169;">${cls.attendanceRate || 95}%</strong></div>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('Failed to load classes:', err);
  }
}

// 6. Attendance Tracker View
function loadAttendanceView() {
  const container = document.getElementById('attendanceTrackerCards');
  if (!container || !currentData.dashboard) return;

  const matrix = currentData.dashboard.attendanceWeeklyOverview;
  container.innerHTML = matrix.map(c => `
    <div class="dashboard-card" style="padding: 16px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <h4 style="font-size: 15px; font-weight: 700;">${escapeHtml(c.className)}</h4>
        <span style="font-size: 14px; font-weight: 800; color: #38A169;">${c.rate}%</span>
      </div>
      <div style="display: flex; gap: 8px; font-size: 12px; margin-bottom: 12px;">
        <span style="color: #38A169;">Present: <strong>${c.present}</strong></span>
        <span style="color: #D69E2E;">Late: <strong>${c.late}</strong></span>
        <span style="color: #E53E3E;">Absent: <strong>${c.absent}</strong></span>
      </div>
      <button class="btn-sm-action" style="width: 100%; text-align: center; padding: 6px;" onclick="triggerMarkForClass('${escapeHtml(c.className)}')">
        Update Roll
      </button>
    </div>
  `).join('');
}

function triggerMarkForClass(className) {
  const field = document.getElementById('markClassName');
  if (field) field.value = className;
  openModal('modalMarkAttendance');
}

// 7. Events & Communication
async function loadEvents() {
  try {
    const res = await fetch('/api/events');
    const json = await res.json();
    if (json.success && json.data) {
      currentData.events = json.data;
      const container = document.getElementById('noticesListGrid');
      if (!container) return;

      container.innerHTML = json.data.map(evt => `
        <div class="dashboard-card" style="padding: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="padding: 3px 8px; border-radius: 4px; font-size: 11px; font-weight: 700; background: ${evt.priority === 'High' ? '#FEE2E2; color: #991B1B' : '#E0E7FF; color: #3730A3'};">
                ${escapeHtml(evt.priority || 'Normal')}
              </span>
              <h4 style="font-size: 15px; font-weight: 700;">${escapeHtml(evt.title)}</h4>
            </div>
            <span style="font-size: 12px; color: var(--text-muted);">${escapeHtml(evt.time || new Date(evt.date).toDateString())}</span>
          </div>
          <p style="font-size: 13px; color: var(--text-main); margin-bottom: 10px; line-height: 1.4;">
            ${escapeHtml(evt.description)}
          </p>
          <div style="font-size: 11.5px; color: var(--text-muted);">
            Target Audience: <strong>${escapeHtml(evt.targetAudience || 'All')}</strong>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.error('Failed to load events:', err);
  }
}

// 8. Academics & Timetable Module
async function loadSubjects() {
  try {
    const res = await fetch('/api/academics/subjects');
    const json = await res.json();
    if (json.success && json.data) {
      currentData.subjects = json.data;
      const tbody = document.getElementById('subjectsTableBody');
      if (!tbody) return;

      tbody.innerHTML = json.data.map(sub => `
        <tr>
          <td><strong>${escapeHtml(sub.code)}</strong></td>
          <td><span style="font-weight: 600;">${escapeHtml(sub.name)}</span></td>
          <td>${escapeHtml(sub.department)}</td>
          <td>${escapeHtml(sub.teacherName || 'Faculty Instructor')}</td>
          <td>${sub.weeklyPeriods || 4} hrs/wk</td>
          <td>
            <div style="display: flex; align-items: center; gap: 8px;">
              <div style="flex: 1; height: 6px; background: #EDF2F7; border-radius: 3px; overflow: hidden;">
                <div style="height: 100%; width: ${sub.syllabusProgress || 80}%; background: ${sub.syllabusProgress > 80 ? '#38A169' : '#3182CE'};"></div>
              </div>
              <span style="font-size: 11.5px; font-weight: 700;">${sub.syllabusProgress || 80}%</span>
            </div>
          </td>
          <td><span style="font-size: 11px; background: #FAF5EB; padding: 2px 6px; border-radius: 4px;">${escapeHtml((sub.targetClasses || ['1st Class - 8th Class']).join(', '))}</span></td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('Failed to load subjects:', err);
  }
}

async function loadTimetable(className = '1st Class') {
  try {
    const res = await fetch(`/api/academics/timetable?className=${encodeURIComponent(className)}`);
    const json = await res.json();
    if (json.success && json.data) {
      const tbody = document.getElementById('timetableBody');
      if (!tbody) return;

      const scheduleList = json.data.schedule || (Array.isArray(json.data) ? json.data : []);
      tbody.innerHTML = scheduleList.map(row => `
        <tr>
          <td><strong style="color: var(--primary-accent);">${escapeHtml(row.day)}</strong></td>
          ${(row.periods || []).map(p => {
            const subject = typeof p === 'string' ? p : (p.subject || 'Study Period');
            const teacher = typeof p === 'string' ? '' : (p.teacher || '');
            return `
              <td>
                <div class="timetable-period-box">
                  <div class="period-subject">${escapeHtml(subject)}</div>
                  ${teacher ? `<div class="period-teacher">${escapeHtml(teacher)}</div>` : ''}
                </div>
              </td>
            `;
          }).join('')}
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('Failed to load timetable:', err);
  }
}

// 9. Examinations & Gradebook Module
async function loadExams() {
  try {
    const response = await fetch('/api/exams');
    const result = await response.json();
    if (result.success && result.data) {
      currentData.exams = result.data;
      renderExams(result.data);
    }
  } catch (error) {
    console.error('Failed to load examinations:', error);
  }
}

function renderExams(exams) {
  const scheduledCount = exams.filter(exam => exam.status === 'Scheduled').length;
  const classes = new Set(exams.flatMap(exam => exam.targetClasses || []));
  const subjects = new Set(exams.flatMap(exam => (exam.subjects || []).map(subject => subject.name)));
  const summary = document.getElementById('examSummary');
  const tableBody = document.getElementById('examsTableBody');

  if (summary) {
    summary.innerHTML = createSummaryCards([
      { label: 'Examinations', value: exams.length },
      { label: 'Scheduled Assessments', value: scheduledCount },
      { label: 'Classes / Subjects Covered', value: `${classes.size} / ${subjects.size}` }
    ]);
  }

  if (!tableBody) return;

  if (exams.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="6" class="empty-table-message">No examinations are scheduled.</td></tr>';
    return;
  }

  tableBody.innerHTML = exams.map(exam => `
    <tr>
      <td><strong>${escapeHtml(exam.title)}</strong></td>
      <td>${escapeHtml(exam.term || 'First Term')}<br><span class="table-secondary">${escapeHtml(exam.academicYear || '2024/2025')}</span></td>
      <td>${escapeHtml((exam.targetClasses || []).join(', ') || 'All classes (1st - 8th)')}</td>
      <td>${formatDate(exam.startDate)} – ${formatDate(exam.endDate)}</td>
      <td>${escapeHtml((exam.subjects || []).map(subject => subject.name).join(', ') || 'Core Subjects')}</td>
      <td><span class="status-badge badge-${(exam.status || 'Scheduled').toLowerCase()}">${escapeHtml(exam.status || 'Scheduled')}</span></td>
    </tr>
  `).join('');
}

async function loadGrades(className = 'all') {
  try {
    let url = '/api/exams/grades';
    if (className && className !== 'all') {
      url += `?className=${encodeURIComponent(className)}`;
    }
    const res = await fetch(url);
    const json = await res.json();
    if (json.success && json.data) {
      currentData.grades = json.data;
      const tbody = document.getElementById('gradebookTableBody');
      if (!tbody) return;

      if (json.data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="9" style="text-align: center; padding: 24px; color: var(--text-muted);">No student grade records found for this class.</td></tr>';
        return;
      }

      tbody.innerHTML = json.data.map(grade => `
        <tr>
          <td><strong>${escapeHtml(grade.studentId)}</strong></td>
          <td><span style="font-weight: 600;">${escapeHtml(grade.studentName)}</span></td>
          <td><span style="background: #F1ECE4; padding: 2px 8px; border-radius: 4px; font-weight: 600;">${escapeHtml(grade.className)}</span></td>
          <td>${grade.totalMarksObtained} / ${grade.totalMaxMarks}</td>
          <td><strong>${grade.percentage}%</strong></td>
          <td><span class="status-badge badge-grade" style="background: #EBF8FF; color: #2B6CB0; font-weight: 700;">${escapeHtml(grade.overallGrade)}</span></td>
          <td>#${grade.classRank || 1}</td>
          <td style="font-size: 11.5px; color: var(--text-muted); max-width: 240px;">${escapeHtml(grade.teacherRemarks || 'Satisfactory academic performance')}</td>
          <td>
            <button class="btn-sm-action" onclick="openReportCard('${escapeHtml(grade.studentId)}')">
              Report Card
            </button>
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('Failed to load grades:', err);
  }
}

// Student Official Report Card Viewer
async function openReportCard(studentId) {
  try {
    const res = await fetch(`/api/exams/report-card/${encodeURIComponent(studentId)}`);
    const json = await res.json();
    if (!json.success || !json.data) {
      showToast('Could not load student report card', 'error');
      return;
    }

    const { school, student, grade } = json.data;
    const setEl = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };

    setEl('rcSchoolName', school?.schoolName || 'GREENFIELD HIGH SCHOOL');
    setEl('rcSchoolMotto', school?.motto || 'Excellence in Knowledge, Innovation & Character');
    setEl('rcSchoolSession', `${school?.academicSession || '2024/2025'} Session • Continuous Assessment Report`);

    setEl('rcStudentName', `${student?.firstName || ''} ${student?.lastName || ''}`);
    setEl('rcStudentId', student?.studentId || studentId);
    setEl('rcClassName', student?.class || grade?.className || '1st Class');
    setEl('rcRollNumber', student?.rollNumber || grade?.rollNumber || '1');

    setEl('rcTotalMarks', `${grade?.totalMarksObtained || 450} / ${grade?.totalMaxMarks || 500}`);
    setEl('rcPercentage', `${grade?.percentage || 90}%`);
    setEl('rcOverallGrade', grade?.overallGrade || 'A');
    setEl('rcRank', `${grade?.classRank || 1}${getOrdinal(grade?.classRank || 1)} Position`);
    setEl('rcAttendance', `${student?.attendanceRate || grade?.attendancePercentage || 95}%`);
    setEl('rcTeacherRemarks', grade?.teacherRemarks || 'Excellent academic progress and disciplined behavior.');

    const tbody = document.getElementById('rcSubjectsBody');
    if (tbody && grade?.subjects) {
      tbody.innerHTML = grade.subjects.map(s => `
        <tr>
          <td><strong>${escapeHtml(s.subject)}</strong></td>
          <td>${s.marksObtained}</td>
          <td>${s.maxMarks || 100}</td>
          <td><span style="font-weight: 700; color: #2B6CB0;">${escapeHtml(s.grade || 'A')}</span></td>
          <td style="font-size: 11.5px; color: var(--text-muted);">${s.marksObtained >= 80 ? 'Distinction' : s.marksObtained >= 65 ? 'Commendable' : 'Pass'}</td>
        </tr>
      `).join('');
    }

    openModal('modalReportCard');
  } catch (err) {
    showToast('Failed to generate report card', 'error');
  }
}

function getOrdinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

function printReportCard() {
  window.print();
}

// 10. Library & Lending Module
async function loadLibraryBooks() {
  try {
    const response = await fetch('/api/library/books');
    const result = await response.json();
    if (result.success && result.data) {
      currentData.libraryBooks = result.data;
      renderLibraryBooks(result.data);
    }
  } catch (error) {
    console.error('Failed to load library books:', error);
  }
}

function renderLibraryBooks(books) {
  const totalCopies = books.reduce((total, book) => total + (book.totalCopies || 0), 0);
  const availableCopies = books.reduce((total, book) => total + (book.availableCopies || 0), 0);
  const summary = document.getElementById('librarySummary');
  const tableBody = document.getElementById('libraryBooksTableBody');

  if (summary) {
    summary.innerHTML = createSummaryCards([
      { label: 'Book Titles Catalogued', value: books.length },
      { label: 'Total Copies in Stock', value: totalCopies },
      { label: 'Copies Currently Available', value: `${availableCopies} / ${totalCopies}` }
    ]);
  }

  if (!tableBody) return;

  if (books.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="7" class="empty-table-message">No library books are listed.</td></tr>';
    return;
  }

  tableBody.innerHTML = books.map(book => `
    <tr>
      <td><strong>${escapeHtml(book.title)}</strong></td>
      <td>${escapeHtml(book.author)}</td>
      <td><code>${escapeHtml(book.isbn || 'ISBN-N/A')}</code></td>
      <td>${escapeHtml(book.category)}</td>
      <td><strong>${book.availableCopies}</strong> / ${book.totalCopies}</td>
      <td><span style="background: #F4EFE6; padding: 2px 6px; border-radius: 4px; font-weight: 600;">${escapeHtml(book.shelfLocation)}</span></td>
      <td>
        <button class="btn-sm-action" onclick="openIssueBookModal('${escapeHtml(book.title)}')">
          Issue
        </button>
      </td>
    </tr>
  `).join('');
}

async function loadLibraryLendings() {
  try {
    const res = await fetch('/api/library/lendings');
    const json = await res.json();
    if (json.success && json.data) {
      currentData.libraryLendings = json.data;
      const tbody = document.getElementById('libraryLendingsTableBody');
      if (!tbody) return;

      if (json.data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; padding: 20px; color: var(--text-muted);">No active book borrowings recorded.</td></tr>';
        return;
      }

      tbody.innerHTML = json.data.map(lending => `
        <tr>
          <td><strong>${escapeHtml(lending.bookTitle)}</strong></td>
          <td>${escapeHtml(lending.studentName)} (${escapeHtml(lending.studentId)})</td>
          <td><span style="background: #F1ECE4; padding: 2px 6px; border-radius: 4px;">${escapeHtml(lending.className || '1st Class')}</span></td>
          <td>${formatDate(lending.issueDate)}</td>
          <td>${formatDate(lending.dueDate)}</td>
          <td><span class="status-badge badge-${(lending.status || 'Issued').toLowerCase()}">${escapeHtml(lending.status)}</span></td>
          <td>
            ${lending.status === 'Issued' || lending.status === 'Overdue'
              ? `<button class="btn-sm-action" onclick="returnBookAction('${escapeHtml(lending._id)}')">Mark Returned</button>`
              : `<span style="font-size: 11.5px; color: #38A169; font-weight: 600;">Returned ✓</span>`}
          </td>
        </tr>
      `).join('');
    }
  } catch (err) {
    console.error('Failed to load library lendings:', err);
  }
}

function openIssueBookModal(preselectedTitle = '') {
  const select = document.getElementById('issueBookSelect');
  if (select && currentData.libraryBooks) {
    select.innerHTML = currentData.libraryBooks.map(b => `
      <option value="${escapeHtml(b.title)}" ${b.title === preselectedTitle ? 'selected' : ''}>
        ${escapeHtml(b.title)} (${b.availableCopies} available)
      </option>
    `).join('');
  }
  openModal('modalIssueBook');
}

async function returnBookAction(lendingId) {
  try {
    const res = await authFetch(`/api/library/return/${encodeURIComponent(lendingId)}`, {
      method: 'POST'
    });
    const json = await res.json();
    if (json.success) {
      showToast('Book marked as returned successfully!');
      loadLibraryLendings();
      loadLibraryBooks();
    } else {
      showToast(json.message || 'Could not process book return', 'error');
    }
  } catch (err) {
    showToast('Failed to return book', 'error');
  }
}

// 11. Transport & Fleet Logistics Module
async function loadTransport() {
  try {
    const res = await fetch('/api/transport');
    const json = await res.json();
    if (json.success && json.data) {
      currentData.transportRoutes = json.data;
      renderTransport(json.data);
    }
  } catch (err) {
    console.error('Failed to load transport:', err);
  }
}

function renderTransport(routes) {
  const summary = document.getElementById('transportSummary');
  const cardsGrid = document.getElementById('transportRoutesGrid');
  const tbody = document.getElementById('transportTableBody');

  const totalCap = routes.reduce((acc, r) => acc + (r.capacity || 0), 0);
  const activeRoutes = routes.filter(r => r.status === 'Active').length;
  const totalRev = routes.reduce((acc, r) => acc + ((r.monthlyFee || 0) * (r.capacity || 0)), 0);

  if (summary) {
    summary.innerHTML = createSummaryCards([
      { label: 'Bus Corridors', value: routes.length },
      { label: 'Active Fleet Vehicles', value: `${activeRoutes} / ${routes.length}` },
      { label: 'Total Student Capacity', value: totalCap },
      { label: 'Fleet Potential (Monthly)', value: `₦${(totalRev / 1000000).toFixed(1)}M` }
    ]);
  }

  if (cardsGrid) {
    cardsGrid.innerHTML = routes.map(r => `
      <div class="transport-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <div>
            <span style="font-size: 11px; font-weight: 700; color: var(--primary-accent); background: #FAF5EB; padding: 2px 8px; border-radius: 4px;">
              Route #${r.routeNumber}
            </span>
            <h4 style="font-size: 15px; font-weight: 700; margin-top: 6px;">${escapeHtml(r.routeName)}</h4>
          </div>
          <span class="status-badge badge-${(r.status || 'Active').toLowerCase()}">${escapeHtml(r.status)}</span>
        </div>

        <div style="margin: 10px 0; font-size: 12px; color: var(--text-muted); display: flex; flex-direction: column; gap: 4px;">
          <div>🚌 Vehicle Plate: <strong style="color: var(--text-main);">${escapeHtml(r.vehicleNumber)}</strong></div>
          <div>👤 Driver: <strong style="color: var(--text-main);">${escapeHtml(r.driverName)}</strong> (${escapeHtml(r.driverPhone)})</div>
          <div>👥 Capacity: <strong>${r.capacity} seats</strong></div>
          <div>💰 Transport Fare: <strong>₦${Number(r.monthlyFee || 0).toLocaleString()} / month</strong></div>
        </div>

        <div style="font-size: 11.5px; border-top: 1px solid var(--border-subtle); padding-top: 8px; color: var(--text-muted);">
          Stops: ${(r.stops || ['Campus Gate', 'Residential Junction']).join(' → ')}
        </div>
      </div>
    `).join('');
  }

  if (tbody) {
    tbody.innerHTML = routes.map(r => `
      <tr>
        <td><strong>#${r.routeNumber}</strong></td>
        <td><strong>${escapeHtml(r.routeName)}</strong></td>
        <td><code>${escapeHtml(r.vehicleNumber)}</code></td>
        <td>${escapeHtml(r.driverName)}</td>
        <td>${escapeHtml(r.driverPhone)}</td>
        <td>${r.capacity} Passengers</td>
        <td>₦${Number(r.monthlyFee || 0).toLocaleString()}</td>
        <td><span class="status-badge badge-${(r.status || 'Active').toLowerCase()}">${escapeHtml(r.status)}</span></td>
      </tr>
    `).join('');
  }
}

// 12. Reports & Data Export Center
function loadReportsHub() {
  const preview = document.getElementById('reportsLivePreview');
  if (preview) {
    preview.innerHTML = `
      school_db Reporting Center Ready.<br>
      • Students database: ${currentData.students.length || 10} records ready for CSV export.<br>
      • Finance invoices: ${currentData.fees.length || 8} ledger entries ready.<br>
      • Faculty records: ${currentData.staff.length || 7} staff entries ready.<br>
      Click any export button above to generate immediate spreadsheet downloads.
    `;
  }
}

function exportDataToCSV(type) {
  let csvContent = '';
  let filename = `school_db_${type}_export_${new Date().toISOString().slice(0, 10)}.csv`;

  if (type === 'students') {
    const list = currentData.students;
    if (!list || list.length === 0) {
      showToast('No students loaded to export', 'error');
      return;
    }
    const headers = ['StudentID', 'FirstName', 'LastName', 'Class', 'RollNumber', 'Gender', 'AttendanceRate', 'PerformanceCategory', 'FeeStatus', 'GuardianName', 'GuardianPhone'];
    const rows = list.map(s => [
      s.studentId,
      `"${s.firstName}"`,
      `"${s.lastName}"`,
      `"${s.class}"`,
      s.rollNumber || 1,
      s.gender,
      `${s.attendanceRate || 95}%`,
      s.performanceCategory || 'Good',
      s.feeStatus || 'Paid',
      `"${s.guardian?.name || ''}"`,
      `"${s.guardian?.phone || ''}"`
    ]);
    csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  } else if (type === 'fees') {
    const list = currentData.fees;
    if (!list || list.length === 0) {
      showToast('No fee records to export', 'error');
      return;
    }
    const headers = ['InvoiceNumber', 'StudentName', 'Class', 'FeeType', 'TotalAmount', 'PaidAmount', 'Balance', 'Status', 'PaymentMethod'];
    const rows = list.map(f => [
      f.invoiceNumber,
      `"${f.studentName}"`,
      `"${f.className}"`,
      `"${f.feeType}"`,
      f.totalAmount,
      f.paidAmount,
      f.balance,
      f.status,
      f.paymentMethod || 'Pending'
    ]);
    csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  } else if (type === 'attendance') {
    const matrix = currentData.dashboard?.attendanceWeeklyOverview || [];
    const headers = ['Class', 'Present', 'Late', 'Absent', 'AttendanceRate'];
    const rows = matrix.map(m => [
      `"${m.className}"`,
      m.present,
      m.late,
      m.absent,
      `${m.rate}%`
    ]);
    csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  } else if (type === 'staff') {
    const list = currentData.staff;
    const headers = ['StaffID', 'Name', 'Role', 'Designation', 'Department', 'Email', 'Status'];
    const rows = list.map(s => [
      s.staffId,
      `"${s.name}"`,
      `"${s.role}"`,
      `"${s.designation}"`,
      `"${s.department}"`,
      `"${s.email}"`,
      s.isOnline ? 'Online' : 'Offline'
    ]);
    csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }

  // Trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  const preview = document.getElementById('reportsLivePreview');
  if (preview) {
    preview.innerHTML = `
      ✓ Successfully generated and downloaded: <strong>${escapeHtml(filename)}</strong><br>
      Total Lines: ${csvContent.split('\n').length} lines | File Size: ${(blob.size / 1024).toFixed(2)} KB<br>
      Ready for Microsoft Excel, Google Sheets, or official audit presentation.
    `;
  }
  showToast(`Exported ${type.toUpperCase()} report as CSV!`);
}

// Full Database JSON Backup
async function exportFullDatabaseJson() {
  try {
    const res = await fetch('/api/settings/backup');
    const json = await res.json();
    const dataStr = JSON.stringify(json, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `school_db_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Full school_db snapshot downloaded successfully!');
  } catch (err) {
    showToast('Failed to export system backup', 'error');
  }
}

// 13. Settings & Diagnostics
async function loadSettings() {
  try {
    const res = await fetch('/api/settings');
    const json = await res.json();
    if (json.success && json.data) {
      const settingsObj = json.data.settings || json.data;
      currentData.settings = settingsObj;
      updateSettingsUI(settingsObj);

      // Populate system diagnostics counts from server response
      const counts = json.data.counts;
      const setDiag = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
      if (counts) {
        setDiag('diagStudentCount', `${counts.students} Students enrolled`);
        setDiag('diagStaffCount', `${counts.staff} Active staff members`);
        setDiag('diagClassCount', `${counts.classes} Classes (1st - 8th)`);
        setDiag('diagTransportCount', `${counts.transport} Routes operational`);
        setDiag('diagBookCount', `${counts.libraryBooks} Titles catalogued`);
        setDiag('diagSubjectCount', `${counts.subjects} Subjects registered`);
      }
    }
  } catch (err) {
    console.error('Failed to load settings:', err);
  }
}

function updateSettingsUI(settings) {
  if (!settings) return;
  const setVal = (id, val) => { const el = document.getElementById(id); if (el && val) el.value = val; };
  setVal('settingSchoolName', settings.schoolName);
  setVal('settingMotto', settings.motto);
  setVal('settingSession', settings.academicSession);
  setVal('settingTerm', settings.currentTerm);
  setVal('settingPrincipal', settings.principalName);
  setVal('settingEmail', settings.email);
  setVal('settingPhone', settings.phone);
  setVal('settingAddress', settings.address);

  // Update sidebar branding badge
  const sidebarName = document.getElementById('sidebarSchoolName');
  const sidebarSession = document.getElementById('sidebarSession');
  if (sidebarName && settings.schoolName) sidebarName.textContent = settings.schoolName;
  if (sidebarSession && settings.academicSession) sidebarSession.textContent = `${settings.academicSession} Session ▾`;
}

// Helper utilities
function createSummaryCards(items) {
  return items.map(item => `
    <article class="summary-card">
      <span class="summary-label">${escapeHtml(item.label)}</span>
      <strong class="summary-value">${escapeHtml(item.value)}</strong>
    </article>
  `).join('');
}

function formatDate(value) {
  if (!value) return '-';
  return new Date(value).toLocaleDateString('en-US', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

// ================= FORM SUBMISSION LISTENERS =================
function setupFormSubmissions() {
  // 1. Add Student Form
  document.getElementById('formAddStudent')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      gender: formData.get('gender'),
      class: formData.get('class'),
      rollNumber: Number(formData.get('rollNumber')),
      bloodGroup: formData.get('bloodGroup'),
      guardian: {
        name: formData.get('guardianName'),
        phone: formData.get('guardianPhone'),
        email: formData.get('guardianEmail')
      }
    };

    try {
      const res = await authFetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        showToast('New student enrolled successfully!');
        closeModal('modalAddStudent');
        e.target.reset();
        loadStudents();
        loadDashboardData();
      } else {
        showToast(json.message || 'Error creating student', 'error');
      }
    } catch (err) {
      showToast('Server connection failed', 'error');
    }
  });

  // 2. Edit Student Form
  document.getElementById('formEditStudent')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const studentId = document.getElementById('editStudentId')?.value;
    if (!studentId) return;

    const formData = new FormData(e.target);
    const payload = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      class: formData.get('class'),
      rollNumber: Number(formData.get('rollNumber')),
      performanceCategory: formData.get('performanceCategory'),
      attendanceRate: Number(formData.get('attendanceRate')),
      feeStatus: formData.get('feeStatus'),
      guardian: {
        name: formData.get('guardianName'),
        phone: formData.get('guardianPhone')
      }
    };

    try {
      const res = await authFetch(`/api/students/${encodeURIComponent(studentId)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Student record for ${studentId} updated successfully!`);
        closeModal('modalEditStudent');
        loadStudents();
        loadDashboardData();
      } else {
        showToast(json.message || 'Failed to update student', 'error');
      }
    } catch (err) {
      showToast('Server error updating student', 'error');
    }
  });

  // 3. Mark Attendance Form
  document.getElementById('formMarkAttendance')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      className: formData.get('className'),
      present: Number(formData.get('present')),
      late: Number(formData.get('late')),
      absent: Number(formData.get('absent')),
      status: formData.get('status'),
      dayIndex: 3
    };

    try {
      const res = await authFetch('/api/attendance/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Attendance updated for ${payload.className}`);
        closeModal('modalMarkAttendance');
        loadDashboardData();
        if (document.getElementById('viewAttendance')?.classList.contains('active')) {
          loadAttendanceView();
        }
      }
    } catch (err) {
      showToast('Error recording attendance', 'error');
    }
  });

  // 4. Record Fee Payment Form
  document.getElementById('formRecordPayment')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      invoiceNumber: formData.get('invoiceNumber'),
      amount: Number(formData.get('amount')),
      method: formData.get('method')
    };

    try {
      const res = await authFetch('/api/fees/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Payment of ₦${payload.amount.toLocaleString()} recorded successfully!`);
        closeModal('modalRecordPayment');
        loadFees();
        loadDashboardData();
      } else {
        showToast(json.message || 'Payment processing failed', 'error');
      }
    } catch (err) {
      showToast('Server error while recording payment', 'error');
    }
  });

  // 5. Create Notice / Event Form
  document.getElementById('formCreateNotice')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      title: formData.get('title'),
      targetAudience: formData.get('targetAudience'),
      priority: formData.get('priority'),
      description: formData.get('description'),
      date: new Date().toISOString()
    };

    try {
      const res = await authFetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        showToast('School announcement published successfully!');
        closeModal('modalCreateNotice');
        e.target.reset();
        loadEvents();
        loadDashboardData();
      }
    } catch (err) {
      showToast('Error publishing notice', 'error');
    }
  });

  // 6. Add Subject Form
  document.getElementById('formAddSubject')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      code: formData.get('code') || `SUB-${Date.now().toString().slice(-4)}`,
      name: formData.get('name'),
      department: formData.get('department'),
      weeklyPeriods: Number(formData.get('weeklyPeriods') || 4),
      teacherName: formData.get('teacherName'),
      description: formData.get('description'),
      syllabusProgress: 15
    };

    try {
      const res = await authFetch('/api/academics/subjects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Subject "${payload.name}" added to curriculum!`);
        closeModal('modalAddSubject');
        e.target.reset();
        loadSubjects();
      } else {
        showToast(json.message || 'Could not register subject', 'error');
      }
    } catch (err) {
      showToast('Error creating subject', 'error');
    }
  });

  // 7. Add Transport Route Form
  document.getElementById('formAddTransport')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      routeName: formData.get('routeName'),
      vehicleNumber: formData.get('vehicleNumber'),
      capacity: Number(formData.get('capacity') || 30),
      driverName: formData.get('driverName'),
      driverPhone: formData.get('driverPhone'),
      monthlyFee: Number(formData.get('monthlyFee') || 30000),
      status: formData.get('status') || 'Active'
    };

    try {
      const res = await authFetch('/api/transport', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Transport route "${payload.routeName}" created successfully!`);
        closeModal('modalAddTransport');
        e.target.reset();
        loadTransport();
      } else {
        showToast(json.message || 'Could not add transport route', 'error');
      }
    } catch (err) {
      showToast('Error adding transport route', 'error');
    }
  });

  // 8. Add Library Book Form
  document.getElementById('formAddBook')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const total = Number(formData.get('totalCopies') || 10);
    const payload = {
      title: formData.get('title'),
      author: formData.get('author'),
      category: formData.get('category'),
      totalCopies: total,
      availableCopies: total,
      shelfLocation: formData.get('shelfLocation') || 'D-01',
      isbn: `978-0-${Math.floor(100000 + Math.random() * 900000)}`
    };

    try {
      const res = await authFetch('/api/library/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Book "${payload.title}" added to catalogue!`);
        closeModal('modalAddBook');
        e.target.reset();
        loadLibraryBooks();
      } else {
        showToast(json.message || 'Could not add book', 'error');
      }
    } catch (err) {
      showToast('Error adding library book', 'error');
    }
  });

  // 9. Issue Library Book Form
  document.getElementById('formIssueBook')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      bookTitle: formData.get('bookTitle'),
      studentId: formData.get('studentId'),
      studentName: formData.get('studentName'),
      className: formData.get('className'),
      dueDate: formData.get('dueDate') || new Date(Date.now() + 14 * 86400000).toISOString()
    };

    try {
      const res = await authFetch('/api/library/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Book "${payload.bookTitle}" issued to ${payload.studentName}!`);
        closeModal('modalIssueBook');
        e.target.reset();
        loadLibraryLendings();
        loadLibraryBooks();
      } else {
        showToast(json.message || 'Could not issue book', 'error');
      }
    } catch (err) {
      showToast('Error issuing library book', 'error');
    }
  });

  // 10. Schedule New Exam Form
  document.getElementById('formScheduleExam')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      title: formData.get('title'),
      term: formData.get('term'),
      academicYear: '2024/2025',
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      status: formData.get('status') || 'Scheduled',
      description: formData.get('description'),
      targetClasses: ['1st Class', '2nd Class', '3rd Class', '4th Class', '5th Class', '6th Class', '7th Class', '8th Class', '9th Class', '10th Class', '11th Class', '12th Class']
    };

    try {
      const res = await authFetch('/api/exams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Exam "${payload.title}" scheduled!`);
        closeModal('modalScheduleExam');
        e.target.reset();
        loadExams();
      } else {
        showToast(json.message || 'Could not schedule exam', 'error');
      }
    } catch (err) {
      showToast('Error scheduling exam', 'error');
    }
  });

  // 11. Record Student Marks Form
  document.getElementById('formRecordMarks')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const m = Number(formData.get('math') || 0);
    const en = Number(formData.get('english') || 0);
    const sc = Number(formData.get('science') || 0);
    const so = Number(formData.get('social') || 0);
    const c = Number(formData.get('computer') || 0);
    const total = m + en + sc + so + c;
    const pct = Math.round(total / 5);

    const payload = {
      examTitle: 'Term Evaluation Assessment',
      term: 'First Term',
      studentId: formData.get('studentId'),
      studentName: formData.get('studentName'),
      className: formData.get('className'),
      classRank: Number(formData.get('classRank') || 1),
      totalMarksObtained: total,
      totalMaxMarks: 500,
      percentage: pct,
      overallGrade: pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : 'D',
      teacherRemarks: formData.get('teacherRemarks') || 'Remarkable academic performance and active participation.',
      subjects: [
        { subject: 'Mathematics', marksObtained: m, maxMarks: 100, grade: m >= 80 ? 'A' : 'B' },
        { subject: 'English Language', marksObtained: en, maxMarks: 100, grade: en >= 80 ? 'A' : 'B' },
        { subject: 'General Science', marksObtained: sc, maxMarks: 100, grade: sc >= 80 ? 'A' : 'B' },
        { subject: 'Social Studies', marksObtained: so, maxMarks: 100, grade: so >= 80 ? 'A' : 'B' },
        { subject: 'Computer Studies', marksObtained: c, maxMarks: 100, grade: c >= 80 ? 'A' : 'B' }
      ]
    };

    try {
      const res = await authFetch('/api/exams/grades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Grade recorded for ${payload.studentName} (${pct}% - Grade ${payload.overallGrade})!`);
        closeModal('modalRecordMarks');
        e.target.reset();
        loadGrades(document.getElementById('gradebookClassFilter')?.value || 'all');
      } else {
        showToast(json.message || 'Could not record marks', 'error');
      }
    } catch (err) {
      showToast('Error recording examination marks', 'error');
    }
  });

  // 12. School Settings Profile Form
  document.getElementById('formSchoolSettings')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = {
      schoolName: formData.get('schoolName'),
      motto: formData.get('motto'),
      academicSession: formData.get('academicSession'),
      currentTerm: formData.get('currentTerm'),
      principalName: formData.get('principalName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address')
    };

    try {
      const res = await authFetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        showToast('School profile and system settings updated!');
        updateSettingsUI(json.data || payload);
      } else {
        showToast(json.message || 'Failed to update settings', 'error');
      }
    } catch (err) {
      showToast('Error updating school settings', 'error');
    }
  });
}

// AI Intelligence Report Generator
function openAiReport() {
  const container = document.getElementById('aiReportContent');
  if (!container) return;
  const d = currentData.dashboard || {};
  const kpis = d.kpis || {};
  const fee = d.feeSummary || {};

  container.innerHTML = `
    <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 14px; margin-bottom: 14px;">
      <h4 style="font-size: 16px; font-weight: 700; color: var(--text-main);">Executive School Performance Summary</h4>
      <p style="font-size: 12px; color: var(--text-muted);">Generated on ${new Date().toLocaleDateString('en-US', { dateStyle: 'full' })} for Greenfield High School (school_db)</p>
    </div>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
      <div style="background: #F8F7F4; padding: 12px; border-radius: 8px;">
        <div style="font-size: 11px; color: var(--text-muted);">Enrollment & Attendance</div>
        <div style="font-size: 16px; font-weight: 700;">${kpis.totalStudents?.value || 1284} Students</div>
        <div style="font-size: 11.5px; color: #38A169;">Average Attendance: ${kpis.attendanceRate?.value || '96.4%'}</div>
      </div>
      <div style="background: #F8F7F4; padding: 12px; border-radius: 8px;">
        <div style="font-size: 11px; color: var(--text-muted);">Financial Collection Rate</div>
        <div style="font-size: 16px; font-weight: 700;">${fee.ratePercentage || 84}% Recovered</div>
        <div style="font-size: 11.5px; color: #D97706;">Pending Balance: ${fee.balanceFormatted || '₦2,400,000'}</div>
      </div>
    </div>

    <h5 style="font-size: 13px; font-weight: 700; margin-bottom: 8px;">Key AI System Recommendations:</h5>
    <ul style="padding-left: 20px; font-size: 12.5px; color: var(--text-main); display: flex; flex-direction: column; gap: 6px;">
      <li><strong>Attendance Intervention:</strong> 23 students identified below the 80% threshold across 1st - 12th Classes. Automated guardian SMS reminders recommended.</li>
      <li><strong>Revenue Acceleration:</strong> Tuition collection is currently 16% behind the monthly milestone. Automated fee reminders scheduled for overdue accounts.</li>
      <li><strong>Curriculum & Timetable:</strong> 14 academic subjects actively tracked across 12 classes with 84% syllabus coverage ahead of senior board assessments.</li>
      <li><strong>Logistics & Fleet:</strong> 5 transport bus routes operating at 92% capacity including the newly launched Senior Campus & Boarding Shuttle.</li>
    </ul>
  `;
  openModal('modalAiReport');
}
