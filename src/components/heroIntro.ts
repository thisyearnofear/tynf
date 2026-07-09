"use client";

type PlayFn = () => void;

// Lets Experience trigger the hero intro once the preloader finishes,
// without prop-drilling through the section tree.
export const heroIntro: { play?: PlayFn } = {};
