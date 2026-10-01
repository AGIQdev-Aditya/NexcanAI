import { getInspectionHistory } from '../services/databaseService.js';

export async function handleGetAuditLogs(req, res, next) {
  try {
    const { limit = 50, verdict, category } = req.query;
    const records = await getInspectionHistory({
      limit: parseInt(limit, 10) || 50,
      verdict,
      category,
    });

    return res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (error) {
    next(error);
  }
}
