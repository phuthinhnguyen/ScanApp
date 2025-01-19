export const convertTimestamptoText = (timestamp, format = "dd/MM/yyyy") => {
   // Tạo đối tượng Date từ timestamp
   const datetime = new Date(timestamp);

   // Lấy các thành phần ngày, tháng, năm
   const day = datetime.getDate();
   const month = datetime.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0
   const year = datetime.getFullYear();

   // Định dạng kết quả
   let result = format
       .replace("dd", day.toString().padStart(2, '0'))
       .replace("MM", month.toString().padStart(2, '0'))
       .replace("yyyy", year.toString());

   return result;
}