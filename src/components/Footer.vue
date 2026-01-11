<script setup lang="ts">
</script>

<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Todo App</h3>
        <p>A simple and efficient todo list application.</p>
      </div>
      <div class="footer-section">
        <h3>Links</h3>
        <ul>
          <li><a href="#">My Portfolio</a></li>
          <li><a href="#">GitHub</a></li>
          <li><a href="#">LinkedIn</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 My Todo App. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: #f5f5f5;
  border-top: 1px solid #e0e0e0;
  margin-top: auto;
  padding: 2rem 0 0;
  width: 100%;
}

.footer-content {
  display: flex;
  gap: 3rem;
  justify-content: center;
  max-width: 100%;
  margin: 0;
  padding: 2rem 1rem;
}

.footer-section {
  flex: 1;
  max-width: 300px;
}

.footer-section h3 {
  margin-bottom: 1rem;
  color: #333;
}

.footer-section p {
  color: #666;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #1976d2;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: #1565c0;
  text-decoration: underline;
}

.footer-bottom {
  background-color: #e0e0e0;
  padding: 1rem;
  text-align: center;
  color: #666;
  font-size: 0.9rem;
  width: 100%;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 1.5rem;
  }

  .footer-section {
    max-width: 100%;
  }
}
</style>
