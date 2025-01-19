export const convertTexttoTimestamp = (text, format = "dd/mm/yyyy") => {
  // Tách các phần của ngày tháng từ text
  const parts = text.split(/[\/\-\.]/); // Hỗ trợ các dấu phân cách: /, -, .
  const formatParts = format.split(/[\/\-\.]/);

  // Tạo đối tượảng ngày tháng
  let datetime = new Date();

  for (let i = 0; i < formatParts.length; i++) {
      switch (formatParts[i]) {
          case 'dd':
              datetime.setDate(parseInt(parts[i]));
              break;
          case 'mm':
              datetime.setMonth(parseInt(parts[i]) - 1); // Tháng trong JavaScript bắt đầu từ 0
              break;
          case 'yyyy':
              datetime.setFullYear(parseInt(parts[i]));
              break;
          default:
              return "Lỗi: Định dạng ngày tháng không hợp lệ.";
      }
  }

  return datetime.getTime();
}