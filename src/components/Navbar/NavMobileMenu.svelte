<script>
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  
  export let navItems = [];
  export let isOpen = false;
  
  const dispatch = createEventDispatcher();
  
  function closeMenu() {
    dispatch('close');
  }
  
  function handleBackgroundClick(event) {
    if (event.target === event.currentTarget) {
      closeMenu();
    }
  }
  
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeMenu();
    }
  }
</script>

{#if isOpen}
  <div 
    class="mobile-menu-background" 
    on:click={handleBackgroundClick}
    on:keydown={handleKeydown}
    transition:fade={{ duration: 300 }}
    role="button"
    tabindex="0"
  >

    <div 
      class="mobile-menu"
      transition:fly={{ y: -300, duration: 300, delay: 0 }}
      role="navigation"
      aria-label="Mobile navigation menu"
    >

      <div class="mobile-menu-header">
        <h2>Menu</h2>
        <button 
          class="close-button" 
          on:click={closeMenu}
          aria-label="Close menu"
        >
          ×
        </button>
      </div>
      
      <div class="mobile-menu-items">
        {#each navItems as item, index}
          <a 
            href={item.href} 
            class="mobile-nav-link"
            on:click={closeMenu}
            style="--item-delay: {index * 0.05}s"
          >
            {item.label}
          </a>
        {/each}
      </div>
    </div>
  </div>
{/if}

<style>
  .mobile-menu-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 150vw;
    height: 150vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    backdrop-filter: blur(2px);
  }
  
  .mobile-menu {
    position: absolute;
    top: 0;
    left: 0;
    width: 150%;
    min-height: 300px;
    max-height: 70vh;
    background: var(--background-color, linear-gradient(
      135deg,
      rgba(20, 20, 30, 0.95) 0%,
      rgba(40, 40, 60, 0.95) 50%,
      rgba(60, 60, 90, 0.95) 100%
    ));
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  }
  
  .mobile-menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 1.5rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .mobile-menu-header h2 {
    color: var(--text-color, white);
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .close-button {
    background: none;
    border: none;
    color: var(--text-color, white);
    font-size: 2rem;
    cursor: pointer;
    padding: 0;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
    line-height: 1;
  }
  
  .close-button:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: rotate(90deg);
  }
  
  .mobile-menu-items {
    flex: 1;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    overflow-y: auto;
  }
  
  .mobile-nav-link {
    display: block;
    padding: 1rem 1.5rem;
    color: var(--text-color, rgba(255, 255, 255, 0.9));
    text-decoration: none;
    font-size: 1.1rem;
    font-weight: 500;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
    position: relative;
    overflow: hidden;
    animation: slideInFromTop 0.4s ease var(--item-delay) both;
  }
  
  .mobile-nav-link::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.6s ease;
  }
  
  .mobile-nav-link:hover {
    color: var(--text-color, white);
    background-color: rgba(255, 255, 255, 0.1);
    border-left-color: #00ff88;
    transform: translateX(0.5rem);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
  
  .mobile-nav-link:hover::before {
    left: 100%;
  }
  
  .mobile-nav-link:active {
    transform: translateX(0.25rem);
    background-color: rgba(255, 255, 255, 0.15);
  }
  
  @keyframes slideInFromTop {
    from {
      opacity: 0;
      transform: translateY(-2rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 480px) {
    .mobile-menu {
      max-height: 80vh;
    }
    
    .mobile-menu-header {
      padding: 1rem 1rem 0.75rem;
    }
    
    .mobile-nav-link {
      padding: 0.875rem 1rem;
      font-size: 1rem;
    }
  }
  
  @media (min-height: 600px) {
    .mobile-menu {
      max-height: 60vh;
    }
  }
</style>