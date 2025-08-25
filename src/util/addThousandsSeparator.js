export const addThousandsSeparator = (num) => {
  if (num === null || num === undefined || isNaN(num)) {
    return '';
  } 
  // Convert the number to a string and split it into integer and decimal parts
  const [integerPart, decimalPart] = num.toString().split('.');

//   regex for indian numbering system
// It handles the first three digits, then every two digits after that.
const lastThreeDigits = integerPart.substring(integerPart.length-3);
const otherDigits = integerPart.substring(0, integerPart.length-3);
let amount = null;
if(otherDigits !== '') {
    amount = `${otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',')},${lastThreeDigits}${decimalPart ? `.${decimalPart}` : ''}`;
  }

  amount = `${integerPart}${decimalPart ? `.${decimalPart}` : ''}`;
  const indianRupeeFormat = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2
  }).format(amount);
  return indianRupeeFormat;
}
