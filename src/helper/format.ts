export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

export const formatDate = (date: Date | string | number): string => {
  if (!date) return 'N/A';
  
  const d = new Date(date);
  if (isNaN(d.getTime())) return 'Invalid Date';

  const pad = (num: number) => num.toString().padStart(2, '0');

  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const seconds = pad(d.getSeconds());
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1); // Tháng trong JS bắt đầu từ 0
  const year = d.getFullYear();

  return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};

export const timeRemaining = (targetTime: string | Date) => {
  const now = new Date();
  const targetDate = new Date(targetTime); // Hỗ trợ cả chuỗi và đối tượng Date

  const diff = targetDate.getTime() - now.getTime();
  const isPast = diff < 0;
  const diffAbs = Math.abs(diff);

  const minutes = Math.floor(diffAbs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (minutes < 60) {
    return `${minutes} phút ${isPast ? "trước" : "còn lại"}`;
  } else if (hours < 24) {
    return `${hours} giờ ${isPast ? "trước" : "còn lại"}`;
  } else {
    return `${days} ngày ${remainingHours > 0 ? `${remainingHours} giờ` : ""} ${isPast ? "trước" : "còn lại"}`;
  }
};



