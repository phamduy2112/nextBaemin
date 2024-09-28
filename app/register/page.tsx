'use client'
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { login, register } from "../api/fetchApi";

const Page: React.FC = () => {
    const router = useRouter();
    const handleNavigate = () => {
       
          router.push('/login');
        
      };
      const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        tendn: '',
        phone: '',
        email: '',
        password: '',
      });
      const confirmPasswordRef = useRef<string>('');
      const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        confirmPasswordRef.current = e.target.value;
      };
      // Hàm xử lý khi người dùng thay đổi giá trị của các input
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
      const handleSubmit =async () => {
        // Kiểm tra dữ liệu hợp lệ trước khi gửi
        if (formData.password !== confirmPasswordRef.current) {
          alert("Mật khẩu và Nhập lại mật khẩu không khớp!");
          return;
        }
    
        // In ra dữ liệu dưới dạng object
        console.log('Dữ liệu đăng ký:', formData);
        const resp=await register(formData)
        if(resp.message=="Thành công !"){
            alert("Đăng kí thành công")
        }else{
            alert(resp.message)
        }
        // Sau khi đăng ký thành công có thể điều hướng đến trang đăng nhập
        // router.push('/login');
      };
      return (
        <>
          <div className="mt-28 w-1/3  bg-white border rounded-2xl flex flex-col p-5 gap-5 pb-8">
            <div className="flex justify-center items-center w-full text-beamin font-semibold text-[26px]">
              Đăng Kí
            </div>
            <div className="flex flex-row w-full gap-2">
              <Input
                placeholder="Họ"
                name="lastName"
                className="h-[40px]"
                value={formData.lastName}
                onChange={handleChange}
              />
              <Input
                placeholder="Tên"
                name="firstName"
                className="h-[40px]"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <Input
                placeholder="Tên đăng nhập"
                name="tendn"
                className="h-[40px]"
                value={formData.tendn}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <Input
                placeholder="Số điện thoại"
                name="phone"
                className="h-[40px]"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full gap-3">
              <Input
                placeholder="Email"
                name="email"
                className="h-[40px]"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col w-full ">
              <Input.Password
                placeholder="Mật khẩu"
                name="password"
                className="h-[40px]"
                value={formData.password}
                onChange={handleChange}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </div>
            <div className="flex flex-col w-full">
          <Input.Password
            placeholder="Nhập lại mật khẩu"
            className="h-[40px]"
            onChange={handleConfirmPasswordChange} // Chỉ cần cập nhật ref, không lưu vào state
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </div>
            <div className="flex flex-col w-full">
              <button
                className="w-full h-[40px] uppercase text-white bg-beamin rounded-lg"
                onClick={handleSubmit}
              >
                Đăng Kí
              </button>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span className="text-gray-600">Bạn đã có tài khoản?</span>
              <Link className="text-beamin cursor-pointer" href={"/login"}>
                Đăng nhập
              </Link>
            </div>
          </div>
        </>
      );
}
export default Page;