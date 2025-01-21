# Server Selector API

This project provides a method that can assess a list of webservers and then returns a server with the lowest priority.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pmvcaqr/nodejs-server-selector.git
   cd nodejs-server-selector
   ```

2. Install dependencies::

   ```bash
   npm install
   ```

3. Running the server:

   ```bash
   npm run dev
   ```

    The server will run on <http://localhost:3123>

4. Running the unit tests:

   ```bash
   npm run test
   ```

5. Running the API :

    ```bash
    curl -X GET http://localhost:3123/api/servers/find-server \
    -H "Content-Type: application/json" \
    -d '{
        "servers": [
          { "url": "https://does-not-work.perfume.new", "priority": 1 },
          { "url": "https://gitlab.com", "priority": 4 },
          { "url": "http://app.scnt.me", "priority": 3 },
          { "url": "https://offline.scentronix.com", "priority": 2 }
        ]
        }'
    ```

  Expected results:
    ```
    {
      "url": "http://app.scnt.me",
      "priority": 3
    }
    ```

---
