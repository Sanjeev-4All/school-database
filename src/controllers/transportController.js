const { isMongoConnected } = require('../config/db');
const memoryStore = require('../utils/memoryStore');
const Transport = require('../models/Transport');

// @desc    Get all transport routes
// @route   GET /api/transport
exports.getTransportRoutes = async (req, res) => {
  try {
    const useMongo = isMongoConnected();
    const routes = useMongo
      ? await Transport.find().sort({ routeNumber: 1 })
      : memoryStore.getTransportRoutes();

    res.status(200).json({
      success: true,
      count: routes.length,
      source: useMongo ? 'mongodb' : 'in-memory-store',
      data: routes
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

// @desc    Add / Create a new transport route
// @route   POST /api/transport
exports.createTransportRoute = async (req, res) => {
  try {
    const routeData = req.body;
    if (!routeData.routeName || !routeData.vehicleNumber) {
      return res.status(400).json({ success: false, message: 'Route name and vehicle number are required' });
    }

    if (!isMongoConnected()) {
      const created = memoryStore.createTransportRoute(routeData);
      return res.status(201).json({
        success: true,
        message: 'Transport route created successfully',
        data: created
      });
    }

    if (!routeData.routeNumber) {
      const count = await Transport.countDocuments();
      routeData.routeNumber = `ROUTE-${String(count + 1).padStart(2, '0')}`;
    }

    const created = await Transport.create(routeData);
    res.status(201).json({
      success: true,
      message: 'Transport route created in MongoDB',
      data: created
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
