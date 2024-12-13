export default function formatDate(dateString) {
    const date = new Date(dateString);
  
    // Extract hour and minute
    let hours = date.getHours();
    let minutes = date.getMinutes();
    
    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // If hours is 0, make it 12
  
    // Format minutes (pad with leading zero if needed)
    minutes = minutes < 10 ? '0' + minutes : minutes;
  
    // Format date (YYYY-MM-DD)
    const formattedDate = date.toISOString().slice(0, 10); // "2024-12-12"
    
    // Combine everything into the desired format
    const formattedTime = `${hours}:${minutes} ${ampm}, ${formattedDate}`;
    
    return formattedTime;
  }
  