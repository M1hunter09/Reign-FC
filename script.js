// script.js

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Scroll-reveal
const sections = document.querySelectorAll('section, footer');
const obsOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, obsOptions);

const webhookURL = 'https://discord.com/api/webhooks/1400857469051474112/KCBv-xpwkRiZlVl67-nzy-hPo80KTu94yP8zrFKzlj6n7TtbzUkWYiz9H07nckPk6nle'; 

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.querySelector('input[placeholder="Team Name"]').value.trim();
  const email = document.querySelector('input[placeholder="Contact Email"]').value.trim();
  const message = document.querySelector('textarea').value.trim();

  if (!name || !email || !message) {
    alert('Please fill out all fields.');
    return;
  }

  const payload = {
  embeds: [{
    title: 'New League Application',
    color: 0x1e90ff,
    fields: [
      { name: 'Team Name', value: name, inline: false },
      { name: 'Contact Email', value: email, inline: false },
      { name: 'Descritpion', value: message, inline: false }
    ],
    timestamp: new Date()
  }]
};


  fetch(webhookURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  .then(res => {
    if (res.ok) {
      alert('Submitted! Your message was sent to the league.');
      document.getElementById('contactForm').reset();
    } else {
      alert('Failed to submit. Try again later.');
    }
  })
  .catch(err => {
    console.error('Error:', err);
    alert('Something went wrong. Try again later.');
  });
});


sections.forEach(sec => {
  sec.classList.add('hidden');
  observer.observe(sec);
});
