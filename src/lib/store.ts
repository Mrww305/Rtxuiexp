// Global state manager for Reshma Tex platform
// Handles Sample Swatch Kit, Fabric Comparison Drawer, Favorites, and RFQ prefill
import { useState, useEffect } from 'react';
import { FabricItem } from '../types';
import { FABRICS_DATA } from '../data/fabrics';

export interface AppState {
  sampleKitIds: string[];
  compareIds: string[];
  favoriteIds: string[];
  isSampleKitOpen: boolean;
  isCompareDrawerOpen: boolean;
  rfqPrefillFabricId: string | null;
  toastMessage: string | null;
}

const STORAGE_KEYS = {
  SAMPLE_KIT: 'reshmatex_sample_kit_ids',
  COMPARE: 'reshmatex_compare_ids',
  FAVORITES: 'reshmatex_favorite_ids',
  COOKIE_CONSENT: 'reshmatex_cookie_consent'
};

// Simple reactive store hook
let state: AppState = {
  sampleKitIds: ['rt-101', 'rt-103'], // Pre-seeded with 2 popular swatches for immediate exploration
  compareIds: [],
  favoriteIds: [],
  isSampleKitOpen: false,
  isCompareDrawerOpen: false,
  rfqPrefillFabricId: null,
  toastMessage: null,
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach(listener => listener());
}

export function useAppStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    // Load from localStorage on mount
    try {
      const savedKit = localStorage.getItem(STORAGE_KEYS.SAMPLE_KIT);
      if (savedKit) state.sampleKitIds = JSON.parse(savedKit);

      const savedFavs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (savedFavs) state.favoriteIds = JSON.parse(savedFavs);
    } catch {
      // Storage error handling
    }

    const listener = () => setTick(t => t + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const showToast = (message: string) => {
    state.toastMessage = message;
    notify();
    setTimeout(() => {
      if (state.toastMessage === message) {
        state.toastMessage = null;
        notify();
      }
    }, 4000);
  };

  const addToSampleKit = (fabricId: string) => {
    if (!state.sampleKitIds.includes(fabricId)) {
      if (state.sampleKitIds.length >= 6) {
        showToast('Maximum 6 swatches allowed in a single complimentary sample kit.');
        return;
      }
      state.sampleKitIds = [...state.sampleKitIds, fabricId];
      try {
        localStorage.setItem(STORAGE_KEYS.SAMPLE_KIT, JSON.stringify(state.sampleKitIds));
      } catch {}
      showToast('Fabric swatch added to your Sample Kit.');
      notify();
    } else {
      showToast('This fabric is already in your Sample Kit.');
    }
  };

  const removeFromSampleKit = (fabricId: string) => {
    state.sampleKitIds = state.sampleKitIds.filter(id => id !== fabricId);
    try {
      localStorage.setItem(STORAGE_KEYS.SAMPLE_KIT, JSON.stringify(state.sampleKitIds));
    } catch {}
    notify();
  };

  const clearSampleKit = () => {
    state.sampleKitIds = [];
    try {
      localStorage.setItem(STORAGE_KEYS.SAMPLE_KIT, JSON.stringify([]));
    } catch {}
    notify();
  };

  const toggleCompare = (fabricId: string) => {
    if (state.compareIds.includes(fabricId)) {
      state.compareIds = state.compareIds.filter(id => id !== fabricId);
      notify();
    } else {
      if (state.compareIds.length >= 4) {
        showToast('You can compare a maximum of 4 fabrics side-by-side.');
        return;
      }
      state.compareIds = [...state.compareIds, fabricId];
      state.isCompareDrawerOpen = true;
      notify();
    }
  };

  const removeCompare = (fabricId: string) => {
    state.compareIds = state.compareIds.filter(id => id !== fabricId);
    notify();
  };

  const clearCompare = () => {
    state.compareIds = [];
    state.isCompareDrawerOpen = false;
    notify();
  };

  const toggleFavorite = (fabricId: string) => {
    if (state.favoriteIds.includes(fabricId)) {
      state.favoriteIds = state.favoriteIds.filter(id => id !== fabricId);
      showToast('Removed from saved fabrics.');
    } else {
      state.favoriteIds = [...state.favoriteIds, fabricId];
      showToast('Fabric saved to your local favorites.');
    }
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(state.favoriteIds));
    } catch {}
    notify();
  };

  const setSampleKitOpen = (isOpen: boolean) => {
    state.isSampleKitOpen = isOpen;
    notify();
  };

  const setCompareDrawerOpen = (isOpen: boolean) => {
    state.isCompareDrawerOpen = isOpen;
    notify();
  };

  const setRfqPrefillFabricId = (id: string | null) => {
    state.rfqPrefillFabricId = id;
    notify();
  };

  const sampleKitFabrics = FABRICS_DATA.filter(f => state.sampleKitIds.includes(f.id));
  const compareFabrics = FABRICS_DATA.filter(f => state.compareIds.includes(f.id));
  const favoriteFabrics = FABRICS_DATA.filter(f => state.favoriteIds.includes(f.id));

  return {
    state,
    sampleKitFabrics,
    compareFabrics,
    favoriteFabrics,
    addToSampleKit,
    removeFromSampleKit,
    clearSampleKit,
    toggleCompare,
    removeCompare,
    clearCompare,
    toggleFavorite,
    setSampleKitOpen,
    setCompareDrawerOpen,
    setRfqPrefillFabricId,
    showToast,
  };
}
