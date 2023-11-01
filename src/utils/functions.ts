export function formatRelativeDateTime(inputDate: string): string {
    const currentDate = new Date();
    const inputDateTime = new Date(inputDate);

    const timeDifference = currentDate.getTime() - inputDateTime.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference === 0) {
      return 'Сегодня ' + inputDateTime.toLocaleTimeString(undefined, { timeZoneName: 'short' });
    } else if (daysDifference === 1) {
      return 'Вчера ' + inputDateTime.toLocaleTimeString(undefined, { timeZoneName: 'short' });
    } else {
      const pluralForm = daysDifference > 1 && daysDifference < 5 ? 'дня' : 'дней';
      return `${daysDifference} ${pluralForm} назад ` + inputDateTime.toLocaleTimeString(undefined, { timeZoneName: 'short' });
    }
  }