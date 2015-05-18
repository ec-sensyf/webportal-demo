#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

import os
from flask import Flask, request, render_template
from flask import json

app = Flask(__name__)
app.secret_key = '\t>\x15X\x17\xa7(\xe8\x0f/j\xfe\xb0\xee\xe5\x08\xec\xc8SEZ\x8c\xa2Y'.encode('utf-8')


def render_text(content):
    return app.response_class(content, mimetype='text/plain')


def render_json(content):
    return app.response_class(content, mimetype='application/json; charset=utf-8')


def other_function():
  # Function operations shall be write here
  output = "Hello World!!!"
  return render_json(json.dumps(output)) # JSON allows to return values to the JavaScript functions

  
@app.route("/add_url", methods=['GET', 'POST']) # URL added to the route to launch function
def python_funtion():
    return other_function() # This function will be launched when it is typed in the browser http://127.0.0.1:8080/add_url


@app.route("/") # App Route
def index():
    return render_template("webportal.html") # HTML file of the Web Portal


def main():
    app.run(debug=True, host='127.0.0.1', port=8080) # To launch the app type in browser http://127.0.0.1:8080


if __name__ == "__main__":
    main()

