import requests
import json

BASE_URL = "http://127.0.0.1:3000"
LOGIN_URL = f"{BASE_URL}/login"
SOLVE_URL = f"{BASE_URL}/solve-level4"

# Use a fresh user to avoid 'already solved' issues
TEST_EMAIL = "verifier@test.com"
TEST_PASSWORD = "password123"
FLAG = "CTF{view_source_is_still_op}"

def verify_level4():
    print(f"[-] Registering/Logging in as {TEST_EMAIL}...")
    session = requests.Session()
    
    # 1. Login (Server creates user if not exists usually, or we use existing)
    # Ideally should use /login. If user doesn't exist, we might need to seed or rely on auto-creation if enabled.
    # Looking at server.js, login checks DB. Let's try to simulate a user that exists if possible, or assume auto-create.
    # Actually, server.js has 'seedUsers' but for strictly new users we might need a registration flow? 
    # Or we can just use the admin user 'admin@securebank.com' / 'admin123' if that exists in seed.
    
    # 0. Reset User (to ensure valid credentials)
    print("[-] Resetting debug user...")
    try:
        res = session.get(f"{BASE_URL}/debug-reset")
        print(f"[-] Reset Status: {res.status_code}")
        print(f"[-] Reset Headers: {res.headers}")
        print(f"[-] Reset Response: {res.text}")
    except:
        pass

    login_payload = {
        "email": "nivednarayananm2@gmail.com", 
        "password": "password123" 
    }
    
    # 1. Login
    try:
        res = session.post(LOGIN_URL, json=login_payload)
        print(f"[-] Login Status: {res.status_code}")
        
        if res.status_code != 200:
            print(f"[!] Login failed: {res.text}")
            return

        # 2. Solve Level 4
        print(f"[-] Submitting Flag: {FLAG}")
        solve_payload = {"flag": FLAG}
        res = session.post(SOLVE_URL, json=solve_payload)
        
        print(f"[-] Solve Status: {res.status_code}")
        print(f"[-] Solve Response: {res.text}")
        
        if res.status_code == 200:
            print("[SUCCESS] Level 4 Solved successfully via API!")
        else:
            print("[FAILURE] API returned error.")
            
    except Exception as e:
        print(f"[!] connection error: {e}")

if __name__ == "__main__":
    verify_level4()
