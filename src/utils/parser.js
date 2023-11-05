// linkUtils.js

export function convertURLsToLinks(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
  
    return parts.map((part, index) => {
      if (index % 2 === 0) {
        // No es una URL, mantener el texto sin cambios
        return part;
      } else {
        // Es una URL, crear un hipervínculo
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer">
            {part}
          </a>
        );
      }
    });
  }
  