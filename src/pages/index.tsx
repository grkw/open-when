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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>open when...</h1>
      <p>welcome!</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '90%' }}>
        <div style={{ flex: '1 1 50%' }}>
          <Board />
        </div>
        <div style={{ flex: '1 1 50%' }}>
          <h2> <button>browse open letters</button> <button>write a letter</button> <button>open a new letter</button></h2>
        </div>
      </div>
      <LetterViewer is_browser={true} prompt="you're feeling sad" author_name="grace" author_location="here" created_date="now" opener_name="joy" opener_location="there" opened_date="tomorrow" letter_body="sorry to hear that"></LetterViewer>
      <LetterEditor />
      <LetterViewer is_browser={false} prompt="you're feeling sad" author_name="grace" author_location="here" created_date="now" opener_name="joy" opener_location="there" opened_date="tomorrow" letter_body="sorry to hear that"></LetterViewer>
    </div>
  ); // TODO: once user hits "submit", the LetterEditor is replaced by text that says "click one of the letters to open it" and the LetterViewer replaces the LetterEditor
}
