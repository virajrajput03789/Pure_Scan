import { useEffect, useRef } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';

const Scanner = ({ onScan, borderColor = 'yellow' }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();

    codeReader.decodeOnceFromVideoDevice(undefined, videoRef.current)
      .then(result => {
        console.log("✅ Barcode:", result.getText());
        onScan(result.getText());
      })
      .catch(err => {
        console.error("❌ Scan error:", err);
      });

    // No need to reset or stop manually
  }, []);

  const borderClass = {
    green: 'border-green-500',
    pink: 'border-pink-500',
    yellow: 'border-yellow-500',
  }[borderColor] || 'border-yellow-500';

  return (
    <div className="relative">
      <video ref={videoRef} className="w-full rounded-xl" />
      <div className={`absolute inset-0 border-4 ${borderClass} rounded-xl pointer-events-none`} />
    </div>
  );
};

export default Scanner;