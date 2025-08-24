<script>
  import { onMount, onDestroy } from 'svelte';
  import NavButton from './NavButton.svelte';
  import { initNavbarBg, destroyNavbarBg } from './Navbar_bg.ts';
  
  import logoImage from '../../assets/logo.webp';
  export let navItems = [
    { href: '/', label: 'Overview', bgColor: 'rgba(255, 100, 180, 0.4)', hoverTextColor: '#b8004d' },
    { href: '/map', label: 'Convert Map', bgColor: 'rgba(50, 200, 255, 0.4)', hoverTextColor: '#003f66' },
    { href: '/changelog', label: 'Changelog', bgColor: 'rgba(255, 180, 50, 0.4)', hoverTextColor: '#663300' }
  ];

  onMount(
    initNavbarBg
  );

  onDestroy(
    destroyNavbarBg
  );
</script>

<nav id="main-nav">
  <canvas id="navbar_bg"></canvas>
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

  {#each navItems as item}
    <NavButton 
      href={item.href} 
      bgColor={item.bgColor} 
      class="nav-link"
    >
      {item.label}
    </NavButton>
  {/each}
  
  <div class="underline"></div>
</nav>

<style>
  :root {
    --navbar-transition-duration: 0.5s;
  }

  nav {
    margin-left: -1rem !important;
    display: flex;
    position: relative;
    overflow: hidden;
    background-color: var(--navbar-color);
    transition: background-color var(--navbar-transition-duration) ease !important;
    will-change: background-color;
    z-index: 2;
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

  .logo-container {
    position: absolute;
    right: 0; 
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 0;
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
    background-color: #07070759;
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

  :global(.nav-button:first-child) {
    position: relative;
    z-index: 1;
  }

  :global(.nav-button) {
    position: relative;
    z-index: 1;
  }
</style>