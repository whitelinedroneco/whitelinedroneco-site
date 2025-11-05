/*
 * WhiteLine Drone Co. JavaScript
 *
 * Handles mobile navigation toggling, dynamic year injection,
 * and asynchronous Formspree submission for the contact form.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('nav ul');
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      navList.classList.toggle('open');
    });
  }

  // Set current year in footer
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    const now = new Date();
    yearSpan.textContent = now.getFullYear();
  }

  // Handle contact form submission via fetch to Formspree
  const contactForm = document.getElementById('contact-form');
  const statusMessage = document.getElementById('status-message');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (statusMessage) {
        statusMessage.textContent = 'Sending…';
      }
      const formData = new FormData(contactForm);
      try {
        const response = await fetch(contactForm.action, {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: formData
        });
        if (response.ok) {
          if (statusMessage) {
            statusMessage.textContent = 'Thank you! Your message has been sent.';
            statusMessage.style.color = '#1e90ff';
          }
          contactForm.reset();
        } else {
          const data = await response.json();
          if (statusMessage) {
            statusMessage.textContent = data.error || 'Oops! Something went wrong.';
            statusMessage.style.color = '#ff6b6b';
          }
        }
      } catch (err) {
        if (statusMessage) {
          statusMessage.textContent = 'Network error. Please try again later.';
          statusMessage.style.color = '#ff6b6b';
        }
      }
    });
  }
});