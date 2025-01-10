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
      <h1>open when...</h1>
      <p>available community-donated letter credits: </p>
      <p>welcome!</p>
      <Board></Board>
      <LetterEditor></LetterEditor>
      <LetterViewer prompt="you're feeling sad" author_name="grace" author_location="here" created_date="now" letter_body="sorry to hear that"></LetterViewer>
    </div>
  );
}
