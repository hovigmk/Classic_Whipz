module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt(amount).toLocaleString();
  },
  format_deposit_amount: (depositAmount) => {
    // format amount for deposit amount of 10% of sale price
    
    return depositAmount = (depositAmount * 10);
  },
  format_deposit: (depositAmount) => {
    // format amount for deposit amount of 10% of sale price for show page
    depositAmount = (depositAmount / 10);
    return parseInt(depositAmount).toLocaleString();
  },

  
};
