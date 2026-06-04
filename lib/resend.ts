import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(payload: EmailPayload) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'IT Assets <noreply@ainodeart.com>',
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Email send failed:', err);
    return { success: false, error: err };
  }
}

export function inspectionReminderEmail(
  staffName: string,
  assetName: string,
  inspectionDate: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8" /></head>
    <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
      <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;padding:30px;">
        <h1 style="color:#6366f1;">Virtual Staffing Solution</h1>
        <h2 style="color:#374151;">🔔 Inspection Reminder</h2>
        <p>Dear <strong>${staffName}</strong>,</p>
        <p>This is a reminder that the asset <strong>${assetName}</strong>
           is due for inspection on <strong>${inspectionDate}</strong>.</p>
        <p>Please log in to the portal and complete your inspection report.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/staff/inspections"
           style="display:inline-block;background:#6366f1;color:#fff;
                  padding:12px 24px;border-radius:6px;text-decoration:none;margin-top:16px;">
          Submit Inspection
        </a>
        <hr style="margin-top:30px;" />
        <p style="font-size:12px;color:#9ca3af;">
          © Copyright Reserved AinodeArt 2026 | Virtual Staffing Solution
        </p>
      </div>
    </body>
    </html>
  `;
}

export function warrantyAlertEmail(
  assetName: string,
  warrantyDate: string,
  assetId: string
): string {
  return `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
      <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;padding:30px;">
        <h1 style="color:#6366f1;">Virtual Staffing Solution</h1>
        <h2 style="color:#f59e0b;">⚠️ Warranty Expiry Alert</h2>
        <p>The asset <strong>${assetName}</strong> (ID: ${assetId})
           warranty is expiring on <strong>${warrantyDate}</strong>.</p>
        <p>Please take necessary action to renew or replace the warranty.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/assets/${assetId}"
           style="display:inline-block;background:#f59e0b;color:#fff;
                  padding:12px 24px;border-radius:6px;text-decoration:none;margin-top:16px;">
          View Asset
        </a>
        <hr style="margin-top:30px;" />
        <p style="font-size:12px;color:#9ca3af;">
          © Copyright Reserved AinodeArt 2026 | Virtual Staffing Solution
        </p>
      </div>
    </body>
    </html>
  `;
}
