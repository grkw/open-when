import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

import Card from "@/components/card";

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
      <table>
        <tbody>
          <tr>
            <td><Card prompt="you're feeling blue" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
            <td><Card prompt="you feel lost" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
            <td><Card prompt="you've messed up" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
          </tr>
          <tr>
            <td><Card prompt="you need a laugh" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
            <td><Card prompt="you're exhausted" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
            <td><Card prompt="you're pissed off" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
          </tr>
          <tr>
            <td><Card prompt="you feel lonely" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
            <td><Card prompt="you're worried about something" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
            <td><Card prompt="you're feeling sad" opened={false} text="" image_id="" className="custom-card-class"></Card></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
