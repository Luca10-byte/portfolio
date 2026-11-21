(() => {
  'use strict';

  // Misure rosse sul titolo: i valori sono letti dagli stili reali, quindi non possono essere sbagliati.
  const board = document.querySelector('.board');
  const h1 = board && board.querySelector('h1');
  if (board && h1 && 'ResizeObserver' in window) {
    const px = (v) => Math.round(parseFloat(v));
    const mk = (k) => {
      const s = document.createElement('span');
      s.className = 'rl';
      s.dataset.rl = k;
      s.setAttribute('aria-hidden', 'true');
      board.append(s);
      return s;
    };
    const pad = mk('pad'), width = mk('width'), size = mk('size');
    const update = () => {
      const cs = getComputedStyle(h1);
      size.textContent = `H1 ${px(cs.fontSize)}/${px(cs.lineHeight)}`;
      width.textContent = `${Math.round(h1.getBoundingClientRect().width)} px`;
      pad.textContent = String(px(getComputedStyle(board).paddingLeft));
    };
    update();
    new ResizeObserver(update).observe(h1);

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'redline-toggle';
    toggle.textContent = 'Misure sul titolo';
    toggle.setAttribute('aria-pressed', 'true');
    toggle.addEventListener('click', () => {
      const on = toggle.getAttribute('aria-pressed') !== 'true';
      toggle.setAttribute('aria-pressed', String(on));
      board.dataset.redline = on ? 'on' : 'off';
    });
    board.after(toggle);
  }

  // Frena il salvataggio casuale dei video dal menu del tasto destro, solo sui video.
  document.querySelectorAll('video').forEach((v) => v.addEventListener('contextmenu', (e) => e.preventDefault()));

  // Copia l'email: il bottone è nascosto nell'HTML e compare solo se c'è JavaScript.
  const copyBtn = document.querySelector('button[data-copy]');
  const status = document.getElementById('copy-status');
  if (copyBtn && status) {
    copyBtn.hidden = false;
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(copyBtn.dataset.copy);
        status.textContent = 'Email copiata negli appunti.';
      } catch {
        status.textContent = 'Non riesco a copiare: seleziona l’indirizzo e copialo a mano.';
      }
      setTimeout(() => { status.textContent = ''; }, 4000);
    });
  }
})();
