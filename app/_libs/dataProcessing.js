
export const formatDate = (dateObject, options = null, removeColons=false) => {
  /* 
  To get the day of the week, options can be set to 
  `{ weekday: 'narrow' }`, { weekday: 'short' }, { weekday: 'long' }
  
  To get the month, options are:
  `{month: 'long'}`, `{month: 'short'}`
  
  To show time in 24-hour format, include `hour12: false` in the `options` object.
  
  To get the format as YYYY-MM-DD HH:MM:SS, options would be 
  {
  year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }

  To get a human readable timestamp that can be used as a filename, use `options = 'filename'`
  */
  
  // format a date to the "MM/DD/YYYY" by default
  if (options === null) {
    options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  } else if (options == 'filename') {
    removeColons = true;
    options = {
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }
  } else if (options == 'readable timestamp') {
    options = {
      year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    }
  }
  let formattedDate = dateObject.toLocaleDateString('en-CA', options) // format the date to string
  .replace(/,/g, ''); // remove commas
  if (removeColons) {
    formattedDate = formattedDate.replace(/:/, '').replace(/:/, '_').replace(/ /, '_')
  }
  
  return formattedDate
}