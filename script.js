const educationSelect = document.getElementById('education');
const networthSelect = document.getElementById('networth');
const casteSelect = document.getElementById('caste');
const skillsCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const ageRadios = document.querySelectorAll('input[type="radio"]');
const reputationCheckboxes = document.querySelectorAll('input[type="checkbox"]');
const submitButton = document.getElementById('submit');
const resultDiv = document.getElementById('result');

submitButton.addEventListener('click', calculatePrice);

function calculatePrice() {
  let price = 100; // Starting bid

  // Education
  const educationValue = educationSelect.value;
  if (educationValue === 'bachelor') {
    price *= 1.5;
  } else if (educationValue === 'college') {
    price *= 1.2;
  } else if (educationValue === 'high_school') {
    price *= 1.05;
  } else if (educationValue === 'middle_school') {
    price *= 0.9;
  }

  // Family Net Worth
  const networthValue = networthSelect.value;
  if (networthValue === 'upper_class') {
    price *= 2;
  } else if (networthValue === 'middle_class') {
    price *= 1.5;
  } else if (networthValue === 'lower_class') {
    price *= 1.2;
  }

  // Caste
  const casteValue = casteSelect.value;
  if (casteValue === 'brahmin') {
    price += 100;
  } else if (casteValue === 'kshatriya') {
    price += 50;
  } else if (casteValue === 'vaishya') {
    price += 20;
  } else if (casteValue === 'shudra') {
    price += 10;
  } else if (casteValue === 'varna') {
    price -= 50;
  }

  // Skills
  skillsCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      if (checkbox.value === 'musical_instrument') {
        price += 10;
      } else if (checkbox.value === 'cook') {
        price += 20;
      } else if (checkbox.value === 'easygoing') {
        price += 15;
      } else if (checkbox.value === 'sings') {
        price += 10;
      }
    }
  });

  // Age
  let ageCoefficient = 1;
  ageRadios.forEach(radio => {
    if (radio.checked) {
      if (radio.value === '1823') {
        ageCoefficient = 1.5;
      } else if (radio.value === '2427') {
        ageCoefficient = 1.2;
      } else if (radio.value === '28plus') {
        ageCoefficient = 0.95;
      }
    }
  });
  price *= ageCoefficient;

  // Reputation
  let reputationCoefficient = 1;
  reputationCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      if (checkbox.value === 'parents_attitude') {
        reputationCoefficient = 0.85;
      } else if (checkbox.value === 'character') {
        reputationCoefficient = 0.9;
      } else if (checkbox.value === 'general') {
        price -= 20; // Apply the -20 deduction for general gossip
      }
    }
  });
  price *= reputationCoefficient;

  // DOM Manipulations
  resultDiv.innerHTML = `<h2>Final Price: $${price.toFixed(2)}</h2>`;
  resultDiv.style.color = 'green';
  
  // Add a message if the price is below a certain threshold
  if (price < 150) {
    let messageDiv = document.createElement('div');
    messageDiv.textContent = 'This price is suspiciously low. Be cautious!';
    resultDiv.appendChild(messageDiv);
  }

  // Show a different message based on price range
  if (price > 500) {
    let priceAlert = document.createElement('p');
    priceAlert.textContent = 'Thats a hefty price! Are you sure?';
    priceAlert.style.color = 'red';
    resultDiv.appendChild(priceAlert);
  } 
}
