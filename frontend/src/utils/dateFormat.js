export function formatDate(dateString) {
  if (!dateString) return 'Date Pending';
  try {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return dateString;
  }
}

export function getUrgencyBadge(urgency) {
  switch (urgency) {
    case 'overdue':
      return { text: 'Overdue', color: 'badge-danger' };
    case 'urgent':
      return { text: 'Urgent (< 30d)', color: 'badge-warning' };
    default:
      return { text: 'Upcoming', color: 'badge-info' };
  }
}
