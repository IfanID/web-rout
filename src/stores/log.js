import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLogStore = defineStore('log', () => {
  const logs = ref([]);
  let idCounter = 0;

  const addLog = (level, message, ...args) => {
    const timestamp = new Date();
    const formattedMessage = args.length > 0 ? `${message} ${JSON.stringify(args)}` : message;
    logs.value.unshift({ id: idCounter++, timestamp, message: formattedMessage, level });
  };

  const info = (message, ...args) => {
    addLog('info', message, ...args);
  };

  const warning = (message, ...args) => {
    addLog('warning', message, ...args);
  };

  const error = (message, ...args) => {
    addLog('error', message, ...args);
  };

  // Menimpa console.log, console.warn, dan console.error
  const originalConsoleLog = console.log;
  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;

  console.log = (...args) => {
    info(...args);
    originalConsoleLog.apply(console, args);
  };

  console.warn = (...args) => {
    warning(...args);
    originalConsoleWarn.apply(console, args);
  };

  console.error = (...args) => {
    error(...args);
    originalConsoleError.apply(console, args);
  };


  return { logs, info, warning, error };
});