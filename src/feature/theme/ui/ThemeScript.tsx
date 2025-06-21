export default function ThemeScript() {
  const themeScript = `
    (function() {
      try {
        const theme = localStorage.getItem('theme') || 'light';
        const isDark = theme === 'dark';
        
        document.documentElement.classList.toggle('dark', isDark);
      } catch (e) {
        document.documentElement.classList.remove('dark');
      }
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: themeScript }} />;
}
