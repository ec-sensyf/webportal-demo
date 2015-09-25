#!/usr/bin/env python
# encoding: utf-8
from __future__ import unicode_literals

import os
import subprocess
import urllib
import urllib2
from flask import Flask, request, render_template
from flask import json

app = Flask(__name__)
app.secret_key = '\t>\x15X\x17\xa7(\xe8\x0f/j\xfe\xb0\xee\xe5\x08\xec\xc8SEZ\x8c\xa2Y'.encode('utf-8')


def render_text(content):
    return app.response_class(content, mimetype='text/plain')


def render_json(content):
    return app.response_class(content, mimetype='application/json; charset=utf-8')


def find_num_nodes():
  try:
    ip = 'insert you sandbox/master node IP (e.g. 10.15.22.13)'
    sock = urllib.urlopen('http://' + ip + ':50030/jobtracker.jsp')
    htmlSource = sock.read()
    str_pre_node = 'machines.jsp?type=active'
    index = htmlSource.find(str_pre_node)
    try:
      num_of_nodes = int(htmlSource[index+26])
      print num_of_nodes
      return render_json(json.dumps(num_of_nodes))
    except ValueError:
      print 'ERROR 1'
      return render_json(json.dumps('Impossible to get number of nodes'))
    sock.close()
  except IOError:
    print 'ERROR 2'
    return render_json(json.dumps('Impossible to connect to the IP: ' + ip))

    
def other_function():
  # Function operations shall be write here
  output = "Hello World!!!"
  return render_json(json.dumps(output)) # JSON allows to return values to the JavaScript functions

  
@app.route("/nodes", methods=['GET', 'POST'])
def check_nodes():
    return find_num_nodes()

    
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

