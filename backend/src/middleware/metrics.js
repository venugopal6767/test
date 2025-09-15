let metrics = {
  totalRequests: 0,
  successfulRequests: 0,
  failedRequests: 0,
  totalResponseTime: 0,
  tasksCreated: 0,
  tasksUpdated: 0,
  tasksDeleted: 0,
};

function trackRequests(req, res, next) {
  const start = Date.now();
  metrics.totalRequests++;

  res.on('finish', () => {
    const duration = Date.now() - start;
    metrics.totalResponseTime += duration;
    if (res.statusCode >= 200 && res.statusCode < 300) {
      metrics.successfulRequests++;
    } else {
      metrics.failedRequests++;
    }
  });

  next();
}

function getMetrics() {
  return {
    ...metrics,
    avgResponseTime: metrics.totalRequests ? (metrics.totalResponseTime / metrics.totalRequests) : 0
  };
}

function increment(metric) {
  if (metrics[metric] !== undefined) metrics[metric]++;
}

module.exports = { trackRequests, getMetrics, increment };