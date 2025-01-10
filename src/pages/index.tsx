import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

import Board from "@/components/card_board";
import LetterViewer from "@/components/letter_viewer";
import LetterEditor from "@/components/letter_editor";

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
    <div style={{ fontSize: 14, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Open when...</h1>
      <p>Available community-donated letter credits: </p>
      <p>Welcome!</p>
      <button className="custom-button-class"><Link href='/write_letter'>Write a letter</Link></button>
      <Board></Board>
      <LetterEditor></LetterEditor>
      <LetterViewer></LetterViewer>
    </div>
  );
}
