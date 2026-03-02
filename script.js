// script.js: helper functions for HP bar and token updates

// create a bar element (with fill) for given token
function createHpBar(token) {
    const hpBar = document.createElement('div');
    hpBar.className = 'hp-bar';
    const hpFill = document.createElement('div');
    hpFill.className = 'hp-fill';
    hpBar.appendChild(hpFill);
    updateHpFill(hpFill, token.hp, token.maxHp);
    return hpBar;
}

// create a label element showing numeric hp/maxhp
function createHpLabel(token) {
    const label = document.createElement('div');
    label.className = 'hp-label';
    label.textContent = `${token.hp}/${token.maxHp}`;
    return label;
}

// combined container with only numeric life
function createHpContainer(token) {
    const wrap = document.createElement('div');
    wrap.className = 'hp-container';
    // numeric label only
    const lbl = createHpLabel(token);
    wrap.appendChild(lbl);
    return wrap;
}

// set width of existing fill element based on current hp/maxHp
function updateHpFill(fillEl, hp, maxHp) {
    const percent = maxHp > 0 ? Math.max(0, Math.min(100, (hp / maxHp) * 100)) : 0;
    fillEl.style.width = percent + '%';
}

// update the hp label text
function updateHpLabel(labelEl, token) {
    if (labelEl) labelEl.textContent = `${token.hp}/${token.maxHp}`;
}

// update a token element's bar (remove and recreate)
function refreshTokenHpBar(tokenElement, token) {
    const existing = tokenElement.querySelector('.hp-bar');
    if (existing) existing.remove();
    const bar = createHpBar(token);
    tokenElement.appendChild(bar);
}

// update or recreate an hp label element
function refreshTokenHpLabel(tokenElement, token) {
    let label = tokenElement.querySelector('.hp-label');
    if (label) {
        updateHpLabel(label, token);
    } else {
        label = createHpLabel(token);
        tokenElement.appendChild(label);
    }
}

// update or recreate the entire container (label+bar)
function refreshHpContainer(tokenElement, token) {
    const existing = tokenElement.querySelector('.hp-container');
    if (existing) existing.remove();
    const container = createHpContainer(token);
    tokenElement.appendChild(container);
    // new icons may need replacement
    try { feather.replace(); } catch(e) {}
}

// when hp or maxHp inputs change in the sidebar we already call renderToken()
// so the bar and label will update automatically; but we expose these utilities if
// another script wants to manipulate them.

// expose globally
window.createHpBar = createHpBar;
window.updateHpFill = updateHpFill;
window.refreshTokenHpBar = refreshTokenHpBar;
window.createHpLabel = createHpLabel;
window.updateHpLabel = updateHpLabel;
window.refreshTokenHpLabel = refreshTokenHpLabel;
window.createHpContainer = createHpContainer;
window.refreshHpContainer = refreshHpContainer;
