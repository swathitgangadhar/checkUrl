"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const urlInput = document.getElementById('urlInput');
const statusOfUrl = document.getElementById('status');
urlInput.addEventListener('input', (e) => {
    const url = e.target.value.trim();
    checkUrl(url);
});
function checkUrl(url) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!url) {
            statusOfUrl.textContent = '';
            statusOfUrl.className = 'status';
            return;
        }
        if (!isValidUrl(url)) {
            statusOfUrl.textContent = 'Invalid URL';
            statusOfUrl.className = 'status invalid';
            return;
        }
        const result = yield checkServer(url);
        if (result.exists) {
            statusOfUrl.textContent = `URL exists and is a ${result.type}`;
            statusOfUrl.className = 'valid';
        }
        else {
            statusOfUrl.textContent = `URL doesn't exist`;
            statusOfUrl.className = 'invalid';
        }
    });
}
function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    }
    catch (_a) {
        return false;
    }
}
function checkServer(url) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(() => {
                const isFile = url.endsWith('.txt') || url.endsWith('.pdf') || url.endsWith('.jpg') || url.endsWith('.png');
                const exists = Math.random() > 0.3;
                resolve({ exists, type: isFile ? 'file' : 'folder' });
            }, 500);
        });
    });
}
