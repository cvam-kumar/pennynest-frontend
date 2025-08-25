export const prepareFinanceLineChart = (transactions) => {
  const groupedByDay = {};

  transactions.forEach(tx => {
    const dateObj = new Date(tx.date);
    const dayKey = dateObj.toISOString().slice(0, 10); // "YYYY-MM-DD"

    const day = dateObj.getDate();
    const suffix =
      day % 10 === 1 && day !== 11 ? 'st' :
      day % 10 === 2 && day !== 12 ? 'nd' :
      day % 10 === 3 && day !== 13 ? 'rd' : 'th';

    const monthLabel = `${day}${suffix} ${dateObj.toLocaleString('default', { month: 'short' })}`;

    if (!groupedByDay[dayKey]) {
      groupedByDay[dayKey] = {
        date: dayKey,
        month: monthLabel,
        totalAmount: 0,
        items: [],
      };
    }

    groupedByDay[dayKey].items.push(tx);
    groupedByDay[dayKey].totalAmount += tx.amount;
  });

  return Object.values(groupedByDay).sort((a, b) => a.date.localeCompare(b.date));
}
