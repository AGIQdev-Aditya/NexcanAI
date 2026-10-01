import { getAnalyticsMetrics } from '../services/databaseService.js';

export async function handleGetAnalytics(req, res, next) {
  try {
    const metrics = await getAnalyticsMetrics();
    return res.status(200).json({
      success: true,
      data: metrics,
    });
  } catch (error) {
    next(error);
  }
}
