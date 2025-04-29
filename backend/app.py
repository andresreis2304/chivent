from flask import Flask, jsonify
from flask_cors import CORS
import requests
import pymysql
import os

app = Flask(__name__)
CORS(app)

API_KEY = os.environ.get('TICKETMASTER_API_KEY')
DB_PASSWORD = os.environ.get('CHIVENT_DB_PASSWORD')
# Database connection configuration
DB_CONFIG = {
    'host': '3.133.100.165',           # EC2 IP address
    'user': 'chivent',                  # MySQL username
    'password': DB_PASSWORD,
    'database': 'chivent',              # database name
    'cursorclass': pymysql.cursors.DictCursor  # returns result as Python dicts
}

@app.route('/admin/refresh_events', methods=['GET'])
def get_events():
    url = f"https://app.ticketmaster.com/discovery/v2/events.json?apikey={API_KEY}&city=Chicago"
    response = requests.get(url)
    data = response.json()

    events = []
    if "_embedded" in data:
        conn = pymysql.connect(**DB_CONFIG)
        with conn.cursor() as cursor:
            for event in data["_embedded"]["events"]:
                event_id = event["id"]
                name = event["name"]
                date = event["dates"]["start"].get("localDate", None)
                start_time = event["dates"]["start"].get("localTime", None)
                end_time = event.get("dates", {}).get("end", {}).get("localTime", None)
                image_url = event["images"][0]["url"] if event.get("images") else ""
                info = event.get("info") or event.get("pleaseNote", None)
                venue = event["_embedded"]["venues"][0]["name"] if "_embedded" in event and "venues" in event["_embedded"] else None
                price_min = None
                price_max = None
                if "priceRanges" in event and len(event["priceRanges"]) > 0:
                    price_min = event["priceRanges"][0].get("min")
                    price_max = event["priceRanges"][0].get("max")

                # Insert or update event (no price info)
                sql = """INSERT INTO events (id, name, date, start_time, end_time, venue, info, image_url, price_min, price_max, cached_at)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
                    ON DUPLICATE KEY UPDATE
                    name = VALUES(name),
                    date = VALUES(date),
                    start_time = VALUES(start_time),
                    end_time = VALUES(end_time),
                    venue = VALUES(venue),
                    info = VALUES(info),
                    image_url = VALUES(image_url),
                    price_min = VALUES(price_min),
                    price_max = VALUES(price_max),
                    cached_at = NOW()"""
                cursor.execute(sql, (
                    event_id, name, date, start_time, end_time,
                    venue, info, image_url, price_min, price_max
                ))
        conn.commit()
        conn.close()

    return jsonify({"message": f"Successfully updated events."})

@app.route('/', methods=['GET'])
def hello():
    return "Hello World"

@app.route('/events/all', methods=['GET'])
def get_all_events():
    events = []
    conn = pymysql.connect(**DB_CONFIG)
    with conn.cursor() as cursor:
        cursor.execute("SELECT * FROM events ORDER BY date")
        rows = cursor.fetchall()

        for row in rows:
            events.append({
                "id": row["id"],
                "name": row["name"],
                "date": row["date"].isoformat() if row["date"] else "TBA",
                "start_time": str(row["start_time"]) if row["start_time"] else "TBA",
                "end_time": str(row["end_time"]) if row["end_time"] else "TBA",
                "venue": row["venue"],
                "info": row["info"],
                "image": row["image_url"],
                "price_min": row["price_min"],
                "price_max": row["price_max"],
            })
    conn.close()
    return jsonify(events)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)