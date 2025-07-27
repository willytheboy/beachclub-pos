declare module 'react';
declare module 'react-native';
declare module '@react-navigation/native';
declare module '@react-navigation/bottom-tabs';

// Minimal Redux Toolkit types

declare module '@reduxjs/toolkit' {
  export interface PayloadAction<P = any> { payload: P; }
  export function createSlice(...args: any[]): any;
  export function configureStore(...args: any[]): any;
}

declare module 'react-redux';
declare module '@react-native-community/netinfo';
declare module 'expo';
declare module 'expo-sqlite';
declare module 'expo-secure-store';
