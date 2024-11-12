// Sample data arrays as given in the resources
const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];
const strategyArray = [
  {
    View: 'Bullish',
    Value: {
      '24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Bull Put Spread', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy1', 'Strategy1', 'SpreadStrategy', 'Bull Call Spread'],
      '02-May-2024': ['Bull Call Spread', 'Bull Call Spread', 'Bull Put Spread', 'Long Call', 'Long Call', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy2', 'Strategy1', 'Strategy2', 'Bull Call Spread'],
      '09-May-2024': ['Strategy Put', 'Strategy Call', 'Strategy Call', 'Strategy Call', 'Strategy Put']
    }
  },
  {
    View: 'Bearish',
    Value: {
      '24-Apr-2024': ['Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread', 'Long Put', 'Long Put', 'Long Put', 'Bear Call Spread'],
      '31-May-2024': ['Long Put', 'Long Put', 'Long Put', 'Long Put', 'Long Put'],
      '21-Jun-2024': ['Strategy3', 'Strategy3', 'Bear Put Spread', 'Strategy3', 'Long Put', 'Long Put']
    }
  },
  {
    View: 'RangeBound',
    Value: {
      '24-Apr-2024': ['Short Straddle', 'Short Strangle', 'Short Strangle', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy1', 'Strategy1', 'SpreadStrategy', 'Short Straddle'],
      '02-May-2024': ['Short Straddle', 'Short Straddle', 'Short Strangle', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Short Straddle'],
      '21-Jun-2024': ['Iron Condor', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Iron Condor']
    }
  },
  {
    View: 'Volatile',
    Value: {
      '02-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Long Straddle'],
      '09-May-2024': ['Long Straddle', 'Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Long Straddle'],
      '31-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle']
    }
  }
];

// Get references to DOM elements
const dateDropdown = document.getElementById('dateDropdown');
const strategiesContainer = document.getElementById('strategiesContainer');
const viewButtons = document.querySelectorAll('.view-btn');

let currentView = 'Bullish';
let currentDate = dateArray[0];

// Initialize date dropdown and view buttons
dateArray.forEach(date => {
  const option = document.createElement('option');
  option.value = date;
  option.textContent = date;
  dateDropdown.appendChild(option);
});

dateDropdown.value = currentDate;

// Event listener for view buttons
viewButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    viewButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    currentView = button.dataset.view;
    renderStrategies();
  });
});

// Event listener for date dropdown
dateDropdown.addEventListener('change', (e) => {
  currentDate = e.target.value;
  renderStrategies();
});

// Render strategies based on selected view and date
function renderStrategies() {
  strategiesContainer.innerHTML = '';
  const selectedViewData = strategyArray.find(item => item.View === currentView).Value;
  const strategies = selectedViewData[currentDate] || [];

  if (strategies.length === 0) {
    const emptyState = document.createElement('div');
    emptyState.className = 'empty-state';
    emptyState.textContent = `There are no strategies for ${currentDate}`;
    strategiesContainer.appendChild(emptyState);
  } else {
    const strategyCount = strategies.reduce((acc, strategy) => {
      acc[strategy] = (acc[strategy] || 0) + 1;
      return acc;
    }, {});

    for (const [strategy, count] of Object.entries(strategyCount)) {
      const card = document.createElement('div');
      card.className = 'strategy-card';
      card.textContent = `${strategy} • ${count} ${count > 1 ? 'Strategies' : 'Strategy'}`;
      strategiesContainer.appendChild(card);
    }
  }
}

// Initial render
renderStrategies();
