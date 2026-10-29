// login.js - user login/logout

var users = [
  { username: 'sakibsmart', password: 'sakib123', name: 'Sakib' },
];

function initLogin() {
  let saved = JSON.parse(localStorage.getItem('sakibsmart_user') || 'null');
  showLoginUI(saved);
}

function showLoginUI(user) {
  let btn = document.getElementById('login-btn');
  let box = document.getElementById('user-display');
  let name = document.getElementById('user-name');

  if (user) {
    btn.style.display = 'none';
    box.style.display = 'flex';
    name.textContent = user.name;
  } else {
    btn.style.display = 'flex';
    box.style.display = 'none';
  }
}

function openLoginModal() {
  document.getElementById('login-modal-overlay').style.display = 'flex';
  document.getElementById('login-error').classList.add('hidden');
  document.getElementById('login-username').value = '';
  document.getElementById('login-password').value = '';
}

function closeLoginModal() {
  document.getElementById('login-modal-overlay').style.display = 'none';
}

function doLogin(e) {
  e.preventDefault();
  let username = document.getElementById('login-username').value.trim();
  let password = document.getElementById('login-password').value;
  let found = users.find(u => u.username === username && u.password === password);

  if (found) {
    let info = { username: found.username, name: found.name };
    localStorage.setItem('sakibsmart_user', JSON.stringify(info));
    showLoginUI(info);
    closeLoginModal();
    showToast('Welcome, ' + found.name + '! 👋');
  } else {
    document.getElementById('login-error').classList.remove('hidden');
  }
}

function logout() {
  localStorage.removeItem('sakibsmart_user');
  showLoginUI(null);
  showToast('Logged out.');
}
