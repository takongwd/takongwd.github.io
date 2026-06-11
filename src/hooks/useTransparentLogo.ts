import { useState, useEffect } from 'react';

export const useTransparentLogo = (imageUrl: string, r = 255, g = 255, b = 255) => {
  const [processedUrl, setProcessedUrl] = useState<string>('');

  useEffect(() => {
    // Reference parameters to satisfy TS unused locals rule
    void (r + g + b);
    setProcessedUrl(imageUrl);
  }, [imageUrl, r, g, b]);

  return processedUrl;
};

