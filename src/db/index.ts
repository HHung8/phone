import { PrismaClient } from "@prisma/client"; // Nhập PrismaClient từ thư việt prisma/client

// Khai báo một biến toàn cục có tên là cachedPrisma
declare global {
  var cachedPrisma: PrismaClient;
}
// Khởi tạo một biến prisma
let prisma: PrismaClient;
// Kiểm tra xem chúng ta đang trong môi trường sản xuất
if (process.env.NODE_ENV === "production") {
  // Nếu đúng, tạo một thể hiển mới của PrismaClient
  prisma = new PrismaClient();
} else {
  // Nếu không, kiểm tra xem có thể hiện của PrismaClient đã được lưu trong bộ nhớ đệm chưa
  if (!global.cachedPrisma) {
    // Nếu không, tạo một thể hiện mới và lưu vào bộ nhớ đệm
    global.cachedPrisma = new PrismaClient();
  }
  // Gán prisma bằng thể hiện đã được lưu trong bộ nhớ đệm
  prisma = global.cachedPrisma;
}
// Xuất khẩu biến prisma dưới tên db

export const db = prisma;
