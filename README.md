<div style="padding: 0;margin-left: auto;margin-right: auto;margin-top: 20px;text-align: center;"> 
  <img style="width: 500px;vertical-align: middle;" alt="open-when-demo-browsing" src="https://github.com/user-attachments/assets/84990502-5a3b-4f8f-a13a-cea0b00b742a" />&nbsp;
  <img style="width: 500px;vertical-align: middle;" alt="open-when-demo-writing" src="https://github.com/user-attachments/assets/f737f845-a569-42a0-8727-b8e1e95b83e3" />
</div>

<h1 align="center">Open When</h1>
  
<p align="center">

  <a href="https://opensource.org/licenses/MIT">
    <img alt="License" src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge">
  </a>

  <img alt="Version 1.0.0" src="https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge">
  
</p>

Open When is a community-driven repository of digital *open when* letters. An *open when* letter is a letter meant to be opened at a particular time or in a particular situation (i.e. open when sad, open when tired, open when you need a laugh). Usually, *open when* letters are written between people who already know each other to keep in touch and feel close during long distance separation. However, I think that the idea is still applicable to internet strangers - we may not know each other, but as fellow human beings, we can still send kindness and well-wishes to each other.

## Built with
- ![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB&style=for-the-badge)
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)

## Features

Open When is both a digital archive and social network. Users can:
- Write letters (list their name and location, select an "open when" prompt, and write their letter)
- Browse opened letters (letters that have been opened by others)
- Open new letters (list their name and location on the letter and release it to be browsed by anyone)

## Design

I created a minimalist design reminiscent of the indie web. There are no fancy animations or visuals; it's everything that it needs to be and nothing more.

## Architecture

I built the frontend in TypeScript using ReactJS. There are two main components of the site: `LetterBrowser` (contains components `LetterOpener` (contains component `Letter`), `PromptSelector`, `Letter`, `Envelope`), `LetterEditor` (contains components `Envelope`, `PromptSelector`).

I have a Supabase client set up for the backend. I use a NextJS API route to `insert()` a Supabase row when a letter is written (`add_letter.ts`) and to `update()` the Supabase row when a letter is opened (`open_letter`). 

Each row consists of:
- The letter (prompt, letter body) and an auto-generated unique ID
- Author information (name, location, date of writing)
- Opener information (name, location, date of opening)

## License

Open When is licensed under the MIT License Copyright (c) 2025.

See the LICENSE for information on the history of this software, terms & conditions for usage, and a DISCLAIMER OF ALL WARRANTIES.

All trademarks referenced herein are property of their respective holders.
