import { cn } from "@/lib/utils"; // import cn function từ module "@/lib/utils", có thể được sử dụng để điều kiện hoá tên lớp
import { ReactNode } from "react"; // import ReactNode từ thư viện React, đại diện cho một phần tử JSX hợp lệ 

// Định nghĩa một components hàm có tên là "MaxWidthWrapper"
const MaxWidthWrapper = ({ 
  className,
  children,
}: {
  className?: string; // Khai báo một prop "className" là tuỳ chọn và kiểu string
  children: ReactNode; // Khai báo một prop "children" có kiểu ReactNode đại diện cho các phần tử JSX hợp lệ
}) => {
  // Trả về JSX để bọc các phần tử con vào bên trong một div với các class nhất định.
  return (
    <div
      // Sử dụng hàm cn để nối các tên lớp theo điều kiện 
      className={cn(
        "h-full mx-auto w-full max-w-screen-xl px-2.5 md:px-20",
        className
      )}
    >
      {/* Hiển thị các phần tử con được truyền vào component  */}
      {children}
    </div>
  );
};
// Xuất component "MaxWidthWrapper" như là một export mặc định.
export default MaxWidthWrapper;
