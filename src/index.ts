const urlInput = document.getElementById('urlInput') as HTMLInputElement;
const statusOfUrl = document.getElementById('status') as HTMLDivElement;

urlInput.addEventListener('input', (e: Event) => {
  const url = (e.target as HTMLInputElement).value.trim();
  throttledCheck(url);
});

const throttledCheck = throttle(checkUrl, 1000); 

function throttle<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let lastCall = 0;
  return function (...args: any[]) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  } as T;
}

// check if url correct and exists
async function checkUrl(url: string) {
  if (!url) {
    statusOfUrl.textContent = '';
    return;
  }

  if (! new URL(url)) {
    statusOfUrl.textContent = 'Invalid URL';
    return;
  }

  statusOfUrl.textContent = 'Checking URL...';

  const urlType = await checkServer(url);

  if (urlType.exists) {
    statusOfUrl.textContent = `URL exists and is a ${urlType.type}`;
  } else {
    statusOfUrl.textContent = `URL doesn’t exist`;
  }
}

async function checkServer(url: string) {
  return new Promise<{ exists: boolean; type: 'file' | 'folder' }>((resolve) => {
    setTimeout(() => {
      const isFile =
        url.endsWith('.txt') ||
        url.endsWith('.pdf') ||
        url.endsWith('.jpg') ||
        url.endsWith('.png');
      const exists = Math.random() > 0.3;
      resolve({ exists, type: isFile ? 'file' : 'folder' });
    }, 500);
  });
}
