const memoryStore = require('../utils/memoryStore');

const VALID_STATUSES = new Set(['Present', 'Late', 'Absent', 'Excused', 'No Data']);

const sendServerError = (res, error) => {
  res.status(500).json({
    success: false,
    message: 'Unable to process attendance',
    error: error.message
  });
};

const toWholeNumber = value => {
  if (value === undefined || value === null || value === '') return undefined;
  const number = Number(value);
  return Number.isInteger(number) && number >= 0 ? number : null;
};

// @desc    Get attendance matrix overview (by classes & weekdays)
// @route   GET /api/attendance/overview
exports.getAttendanceOverview = async (req, res) => {
  try {
    const overview = memoryStore.getAttendanceOverview();
    res.status(200).json({
      success: true,
      data: overview
    });
  } catch (error) {
    sendServerError(res, error);
  }
};

// @desc    Update or mark class attendance
// @route   POST /api/attendance/mark
exports.markAttendance = async (req, res) => {
  try {
    const { className, present, late, absent, dayIndex, status } = req.body;

    if (!className || typeof className !== 'string' || !className.trim()) {
      return res.status(400).json({ success: false, message: 'Class name is required' });
    }

    const normalizedPresent = toWholeNumber(present);
    const normalizedLate = toWholeNumber(late);
    const normalizedAbsent = toWholeNumber(absent);

    if (normalizedPresent === null || normalizedLate === null || normalizedAbsent === null) {
      return res.status(400).json({
        success: false,
        message: 'Present, late, and absent values must be non-negative whole numbers'
      });
    }

    if (dayIndex !== undefined) {
      const normalizedDayIndex = Number(dayIndex);
      if (!Number.isInteger(normalizedDayIndex) || normalizedDayIndex < 0 || normalizedDayIndex > 5) {
        return res.status(400).json({ success: false, message: 'Day index must be between 0 and 5' });
      }
      if (status && !VALID_STATUSES.has(status)) {
        return res.status(400).json({ success: false, message: 'Invalid attendance status' });
      }
    }

    const countsProvided = [normalizedPresent, normalizedLate, normalizedAbsent].every(value => value !== undefined);
    const total = countsProvided
      ? normalizedPresent + normalizedLate + normalizedAbsent
      : 0;
    const rate = total > 0
      ? Math.round(((normalizedPresent + normalizedLate * 0.5) / total) * 100)
      : 95;

    const updated = memoryStore.updateClassAttendance(className.trim(), {
      present: normalizedPresent,
      late: normalizedLate,
      absent: normalizedAbsent,
      rate,
      dayIndex,
      status
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }

    res.status(200).json({
      success: true,
      message: `Attendance updated for ${updated.className}`,
      data: updated
    });
  } catch (error) {
    sendServerError(res, error);
  }
};

