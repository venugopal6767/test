const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./src/routes/auth');
const taskRoutes = require('./src/routes/tasks');
const metrics = require('./src/middleware/metrics');

app.use(cors());
app.use(express.json());
app.use(metrics.trackRequests);

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.get('/metrics', (req, res) => res.json(metrics.getMetrics()));

app.listen(5000, () => console.log('Server running on port 5000'));