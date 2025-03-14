"use client";
import "../../globals.css";
import MenuSession from "@/components/social_mode/menu-session";
import { useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { toast } from "sonner";
import Cookies from "js-cookie";
let socket: Socket;

export default function SocialLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const userId = Cookies.get("userId");
    useEffect(() => {
        socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5000");
        socket.emit("joinRoom", userId);
        socket.on("notification", () => {
            toast.success("Bạn có một tin nhắn mới");
        });
    }, [userId]);
    return (
        <html lang="en">
            <body>
                <div className="flex bg-black min-h-screen">
                    <nav className="fixed left-0 top-0 h-screen w-64 bg-[#121212] border-r border-gray-800 p-4">
                        <h1 className="text-2xl font-bold text-white mb-8">Shop3Man</h1>
                        <MenuSession />
                    </nav>
                    {children}
                </div>
            </body>
        </html>
    );
}
