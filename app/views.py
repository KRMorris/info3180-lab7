"""
Flask Documentation:     http://flask.pocoo.org/docs/
Jinja2 Documentation:    http://jinja.pocoo.org/2/documentation/
Werkzeug Documentation:  http://werkzeug.pocoo.org/documentation/
This file creates your application.
"""
from app import app
import os
from flask import Flask,request,jsonify, render_template ,_request_ctx_stack, send_file,redirect,g,url_for,session

import requests

#from image_getter import image_dem
import flask.views
import json



@app.route('/',methods=['GET'])
def home():
    return render_template('main.html')



@app.route('/api/user/home',methods=['GET'])
def h1():
    return send_file("static/home1.html")



###
# The functions below should be applicable to all Flask apps.
###

@app.route('/<file_name>.txt')
def send_text_file(file_name):
    """Send your static text file."""
    file_dot_text = file_name + '.txt'
    return app.send_static_file(file_dot_text)


@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to tell the browser not to cache the rendered page.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404


  




    

