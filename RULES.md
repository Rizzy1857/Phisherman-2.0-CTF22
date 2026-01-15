# 🎣 Phishermen 2.0 - Participant Rules & Guide

Welcome, Agent! Before you begin your investigation, please review these protocols.

## 📜 Core Rules (Fair Play)

1.  **Do Not Attack the Infrastructure**: Target only the challenge inputs (login forms, URL parameters). Do not attempt to DDoS the server or exploit the hosting platform (Render/Vercel).
2.  **No Flag Sharing**: Solving challenges is an individual/team effort. Sharing flags ruins the fun.
3.  **Brute Force is (Mostly) Unnecessary**: Unless a challenge explicitly hints at "guessing" or "cracking", violent brute-forcing is not the intended path and may get you rate-limited.
4.  **Scope**: Everything you need is within the challenge website. Do not attack external IPs or other users.

## 🕵️ Beginner Tips (First-Timer Aid)

1.  **View Source is Your Friend**: Developers often leave notes in HTML comments (`<!-- comment -->`) or JavaScript variables. Right-click -> "View Page Source".
2.  **Decode Everything**: See a weird string ending in `=`? It's likely **Base64**. Use a decoder.
3.  **The URL tells a story**: Look at the address bar. Are there parameters like `?id=1` or `?page=user`? What happens if you change them?
4.  **Google is Allowed**: If you see "SQL Injection", search for "SQL Injection cheat sheet". CTFs are about learning what you don't know yet!
5.  **Headers Matter**: Sometimes the server speaks to you in the HTTP Headers (Network Tab -> Click Request -> Response Headers).

## 🚩 Flag Format
Most flags look like: `CTF{some_text_here}` or `PHISH{...}`.
If you find one, submit it immediately!

Good luck, Detective. 🛑
