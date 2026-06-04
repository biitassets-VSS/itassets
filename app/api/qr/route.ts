import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const assetId = searchParams.get('assetId');
  const assetName = searchParams.get('assetName');

  if (!assetId || !assetName) {
    return NextResponse.json({ error: 'Missing params' }, { status: 400 });
  }

  const qrData = JSON.stringify({
    asset_id: assetId,
    name: assetName,
    system: 'Virtual Staffing Solution',
    url: `${process.env.NEXT_PUBLIC_APP_URL}/admin/assets/${assetId}`,
  });

  const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
    width: 256,
    margin: 2,
    color: { dark: '#1e1b4b', light: '#ffffff' },
  });

  return NextResponse.json({ qrCode: qrCodeDataUrl });
}
