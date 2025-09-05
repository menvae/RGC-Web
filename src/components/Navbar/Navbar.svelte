<script>
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';
  import NavButton from './NavButton.svelte';
  import MobileMenu from './NavMobileMenu.svelte';
  import { initNavbarBg, destroyNavbarBg } from './Navbar_bg.ts';
  
  import logoImage from '../../assets/logo.webp';
  
  export let navItems = [
    { href: '/', label: 'Overview', bgColor: 'rgba(255, 100, 180, 0.4)', hoverTextColor: '#b8004d' },
    { href: '/map', label: 'Convert Map', bgColor: 'rgba(50, 200, 255, 0.4)', hoverTextColor: '#003f66' },
    { href: '/changelog', label: 'Changelog', bgColor: 'rgba(255, 180, 50, 0.4)', hoverTextColor: '#663300' }
  ];

  let isMobile = writable(false);
  let isMenuOpen = writable(false);
  let particlesInitialized = false;

  function checkMobile() {
    const mobile = window.innerWidth < 768;
    isMobile.set(mobile);
    
    if (mobile && particlesInitialized) {
      destroyNavbarBg();
      particlesInitialized = false;
    } else if (!mobile && !particlesInitialized) {
      initNavbarBg();
    }
    
    if (!mobile) {
      isMenuOpen.set(false);
    }
  }

  function toggleMenu() {
    isMenuOpen.update(open => !open);
  }

  onMount(() => {
    checkMobile();
    
    if (!$isMobile) {
      initNavbarBg();
      particlesInitialized = true;
    }
    
    window.addEventListener('resize', checkMobile);
  });

  onDestroy(() => {
    if (particlesInitialized) {
      destroyNavbarBg();
    }
    window.removeEventListener('resize', checkMobile);
  });
</script>

<nav id="main-nav">
  {#if !$isMobile}
    <canvas id="navbar_bg"></canvas>
  {/if}

  <div id="navbar-gradient"></div>
  
  <div class="logo-container">
    <a href="/" class="logo-link" aria-label="Home">
      <img 
        id="logo-image" 
        src={logoImage.src} 
        alt="Site Logo" 
        width={logoImage.width} 
        height={logoImage.height}
      />
    </a>
  </div>

  {#if $isMobile}
    <button 
      class="hamburger-button" 
      class:active={$isMenuOpen}
      on:click={toggleMenu}
      aria-label="Toggle menu"
      aria-expanded={$isMenuOpen}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  {:else}
    {#each navItems as item}
      <NavButton 
        href={item.href} 
        bgColor={item.bgColor} 
        class="nav-link"
      >
        {item.label}
      </NavButton>
    {/each}
  {/if}
  
  <div class="underline"></div>
</nav>

{#if $isMobile}
  <MobileMenu 
    {navItems} 
    isOpen={$isMenuOpen}
    on:close={() => isMenuOpen.set(false)}
  />
{/if}

<style>
  :root {
    --navbar-transition-duration: 0.5s;
  }

  nav {
    margin-left: -1rem;
    display: flex;
    position: relative;
    overflow: hidden;
    background-color: var(--navbar-color);
    transition: background-color var(--navbar-transition-duration) ease;
    will-change: background-color;
    z-index: 2;
    min-height: 60px;
  }

  @media (max-width: 1056px) {
    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      width: 100vw;
      margin-left: 0;
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      height: 60px;
      z-index: 9999;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
  }

  @media (max-width: 768px) {
      nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        width: 100vw;
        margin-left: 0;
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        height: 60px;
        z-index: 9999;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }
    }

  #navbar_bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
  }

  #navbar-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.1) 60%,
      rgba(0, 0, 0, 0.4) 100%
    );
    mix-blend-mode: multiply;
  }

  @media (max-width: 767px) {
    #navbar-gradient {
      background: linear-gradient(
        to bottom,
        transparent 0%,
        rgba(0, 0, 0, 0.05) 60%,
        rgba(0, 0, 0, 0.2) 100%
      );
    }
  }

  .logo-container {
    position: absolute;
    right: 0; 
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 3;
  }

  .logo-link {
    right: 0.5rem;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80%;
    aspect-ratio: 1;
    padding: 0 0.5rem;
  }

  .logo-container::before {
    content: " ";
    position: absolute;
    right: 0;
    width: 30rem;
    height: 100%;
    background: var(--logo-gradient);
    z-index: -1;
    border-radius: 4px; 
    filter:
      opacity(1)
      saturate(2)
      contrast(2);
    pointer-events: none;
  }

  #logo-image {
    background-color: #ffffff3f;
    padding: 0.4rem;
    border-radius: 5px;
    height: 80%;
    width: auto;
    object-fit: contain;
    pointer-events: none;
  }

  .underline {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background-color: rgb(0, 255, 0);
    transition: all 0.3s ease;
    z-index: 1;
  }

  .hamburger-button {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    z-index: 3;
    padding: 0.25rem;
  }

  .hamburger-button span {
    display: block;
    width: 120%;
    height: 3.5px;
    background-color: var(--text-color);
    transition: all 0.3s ease;
    transform-origin: center;
  }

  .hamburger-button.active span:nth-child(1) {
    transform: rotate(45deg) translate(0.337rem, 0.375rem);
  }

  .hamburger-button.active span:nth-child(2) {
    opacity: 0;
  }

  .hamburger-button.active span:nth-child(3) {
    transform: rotate(-45deg) translate(0.337rem, -0.375rem);
  }

  @media (max-width: 767px) {
    .logo-container {
      right: 0;
      height: 60px;
      z-index: 3;
    }
    
    .logo-link {
      right: 0.5rem;
      height: 70%;
    }
    
    .underline {
      background-color: #00ff88;
      height: 2px;
    }
  }

  :global(.nav-button:first-child) {
    position: relative;
    z-index: 1;
  }

  :global(.nav-button) {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 767px) {
    :global(.nav-button) {
      display: none;
    }
  }
</style>