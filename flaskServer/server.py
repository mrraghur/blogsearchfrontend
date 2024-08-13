from flask import Flask, request, jsonify
import requests
from io import BytesIO
from PIL import Image
import json
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load tolerance level from config.json
def load_tolerance():
    with open('config.json', 'r') as f:
        config = json.load(f)
    return config['tolerance']

def is_black_and_white(image, tolerance=0):
    try:
        # Convert the image to RGB
        img = image.convert('RGB')

        # Get the image pixels
        pixels = list(img.getdata())

        # Check if the image is black and white within the tolerance
        bw_count = 0
        total_pixels = len(pixels)
        for pixel in pixels:
            r, g, b = pixel
            if abs(r - g) <= tolerance and abs(g - b) <= tolerance and abs(b - r) <= tolerance:
                bw_count += 1

        bw_ratio = bw_count / total_pixels

        # Return the bw_ratio and if it's black and white
        return bw_ratio, bw_ratio >= (1 - tolerance)

    except Exception as e:
        return 0, False

@app.route('/check-image', methods=['POST'])
def check_image():
    tolerance = load_tolerance()

    # Check if the request has an image file or a URL
    if 'file' in request.files:
        # Handle file upload
        image_file = request.files['file']
        img = Image.open(image_file)
    elif 'url' in request.form:
        # Handle URL input
        image_url = request.form['url']
        try:
            response = requests.get(image_url)
            response.raise_for_status()
            img = Image.open(BytesIO(response.content))
        except Exception:
            return jsonify({"error": "Invalid URL or unable to fetch image"}), 400
    else:
        return jsonify({"error": "No image file or URL provided"}), 400

    # Get custom tolerance if provided
    custom_tolerance = request.form.get('tolerance', None)
    if custom_tolerance:
        tolerance = float(custom_tolerance)

    # Check if the image is black and white
    bw_ratio, is_bw = is_black_and_white(img, tolerance)

    # Return the result
    return jsonify({"bw_ratio": bw_ratio, "is_black_and_white": is_bw, "tolerance": tolerance})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3007)
