import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { sendEmail, inspectionReminderEmail, warrantyAlertEmail } from '@/lib/resend';
import { isWarrantyExpiringSoon } from '@/lib/depreciation';

// This route is called by a Vercel Cron Job daily
export async function GET() {
  const supabase = await createClient();

  // Inspection reminders (2 days before)
  const twoDaysFromNow = new Date();
  twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
  const dueDateStr = twoDaysFromNow.toISOString().split('T')[0];

  const { data: dueAssets } = await supabase
    .from('assets')
    .select(`
      id, asset_name, inspection_date,
      asset_assignments(
        staff_members(user_id, staff_name, email),
        is_current
      )
    `)
    .eq('inspection_date', dueDateStr);

  for (const asset of dueAssets ?? []) {
    const currentAssignment = (asset.asset_assignments as any[])
      .find(a => a.is_current);
    if (!currentAssignment?.staff_members) continue;

    const staff = currentAssignment.staff_members;

    // Dashboard notification
    if (staff.user_id) {
      await supabase.from('notifications').insert({
        user_id: staff.user_id,
        title: 'Inspection Reminder',
        message: `Asset "${asset.asset_name}" inspection due in 2 days`,
        type: 'inspection_reminder',
        related_asset_id: asset.id,
      });
    }

    // Email notification via Resend
    if (staff.email) {
      await sendEmail({
        to: staff.email,
        subject: `Inspection Reminder – ${asset.asset_name}`,
        html: inspectionReminderEmail(
          staff.staff_name,
          asset.asset_name,
          asset.inspection_date
        ),
      });
    }
  }

  // Warranty expiry alerts (30 days before) – notify admins
  const { data: warranties } = await supabase
    .from('assets')
    .select('id, asset_name, asset_id, warranty_date');

  const { data: admins } = await supabase
    .from('profiles')
    .select('id, email')
    .eq('role', 'admin');

  for (const asset of warranties ?? []) {
    if (!isWarrantyExpiringSoon(asset.warranty_date, 30)) continue;

    for (const admin of admins ?? []) {
      await supabase.from('notifications').insert({
        user_id: admin.id,
        title: 'Warranty Expiry Alert',
        message: `Asset "${asset.asset_name}" warranty expiring on ${asset.warranty_date}`,
        type: 'warranty_alert',
        related_asset_id: asset.id,
      });

      await sendEmail({
        to: admin.email,
        subject: `Warranty Alert – ${asset.asset_name}`,
        html: warrantyAlertEmail(asset.asset_name, asset.warranty_date, asset.asset_id),
      });
    }
  }

  return NextResponse.json({ success: true, message: 'Notifications sent' });
}
