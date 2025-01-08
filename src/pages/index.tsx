import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

import Board from "@/components/card_board";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Open when...</h1>
      <p>Welcome!</p>
      <button className="custom-button-class">Write a letter</button>
      <Board></Board>
    </div>
  );
}
