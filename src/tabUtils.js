/**
 * Função para ativar a aba clicada.
 * @param {string} activeClass - Classe que será adicionada à aba ativa.
 * @param {string} inactiveClass - Classe que será adicionada às abas inativas.
 */
export function handleTabClick(activeClass, inactiveClass, elementSelector) {
    const tabs = document.querySelectorAll(elementSelector); // Usar um seletor específico
  
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove a classe de aba ativa de todas as abas
        tabs.forEach((t) => {
          t.classList.remove(...activeClass.split(" "));
          t.classList.add(...inactiveClass.split(" "));
        });
  
        // Adiciona a classe de aba ativa no elemento clicado
        tab.classList.remove(...inactiveClass.split(" "));
        tab.classList.add(...activeClass.split(" "));
      });
    });
  }
  
  