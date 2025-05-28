// todo: maybe implement caching for pages?

const outTransition = 'slide-out-left';
const inTransition = 'slide-in-left';

let currentPath = window.location.pathname;
let previousPath = currentPath;

async function switchPage(href: string): Promise<void> {
  return new Promise(async (resolve, reject) => {
      const mainContent = document.querySelector('main');
      if (!mainContent) {
          reject(new Error('Main content not found'));
          return;
      }

      fetch(href)
          .then((response: Response) => {
              if (!response.ok) {
                  throw new Error(`Failed to fetch ${href}: ${response.statusText}`);
              }
              return response.text();
          })
          .then((html: string) => {
              const parser = new DOMParser();
              const doc = parser.parseFromString(html, 'text/html');
              
              const newContent = doc.querySelector('main');
              const newStyles = doc.querySelectorAll('link[rel="stylesheet"], style');
              const newSubtitleMeta = doc.querySelector('meta[name="page-subtitle"]');
              const newTitle = doc.querySelector('title');

              if (!newContent) {
                  reject(new Error('New content not found in the fetched HTML'));
                  return;
              }

              const scrollPosition = window.scrollY;
              mainContent.innerHTML = newContent.innerHTML;

              if (newSubtitleMeta) {
                  const subtitle = newSubtitleMeta.getAttribute('content') || '';
                  const currentSubtitleMeta = document.querySelector('meta[name="page-subtitle"]');
                  
                  if (currentSubtitleMeta) {
                      currentSubtitleMeta.setAttribute('content', subtitle);
                  } else {
                      const meta = document.createElement('meta');
                      meta.name = 'page-subtitle';
                      meta.content = subtitle;
                      document.head.appendChild(meta);
                  }

                  document.title = `RGC${subtitle ? ` - ${subtitle}` : ''}`;
              } else if (newTitle) {
                  document.title = newTitle.text || document.title;
              }

              const dynamicStyleSelector = 'link[rel="stylesheet"][data-dynamic], style[data-dynamic]';
              document.querySelectorAll(dynamicStyleSelector).forEach(style => style.remove());

              newStyles.forEach(style => {
                  const clone = style.cloneNode(true) as HTMLLinkElement;
                  clone.setAttribute('data-dynamic', 'true');

                  if (clone instanceof HTMLLinkElement) {
                      clone.onload = () => resolve();
                      clone.onerror = () => reject(new Error(`Failed to load stylesheet: ${clone.href}`));
                  }
                  
                  document.head.appendChild(clone);
              });

              const scripts = Array.from(mainContent.querySelectorAll('script'));
              scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                
                if (oldScript.src) {
                    newScript.src = oldScript.src;
                } else {
                    const content = oldScript.textContent?.trim();
                    if (content) {
                       newScript.textContent = content.startsWith('(') || content.startsWith('function') ? 
                        content : `(function(){${content}})();`;
                    }
                    
                }
        
                Array.from(oldScript.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                
                oldScript.parentNode?.replaceChild(newScript, oldScript);
});

              window.scrollTo(0, scrollPosition);
              document.dispatchEvent(new CustomEvent('page:changed', {
                  detail: { href }
              }));

              resolve();
          })
          .catch((error: Error) => {
              console.error('Page switch failed:', error);
              window.location.href = href;
              reject(error);
          });
  });
}

async function applyTransition(
  href: string,
  interval: number = 50
): Promise<void> {
  const mainContent = document.querySelector('main');
  if (!mainContent) return;

  const isTransitionElement = (el: HTMLElement) => 
    el.tagName !== 'SCRIPT' && !el.hasAttribute('data-no-transition');

  const currentElements = [...mainContent.children] as HTMLElement[];
  const allCurrentElements = currentElements.flatMap(element => [
    ...(isTransitionElement(element) ? [element] : []),
    ...Array.from(element.children)
      .filter(el => isTransitionElement(el as HTMLElement)) as HTMLElement[]
  ]);

  allCurrentElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add(outTransition);
    }, index * interval);
  });

  await Promise.all(
    allCurrentElements.map(element => 
      new Promise<void>(resolve => {
        element.addEventListener('animationend', () => resolve(), { once: true });
      })
    )
  );

  await switchPage(href);

  const newElements = [...mainContent.children] as HTMLElement[];
  const allNewElements = newElements.flatMap(element => [
    ...(isTransitionElement(element) ? [element] : []),
    ...Array.from(element.children)
      .filter(el => isTransitionElement(el as HTMLElement)) as HTMLElement[]
  ]);

  allNewElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateX(100%)';
  });

  // force reflow
  mainContent.offsetHeight;

  allNewElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add(inTransition);
      void element.offsetWidth;
    }, index * interval);
  });


  let completedAnimations = 0;
  await Promise.all(
    allNewElements.map(element => 
      new Promise<void>(resolve => {
        element.addEventListener('animationend', () => {
          completedAnimations++
          if (completedAnimations === 1) {document.dispatchEvent(new CustomEvent('page:transitionend'));}
          resolve()
        }, { once: true });
      })
    )
  );

  // clean up
  allNewElements.forEach(element => {
    element.classList.remove(inTransition);
    element.style.removeProperty('opacity');
    element.style.removeProperty('transform');
  });

}

function handleNavigation(
  href: string,
): void {
  previousPath = currentPath;
  currentPath = href;

  window.history.pushState({}, '', href);

  if (currentPath !== previousPath) {
    applyTransition(href, 50);
  }
}

document.addEventListener('click', (event: MouseEvent) => {
  const target = (event.target as HTMLElement).closest('a');
  if (!target) return;

  const href = target.getAttribute('href');
  if (!href) return;

  const isExternalLink = target.hostname !== window.location.hostname;
  if (isExternalLink) {
    return;
  }

  event.preventDefault();

  handleNavigation(href);
});

window.addEventListener('popstate', () => {
  const newPath = window.location.pathname;

  previousPath = currentPath;
  currentPath = newPath;

  if (currentPath !== previousPath) {
    applyTransition(currentPath, 10);
  }
});



