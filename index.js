// Get all the bundle buttons
  const bundleButtons = document.querySelectorAll('.bundle-button');

  // Function to handle button clicks
  function handleButtonClick(event) {
    const clickedButton = event.target;
    const isSelected = clickedButton.classList.contains('selected');

    // Remove 'selected' class and reset text for all buttons
    bundleButtons.forEach((button) => {
      button.classList.remove('selected');
      button.innerHTML = 'Add to cart';
    });

    // If the button was not already selected, mark it as selected
    if (!isSelected) {
      clickedButton.classList.add('selected');
      clickedButton.innerHTML = 'Added &#10003;'; // Checkmark symbol as HTML entity

      // Get the selected option from the data-option attribute
      const selectedOption = clickedButton.getAttribute('data-option');
      console.log('Selected option:', selectedOption);

      // Store the selected option in LocalStorage
      localStorage.setItem('selectedOption', selectedOption);
    } else {
      // The button was already selected, so we deselect it
      // Remove the selected option from LocalStorage
      localStorage.removeItem('selectedOption');
    }
  }

  // Function to load the selected option from LocalStorage and apply it on page load
  function loadSelectedOption() {
    const selectedOption = localStorage.getItem('selectedOption');
    if (selectedOption) {
      const buttonToSelect = document.querySelector(`[data-option="${selectedOption}"]`);
      if (buttonToSelect) {
        buttonToSelect.classList.add('selected');
        buttonToSelect.innerHTML = 'Added &#10003;'; // Checkmark symbol as HTML entity
      }
    }
  }

  // Add click event listener to each bundle button
  bundleButtons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
  });

  // Load the selected option on page load
  document.addEventListener('DOMContentLoaded', loadSelectedOption);
  
  
 /// Function to show or hide the selected item banner based on the selected option
  function updateSelectedItemBanner() {
    const selectedOption = localStorage.getItem('selectedOption');
    const selectedItemPopup = document.getElementById('selected-item-popup');
    const selectedItemText = document.querySelector('#selected-item-text');

    if (selectedOption) {
      selectedItemText.textContent = `Selected item: ${selectedOption}`;
      selectedItemPopup.style.display = 'block';
    } else {
      selectedItemPopup.style.display = 'none';
    }
  }

  // Call the function to show or hide the selected item banner on page load
  document.addEventListener('DOMContentLoaded', updateSelectedItemBanner);

  // Listen for changes in LocalStorage and update the banner accordingly
  window.addEventListener('storage', function (event) {
    if (event.key === 'selectedOption') {
      updateSelectedItemBanner();
    }
  });