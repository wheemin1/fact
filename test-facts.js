// Simple test script to verify facts loading
console.log('Testing facts loading...');

fetch('http://localhost:5173/facts-enhanced.json')
  .then(response => {
    console.log('Response status:', response.status);
    return response.json();
  })
  .then(data => {
    console.log('Facts loaded successfully!');
    console.log('Total facts:', data.facts?.length || 0);
    console.log('First fact:', data.facts?.[0]);
    console.log('Categories:', data.metadata?.categories?.map(c => c.name));
  })
  .catch(error => {
    console.error('Error loading facts:', error);
  });
