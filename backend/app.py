from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

API_KEY = "HvH3lxb9xqJ0EUvCag350ntAcn4Kx4Yh"  # <-- your Consumer Key here

@app.route('/events', methods=['GET'])
def get_events():
    url = f"https://app.ticketmaster.com/discovery/v2/events.json?apikey={API_KEY}&city=Chicago"
    response = requests.get(url)
    data = response.json()

    events = []
    if "_embedded" in data:
        for event in data["_embedded"]["events"]:
            events.append({
                "id": event["id"],
                "name": event["name"],
                "date": event["dates"]["start"].get("localDate", "TBA"),
                "image": event["images"][0]["url"] if event.get("images") else "",
                "info" : event.get("additionalInfo", "No additional info available"), 
            })

    return jsonify(events)

@app.route('/', methods=['GET'])
def hello():
    return "Hello World"

if __name__ == '__main__':
    app.run(debug=True)