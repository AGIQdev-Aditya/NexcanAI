import { getInspectionHistory } from '../services/databaseService.js';

export async function handleGetAuditLogs(req, res, next) {
  try {
    const { limit = 50, verdict, category, userEmail, email } = req.query;
    const targetEmail = userEmail || email || req.headers['x-user-email'];

    const records = await getInspectionHistory({
      limit: parseInt(limit, 10) || 50,
      verdict,
      category,
      userEmail: targetEmail,
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
