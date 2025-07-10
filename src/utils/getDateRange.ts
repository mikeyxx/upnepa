export const getDateRangeFromFilter = (filter: string) => {
  const now = new Date();

  switch (filter) {
    case "today": {
      const start = new Date(now);
      start.setHours(0, 0, 0, 0);

      const end = new Date(now);
      end.setHours(23, 59, 59, 999);

      return {
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      };
    }

    case "week": {
      const start = new Date(now);
      start.setDate(now.getDate() - 7);
      start.setHours(0, 0, 0, 0);

      const end = new Date(now);
      end.setHours(23, 59, 59, 999);

      return {
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      };
    }

    case "month": {
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      start.setHours(0, 0, 0, 0);

      const end = new Date(now);
      end.setHours(23, 59, 59, 999);

      return {
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      };
    }

    default:
      return {};
  }
};
