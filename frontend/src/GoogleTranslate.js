import React, { useEffect } from 'react';

const GoogleTranslate = ({variable}) => {
  useEffect(() => {
    try {
      // Hide the default Google Translate dropdown after a short delay
      const timeoutId = setTimeout(() => {
        const $googleDefaultDropdown = document.querySelector('.skiptranslate');
        if ($googleDefaultDropdown) {
          $googleDefaultDropdown.style.display = 'none';
        }
      }, 100);

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timeoutId);
    } catch (error) {
      // Suppress all errors
      // No operation is performed here to suppress errors
    }
  }, [variable]);

  return (
      <div id="google_translate_element"></div>
  );
};

export default GoogleTranslate;
