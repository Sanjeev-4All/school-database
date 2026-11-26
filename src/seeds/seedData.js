// school_db - Comprehensive Seed Data with Classes from 1st to 12th

const classesData = [
  { sequenceOrder: 1, name: '1st Class', gradeLevel: 'Primary', section: 'A', roomNumber: 'Block A, Rm 101', capacity: 35, enrolledCount: 32, classTeacher: 'Mr. David Adeleke', attendanceRate: 94 },
  { sequenceOrder: 2, name: '2nd Class', gradeLevel: 'Primary', section: 'A', roomNumber: 'Block A, Rm 102', capacity: 35, enrolledCount: 31, classTeacher: 'Mrs. Folake Balogun', attendanceRate: 91 },
  { sequenceOrder: 3, name: '3rd Class', gradeLevel: 'Primary', section: 'A', roomNumber: 'Block A, Rm 201', capacity: 35, enrolledCount: 30, classTeacher: 'Mr. Emmanuel Okonkwo', attendanceRate: 87 },
  { sequenceOrder: 4, name: '4th Class', gradeLevel: 'Primary', section: 'A', roomNumber: 'Block A, Rm 202', capacity: 35, enrolledCount: 33, classTeacher: 'Ms. Ngozi Eze', attendanceRate: 97 },
  { sequenceOrder: 5, name: '5th Class', gradeLevel: 'Primary', section: 'A', roomNumber: 'Block B, Rm 301', capacity: 35, enrolledCount: 28, classTeacher: 'Dr. Ibrahim Sani', attendanceRate: 82 },
  { sequenceOrder: 6, name: '6th Class', gradeLevel: 'Middle School', section: 'A', roomNumber: 'Block B, Rm 302', capacity: 35, enrolledCount: 32, classTeacher: 'Mrs. Chinyere Nwosu', attendanceRate: 94 },
  { sequenceOrder: 7, name: '7th Class', gradeLevel: 'Middle School', section: 'A', roomNumber: 'Block B, Rm 401', capacity: 35, enrolledCount: 31, classTeacher: 'Mr. Patrick Benson', attendanceRate: 91 },
  { sequenceOrder: 8, name: '8th Class', gradeLevel: 'Middle School', section: 'A', roomNumber: 'Exam Wing, Rm 501', capacity: 35, enrolledCount: 29, classTeacher: 'Mrs. Aisha Bello', attendanceRate: 85 },
  { sequenceOrder: 9, name: '9th Class', gradeLevel: 'Secondary', section: 'A', roomNumber: 'Senior Block, Rm 601', capacity: 35, enrolledCount: 30, classTeacher: 'Mr. Segun Adeleke', attendanceRate: 93 },
  { sequenceOrder: 10, name: '10th Class', gradeLevel: 'Secondary', section: 'A', roomNumber: 'Senior Block, Rm 602', capacity: 35, enrolledCount: 28, classTeacher: 'Mrs. Aisha Bello', attendanceRate: 95 },
  { sequenceOrder: 11, name: '11th Class', gradeLevel: 'Senior Secondary', section: 'A', roomNumber: 'Senior Block, Rm 701', capacity: 35, enrolledCount: 27, classTeacher: 'Dr. Marcus Vance', attendanceRate: 92 },
  { sequenceOrder: 12, name: '12th Class', gradeLevel: 'Senior Secondary', section: 'A', roomNumber: 'Senior Block, Rm 702', capacity: 35, enrolledCount: 26, classTeacher: 'Prof. Amina Yusuf', attendanceRate: 96 }
];

const staffData = [
  {
    staffId: 'TCH-001',
    name: 'Dr. Ibrahim Sani',
    email: 'ibrahim.sani@greenfield.edu',
    phone: '+234 803 111 2233',
    role: 'Teaching Staff',
    designation: 'Head of Science Department',
    department: 'Sciences',
    assignedClasses: ['5th Class', '8th Class', '9th Class'],
    assignedSubjects: ['General Science', 'Biology'],
    qualification: 'Ph.D. in Physics Education',
    joiningDate: new Date('2018-09-01'),
    status: 'Active',
    isOnline: true
  },
  {
    staffId: 'TCH-002',
    name: 'Mrs. Aisha Bello',
    email: 'aisha.bello@greenfield.edu',
    phone: '+234 802 222 3344',
    role: 'Teaching Staff',
    designation: 'Senior Mathematics Instructor',
    department: 'Mathematics',
    assignedClasses: ['7th Class', '8th Class', '10th Class'],
    assignedSubjects: ['Mathematics', 'Advanced Math'],
    qualification: 'M.Sc. Applied Mathematics',
    joiningDate: new Date('2019-01-15'),
    status: 'Active',
    isOnline: true
  },
  {
    staffId: 'TCH-003',
    name: 'Mr. Emmanuel Okonkwo',
    email: 'emmanuel.o@greenfield.edu',
    phone: '+234 804 333 4455',
    role: 'Teaching Staff',
    designation: 'Head of Humanities & English',
    department: 'Humanities',
    assignedClasses: ['3rd Class', '6th Class', '9th Class'],
    assignedSubjects: ['English Language', 'Literature'],
    qualification: 'B.A. English & Literary Studies',
    joiningDate: new Date('2020-08-20'),
    status: 'Active',
    isOnline: true
  },
  {
    staffId: 'TCH-004',
    name: 'Mrs. Folake Balogun',
    email: 'folake.b@greenfield.edu',
    phone: '+234 805 444 5566',
    role: 'Teaching Staff',
    designation: 'Creative Arts & Music Coordinator',
    department: 'Arts & Design',
    assignedClasses: ['1st Class', '2nd Class', '4th Class'],
    assignedSubjects: ['Creative Arts', 'Music & Drama'],
    qualification: 'M.A. Fine & Applied Arts',
    joiningDate: new Date('2017-02-10'),
    status: 'Active',
    isOnline: false
  },
  {
    staffId: 'TCH-005',
    name: 'Ms. Ngozi Eze',
    email: 'ngozi.eze@greenfield.edu',
    phone: '+234 809 555 6677',
    role: 'Teaching Staff',
    designation: 'ICT & STEM Lead Instructor',
    department: 'ICT & Robotics',
    assignedClasses: ['4th Class', '5th Class', '7th Class'],
    assignedSubjects: ['Computer Skills', 'Intro to Coding'],
    qualification: 'B.Sc. Computer Science',
    joiningDate: new Date('2022-01-10'),
    status: 'Active',
    isOnline: true
  },
  {
    staffId: 'TCH-006',
    name: 'Dr. Marcus Vance',
    email: 'marcus.vance@greenfield.edu',
    phone: '+234 803 666 7788',
    role: 'Teaching Staff',
    designation: 'Senior Physics Faculty & STEM Research Lead',
    department: 'Sciences',
    assignedClasses: ['11th Class', '12th Class'],
    assignedSubjects: ['Physics & Mechanics', 'Advanced Sciences'],
    qualification: 'Ph.D. in Theoretical Physics',
    joiningDate: new Date('2017-08-15'),
    status: 'Active',
    isOnline: true
  },
  {
    staffId: 'TCH-007',
    name: 'Prof. Amina Yusuf',
    email: 'amina.yusuf@greenfield.edu',
    phone: '+234 802 777 8899',
    role: 'Teaching Staff',
    designation: 'Head of Senior Sciences & Chemistry Faculty',
    department: 'Sciences',
    assignedClasses: ['11th Class', '12th Class'],
    assignedSubjects: ['Chemistry & Organic Compounds', 'Advanced Biology'],
    qualification: 'Ph.D. in Chemical Sciences',
    joiningDate: new Date('2016-01-10'),
    status: 'Active',
    isOnline: true
  },
  {
    staffId: 'TCH-008',
    name: 'Mr. Segun Adeleke',
    email: 'segun.adeleke@greenfield.edu',
    phone: '+234 808 888 1122',
    role: 'Teaching Staff',
    designation: 'Senior Mathematics Coach & Secondary Form Teacher',
    department: 'Mathematics',
    assignedClasses: ['9th Class', '10th Class'],
    assignedSubjects: ['Further & Advanced Mathematics', 'Mathematics'],
    qualification: 'M.Sc. Mathematics Education',
    joiningDate: new Date('2019-09-01'),
    status: 'Active',
    isOnline: true
  },
  {
    staffId: 'STF-007',
    name: 'Kelechi Amadi',
    email: 'kelechi.amadi@greenfield.edu',
    phone: '+234 806 777 8899',
    role: 'Non-Teaching',
    designation: 'Chief Bursar & Finance Manager',
    department: 'Finance & Accounts',
    assignedClasses: [],
    assignedSubjects: ['Financial Accounting'],
    qualification: 'FCA, B.Sc. Accounting',
    joiningDate: new Date('2016-04-12'),
    status: 'Active',
    isOnline: true
  },
  {
    staffId: 'STF-008',
    name: 'Grace Danjuma',
    email: 'grace.danjuma@greenfield.edu',
    phone: '+234 807 888 9900',
    role: 'Non-Teaching',
    designation: 'School Registrar & Admissions Officer',
    department: 'Administration',
    assignedClasses: [],
    assignedSubjects: [],
    qualification: 'B.Sc. Public Administration',
    joiningDate: new Date('2018-11-01'),
    status: 'Active',
    isOnline: true
  },
  {
    staffId: 'STF-009',
    name: 'Moses Yakubu',
    email: 'moses.yakubu@greenfield.edu',
    phone: '+234 813 999 0011',
    role: 'Support Staff',
    designation: 'Head of Facilities & Transport',
    department: 'Operations',
    assignedClasses: [],
    assignedSubjects: [],
    qualification: 'ND Mechanical Engineering',
    joiningDate: new Date('2019-06-25'),
    status: 'Active',
    isOnline: false
  },
  {
    staffId: 'STF-010',
    name: 'Sarah Oladipo',
    email: 'sarah.oladipo@greenfield.edu',
    phone: '+234 815 000 1122',
    role: 'Support Staff',
    designation: 'Chief Medical Officer / School Nurse',
    department: 'Health Services',
    assignedClasses: [],
    assignedSubjects: [],
    qualification: 'RN, RM Nursing',
    joiningDate: new Date('2020-03-14'),
    status: 'Active',
    isOnline: true
  }
];

const studentsData = [
  {
    studentId: 'STU-2024-001',
    firstName: 'Amara',
    lastName: 'Kalu',
    gender: 'Female',
    dateOfBirth: new Date('2016-04-14'),
    email: 'amara.kalu@student.greenfield.edu',
    phone: '+234 803 100 2001',
    class: '1st Class',
    rollNumber: 1,
    guardian: { name: 'Chief Chike Kalu', relation: 'Father', phone: '+234 803 999 1001', email: 'chike.kalu@gmail.com' },
    address: { street: '14 Admiralty Way, Lekki', city: 'Lagos', state: 'Lagos' },
    bloodGroup: 'O+',
    status: 'Active',
    attendanceRate: 98.2,
    performanceCategory: 'Excellent',
    feeStatus: 'Paid',
    admissionDate: new Date('2024-09-10')
  },
  {
    studentId: 'STU-2024-002',
    firstName: 'Tunde',
    lastName: 'Bakare',
    gender: 'Male',
    dateOfBirth: new Date('2015-11-22'),
    email: 'tunde.b@student.greenfield.edu',
    phone: '+234 803 100 2002',
    class: '2nd Class',
    rollNumber: 2,
    guardian: { name: 'Mrs. Toyin Bakare', relation: 'Mother', phone: '+234 803 999 1002', email: 'toyin.bakare@yahoo.com' },
    address: { street: '8 Victoria Garden City', city: 'Lagos', state: 'Lagos' },
    bloodGroup: 'A+',
    status: 'Active',
    attendanceRate: 94.5,
    performanceCategory: 'Excellent',
    feeStatus: 'Paid',
    admissionDate: new Date('2023-09-10')
  },
  {
    studentId: 'STU-2024-003',
    firstName: 'Zainab',
    lastName: 'Abubakar',
    gender: 'Female',
    dateOfBirth: new Date('2014-02-18'),
    email: 'zainab.a@student.greenfield.edu',
    phone: '+234 803 100 2003',
    class: '3rd Class',
    rollNumber: 3,
    guardian: { name: 'Alhaji Musa Abubakar', relation: 'Father', phone: '+234 803 999 1003', email: 'musa.abubakar@outlook.com' },
    address: { street: '22 Crescent Blvd, Ikeja GRA', city: 'Lagos', state: 'Lagos' },
    bloodGroup: 'B+',
    status: 'Active',
    attendanceRate: 92.0,
    performanceCategory: 'Good',
    feeStatus: 'Paid',
    admissionDate: new Date('2022-09-12')
  },
  {
    studentId: 'STU-2024-004',
    firstName: 'Chinedu',
    lastName: 'Okafor',
    gender: 'Male',
    dateOfBirth: new Date('2013-06-05'),
    email: 'chinedu.o@student.greenfield.edu',
    phone: '+234 803 100 2004',
    class: '4th Class',
    rollNumber: 4,
    guardian: { name: 'Dr. Obinna Okafor', relation: 'Father', phone: '+234 803 999 1004', email: 'obinna.okafor@clinic.com' },
    address: { street: '5 Parkview Estate, Ikoyi', city: 'Lagos', state: 'Lagos' },
    bloodGroup: 'O+',
    status: 'Active',
    attendanceRate: 74.0,
    performanceCategory: 'Below Average',
    feeStatus: 'Partial',
    admissionDate: new Date('2021-09-15')
  },
  {
    studentId: 'STU-2024-005',
    firstName: 'Fatima',
    lastName: 'Mohammed',
    gender: 'Female',
    dateOfBirth: new Date('2012-08-30'),
    email: 'fatima.m@student.greenfield.edu',
    phone: '+234 803 100 2005',
    class: '5th Class',
    rollNumber: 5,
    guardian: { name: 'Hajiya Amina Mohammed', relation: 'Mother', phone: '+234 803 999 1005', email: 'amina.m@gmail.com' },
    address: { street: '11 Bourdillon Rd, Ikoyi', city: 'Lagos', state: 'Lagos' },
    bloodGroup: 'AB+',
    status: 'Active',
    attendanceRate: 96.0,
    performanceCategory: 'Good',
    feeStatus: 'Paid',
    admissionDate: new Date('2020-09-15')
  },
  {
    studentId: 'STU-2024-006',
    firstName: 'Ifeanyi',
    lastName: 'Ugwu',
    gender: 'Male',
    dateOfBirth: new Date('2011-03-12'),
    email: 'ifeanyi.u@student.greenfield.edu',
    phone: '+234 803 100 2006',
    class: '6th Class',
    rollNumber: 6,
    guardian: { name: 'Mr. Kenneth Ugwu', relation: 'Father', phone: '+234 803 999 1006', email: 'kenneth.ugwu@law.ng' },
    address: { street: '3 Oniru Estate, Victoria Island', city: 'Lagos', state: 'Lagos' },
    bloodGroup: 'O+',
    status: 'Active',
    attendanceRate: 97.5,
    performanceCategory: 'Excellent',
    feeStatus: 'Paid',
    admissionDate: new Date('2019-09-15')
  },
  {
    studentId: 'STU-2024-007',
    firstName: 'Bolanle',
    lastName: 'Adeyemi',
    gender: 'Female',
    dateOfBirth: new Date('2010-07-24'),
    email: 'bolanle.a@student.greenfield.edu',
    phone: '+234 803 100 2007',
    class: '7th Class',
    rollNumber: 7,
    guardian: { name: 'Engr. Sola Adeyemi', relation: 'Father', phone: '+234 803 999 1007', email: 'sola.adeyemi@oiltech.com' },
    address: { street: '19 Banana Island Rd', city: 'Lagos', state: 'Lagos' },
    bloodGroup: 'A+',
    status: 'Active',
    attendanceRate: 86.0,
    performanceCategory: 'Average',
    feeStatus: 'Overdue',
    admissionDate: new Date('2018-09-15')
  },
  {
    studentId: 'STU-2024-008',
    firstName: 'David',
    lastName: 'Effiong',
    gender: 'Male',
    dateOfBirth: new Date('2009-05-19'),
    email: 'david.effiong@student.greenfield.edu',
    phone: '+234 803 100 2008',
    class: '8th Class',
    rollNumber: 8,
    guardian: { name: 'Mrs. Mary Effiong', relation: 'Mother', phone: '+234 803 999 1008', email: 'mary.effiong@gov.ng' },
    address: { street: '4 Glover Rd, Ikoyi', city: 'Lagos', state: 'Lagos' },
    bloodGroup: 'B-',
    status: 'Active',
    attendanceRate: 95.0,
    performanceCategory: 'Good',
    feeStatus: 'Paid',
    admissionDate: new Date('2017-09-10')
  },
  {
    studentId: 'STU-2024-009',
    firstName: 'Khadijah',
    lastName: 'Gwandu',
    gender: 'Female',
    dateOfBirth: new Date('2016-09-02'),
    email: 'khadijah.g@student.greenfield.edu',
    phone: '+234 803 100 2009',
    class: '1st Class',
    rollNumber: 9,
    guardian: { name: 'Barr. Kabir Gwandu', relation: 'Father', phone: '+234 803 999 1009', email: 'kabir.gwandu@legal.ng' },
    address: { street: '7 Magodo Phase 2', city: 'Lagos', state: 'Lagos' },
    bloodGroup: 'O+',
    status: 'Active',
    attendanceRate: 92.5,
    performanceCategory: 'Good',
    feeStatus: 'Paid',
    admissionDate: new Date('2024-09-10')
  },
  {
    studentId: 'STU-2024-010',
    firstName: 'Samuel',
    lastName: 'Nwankwo',
    gender: 'Male',
    dateOfBirth: new Date('2015-12-11'),
    email: 'samuel.nwankwo@student.greenfield.edu',
    phone: '+234 803 100 2010',
    class: '2nd Class',
    rollNumber: 10,
    guardian: { name: 'Mr. Felix Nwankwo', relation: 'Father', phone: '+234 803 999 1010', email: 'felix.nwankwo@trade.com' },
    address: { street: '16 Ogudu GRA', city: 'Lagos', state: 'Lagos' },
    bloodGroup: 'A-',
    status: 'Active',
    attendanceRate: 68.0,
    performanceCategory: 'Poor',
    feeStatus: 'Pending',
    admissionDate: new Date('2023-09-12')
  },
  {
    studentId: 'STU-2024-011',
    firstName: 'Tariq',
    lastName: 'Mansur',
    gender: 'Male',
    dateOfBirth: new Date('2008-04-12'),
    email: 'tariq.mansur@student.greenfield.edu',
    phone: '+234 803 100 2011',
    class: '9th Class',
    rollNumber: 11,
    guardian: { name: 'Alhaji Mansur Bello', relation: 'Father', phone: '+234 803 999 1011', email: 'mansur.bello@telecom.ng' },
    address: { street: '24 Alexander Avenue, Ikoyi', city: 'Lagos', state: 'Lagos' },
    bloodGroup: 'B+',
    status: 'Active',
    attendanceRate: 93.5,
    performanceCategory: 'Excellent',
    feeStatus: 'Paid',
    admissionDate: new Date('2024-09-05')
  },
  {
    studentId: 'STU-2024-012',
    firstName: 'Chioma',
    lastName: 'Dike',
    gender: 'Female',
    dateOfBirth: new Date('2007-09-15'),
    email: 'chioma.dike@student.greenfield.edu',
    phone: '+234 803 100 2012',
    class: '10th Class',
    rollNumber: 12,
    guardian: { name: 'Barr. Okey Dike', relation: 'Father', phone: '+234 803 999 1012', email: 'okey.dike@chambers.com' },
    address: { street: '18 Queens Drive, Ikoyi', city: 'Lagos', state: 'Lagos' },
    bloodGroup: 'A+',
    status: 'Active',
    attendanceRate: 96.0,
    performanceCategory: 'Excellent',
    feeStatus: 'Paid',
    admissionDate: new Date('2023-09-10')
  },
  {
    studentId: 'STU-2024-013',
    firstName: 'Olumide',
    lastName: 'Adeleke',
    gender: 'Male',
    dateOfBirth: new Date('2006-03-20'),
    email: 'olumide.adeleke@student.greenfield.edu',
    phone: '+234 803 100 2013',
    class: '11th Class',
    rollNumber: 13,
    guardian: { name: 'Mrs. Funmilayo Adeleke', relation: 'Mother', phone: '+234 803 999 1013', email: 'funmi.adeleke@bank.com' },
    address: { street: '7 Victoria Island Annex', city: 'Lagos', state: 'Lagos' },
    bloodGroup: 'O+',
    status: 'Active',
    attendanceRate: 91.5,
    performanceCategory: 'Good',
    feeStatus: 'Paid',
    admissionDate: new Date('2022-09-12')
  },
  {
    studentId: 'STU-2024-014',
    firstName: 'Zainab',
    lastName: 'Al-Hassan',
    gender: 'Female',
    dateOfBirth: new Date('2006-11-04'),
    email: 'zainab.alhassan@student.greenfield.edu',
    phone: '+234 803 100 2014',
    class: '11th Class',
    rollNumber: 14,
    guardian: { name: 'Mallam Idris Al-Hassan', relation: 'Father', phone: '+234 803 999 1014', email: 'idris.alhassan@trade.ng' },
    address: { street: '9 Magodo Waterfront', city: 'Lagos', state: 'Lagos' },
    bloodGroup: 'B+',
    status: 'Active',
    attendanceRate: 88.0,
    performanceCategory: 'Good',
    feeStatus: 'Partial',
    admissionDate: new Date('2022-09-12')
  },
  {
    studentId: 'STU-2024-015',
    firstName: 'Emmanuel',
    lastName: 'Bassey',
    gender: 'Male',
    dateOfBirth: new Date('2005-02-18'),
    email: 'emmanuel.bassey@student.greenfield.edu',
    phone: '+234 803 100 2015',
    class: '12th Class',
    rollNumber: 15,
    guardian: { name: 'Arch. Ete Bassey', relation: 'Father', phone: '+234 803 999 1015', email: 'ete.bassey@studio.ng' },
    address: { street: '10 Osborne Foreshore, Ikoyi', city: 'Lagos', state: 'Lagos' },
    bloodGroup: 'AB+',
    status: 'Active',
    attendanceRate: 97.2,
    performanceCategory: 'Excellent',
    feeStatus: 'Paid',
    admissionDate: new Date('2021-09-10')
  },
  {
    studentId: 'STU-2024-016',
    firstName: 'Kemi',
    lastName: 'Oshodi',
    gender: 'Female',
    dateOfBirth: new Date('2005-07-28'),
    email: 'kemi.oshodi@student.greenfield.edu',
    phone: '+234 803 100 2016',
    class: '12th Class',
    rollNumber: 16,
    guardian: { name: 'Chief (Mrs.) Bimbo Oshodi', relation: 'Mother', phone: '+234 803 999 1016', email: 'bimbo.oshodi@capital.com' },
    address: { street: '32 Glover Road, Ikoyi', city: 'Lagos', state: 'Lagos' },
    bloodGroup: 'O-',
    status: 'Active',
    attendanceRate: 94.0,
    performanceCategory: 'Good',
    feeStatus: 'Paid',
    admissionDate: new Date('2021-09-10')
  }
];

const attendanceWeeklyOverview = [
  { sequenceOrder: 1, className: '1st Class', days: ['present', 'present', 'present', 'late', 'present', 'nodata'], present: 32, late: 2, absent: 1, rate: 94 },
  { sequenceOrder: 2, className: '2nd Class', days: ['present', 'present', 'present', 'late', 'present', 'nodata'], present: 31, late: 3, absent: 1, rate: 91 },
  { sequenceOrder: 3, className: '3rd Class', days: ['present', 'present', 'present', 'absent', 'present', 'nodata'], present: 30, late: 1, absent: 4, rate: 87 },
  { sequenceOrder: 4, className: '4th Class', days: ['present', 'present', 'present', 'present', 'present', 'nodata'], present: 33, late: 2, absent: 0, rate: 97 },
  { sequenceOrder: 5, className: '5th Class', days: ['present', 'late', 'present', 'absent', 'present', 'nodata'], present: 28, late: 4, absent: 3, rate: 82 },
  { sequenceOrder: 6, className: '6th Class', days: ['present', 'present', 'present', 'present', 'present', 'nodata'], present: 32, late: 1, absent: 2, rate: 94 },
  { sequenceOrder: 7, className: '7th Class', days: ['present', 'present', 'late', 'present', 'present', 'nodata'], present: 31, late: 3, absent: 1, rate: 91 },
  { sequenceOrder: 8, className: '8th Class', days: ['present', 'present', 'present', 'absent', 'present', 'nodata'], present: 29, late: 2, absent: 4, rate: 85 },
  { sequenceOrder: 9, className: '9th Class', days: ['present', 'present', 'present', 'present', 'present', 'nodata'], present: 30, late: 2, absent: 1, rate: 93 },
  { sequenceOrder: 10, className: '10th Class', days: ['present', 'present', 'present', 'present', 'present', 'nodata'], present: 28, late: 1, absent: 1, rate: 95 },
  { sequenceOrder: 11, className: '11th Class', days: ['present', 'present', 'late', 'present', 'present', 'nodata'], present: 27, late: 3, absent: 1, rate: 92 },
  { sequenceOrder: 12, className: '12th Class', days: ['present', 'present', 'present', 'present', 'present', 'nodata'], present: 26, late: 1, absent: 0, rate: 96 }
];

const feeInvoicesData = [
  {
    invoiceNumber: 'INV-2024-001',
    studentId: 'STU-2024-001',
    studentName: 'Amara Kalu',
    className: '1st Class',
    feeType: 'Tuition Fee',
    totalAmount: 450000,
    paidAmount: 450000,
    balance: 0,
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
    dueDate: new Date('2025-05-15'),
    paidDate: new Date('2025-04-10')
  },
  {
    invoiceNumber: 'INV-2024-002',
    studentId: 'STU-2024-002',
    studentName: 'Tunde Bakare',
    className: '2nd Class',
    feeType: 'Tuition Fee',
    totalAmount: 450000,
    paidAmount: 450000,
    balance: 0,
    status: 'Paid',
    paymentMethod: 'Credit Card',
    dueDate: new Date('2025-05-15'),
    paidDate: new Date('2025-04-12')
  },
  {
    invoiceNumber: 'INV-2024-004',
    studentId: 'STU-2024-004',
    studentName: 'Chinedu Okafor',
    className: '4th Class',
    feeType: 'Tuition Fee',
    totalAmount: 400000,
    paidAmount: 250000,
    balance: 150000,
    status: 'Partial',
    paymentMethod: 'Bank Transfer',
    dueDate: new Date('2025-05-15'),
    paidDate: new Date('2025-04-20')
  },
  {
    invoiceNumber: 'INV-2024-007',
    studentId: 'STU-2024-007',
    studentName: 'Bolanle Adeyemi',
    className: '7th Class',
    feeType: 'Tuition Fee',
    totalAmount: 380000,
    paidAmount: 0,
    balance: 380000,
    status: 'Overdue',
    paymentMethod: 'Pending',
    dueDate: new Date('2025-04-30')
  },
  {
    invoiceNumber: 'INV-2024-010',
    studentId: 'STU-2024-010',
    studentName: 'Samuel Nwankwo',
    className: '2nd Class',
    feeType: 'Tuition Fee',
    totalAmount: 420000,
    paidAmount: 0,
    balance: 420000,
    status: 'Pending',
    paymentMethod: 'Pending',
    dueDate: new Date('2025-05-30')
  },
  {
    invoiceNumber: 'INV-2024-011',
    studentId: 'STU-2024-011',
    studentName: 'Tariq Mansur',
    className: '9th Class',
    feeType: 'Tuition Fee',
    totalAmount: 520000,
    paidAmount: 520000,
    balance: 0,
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
    dueDate: new Date('2025-05-15'),
    paidDate: new Date('2025-04-05')
  },
  {
    invoiceNumber: 'INV-2024-012',
    studentId: 'STU-2024-012',
    studentName: 'Chioma Dike',
    className: '10th Class',
    feeType: 'Examination Fee',
    totalAmount: 550000,
    paidAmount: 550000,
    balance: 0,
    status: 'Paid',
    paymentMethod: 'Online Gateway',
    dueDate: new Date('2025-05-15'),
    paidDate: new Date('2025-04-02')
  },
  {
    invoiceNumber: 'INV-2024-015',
    studentId: 'STU-2024-015',
    studentName: 'Emmanuel Bassey',
    className: '12th Class',
    feeType: 'Tuition Fee',
    totalAmount: 600000,
    paidAmount: 600000,
    balance: 0,
    status: 'Paid',
    paymentMethod: 'Bank Transfer',
    dueDate: new Date('2025-05-15'),
    paidDate: new Date('2025-03-28')
  }
];

const eventsData = [
  {
    title: '12th Class Pre-University & Board Examination',
    type: 'Exam',
    date: new Date('2025-05-25T08:30:00Z'),
    endDate: new Date('2025-06-05T15:00:00Z'),
    time: 'May 25 – June 05, 2025',
    targetAudience: 'Students',
    description: 'Senior Secondary School Certificate Examination (SSCE) & Pre-University entrance preparation.',
    priority: 'High'
  },
  {
    title: '10th Class Junior Board Assessment',
    type: 'Exam',
    date: new Date('2025-05-20T08:30:00Z'),
    endDate: new Date('2025-05-29T14:00:00Z'),
    time: 'May 20 – May 29, 2025',
    targetAudience: 'Students',
    description: 'National secondary school certification assessment for 10th Class pupils.',
    priority: 'High'
  },
  {
    title: 'PTA General Assembly & Academic Review',
    type: 'Meeting',
    date: new Date('2025-05-28T10:00:00Z'),
    time: 'May 28, 2025 • 10:00 AM',
    targetAudience: 'Parents',
    description: 'Parent-Teacher Association review covering academic milestones from 1st to 12th Classes.',
    priority: 'High'
  },
  {
    title: "Children's Day & STEM Exhibition",
    type: 'Celebration',
    date: new Date('2025-06-02T09:00:00Z'),
    time: 'June 2, 2025',
    targetAudience: 'All',
    description: 'Annual cultural festival, robotics demos, and inter-class science projects across 1st to 12th classes.',
    priority: 'Medium'
  }
];

const examsData = [
  {
    title: 'Primary Assessment Examination',
    term: 'First Term',
    academicYear: '2024/2025',
    targetClasses: ['1st Class', '2nd Class', '3rd Class', '4th Class', '5th Class'],
    startDate: new Date('2024-11-16T08:30:00Z'),
    endDate: new Date('2024-11-27T13:00:00Z'),
    status: 'Scheduled',
    subjects: [
      { name: 'Mathematics', date: new Date('2024-11-16T08:30:00Z'), duration: '2 hours', maxScore: 100 },
      { name: 'English Language', date: new Date('2024-11-17T08:30:00Z'), duration: '2 hours', maxScore: 100 },
      { name: 'Basic Science', date: new Date('2024-11-18T08:30:00Z'), duration: '1 hour 30 minutes', maxScore: 100 }
    ],
    description: 'First-term continuous assessment for primary grades.'
  },
  {
    title: 'Middle School Evaluation Assessment',
    term: 'First Term',
    academicYear: '2024/2025',
    targetClasses: ['6th Class', '7th Class', '8th Class'],
    startDate: new Date('2024-11-16T08:30:00Z'),
    endDate: new Date('2024-11-27T13:00:00Z'),
    status: 'Scheduled',
    subjects: [
      { name: 'Mathematics', date: new Date('2024-11-16T08:30:00Z'), duration: '2 hours', maxScore: 100 },
      { name: 'English Language', date: new Date('2024-11-17T08:30:00Z'), duration: '2 hours', maxScore: 100 },
      { name: 'General Science', date: new Date('2024-11-18T08:30:00Z'), duration: '2 hours', maxScore: 100 },
      { name: 'Social Studies', date: new Date('2024-11-19T08:30:00Z'), duration: '1 hour 30 minutes', maxScore: 100 }
    ],
    description: 'First-term assessment for middle-school grades.'
  },
  {
    title: '10th Class Junior Secondary Certificate Mock',
    term: 'First Term',
    academicYear: '2024/2025',
    targetClasses: ['9th Class', '10th Class'],
    startDate: new Date('2024-11-20T08:30:00Z'),
    endDate: new Date('2024-11-30T14:00:00Z'),
    status: 'Scheduled',
    subjects: [
      { name: 'Mathematics', date: new Date('2024-11-20T08:30:00Z'), duration: '2 hours 30 min', maxScore: 100 },
      { name: 'English Language', date: new Date('2024-11-21T08:30:00Z'), duration: '2 hours 30 min', maxScore: 100 },
      { name: 'Integrated Sciences', date: new Date('2024-11-22T08:30:00Z'), duration: '2 hours', maxScore: 100 },
      { name: 'Economics & Business', date: new Date('2024-11-23T08:30:00Z'), duration: '2 hours', maxScore: 100 }
    ],
    description: 'Comprehensive secondary school diagnostic mock assessment.'
  },
  {
    title: '12th Class Senior Secondary & Pre-University Mock',
    term: 'First Term',
    academicYear: '2024/2025',
    targetClasses: ['11th Class', '12th Class'],
    startDate: new Date('2024-11-22T08:30:00Z'),
    endDate: new Date('2024-12-05T15:00:00Z'),
    status: 'Scheduled',
    subjects: [
      { name: 'Further Mathematics', date: new Date('2024-11-22T08:30:00Z'), duration: '3 hours', maxScore: 100 },
      { name: 'Physics & Mechanics', date: new Date('2024-11-24T08:30:00Z'), duration: '3 hours', maxScore: 100 },
      { name: 'Chemistry & Organic Compounds', date: new Date('2024-11-26T08:30:00Z'), duration: '3 hours', maxScore: 100 },
      { name: 'English Literature', date: new Date('2024-11-28T08:30:00Z'), duration: '2 hours 30 min', maxScore: 100 },
      { name: 'Financial Accounting', date: new Date('2024-11-30T08:30:00Z'), duration: '2 hours 30 min', maxScore: 100 }
    ],
    description: 'Official university preparatory and terminal certification trials.'
  }
];

const libraryBooksData = [
  {
    title: 'The Abuja Adventure',
    author: 'Bisi Adjapon',
    isbn: '9789785432101',
    category: 'Literature',
    totalCopies: 12,
    availableCopies: 8,
    shelfLocation: 'A-01'
  },
  {
    title: 'Basic Mathematics for Primary Schools',
    author: 'A. O. Akinyemi',
    isbn: '9789785432102',
    category: 'Mathematics',
    totalCopies: 20,
    availableCopies: 14,
    shelfLocation: 'B-03'
  },
  {
    title: 'Essential English Grammar',
    author: 'Michael Swan',
    isbn: '9789785432103',
    category: 'Language',
    totalCopies: 16,
    availableCopies: 11,
    shelfLocation: 'B-05'
  },
  {
    title: 'The Young Scientist',
    author: 'Niyi Ojuolape',
    isbn: '9789785432104',
    category: 'Science',
    totalCopies: 10,
    availableCopies: 3,
    shelfLocation: 'C-02'
  },
  {
    title: 'University Physics with Modern Physics',
    author: 'Hugh D. Young & Roger A. Freedman',
    isbn: '9789785432107',
    category: 'Science',
    totalCopies: 15,
    availableCopies: 12,
    shelfLocation: 'C-04'
  },
  {
    title: 'Calculus: Early Transcendentals',
    author: 'James Stewart',
    isbn: '9789785432108',
    category: 'Mathematics',
    totalCopies: 18,
    availableCopies: 15,
    shelfLocation: 'C-05'
  },
  {
    title: 'Organic Chemistry Fundamentals',
    author: 'Paula Yurkanis Bruice',
    isbn: '9789785432109',
    category: 'Science',
    totalCopies: 14,
    availableCopies: 10,
    shelfLocation: 'C-07'
  },
  {
    title: 'Principles of Microeconomics & Macroeconomics',
    author: 'N. Gregory Mankiw',
    isbn: '9789785432110',
    category: 'Social Sciences',
    totalCopies: 12,
    availableCopies: 9,
    shelfLocation: 'D-03'
  },
  {
    title: 'Coding for Young Learners & AI Basics',
    author: 'Ada Nduka Oyom',
    isbn: '9789785432106',
    category: 'Technology',
    totalCopies: 15,
    availableCopies: 9,
    shelfLocation: 'D-01'
  }
];

const aiInsights = [
  {
    id: 1,
    title: '23 students are at risk',
    subtitle: 'Due to low attendance (mostly in 4th & 5th Class)',
    type: 'warning',
    icon: 'clock',
    linkText: 'View at-risk students'
  },
  {
    id: 2,
    title: 'Senior Examination Readiness: 100%',
    subtitle: '10th & 12th Class pre-board schedules synchronized',
    type: 'calendar',
    icon: 'calendar',
    linkText: 'View timetable'
  },
  {
    id: 3,
    title: 'Curriculum coverage is on track',
    subtitle: 'All 12 classes tracking 84% syllabus completion',
    type: 'staff',
    icon: 'folder',
    linkText: 'Review curriculum'
  },
  {
    id: 4,
    title: 'Fee collection is at 84%',
    subtitle: '₦12.4M of ₦14.8M collected this term',
    type: 'finance',
    icon: 'wallet',
    linkText: 'Review ledger'
  }
];

const dashboardOverview = {
  kpis: {
    totalStudents: { value: 1284, change: '+12 this term', positive: true },
    attendanceRate: { value: '96.4%', change: '↑ 2.7% vs last term', positive: true },
    feeCollection: { value: '84%', detail: '₦12.4M of ₦14.8M', progress: 84 },
    totalStaff: { value: 86, onlineCount: 48, status: '48 online' },
    activeClasses: { value: '12 Classes', detail: '1st - 12th Class sequence' }
  },
  feeSummary: {
    collectedFormatted: '₦12,400,000',
    totalExpectedFormatted: '₦14,800,000',
    balanceFormatted: '₦2,400,000',
    collectedAmount: 12400000,
    expectedAmount: 14800000,
    balanceAmount: 2400000,
    ratePercentage: 84,
    weeklyBars: [
      { week: 'Week 1', heightPercent: 40, amount: '₦2.8M' },
      { week: 'Week 2', heightPercent: 65, amount: '₦4.5M' },
      { week: 'Week 3', heightPercent: 85, amount: '₦6.1M' },
      { week: 'Week 4', heightPercent: 100, amount: '₦7.2M' }
    ]
  },
  studentPerformance: {
    average: 74,
    breakdown: [
      { label: 'Excellent', percentage: 32, color: '#38A169' },
      { label: 'Good', percentage: 35, color: '#48BB78' },
      { label: 'Average', percentage: 22, color: '#ECC94B' },
      { label: 'Below Average', percentage: 8, color: '#ED8936' },
      { label: 'Poor', percentage: 3, color: '#E53E3E' }
    ]
  },
  staffOverview: {
    total: 86,
    breakdown: [
      { label: 'Teaching Staff', count: 58, percentage: 67, color: '#3182CE' },
      { label: 'Non-Teaching', count: 20, percentage: 23, color: '#38A169' },
      { label: 'Support Staff', count: 8, percentage: 10, color: '#9F7AEA' }
    ]
  },
  attendanceWeeklyOverview,
  aiInsights,
  events: eventsData
};

const subjectsData = [
  { code: 'MATH-101', name: 'Mathematics', department: 'Mathematics', targetClasses: ['1st Class', '2nd Class', '3rd Class', '4th Class', '5th Class', '6th Class', '7th Class', '8th Class', '9th Class', '10th Class', '11th Class', '12th Class'], teacherName: 'Mrs. Aisha Bello', weeklyPeriods: 6, syllabusProgress: 85, description: 'Core numeracy, algebra, geometry and problem solving across all levels.' },
  { code: 'ENG-101', name: 'English Language & Reading', department: 'Humanities', targetClasses: ['1st Class', '2nd Class', '3rd Class', '4th Class', '5th Class', '6th Class', '7th Class', '8th Class', '9th Class', '10th Class', '11th Class', '12th Class'], teacherName: 'Mr. Emmanuel Okonkwo', weeklyPeriods: 6, syllabusProgress: 82, description: 'Grammar, vocabulary, creative writing, and literature.' },
  { code: 'SCI-101', name: 'General Science', department: 'Sciences', targetClasses: ['1st Class', '2nd Class', '3rd Class', '4th Class', '5th Class', '6th Class', '7th Class', '8th Class'], teacherName: 'Dr. Ibrahim Sani', weeklyPeriods: 5, syllabusProgress: 88, description: 'Living organisms, physical world, matter and environment for junior years.' },
  { code: 'SOC-101', name: 'Social Studies & Civic Education', department: 'Social Sciences', targetClasses: ['1st Class', '2nd Class', '3rd Class', '4th Class', '5th Class', '6th Class', '7th Class', '8th Class'], teacherName: 'Mr. David Adeleke', weeklyPeriods: 4, syllabusProgress: 75, description: 'History, citizenship, geography and cultural heritage.' },
  { code: 'ICT-101', name: 'Computer Studies & Robotics', department: 'ICT & Robotics', targetClasses: ['1st Class', '2nd Class', '3rd Class', '4th Class', '5th Class', '6th Class', '7th Class', '8th Class', '9th Class', '10th Class', '11th Class', '12th Class'], teacherName: 'Ms. Ngozi Eze', weeklyPeriods: 4, syllabusProgress: 92, description: 'Digital literacy, keyboard skills, Python algorithms, web basics and AI fundamentals.' },
  { code: 'PHY-201', name: 'Physics & Mechanics', department: 'Sciences', targetClasses: ['9th Class', '10th Class', '11th Class', '12th Class'], teacherName: 'Dr. Marcus Vance', weeklyPeriods: 5, syllabusProgress: 86, description: 'Newtonian mechanics, thermodynamics, wave optics, electricity, and nuclear physics.' },
  { code: 'CHM-201', name: 'Chemistry & Organic Compounds', department: 'Sciences', targetClasses: ['9th Class', '10th Class', '11th Class', '12th Class'], teacherName: 'Prof. Amina Yusuf', weeklyPeriods: 5, syllabusProgress: 84, description: 'Atomic structure, stoichiometry, chemical equilibrium, and organic chemistry.' },
  { code: 'BIO-201', name: 'Advanced Biology & Genetics', department: 'Sciences', targetClasses: ['9th Class', '10th Class', '11th Class', '12th Class'], teacherName: 'Dr. Ibrahim Sani', weeklyPeriods: 5, syllabusProgress: 88, description: 'Cell biology, genetics, human anatomy, physiology, and ecosystems.' },
  { code: 'MTH-201', name: 'Further & Advanced Mathematics', department: 'Mathematics', targetClasses: ['9th Class', '10th Class', '11th Class', '12th Class'], teacherName: 'Mr. Segun Adeleke', weeklyPeriods: 6, syllabusProgress: 89, description: 'Differential & integral calculus, vectors, trigonometry, matrices, and statistics.' },
  { code: 'ACC-201', name: 'Financial Accounting & Bookkeeping', department: 'Commerce', targetClasses: ['10th Class', '11th Class', '12th Class'], teacherName: 'Kelechi Amadi', weeklyPeriods: 4, syllabusProgress: 76, description: 'Ledgers, double entry, bank reconciliations, trial balances, and corporate accounts.' },
  { code: 'ECO-201', name: 'Macro & Micro Economics', department: 'Social Sciences', targetClasses: ['10th Class', '11th Class', '12th Class'], teacherName: 'Mr. Patrick Benson', weeklyPeriods: 4, syllabusProgress: 80, description: 'Market structures, price theory, national income, monetary policy, and world trade.' },
  { code: 'LIT-201', name: 'World Literature & Drama', department: 'Humanities', targetClasses: ['9th Class', '10th Class', '11th Class', '12th Class'], teacherName: 'Mr. Emmanuel Okonkwo', weeklyPeriods: 4, syllabusProgress: 83, description: 'African, British, and global prose, Shakespearean drama, and critical literary essay writing.' },
  { code: 'PHE-101', name: 'Physical & Health Education', department: 'Health Sciences', targetClasses: ['1st Class', '2nd Class', '3rd Class', '4th Class', '5th Class', '6th Class', '7th Class', '8th Class', '9th Class', '10th Class'], teacherName: 'Mr. Moses Yakubu', weeklyPeriods: 2, syllabusProgress: 95, description: 'Personal hygiene, athletics, team sports, and fitness.' },
  { code: 'FRE-101', name: 'French Language', department: 'Languages', targetClasses: ['3rd Class', '4th Class', '5th Class', '6th Class', '7th Class', '8th Class', '9th Class', '10th Class'], teacherName: 'Mme. Claire Dubois', weeklyPeriods: 3, syllabusProgress: 72, description: 'French conversation, grammar, listening comprehension, and Francophone culture.' }
];

const transportData = [
  {
    routeNumber: 'ROUTE-01',
    routeName: 'Lekki Phase 1 & Ikate Corridor',
    vehicleNumber: 'BUS-01 (KJA-423-LK)',
    driverName: 'Mr. Aliyu Mohammed',
    driverPhone: '+234 803 222 1101',
    capacity: 35,
    enrolledStudentsCount: 28,
    monthlyFee: 30000,
    status: 'Active',
    stops: ['Admiralty Way Junction', 'Freedom Way Roundabout', 'Elegushi Beach Road Stop', 'School Campus Gate A']
  },
  {
    routeNumber: 'ROUTE-02',
    routeName: 'Ikeja GRA & Maryland Loop',
    vehicleNumber: 'BUS-02 (IKJ-981-AB)',
    driverName: 'Mr. Babatunde Jinadu',
    driverPhone: '+234 802 333 4402',
    capacity: 35,
    enrolledStudentsCount: 31,
    monthlyFee: 35000,
    status: 'Active',
    stops: ['Isaac John Street Entrance', 'Maryland Mall Bus Stop', 'Anthony Village Flyover', 'School Campus Gate A']
  },
  {
    routeNumber: 'ROUTE-03',
    routeName: 'Victoria Island & Ikoyi Circuit',
    vehicleNumber: 'BUS-03 (APP-112-VI)',
    driverName: 'Mr. Chukwuma Obi',
    driverPhone: '+234 805 444 7703',
    capacity: 30,
    enrolledStudentsCount: 22,
    monthlyFee: 32000,
    status: 'Active',
    stops: ['Bourdillon Road / Parkview', 'Adeola Odeku Junction', 'School Campus Gate B']
  },
  {
    routeNumber: 'ROUTE-04',
    routeName: 'Magodo Phase 2 & Ogudu Express',
    vehicleNumber: 'VAN-04 (MGD-554-LA)',
    driverName: 'Mr. Sunday Lawal',
    driverPhone: '+234 814 888 9904',
    capacity: 20,
    enrolledStudentsCount: 18,
    monthlyFee: 38000,
    status: 'Active',
    stops: ['Magodo Phase 2 Main Gate', 'Ogudu GRA Roundabout', 'School Campus Gate A']
  },
  {
    routeNumber: 'ROUTE-05',
    routeName: 'Senior Campus Shuttle & Boarding Corridors',
    vehicleNumber: 'BUS-05 (VI-872-XY)',
    driverName: 'Mr. Kabir Alabi',
    driverPhone: '+234 812 555 6605',
    capacity: 40,
    enrolledStudentsCount: 34,
    monthlyFee: 32000,
    status: 'Active',
    stops: ['Senior Hostel Wing', 'Osborne Foreshore Stop', 'Banana Island Gate', 'Senior Science Complex']
  }
];

const bookLendingsData = [
  {
    bookTitle: 'Basic Mathematics for Primary Schools',
    isbn: '9789785432102',
    studentId: 'STU-2024-001',
    studentName: 'Amara Kalu',
    className: '1st Class',
    issueDate: new Date('2026-11-01T09:00:00Z'),
    dueDate: new Date('2026-11-15T15:00:00Z'),
    status: 'Issued',
    fineAmount: 0
  },
  {
    bookTitle: 'University Physics with Modern Physics',
    isbn: '9789785432107',
    studentId: 'STU-2024-013',
    studentName: 'Olumide Adeleke',
    className: '11th Class',
    issueDate: new Date('2026-11-02T10:00:00Z'),
    dueDate: new Date('2026-11-16T15:00:00Z'),
    status: 'Issued',
    fineAmount: 0
  },
  {
    bookTitle: 'Calculus: Early Transcendentals',
    isbn: '9789785432108',
    studentId: 'STU-2024-015',
    studentName: 'Emmanuel Bassey',
    className: '12th Class',
    issueDate: new Date('2026-11-04T11:30:00Z'),
    dueDate: new Date('2026-11-18T15:00:00Z'),
    status: 'Issued',
    fineAmount: 0
  },
  {
    bookTitle: 'The Young Scientist',
    isbn: '9789785432104',
    studentId: 'STU-2024-008',
    studentName: 'David Effiong',
    className: '8th Class',
    issueDate: new Date('2026-10-12T14:00:00Z'),
    dueDate: new Date('2026-10-26T15:00:00Z'),
    returnDate: new Date('2026-10-25T13:00:00Z'),
    status: 'Returned',
    fineAmount: 0
  }
];

const gradesData = [
  {
    examTitle: 'First Term Assessment 2024/2025',
    term: 'First Term',
    academicYear: '2024/2025',
    studentId: 'STU-2024-001',
    studentName: 'Amara Kalu',
    className: '1st Class',
    rollNumber: 1,
    attendancePercentage: 98,
    classRank: 1,
    teacherRemarks: 'Exceptional intellectual curiosity and outstanding overall academic performance.',
    subjects: [
      { subject: 'Mathematics', marksObtained: 94, maxMarks: 100, grade: 'A+' },
      { subject: 'English Language', marksObtained: 92, maxMarks: 100, grade: 'A+' },
      { subject: 'General Science', marksObtained: 96, maxMarks: 100, grade: 'A+' },
      { subject: 'Social Studies', marksObtained: 90, maxMarks: 100, grade: 'A' },
      { subject: 'Computer Studies', marksObtained: 98, maxMarks: 100, grade: 'A+' }
    ],
    totalMarksObtained: 470,
    totalMaxMarks: 500,
    percentage: 94,
    overallGrade: 'A+'
  },
  {
    examTitle: 'First Term Assessment 2024/2025',
    term: 'First Term',
    academicYear: '2024/2025',
    studentId: 'STU-2024-002',
    studentName: 'Tunde Bakare',
    className: '2nd Class',
    rollNumber: 2,
    attendancePercentage: 95,
    classRank: 2,
    teacherRemarks: 'Shows great leadership qualities and strong quantitative reasoning skills.',
    subjects: [
      { subject: 'Mathematics', marksObtained: 88, maxMarks: 100, grade: 'A' },
      { subject: 'English Language', marksObtained: 85, maxMarks: 100, grade: 'A' },
      { subject: 'General Science', marksObtained: 90, maxMarks: 100, grade: 'A+' },
      { subject: 'Social Studies', marksObtained: 84, maxMarks: 100, grade: 'A' },
      { subject: 'Computer Studies', marksObtained: 92, maxMarks: 100, grade: 'A+' }
    ],
    totalMarksObtained: 439,
    totalMaxMarks: 500,
    percentage: 88,
    overallGrade: 'A'
  },
  {
    examTitle: 'First Term Assessment 2024/2025',
    term: 'First Term',
    academicYear: '2024/2025',
    studentId: 'STU-2024-008',
    studentName: 'David Effiong',
    className: '8th Class',
    rollNumber: 8,
    attendancePercentage: 95,
    classRank: 1,
    teacherRemarks: 'Brilliant student with high aptitude in scientific inquiry and analytical math.',
    subjects: [
      { subject: 'Mathematics', marksObtained: 91, maxMarks: 100, grade: 'A+' },
      { subject: 'English Language', marksObtained: 88, maxMarks: 100, grade: 'A' },
      { subject: 'General Science', marksObtained: 94, maxMarks: 100, grade: 'A+' },
      { subject: 'Social Studies', marksObtained: 86, maxMarks: 100, grade: 'A' },
      { subject: 'Computer Studies', marksObtained: 95, maxMarks: 100, grade: 'A+' }
    ],
    totalMarksObtained: 454,
    totalMaxMarks: 500,
    percentage: 91,
    overallGrade: 'A+'
  },
  {
    examTitle: '10th Class Junior Secondary Certificate Mock',
    term: 'First Term',
    academicYear: '2024/2025',
    studentId: 'STU-2024-012',
    studentName: 'Chioma Dike',
    className: '10th Class',
    rollNumber: 12,
    attendancePercentage: 96,
    classRank: 1,
    teacherRemarks: 'First position in class. Exceptional mastery in analytical math and scientific concepts.',
    subjects: [
      { subject: 'Mathematics', marksObtained: 95, maxMarks: 100, grade: 'A+' },
      { subject: 'English Language', marksObtained: 94, maxMarks: 100, grade: 'A+' },
      { subject: 'Physics & Mechanics', marksObtained: 92, maxMarks: 100, grade: 'A+' },
      { subject: 'Chemistry', marksObtained: 90, maxMarks: 100, grade: 'A+' },
      { subject: 'Computer Studies', marksObtained: 97, maxMarks: 100, grade: 'A+' }
    ],
    totalMarksObtained: 468,
    totalMaxMarks: 500,
    percentage: 94,
    overallGrade: 'A+'
  },
  {
    examTitle: '12th Class Senior Secondary & Pre-University Mock',
    term: 'First Term',
    academicYear: '2024/2025',
    studentId: 'STU-2024-015',
    studentName: 'Emmanuel Bassey',
    className: '12th Class',
    rollNumber: 15,
    attendancePercentage: 97,
    classRank: 1,
    teacherRemarks: 'Valedictorian candidate. Exemplary work ethic, top honors in Further Mathematics and Physics.',
    subjects: [
      { subject: 'Further Mathematics', marksObtained: 98, maxMarks: 100, grade: 'A+' },
      { subject: 'Physics & Mechanics', marksObtained: 96, maxMarks: 100, grade: 'A+' },
      { subject: 'Chemistry & Organic Compounds', marksObtained: 94, maxMarks: 100, grade: 'A+' },
      { subject: 'English Literature', marksObtained: 91, maxMarks: 100, grade: 'A+' },
      { subject: 'Computer Science & AI', marksObtained: 99, maxMarks: 100, grade: 'A+' }
    ],
    totalMarksObtained: 478,
    totalMaxMarks: 500,
    percentage: 96,
    overallGrade: 'A+'
  }
];

const settingsData = {
  schoolName: 'Greenfield High School',
  motto: 'Excellence in Knowledge, Innovation & Character',
  academicSession: '2024/2025 Academic Session',
  currentTerm: 'First Term',
  principalName: 'Dr. (Mrs.) Victoria Adebayo, Ph.D.',
  email: 'admin@greenfield.edu',
  phone: '+234 802 345 6789',
  address: '12 Greenfield Boulevard, Victoria Island, Lagos, Nigeria',
  website: 'https://greenfield.edu',
  currency: '₦'
};

// Timetable schedules customized for Primary, Middle, Secondary and Senior Secondary
const timetableSample = {
  periods: [
    { periodNum: 1, time: '08:15 AM - 09:00 AM' },
    { periodNum: 2, time: '09:00 AM - 09:45 AM' },
    { periodNum: 3, time: '10:15 AM - 11:00 AM' },
    { periodNum: 4, time: '11:00 AM - 11:45 AM' },
    { periodNum: 5, time: '12:30 PM - 01:15 PM' },
    { periodNum: 6, time: '01:15 PM - 02:00 PM' }
  ],
  schedule: [
    { day: 'Monday', periods: ['Mathematics', 'English Language', 'General Science', 'Computer Studies', 'Social Studies', 'Physical Education'] },
    { day: 'Tuesday', periods: ['English Language', 'Mathematics', 'Creative Arts', 'General Science', 'French Language', 'Civic Education'] },
    { day: 'Wednesday', periods: ['General Science', 'Mathematics', 'Computer Studies', 'English Language', 'Social Studies', 'Library Period'] },
    { day: 'Thursday', periods: ['Mathematics', 'Social Studies', 'English Language', 'French Language', 'Creative Arts', 'Club & Societies'] },
    { day: 'Friday', periods: ['Computer Studies', 'General Science', 'Mathematics', 'English Language', 'Physical Education', 'Weekly Assembly'] }
  ],
  seniorSchedule: [
    { day: 'Monday', periods: ['Further Mathematics', 'Physics & Mechanics', 'Chemistry', 'English Language', 'Computer Science & AI', 'Library Research'] },
    { day: 'Tuesday', periods: ['Chemistry', 'Further Mathematics', 'Biology & Genetics', 'English Language', 'Economics', 'Civic Leadership'] },
    { day: 'Wednesday', periods: ['Physics & Mechanics', 'Further Mathematics', 'Computer Science & AI', 'Chemistry', 'Financial Accounting', 'Seminar'] },
    { day: 'Thursday', periods: ['Further Mathematics', 'Economics', 'English Language', 'Physics & Mechanics', 'Biology', 'STEM Club'] },
    { day: 'Friday', periods: ['Computer Science & AI', 'Chemistry', 'Further Mathematics', 'English Literature', 'Sports & Fitness', 'Senior Assembly'] }
  ]
};

module.exports = {
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
};
