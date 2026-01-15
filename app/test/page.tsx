'use client';

import { useEffect, useState } from 'react';

export default function TestPage() {
  const [data, setData] = useState<any>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/shared-links')
      .then(res => res.json())
      .then(data => {
        console.log('Data:', data);
        setData(data);
      });
  }, []);

  if (!data || data.length === 0) {
    return <div className="p-8">Loading...</div>;
  }

  const testAssetId = data[0]?.album?.albumThumbnailAssetId || data[0]?.assets?.[0]?.id;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Test Page</h1>

      <div className="mb-4">
        <h2 className="text-xl font-bold">Shared Links Data:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>

      {testAssetId && (
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Test Thumbnail (Asset ID: {testAssetId}):</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold">Via Proxy API (/api/thumbnail/{testAssetId}):</h3>
              <img
                src={`/api/thumbnail/${testAssetId}`}
                alt="Test via proxy"
                className="w-64 h-64 object-cover border-2 border-blue-500"
                onError={(e) => {
                  console.error('Proxy image failed to load');
                  setImageError('Proxy API failed');
                }}
                onLoad={() => console.log('Proxy image loaded successfully')}
              />
            </div>

            <div>
              <h3 className="font-bold">Direct from Immich (should fail without API key):</h3>
              <img
                src={`https://photos.test-d.pro/api/assets/${testAssetId}/thumbnail`}
                alt="Test direct"
                className="w-64 h-64 object-cover border-2 border-red-500"
                onError={() => console.log('Direct image failed (expected)')}
                onLoad={() => console.log('Direct image loaded')}
              />
            </div>
          </div>

          {imageError && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
              Error: {imageError}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
