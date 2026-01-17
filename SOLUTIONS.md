# CTF Challenge Solutions & Walkthrough

## Level 1: The Basics (Downloadable Challenges)

These challenges are accessed via the **Flags** dashboard.

### 1. The Hidden Message (`challenge1_secret.txt`)
*   **Type**: Cryptography (Base64)
*   **Challenge**: The file contains a string ending in `=`.
    ```
    SGVsbG9fQ1RGX1BsYXllcnsxbV9hX2JBczY0X2V4cDNydH0=
    ```
*   **Solution**: Decode using a Base64 decoder.
*   **Flag**: `Hello_CTF_Player{1m_a_bAs64_exp3rt}`

### 2. SQL Injection Master (`challenge2_login.html`)
*   **Type**: Web Security (Client-Side Audit)
*   **Challenge**: A fake login portal.
*   **Solution**:
    1.  Open the file in a browser.
    2.  Inspect the page source (Right-click -> View Source).
    3.  Find the `script` tag at the bottom.
    4.  Notice the vulnerabilities array or simply try standard SQL injection.
    5.  Enter `admin' OR '1'='1` (or similar) as the username.
*   **Flag**: `CTF{sql_1nj3ct10n_m4st3r_2024}`

### 3. Reverse Engineering (`challenge3_crackme.py`)
*   **Type**: Binary Analysis / Python
*   **Challenge**: A Python script with a license check against a hex array.
    ```python
    LICENSE_DATA = [0x43, 0x54, 0x46, 0x7B, ...]
    ```
*   **Solution**: Convert each Hex value to its ASCII character.
    *   `0x43` -> `C`
    *   `0x54` -> `T`
    *   `0x46` -> `F`
    *   ...
*   **Flag**: `CTF{r3v3rs3_mast3r}`

### 4. Network Forensics (`challenge4_forensics.txt`)
*   **Type**: Cryptography (Classical Cipher)
*   **Challenge**: Intercepted text message "Gur cnpxntr unf orra qryvirerq..."
*   **Solution**: The text is encrypted with **ROT13** (Caesar cipher +13).
    *   `PGS{...}` -> `CTF{...}`
*   **Flag**: `CTF{network_forensics_pro}`

---

## Level 2: Web Exploitation (Juice Shop)

*   **Type**: Real-world SQL Injection
*   **Target**: Linked OWASP Juice Shop instance (or simulated environment).
*   **Solution**:
    1.  Navigate to the Login page of the Juice Shop.
    2.  Use SQL Injection in the email field: `' OR 1=1 --`
    3.  Password can be anything (e.g., `admin`).
    4.  Upon successful bypass, the system detects the "Admin" login.
*   **Flag**: `PHISH{juice_shop_sql_master}`

---

## Level 3: Secure Validator (`secure_validator.py`)

*   **Type**: Advanced Reverse Engineering
*   **Challenge**: A complex verification script with 3 checks.
*   **Solution**:
    1.  **Format**: Must start with `PHISH{` and end with `}`. Length 18.
    2.  **Split**: Content is split by `_` into 3 parts.
    3.  **Part 1 (`p1`)**: XOR with 10 (0x0A) equals `[88, 57, 124]`.
        *   `88 ^ 10` = `82` ('R')
        *   `57 ^ 10` = `51` ('3')
        *   `124 ^ 10` = `118` ('v')
        *   Result: `R3v`
    4.  **Part 2 (`p2`)**: Reverse of "gnE".
        *   Result: `Eng`
    5.  **Part 3 (`p3`)**: Base64 encoded is "VzFu".
        *   Decode "VzFu" -> `W1n`.
*   **Final Flag**: `PHISH{R3v_Eng_W1n}`

---

## Level 4: The Source

*   **Type**: Expert / Web Forensics
*   **Challenge**: "The Source" - Follow the trail.
*   **Description**: A final challenge hinting at "The Source" and "Hidden in plain sight".
*   **Solution**:
    1.  The challenge title "The Source" is a strong hint.
    2.  The solution is to find the hidden credential in the source code or by following the "View Source" methodology.
    3.  This refers to the classic CTF trope where the flag is hidden in the client-side code (HTML/JS) or comments.
*   **Flag**: `CTF{view_source_is_still_op}`

---
