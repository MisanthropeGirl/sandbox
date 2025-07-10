let interval = 1000*60,
  autoRefresh = null;

onmessage = (e) => {

  interval = e.data || interval;

  autoRefresh = setInterval(() => {
    postMessage('now');
  }, interval);
};