'use client';

import { useEffect, useState } from 'react';
import { ImmichSharedLink } from '@/types/immich';
import ThemeToggle from './ThemeToggle';

export default function PhotoGallery() {
  const [sharedLinks, setSharedLinks] = useState<ImmichSharedLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchSharedLinks() {
      try {
        const response = await fetch('/api/shared-links');
        if (!response.ok) {
          throw new Error('Failed to fetch shared links');
        }
        const data = await response.json();

        console.log('Fetched shared links:', data.length, 'items');
        if (data.length > 0) {
          console.log('First item:', data[0]);
          console.log('Album thumbnail ID:', data[0].album?.albumThumbnailAssetId);
        }

        setSharedLinks(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchSharedLinks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-error max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (sharedLinks.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-info max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>No shared photos found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:from-slate-900 dark:to-slate-800 dark:bg-gradient-to-br">
      <ThemeToggle />
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-light tracking-tight text-slate-900 dark:text-slate-100 mb-3">
            แกลเลอรี่ภาพ
          </h1>
          <p className="text-slate-700 dark:text-slate-400 font-light">
            คอลเลกชันภาพถ่ายของเรา
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sharedLinks.map((link) => (
            <a
              key={link.id}
              href={`https://photos.test-d.pro/share/${link.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Thumbnail */}
                <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
                  {link.album?.albumThumbnailAssetId ? (
                    <img
                      src={`/api/thumbnail/${link.album.albumThumbnailAssetId}`}
                      alt={link.album.albumName || 'Photo'}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : link.assets?.[0] ? (
                    <img
                      src={`/api/thumbnail/${link.assets[0].id}`}
                      alt={link.assets[0].originalFileName}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-slate-400 dark:text-slate-500 font-light">ไม่มีรูปภาพ</span>
                    </div>
                  )}

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>

                {/* Info */}
                <div className="p-5">
                  <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2 line-clamp-1">
                    {link.album?.albumName || link.description || 'ไม่มีชื่อ'}
                  </h2>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-700 dark:text-slate-400 font-light">
                      {link.album?.assetCount ?? link.assets?.length ?? 0} ภาพ
                    </span>

                    <span className="text-sm text-blue-600 dark:text-blue-400 font-light group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                      ดูอัลบั้ม →
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
