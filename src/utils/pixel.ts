/**
 * Meta (Facebook) Pixel Helper
 * Pixel ID: 1427984942520629
 */

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export const FB_PIXEL_ID = '1427984942520629';

// Safe wrapper to call fbq
export function trackPixelEvent(eventName: string, params?: Record<string, any>) {
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      if (params) {
        window.fbq('track', eventName, params);
      } else {
        window.fbq('track', eventName);
      }
      console.log(`[Meta Pixel] Event tracked: ${eventName}`, params);
    }
  } catch (error) {
    console.warn('[Meta Pixel] Tracking error:', error);
  }
}

// Track Custom Event
export function trackCustomPixelEvent(customEventName: string, params?: Record<string, any>) {
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      if (params) {
        window.fbq('trackCustom', customEventName, params);
      } else {
        window.fbq('trackCustom', customEventName);
      }
      console.log(`[Meta Pixel Custom] Event tracked: ${customEventName}`, params);
    }
  } catch (error) {
    console.warn('[Meta Pixel] Custom tracking error:', error);
  }
}
