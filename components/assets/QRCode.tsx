'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Props {
  assetId: string;
  assetName: string;
}

export default function QRCode({ assetId, assetName }: Props) {
  const [qrSrc, setQrSrc] = useState<string | null>(null);

  useEffect(() => {
    async function fetchQR() {
      const res = await fetch(
        `/api/qr?assetId=${encodeURIComponent(assetId)}&assetName=${encodeURIComponent(assetName)}`
      );
      const json = await res.json();
      setQrSrc(json.qrCode);
    }
    fetchQR();
  }, [assetId, assetName]);

  if (!qrSrc) {
    return (
      <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-xl
                      animate-pulse flex items-center justify-center">
        <span className="text-xs text-gray-400">Loading QR...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <Image src={qrSrc} alt={`QR Code for ${assetName}`} width={128} height={128}
             className="rounded-xl" />
      <p className="text-xs text-gray-500 font-mono">{assetId}</p>
      <a
        href={qrSrc}
        download={`qr-${assetId}.png`}
        className="text-xs text-indigo-500 hover:underline"
      >
        Download QR
      </a>
    </div>
  );
}
