"use client"; // Khai báo đoạn mã này sẽ được sử dụn trên phía client (trình duyệt)
import { HTMLAttributes, useEffect, useRef, useState } from "react"; // Import các module và hook cần thiết từ thư viện React
import MaxWidthWrapper from "./MaxWidthWrapper"; // Import compoent MaxWidthWraper từ file local
import { useInView } from "framer-motion"; // Import hook useInView từ thư viện framer-motion
import { cn } from "@/lib/utils"; // Import hàm cn từ utils local
import Phone from "./Phone"; // Import components Phone từ file local

// Mảng chứa đường dẫn đến các ảnh đáng giá từ người dùng
const PHONES = [
  "/testimonials/1.jpg",
  "/testimonials/2.jpg",
  "/testimonials/3.jpg",
  "/testimonials/4.jpg",
  "/testimonials/5.jpg",
  "/testimonials/6.jpg",
];

function splitArray<T>(array: Array<T>, numParts: number) { // Hàm để chia một mảng thành số phần được chỉ định
  const result: Array<Array<T>> = [];

  for (let i = 0; i < array.length; i++) { // Duyệt qua từng phần tử trong mảng
    const index = i % numParts; // Tính chỉ số của phần
    if (!result[index]) { // Nếu phần chửa tồn tại
      result[index] = []; // Tạo một phần mới
    }
    result[index].push(array[i]); // Thêm phần tử vào phần tương ứng
  }
  return result; // Trả về mảng đã chia
}

function ReviewColumn({ // Component để hiển thị một cột của các đánh giá
  reviews,
  className,
  reviewClassName,
  msPerPixel = 0,
}: {
  reviews: string[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel?: number;
}) {
  const columnRef = useRef<HTMLDivElement | null>(null); // refrence cho cột
  const [columnHeight, setColumnHeight] = useState(0); // State để theo dõi chiều cao của cột
  const duration = `${columnHeight * msPerPixel}ms`; // Tính thời gian dựa trên chiều cao và ms per pixel

  useEffect(() => { //Effect để theo dõi thay đổi chiều cao của cột
    if (!columnRef.current) return; // Nếu không có refrence, thoát
    const resizeObserver = new window.ResizeObserver(() => {// Tạo một ResizeObserver
      setColumnHeight(columnRef.current?.offsetHeight ?? 0); // Cập nhật chiều cao khi có thay đổi
    });
    resizeObserver.observe(columnRef.current); //Bắt đầu quan sát
    return () => { // Cleanup effect
      resizeObserver.disconnect(); // Ngừng quan sát khi compoent bị unmount
    };
  }, []); // Chạy effect chỉ một lần khi component được mount

  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 py-4", className)} // Gắn className và animation
      style={{ "--marquee-duration": duration } as React.CSSProperties} // Đặt duration. cho animation
    >
      {reviews.concat(reviews).map((imgSrc, reviewIndex) => ( // Hiển thị các đánh giá
        <Review
          key={reviewIndex}
          className={reviewClassName?.(reviewIndex % reviews.length)}
          imgSrc={imgSrc}
        />
      ))}
    </div>
  );
}
// Interface cho props của components Review
interface ReviewProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
}

function Review({ imgSrc, className, ...props }: ReviewProps) { // Component để hiển thị đánh giá
  const POSSIBLE_ANIMATION_DELAYS = [ // Các khoảng trễ có thể có cho animation
    "0s",
    "0.1s",
    "0.2s",
    "0.3s",
    "0.4s",
    "0.5s",
  ];
  // Chọn ngẫu nhiên một khoảng trễ
  const animationDelay =
    POSSIBLE_ANIMATION_DELAYS[
      Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)
    ];

  return (
    <div
      className={cn( // Gắn classNam và animation
        "animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5",
        className
      )}
      style={{ animationDelay }} // Đặt thời gian trễ cho animation
      {...props}
    >
      {/* Hiển thị hình ảnh của đánh giá */}
      <Phone imgSrc={imgSrc} />
    </div>
  );
}

function ReviewsGrid() { // Component để hiển thị lưới các đánh giá
  const containerRef = useRef<HTMLDivElement | null>(null); // Refrence cho container
  const isInView = useInView(containerRef, { once: true, amount: 0.4 }); // Hook để xác định component có trong view không
  const columns = splitArray(PHONES, 3); // Chia mảng thành các cột
  // Lấy ra các cột và phần tử của mỗi cột
  const column1 = columns[0];
  const column2 = columns[1];
  const column3 = splitArray(columns[2], 2);

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3" // Layout của lưới
    >
      {isInView ? ( // Kiểm tra xem component có trong view không
        <>
          <ReviewColumn // Render các cột của đánh giá
            reviews={[...column1, ...column3.flat(), ...column2]}
            reviewClassName={(reviewIndex) => // Đặt className dựa trên vị trí của đánh gía trong lưới
              cn({
                "md-hidden": reviewIndex >= column1.length + column3[0].length,
                "lg:hidden": reviewIndex >= column1.length,
              })
            }
            msPerPixel={10} // Thời gian chuyển đổi của animation
          />
          <ReviewColumn
            reviews={[...column2, ...column3[1]]}
            className="hidden md:block"
            reviewClassName={(reviewIndex) =>
              reviewIndex >= column2.length ? "lg:hidden" : ""
            }
            msPerPixel={15}
          />
          <ReviewColumn
            reviews={column3.flat()}
            className="hidden md:block"
            msPerPixel={10}
          />
        </>
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100"  />
    </div>
  );
}

export function Reviews() {
  return (
    <MaxWidthWrapper className="relative max-w-5xl">
      <img
        src="/what-people-are-buying.png"
        className="absolute select-none hidden xl:block -left-32 top-1/3"
      />
      <ReviewsGrid />
    </MaxWidthWrapper>
  );
}
