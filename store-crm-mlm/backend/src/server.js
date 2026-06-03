// backend/src/server.js

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const testRoutes = require('./routes/testRoutes');
const authRoutes = require('./routes/authRoutes');
const customerRoutes = require('./routes/customerRoutes');
const saleRoutes = require('./routes/saleRoutes');
const rateLimit = require('express-rate-limit');
const inventoryRoutes = require('./routes/inventoryRoutes');

const app = express();


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use(limiter);

app.use(helmet());
// app.use(cors());
// app.use(cors({
//   origin: [
//     'http://localhost:5173',
//     'https://store-crm-mlm.netlify.app'
//   ],
//   credentials: true
// }));

app.use(cors({
  origin: true,
  credentials: true
}));


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Route
app.get('/api/health', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'CRM Backend Running',
        timestamp: new Date().toISOString()
    });
});

app.use(
    '/api/inventory',
    inventoryRoutes
);
app.use('/api', testRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/sales', saleRoutes);




// Root Route
app.get('/', (req, res) => {
    return res.json({
        success: true,
        app: 'Store CRM + MLM',
        version: '1.0.0'
    });
});



// 404 Handler
app.use((req, res) => {
    return res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);

    return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
==================================
🚀 CRM Server Running
🌍 Port: ${PORT}
==================================
`);
});