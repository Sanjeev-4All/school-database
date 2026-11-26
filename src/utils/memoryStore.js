// In-memory data store fallback initialized with seed data
const {
  classesData,
  staffData,
  studentsData,
  attendanceWeeklyOverview,
  feeInvoicesData,
  eventsData,
  examsData,
  libraryBooksData,
  subjectsData,
  transportData,
  bookLendingsData,
  gradesData,
  settingsData,
  timetableSample,
  aiInsights,
  dashboardOverview
} = require('../seeds/seedData');

class MemoryStore {
  constructor() {
    this.students = JSON.parse(JSON.stringify(studentsData));
    this.staff = JSON.parse(JSON.stringify(staffData));
    this.classes = JSON.parse(JSON.stringify(classesData));
    this.fees = JSON.parse(JSON.stringify(feeInvoicesData));
    this.events = JSON.parse(JSON.stringify(eventsData));
    this.exams = JSON.parse(JSON.stringify(examsData));
    this.libraryBooks = JSON.parse(JSON.stringify(libraryBooksData));
    this.subjects = JSON.parse(JSON.stringify(subjectsData));
    this.transport = JSON.parse(JSON.stringify(transportData));
    this.bookLendings = JSON.parse(JSON.stringify(bookLendingsData));
    this.grades = JSON.parse(JSON.stringify(gradesData));
    this.settings = JSON.parse(JSON.stringify(settingsData));
    this.timetable = JSON.parse(JSON.stringify(timetableSample));
    this.attendanceOverview = JSON.parse(JSON.stringify(attendanceWeeklyOverview));
    this.aiInsights = JSON.parse(JSON.stringify(aiInsights));
    this.dashboardOverview = JSON.parse(JSON.stringify(dashboardOverview));
    this.users = [
      {
        _id: 'mem_user_admin_001',
        name: 'Admin User',
        email: 'admin@greenfield.edu',
        password: '$2a$10$X8v7F6a4CgM1eS8G0Jd78u57xYkX1v5lB7N4q5D1n8U8k9J3z0P1O', // 'admin123'
        role: 'Super Admin',
        department: 'Administration',
        avatar: 'A',
        status: 'Active',
        createdAt: new Date().toISOString()
      }
    ];
  }

  // --- Users / Auth ---
  findUserByEmail(email) {
    if (!email) return null;
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  getUserById(id) {
    return this.users.find(u => u._id === id || u.id === id);
  }

  createUser(userData) {
    const newUser = {
      _id: `mem_user_${Date.now()}`,
      ...userData,
      status: 'Active',
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }

  // --- Students CRUD ---
  getStudents({ search, className, status } = {}) {
    let result = [...this.students];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        s =>
          s.firstName.toLowerCase().includes(q) ||
          s.lastName.toLowerCase().includes(q) ||
          s.studentId.toLowerCase().includes(q)
      );
    }
    if (className && className !== 'all') {
      result = result.filter(s => s.class.toLowerCase().includes(className.toLowerCase()));
    }
    if (status && status !== 'all') {
      result = result.filter(s => s.status.toLowerCase() === status.toLowerCase());
    }
    return result;
  }

  getStudentById(id) {
    return this.students.find(s => s.studentId === id || s._id === id);
  }

  createStudent(data) {
    const studentId = data.studentId || `STU-2024-${String(this.students.length + 1).padStart(3, '0')}`;
    const newStudent = {
      ...data,
      studentId,
      _id: `mem_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.students.unshift(newStudent);
    this.dashboardOverview.kpis.totalStudents.value += 1;
    return newStudent;
  }

  updateStudent(id, updateData) {
    const index = this.students.findIndex(s => s.studentId === id || s._id === id);
    if (index === -1) return null;
    this.students[index] = {
      ...this.students[index],
      ...updateData,
      updatedAt: new Date().toISOString()
    };
    return this.students[index];
  }

  deleteStudent(id) {
    const index = this.students.findIndex(s => s.studentId === id || s._id === id);
    if (index === -1) return false;
    this.students.splice(index, 1);
    this.dashboardOverview.kpis.totalStudents.value = Math.max(0, this.dashboardOverview.kpis.totalStudents.value - 1);
    return true;
  }

  // --- Staff CRUD ---
  getStaff({ role, department, search } = {}) {
    let result = [...this.staff];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        s => s.name.toLowerCase().includes(q) || s.designation.toLowerCase().includes(q)
      );
    }
    if (role && role !== 'all') {
      result = result.filter(s => s.role === role);
    }
    if (department && department !== 'all') {
      result = result.filter(s => s.department === department);
    }
    return result;
  }

  createStaff(data) {
    const staffId = data.staffId || `TCH-${String(this.staff.length + 1).padStart(3, '0')}`;
    const newStaff = {
      ...data,
      staffId,
      _id: `mem_stf_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.staff.push(newStaff);
    this.dashboardOverview.kpis.totalStaff.value += 1;
    return newStaff;
  }

  // --- Classes CRUD ---
  getClasses() {
    return [...this.classes].sort((a, b) => (a.sequenceOrder || 99) - (b.sequenceOrder || 99));
  }

  createClass(data) {
    const newClass = {
      ...data,
      _id: `mem_cls_${Date.now()}`,
      enrolledCount: data.enrolledCount || 0,
      attendanceRate: data.attendanceRate || 95
    };
    this.classes.push(newClass);
    this.dashboardOverview.kpis.activeClasses.value += 1;
    return newClass;
  }

  // --- Fees CRUD ---
  getFees({ status } = {}) {
    let result = [...this.fees];
    if (status && status !== 'all') {
      result = result.filter(f => f.status.toLowerCase() === status.toLowerCase());
    }
    return result;
  }

  createFee(data) {
    const invoiceNumber = data.invoiceNumber || `INV-2024-${String(this.fees.length + 10).padStart(3, '0')}`;
    const totalAmount = Number(data.totalAmount) || 0;
    const paidAmount = Number(data.paidAmount) || 0;
    const balance = Math.max(0, totalAmount - paidAmount);
    const status = balance === 0 ? 'Paid' : paidAmount > 0 ? 'Partial' : 'Pending';

    const newFee = {
      ...data,
      invoiceNumber,
      totalAmount,
      paidAmount,
      balance,
      status,
      _id: `mem_fee_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.fees.unshift(newFee);
    return newFee;
  }

  recordPayment(invoiceNumber, amount, method = 'Bank Transfer') {
    const invoice = this.fees.find(f => f.invoiceNumber === invoiceNumber);
    if (!invoice) return null;
    invoice.paidAmount += Number(amount);
    invoice.balance = Math.max(0, invoice.totalAmount - invoice.paidAmount);
    invoice.status = invoice.balance === 0 ? 'Paid' : 'Partial';
    invoice.paymentMethod = method;
    invoice.paidDate = new Date().toISOString();
    return invoice;
  }

  // --- Attendance ---
  getAttendanceOverview() {
    return this.attendanceOverview;
  }

  updateClassAttendance(className, { present, late, absent, rate, dayIndex, status }) {
    const item = this.attendanceOverview.find(a => a.className === className);
    if (!item) return null;

    if (present !== undefined) item.present = present;
    if (late !== undefined) item.late = late;
    if (absent !== undefined) item.absent = absent;
    if (rate !== undefined) item.rate = rate;

    const normalizedDayIndex = Number(dayIndex);
    if (Number.isInteger(normalizedDayIndex) && normalizedDayIndex >= 0 && status) {
      const day = item.days[normalizedDayIndex];
      if (day !== undefined) item.days[normalizedDayIndex] = status;
    }

    return item;
  }

  // --- Events CRUD ---
  getEvents() {
    return this.events;
  }

  createEvent(data) {
    const newEvent = {
      ...data,
      _id: `mem_evt_${Date.now()}`,
      date: new Date(data.date || Date.now()).toISOString(),
      createdAt: new Date().toISOString()
    };
    this.events.unshift(newEvent);
    return newEvent;
  }

  // --- Examinations and Library ---
  getExams() {
    return [...this.exams].sort((first, second) =>
      new Date(first.startDate) - new Date(second.startDate)
    );
  }

  createExam(data) {
    const newExam = {
      ...data,
      _id: `mem_exam_${Date.now()}`,
      status: data.status || 'Scheduled',
      createdAt: new Date().toISOString()
    };
    this.exams.push(newExam);
    return newExam;
  }

  getLibraryBooks() {
    return [...this.libraryBooks].sort((first, second) =>
      first.title.localeCompare(second.title)
    );
  }

  createLibraryBook(data) {
    const newBook = {
      ...data,
      _id: `mem_book_${Date.now()}`,
      totalCopies: Number(data.totalCopies) || 1,
      availableCopies: Number(data.availableCopies || data.totalCopies) || 1,
      createdAt: new Date().toISOString()
    };
    this.libraryBooks.push(newBook);
    return newBook;
  }

  getBookLendings() {
    return [...this.bookLendings].sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate));
  }

  issueBook({ bookTitle, isbn, studentId, studentName, className, dueDate }) {
    const book = this.libraryBooks.find(b => b.title === bookTitle || b.isbn === isbn);
    if (book && book.availableCopies > 0) {
      book.availableCopies -= 1;
    }
    const newLending = {
      _id: `mem_lend_${Date.now()}`,
      bookTitle: bookTitle || book?.title,
      isbn: isbn || book?.isbn || 'N/A',
      studentId,
      studentName,
      className,
      issueDate: new Date().toISOString(),
      dueDate: new Date(dueDate || Date.now() + 14 * 86400000).toISOString(),
      status: 'Issued',
      fineAmount: 0
    };
    this.bookLendings.unshift(newLending);
    return newLending;
  }

  returnBook(lendingId) {
    const item = this.bookLendings.find(l => l._id === lendingId);
    if (!item || item.status === 'Returned') return null;
    item.status = 'Returned';
    item.returnDate = new Date().toISOString();
    const book = this.libraryBooks.find(b => b.title === item.bookTitle || b.isbn === item.isbn);
    if (book && book.availableCopies < book.totalCopies) {
      book.availableCopies += 1;
    }
    return item;
  }

  // --- Academics & Subjects ---
  getSubjects() {
    return this.subjects;
  }

  createSubject(data) {
    const newSub = {
      ...data,
      _id: `mem_sub_${Date.now()}`,
      code: data.code || `SUB-${String(this.subjects.length + 101)}`,
      weeklyPeriods: Number(data.weeklyPeriods) || 5,
      syllabusProgress: Number(data.syllabusProgress) || 75
    };
    this.subjects.push(newSub);
    return newSub;
  }

  getTimetable(className = '1st Class') {
    const isSenior = ['9th Class', '10th Class', '11th Class', '12th Class'].some(c => className.includes(c));
    const activeSchedule = (isSenior && this.timetable.seniorSchedule)
      ? this.timetable.seniorSchedule
      : this.timetable.schedule;

    return {
      className,
      academicSession: this.settings.academicSession,
      periods: this.timetable.periods,
      schedule: activeSchedule
    };
  }

  // --- Transport ---
  getTransportRoutes() {
    return this.transport;
  }

  createTransportRoute(data) {
    const newRoute = {
      ...data,
      _id: `mem_trans_${Date.now()}`,
      routeNumber: data.routeNumber || `ROUTE-${String(this.transport.length + 1).padStart(2, '0')}`,
      capacity: Number(data.capacity) || 30,
      enrolledStudentsCount: Number(data.enrolledStudentsCount) || 0,
      monthlyFee: Number(data.monthlyFee) || 30000,
      status: data.status || 'Active'
    };
    this.transport.push(newRoute);
    return newRoute;
  }

  // --- Grades & Report Cards ---
  getGrades({ className, studentId } = {}) {
    let result = [...this.grades];
    if (className && className !== 'all') {
      result = result.filter(g => g.className.toLowerCase().includes(className.toLowerCase()));
    }
    if (studentId) {
      result = result.filter(g => g.studentId === studentId);
    }
    return result;
  }

  createGrade(data) {
    const subjects = data.subjects || [];
    const totalObtained = subjects.reduce((sum, s) => sum + (Number(s.marksObtained) || 0), 0);
    const totalMax = subjects.reduce((sum, s) => sum + (Number(s.maxMarks) || 100), 0);
    const percentage = totalMax > 0 ? Math.round((totalObtained / totalMax) * 100) : 0;
    
    let overallGrade = 'A';
    if (percentage >= 90) overallGrade = 'A+';
    else if (percentage >= 80) overallGrade = 'A';
    else if (percentage >= 70) overallGrade = 'B';
    else if (percentage >= 60) overallGrade = 'C';
    else if (percentage >= 50) overallGrade = 'D';
    else overallGrade = 'F';

    const newGrade = {
      ...data,
      _id: `mem_grade_${Date.now()}`,
      totalMarksObtained: totalObtained,
      totalMaxMarks: totalMax,
      percentage,
      overallGrade,
      createdAt: new Date().toISOString()
    };
    this.grades.unshift(newGrade);
    return newGrade;
  }

  getReportCard(studentId) {
    const student = this.getStudentById(studentId);
    if (!student) return null;
    let grade = this.grades.find(g => g.studentId === studentId);
    if (!grade) {
      // Auto-generate standard report card based on student's performance category
      const pct = student.performanceCategory === 'Excellent' ? 92 :
                  student.performanceCategory === 'Good' ? 84 :
                  student.performanceCategory === 'Average' ? 72 :
                  student.performanceCategory === 'Below Average' ? 62 : 48;
      const isSenior = ['9th Class', '10th Class', '11th Class', '12th Class'].some(c => student.class?.includes(c));
      const subjects = isSenior ? [
        { subject: 'Further Mathematics', marksObtained: Math.round(pct + (Math.random() * 4 - 2)), maxMarks: 100, grade: pct >= 80 ? 'A' : 'B' },
        { subject: 'Physics & Mechanics', marksObtained: Math.round(pct + (Math.random() * 4 - 2)), maxMarks: 100, grade: pct >= 80 ? 'A' : 'B' },
        { subject: 'Chemistry & Organic Compounds', marksObtained: Math.round(pct + (Math.random() * 4 - 2)), maxMarks: 100, grade: pct >= 80 ? 'A' : 'B' },
        { subject: 'English Language & Literature', marksObtained: Math.round(pct + (Math.random() * 4 - 2)), maxMarks: 100, grade: pct >= 80 ? 'A' : 'B' },
        { subject: 'Computer Science & AI', marksObtained: Math.round(pct + 4), maxMarks: 100, grade: 'A+' }
      ] : [
        { subject: 'Mathematics', marksObtained: Math.round(pct + (Math.random() * 6 - 3)), maxMarks: 100, grade: pct >= 80 ? 'A' : 'B' },
        { subject: 'English Language', marksObtained: Math.round(pct + (Math.random() * 6 - 3)), maxMarks: 100, grade: pct >= 80 ? 'A' : 'B' },
        { subject: 'General Science', marksObtained: Math.round(pct + (Math.random() * 6 - 3)), maxMarks: 100, grade: pct >= 80 ? 'A' : 'B' },
        { subject: 'Social Studies', marksObtained: Math.round(pct + (Math.random() * 6 - 3)), maxMarks: 100, grade: pct >= 80 ? 'A' : 'B' },
        { subject: 'Computer Studies', marksObtained: Math.round(pct + 4), maxMarks: 100, grade: 'A+' }
      ];

      grade = {
        examTitle: isSenior ? 'Senior Secondary Assessment' : 'Term Evaluation & Comprehensive Assessment',
        term: this.settings.currentTerm,
        academicYear: this.settings.academicSession,
        studentId: student.studentId,
        studentName: `${student.firstName} ${student.lastName}`,
        className: student.class,
        rollNumber: student.rollNumber || 1,
        attendancePercentage: student.attendanceRate || 95,
        totalMarksObtained: Math.round(pct * 5),
        totalMaxMarks: 500,
        percentage: pct,
        overallGrade: pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : pct >= 50 ? 'D' : 'F',
        classRank: pct >= 90 ? 1 : pct >= 80 ? 4 : 12,
        teacherRemarks: `Student demonstrates ${student.performanceCategory.toLowerCase()} dedication. Consistent classroom engagement.`,
        subjects
      };
    }
    return {
      school: this.settings,
      student,
      grade
    };
  }

  // --- Settings & System Snapshot ---
  getSettings() {
    return this.settings;
  }

  updateSettings(data) {
    this.settings = { ...this.settings, ...data };
    return this.settings;
  }

  getSystemStats() {
    return {
      counts: {
        students: this.students.length,
        staff: this.staff.length,
        classes: this.classes.length,
        fees: this.fees.length,
        events: this.events.length,
        exams: this.exams.length,
        libraryBooks: this.libraryBooks.length,
        bookLendings: this.bookLendings.length,
        subjects: this.subjects.length,
        transport: this.transport.length,
        users: this.users.length
      },
      settings: this.settings,
      kpis: this.dashboardOverview.kpis
    };
  }

  // --- Dashboard Snapshot ---
  getDashboardData() {
    return {
      kpis: this.dashboardOverview.kpis,
      feeSummary: this.dashboardOverview.feeSummary,
      studentPerformance: this.dashboardOverview.studentPerformance,
      staffOverview: this.dashboardOverview.staffOverview,
      attendanceWeeklyOverview: this.attendanceOverview,
      aiInsights: this.aiInsights,
      events: this.events
    };
  }
}

const memoryStore = new MemoryStore();
module.exports = memoryStore;
