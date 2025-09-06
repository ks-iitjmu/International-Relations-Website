// Former Deans Modal Functions
function openFormerDeansModal() {
  const modal = document.getElementById('formerDeansModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeFormerDeansModal() {
  const modal = document.getElementById('formerDeansModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeFormerDeansModal();
  }
});
